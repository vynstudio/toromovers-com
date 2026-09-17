/**
 * SEO/AEO copy for /get-my-price.
 * FAQ and HowTo text must match the visible page (schema).
 * Do not claim licensed, insured, bonded, or long-distance.
 */

import {
  FUNNEL_FLOOR_RATE,
  FUNNEL_LOCAL_NOTE,
  FUNNEL_RATE_NOTE,
  FUNNEL_SLA,
} from "./funnel-offer.ts";
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

export const quotePage = {
  path: QUOTE_PATH,
  metadata: {
    title: "Free moving quote in Orlando",
    description:
      "Free Orlando moving quote from Toro Movers. From $75/mover/hour, 2-hour minimum, no fuel or stair fees. Local Central Florida. Call (689) 600-2720.",
    ogTitle: "Free moving quote in Orlando | Toro Movers",
    ogDescription:
      "Local Central Florida moving quote from $75/mover/hour. 2-hour minimum, no fuel surcharge, no stair fees. We call you back.",
    ogImage: "/og/get-my-price.jpg",
    ogImageAlt: "Toro Movers — get a free local moving quote in Orlando",
  },
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Free moving quote", href: QUOTE_PATH },
  ] as const,
  hero: {
    h1: "Local moving quote in Orlando from $75/hour.",
    lede: `A local moving quote from ${BUSINESS_NAME} is an up-front hourly price for a ${SERVICE_REGION} move—crew, timing, and access—before move day. Jobs start ${FUNNEL_FLOOR_RATE} with a 2-hour minimum, no fuel surcharge, and no stair fees. We are family-owned and bilingual (English and Spanish). ${FUNNEL_LOCAL_NOTE}`,
  },
  howTo: {
    h2: "How to get a free moving quote",
    intro: `Request a callback online or call ${PHONE_DISPLAY}. We usually call back within 15 minutes during business hours (${HOURS_LABEL}).`,
    steps: [
      {
        name: "Share your name and mobile",
        text: "Tell us how to reach you. Email is optional. No account required.",
      },
      {
        name: "Choose the service and timing",
        text: "Pick house 2+ rooms, apartment 2+ rooms, labor-only, POD, U-Haul, or a single item, then This week or Flexible.",
      },
      {
        name: "We call back with an hourly price",
        text: "A Toro teammate explains crew size, the hourly rate, and the 2-hour minimum so you know the number before move day.",
      },
    ] as const,
  },
  services: {
    h2: "What we quote in Central Florida",
    intro:
      "This page is for a free local quote. Service pages explain the work in more detail.",
    links: [
      {
        href: "/full-service-moving",
        label: "House — 2+ rooms",
        note: "Full-service house move, 2 rooms or more",
      },
      {
        href: "/apartment-movers-orlando-fl",
        label: "Apartment — 2+ rooms",
        note: "Apt or condo, 2 rooms or more",
      },
      {
        href: "/full-service-moving",
        label: "Full-service moving",
        note: "Truck, crew, load, haul, unload, and place",
      },
      {
        href: "/labor-only-moving",
        label: "Labor-only movers",
        note: "You have the U-Haul, POD, or rental truck",
      },
      {
        href: "/loading-unloading",
        label: "Loading and unloading",
        note: "One-end or both-end labor",
      },
      {
        href: "/orlando-movers",
        label: "Orlando movers",
        note: "Local Orlando service area",
      },
    ] as const,
  },
  faqs: [
    {
      q: "How much do local movers cost in Orlando?",
      a: `Toro Movers quotes local Central Florida moves ${FUNNEL_FLOOR_RATE}, with a 2-hour minimum, no fuel surcharge, and no stair fees. Final hours depend on crew size, volume, stairs or elevators, and how packed you are when we arrive.`,
    },
    {
      q: "How do I get a free moving quote from Toro Movers?",
      a: `Submit your name and mobile on this page, or call ${PHONE_DISPLAY}. Email is optional. We usually call back within 15 minutes during business hours (${HOURS_LABEL}) with an up-front hourly price.`,
    },
    {
      q: "What is included in the hourly moving rate?",
      a: `${FUNNEL_RATE_NOTE}. The hourly rate covers the crew you book. Tell us the service type—house 2+ rooms, apartment 2+ rooms, labor-only, POD, or a single item—so we size the crew correctly.`,
    },
    {
      q: "Do Toro Movers do long-distance or interstate moves?",
      a: FUNNEL_LOCAL_NOTE,
    },
    {
      q: "How fast do you call back after I request a quote?",
      a: `${FUNNEL_SLA}. Outside those hours, leave your number and we return the call on the next business morning.`,
    },
    {
      q: "Do you offer labor-only and full-service moving?",
      a: "Yes. House 2+ rooms and apartment 2+ rooms are full-service local moves with truck and crew. Labor-only is for when you already have a U-Haul, POD, rental truck, or storage unit. Special-item and single-item jobs are quoted the same way.",
    },
    {
      q: "Are Toro Movers bilingual?",
      a: "Yes. Crews work in English and Spanish so timing, access, and placement stay clear.",
    },
  ] as const,
  footer: {
    nap: `${BUSINESS_NAME} · Orlando, FL · ${PHONE_DISPLAY} · ${EMAIL}`,
    hours: HOURS_LABEL,
  },
} as const;

export function quotePageGraph() {
  const pageUrl = QUOTE_PAGE_URL;
  const { metadata, faqs, howTo, hero } = quotePage;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: metadata.ogTitle,
        description: metadata.description,
        dateModified: "2026-09-17",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#service` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${metadata.ogImage}`,
        },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["h1", ".aeo-answer", "#gmp-howto h2", "#gmp-faq h2", "#gmp-faq h3"],
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
        ],
        url: pageUrl,
        description: hero.lede,
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
              "Floor rate from $75 per mover per hour. 2-hour minimum. No fuel surcharge. No stair fees. Local Central Florida only.",
          },
        },
      },
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: howTo.h2,
        description: howTo.intro,
        totalTime: "PT5M",
        step: howTo.steps.map((step, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: step.name,
          text: step.text,
        })),
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
