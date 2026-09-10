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
 * Resend 422 is usually a domain mismatch: `from` must be on a domain
 * verified in Resend. Public from-address example is hello@toromovers.com.
 * Never hardcode .com or .net — read RESEND_FROM_EMAIL only (bare address;
 * wrap once). Also avoid double-wrapping (`Toro Movers <Toro Movers <…>>`)
 * and putting a display name in `reply_to`.
 */

/** Hosted PNG for email clients (Outlook does not render SVG). Light-header mark. */
export const LEAD_EMAIL_BULL_PNG =
  "https://toromovers.com/logos/toro-bull-black.png";

export function resendSender(fromRaw?: string): {
  from: string;
  replyTo: string;
  email: string;
} | null {
  const email = parseBareEmail(fromRaw || process.env.RESEND_FROM_EMAIL || "");
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
      return `HTTP ${status} domain not verified — RESEND_FROM_EMAIL must match a verified Resend domain (example: hello@toromovers.com)`;
    }
    if (lower.includes("invalid") && lower.includes("from")) {
      return `HTTP ${status} invalid from — set RESEND_FROM_EMAIL to a bare address on the verified domain`;
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
          <td bgcolor="#ffffff" style="padding:8px 0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4;color:#52525b;width:120px;vertical-align:top">${escapeHtml(label)}</td>
          <td bgcolor="#ffffff" style="padding:8px 0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.4;color:${INK};font-weight:bold">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  <title>${escapeHtml(subject)}</title>
  <!--[if mso]>
  <style type="text/css">
    table, td, p, a, h1 { font-family: Arial, Helvetica, sans-serif !important; }
  </style>
  <![endif]-->
</head>
<body bgcolor="#f4f4f5" style="margin:0;padding:0;background-color:#f4f4f5;color:${INK};font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    We received your quote request. Usually call back within 15 minutes Mon–Sat, 7am–7pm.
  </div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f5" style="background-color:#f4f4f5;font-family:Arial,Helvetica,sans-serif;">
    <tr>
      <td align="center" bgcolor="#f4f4f5" style="padding:24px 12px;background-color:#f4f4f5;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="width:100%;max-width:600px;background-color:#ffffff;">
          <tr>
            <td bgcolor="#ffffff" style="background-color:#ffffff;padding:22px 28px 18px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle" bgcolor="#ffffff" style="padding:0 14px 0 0;background-color:#ffffff;">
                    <img src="${LEAD_EMAIL_BULL_PNG}" width="48" height="48" alt="Toro Movers" style="display:block;border:0;outline:none;text-decoration:none;width:48px;height:48px;"/>
                  </td>
                  <td valign="middle" bgcolor="#ffffff" style="background-color:#ffffff;">
                    <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:20px;line-height:1;font-weight:bold;letter-spacing:0.06em;color:${INK};">
                      TORO <span style="color:${ACCENT};">MOVERS</span>
                    </p>
                    <p style="margin:6px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.3;color:#52525b;">Central Florida</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td bgcolor="${ACCENT}" height="4" style="background-color:${ACCENT};height:4px;font-size:0;line-height:0;">&nbsp;</td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding:28px 28px 8px;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${INK};">
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.4;font-weight:bold;letter-spacing:0.08em;text-transform:uppercase;color:${ACCENT};">Quote request received</p>
              <h1 style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:24px;line-height:1.25;font-weight:bold;color:${INK};">Hi ${escapeHtml(n)}, we got it.</h1>
              <p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${INK};">${escapeHtml(FUNNEL_SLA)}.</p>
              <p style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:${INK};">We’ll confirm availability and clear, up-front pricing — no hidden fees.</p>
              ${
                detailRows
                  ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;border-top:1px solid #e4e4e7;border-bottom:1px solid #e4e4e7">${detailRows}</table>`
                  : ""
              }
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;">
                <tr>
                  <td bgcolor="${ACCENT}" style="background-color:${ACCENT};padding:14px 22px;">
                    <a href="${PHONE_TEL}" style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1;font-weight:bold;color:#ffffff;text-decoration:none;">Call ${escapeHtml(phone)}</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:${INK};">${escapeHtml(FUNNEL_ESPANOL)}. ${escapeHtml(FUNNEL_BILINGUAL)}.</p>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#52525b;">
                ${escapeHtml(FUNNEL_GOOGLE_RATING)} · ${escapeHtml(FUNNEL_MOVES)} · ${escapeHtml(FUNNEL_FAMILY)} local crew · careful handling and on-time crews
              </p>
              <p style="margin:0 0 8px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#52525b;">${escapeHtml(FUNNEL_LOCAL_NOTE)}</p>
              <p style="margin:0 0 24px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;">
                <a href="${GOOGLE_MAPS_REVIEWS_URL}" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">See our Google reviews</a>
                &nbsp;·&nbsp;
                <a href="${SITE_URL}" style="color:${ACCENT};font-weight:bold;text-decoration:underline;">toromovers.com</a>
              </p>
              <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.5;color:#52525b;">
                — Toro Movers<br/>
                ${escapeHtml(phone)} · ${escapeHtml(EMAIL)}
              </p>
            </td>
          </tr>
          <tr>
            <td bgcolor="#ffffff" style="padding:16px 28px 28px;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;color:#a1a1aa;">
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
