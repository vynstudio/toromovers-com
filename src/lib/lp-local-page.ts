/**
 * Visible copy for /lp/local-movers.
 * The hourly rate appears only in the shared FAQ answer and its FAQPage JSON-LD.
 */

import { quoteFaqs } from "./quote-faqs.ts";

export const LP_PATH = "/lp/local-movers";
export const LP_PHONE = "321-234-0510";
export const LP_PHONE_TEL = "tel:+13212340510";
export const LP_TITLE = "Local Movers in Central Florida | Free Quote";
export const LP_DESCRIPTION =
  "Get a free quote from Toro Movers for local moving, labor-only help, rental truck loading, PODs, and more in Central Florida.";
export const LP_H1 =
  "Reliable Central Florida movers. Get your free quote today.";
export const LP_LEDE =
  "Full-service moves, loading help, PODs, rental trucks, and single-item moves. Tell us about the job and a local mover calls you back.";
export const LP_ROBOTS = { index: false, follow: false } as const;

export const LP_SERVICES = [
  "Full-service moves for houses and apartments",
  "Labor-only loading and unloading",
  "Same-building apartment and condo moves",
  "Special-item and single-item moves",
  "POD, container, U-Haul, and rental-truck help",
] as const;

export function lpFaqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quoteFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
