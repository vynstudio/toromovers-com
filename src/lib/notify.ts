/**
 * Outbound notifications for toromovers.com leads.
 * - Internal: Telegram only (no team Quo SMS)
 * - Client: SMS (Quo to lead.phone) + branded email (Resend)
 * Fail-soft: never throws to callers.
 */

import { FUNNEL_BILINGUAL, FUNNEL_SLA } from "./funnel-offer.ts";
import { PHONE_DISPLAY } from "./site.ts";
import {
  buildLeadConfirmationEmail,
  formatResendError,
  parseBareEmail,
  resendSender,
} from "./lead-email.ts";

/**
 * Client SMS: POST https://api.quo.com/v1/messages
 * Team alerts are Telegram only — do not SMS LEAD_SMS_TO.
 */
export const QUO_MESSAGES_URL = "https://api.quo.com/v1/messages";
export const QUO_API_VERSION = "2026-03-30";
/** Quo workspace / sending number (689-600-2720). Client SMS FROM only. */
export const DEFAULT_QUO_FROM = "+16896002720";
/** Unused for team alerts (Telegram only). Kept so existing Netlify env is harmless. */
export const DEFAULT_LEAD_SMS_TO = "+13217580094";
/** Same 689 workspace sender as a Quo phoneNumberId. Used if E.164 `from` is rejected. */
export const DEFAULT_QUO_FROM_PHONE_NUMBER_ID = "PN3sKfvpYp";
export const QUO_USER_AGENT =
  "Mozilla/5.0 (compatible; ToroMoversLead/1.0; +https://toromovers.com) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";


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

export function quoApiKey(): string {
  return (process.env.QUO_API_KEY || process.env.OPENPHONE_API_KEY || "")
    .trim()
    .replace(/^Bearer\s+/i, "")
    .trim();
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

export function quoFromPhoneNumberId(): string {
  return (
    process.env.QUO_FROM_PHONE_NUMBER_ID || DEFAULT_QUO_FROM_PHONE_NUMBER_ID
  ).trim();
}

function redactQuoLog(text: string, apiKey: string): string {
  let out = String(text || "").replace(/\s+/g, " ").slice(0, 200);
  if (apiKey) out = out.split(apiKey).join("[redacted]");
  return out.replace(/Bearer\s+\S+/gi, "Bearer [redacted]");
}

function quoDetail(status: number, body: string): string {
  if (status === 401) {
    return "HTTP 401 Unauthorized — rotate QUO_API_KEY in Netlify";
  }
  try {
    const json = JSON.parse(body) as { error?: { message?: string }; message?: string };
    const msg = json.error?.message || json.message;
    return msg ? `HTTP ${status} ${msg}` : `HTTP ${status}`;
  } catch {
    return `HTTP ${status}`;
  }
}

/** Send one SMS via Quo. Never throws. Never logs the API key. */
export async function sendQuoMessage(opts: {
  to: string;
  content: string;
  from?: string;
  channel?: string;
}): Promise<NotifyResult> {
  const channel = opts.channel || "sms";
  const apiKey = quoApiKey();
  if (!apiKey) {
    console.error("[quo] QUO_API_KEY missing — lead accepted; SMS not sent");
    return { ok: false, channel, detail: "QUO_API_KEY missing" };
  }
  const to = e164(opts.to);
  if (!to) {
    return { ok: false, channel, detail: "invalid phone" };
  }
  const e164From = e164(opts.from || quoFromNumber()) || quoFromNumber();
  const fromValues = [e164From, quoFromPhoneNumberId()].filter(
    (value, index, all) => value && all.indexOf(value) === index,
  );

  let lastDetail = "SMS failed";
  for (const from of fromValues) {
    try {
      const res = await fetch(QUO_MESSAGES_URL, {
        method: "POST",
        headers: {
          Authorization: apiKey,
          "Quo-Api-Version": QUO_API_VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": QUO_USER_AGENT,
        },
        body: JSON.stringify({ content: opts.content, from, to: [to] }),
      });
      const body = await res.text().catch(() => "");
      if (res.ok) return { ok: true, channel };
      lastDetail = quoDetail(res.status, body);
      console.error("[quo] SMS failed", lastDetail, redactQuoLog(body, apiKey));
      // 401 is a bad/rotated key — retrying phoneNumberId will not help.
      if (res.status === 401 || ![400, 403, 422].includes(res.status)) break;
    } catch (err) {
      lastDetail = "threw";
      console.error("[quo] SMS threw", err instanceof Error ? err.message : "threw");
      break;
    }
  }
  return { ok: false, channel, detail: lastDetail };
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
  const apiKey = (process.env.RESEND_API_KEY || "").trim();
  const sender = resendSender();
  const to = parseBareEmail(opts.to);
  if (!apiKey) {
    console.error("[notify/email] RESEND_API_KEY missing — lead accepted; email not sent");
    return { ok: false, channel: "email", detail: "RESEND_API_KEY missing" };
  }
  if (!sender) {
    console.error(
      "[notify/email] RESEND_FROM_EMAIL missing or invalid — set it to hello@toromovers.net (current prod). Do not hardcode .com if .net is verified.",
    );
    return {
      ok: false,
      channel: "email",
      detail: "RESEND_FROM_EMAIL missing or invalid",
    };
  }
  if (!to) {
    return { ok: false, channel: "email", detail: "invalid recipient email" };
  }
  if (!opts.subject.trim() || (!opts.html.trim() && !opts.text.trim())) {
    return { ok: false, channel: "email", detail: "missing subject or body" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender.from,
        to: [to],
        reply_to: parseBareEmail(opts.replyTo || "") || sender.replyTo,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
      }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      const detail = formatResendError(res.status, t);
      const safe = t.replace(apiKey, "[redacted]").replace(/\s+/g, " ").slice(0, 200);
      console.error("[notify/email]", detail, safe);
      return { ok: false, channel: "email", detail };
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

function clientSms(lead: LeadNotifyInput): string {
  const n = firstName(lead.name);
  return `Hi ${n} — Toro Movers! We got your quote request. ${FUNNEL_SLA}. Questions? ${PHONE_DISPLAY}. ${FUNNEL_BILINGUAL}. Reply STOP to opt out.`;
}

/**
 * Team: Telegram only.
 * Full lead: client SMS (Quo → lead.phone) + branded confirmation email.
 */
export async function notifyLead(lead: LeadNotifyInput): Promise<NotifyResult[]> {
  const results: NotifyResult[] = [];

  results.push(await sendTelegram(teamMessage(lead)));

  if (lead.kind === "soft") {
    return results;
  }

  if (lead.consentSms === false) {
    results.push({ ok: false, channel: "sms-client", detail: "no SMS consent" });
  } else {
    results.push(await sendSms(lead.phone, clientSms(lead)));
  }

  const email = parseBareEmail(lead.email || "");
  if (!email) {
    results.push({
      ok: false,
      channel: "email",
      detail: "no client email on lead",
    });
  } else {
    const copy = buildLeadConfirmationEmail(lead);
    results.push(
      await sendEmail({
        to: email,
        subject: copy.subject,
        text: copy.text,
        html: copy.html,
      }),
    );
  }

  return results;
}
