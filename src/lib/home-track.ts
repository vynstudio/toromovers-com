import { consentGranted } from "@/lib/tracking-consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const LEAD_KEY = "tm_home_lead_fired_";

/** dataLayer plus gtag when a GA4 tag is already on the page. */
export function trackHome(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (consentGranted("analytics")) {
    try {
      window.gtag?.("event", event, data);
    } catch {
      /* no GA4 tag */
    }
  }
  if (!consentGranted("marketing")) return;
  try {
    window.fbq?.("trackCustom", event, data);
  } catch {
    /* pixel stub missing */
  }
}

/** Standard generate_lead, once per event id, matching the server CAPI event_id. */
export function trackHomeLead(
  eventId: string,
  service: string,
  contentName = "homepage_quote",
) {
  if (typeof window === "undefined" || !eventId) return;
  const key = `${LEAD_KEY}${eventId}`;
  try {
    if (window.sessionStorage.getItem(key) === "1") return;
    window.sessionStorage.setItem(key, "1");
  } catch {
    /* private mode */
  }
  const payload = { content_name: contentName, service };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "generate_lead", event_id: eventId, ...payload });
  if (consentGranted("analytics")) {
    try {
      window.gtag?.("event", "generate_lead", { event_id: eventId, ...payload });
    } catch {
      /* no GA4 tag */
    }
  }
  if (!consentGranted("marketing")) return;
  try {
    window.fbq?.("track", "Lead", payload, { eventID: eventId });
  } catch {
    /* pixel stub missing */
  }
}
