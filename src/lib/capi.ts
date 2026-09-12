import { createHash } from "node:crypto";

const PIXEL =
  process.env.META_PIXEL_ID ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  "985575491098437";

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function hashPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 10) digits = `1${digits}`;
  if (digits.length < 11) return null;
  return sha256(digits);
}

function hashName(raw: string): string | null {
  const first = raw.trim().toLowerCase().split(/\s+/)[0] || "";
  if (first.length < 2) return null;
  return sha256(first);
}

export type CapiLeadInput = {
  eventId: string;
  name?: string;
  phone?: string;
  sourceUrl?: string;
  contentName?: string;
  fbp?: string;
  fbc?: string;
  clientIp?: string;
  userAgent?: string;
};

/**
 * Fail-soft Conversions API Lead. Same event_id as the browser pixel.
 * Skips when META_ACCESS_TOKEN is missing. Never throws to callers.
 */
export async function sendCapiLead(input: CapiLeadInput): Promise<{
  ok: boolean;
  detail?: string;
  events_received?: number;
}> {
  const token = (
    process.env.PIXEL_TOKEN ||
    process.env.META_CAPI_TOKEN ||
    process.env.META_PIXEL_ACCESS_TOKEN ||
    process.env.META_ACCESS_TOKEN ||
    ""
  ).trim();
  if (!token) return { ok: false, detail: "PIXEL_TOKEN / META_ACCESS_TOKEN missing" };
  if (!input.eventId) return { ok: false, detail: "event_id missing" };

  const userData: Record<string, unknown> = {};
  const ph = input.phone ? hashPhone(input.phone) : null;
  const fn = input.name ? hashName(input.name) : null;
  if (ph) userData.ph = [ph];
  if (fn) userData.fn = [fn];
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;
  if (input.clientIp) userData.client_ip_address = input.clientIp;
  if (input.userAgent) userData.client_user_agent = input.userAgent;

  const event: Record<string, unknown> = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    event_id: input.eventId,
    event_source_url:
      input.sourceUrl || "https://toromovers.com/get-my-price",
    action_source: "website",
    custom_data: {
      content_name: input.contentName || "ads_short_callback",
    },
  };
  if (Object.keys(userData).length) event.user_data = userData;

  const body: Record<string, unknown> = { data: [event] };
  const testCode = (process.env.META_TEST_EVENT_CODE || "").trim();
  if (testCode) body.test_event_code = testCode;

  try {
    const res = await fetch(
      `https://graph.facebook.com/v22.0/${PIXEL}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      },
    );
    const text = await res.text().catch(() => "");
    let json: Record<string, unknown> | null = null;
    try {
      json = text ? (JSON.parse(text) as Record<string, unknown>) : null;
    } catch {
      json = null;
    }
    if (!res.ok) {
      console.error("[capi]", res.status, text.slice(0, 200));
      return { ok: false, detail: `HTTP ${res.status}` };
    }
    return {
      ok: true,
      events_received:
        typeof json?.events_received === "number"
          ? json.events_received
          : undefined,
    };
  } catch (err) {
    console.error("[capi] threw", err);
    return { ok: false, detail: "threw" };
  }
}
