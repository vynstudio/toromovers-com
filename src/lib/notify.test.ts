import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LEAD_SMS_TO,
  DEFAULT_QUO_FROM,
  DEFAULT_QUO_FROM_PHONE_NUMBER_ID,
  QUO_API_VERSION,
  QUO_MESSAGES_URL,
  QUO_USER_AGENT,
  formatTeamLeadSms,
  notifyLead,
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
    "QUO_FROM_PHONE_NUMBER_ID",
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
});

test("notifyLead texts LEAD_SMS_TO and the client separately", async () => {
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
    const dests = calls
      .filter((call) => call.url === QUO_MESSAGES_URL)
      .map((call) => (call.body.to as string[])[0]);
    assert.deepEqual(dests, ["+13217580094", "+13215550100"]);
    assert.equal(calls[0]?.headers.authorization, "test-quo-key");
    assert.equal(calls[0]?.headers["quo-api-version"], QUO_API_VERSION);
    assert.equal(calls[0]?.headers["user-agent"], QUO_USER_AGENT);
    assert.equal(calls[0]?.body.from, "+16896002720");
    assert.ok(results.some((item) => item.channel === "sms-team" && item.ok));
    assert.ok(results.some((item) => item.channel === "sms-client" && item.ok));
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("HTTP 401 tells ops to rotate QUO_API_KEY and never logs the key", async () => {
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
        error: { message: "Unauthorized", key: "Unauthorized", trace: "trace-123" },
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
    assert.match(String(result.detail), /rotate QUO_API_KEY in Netlify/);
    const joined = logs.join("\n");
    assert.equal(joined.includes("test-quo-key-SHOULD-NOT-LEAK"), false);
    assert.match(joined, /HTTP 401/);
    assert.match(joined, /Unauthorized/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    restore();
  }
});

test("E.164 from 400 retries phoneNumberId PN3sKfvpYp; destination stays 321", async () => {
  const restore = stubEnv({
    QUO_API_KEY: "test-quo-key",
    QUO_FROM_NUMBER: "+16896002720",
    LEAD_SMS_TO: "+13217580094",
  });
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url, init) => {
    const body = JSON.parse(String(init?.body || "{}"));
    calls.push({
      url: String(_url),
      headers: headerMap(init),
      body,
    });
    if (body.from === "+16896002720") {
      return new Response(
        JSON.stringify({ error: { message: "Invalid from" } }),
        { status: 400 },
      );
    }
    return new Response("{}", { status: 202 });
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: DEFAULT_LEAD_SMS_TO,
      content: "hello",
    });
    assert.equal(result.ok, true);
    assert.equal(calls[0]?.body.from, "+16896002720");
    assert.equal(calls[1]?.body.from, DEFAULT_QUO_FROM_PHONE_NUMBER_ID);
    assert.deepEqual(calls[1]?.body.to, ["+13217580094"]);
    assert.equal(calls[1]?.headers["user-agent"], QUO_USER_AGENT);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
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
