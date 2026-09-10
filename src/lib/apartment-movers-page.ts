/** Copy for /apartment-movers-orlando-fl — FAQ text must match on-page FAQ (schema). */

import { SITE_URL } from "@/lib/site";

export const apartmentMoversPage = {
  path: "/apartment-movers-orlando-fl",
  metadata: {
    title: "Apartment movers Orlando | Stairs & elevators",
    description:
      "Orlando apartment movers for walk-ups, elevators & loading zones—planned before move day. Up-front hourly rates. Call (689) 600-2720.",
    ogTitle: "Apartment movers in Orlando",
    ogDescription:
      "Local crews for Orlando apartments and condos—stairs, elevators, and building rules planned with up-front hourly rates.",
  },
  hero: {
    eyebrow: "Apartment & condo moving",
    h1: "Apartment movers in Orlando",
    lede:
      "Toro Movers handles apartment moves across Orlando and Central Florida—walk-ups, elevators, loading zones, parking rules, and timed move-in windows. You get a local bilingual crew and up-front hourly rates explained before move day.",
    image: {
      src: "/images/moves/real-21.webp",
      alt: "Toro Movers crew carrying furniture up stairs on a real Orlando-area apartment move",
    },
    chips: [
      "Stairs & elevators",
      "Loading zones planned",
      "Up-front hourly rates",
      "Bilingual EN · ES",
    ] as const,
  },
  forWhom: {
    h2: "Apartment and condo moves we handle",
    intro:
      "Apartment moves are less about raw volume and more about access. Toro Movers plans the job around the building so the crew, truck, and timing fit the property.",
    bullets: [
      "Walk-up apartments and third-floor carries",
      "High-rises and condos with reserved elevators",
      "Townhomes with tight stairwells and shared drives",
      "Same-complex or across-town apartment-to-apartment moves",
      "Labor-only loading when you already have a U-Haul or POD",
      "Full-service moves with truck, crew, and room-by-room placement",
    ] as const,
  },
  access: {
    h2: "Stairs, elevators, and building rules",
    intro:
      "Orlando apartment moves often fail on logistics, not lifting. Share access details early so the hourly clock stays honest.",
    bullets: [
      "Stairs vs elevator (and which floors)",
      "Reserved elevator window and pad requirements",
      "Loading dock, service entrance, or street parking only",
      "Long carry from unit to truck",
      "HOA or building move-in / move-out hours",
      "Certificate or paperwork your property asks for (we discuss what’s needed—without inventing coverage claims)",
    ] as const,
    note: "Planning access up front keeps surprises off move day. Tell us what the leasing office requires when you call or request a quote.",
  },
  options: {
    h2: "Full-service vs labor-only for apartments",
    intro:
      "Pick the option that matches how much of the move you want to own.",
    blocks: [
      {
        title: "Full-service apartment move",
        body: "Crew, truck, load, transport, unload, and placement. Best when you want one local team from door to door across Orlando or nearby cities.",
      },
      {
        title: "Labor-only for apartments",
        body: "You have the U-Haul, POD, or rental truck—we load or unload by the hour with the same care for stairs and tight halls. See our labor-only movers page for details.",
      },
    ] as const,
  },
  pricing: {
    h2: "How apartment move pricing works",
    intro:
      "Toro Movers quotes apartment moves with up-front hourly rates. The total depends on:",
    factors: [
      { title: "Crew size", body: "Matched to volume and access" },
      { title: "Time on site", body: "Load, transport when included, unload, place" },
      {
        title: "Access",
        body: "Stairs, elevators, long carries, parking distance",
      },
      {
        title: "Readiness",
        body: "Packed boxes vs furniture still in rooms",
      },
      {
        title: "Scope",
        body: "Full-service with truck vs labor-only on your vehicle",
      },
    ] as const,
    close:
      "We explain the hourly model before move day. Call or text with unit details, floors, and elevator rules—or get a free quote online.",
    marketNote:
      "Published Orlando apartment-move averages vary by company. Treat third-party ranges as context only. Your Toro quote is based on your building and inventory—not a website rate card.",
  },
  areas: {
    h2: "Apartment movers across Central Florida",
    intro:
      "Family-owned local movers based around Orlando. Apartment and condo help across Central Florida, including:",
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
      q: "Do you handle apartment moves in Orlando?",
      a: "Yes. Toro Movers handles apartment moves across Orlando and Central Florida. Apartment moves often involve stairs, elevators, loading zones, parking rules, tight hallways, and scheduled move-in windows, so we ask about access details before quoting the job.",
    },
    {
      q: "Can you move a walk-up apartment?",
      a: "Yes. Walk-ups are common on Orlando jobs. Tell us how many floors and whether a long carry or tight stairwell is involved so we size the crew correctly.",
    },
    {
      q: "Do you work with reserved elevators?",
      a: "Yes. Share the elevator reservation window and any padding or dock rules from the building. We plan the crew arrival around that window.",
    },
    {
      q: "Is labor-only available for apartment moves?",
      a: "Yes. If you already have a U-Haul, POD, or rental truck, we can load or unload by the hour. Full-service includes the truck when you need door-to-door help.",
    },
    {
      q: "How much do apartment movers cost in Orlando?",
      a: "Most apartment moves are quoted with up-front hourly rates. The total depends on crew size, access, readiness, and whether you need a truck. Call or text (689) 600-2720 with your details for a clear explanation before move day.",
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes. Toro Movers has an English- and Spanish-speaking crew so building rules, timing, and placement stay clear.",
    },
    {
      q: "How do I get an apartment moving quote?",
      a: "Call or text (689) 600-2720, or request a quote online. Share pickup and drop-off, floors, elevator or stairs, parking, and preferred date. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ] as const,
  closing: {
    h2: "Ready for apartment movers in Orlando?",
    body: "Tell us the building access, floors, and what you’re moving. We will match crew size, explain up-front hourly rates, and help plan the window.",
  },
} as const;

export function apartmentMoversPageGraph() {
  const pageUrl = `${SITE_URL}${apartmentMoversPage.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Apartment moving",
        serviceType: "Apartment and condo moving",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: "Central Florida",
        url: pageUrl,
        description: apartmentMoversPage.metadata.description,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: apartmentMoversPage.metadata.title,
        description: apartmentMoversPage.metadata.description,
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
            name: "Apartment movers",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: apartmentMoversPage.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
