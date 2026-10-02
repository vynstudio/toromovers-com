/** Copy for /loading-unloading. FAQ text must match the on-page FAQ schema. */

import { businessAreaServed } from "./business-profile.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { SITE_URL } from "./site.ts";

export const LOADING_PATH = "/loading-unloading";
export const LOADING_PHONE = "321-234-0510";
export const LOADING_PHONE_TEL = "tel:+13212340510";

export const loadingUnloadingPage = {
  path: LOADING_PATH,
  metadata: {
    title: "Loading & unloading help | Orlando movers",
    description:
      "Loading and unloading help in Orlando for a short truck lift or curb unload. Call 321-234-0510.",
    ogTitle: "Loading & unloading help in Orlando",
    ogDescription:
      "Short loading and unloading help from a local Central Florida crew, with the hourly model explained before we start. Not a POD pack or a furniture delivery.",
  },
  hero: {
    eyebrow: "Loading and unloading help",
    h1: "Loading and unloading help in Orlando",
    lede:
      "Toro Movers helps with short loading and unloading jobs in Orlando and Central Florida: a truck that needs a crew for a lift, or a curb unload that is not a full household. A planned single item or furniture delivery has its own page. A POD, U-Haul, or storage unit does too. You get a local bilingual crew, and the hourly model is explained before we start.",
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
    h2: "What's included",
    intro:
      "On a typical short loading job, Toro Movers brings the crew and protection gear you need for the lift.",
    weBring: [
      "Local movers sized for a short job",
      "Padding and stretch wrap when the piece needs it",
      "Careful carrying through stairs and tight turns when access allows",
      "Clear English and Spanish communication on timing and placement",
    ] as const,
    youShare: [
      "What you are moving (photos help)",
      "Stairs, elevator, and parking details",
      "Whether a truck is already on site",
      "Preferred arrival window",
    ] as const,
  },
  pricing: {
    h2: "How short-job pricing works",
    intro:
      "The total depends on crew size and time on site. Access and item weight still matter.",
    factors: [
      { title: "Crew size", body: "Often two movers; more for awkward or heavy pieces" },
      { title: "Time on site", body: "Short windows; longer if the lift is awkward" },
      { title: "Access", body: "Stairs, elevators, long carries, tight doors" },
      { title: "Scope", body: "A short lift versus a partial truck that is already on site" },
    ] as const,
    close:
      "Call or text with photos and access notes, or get a free quote online. We explain the hourly model before we arrive.",
  },
  areas: {
    h2: "Central Florida coverage",
    intro:
      "Family-owned local movers based around Orlando. Short loading and unloading help across Central Florida, including:",
    links: [
      { label: "Orlando", href: "/orlando-movers" },
      { label: "Winter Park", href: "/winter-park-movers" },
      { label: "Oviedo", href: "/oviedo-movers" },
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
  sections: [
    {
      h2: "Who a short load is actually for",
      paragraphs: [
        "This page is a short crew for a truck that is already part of your plan, when the job is not a whole household and not a container that needs a real pack. It fits a partial unload at a second address after you drove, a curb-to-door carry of several pieces that is not a planned single-item delivery, or a vehicle that needs hands for a brief window and then leaves. If you describe a three-bedroom house, we will point you to labor-only or full-service instead of squeezing that volume into a short booking.",
        "A planned sofa, mattress, or furniture pickup belongs on small moves. A POD, a U-Haul you want packed tight, or a storage unit that needs a dense load belongs on POD loading help. Use this page when the pieces are already separated and the missing piece is people, not a plan for the whole home.",
      ],
    },
    {
      h2: "How the lift works",
      paragraphs: [
        "Tell us what is on the truck or at the curb, how many floors, and where the vehicle can stop. Photos of the pieces and the doorway show whether two people can finish inside a short window or whether a third person keeps the carry moving. The crew brings pads and wrap when a piece needs them, and they set items where you point. They do not haul away things you are discarding, and they do not rebuild furniture that was never part of the request.",
        "Split the pieces you want moved from what stays before the crew is on the clock. A clear path, a legal place for the vehicle, and a person who can say where each piece goes are the whole prep. Loose drawers and open cartons belong on a packing or labor-only booking.",
      ],
    },
    {
      h2: "Access when the truck is already on site",
      paragraphs: [
        "You are often the one who positioned the vehicle. A box truck or a pickup in a downtown loading zone, an apartment guest spot, or a storage-facility drive aisle is on a timer the property controls. Share that limit and the walk to the door. If the building wants the vehicle at a side entrance, meet the crew there. An elevator reservation still applies when the pieces go upstairs. Send the floor and the window with the request so the arrival matches it.",
        "Street parking in Winter Park, a Kissimmee rental with a short drive, and an Orlando apartment court where guest spots are the only legal stop all add walking time. Put that walk in the request. A fire lane is not a loading zone, and we will not plan the stop there.",
      ],
    },
    {
      h2: "Where short loads happen in Central Florida",
      paragraphs: [
        "Orlando apartments, Winter Park houses, Kissimmee rentals, and metro storage stops are all in range for this short lift. What changes is the walk and the floor, not the kind of booking. When the crew meets you at a second local address, the drive between them is time on the clock. If that second stop leaves Central Florida, say so before we treat it as a local job. Hotel and resort corridors sometimes restrict where a truck may stand. If a desk or a property rule applies, send it with the request.",
      ],
    },
    {
      h2: "Which page to book instead",
      paragraphs: [
        "Small moves covers a planned single item or furniture delivery. POD loading help covers a container, a rental truck you want packed, or a storage unit. Labor-only covers a household on your truck. Full-service covers a household when you also need the truck. Apartment movers covers stairs and a reserved elevator when the building is the job, and you can still ask for a short unload if that is truly the scope. Start on the services page if you are between two of those.",
      ],
    },
  ] as const,
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
      a: QUOTE_RATE_ANSWER,
    },
    {
      q: "How do I book loading help?",
      a: `Call or text ${LOADING_PHONE}, or request a quote online. Share what you are moving, access details, and timing. Hours: Sun-Fri, 7:00 AM to 7:00 PM; Sat, 9:00 AM to 5:00 PM.`,
    },
    {
      q: "What should be ready before the crew arrives?",
      a: "Separate the pieces you want moved from what stays, and leave a clear path to the door. Have a legal place for the truck and someone who can point to where each piece goes. If a gate code, a floor, or an elevator window is involved, send it before the arrival. Open cartons and a room you still need packed are a packing or labor-only booking, not this short lift.",
    },
  ] as const,
  closing: {
    h2: "Need loading or unloading help in Orlando?",
    body: "Tell us the truck scope, floors, and parking. We will match the crew, explain the hourly model, and confirm whether this short lift, a small move, a POD load, or labor-only fits better.",
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
