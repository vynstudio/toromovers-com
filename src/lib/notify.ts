/**
 * Outbound notifications for toromovers.com leads.
 * - Internal: Telegram only
 * - Client: SMS (OpenPhone) + email (Resend from hello@toromovers.com)
 * Fail-soft: never throws to callers.
 */

import {
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  PHONE_DISPLAY,
  REVIEW_COUNT,
} from "@/lib/site";

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

export async function sendSms(
  toRaw: string,
  content: string,
): Promise<NotifyResult> {
  const apiKey = process.env.OPENPHONE_API_KEY || process.env.QUO_API_KEY;
  const from = process.env.OPENPHONE_FROM_NUMBER || process.env.QUO_FROM_NUMBER;
  if (!apiKey || !from) {
    return {
      ok: false,
      channel: "sms",
      detail: "OPENPHONE_API_KEY / OPENPHONE_FROM_NUMBER missing",
    };
  }
  const to = e164(toRaw);
  if (!to) {
    return { ok: false, channel: "sms", detail: "invalid phone" };
  }
  try {
    const res = await fetch("https://api.openphone.com/v1/messages", {
      method: "POST",
      headers: {
        Authorization: apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], content }),
    });
    if (!res.ok) {
      const t = await res.text().catch(() => "");
      console.error("[notify/sms]", res.status, t.slice(0, 200));
      return { ok: false, channel: "sms", detail: `HTTP ${res.status}` };
    }
    return { ok: true, channel: "sms" };
  } catch (err) {
    console.error("[notify/sms] threw", err);
    return { ok: false, channel: "sms", detail: "threw" };
  }
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

function clientSms(lead: LeadNotifyInput): string {
  const n = firstName(lead.name);
  return `Hi ${n} — Toro Movers! We got your quote request and will call soon with pricing & availability. See why Central Florida chooses us: ${GOOGLE_MAPS_REVIEWS_URL} Questions? ${PHONE_DISPLAY}. Reply STOP to opt out.`;
}

function clientEmail(lead: LeadNotifyInput): { subject: string; text: string; html: string } {
  const n = firstName(lead.name);
  const subject = "We got your quote request — Toro Movers";
  const text = [
    `Hi ${n} — Toro Movers here!`,
    ``,
    `We got your quote request. A team member will call or text you shortly with availability and clear, up-front pricing — no hidden fees.`,
    ``,
    lead.serviceType ? `What you selected: ${lead.serviceType}` : "",
    `While you wait, here's why Central Florida chooses Toro Movers:`,
    `- ${GOOGLE_RATING}★ rated on Google, ${REVIEW_COUNT}+ reviews`,
    `- Family-owned, local crew — not a national franchise hand-off`,
    `- Bilingual English & Spanish communication`,
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
 * Soft lead: Telegram to team only.
 * Full lead: Telegram + client SMS (+ client email if address present).
 */
export async function notifyLead(lead: LeadNotifyInput): Promise<NotifyResult[]> {
  const results: NotifyResult[] = [];

  // Internal — Telegram always
  results.push(await sendTelegram(teamMessage(lead)));

  if (lead.kind === "soft") {
    return results;
  }

  // Client SMS
  if (lead.consentSms === false) {
    results.push({ ok: false, channel: "sms", detail: "no SMS consent" });
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
