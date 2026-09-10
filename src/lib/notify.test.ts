import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_QUO_FROM,
  QUO_API_VERSION,
  QUO_MESSAGES_URL,
  QUO_USER_AGENT,
  notifyLead,
  sendEmail,
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
    "RESEND_FROM_EMAIL",
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

test("notifyLead does not SMS LEAD_SMS_TO; team is Telegram only", async () => {
  const restore = stubEnv({
    QUO_API_KEY: "test-quo-key",
    QUO_FROM_NUMBER: DEFAULT_QUO_FROM,
    LEAD_SMS_TO: "+13217580094",
    RESEND_API_KEY: "re_test",
    RESEND_FROM_EMAIL: "hello@toromovers.net",
  });
  const calls: FetchCall[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    calls.push({
      url: String(url),
      headers: headerMap(init),
      body: JSON.parse(String(init?.body || "{}")),
    });
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const results = await notifyLead(sampleLead);
    const quo = calls.filter((call) => call.url === QUO_MESSAGES_URL);
    assert.equal(quo.length, 1);
    assert.deepEqual(quo[0]?.body.to, ["+13215550100"]);
    assert.equal(quo[0]?.headers["user-agent"], QUO_USER_AGENT);
    assert.equal(quo[0]?.headers["quo-api-version"], QUO_API_VERSION);
    assert.equal(
      calls.some(
        (call) =>
          Array.isArray(call.body.to) && call.body.to[0] === "+13217580094",
      ),
      false,
    );
    const email = calls.find((call) =>
      String(call.url).includes("api.resend.com"),
    );
    assert.ok(email, "expected Resend confirmation email");
    assert.equal(email.body.from, "Toro Movers <hello@toromovers.net>");
    assert.deepEqual(email.body.to, ["ada@example.com"]);
    assert.equal(email.body.reply_to, "hello@toromovers.net");
    assert.match(String(email.body.html), /#E20613/);
    assert.doesNotMatch(String(email.body.html), /#E10600/i);
    assert.match(String(email.body.html), /15 minutes/);
    assert.match(String(email.body.html), /bgcolor="#ffffff"/i);
    assert.match(String(email.body.html), /TORO <span style="color:#E20613;">MOVERS<\/span>/);
    assert.doesNotMatch(String(email.body.html), /licensed/i);
    assert.ok(results.some((item) => item.channel === "sms-client" && item.ok));
    assert.ok(results.some((item) => item.channel === "email" && item.ok));
    assert.equal(
      results.some((item) => item.channel === "sms-team"),
      false,
    );
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("sendEmail sends from hello@toromovers.net when that is RESEND_FROM_EMAIL", async () => {
  const restore = stubEnv({
    RESEND_API_KEY: "re_test",
    RESEND_FROM_EMAIL: "hello@toromovers.net",
  });
  let body: Record<string, unknown> = {};
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url, init) => {
    body = JSON.parse(String(init?.body || "{}"));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const result = await sendEmail({
      to: "ada@example.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      text: "Hi",
    });
    assert.equal(result.ok, true);
    assert.equal(body.from, "Toro Movers <hello@toromovers.net>");
    assert.equal(body.reply_to, "hello@toromovers.net");
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("sendEmail unwraps a pre-wrapped RESEND_FROM_EMAIL to avoid Resend 422", async () => {
  const restore = stubEnv({
    RESEND_API_KEY: "re_test",
    RESEND_FROM_EMAIL: "Toro Movers <hello@toromovers.com>",
  });
  let body: Record<string, unknown> = {};
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (_url, init) => {
    body = JSON.parse(String(init?.body || "{}"));
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const result = await sendEmail({
      to: "ada@example.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      text: "Hi",
    });
    assert.equal(result.ok, true);
    assert.equal(body.from, "Toro Movers <hello@toromovers.com>");
    assert.equal(body.reply_to, "hello@toromovers.com");
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("sendEmail surfaces Resend 422 domain verification without logging the key", async () => {
  const restore = stubEnv({
    RESEND_API_KEY: "re_test_SHOULD_NOT_LEAK",
    RESEND_FROM_EMAIL: "hello@toromovers.com",
  });
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const logs: string[] = [];
  console.error = (...args: unknown[]) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };
  globalThis.fetch = (async () => {
    return new Response(
      JSON.stringify({
        name: "validation_error",
        message: "The toromovers.com domain is not verified. Please, add and verify your domain.",
      }),
      { status: 422 },
    );
  }) as typeof fetch;

  try {
    const result = await sendEmail({
      to: "ada@example.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      text: "Hi",
    });
    assert.equal(result.ok, false);
    assert.match(String(result.detail), /domain not verified/);
    assert.equal(logs.join("\n").includes("re_test_SHOULD_NOT_LEAK"), false);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    restore();
  }
});

test("sendEmail does not guess a from-domain when RESEND_FROM_EMAIL is unset", async () => {
  const restore = stubEnv({ RESEND_API_KEY: "re_test" });
  let fetched = false;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async () => {
    fetched = true;
    return new Response("{}", { status: 200 });
  }) as typeof fetch;

  try {
    const result = await sendEmail({
      to: "ada@example.com",
      subject: "Hi",
      html: "<p>Hi</p>",
      text: "Hi",
    });
    assert.equal(result.ok, false);
    assert.match(String(result.detail), /RESEND_FROM_EMAIL/);
    assert.equal(fetched, false);
  } finally {
    globalThis.fetch = originalFetch;
    restore();
  }
});

test("HTTP 401 on client SMS tells ops to rotate QUO_API_KEY", async () => {
  const restore = stubEnv({ QUO_API_KEY: "test-quo-key-SHOULD-NOT-LEAK" });
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const logs: string[] = [];
  console.error = (...args: unknown[]) => {
    logs.push(args.map((arg) => String(arg)).join(" "));
  };
  globalThis.fetch = (async () => {
    return new Response(
      JSON.stringify({ error: { message: "Unauthorized" } }),
      { status: 401 },
    );
  }) as typeof fetch;

  try {
    const result = await sendQuoMessage({
      to: "3215550100",
      content: "hello",
    });
    assert.equal(result.ok, false);
    assert.match(String(result.detail), /rotate QUO_API_KEY in Netlify/);
    assert.equal(logs.join("\n").includes("test-quo-key-SHOULD-NOT-LEAK"), false);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    restore();
  }
});
