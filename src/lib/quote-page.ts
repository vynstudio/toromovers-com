/**
 * SEO/AEO copy for /quotes.
 * The hourly rate appears only in the cost FAQ answer (and its FAQPage JSON-LD).
 * Title, meta, H1, intro, and other schema stay price-free.
 * Do not claim licensed, insured, bonded, DOT, or name any partner carrier.
 */

import { cityPlace } from "./business-profile.ts";
import { quoteFaqs } from "./quote-faqs.ts";

export { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  BUSINESS_NAME,
  EMAIL,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_E164,
  QUOTE_PATH,
  SERVICE_BASE_LOCALITY,
  SERVICE_REGION,
  SITE_URL,
} from "./site.ts";

export const QUOTE_PAGE_PATH = QUOTE_PATH;
export const QUOTE_PAGE_URL = `${SITE_URL}${QUOTE_PATH}`;

/** Visible intro under the H1. No price. */
export const QUOTE_AEO_ANSWER =
  "Tell us about your move. A local mover calls you back fast.";

const QUOTE_DESCRIPTION =
  "Get a moving quote in Orlando. Tell us about your move and a local mover calls you back fast. Local moves, plus long-distance and interstate. Call " +
  PHONE_DISPLAY +
  ".";

export const quotePage = {
  path: QUOTE_PATH,
  metadata: {
    title: {
      absolute: "Get your moving quote in Orlando | Toro Movers",
    },
    description: QUOTE_DESCRIPTION,
    ogTitle: "Get your moving quote in Orlando | Toro Movers",
    ogDescription: QUOTE_DESCRIPTION,
    ogImage: "/og/get-my-price.jpg",
    ogImageAlt: "Toro Movers: get a free local moving quote in Orlando",
    keywords: [
      "local moving quote Orlando",
      "moving quote in Orlando",
      "up-front hourly movers",
      "bilingual movers Orlando",
      "long-distance movers Orlando",
      "interstate movers Florida",
      "Central Florida moving quote",
    ],
  },
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Free moving quote", href: QUOTE_PATH },
  ] as const,
  hero: {
    h1: "Get your moving quote in Orlando.",
    lede: QUOTE_AEO_ANSWER,
  },
  form: {
    h2: "We call you back.",
    lede: "Name and mobile. We usually call back within 15 minutes.",
  },
  faqs: quoteFaqs,
  footer: {
    nap: `${BUSINESS_NAME} · Orlando, FL · ${PHONE_DISPLAY}`,
    hours: HOURS_LABEL,
  },
} as const;

export function quotePageGraph() {
  const pageUrl = QUOTE_PAGE_URL;
  const { metadata, faqs } = quotePage;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: metadata.ogTitle,
        headline: quotePage.hero.h1,
        description: quotePage.hero.lede,
        dateModified: "2026-10-02",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#service` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${metadata.ogImage}`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".aeo-answer"],
        },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "Get a free moving quote",
          target: {
            "@type": "EntryPoint",
            urlTemplate: pageUrl,
            actionPlatform: [
              "http://schema.org/DesktopWebPlatform",
              "http://schema.org/MobileWebPlatform",
            ],
          },
        },
        inLanguage: "en-US",
        mentions: { "@id": `${pageUrl}#term-local-moving-quote` },
      },
      {
        "@type": "DefinedTerm",
        "@id": `${pageUrl}#term-local-moving-quote`,
        name: "local moving quote",
        description:
          "A quote for a local move in Orlando. Tell us about the job and a mover calls you back.",
        inDefinedTermSet: `${SITE_URL}/#movingcompany`,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Local moving quote",
        serviceType: "Local moving",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: [
          cityPlace(SERVICE_BASE_LOCALITY),
          cityPlace("Winter Park"),
          cityPlace("Oviedo"),
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
          { "@type": "Country", name: "United States" },
        ],
        url: pageUrl,
        description:
          "Local moving quotes for Orlando and Central Florida. Long-distance and interstate moves are quoted from origin and destination.",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Free moving quote",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "MovingCompany",
        "@id": `${SITE_URL}/#movingcompany`,
        name: BUSINESS_NAME,
        url: SITE_URL,
        telephone: PHONE_E164,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          contactType: "customer service",
        },
        email: EMAIL,
      },
    ],
  };
}
