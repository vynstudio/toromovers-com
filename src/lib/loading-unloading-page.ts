/** Copy for /loading-unloading — single-item / short loading help. FAQ = schema. */

import { SITE_URL } from "@/lib/site";

export const loadingUnloadingPage = {
  path: "/loading-unloading",
  metadata: {
    title: "Loading & unloading help in Orlando | Single-item movers",
    description:
      "Need loading or unloading help in Orlando—or a single-item furniture move? Toro Movers offers short hourly jobs for trucks, storage, and heavy pieces. Call (689) 600-2720.",
    ogTitle: "Loading & unloading help in Orlando",
    ogDescription:
      "Short loading jobs, single-item furniture moves, and truck unload help from a local Central Florida crew—with up-front hourly rates.",
  },
  hero: {
    eyebrow: "Loading, unloading & single-item help",
    h1: "Loading and unloading help in Orlando",
    lede:
      "Toro Movers helps with short loading and unloading jobs in Orlando and Central Florida—single furniture pieces, truck load/unload help, and storage transfers. You get a local bilingual crew and up-front hourly rates explained before we start.",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers carefully handling furniture on a real Central Florida loading job",
    },
    chips: [
      "Single-item moves",
      "Truck load / unload",
      "Short hourly jobs",
      "Bilingual EN · ES",
    ] as const,
  },
  forWhom: {
    h2: "When short loading help fits",
    intro:
      "Not every job is a whole-home move. This page is for smaller scopes that still need a careful crew.",
    bullets: [
      "One heavy item—sofa, mattress, dresser, gym equipment, or appliance",
      "Quick load or unload of a rental truck you already have",
      "Storage unit load, unload, or rearrange",
      "Curbside-to-door help when you only need an hour or two",
      "Add-on unloading at a second stop after a DIY drive",
    ] as const,
    aside:
      "Need a full truck and door-to-door crew? See full-service moving. Need a whole DIY truck packed tight? See labor-only movers.",
  },
  included: {
    h2: "What’s included",
    intro:
      "On a typical loading or single-item job, Toro Movers brings the crew and protection gear you need for the lift.",
    weBring: [
      "Local movers sized for a short job",
      "Padding and stretch wrap when the piece needs it",
      "Careful carrying through stairs and tight turns when access allows",
      "Clear English and Spanish communication on timing and placement",
    ] as const,
    youShare: [
      "What you’re moving (photos help for single items)",
      "Stairs, elevator, and parking details",
      "Whether a truck or storage unit is involved",
      "Preferred arrival window",
    ] as const,
  },
  pricing: {
    h2: "How short-job pricing works",
    intro:
      "These jobs are quoted with up-front hourly rates. Totals stay tied to crew size and time on site—access and item weight still matter.",
    factors: [
      { title: "Crew size", body: "Often two movers; more for awkward or heavy pieces" },
      { title: "Time on site", body: "Short windows for single items; longer for full truck loads" },
      { title: "Access", body: "Stairs, elevators, long carries, tight doors" },
      { title: "Scope", body: "One piece vs a partial truck vs storage transfer" },
    ] as const,
    close:
      "Call or text with photos and access notes—or get a free quote online. We explain the hourly model before we arrive.",
  },
  areas: {
    h2: "Central Florida coverage",
    intro:
      "Family-owned local movers based around Orlando. Short loading and single-item help across Central Florida, including:",
    links: [
      { label: "Orlando", href: "/orlando-movers" },
      { label: "Winter Park", href: "/winter-park-movers" },
      { label: "Kissimmee", href: "/kissimmee-movers" },
      { label: "Clermont", href: "/clermont-movers" },
      { label: "Sanford", href: "/sanford-movers" },
      { label: "Labor-only", href: "/labor-only-moving" },
      { label: "Full-service", href: "/full-service-moving" },
      { label: "Apartments", href: "/apartment-movers-orlando-fl" },
    ] as const,
  },
  faqs: [
    {
      q: "Do you move a single piece of furniture in Orlando?",
      a: "Yes. Toro Movers handles many single-item jobs—sofas, mattresses, appliances, and other heavy pieces—when access and parking allow. Share photos and floors when you call.",
    },
    {
      q: "Can you just load or unload my truck?",
      a: "Yes. If you already have a U-Haul or rental truck, we can load, unload, or both by the hour. For larger DIY packs, see our labor-only movers page.",
    },
    {
      q: "Is this the same as full-service moving?",
      a: "No. Full-service includes the truck and a complete local move. Loading and unloading help here is for shorter scopes and single items. We will steer you to the clearer option when you describe the job.",
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
    h2: "Need loading or single-item help in Orlando?",
    body: "Tell us the item or truck scope, floors, and parking. We will match the crew, explain hourly rates, and confirm whether this page—or full-service / labor-only—fits better.",
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
        serviceType: "Loading, unloading, and single-item moving",
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: "Central Florida",
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
