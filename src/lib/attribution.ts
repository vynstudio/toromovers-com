export type Attribution = Record<string, string>;

const KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "gclid", "gbraid", "wbraid", "fbclid", "msclkid", "ttclid",
] as const;
const STORAGE_KEY = "toro_ads_attribution_v1";

function readQuery(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return KEYS.reduce<Attribution>((result, key) => {
    const value = params.get(key);
    if (value) result[key] = value;
    return result;
  }, {});
}

export function captureAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  const now = new Date().toISOString();
  const incoming = readQuery();
  const stored = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}") as Attribution;
  const firstTouch = stored.first_touch_at ? stored : { ...incoming, first_touch_at: now, first_landing_page: window.location.pathname, first_referrer: document.referrer };
  const next = {
    ...firstTouch,
    ...incoming,
    last_touch_at: now,
    last_landing_page: window.location.pathname,
    last_referrer: document.referrer,
  };
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "{}") as Attribution;
}
