import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LEAD_SMS_TO,
  DEFAULT_QUO_FROM,
  OPENPHONE_MESSAGES_URL,
  QUO_MESSAGES_URL,
  formatTeamLeadSms,
  normalizeQuoApiKey,
  notifyLead,
  redactQuoLog,
  sendQuoMessage,
  type LeadNotifyInput,
} from "./notify.ts";

const sampleLead: LeadNotifyInput = {
  kind: "full",
  name: "Ada Perez",
  phone: "3215550100",
  email: "ada@example.com",
  serviceType: "Full-Service Move",
  note: "Service: Full-Service Move — Size: 2 bedrooms — From: 32801 — To: 32789 — Access: Stairs",
  moveDate: "2026-09-18",
  city: "32801",
  funnel: "full-service",
  source: "get_my_price",
  consentSms: true,
  landingPage: "https://toromovers.com/get-my-price",
};

type FetchCall = {
  url: string;
  headers: Record<string, string>;
  body: Record<string, unknown>;
};

function headerMap(init?: RequestInit): Record<string, string> {
  return Object.fromEntries(new Headers(init?.headers).entries());
}

function stubEnv(overrides: Record<string, string | undefined>) {
  const keys = [
    "QUO_API_KEY",
    "QUO_FROM_NUMBER",
    "LEAD_SMS_TO",
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_CHAT_ID",
    "RESEND_API_KEY",
    "OPENPHONE_API_KEY",
    "OPENPHONE_FROM_NUMBER",
  ];
  const prev: Record<string, string | undefined> = {};
  for (const key of keys) prev[key] = process.env[key];
  for (const key of keys) delete process.env[key];
  for (const [key, value] of Object.entries(overrides)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  return () => {
    for (const [key, value] of Object.entries(prev)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

test("team SMS includes client details and confirmation", () => {
  const body = formatTeamLeadSms(sampleLead);
  assert.match(body, /CONFIRMED/);
  assert.match(body, /Ada Perez/);
  assert.match(body, /\+13215550100/);
  assert.match(body, /ada@example\.com/);
  assert.match(body, /Full-Service Move/);
  assert.match(body, /32801/);
  assert.match(body, /Stairs/);
  assert.match(body, /get-my-price/);
});

test("normalizeQuoApiKey strips accidental Bearer prefix", () => {
  assert.equal(normalizeQuoApiKey("  Bearer secret-key  "), "secret-key");
  assert.equal(normalizeQuoApiKey("secret-key"), "secret-key");
});

test("redactQuoLog never echoes the API key", () => {
  const key = "sk_live_super_secret_quo_key";
  const out = redactQuoLog(
    `Unauthorized Authorization: ${key} Bearer ${key}`,
    key,
  );
  assert.equal(out.includes(key), false);
  assert.match(out, /\[redacted\]/);
});

test("missing QUO_API_KEY skips SMS and does not throw", async () => {
  const restore = stubEnv({});
  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "test",
    });
    assert.equal(result.ok, false);
    assert.equal(result.detail, "QUO_API_KEY missing");
    assert.equal(fetched, false);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("notifyLead posts team SMS to Quo v1 with raw auth and no dated version header", async () => {
  const restore = stubEnv({
    QUO_API_KEY: "test-quo-key",
    QUO_FROM_NUMBER: DEFAULT_QUO_FROM,
    LEAD_SMS_TO: DEFAULT_LEAD_SMS_TO,
  });

  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    calls.push({
      url: String(url),
      headers: headerMap(init),
      body: JSON.parse(String(init?.body || "{}")),
    });
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const results = await notifyLead(sampleLead);
    const team = calls.find(
      (call) =>
        call.url === QUO_MESSAGES_URL &&
        Array.isArray(call.body.to) &&
        call.body.to[0] === DEFAULT_LEAD_SMS_TO,
    );
    assert.ok(team, "expected team Quo SMS");
    assert.equal(team.headers.authorization, "test-quo-key");
    assert.equal(team.headers["quo-api-version"], undefined);
    assert.equal(team.body.from, "+16896002720");
    assert.deepEqual(team.body.to, ["+13217580094"]);
    assert.notEqual(
      team.body.from,
      (team.body.to as string[])[0],
      "FROM workspace 689 must not be swapped with TO personal 321",
    );
    assert.match(String(team.body.content), /Ada Perez/);
    assert.match(String(team.body.content), /CONFIRMED/);
    assert.ok(results.some((item) => item.channel === "sms-team" && item.ok));
    assert.ok(results.some((item) => item.channel === "sms-client" && item.ok));
    assert.equal(
      calls.filter((call) => call.url === QUO_MESSAGES_URL).length,
      2,
      "team + client SMS on primary host",
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("QUO_API_KEY with Bearer prefix is sent as the raw key", async () => {
  const restore = stubEnv({ QUO_API_KEY: "Bearer test-quo-key" });
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    calls.push({
      url: String(url),
      headers: headerMap(init),
      body: JSON.parse(String(init?.body || "{}")),
    });
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "hello",
    });
    assert.equal(result.ok, true);
    assert.equal(calls[0]?.headers.authorization, "test-quo-key");
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("sendQuoMessage retries with Bearer after 401", async () => {
  const restore = stubEnv({ QUO_API_KEY: "test-quo-key" });
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    const headers = headerMap(init);
    calls.push({
      url: String(url),
      headers,
      body: JSON.parse(String(init?.body || "{}")),
    });
    if (headers.authorization === "test-quo-key") {
      return new Response(
        JSON.stringify({
          error: { message: "Unauthorized", key: "Unauthorized", trace: "t1" },
        }),
        { status: 401 },
      );
    }
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "hello",
      channel: "sms-team",
    });
    assert.equal(result.ok, true);
    assert.equal(calls[0]?.headers.authorization, "test-quo-key");
    assert.equal(calls[1]?.headers.authorization, "Bearer test-quo-key");
    assert.equal(calls[0]?.headers["quo-api-version"], undefined);
    assert.equal(calls[1]?.url, QUO_MESSAGES_URL);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("sendQuoMessage falls back to api.openphone.com after 404 on api.quo.com", async () => {
  const restore = stubEnv({ QUO_API_KEY: "test-quo-key" });
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    calls.push({
      url: String(url),
      headers: headerMap(init),
      body: JSON.parse(String(init?.body || "{}")),
    });
    if (String(url) === QUO_MESSAGES_URL) {
      return new Response("Cannot POST /v1/messages", { status: 404 });
    }
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "hello",
    });
    assert.equal(result.ok, true);
    assert.equal(calls[0]?.url, QUO_MESSAGES_URL);
    assert.equal(calls[1]?.url, OPENPHONE_MESSAGES_URL);
    assert.equal(calls[1]?.headers.authorization, "test-quo-key");
    assert.equal(calls[1]?.body.to[0], DEFAULT_LEAD_SMS_TO);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("failed SMS logs status/trace without the API key and still fail-softs", async () => {
  const restore = stubEnv({ QUO_API_KEY: "test-quo-key-SHOULD-NOT-LEAK" });
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const logs: string[] = [];
  console.error = (...args: unknown[]) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };
  globalThis.fetch = (async () => {
    return new Response(
      JSON.stringify({
        error: {
          message: "Unauthorized",
          key: "Unauthorized",
          trace: "trace-123",
        },
      }),
      { status: 401 },
    );
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "hello",
    });
    assert.equal(result.ok, false);
    assert.match(String(result.detail), /HTTP 401/);
    assert.match(String(result.detail), /Unauthorized/);
    const joined = logs.join("\n");
    assert.equal(joined.includes("test-quo-key-SHOULD-NOT-LEAK"), false);
    assert.match(joined, /HTTP 401/);
    assert.match(joined, /trace-123/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    restore();
  }
});
