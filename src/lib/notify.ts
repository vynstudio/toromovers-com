/**
 * Outbound notifications for toromovers.com leads.
 * - Internal: Telegram + Quo SMS FROM workspace 689 TO personal 321
 * - Client: SMS (Quo FROM 689) + email (Resend from hello@toromovers.com)
 * Fail-soft: never throws to callers. Missing QUO_API_KEY skips SMS; lead still accepted.
 */

import { FUNNEL_BILINGUAL, FUNNEL_SLA } from "./funnel-offer.ts";
import {
  GOOGLE_MAPS_REVIEWS_URL,
  PHONE_DISPLAY,
} from "./site.ts";

/**
 * Send-SMS is v1-only: POST /v1/messages.
 * The dated 2026-03-30 API requires `Quo-Api-Version` but cannot send yet
 * (retry/mark-read only). Do not send that header on this call — it selects
 * the 2026 contract and silently breaks outbound SMS.
 * @see https://www.quo.com/docs/mdx/api-reference/messages/send-a-text-message
 * @see https://www.quo.com/docs/2026-03-30/versioning
 */
export const QUO_MESSAGES_URL = "https://api.quo.com/v1/messages";
export const OPENPHONE_MESSAGES_URL = "https://api.openphone.com/v1/messages";
export const QUO_V1_MESSAGE_URLS = [
  QUO_MESSAGES_URL,
  OPENPHONE_MESSAGES_URL,
] as const;
/** Dated API only — never attach this to v1 send-message. */
export const QUO_API_VERSION = "2026-03-30";
/** Quo workspace / sending number (689-600-2720). Never use this as LEAD_SMS_TO. */
export const DEFAULT_QUO_FROM = "+16896002720";
/** Personal alert destination (321-758-0094). Not a Quo number. Never swap with FROM. */
export const DEFAULT_LEAD_SMS_TO = "+13217580094";
export const QUO_SMS_MAX_CHARS = 1600;


export type NotifyResult = {
  ok: boolean;
  channel: string;
  detail?: string;
};

function e164(raw: string): string | null {
  const d = String(raw || "").replace(/\D/g, "");
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith("1")) return `+${d}`;
  if (raw.startsWith("+") && d.length >= 11) return `+${d}`;
  return null;
}

export async function sendTelegram(text: string): Promise<NotifyResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    return {
      ok: false,
      channel: "telegram",
      detail: "TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing",
    };
  }
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("[notify/telegram]", res.status, t.slice(0, 200));
      return { ok: false, channel: "telegram", detail: `HTTP ${res.status}` };
    }
    return { ok: true, channel: "telegram" };
  } catch (err) {
    console.error("[notify/telegram] threw", err);
    return { ok: false, channel: "telegram", detail: "threw" };
  }
}

/** Strip accidental `Bearer ` so Netlify env can be either raw key or tutorial-prefixed. */
export function normalizeQuoApiKey(raw: string): string {
  return raw.trim().replace(/^Bearer\s+/i, "").trim();
}

export function quoApiKey(): string {
  return normalizeQuoApiKey(
    process.env.QUO_API_KEY || process.env.OPENPHONE_API_KEY || "",
  );
}

export function quoFromNumber(): string {
  return (
    process.env.QUO_FROM_NUMBER ||
    process.env.OPENPHONE_FROM_NUMBER ||
    DEFAULT_QUO_FROM
  ).trim();
}

export function leadSmsTo(): string {
  return (process.env.LEAD_SMS_TO || DEFAULT_LEAD_SMS_TO).trim();
}

export function redactQuoLog(text: string, apiKey?: string): string {
  let out = String(text || "").replace(/\s+/g, " ").slice(0, 400);
  const key = apiKey || quoApiKey();
  if (key) out = out.split(key).join("[redacted]");
  out = out.replace(/Bearer\s+\S+/gi, "Bearer [redacted]");
  out = out.replace(/Authorization["']?\s*[:=]\s*["']?[^"'\s,]+/gi, "Authorization [redacted]");
  return out;
}

export function quoAuthorization(apiKey: string, mode: "raw" | "bearer"): string {
  return mode === "bearer" ? `Bearer ${apiKey}` : apiKey;
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function summarizeQuoError(status: number, body: string): string {
  try {
    const json = JSON.parse(body) as Record<string, unknown>;
    const nested = json.error && typeof json.error === "object"
      ? (json.error as Record<string, unknown>)
      : null;
    const msg = nested?.message || json.message || json.title || nested?.key;
    const trace = nested?.trace || json.trace;
    const parts = [`HTTP ${status}`];
    if (msg) parts.push(String(msg));
    if (trace) parts.push(`trace ${trace}`);
    return parts.join(" ");
  } catch {
    return `HTTP ${status}`;
  }
}

type QuoAttempt = {
  url: string;
  auth: "raw" | "bearer";
  status?: number;
  detail: string;
  ok: boolean;
};

async function postQuoV1Message(opts: {
  url: string;
  apiKey: string;
  auth: "raw" | "bearer";
  content: string;
  from: string;
  to: string;
}): Promise<QuoAttempt> {
  const { url, apiKey, auth, content, from, to } = opts;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: quoAuthorization(apiKey, auth),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, from, to: [to] }),
    });
    const rawBody = await res.text().catch(() => "");
    const safeBody = redactQuoLog(rawBody, apiKey);
    if (!res.ok) {
      const detail = redactQuoLog(
        `${summarizeQuoError(res.status, rawBody)} host=${hostOf(url)} auth=${auth}`,
        apiKey,
      );
      console.error("[quo] SMS failed", detail, safeBody);
      return { url, auth, status: res.status, detail, ok: false };
    }
    return { url, auth, status: res.status, detail: `HTTP ${res.status}`, ok: true };
  } catch (err) {
    const thrown = err instanceof Error ? err.message : "threw";
    const detail = `threw host=${hostOf(url)} auth=${auth} ${redactQuoLog(thrown, apiKey)}`;
    console.error("[quo] SMS threw", detail);
    return { url, auth, detail, ok: false };
  }
}

const QUO_HOST_RETRY_STATUSES = new Set([404, 405, 408, 429, 500, 502, 503, 504]);

function succeededQuoSend(
  attempt: QuoAttempt,
  url: string,
  to: string,
  channel: string,
): NotifyResult | null {
  if (!attempt.ok) return null;
  if (url !== QUO_MESSAGES_URL || attempt.auth !== "raw") {
    console.info("[quo] SMS sent via fallback", {
      host: hostOf(url),
      auth: attempt.auth,
      status: attempt.status,
      to: to.slice(-4),
    });
  }
  return { ok: true, channel };
}

/** Send one SMS via Quo v1. Never throws. Never logs the API key. */
export async function sendQuoMessage(opts: {
  to: string;
  content: string;
  from?: string;
  channel?: string;
}): Promise<NotifyResult> {
  const channel = opts.channel || "sms";
  const apiKey = quoApiKey();
  if (!apiKey) {
    console.error(
      "[quo] QUO_API_KEY missing — lead accepted; SMS not sent",
    );
    return {
      ok: false,
      channel,
      detail: "QUO_API_KEY missing",
    };
  }
  const to = e164(opts.to);
  const from = e164(opts.from || quoFromNumber()) || quoFromNumber();
  if (!to) {
    return { ok: false, channel, detail: "invalid phone" };
  }
  const content = opts.content.trim().slice(0, QUO_SMS_MAX_CHARS);
  if (!content) {
    return { ok: false, channel, detail: "empty content" };
  }

  let last: QuoAttempt | undefined;
  for (const url of QUO_V1_MESSAGE_URLS) {
    const raw = await postQuoV1Message({
      url,
      apiKey,
      auth: "raw",
      content,
      from,
      to,
    });
    last = raw;
    const rawOk = succeededQuoSend(raw, url, to, channel);
    if (rawOk) return rawOk;

    if (raw.status === 401) {
      const bearer = await postQuoV1Message({
        url,
        apiKey,
        auth: "bearer",
        content,
        from,
        to,
      });
      last = bearer;
      const bearerOk = succeededQuoSend(bearer, url, to, channel);
      if (bearerOk) return bearerOk;
      continue;
    }

    if (raw.status === undefined || QUO_HOST_RETRY_STATUSES.has(raw.status)) {
      continue;
    }
    break;
  }

  return {
    ok: false,
    channel,
    detail: last?.detail || "SMS failed",
  };
}

export async function sendSms(
  toRaw: string,
  content: string,
): Promise<NotifyResult> {
  return sendQuoMessage({ to: toRaw, content, channel: "sms-client" });
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<NotifyResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from =
    process.env.RESEND_FROM_EMAIL || "hello@toromovers.com";
  if (!apiKey) {
    return { ok: false, channel: "email", detail: "RESEND_API_KEY missing" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Toro Movers <${from}>`,
        to: [opts.to],
        reply_to: opts.replyTo || from,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("[notify/email]", res.status, t.slice(0, 200));
      return { ok: false, channel: "email", detail: `HTTP ${res.status}` };
    }
    return { ok: true, channel: "email" };
  } catch (err) {
    console.error("[notify/email] threw", err);
    return { ok: false, channel: "email", detail: "threw" };
  }
}

export type LeadNotifyInput = {
  kind: "soft" | "full";
  name: string;
  phone: string;
  email?: string;
  serviceType?: string;
  note?: string;
  moveDate?: string;
  city?: string;
  funnel?: string;
  source?: string;
  consentSms?: boolean;
  landingPage?: string;
};

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

function teamMessage(lead: LeadNotifyInput): string {
  const phone = e164(lead.phone) || lead.phone;
  const priority =
    `${lead.note || ""} ${lead.moveDate || ""}`.toLowerCase().includes("priority") ||
    `${lead.moveDate || ""}`.toLowerCase().includes("asap") ||
    `${lead.moveDate || ""}`.toLowerCase().includes("this week");

  return [
    lead.kind === "soft"
      ? `⚡ Soft lead · toromovers.com — still qualifying`
      : priority
        ? `🔥 PRIORITY lead · toromovers.com — call ASAP`
        : `🚚 New lead · toromovers.com`,
    ``,
    `Name: ${lead.name}`,
    `Phone: ${phone}`,
    lead.email ? `Email: ${lead.email}` : `Email: —`,
    lead.city ? `City/ZIP: ${lead.city}` : "",
    lead.serviceType ? `Service: ${lead.serviceType}` : "",
    lead.moveDate ? `When: ${lead.moveDate}` : "",
    lead.funnel ? `Funnel: ${lead.funnel}` : "",
    `Source: ${lead.source || "toromovers.com"}`,
    lead.landingPage ? `Page: ${lead.landingPage}` : "",
    lead.note ? `\nNote: ${lead.note}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export function formatTeamLeadSms(lead: LeadNotifyInput): string {
  const phone = e164(lead.phone) || lead.phone;
  return [
    "Toro Movers — quote request CONFIRMED",
    "",
    `Name: ${lead.name}`,
    `Phone: ${phone}`,
    `Email: ${lead.email || "—"}`,
    lead.city ? `From: ${lead.city}` : "",
    lead.serviceType ? `Service: ${lead.serviceType}` : "",
    lead.moveDate ? `When: ${lead.moveDate}` : "",
    lead.funnel ? `Funnel: ${lead.funnel}` : "",
    `Source: ${lead.source || "toromovers.com"}`,
    lead.landingPage ? `Page: ${lead.landingPage}` : "",
    lead.note ? `Details: ${lead.note}` : "",
    "",
    "Confirmation: lead captured on toromovers.com. Call the customer to quote.",
  ]
    .filter((line) => line !== "")
    .join("\n");
}

function clientSms(lead: LeadNotifyInput): string {
  const n = firstName(lead.name);
  return `Hi ${n} — Toro Movers! We got your quote request. ${FUNNEL_SLA}. Questions? ${PHONE_DISPLAY}. ${FUNNEL_BILINGUAL}. Reply STOP to opt out.`;
}

function clientEmail(lead: LeadNotifyInput): { subject: string; text: string; html: string } {
  const n = firstName(lead.name);
  const subject = "We got your quote request — Toro Movers";
  const text = [
    `Hi ${n} — Toro Movers here!`,
    ``,
    `${FUNNEL_SLA}. We’ll confirm availability and clear, up-front pricing — no hidden fees.`,
    ``,
    lead.serviceType ? `What you selected: ${lead.serviceType}` : "",
    `While you wait, here's why Central Florida chooses Toro Movers:`,
    `- 4.9★ on Google · 1,000+ local moves`,
    `- Family-owned local crew — committed to every job`,
    `- ${FUNNEL_BILINGUAL}`,
    `- Careful handling, on-time crews, up-front hourly rates`,
    ``,
    `See our reviews: ${GOOGLE_MAPS_REVIEWS_URL}`,
    ``,
    `Questions right away? Call or text ${PHONE_DISPLAY}.`,
    ``,
    `— Toro Movers`,
    `Central Florida · toromovers.com`,
    `hello@toromovers.com`,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const html = text
    .split("\n")
    .map((line) => (line ? `<p style="margin:0 0 10px;font:15px/1.5 system-ui,sans-serif;color:#111">${escapeHtml(line)}</p>` : "<br/>"))
    .join("");

  return { subject, text, html };
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Soft lead: Telegram + team Quo SMS.
 * Full lead: Telegram + team Quo SMS + client SMS (+ client email if address present).
 * Missing QUO_API_KEY never blocks lead acceptance.
 */
export async function notifyLead(lead: LeadNotifyInput): Promise<NotifyResult[]> {
  const results: NotifyResult[] = [];

  // Internal — Telegram always
  results.push(await sendTelegram(teamMessage(lead)));

  // Internal — Quo SMS: FROM workspace 689 → TO personal 321 (do not swap)
  results.push(
    await sendQuoMessage({
      to: leadSmsTo(),
      from: quoFromNumber(),
      content: formatTeamLeadSms(lead),
      channel: "sms-team",
    }),
  );

  if (lead.kind === "soft") {
    return results;
  }

  // Client SMS
  if (lead.consentSms === false) {
    results.push({ ok: false, channel: "sms-client", detail: "no SMS consent" });
  } else {
    results.push(await sendSms(lead.phone, clientSms(lead)));
  }

  // Client email (only when we have an address)
  const email = lead.email?.trim().toLowerCase();
  if (!email) {
    results.push({
      ok: false,
      channel: "email",
      detail: "no client email on lead",
    });
  } else {
    const copy = clientEmail(lead);
    results.push(
      await sendEmail({
        to: email,
        subject: copy.subject,
        text: copy.text,
        html: copy.html,
        replyTo: process.env.RESEND_FROM_EMAIL || "hello@toromovers.com",
      }),
    );
  }

  return results;
}
