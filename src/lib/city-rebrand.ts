/**
 * Shared shape for rebranded city pages. Copy lives in one module per city.
 * The only price is QUOTE_RATE_ANSWER.
 */

import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_E164,
  SERVICE_REGION,
  SITE_URL,
} from "./site.ts";
import { businessPostalAddress, cityPlace } from "./business-profile.ts";

export type CityRebrandCopy = {
  slug: string;
  path: string;
  source: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lede: string;
  chips: string[];
  cityName: string;
  county: string;
  sections: { h2: string; paragraphs: string[] }[];
  /** Short sample layout. Long city pages leave this unset. */
  included?: { heading: string; items: string[] };
  localNote?: string;
  faqs: { q: string; a: string }[];
  servicesHeading: string;
  servicesIntro: string;
  nearbyHeading: string;
  nearbyIntro: string;
  closing: { h2: string; body: string };
};

export function cityRebrandWordCount(copy: CityRebrandCopy): number {
  const parts = [
    copy.lede,
    ...(copy.included?.items ?? []),
    ...(copy.localNote ? [copy.localNote] : []),
    ...copy.sections.flatMap((section) => section.paragraphs),
    ...copy.faqs.map((item) => item.a),
    copy.servicesIntro,
    copy.nearbyIntro,
    copy.closing.body,
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}

export function cityRebrandGraph(copy: CityRebrandCopy) {
  const pageUrl = `${SITE_URL}${copy.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["MovingCompany", "LocalBusiness"],
        "@id": `${pageUrl}#business`,
        name: `${BUSINESS_NAME}, ${copy.cityName} movers`,
        url: pageUrl,
        telephone: PHONE_E164,
        email: EMAIL,
        description: copy.description,
        areaServed: [
          cityPlace(copy.cityName),
          { "@type": "AdministrativeArea", name: copy.county },
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
        ],
        address: businessPostalAddress(),
        parentOrganization: {
          "@type": "MovingCompany",
          name: BUSINESS_NAME,
          "@id": `${SITE_URL}/#movingcompany`,
        },
        knowsLanguage: ["en", "es"],
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: copy.title,
        description: copy.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#business` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: `${copy.cityName} Movers`, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: copy.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export { QUOTE_RATE_ANSWER };
