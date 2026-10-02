import { consentGranted } from "@/lib/tracking-consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const EVENT_KEY = "tm_gmp_event_id";
const FIRED_PREFIX = "tm_ads_lead_fired_";

export function mintEventId(): string {
  const fallback = () =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `lead-${Date.now()}`;
  if (typeof window === "undefined") return fallback();
  try {
    const existing = window.sessionStorage.getItem(EVENT_KEY);
    if (existing) return existing;
    const next = fallback();
    window.sessionStorage.setItem(EVENT_KEY, next);
    return next;
  } catch {
    return fallback();
  }
}

/** One browser Lead after /api/lead ok. Same eventID as CAPI event_id. */
export function fireAdsLeadOnce(eventId: string): boolean {
  if (typeof window === "undefined" || !eventId) return false;
  const key = `${FIRED_PREFIX}${eventId}`;
  try {
    if (window.sessionStorage.getItem(key) === "1") return false;
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* private mode — still fire once this page lifetime */
  }
  if (!consentGranted("marketing")) return true;
  try {
    window.fbq?.(
      "track",
      "Lead",
      { content_name: "ads_short_callback" },
      { eventID: eventId },
    );
  } catch {
    /* pixel not loaded */
  }
  return true;
}

/** Pixel Lead plus GA4 generate_lead, once, with the same id sent to CAPI. */
export function fireBrowserLead(
  eventId: string,
  contentName: string,
  extra: Record<string, unknown> = {},
): void {
  if (typeof window === "undefined" || !eventId) return;
  const key = `tm_browser_lead_${eventId}`;
  try {
    if (window.sessionStorage.getItem(key) === "1") return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* private mode */
  }
  const payload = { content_name: contentName, event_id: eventId, ...extra };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", ...payload });
  if (consentGranted("analytics")) {
    try {
      window.gtag?.("event", "generate_lead", payload);
    } catch {
      /* tag not ready */
    }
  }
  if (!consentGranted("marketing")) return;
  try {
    window.fbq?.(
      "track",
      "Lead",
      { content_name: contentName, ...extra },
      { eventID: eventId },
    );
  } catch {
    /* pixel not loaded */
  }
}
