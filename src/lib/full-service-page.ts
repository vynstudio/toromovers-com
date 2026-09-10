/** Copy for /full-service-moving — FAQ text must match on-page FAQ (schema). */

import { SITE_URL } from "@/lib/site";

export const fullServicePage = {
  path: "/full-service-moving",
  metadata: {
    title: "Full-service movers in Orlando | Truck & crew",
    description:
      "Full-service Orlando movers—truck, crew, load, haul, unload & place. Up-front hourly rates. Call (689) 600-2720.",
    ogTitle: "Full-service movers in Orlando",
    ogDescription:
      "Local crew and truck for Orlando homes and apartments—load, haul, unload, and place with clear hourly pricing before move day.",
  },
  hero: {
    eyebrow: "Full-service local moving",
    h1: "Full-service movers in Orlando",
    lede:
      "Toro Movers provides full-service local moving in Orlando and Central Florida—truck, crew, loading, transport, unloading, and room-by-room placement. You get a family-owned bilingual crew and up-front hourly rates explained before move day.",
    image: {
      src: "/images/moves/svc-full-service.webp",
      alt: "Toro Movers furniture stretch-wrapped and padded for a full-service local move",
    },
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
      "Choose full-service when you want one local team to handle the truck and the labor—not just the loading.",
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
    h2: "What’s included in a full-service move",
    intro:
      "On a typical full-service job, Toro Movers brings the truck and the crew.",
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
    note: "Before move day we explain crew size, the hourly model, and what can change the clock—access, readiness, and distance within Central Florida.",
  },
  vsLabor: {
    h2: "Full-service vs labor-only",
    intro:
      "Both options use the same careful local crew. The difference is who provides the truck.",
    blocks: [
      {
        title: "Full-service",
        body: "We bring truck and crew. Best when you want door-to-door help without renting a vehicle.",
      },
      {
        title: "Labor-only",
        body: "You provide the U-Haul, POD, or trailer—we load or unload by the hour.",
      },
    ] as const,
  },
  pricing: {
    h2: "How full-service pricing works",
    intro:
      "Toro Movers quotes full-service local moves with up-front hourly rates. The total depends on:",
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
      "We explain the hourly model before move day. Call or text with addresses and access details—or get a free quote online.",
    marketNote:
      "Published Orlando moving averages vary by company. Treat third-party ranges as context only. Your Toro quote is based on your job—not a website rate card.",
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
      a: "Most local moves are quoted with up-front hourly rates. The total depends on crew size, time, access, readiness, and route. Call or text (689) 600-2720 with your details for a clear explanation before move day.",
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes. Toro Movers has an English- and Spanish-speaking crew so timing, access instructions, and placement stay clear.",
    },
    {
      q: "How do I get a full-service quote?",
      a: "Call or text (689) 600-2720, or request a quote online. Share pickup and drop-off, home type, access details, and preferred date. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ] as const,
  closing: {
    h2: "Ready for full-service movers in Orlando?",
    body: "Tell us what you are moving, both addresses, and how access works. We will match crew size, explain up-front hourly rates, and help plan the day.",
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
        areaServed: "Central Florida",
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
