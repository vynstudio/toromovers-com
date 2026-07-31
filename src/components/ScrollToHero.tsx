"use client";

import { useEffect } from "react";

/**
 * Refresh always lands on the homepage hero (top of `/`).
 * Stops browser scroll restore + mid-page #hash jumps after reload.
 */
export function ScrollToHero() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
    } catch {
      /* ignore */
    }

    const goHomeHero = () => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      const notHome = path !== "/";
      const hasHash = Boolean(window.location.hash);

      // Full refresh / revisit mid-page → home hero
      if (notHome || hasHash) {
        window.location.replace("/");
        return;
      }

      window.scrollTo(0, 0);
    };

    const nav = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming | undefined;

    // Browser refresh → always homepage hero
    if (nav?.type === "reload") {
      goHomeHero();
      return;
    }

    // Landing on `/` or `/#section` → strip hash, pin to hero
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/") {
      if (window.location.hash) {
        window.history.replaceState(null, "", "/");
      }
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
