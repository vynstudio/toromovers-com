import assert from "node:assert/strict";
import test from "node:test";
import {
  DEFAULT_LEAD_SMS_TO,
  DEFAULT_QUO_FROM,
  QUO_API_VERSION,
  QUO_MESSAGES_URL,
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

test("missing QUO_API_KEY skips SMS and does not throw", async () => {
  const prevQuo = process.env.QUO_API_KEY;
  const prevOpen = process.env.OPENPHONE_API_KEY;
  delete process.env.QUO_API_KEY;
  delete process.env.OPENPHONE_API_KEY;

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
    if (prevQuo) process.env.QUO_API_KEY = prevQuo;
    else delete process.env.QUO_API_KEY;
    if (prevOpen) process.env.OPENPHONE_API_KEY = prevOpen;
    else delete process.env.OPENPHONE_API_KEY;
  }
});

test("notifyLead posts team SMS to Quo with required headers", async () => {
  const prev = {
    QUO_API_KEY: process.env.QUO_API_KEY,
    QUO_FROM_NUMBER: process.env.QUO_FROM_NUMBER,
    LEAD_SMS_TO: process.env.LEAD_SMS_TO,
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    OPENPHONE_API_KEY: process.env.OPENPHONE_API_KEY,
  };
  process.env.QUO_API_KEY = "test-quo-key";
  process.env.QUO_FROM_NUMBER = DEFAULT_QUO_FROM;
  process.env.LEAD_SMS_TO = DEFAULT_LEAD_SMS_TO;
  delete process.env.TELEGRAM_BOT_TOKEN;
  delete process.env.TELEGRAM_CHAT_ID;
  delete process.env.RESEND_API_KEY;
  delete process.env.OPENPHONE_API_KEY;

  const calls: Array<{
    url: string;
    headers: Record<string, string>;
    body: Record<string, unknown>;
  }> = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (url, init) => {
    const headers = Object.fromEntries(
      new Headers(init?.headers).entries(),
    );
    calls.push({
      url: String(url),
      headers,
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
    assert.equal(team.headers["quo-api-version"], QUO_API_VERSION);
    assert.equal(team.body.from, DEFAULT_QUO_FROM);
    assert.match(String(team.body.content), /Ada Perez/);
    assert.match(String(team.body.content), /CONFIRMED/);
    assert.ok(results.some((item) => item.channel === "sms" && item.ok));
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(prev)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
