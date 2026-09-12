declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
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
