"use client";

import { ScrollToHero } from "@/components/ScrollToHero";

/**
 * Heavy client-only chrome loaded after first paint.
 * Cookie consent is the shared script in Base.astro.
 */
export function ClientChrome() {
  return <ScrollToHero />;
}
