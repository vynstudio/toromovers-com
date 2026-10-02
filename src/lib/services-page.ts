/**
 * Visible copy for /services.
 * The hourly rate appears only in the shared FAQ answer and its FAQPage JSON-LD.
 * Homepage service cards stay in services-hub.ts.
 */

import { quoteFaqs, QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { servicesHub } from "./services-hub.ts";
import { SITE_URL } from "./site.ts";

export const SERVICES_PATH = "/services";
export const SERVICES_URL = `${SITE_URL}${SERVICES_PATH}`;
export const SERVICES_PHONE = "321-234-0510";
export const SERVICES_PHONE_TEL = "tel:+13212340510";
export const SERVICES_H1 = "Orlando movers for full-service, labor-only & apartments";
export const SERVICES_TITLE = "Moving services in Orlando & Central Florida";
export const SERVICES_LEDE =
  "Three clear ways to hire Toro Movers in Orlando: full-service local moving, labor-only loading, or apartment movers. Nearby Central Florida coverage is listed below.";
export const SERVICES_DESCRIPTION =
  "Moving services in Orlando and Central Florida: full-service local moving, labor-only loading, and apartment movers. Call 321-234-0510.";
export const SERVICES_OG_TITLE = "Moving services in Orlando and Central Florida";
export const SERVICES_FOOT =
  "Not sure which option fits? Get a free quote above, or call 321-234-0510. We will match the right crew for your Central Florida move.";

const BODIES: Record<string, string> = {
  "/full-service-moving":
    "Homes, townhomes, and apartments in Orlando. The crew loads, carries, and places each room.",
  "/labor-only-moving":
    "You have the U-Haul, POD, or rental truck. We bring the crew to load or unload it.",
  "/apartment-movers-orlando-fl":
    "Stairs, elevators, loading zones, and move-in windows planned before the crew arrives.",
  "/loading-unloading":
    "Short load and unload help when the job is not a full household move.",
  "/orlando-movers-gallery": "See recent moves from Orlando homes and apartments.",
  "/central-florida-movers":
    "Local crews for nearby Central Florida cities. See the region page for coverage and access notes.",
  "/packing-services-orlando":
    "The crew boxes a named room or the loose goods before the carry.",
  "/office-movers-orlando":
    "Small offices and light commercial suites, including after-hours windows when the building allows.",
  "/same-day-movers-orlando":
    "A local hop when a crew is still open. Not a guarantee. Share both addresses when you ask.",
  "/small-moves-orlando":
    "One piece, a few pieces, or a furniture pickup and delivery inside Central Florida.",
  "/pod-loading-orlando":
    "Load or unload a POD, U-Haul, or storage unit. You keep the truck or container.",
};

export type ServicesPageCard = {
  title: string;
  href: string;
  body: string;
  badge?: string;
  linkLabel: string;
};

function toCard(item: (typeof servicesHub.primary)[number]): ServicesPageCard {
  const body = BODIES[item.href];
  if (!body) throw new Error(`Missing /services copy for ${item.href}`);
  return {
    title: item.title,
    href: item.href,
    body,
    badge: "badge" in item ? item.badge : undefined,
    linkLabel: item.linkLabel ?? "View service",
  };
}

export const servicesPagePrimary: ServicesPageCard[] = servicesHub.primary.map(toCard);
export const servicesPageSecondary: ServicesPageCard[] = servicesHub.secondary.map(toCard);

export function servicesFaqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SERVICES_URL}#faq`,
    mainEntity: quoteFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export { QUOTE_RATE_ANSWER };
