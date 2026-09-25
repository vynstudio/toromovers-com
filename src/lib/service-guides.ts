/**
 * Commercial service landings that sit beside the blog guides.
 * The guide explains the decision. This page is how to hire the crew.
 * FAQ text must match the on-page FAQ (schema).
 */

import { businessAreaServed } from "./business-profile.ts";
import { SITE_URL } from "./site.ts";

export type ServiceGuide = {
  path: string;
  crumb: string;
  metadata: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    lede: string;
    image: { src: string; alt: string };
    chips: readonly string[];
    blogHref: string;
    blogLabel: string;
    blogNote: string;
  };
  sections: readonly {
    h2: string;
    paragraphs: readonly string[];
  }[];
  areas: {
    h2: string;
    intro: string;
    links: readonly { label: string; href: string }[];
  };
  faqs: readonly { q: string; a: string }[];
  closing: { h2: string; body: string };
  service: { name: string; serviceType: string };
};

const AREA_LINKS = [
  { label: "Orlando", href: "/orlando-movers" },
  { label: "Lake Nona", href: "/lake-nona-movers" },
  { label: "Dr. Phillips", href: "/dr-phillips-movers" },
  { label: "Winter Park", href: "/winter-park-movers" },
  { label: "Kissimmee", href: "/kissimmee-movers" },
  { label: "Winter Garden", href: "/winter-garden-movers" },
  { label: "Lake Mary", href: "/lake-mary-movers" },
  { label: "Central Florida", href: "/central-florida-movers" },
] as const;

export const packingServicesPage: ServiceGuide = {
  path: "/packing-services-orlando",
  crumb: "Packing services",
  metadata: {
    title: "Packing services in Orlando | Help by the hour",
    description:
      "Packing services in Orlando for kitchens, closets, or a full household pack. Same up-front hourly rate as the move. Call (689) 600-2720.",
    ogTitle: "Packing services in Orlando",
    ogDescription:
      "Hire Toro to box named rooms or the whole home before the carry. Up-front hourly rates across Central Florida.",
  },
  hero: {
    eyebrow: "Packing services · Orlando",
    h1: "Packing services in Orlando",
    lede:
      "Toro Movers packs in Orlando and Central Florida when you want the crew to box named rooms, or the household goods that are still loose, before the carry. Packing uses the same up-front hourly rate as the move. There is no carton price list. The crew is family-owned and bilingual in English and Spanish.",
    image: {
      src: "/images/moves/real-11.webp",
      alt: "Mover loading stacked boxes on a hand truck during a Central Florida move",
    },
    chips: [
      "Partial or full pack",
      "Same hourly rate",
      "Full-service or labor-only",
      "Bilingual EN · ES",
    ],
    blogHref: "/blog/orlando-packing-help-movers",
    blogLabel: "when to book packing help vs full packing",
    blogNote:
      "That guide is the decision: self-pack, a named slice, or a full pack. This page is how you hire the crew once you know which one you want.",
  },
  sections: [
    {
      h2: "What packing services cover",
      paragraphs: [
        "Packing services in Orlando are the boxes the crew closes, not a separate product from the move. A partial pack is the slice you name: the kitchen, the closets, or fragile pieces, after the rest of the home is already in cartons. A full pack is the crew boxing household goods that are still loose, then moving them. Self-pack means your cartons are already closed, taped, and labeled when the truck arrives. Furniture pads and wrap are part of the move on all three. The difference is whose time closes the cartons.",
        "You can add packing to a full-service booking or to labor-only help. Full-service is the crew and the truck, door to door. Labor-only is the crew when you already have a U-Haul, POD, or rental truck. The crew can box the rooms you named and then load your vehicle. Say which booking you need so the quote matches the day. Time spent boxing is on the same clock as the carry.",
      ],
    },
    {
      h2: "Name the rooms before the crew is booked",
      paragraphs: [
        "Lead with the pack when you request the quote. If it is packing help, name the rooms: kitchen, closets, fragile only, or the list you actually mean. A kitchen is dishes, glass, small appliances, and the pantry goods you are moving. Closets are hanging clothes and folded stacks, plus any drawers you want emptied. Fragile-only is mirrors, framed art, lamps, or one shelf of breakables, with a clear place to wrap. If every drawer and cabinet is still full, that is a full pack, not a partial.",
        "Keep documents, medication, laptops, jewelry, and a change of clothes with you, and point them out so they are not boxed. Set aside food that will spoil in a hot truck. Say what is not moving: trash, donations, and the items you will carry yourself. Photos of the rooms you want packed help size the hours. A quote built for closed boxes will not cover a house that is still in drawers.",
      ],
    },
    {
      h2: "How packing changes the hourly clock",
      paragraphs: [
        "Local jobs are quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Packing the crew does is hours on that same rate. A larger pack needs more hours, and sometimes more movers, so the boxes and the furniture both finish. More people can box and carry at the same time, which can shorten the clock. The rate is per mover per hour, so the quote balances people and time.",
        "How packed you will be can change the day more than bedroom count alone. A packed two-bedroom with closed boxes can finish faster than a larger home where the kitchen and closets are still open. Share home size and how packed you will be. Stairs, elevator waits, and a long walk from parking add time. They are not a stair fee. A short fragile pack plus a short carry can land on the 2-hour minimum. A full pack of a house will run past it. We explain crew size and the hourly model before the day.",
      ],
    },
    {
      h2: "Apartments, houses, and the building window",
      paragraphs: [
        "On-site packing uses the elevator, dock, or loading-zone window. Many Orlando apartments, condos, and HOAs open that window only for a reserved slot. If the crew spends the first part of the slot boxing a kitchen, that time is inside the reservation. It is not time that sits before the window starts. For a short slot, finish the partial pack the day before, or self-pack, and use the window for the carry. If the pack has to happen inside the reservation, ask the property for a longer window or book a larger crew, and say the boxes are not done.",
        "A house without an elevator still has a clock. A hot garage, a long driveway, and rooms that are not on a clear path add minutes. Florida heat slows a midday pack. Heat does not add a fee. When the building allows it, an earlier start is the faster pack. Tell the property and the crew the truth about packing. A reservation that assumes a packed unit will not stretch because the closets were still full.",
      ],
    },
    {
      h2: "Where we pack in Central Florida",
      paragraphs: [
        "Toro Movers is based in Orlando and packs on local jobs across Central Florida, including Lake Nona, Dr. Phillips, Winter Park, Kissimmee, Winter Garden, and Lake Mary. The hourly model is the same on a short metro hop. Drive time between those cities is on the clock and quoted honestly.",
        "If the drop-off leaves Central Florida, that job is a trip quote rather than this local hourly pack. Say so when you call so we do not plan a same-metro crew for a longer route. For local work, hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request.",
      ],
    },
  ],
  areas: {
    h2: "Packing services across Central Florida",
    intro:
      "Family-owned local movers based in Orlando. Packing help on local jobs in these cities:",
    links: AREA_LINKS,
  },
  faqs: [
    {
      q: "What are packing services in Orlando?",
      a: "Packing services mean the crew boxes the rooms you name, or the household goods that are still loose, before the carry. A partial pack is a named slice such as the kitchen, closets, or fragile pieces. A full pack is the rest of the loose goods. Self-pack means your cartons are already closed. All three use the same hourly rate.",
    },
    {
      q: "Is there a separate price for packing?",
      a: "No. There is no carton rate and no packing price list. Time the crew spends boxing is on the same hourly clock as the carry, from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. A larger pack needs more hours, and sometimes more movers.",
    },
    {
      q: "Can packing be added to labor-only or full-service?",
      a: "Yes. Full-service is the crew and the truck. Labor-only is the crew when you already have a U-Haul, POD, or rental truck. The crew can box the rooms you named and then load. Tell Toro which booking you need, and which rooms are still unpacked, when you request a quote.",
    },
    {
      q: "Will on-site packing use my elevator window?",
      a: "Yes, if the crew boxes during the reserved slot. Many Orlando buildings open the elevator, dock, or loading zone only for that window, and packing time counts inside it. For a short slot, self-pack or finish the partial pack before the reservation, and use the window for the carry.",
    },
    {
      q: "How do I book packing services in Orlando?",
      a: "Call or text (689) 600-2720, or request a quote online. Say self-pack, packing help with the rooms named, or full packing. Add both addresses, stairs or elevator hours, parking, and truck versus labor-only. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ],
  closing: {
    h2: "Ready for packing services in Orlando?",
    body: "Tell us which rooms are still unpacked, both addresses, and whether you need a truck or labor-only help. We will match the crew, explain the hourly rate, and plan the window.",
  },
  service: {
    name: "Packing services in Orlando",
    serviceType: "Packing",
  },
};

export const officeMoversPage: ServiceGuide = {
  path: "/office-movers-orlando",
  crumb: "Office movers",
  metadata: {
    title: "Office movers in Orlando | Small commercial moves",
    description:
      "Office movers in Orlando for small offices and light commercial jobs. After-hours crews, desks, and hourly rates. Call (689) 600-2720.",
    ogTitle: "Office movers in Orlando",
    ogDescription:
      "Small office and light commercial moves across Orlando and Central Florida, with up-front hourly rates and bilingual crews.",
  },
  hero: {
    eyebrow: "Office & commercial · Orlando",
    h1: "Office movers in Orlando",
    lede:
      "Toro Movers handles office movers and small commercial moves in Orlando and Central Florida: suites, desks, files, and light commercial loads, with up-front hourly rates. We work around business hours when the building allows it. The crew is family-owned and bilingual in English and Spanish. This is local office moving, not a national commercial fleet.",
    image: {
      src: "/images/moves/svc-loading.webp",
      alt: "Toro Movers crew wrapping furniture before a Central Florida load",
    },
    chips: [
      "Small offices",
      "After-hours windows",
      "Desks and IT gear moved",
      "Up-front hourly rates",
    ],
    blogHref: "/blog/orlando-office-small-commercial-movers",
    blogLabel: "office and small commercial moving guide",
    blogNote:
      "That guide is the prep: after-hours timing, desks, and the paperwork a building may ask for. This page is where you hire office movers in Orlando.",
  },
  sections: [
    {
      h2: "Who these office movers are for",
      paragraphs: [
        "Office movers in Orlando, on this page, means a small office or a light commercial suite. A professional office, a clinic back room, a studio, or a short commercial hop inside Central Florida fits the crew we send. We move desks, chairs, file cabinets, conference tables, and boxed files. We pad and carry IT equipment as furniture. We do not set up networks, migrate data, or reinstall software.",
        "If the new suite leaves Central Florida, say so. That route is a trip quote, not the local hourly office clock. Commercial movers in Orlando, in our booking, is this same local crew with the access rules an office park adds. You still get an up-front hourly explanation before move day, in English or Spanish.",
      ],
    },
    {
      h2: "After hours, Saturday, and a short window",
      paragraphs: [
        "A small office loses the day if the crew works while people are still at their desks. Schedule the load after close, early in the morning, or on Saturday so the suite is empty and downtime stays short. Published hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request. If the building only allows a window outside those hours, say so when you book and confirm the start before the quote is final.",
        "A short evening or weekend slot often needs a larger crew so the job finishes before the office reopens. Reserve the freight elevator and the dock for that same window. Share a contact who can open the building if the crew arrives before staff. Photos of bulky pieces — large desks, copiers, conference tables — help size that crew.",
        "After-hours does not add a named surcharge in the pitch. It adds time, and sometimes more movers, on the hourly clock. We explain that before the day so a tight window is not a surprise at the dock.",
      ],
    },
    {
      h2: "Desks, files, and what we do not reconnect",
      paragraphs: [
        "Label desks, chairs, and file cabinets by room and by who uses them so the new office is placed, not sorted again. Empty drawers on heavy filing cabinets before the carry. Power down computers and monitors, label cables, and pack small electronics in closed boxes if you want the crew on the furniture. Say which pieces are fragile or must stay upright. Pads and wrap protect desks and cabinets through doorways, elevators, and the truck.",
        "The crew moves the equipment. They do not rack servers, test phones, or decide which desk belongs to which person unless you labeled it. Packing still left undone adds time on the hourly clock. If you want the crew to box files and small office goods, say packing help and name the rooms. That is the same hourly model as home packing, applied to a suite.",
        "If you already have a rental truck or container, the booking is labor-only: we load or unload what you staged. If you want the truck and the crew together, that is full-service. Both are available for a small office. Tell us which one when you book so we do not plan a second truck you do not need.",
      ],
    },
    {
      h2: "Freight elevators, docks, and building paperwork",
      paragraphs: [
        "Office parks and commercial buildings often require a freight elevator, a loading dock, a service entrance, and a certificate of insurance before the truck can enter. Ask the property manager what the building needs and the deadline. Many offices want that paperwork several business days ahead, not the morning of the move. Send Toro the manager’s name, email, any required wording, and the deadline with the booking so the paperwork the property asks for can go out in time.",
        "A dock shared with deliveries, or a freight elevator on a short reservation, adds time. Share the floor, the carry from the dock to the suite, and any loading-zone limit. We cannot open a window the property never reserved. If the only open window is early, book the early start and leave a clear path from each office to the elevator or the door.",
        "Apartment docks are a different page. A small office still needs the same honesty about access: floor, walk, and who meets the truck. Put gate codes and the suite number in the quote, not after the crew is on the street.",
      ],
    },
    {
      h2: "How an office move is quoted",
      paragraphs: [
        "Local office and light commercial moves are hourly. Toro quotes local jobs from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Freight-elevator waits and a long carry from the dock add time on that clock. They are not a separate line. Crew size, how packed the suite is, and truck versus labor-only still change the total. There is no one-size rate card.",
        "Share both addresses, floors, the date, and whether the suite will be empty. Hours are Mon–Sat, 7:00 AM – 7:00 PM. We serve Orlando and the other Central Florida cities linked below.",
      ],
    },
  ],
  areas: {
    h2: "Office movers across Central Florida",
    intro:
      "Small office and light commercial moves from our Orlando base, including:",
    links: AREA_LINKS,
  },
  faqs: [
    {
      q: "Do you offer office movers in Orlando?",
      a: "Yes. Toro Movers handles small office and light commercial moves in Orlando and Central Florida: desks, files, and boxed equipment, with up-front hourly rates. We do not set up networks or migrate data. Call or text (689) 600-2720 or request a quote online.",
    },
    {
      q: "Are you commercial movers for a small suite?",
      a: "Yes, for a small office or light commercial load inside Central Florida. A route that leaves the region is a trip quote, not the local hourly clock. Share suite size, floors, and whether you need a truck or labor-only help.",
    },
    {
      q: "Can the crew move an office after hours or on Saturday?",
      a: "Saturday is inside published hours, Mon–Sat, 7:00 AM – 7:00 PM. Sunday is on request. If the building only allows a window outside those hours, say so when you book and confirm the start before the quote is final. A short slot often needs a larger crew. Reserve the freight elevator or dock for that same window.",
    },
    {
      q: "What if the landlord wants a certificate of insurance?",
      a: "Ask the landlord what the building needs and the deadline. Send Toro the manager’s name, email, any required wording, and the deadline when you book so the paperwork the property asks for can go out in time. Many buildings want that several business days ahead.",
    },
    {
      q: "How do I get an office moving quote?",
      a: "Request a quote at the quote page, or call or text (689) 600-2720. Share both addresses, floors, dock or freight-elevator rules, after-hours limits, and truck versus labor-only. Local jobs are hourly from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ],
  closing: {
    h2: "Ready for office movers in Orlando?",
    body: "Tell us the suite, both addresses, the building window, and whether you need a truck. We will match the crew, explain the hourly rate, and plan the dock or elevator.",
  },
  service: {
    name: "Office movers in Orlando",
    serviceType: "Office and small commercial moving",
  },
};

export const sameDayMoversPage: ServiceGuide = {
  path: "/same-day-movers-orlando",
  crumb: "Same-day movers",
  metadata: {
    title: "Same-day movers in Orlando | When a crew is open",
    description:
      "Same-day movers in Orlando when a local crew is open. Not a guarantee. Up-front hourly rates for Central Florida hops. Call (689) 600-2720.",
    ogTitle: "Same-day movers in Orlando",
    ogDescription:
      "Local same-day moving in Orlando when a crew is still open. Hourly rates, clear limits, bilingual crew.",
  },
  hero: {
    eyebrow: "Same-day movers · Orlando",
    h1: "Same-day movers in Orlando",
    lede:
      "Same-day movers in Orlando are often possible for a local Central Florida hop when a crew is still open and both stops stay nearby. It is not a guarantee, and it is not a promise that every building will let a truck in today. Toro Movers quotes same-day local jobs by the hour, with the rate explained before the crew rolls. The crew is family-owned and bilingual in English and Spanish.",
    image: {
      src: "/images/moves/real-22.webp",
      alt: "Mover loading a wrapped piece up a truck ramp on a sunny Central Florida driveway",
    },
    chips: [
      "Local hops only",
      "Depends on an open crew",
      "Not a guarantee",
      "Up-front hourly rates",
    ],
    blogHref: "/blog/orlando-same-day-movers",
    blogLabel: "what is realistic for same-day movers",
    blogNote:
      "That guide is the longer look at what blocks a true same-day start. This page is how you ask for a crew today if the job still fits.",
  },
  sections: [
    {
      h2: "What same-day means here",
      paragraphs: [
        "Same-day movers in Orlando, for Toro, means a local job we can still put on today’s board. Both addresses stay inside Central Florida. A crew is open. Access does not depend on a reservation you never made. Hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request, so a Sunday same-day start only works if that window was confirmed. Calling at noon does not create a crew that is already on another job.",
        "A packed studio or one-bedroom with clear parking can often start the same day. A labor-only load into a U-Haul or POD that is already at the curb can too, if the path is clear. A full-service hop — crew and truck — can also fit when the route is short and the home is ready. The truck choice does not make same-day automatic. The open slot does.",
        "We will say no when the day is full or the building cannot take a truck today. A quote explains the rate and the start window. It is not a promise that every date and every property will fit.",
      ],
    },
    {
      h2: "Jobs that often fit the same day",
      paragraphs: [
        "Short local hops are the usual fit: Orlando to Winter Park, Dr. Phillips to Windermere, Lake Nona to another southeast address, Kissimmee to a nearby Osceola stop. The list is not a boundary. It is the kind of distance a crew can still finish inside the hours that are left. Share the real addresses. We will tell you if the drive still fits today.",
        "Labor-only is often the faster yes, because you already have the vehicle. Full-service needs a truck that is free as well as a crew. A few bulky pieces or a loading job that is already boxed is easier to place than a house that is still in drawers. If you want packing and a same-day carry, say so. A large pack may not finish today. Stairs, elevator waits, and a walk from parking add time. They are not a separate fee.",
      ],
    },
    {
      h2: "What usually blocks a same-day start",
      paragraphs: [
        "True same-day falls apart when the building controls the clock and the window was never reserved. Many Orlando apartments and HOAs require an elevator reservation, advance paperwork, or a short dock window that cannot be opened the morning of the move. If that window was never reserved, we cannot invent one. Ask the property first, then call us with the answer.",
        "A huge unpacked house, a second stop that leaves Central Florida, or a Sunday request that was not confirmed also push the job past a same-day start. Long-distance is not same-day local work. Timing follows the route and the inventory, not a metro clock. If you are still packing when you call, say so. The crew can still help on an hourly clock once a slot is open, but an empty-house promise with rooms still full will burn the day.",
        "A same-day ask is also the wrong tool when you need a certificate or a dock hold that the property only processes on weekdays. That paperwork will not clear because the truck is already nearby. Book the next window the building will actually open.",
      ],
    },
    {
      h2: "How a same-day job is quoted",
      paragraphs: [
        "Local same-day jobs are hourly. Toro quotes from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Crew size, how packed you are, and truck versus labor-only still change the total. There is no same-day surcharge in the pitch and no one-size rate card. The limit is whether a crew is open, not a different price list.",
        "That hourly model is for local Central Florida work. A drop-off outside the region is a trip quote. We explain the rate and the start window before the crew rolls. If the only open time is shorter than the job, we will say that.",
      ],
    },
    {
      h2: "What to send in the first message",
      paragraphs: [
        "Lead with the facts a dispatcher needs to say yes or no. Pickup and drop-off addresses. Stairs or a reserved elevator at either stop. How packed you will be when the crew arrives. Whether you need the truck or only labor on a rental or container you already have. Photos of bulky pieces help size the crew. Gate codes, HOA rules, and any loading-zone limit should be in that first message.",
        "Hours are Mon–Sat, 7:00 AM – 7:00 PM. Sunday crew time is on request. Email hello@toromovers.com, or call or text (689) 600-2720. If you are still deciding whether today is realistic, read the same-day guide first, then request the quote with the addresses in hand.",
      ],
    },
  ],
  areas: {
    h2: "Same-day movers across Central Florida",
    intro:
      "Same-day local hops from Orlando when a crew is open, including these cities:",
    links: AREA_LINKS,
  },
  faqs: [
    {
      q: "Can I book same-day movers in Orlando?",
      a: "Often, when both stops stay inside Central Florida and a crew is open that day. Same-day is not a guarantee. Local jobs are quoted by the hour from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Call or text (689) 600-2720 or request a quote online. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
    {
      q: "What should I send for a same-day quote?",
      a: "Send pickup and drop-off addresses, stairs or a reserved elevator, parking or gate codes, how packed you will be, and whether you need a truck or labor-only help. Photos of bulky pieces help size the crew.",
    },
    {
      q: "Why might same-day not work for my apartment?",
      a: "Many apartments and HOAs require an elevator reservation, a short dock window, or paperwork that cannot be opened the morning of the move. If that window was never reserved, true same-day often fails. Ask the property first, then call Toro with the rules.",
    },
    {
      q: "Is same-day priced differently from a booked local move?",
      a: "No. Same-day local jobs inside Central Florida use the same hourly model: from $75 per mover per hour, a 2-hour minimum, no fuel surcharge, and no stair fees. There is no same-day rate card. Availability depends on an open crew.",
    },
    {
      q: "Do you run same-day long-distance moves?",
      a: "No. Same-day on this page is a local Central Florida hop. A drop-off that leaves the region is a trip quote from origin, destination, and inventory, not a same-day metro clock.",
    },
  ],
  closing: {
    h2: "Need same-day movers in Orlando?",
    body: "Send both addresses, access, and how packed you are. If a crew is open and the building can take the truck, we will explain the hourly rate and the start window before anyone rolls.",
  },
  service: {
    name: "Same-day movers in Orlando",
    serviceType: "Same-day local moving",
  },
};

export const serviceGuides = [
  packingServicesPage,
  officeMoversPage,
  sameDayMoversPage,
] as const;

export function serviceGuideGraph(page: ServiceGuide) {
  const pageUrl = `${SITE_URL}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.service.name,
        serviceType: page.service.serviceType,
        provider: { "@id": `${SITE_URL}/#movingcompany` },
        areaServed: businessAreaServed(),
        url: pageUrl,
        description: page.metadata.description,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.metadata.title,
        description: page.metadata.description,
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
            name: page.crumb,
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}

export function serviceGuideWordCount(page: ServiceGuide): number {
  const parts = [
    page.hero.lede,
    page.hero.blogNote,
    ...page.sections.flatMap((section) => section.paragraphs),
    page.areas.intro,
    ...page.faqs.map((item) => `${item.q} ${item.a}`),
    page.closing.body,
  ];
  return parts.join(" ").split(/\s+/).filter(Boolean).length;
}
