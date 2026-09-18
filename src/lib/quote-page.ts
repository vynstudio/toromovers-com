/**
 * SEO/AEO copy for /quotes.
 * Visible page is a one-screen ads landing (H1 + one-line lede + form).
 * FAQPage JSON-LD is schema-only — no FAQ / HowTo / service-list UI.
 * Hero lede and JSON-LD description stay on QUOTE_AEO_ANSWER.
 * Do not claim licensed, insured, bonded, DOT, or name any partner carrier.
 */

import { FUNNEL_SLA } from "./funnel-offer.ts";
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

/** Canonical AEO answer — visible one-line lede and JSON-LD must stay in sync. */
export const QUOTE_AEO_ANSWER =
  "From $75/mover/hour — 2-hour min, no fuel or stair fees.";

export const quotePage = {
  path: QUOTE_PATH,
  metadata: {
    title: { absolute: "Moving quote in Orlando from $75/hour | Toro Movers" },
    description:
      "Toro Movers quotes local, long-distance, and interstate moves. Local jobs from $75/mover/hour, 2-hour min, no fuel or stair fees. Call (689) 600-2720.",
    ogTitle: "Moving quote in Orlando from $75/hour | Toro Movers",
    ogDescription:
      "Up-front moving quote for local, long-distance, and interstate. Local jobs from $75/mover/hour, 2-hour minimum, no fuel surcharge, no stair fees.",
    ogImage: "/og/get-my-price.jpg",
    ogImageAlt: "Toro Movers — get a free local moving quote in Orlando",
  },
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Free moving quote", href: QUOTE_PATH },
  ] as const,
  hero: {
    h1: "Moving quote in Orlando from $75/hour.",
    lede: QUOTE_AEO_ANSWER,
  },
  form: {
    h2: "We call you back.",
    lede: "Name and mobile. We usually call back within 15 minutes.",
  },
  faqs: [
    {
      q: "How much do local movers cost in Orlando?",
      a: QUOTE_AEO_ANSWER,
    },
    {
      q: "How do I get a free moving quote?",
      a: `Submit your name and mobile, or call ${PHONE_DISPLAY}. Email is optional.`,
    },
    {
      q: "How fast do you call back?",
      a: `${FUNNEL_SLA}. After hours, we call the next business morning.`,
    },
    {
      q: "Do you quote long-distance and interstate moves?",
      a: "Yes. Local jobs are hourly from $75/mover/hour. Long-distance and interstate are quoted from origin, destination, and inventory.",
    },
  ] as const,
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
        description: QUOTE_AEO_ANSWER,
        dateModified: "2026-09-17",
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
        description: QUOTE_AEO_ANSWER,
        inDefinedTermSet: `${SITE_URL}/#movingcompany`,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Local moving quote",
        serviceType: "Local moving",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: [
          { "@type": "City", name: SERVICE_BASE_LOCALITY },
          { "@type": "AdministrativeArea", name: SERVICE_REGION },
          { "@type": "Country", name: "United States" },
        ],
        url: pageUrl,
        description: QUOTE_AEO_ANSWER,
        offers: {
          "@type": "Offer",
          url: pageUrl,
          priceCurrency: "USD",
          price: "75",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "75",
            priceCurrency: "USD",
            unitText: "mover / hour",
            description:
              "Local Central Florida floor rate from $75 per mover per hour. 2-hour minimum. No fuel surcharge. No stair fees. Long-distance and interstate quoted separately.",
          },
        },
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
        email: EMAIL,
      },
    ],
  };
}
