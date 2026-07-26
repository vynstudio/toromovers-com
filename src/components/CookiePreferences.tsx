"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "toro_cookie_prefs";

type Prefs = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

function readPrefs(): Prefs | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Prefs;
  } catch {
    return null;
  }
}

function writePrefs(prefs: Prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent("toro-cookie-prefs", { detail: prefs }));
}

/**
 * Cookie preference panel — monochrome, Flex-style categories.
 * Necessary cookies are always on; analytics/marketing are optional.
 */
export function CookiePreferences() {
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const p = readPrefs();
    if (p) {
      setAnalytics(p.analytics);
      setMarketing(p.marketing);
    }
    setHydrated(true);
  }, []);

  const save = (next: { analytics: boolean; marketing: boolean }) => {
    setAnalytics(next.analytics);
    setMarketing(next.marketing);
    writePrefs({
      analytics: next.analytics,
      marketing: next.marketing,
      updatedAt: new Date().toISOString(),
    });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  if (!hydrated) {
    return (
      <div className="cookie-prefs" aria-hidden>
        <p className="text-sm text-muted">Loading preferences…</p>
      </div>
    );
  }

  return (
    <div className="cookie-prefs rounded-2xl border border-border bg-[#fafafa] p-5 sm:p-6">
      <p className="text-sm font-medium text-foreground">Your cookie preferences</p>
      <p className="mt-1 text-sm text-muted">
        Choose optional cookies. Strictly necessary cookies stay on so the site
        can work.
      </p>

      <ul className="mt-5 space-y-4">
        <li className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Strictly necessary</p>
            <p className="mt-0.5 text-xs text-muted">
              Required for security, forms, and consent storage. Always active.
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-white">
            Always on
          </span>
        </li>
        <li className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Analytics</p>
            <p className="mt-0.5 text-xs text-muted">
              Helps us understand traffic and improve quote conversion.
            </p>
          </div>
          <label className="cookie-toggle">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              aria-label="Enable analytics cookies"
            />
            <span />
          </label>
        </li>
        <li className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">Marketing</p>
            <p className="mt-0.5 text-xs text-muted">
              Measures ads and may personalize marketing. Optional.
            </p>
          </div>
          <label className="cookie-toggle">
            <input
              type="checkbox"
              checked={marketing}
              onChange={(e) => setMarketing(e.target.checked)}
              aria-label="Enable marketing cookies"
            />
            <span />
          </label>
        </li>
      </ul>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary tap-target rounded-full px-5 text-sm"
          onClick={() => save({ analytics: true, marketing: true })}
        >
          Accept all
        </button>
        <button
          type="button"
          className="btn-outline tap-target rounded-full px-5 text-sm"
          onClick={() => save({ analytics: false, marketing: false })}
        >
          Reject optional
        </button>
        <button
          type="button"
          className="btn-outline tap-target rounded-full px-5 text-sm"
          onClick={() => save({ analytics, marketing })}
        >
          Save choices
        </button>
      </div>
      {saved ? (
        <p className="mt-3 text-sm text-foreground" role="status">
          Preferences saved.
        </p>
      ) : null}
    </div>
  );
}
