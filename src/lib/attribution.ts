export type Attribution = Record<string, string>;

const KEYS = [
  "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "utm_id",
  "gclid", "gbraid", "wbraid", "fbclid", "fbp", "fbc", "msclkid", "ttclid",
] as const;
const STORAGE_KEY = "toro_ads_attribution_v1";

function cookie(name: string): string {
  if (typeof document === "undefined") return "";
  const parts = document.cookie.split("; ");
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) {
      return decodeURIComponent(part.slice(name.length + 1));
    }
  }
  return "";
}

function readQuery(): Attribution {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const result = KEYS.reduce<Attribution>((acc, key) => {
    const value = params.get(key);
    if (value) acc[key] = value;
    return acc;
  }, {});
  const fbp = cookie("_fbp");
  const fbc = cookie("_fbc");
  if (fbp && !result.fbp) result.fbp = fbp;
  if (fbc && !result.fbc) result.fbc = fbc;
  if (!result.fbc && result.fbclid) {
    result.fbc = `fb.1.${Date.now()}.${result.fbclid}`;
  }
  return result;
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
