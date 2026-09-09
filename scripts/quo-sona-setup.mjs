#!/usr/bin/env node
/**
 * Probe Quo/OpenPhone and create after-hours webhooks when OPENPHONE_API_KEY is set.
 * Does not publish Sona jobs/call flows (those are UI-only in the public API).
 * Never prints API keys or webhook signing secrets.
 */
const KEY = process.env.OPENPHONE_API_KEY || process.env.QUO_API_KEY || "";
const BASE = "https://api.openphone.com";
const WEBHOOK_URL = process.env.QUO_WEBHOOK_URL || "https://toromovers.com/api/quo/webhook";

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    ...opts,
    headers: {
      Authorization: KEY,
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
  });
  const text = await res.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { status: res.status, json };
}

function summarizeUsers(json) {
  const rows = json?.data || json || [];
  return (Array.isArray(rows) ? rows : []).map((u) => ({
    id: u.id,
    name: [u.firstName, u.lastName].filter(Boolean).join(" ") || u.name || "",
    email: u.email || "",
  }));
}

if (!KEY) {
  console.log(JSON.stringify({ ok: false, error: "OPENPHONE_API_KEY missing" }, null, 2));
  process.exit(2);
}

const out = { ok: true, webhookUrl: WEBHOOK_URL, probes: {}, users: [], numbers: [], sabina: [], webhooks: {} };

for (const path of [
  "/v1/phone-numbers",
  "/v1/users?maxResults=50",
  "/v1/contact-custom-fields",
  "/v1/webhooks",
  "/v1/jobs",
  "/v1/sona/jobs",
  "/v1/knowledge",
  "/v1/call-flows",
]) {
  const result = await req(path);
  out.probes[path] = { status: result.status };
  if (path.startsWith("/v1/phone-numbers") && result.json?.data) {
    out.numbers = result.json.data.map((n) => ({
      id: n.id,
      number: n.number || n.phoneNumber || n.formattedNumber,
      name: n.name,
    }));
  }
  if (path.startsWith("/v1/users") && result.json) {
    out.users = summarizeUsers(result.json);
    out.sabina = out.users.filter((u) => /sabina/i.test(u.name));
  }
}

if (process.argv.includes("--create-webhooks")) {
  for (const [path, body] of [
    [
      "/v1/webhooks/call-summaries",
      { url: WEBHOOK_URL, events: ["call.summary.completed"], label: "Toro after-hours Sona summaries", resourceIds: ["*"], status: "enabled" },
    ],
    [
      "/v1/webhooks/calls",
      { url: WEBHOOK_URL, events: ["call.completed"], label: "Toro after-hours calls", resourceIds: ["*"], status: "enabled" },
    ],
    [
      "/v1/webhooks/messages",
      { url: WEBHOOK_URL, events: ["message.received"], label: "Toro after-hours SMS", resourceIds: ["*"], status: "enabled" },
    ],
  ]) {
    const result = await req(path, { method: "POST", body: JSON.stringify(body) });
    const data = result.json?.data || {};
    out.webhooks[path] = {
      status: result.status,
      id: data.id || null,
      hasKey: Boolean(data.key),
    };
  }
}

console.log(JSON.stringify(out, null, 2));
