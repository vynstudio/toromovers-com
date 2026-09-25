/** Copy for /loading-unloading — single-item / short loading help. FAQ = schema. */

import { businessAreaServed } from "./business-profile.ts";
import { SITE_URL } from "./site.ts";

export const loadingUnloadingPage = {
  path: "/loading-unloading",
  metadata: {
    title: "Loading & unloading help | Orlando movers",
    description:
      "Loading and unloading help in Orlando for a short truck lift or curb unload. Hourly rates. Call (689) 600-2720.",
    ogTitle: "Loading & unloading help in Orlando",
    ogDescription:
      "Short loading and unloading help from a local Central Florida crew—with up-front hourly rates. Not a POD pack or a furniture delivery.",
  },
  hero: {
    eyebrow: "Loading and unloading help",
    h1: "Loading and unloading help in Orlando",
    lede:
      "Toro Movers helps with short loading and unloading jobs in Orlando and Central Florida: a truck that needs a crew for a lift, or a curb unload that is not a full household. A planned single item or furniture delivery has its own page. A POD, U-Haul, or storage unit does too. You get a local bilingual crew and up-front hourly rates explained before we start.",
    image: {
      src: "/images/moves/svc-loading.webp",
      alt: "Toro Movers carefully handling furniture on a real Central Florida loading job",
    },
    chips: [
      "Short hourly jobs",
      "Truck load / unload",
      "Not a full household",
      "Bilingual EN · ES",
    ] as const,
  },
  forWhom: {
    h2: "When short loading help fits",
    intro:
      "Not every job is a whole-home move. This page is the short lift, not a planned delivery and not a container pack.",
    bullets: [
      "A quick load or unload when the truck is already on site",
      "Curbside-to-door help when you only need an hour or two",
      "Add-on unloading at a second stop after a DIY drive",
      "A partial truck that is not a full household and not a storage-unit pack",
    ] as const,
    aside:
      "A planned single item or furniture pickup is a small move. A POD, U-Haul, or storage unit is POD loading help. A whole home with our truck is full-service. A household on your truck is labor-only.",
  },
  included: {
    h2: "What’s included",
    intro:
      "On a typical short loading job, Toro Movers brings the crew and protection gear you need for the lift.",
    weBring: [
      "Local movers sized for a short job",
      "Padding and stretch wrap when the piece needs it",
      "Careful carrying through stairs and tight turns when access allows",
      "Clear English and Spanish communication on timing and placement",
    ] as const,
    youShare: [
      "What you’re moving (photos help)",
      "Stairs, elevator, and parking details",
      "Whether a truck is already on site",
      "Preferred arrival window",
    ] as const,
  },
  pricing: {
    h2: "How short-job pricing works",
    intro:
      "These jobs are quoted with up-front hourly rates. Totals stay tied to crew size and time on site—access and item weight still matter.",
    factors: [
      { title: "Crew size", body: "Often two movers; more for awkward or heavy pieces" },
      { title: "Time on site", body: "Short windows; longer if the lift is awkward" },
      { title: "Access", body: "Stairs, elevators, long carries, tight doors" },
      { title: "Scope", body: "A short lift versus a partial truck that is already on site" },
    ] as const,
    close:
      "Call or text with photos and access notes—or get a free quote online. We explain the hourly model before we arrive.",
  },
  areas: {
    h2: "Central Florida coverage",
    intro:
      "Family-owned local movers based around Orlando. Short loading and unloading help across Central Florida, including:",
    links: [
      { label: "Orlando", href: "/orlando-movers" },
      { label: "Winter Park", href: "/winter-park-movers" },
      { label: "Kissimmee", href: "/kissimmee-movers" },
      { label: "Clermont", href: "/clermont-movers" },
      { label: "Sanford", href: "/sanford-movers" },
      { label: "Small moves", href: "/small-moves-orlando" },
      { label: "POD & U-Haul loading", href: "/pod-loading-orlando" },
      { label: "Labor-only", href: "/labor-only-moving" },
      { label: "Full-service", href: "/full-service-moving" },
      { label: "Apartments", href: "/apartment-movers-orlando-fl" },
    ] as const,
  },
  faqs: [
    {
      q: "Do you move a single piece of furniture in Orlando?",
      a: "A planned single item or furniture pickup is booked as a small move. This page is a short loading or unloading lift. Share photos and floors either way and we will point you at the page that matches.",
    },
    {
      q: "Can you just load or unload my truck?",
      a: "Yes, when the job is a short lift. A U-Haul, POD, or storage unit that needs a real pack is POD loading help. A household on your truck is labor-only. Tell us which one you have.",
    },
    {
      q: "Is this the same as full-service moving?",
      a: "No. Full-service includes the truck and a complete local move. Loading and unloading help here is a shorter lift. A small furniture delivery, a POD load, and a household labor job each have their own page.",
    },
    {
      q: "How is pricing handled?",
      a: "Short jobs use up-front hourly rates. Crew size and time depend on the item, stairs, and parking. Call or text (689) 600-2720 with details before move day.",
    },
    {
      q: "How do I book loading help?",
      a: "Call or text (689) 600-2720, or request a quote online. Share what you’re moving, access details, and timing. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ] as const,
  closing: {
    h2: "Need loading or unloading help in Orlando?",
    body: "Tell us the truck scope, floors, and parking. We will match the crew, explain hourly rates, and confirm whether this short lift—or a small move, a POD load, or labor-only—fits better.",
  },
} as const;

export function loadingUnloadingPageGraph() {
  const pageUrl = `${SITE_URL}${loadingUnloadingPage.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Loading and unloading help",
        serviceType: "Loading and unloading",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: businessAreaServed(),
        url: pageUrl,
        description: loadingUnloadingPage.metadata.description,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: loadingUnloadingPage.metadata.title,
        description: loadingUnloadingPage.metadata.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/services` },
          { "@type": "ListItem", position: 3, name: "Loading & unloading", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: loadingUnloadingPage.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
