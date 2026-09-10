import {
  FUNNEL_ACCENT,
  FUNNEL_BILINGUAL,
  FUNNEL_ESPANOL,
  FUNNEL_FAMILY,
  FUNNEL_GOOGLE_RATING,
  FUNNEL_INK,
  FUNNEL_LOCAL_NOTE,
  FUNNEL_MOVES,
  FUNNEL_SLA,
} from "./funnel-offer.ts";
import {
  EMAIL,
  GOOGLE_MAPS_REVIEWS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from "./site.ts";

export type LeadEmailInput = {
  name: string;
  serviceType?: string;
  city?: string;
  moveDate?: string;
};

const INK = FUNNEL_INK;
const ACCENT = FUNNEL_ACCENT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DEFAULT_RESEND_FROM_EMAIL = EMAIL;

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "there";
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Bare email from env that may be quoted or already `Name <email>`. */
export function parseBareEmail(raw: string): string | null {
  const trimmed = String(raw || "")
    .trim()
    .replace(/^["']+|["']+$/g, "")
    .trim();
  if (!trimmed) return null;
  const angled = trimmed.match(/<([^>]+)>/);
  const email = (angled ? angled[1] : trimmed).trim().toLowerCase();
  return EMAIL_RE.test(email) ? email : null;
}

/**
 * Resend 422 "Invalid from field" happens when we wrap an already-wrapped
 * address (`Toro Movers <Toro Movers <hello@…>>`) or put a display name in
 * `reply_to`. Always emit `Name <email>` once and a bare `reply_to`.
 */
export function resendSender(fromRaw?: string): {
  from: string;
  replyTo: string;
  email: string;
} | null {
  const email = parseBareEmail(
    fromRaw || process.env.RESEND_FROM_EMAIL || DEFAULT_RESEND_FROM_EMAIL,
  );
  if (!email) return null;
  return {
    email,
    from: `Toro Movers <${email}>`,
    replyTo: email,
  };
}

export function formatResendError(status: number, body: string): string {
  let message = "";
  try {
    const json = JSON.parse(body) as {
      message?: string;
      name?: string;
      error?: string | { message?: string };
    };
    message =
      json.message ||
      (typeof json.error === "string" ? json.error : json.error?.message) ||
      "";
  } catch {
    message = body.replace(/\s+/g, " ").slice(0, 180);
  }
  const lower = message.toLowerCase();
  if (status === 422 || status === 403) {
    if (lower.includes("not verified") || lower.includes("verify a domain")) {
      return `HTTP ${status} domain not verified — verify toromovers.com in Resend and set RESEND_FROM_EMAIL=hello@toromovers.com`;
    }
    if (lower.includes("invalid") && lower.includes("from")) {
      return `HTTP ${status} invalid from — use hello@toromovers.com or Toro Movers <hello@toromovers.com>`;
    }
  }
  return message ? `HTTP ${status} ${message}` : `HTTP ${status}`;
}

export function buildLeadConfirmationEmail(lead: LeadEmailInput): {
  subject: string;
  text: string;
  html: string;
} {
  const n = firstName(lead.name);
  const subject = "We received your quote request — Toro Movers";
  const phone = PHONE_DISPLAY;
  const rows = [
    lead.serviceType ? ["Service", lead.serviceType] : null,
    lead.city ? ["From", lead.city] : null,
    lead.moveDate ? ["When", lead.moveDate] : null,
  ].filter((row): row is [string, string] => row !== null);

  const text = [
    `Hi ${n} — Toro Movers here.`,
    ``,
    `We received your quote request. ${FUNNEL_SLA}.`,
    ``,
    lead.serviceType ? `What you selected: ${lead.serviceType}` : "",
    ``,
    `Need us sooner? Call or text ${phone}.`,
    FUNNEL_ESPANOL,
    ``,
    `Central Florida families choose Toro Movers for:`,
    `- ${FUNNEL_GOOGLE_RATING} · ${FUNNEL_MOVES}`,
    `- ${FUNNEL_FAMILY} local crew`,
    `- ${FUNNEL_BILINGUAL}`,
    `- Up-front hourly rates — no hidden fees`,
    ``,
    FUNNEL_LOCAL_NOTE,
    ``,
    `Reviews: ${GOOGLE_MAPS_REVIEWS_URL}`,
    ``,
    `— Toro Movers`,
    `Central Florida · toromovers.com`,
    EMAIL,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  const detailRows = rows
    .map(
      ([label, value]) =>
        `<tr>
          <td style="padding:8px 0;font:13px/1.4 Arial,Helvetica,sans-serif;color:#52525b;width:120px;vertical-align:top">${escapeHtml(label)}</td>
          <td style="padding:8px 0;font:15px/1.4 Arial,Helvetica,sans-serif;color:${INK};font-weight:700">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;color:${INK}">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5">
    <tr>
      <td align="center" style="padding:24px 12px">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
          <tr>
            <td style="background:${INK};padding:22px 28px">
              <p style="margin:0;font:800 22px/1 Arial,Helvetica,sans-serif;letter-spacing:0.04em;color:#ffffff">
                TORO <span style="color:${ACCENT}">MOVERS</span>
              </p>
              <p style="margin:8px 0 0;font:13px/1.4 Arial,Helvetica,sans-serif;color:#d4d4d8">Central Florida</p>
            </td>
          </tr>
          <tr><td style="height:4px;background:${ACCENT};font-size:0;line-height:0">&nbsp;</td></tr>
          <tr>
            <td style="padding:32px 28px 8px;font:16px/1.6 Arial,Helvetica,sans-serif;color:${INK}">
              <p style="margin:0 0 8px;font:13px/1.4 Arial,Helvetica,sans-serif;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;color:${ACCENT}">Quote request received</p>
              <h1 style="margin:0 0 16px;font:800 26px/1.2 Arial,Helvetica,sans-serif;color:${INK}">Hi ${escapeHtml(n)}, we got it.</h1>
              <p style="margin:0 0 16px">${escapeHtml(FUNNEL_SLA)}.</p>
              <p style="margin:0 0 20px">We’ll confirm availability and clear, up-front pricing — no hidden fees.</p>
              ${
                detailRows
                  ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7">${detailRows}</table>`
                  : ""
              }
              <p style="margin:0 0 24px">
                <a href="${PHONE_TEL}" style="display:inline-block;background:${ACCENT};color:#ffffff;text-decoration:none;font:800 15px/1 Arial,Helvetica,sans-serif;padding:14px 22px;border-radius:10px">Call ${escapeHtml(phone)}</a>
              </p>
              <p style="margin:0 0 8px;font:15px/1.5 Arial,Helvetica,sans-serif">${escapeHtml(FUNNEL_ESPANOL)}. ${escapeHtml(FUNNEL_BILINGUAL)}.</p>
              <p style="margin:0 0 24px;font:14px/1.5 Arial,Helvetica,sans-serif;color:#52525b">
                ${escapeHtml(FUNNEL_GOOGLE_RATING)} · ${escapeHtml(FUNNEL_MOVES)} · ${escapeHtml(FUNNEL_FAMILY)} local crew · careful handling and on-time crews
              </p>
              <p style="margin:0 0 8px;font:13px/1.5 Arial,Helvetica,sans-serif;color:#52525b">${escapeHtml(FUNNEL_LOCAL_NOTE)}</p>
              <p style="margin:0 0 24px;font:13px/1.5 Arial,Helvetica,sans-serif">
                <a href="${GOOGLE_MAPS_REVIEWS_URL}" style="color:${ACCENT};font-weight:700">See our Google reviews</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:${ACCENT};font-weight:700">toromovers.com</a>
              </p>
              <p style="margin:0;font:13px/1.5 Arial,Helvetica,sans-serif;color:#52525b">
                — Toro Movers<br/>
                ${escapeHtml(phone)} · ${escapeHtml(EMAIL)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:16px 28px 28px;font:12px/1.5 Arial,Helvetica,sans-serif;color:#a1a1aa">
              You received this because you requested a moving quote on toromovers.com.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}
