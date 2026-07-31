"use client";

import dynamic from "next/dynamic";

/**
 * Heavy client-only chrome loaded after first paint.
 * Kept in a client boundary so pages can stay Server Components.
 */
const LeadModal = dynamic(
  () => import("@/components/LeadModal").then((m) => m.LeadModal),
  { ssr: false },
);

const CookieBanner = dynamic(
  () => import("@/components/CookieBanner").then((m) => m.CookieBanner),
  { ssr: false },
);

export function ClientChrome() {
  return (
    <>
      <LeadModal />
      <CookieBanner />
    </>
  );
}
