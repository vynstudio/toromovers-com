/** Copy for /apartment-movers-orlando-fl. FAQ text must match the on-page FAQ schema. */

import { businessAreaServed } from "./business-profile.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { SITE_URL } from "./site.ts";

export const APARTMENT_PATH = "/apartment-movers-orlando-fl";
export const APARTMENT_PHONE = "321-234-0510";
export const APARTMENT_PHONE_TEL = "tel:+13212340510";

export const apartmentMoversPage = {
  path: APARTMENT_PATH,
  metadata: {
    title: "Apartment movers Orlando | Stairs & elevators",
    description:
      "Orlando apartment movers for walk-ups, elevators, and loading zones, planned before move day. Call 321-234-0510.",
    ogTitle: "Apartment movers in Orlando",
    ogDescription:
      "Local crews for Orlando apartments and condos. Stairs, elevators, and building rules planned, with the hourly model explained before move day.",
  },
  hero: {
    eyebrow: "Apartment & condo moving",
    h1: "Apartment movers in Orlando",
    lede:
      "Toro Movers handles apartment moves across Orlando and Central Florida: walk-ups, elevators, loading zones, parking rules, and timed move-in windows. You get a local bilingual crew, and the hourly model is explained before move day.",
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
      "Certificate or paperwork your property asks for. Tell us what the leasing office requires when you book.",
    ] as const,
    note: "Planning access up front keeps surprises off move day. Tell us what the leasing office requires when you call or request a quote.",
  },
  options: {
    h2: "Full-service vs labor-only for apartments",
    intro: "Pick the option that matches how much of the move you want handled.",
    blocks: [
      {
        title: "Full-service apartment move",
        body: "Crew, truck, load, transport, unload, and placement. Best when you want one local team from door to door across Orlando or nearby cities.",
      },
      {
        title: "Labor-only for apartments",
        body: "You have the U-Haul, POD, or rental truck. We load or unload by the hour with the same care for stairs and tight halls.",
      },
    ] as const,
  },
  pricing: {
    h2: "How apartment move pricing works",
    intro: "The total depends on:",
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
      "We explain the hourly model before move day. Call or text with unit details, floors, and elevator rules, or get a free quote online.",
    marketNote:
      "Published Orlando apartment-move averages vary by company. Treat third-party ranges as context only. Your Toro quote is based on your building and inventory.",
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
  sections: [
    {
      h2: "How an Orlando apartment move runs",
      paragraphs: [
        "The property sets the window more often than the inventory does. A leasing office may allow a move only on certain weekdays, only outside quiet hours, or only with a reserved freight elevator and pads on the cab walls. Ask what they require and the deadline, then send that with the booking. If they want a form or a certificate, forward the request with the manager's name. We cannot open a window the office never reserved.",
        "On the day, the crew arrives for that reservation. A passenger elevator that residents still use is a slower clock than a reserved freight car, because the crew yields the car between loads. A walk-up is a different plan: the floor count, whether the stair turns back on itself, and whether the only legal stop is street parking. Tell us those three things before the quote is treated as final.",
      ],
    },
    {
      h2: "What to stage inside the unit",
      paragraphs: [
        "A clear path from the door to the largest pieces matters more than a perfect label system. Take down what you do not want decided in the hallway: a television you will carry, art with glass, and anything the lease says stays with the unit. Empty a fridge you are moving. Cartons you packed should be closed and taped. An open kitchen or a closet that is still on hangers is packing work. A short reservation will not cover those rooms on its own.",
        "If you are unsure a sofa will leave, measure one tight point: the stair width, the elevator door, or the turn into the bedroom. Photos of that turn, the loading area, and where a truck is allowed to stand are enough to size the crew. A reservation that assumes a packed unit will not stretch because the closets were still full.",
      ],
    },
    {
      h2: "Central Florida buildings we plan around",
      paragraphs: [
        "Downtown and Lake Eola towers, Baldwin Park and Thornton Park walk-ups, College Park houses cut into apartments, and newer Lake Nona or Horizon West buildings with a garage court do not share one access plan. Older Winter Park and College Park buildings often have no dock. The truck stops on the street, and the carry starts at the stair. Newer communities often use a call box and a loading zone on a timer. Kissimmee and Dr. Phillips condos may have a side entrance or a dock that is shared with deliveries.",
        "You are not quoted a separate building rate. The difference is minutes: the walk from the legal stop to the door, the floor, and whether the elevator is actually reserved. If the new unit is in another Central Florida city, the drive between the two addresses is part of the job. If the second address is outside the metro, say so before we plan a local crew. That route is a trip quote.",
      ],
    },
    {
      h2: "Which booking matches the building",
      paragraphs: [
        "Full-service is the booking when you want the truck as well as the crew, door to door. Labor-only is the same stairs and elevator plan when a U-Haul, POD, or rental truck is already reserved. Packing services is the add-on when the kitchen or closets will still be open at the start of the reservation. Name those rooms so the quote includes them. A single furniture piece is a small move. Every option is on the services page.",
      ],
    },
  ] as const,
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
      a: QUOTE_RATE_ANSWER,
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes. Toro Movers has an English- and Spanish-speaking crew so building rules, timing, and placement stay clear.",
    },
    {
      q: "How do I get an apartment moving quote?",
      a: `Call or text ${APARTMENT_PHONE}, or request a quote online. Share pickup and drop-off, floors, elevator or stairs, parking, and preferred date. Hours: Sun-Fri, 7:00 AM to 7:00 PM; Sat, 9:00 AM to 5:00 PM.`,
    },
  ] as const,
  closing: {
    h2: "Ready for apartment movers in Orlando?",
    body: "Tell us the building access, floors, and what you are moving. We will match crew size, explain the hourly model, and help plan the window.",
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
        areaServed: businessAreaServed(),
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
