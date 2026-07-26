"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "toro_cookie_prefs";

/**
 * Minimal first-visit cookie notice — monochrome.
 * Full controls live on /cookies.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      /* ignore */
    }
  }, []);

  const save = (all: boolean) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          analytics: all,
          marketing: all,
          updatedAt: new Date().toISOString(),
        }),
      );
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-label="Cookie notice">
      <div className="cookie-banner-inner">
        <p className="cookie-banner-text">
          We use cookies to run the site and, with your OK, measure traffic. See
          our{" "}
          <Link href="/cookies" className="underline underline-offset-2">
            Cookie Policy
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="btn-primary tap-target rounded-full px-4 text-sm"
            onClick={() => save(true)}
          >
            Accept
          </button>
          <button
            type="button"
            className="btn-outline tap-target rounded-full px-4 text-sm"
            onClick={() => save(false)}
          >
            Essential only
          </button>
          <Link
            href="/cookies"
            className="tap-target text-sm font-medium text-foreground underline underline-offset-2"
          >
            Preferences
          </Link>
        </div>
      </div>
    </div>
  );
}
