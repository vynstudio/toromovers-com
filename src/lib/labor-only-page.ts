/** Copy for /labor-only-moving — keep FAQ text identical to on-page FAQ (schema). */

import { SITE_URL } from "@/lib/site";

export const laborOnlyPage = {
  path: "/labor-only-moving",
  metadata: {
    title: "Labor-only movers in Orlando | Load & unload by the hour",
    description:
      "Hire Toro Movers for labor-only loading and unloading in Orlando & Central Florida—U-Haul, POD, storage, and rental trucks. Up-front hourly rates. Call (689) 600-2720.",
    ogTitle: "Labor-only movers in Orlando",
    ogDescription:
      "Your truck or container. Our crew. Load, unload, or both—with clear hourly pricing before move day.",
  },
  hero: {
    eyebrow: "Labor-only moving help",
    h1: "Labor-only movers in Orlando",
    lede: "Toro Movers provides labor-only movers in Orlando and Central Florida when you already have the U-Haul, POD, trailer, or rental truck. You get a local crew for loading, unloading, or both—quoted with up-front hourly rates so you know how the pricing works before move day.",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers stretch-wrapping furniture on a real labor-only job",
    },
    chips: [
      "Your truck, our crew",
      "Load, unload, or both",
      "Up-front hourly rates",
      "Bilingual EN · ES",
    ] as const,
  },
  forWhom: {
    h2: "When labor-only movers make sense",
    intro:
      "Labor-only is the right fit when transportation is already handled and you mainly need strong, careful help with the heavy work.",
    bullets: [
      "Rented a U-Haul, Budget, or Penske truck and need a crew to load or unload it",
      "Booked a POD, U-Pack, or portable storage container and want it packed tight and protected",
      "Are moving into or out of a storage unit and need loading help at one or both ends",
      "Have a mostly packed home or apartment and only want movers for furniture and heavy items",
      "Are doing a DIY move across Orlando or nearby Central Florida cities and want to save the truck cost",
    ] as const,
    aside:
      "If you need the truck, transport, and placement end to end, see our services hub or ask us which option fits when you call.",
  },
  included: {
    h2: "What's included with Toro labor-only help",
    intro:
      "On a typical labor-only job, Toro Movers brings the crew and the know-how. You provide the vehicle or container.",
    weBring: [
      "Local moving crew sized for the job",
      "Loading, unloading, or both (you choose)",
      "Furniture padding and stretch wrap as needed for the load",
      "Tight packing of the truck or container to protect items in transit",
      "Careful carrying through stairs, tight halls, and elevator paths when access allows",
      "Clear communication in English and Spanish",
    ] as const,
    youProvide: [
      "The U-Haul, rental truck, POD, trailer, or storage access",
      "Building rules, elevator windows, and parking details when you book",
      "Gate codes, dock instructions, and any time limits the property requires",
    ] as const,
    note: "Before move day we explain crew size, the hourly model, and what can change the clock—stairs, long carries, elevators, and how packed you are when we arrive.",
  },
  vehicles: {
    h2: "U-Haul loading, POD packing, and storage help",
    intro:
      "Orlando DIY moves often fail at the truck door—not at the highway. Labor-only movers exist so the load is fast, tight, and safer for furniture.",
    blocks: [
      {
        title: "U-Haul and rental trucks",
        body: "We load or unload rental trucks for local Orlando and Central Florida moves. Tell us truck size, how many floors, and whether the job is load-only, unload-only, or both.",
      },
      {
        title: "POD and portable containers",
        body: "Container moves need a dense, stable pack. We load portable storage with blankets, wrap, and a plan so items shift less in transit.",
      },
      {
        title: "Storage units",
        body: "Need a crew at a storage facility for a same-day transfer, purge, or reload? Share unit size, dolly access, and time limits when you request a quote.",
      },
    ] as const,
  },
  access: {
    h2: "Stairs, elevators, and building access",
    intro:
      "Labor-only jobs in Orlando often involve apartments, condos, and townhomes. Access details change how long the job takes.",
    bullets: [
      "Stairs vs elevator",
      "Reserved elevator window (if required)",
      "Loading zone or street parking rules",
      "Long carry from door to truck",
      "HOA or building move-in / move-out hours",
    ] as const,
    note: "Planning access up front keeps the hourly clock honest.",
  },
  pricing: {
    h2: "How labor-only pricing works (without guesswork)",
    intro:
      "Toro Movers quotes labor-only help with up-front hourly rates. The final total depends on:",
    factors: [
      { title: "Crew size", body: "How many movers the job needs" },
      { title: "Time on site", body: "Load, unload, or both" },
      {
        title: "Access",
        body: "Stairs, elevators, long carries, tight parking",
      },
      {
        title: "Readiness",
        body: "Packed boxes vs furniture still in rooms",
      },
      {
        title: "Scope",
        body: "One stop vs two stops, storage, or disassembly needs",
      },
    ] as const,
    close:
      "We explain the hourly model before move day so you are not guessing on the curb. Call or text with truck size, addresses, and access details—or get a free quote online.",
    marketNote:
      "Published average labor-only prices in Orlando vary by company and aggregator. Treat third-party averages as context only. Your Toro quote is based on your job, not a website rate card.",
  },
  areas: {
    h2: "Labor-only movers across Central Florida",
    intro:
      "Toro Movers is a family-owned local moving company based around Orlando. Labor-only loading and unloading is available across Central Florida, including:",
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
      { label: "Lakeland", href: "/lakeland-movers" },
      { label: "Central Florida", href: "/central-florida-movers" },
    ] as const,
  },
  why: {
    h2: "Why Central Florida hires Toro for loading help",
    items: [
      {
        title: "Local crew",
        body: "Family-owned, not a national call center",
      },
      {
        title: "Clear hourly pricing",
        body: "Model explained before move day",
      },
      {
        title: "Bilingual EN · ES",
        body: "Access rules and placement stay clear",
      },
      {
        title: "Careful packing",
        body: "Pads, wrap, and tight truck packs",
      },
      {
        title: "Flexible scope",
        body: "Load, unload, storage, or both",
      },
    ] as const,
  },
  faqs: [
    {
      q: "Do you offer labor-only loading and unloading in Orlando?",
      a: "Yes. Toro Movers offers labor-only loading and unloading for U-Haul trucks, PODs, trailers, storage units, and rental trucks across Orlando and Central Florida. You provide the vehicle or container; our crew handles the heavy lifting by the hour.",
    },
    {
      q: "Do labor-only movers bring a truck?",
      a: "No. Labor-only means you already have the truck, POD, or trailer. If you need truck and crew together, ask about full-service local moving when you call.",
    },
    {
      q: "Can you load or unload a U-Haul?",
      a: "Yes. We regularly load and unload U-Haul and other rental trucks. Share truck size, floors, and whether you need load-only, unload-only, or both.",
    },
    {
      q: "Can you pack a POD or portable storage container?",
      a: "Yes. We load portable containers with padding and a tight pack so furniture and boxes ride more securely.",
    },
    {
      q: "How many movers will I need?",
      a: "Crew size depends on volume, stairs, and time window. A small apartment load may need two movers; larger homes or tight deadlines may need more. We recommend a crew size when you share job details.",
    },
    {
      q: "How long does a labor-only job take?",
      a: "Time depends on how packed you are, access, and whether we are loading, unloading, or both. Ready boxes and clear pathways shorten the clock; last-minute packing and long stair carries lengthen it.",
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes. Toro Movers has an English- and Spanish-speaking crew so timing, access instructions, and placement stay clear.",
    },
    {
      q: "How do I get a labor-only quote?",
      a: "Call or text (689) 600-2720, or request a quote online. Share pickup and drop-off (if any), truck or container type, stairs/elevator details, and preferred date. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ] as const,
  closing: {
    h2: "Ready for labor-only movers in Orlando?",
    body: "Tell us what you are loading, which truck or container you have, and how access works at each stop. We will match crew size, explain up-front hourly rates, and help you plan the job.",
  },
} as const;

export function laborOnlyPageGraph() {
  const pageUrl = `${SITE_URL}${laborOnlyPage.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Labor-only moving",
        serviceType: "Labor-only loading and unloading",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: "Central Florida",
        url: pageUrl,
        description: laborOnlyPage.metadata.description,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: laborOnlyPage.metadata.title,
        description: laborOnlyPage.metadata.description,
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
            name: "Labor-only moving",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: laborOnlyPage.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
