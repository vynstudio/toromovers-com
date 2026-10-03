/** Copy for /full-service-moving. FAQ text must match the on-page FAQ schema. */

import { businessAreaServed } from "./business-profile.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { SITE_URL } from "./site.ts";

export const FULL_SERVICE_PATH = "/full-service-moving";
export const FULL_SERVICE_PHONE = "321-234-0510";
export const FULL_SERVICE_PHONE_TEL = "tel:+13212340510";

export const fullServicePage = {
  path: FULL_SERVICE_PATH,
  metadata: {
    title: "Full-service movers in Orlando | Truck & crew",
    description:
      "Full-service Orlando movers: truck, crew, load, haul, unload, and place. Call 321-234-0510.",
    ogTitle: "Full-service movers in Orlando",
    ogDescription:
      "Local crew and truck for Orlando homes and apartments. Load, haul, unload, and place, with the hourly model explained before move day.",
  },
  hero: {
    eyebrow: "Full-service local moving",
    h1: "Full-service movers in Orlando",
    lede:
      "Toro Movers provides full-service local moving in Orlando and Central Florida. The crew brings the truck, then loads, transports, unloads, and places each room. You get a family-owned bilingual crew, and the hourly model is explained before move day.",
    chips: [
      "Truck and crew included",
      "Load to placement",
      "Up-front hourly rates",
      "Bilingual EN · ES",
    ] as const,
  },
  forWhom: {
    h2: "When full-service moving is the right fit",
    intro:
      "Choose full-service when you want one local team to handle the truck and the labor, not just the loading.",
    bullets: [
      "Homes, townhomes, and apartments across Central Florida",
      "Moves where you do not want to rent or drive a truck",
      "Same-week local relocations with clear crew planning",
      "Jobs that need careful load, transport, unload, and placement",
      "Customers who prefer one crew from start to finish",
    ] as const,
    aside:
      "Already have a U-Haul, POD, or rental truck? Labor-only loading and unloading may fit better.",
  },
  included: {
    h2: "What's included in a full-service move",
    intro: "On a typical full-service job, Toro Movers brings the truck and the crew.",
    weBring: [
      "Local moving truck sized for the job",
      "Crew matched to volume and access",
      "Loading, transport, unloading, and placement",
      "Furniture padding and stretch wrap as needed",
      "Careful carrying through stairs, halls, and elevator paths when access allows",
      "Clear communication in English and Spanish",
    ] as const,
    youShare: [
      "Pickup and drop-off addresses and preferred date",
      "Home or apartment type and rough inventory",
      "Stairs, elevator windows, parking, and building rules",
      "Any items that need disassembly or special handling",
    ] as const,
    note: "Before move day we explain crew size, the hourly model, and what can change the clock: access, readiness, and distance within Central Florida.",
  },
  vsLabor: {
    h2: "Full-service vs labor-only",
    intro: "Both options use the same careful local crew. The difference is who provides the truck.",
    blocks: [
      {
        title: "Full-service",
        body: "We bring truck and crew. Best when you want door-to-door help without renting a vehicle.",
      },
      {
        title: "Labor-only",
        body: "You provide the U-Haul, POD, or trailer. We load or unload by the hour.",
      },
    ] as const,
  },
  pricing: {
    h2: "How full-service pricing works",
    intro: "The total depends on:",
    factors: [
      { title: "Crew size", body: "Matched to volume and access" },
      { title: "Time on the job", body: "Load, drive, unload, and place" },
      {
        title: "Access",
        body: "Stairs, elevators, long carries, tight parking",
      },
      {
        title: "Readiness",
        body: "Packed boxes vs furniture still in rooms",
      },
      {
        title: "Route",
        body: "Local hops across Orlando and nearby Central Florida cities",
      },
    ] as const,
    close:
      "We explain the hourly model before move day. Call or text with addresses and access details, or get a free quote online.",
    marketNote:
      "Published Orlando moving averages vary by company. Treat third-party ranges as context only. Your Toro quote is based on your job.",
  },
  areas: {
    h2: "Full-service movers across Central Florida",
    intro:
      "Family-owned local movers based around Orlando. Full-service help across Central Florida, including:",
    links: [
      { label: "Orlando", href: "/orlando-movers" },
      { label: "Winter Park", href: "/winter-park-movers" },
      { label: "Kissimmee", href: "/kissimmee-movers" },
      { label: "Clermont", href: "/clermont-movers" },
      { label: "Sanford", href: "/sanford-movers" },
      { label: "Lake Mary", href: "/lake-mary-movers" },
      { label: "Oviedo", href: "/oviedo-movers" },
      { label: "Winter Garden", href: "/winter-garden-movers" },
      { label: "Altamonte Springs", href: "/altamonte-springs-movers" },
      { label: "St. Cloud", href: "/st-cloud-movers" },
      { label: "Central Florida", href: "/central-florida-movers" },
    ] as const,
  },
  sections: [
    {
      h2: "How a full-service day runs",
      paragraphs: [
        "The crew and the truck start at the first address you booked. They walk the rooms, pad the furniture that needs it, and load so the pieces can come off at the new place by room. Drive time between the two Central Florida addresses is part of the job. At the second address the crew unloads and sets the larger pieces where you point, then the cartons that belong in those rooms.",
        "You do not drive the truck. Someone who can decide where a bed or a sofa goes should be at the drop-off, in person or on the phone with the crew. If a piece will not fit the stair, the doorway, or the elevator, the crew stops and asks before it is forced. Taking apart a bed, a table, or a simple desk is part of the carry when you named it on the quote. Reconnecting a washer, mounting a television, and installing fixtures are not.",
      ],
    },
    {
      h2: "Where the truck can actually stop",
      paragraphs: [
        "A driveway that fits the truck is the simple case. A downtown Orlando curb, a Winter Park street under low oaks, a locked-gate community, or a new court in Lake Nona, Horizon West, or Winter Garden often is not. Tell us about low branches, a steep drive, a side entrance the association requires, or guest parking that is the only legal stop. If the truck has to sit down the block, that walk is time on the clock. We would rather know the walk before the day than find it with a loaded truck.",
        "Clear a path from the rooms to the door the night before, especially when the garage is part of what is moving and the driveway is the only place the truck can stand. If this job starts or ends in a building with an elevator window, a dock, or a loading zone, send the property's rules with the quote so the truck arrives inside the slot they actually gave you.",
      ],
    },
    {
      h2: "What changes the hours on a local move",
      paragraphs: [
        "Crew size and time follow the volume, the access, and how ready the home is. Closed, labeled cartons and an open path shorten the day. A kitchen still in the cabinets, a garage that still has to be sorted, or a second stop at a storage unit lengthens it. Fuel and stairs are not separate lines. They show up as minutes on the same clock. If one address leaves Central Florida, say so when you call. That route is a trip quote, not this local hourly move.",
        "Photos of the bulky pieces, the stairs, and the parking spot are enough to size the crew. A quote built for a packed house will not cover a home that is still in drawers. If you want those rooms boxed by the same crew, name them when you book. If you already have a rental truck, this page is the wrong fit and labor-only is the one to use.",
      ],
    },
    {
      h2: "Related services",
      paragraphs: [
        "Labor-only is the booking when the U-Haul, POD, or rental truck is already yours and you only need the crew. Apartment movers is the page when stairs, a reserved elevator, or a loading zone is the hard part. Packing services is the add-on when named rooms are still open and you want the crew to close them before the carry. A short lift that is not a household, a single furniture piece, and a container pack each have their own page. The services page lists all of them.",
      ],
    },
  ] as const,
  faqs: [
    {
      q: "What is full-service moving?",
      a: "Full-service moving includes the crew, truck, loading, transportation, unloading, and placement. You do not need to rent or drive a truck for a typical local Orlando move.",
    },
    {
      q: "How is full-service different from labor-only?",
      a: "Labor-only is for customers who already have a U-Haul, POD, trailer, or rental truck and only need movers for loading or unloading. Full-service includes the truck and transport.",
    },
    {
      q: "Do you move apartments and houses?",
      a: "Yes. Toro Movers handles homes, townhomes, and apartments across Orlando and Central Florida, including stairs and elevator access when planned in advance.",
    },
    {
      q: "How much do full-service movers cost in Orlando?",
      a: QUOTE_RATE_ANSWER,
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes. Toro Movers has an English- and Spanish-speaking crew so timing, access instructions, and placement stay clear.",
    },
    {
      q: "How do I get a full-service quote?",
      a: `Call or text ${FULL_SERVICE_PHONE}, or request a quote online. Share pickup and drop-off, home type, access details, and preferred date. Hours: Sun-Fri, 7:00 AM to 7:00 PM; Sat, 9:00 AM to 5:00 PM.`,
    },
  ] as const,
  closing: {
    h2: "Ready for full-service movers in Orlando?",
    body: "Tell us what you are moving, both addresses, and how access works. We will match crew size, explain the hourly model, and help plan the day.",
  },
} as const;

export function fullServicePageGraph() {
  const pageUrl = `${SITE_URL}${fullServicePage.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Full-service local moving",
        serviceType: "Full-service moving",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: businessAreaServed(),
        url: pageUrl,
        description: fullServicePage.metadata.description,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: fullServicePage.metadata.title,
        description: fullServicePage.metadata.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${SITE_URL}/services`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Full-service moving",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: fullServicePage.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
