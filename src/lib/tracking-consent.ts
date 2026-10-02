/** One switch for every tag. `notice` loads unless the visitor declines. */
export const TRACKING_CONSENT_MODE = "notice" as const;

export type TrackingConsentMode = "notice" | "opt-in";

const STORAGE_KEY = "toro_cookie_prefs";

function modeFromPage(): TrackingConsentMode {
  if (typeof document === "undefined") return TRACKING_CONSENT_MODE;
  try {
    const el = document.getElementById("toro-track-config");
    const parsed = JSON.parse(el?.textContent || "{}") as { mode?: string };
    if (parsed.mode === "opt-in" || parsed.mode === "notice") return parsed.mode;
  } catch {
    /* use the build default */
  }
  return TRACKING_CONSENT_MODE;
}

/** True when this tag may run. No saved choice allows it only in notice mode. */
export function consentGranted(kind: "analytics" | "marketing"): boolean {
  if (typeof window === "undefined") return false;
  const mode = modeFromPage();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return mode === "notice";
    return !!(JSON.parse(raw) as { analytics?: boolean; marketing?: boolean })[kind];
  } catch {
    return mode === "notice";
  }
}
