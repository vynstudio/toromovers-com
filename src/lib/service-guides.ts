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
  /** Replaces the default related line when the page needs a tighter set of links. */
  related?: readonly { label: string; href: string }[];
};

const AREA_LINKS = [
  { label: "Orlando", href: "/orlando-movers" },
  { label: "Lake Nona", href: "/lake-nona-movers" },
  { label: "Dr. Phillips", href: "/dr-phillips-movers" },
  { label: "Winter Park", href: "/winter-park-movers" },
  { label: "Kissimmee", href: "/kissimmee-movers" },
  { label: "Winter Garden", href: "/winter-garden-movers" },
  { label: "Lake Mary", href: "/lake-mary-movers" },
  { label: "Winter Springs", href: "/winter-springs-movers" },
  { label: "Horizon West", href: "/horizon-west-movers" },
  { label: "Deltona", href: "/deltona-movers" },
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
        "If the drop-off leaves Central Florida, that job is a trip quote rather than this local hourly pack. Say so when you call so we do not plan a same-metro crew for a longer route. For local work, hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
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
      a: "Call or text (689) 600-2720, or request a quote online. Say self-pack, packing help with the rooms named, or full packing. Add both addresses, stairs or elevator hours, parking, and truck versus labor-only. Hours: Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
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
        "A small office loses the day if the crew works while people are still at their desks. Schedule the load after close, early in the morning, or on Saturday so the suite is empty and downtime stays short. Published hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM. If the building only allows a window outside those hours, say so when you book and confirm the start before the quote is final.",
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
        "Share both addresses, floors, the date, and whether the suite will be empty. Hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM. We serve Orlando and the other Central Florida cities linked below.",
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
      a: "Saturday hours are 9:00 AM – 5:00 PM. Sunday–Friday hours are 7:00 AM – 7:00 PM. If the building only allows a window outside those hours, say so when you book and confirm the start before the quote is final. A short slot often needs a larger crew. Reserve the freight elevator or dock for that same window.",
    },
    {
      q: "What if the landlord wants a certificate of insurance?",
      a: "Ask the landlord what the building needs and the deadline. Send Toro the manager’s name, email, any required wording, and the deadline when you book so the paperwork the property asks for can go out in time. Many buildings want that several business days ahead.",
    },
    {
      q: "How do I get an office moving quote?",
      a: "Request a quote at the quote page, or call or text (689) 600-2720. Share both addresses, floors, dock or freight-elevator rules, after-hours limits, and truck versus labor-only. Local jobs are hourly from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Hours: Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
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
        "Same-day movers in Orlando, for Toro, means a local job we can still put on today’s board. Both addresses stay inside Central Florida. A crew is open. Access does not depend on a reservation you never made. Hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM. Calling at noon does not create a crew that is already on another job.",
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
        "A huge unpacked house or a second stop that leaves Central Florida also pushes the job past a same-day start. Long-distance is not same-day local work. Timing follows the route and the inventory, not a metro clock. If you are still packing when you call, say so. The crew can still help on an hourly clock once a slot is open, but an empty-house promise with rooms still full will burn the day.",
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
        "Hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM. Email hello@toromovers.com, or call or text (689) 600-2720. If you are still deciding whether today is realistic, read the same-day guide first, then request the quote with the addresses in hand.",
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
      a: "Often, when both stops stay inside Central Florida and a crew is open that day. Same-day is not a guarantee. Local jobs are quoted by the hour from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Call or text (689) 600-2720 or request a quote online. Hours: Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
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

export const smallMovesPage: ServiceGuide = {
  path: "/small-moves-orlando",
  crumb: "Small moves",
  metadata: {
    title: "Small movers in Orlando | Single item & delivery",
    description:
      "Small movers in Orlando for one piece, a few items, or furniture pickup and delivery. Up-front hourly rates. Call (689) 600-2720.",
    ogTitle: "Small movers in Orlando",
    ogDescription:
      "Single-item movers and local furniture pickup in Orlando and Central Florida, with up-front hourly rates.",
  },
  hero: {
    eyebrow: "Small moves · Orlando",
    h1: "Small movers in Orlando",
    lede:
      "Small movers in Orlando are for a job that is not a whole household: one heavy piece, a short list of furniture, or a furniture pickup and delivery between two Central Florida addresses. Toro Movers sends a local crew sized for that list, with the same up-front hourly rate used on larger local jobs. The crew is family-owned and bilingual in English and Spanish. There is no single-item menu and no flat delivery price.",
    image: {
      src: "/images/moves/real-21.webp",
      alt: "Toro Movers crew carrying furniture up stairs on a Central Florida job",
    },
    chips: [
      "One piece or a few",
      "Furniture pickup",
      "Truck or labor-only",
      "Up-front hourly rates",
    ],
    blogHref: "/blog/careful-furniture-handling-orlando-movers",
    blogLabel: "how furniture is protected on the carry",
    blogNote:
      "That note is pads, wrap, and tight turns. This page is how you hire small movers in Orlando once you know the job is one piece or a short list, not a household and not a POD.",
  },
  sections: [
    {
      h2: "What a small move covers",
      paragraphs: [
        "A small move can use our truck or yours. Full-service is the crew and the truck, door to door, when you do not want to rent a vehicle for a sofa, a bedroom set, or a few pieces leaving a previous address. Labor-only is the crew when you already have a van, a U-Haul, or another truck and only need the lift. Say which booking you need so the quote matches the day. This is a local crew moving the pieces you name. It is not a store’s delivery contract and not a freight shipment.",
        "The quote form already treats this as its own job: one item, a furniture pickup, or a small move. Lead with that list. If the garage, the closets, and another bedroom are also going, the job is a household. A quote built for one piece will not cover a home that is still full.",
      ],
    },
    {
      h2: "Single-item movers and furniture pickup",
      paragraphs: [
        "Single item movers in Orlando are the same crew, booked for one piece. A sofa, a mattress, a dresser, an appliance, or a piece of gym equipment is a normal short job when the path is clear. Photos matter more than a bedroom count. A sleeper sofa on a turn in a stairwell is a different carry than a mattress already at the curb. Share the piece, the floor at each stop, and whether it has to come apart.",
        "Furniture pickup and delivery means two addresses inside Central Florida. The piece starts at a house, an apartment, or another stop you already have access to, and it ends in the room where it belongs. Tell us the placement, not only the street. A second-floor bedroom is not the same clock as a garage. If the pickup is a dock or a loading zone with a short window, say so. We cannot open a window the building never reserved.",
      ],
    },
    {
      h2: "How this differs from loading help and a POD load",
      paragraphs: [
        "Three other pages cover work that sounds similar and should stay separate. Loading and unloading is a short lift: help with a truck that is already on site, a curb unload, or a transfer that is not a planned furniture delivery. Labor-only moving is the broader booking when you already have the vehicle and the job is a real household load, not one named piece. POD loading help is a container, a U-Haul or other rental truck, or a storage unit. You keep that vehicle or unit, and the crew packs it.",
        "A POD, a rental truck, or a storage unit is POD loading help. A sofa from one Orlando address to another is this page. The contents of an apartment are full-service or labor-only, depending on who brings the truck. Same crew and the same hourly model. The page changes so the quote matches the list.",
      ],
    },
    {
      h2: "How a short job is quoted",
      paragraphs: [
        "Local small jobs are hourly. Toro quotes from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. A short carry can land on that minimum. Stairs, an elevator wait, a long walk from parking, and a piece that has to come apart add time on the same clock. They are not a separate fee. Two movers fit many single pieces. A heavier piece may need more people. The rate is per mover per hour, so the quote balances people and time.",
        "A clear path from the room to the door, and a place to park that is actually legal, keeps the minimum realistic. A building that makes the crew wait for an elevator spends that wait on the clock. Florida heat slows a midday carry. Heat does not add a fee. When the building allows it, an earlier start is the faster job. Hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
      ],
    },
    {
      h2: "Where we take small moves",
      paragraphs: [
        "Toro Movers is based in Orlando and takes small moves and furniture pickups across Central Florida, including Winter Springs, Deltona, Horizon West, Lake Nona, Dr. Phillips, Winter Park, and Winter Garden. The hourly model is the same on a short metro hop. Drive time between the two addresses is on the clock and quoted honestly. A Deltona pickup with an Orlando drop-off is a longer local hop than a move inside one neighborhood. It is still this page if the list is small.",
        "If the drop-off leaves Central Florida, that job is a trip quote rather than this local hourly clock. Lead with the piece, send photos, and give both addresses. Add stairs or a reserved elevator, parking, and whether you need our truck or only labor. If more than one piece is moving, list them.",
      ],
    },
  ],
  areas: {
    h2: "Small moves across Central Florida",
    intro:
      "Family-owned local movers based in Orlando. Small moves and furniture pickups in these cities:",
    links: AREA_LINKS,
  },
  faqs: [
    {
      q: "What are small movers in Orlando?",
      a: "Small movers means a crew for one heavy piece, a short list of furniture, or a furniture pickup and delivery between two Central Florida addresses. It is not a whole-home move. The job can use our truck or yours, on the same hourly rate as other local work.",
    },
    {
      q: "Do you offer single item movers in Orlando?",
      a: "Yes. A sofa, mattress, dresser, appliance, or piece of gym equipment can be booked on its own when the path is clear. Send photos, both floors, and whether the piece has to come apart. There is no single-item price list.",
    },
    {
      q: "Can you pick up furniture and deliver it locally?",
      a: "Yes, between two Central Florida addresses you already have access to. Tell us where the piece starts, where it should be placed, and any dock or elevator window. A drop-off that leaves Central Florida is a trip quote, not this local hourly job.",
    },
    {
      q: "How much do small movers cost in Orlando?",
      a: "Local jobs are quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. A short carry can land on the minimum. Stairs, elevator waits, and a long walk from parking add time. They are not a separate fee.",
    },
    {
      q: "How is this different from POD loading or labor-only?",
      a: "This page is one piece or a short furniture list, often with our truck. POD loading help is a container, a U-Haul, or a storage unit you already have. Labor-only is a household load on your truck. Loading and unloading is a short lift that is not a planned delivery. Call or text (689) 600-2720 if you are unsure which fits.",
    },
  ],
  closing: {
    h2: "Ready for small movers in Orlando?",
    body: "Name the piece or the short list, send photos, and give both addresses. We will match the crew, explain the hourly rate, and say whether this page, a household move, or a POD load is the better booking.",
  },
  service: {
    name: "Small movers in Orlando",
    serviceType: "Small moves and single-item moving",
  },
  related: [
    { label: "loading and unloading", href: "/loading-unloading" },
    { label: "POD and U-Haul loading", href: "/pod-loading-orlando" },
    { label: "labor-only moving", href: "/labor-only-moving" },
    { label: "full-service moving", href: "/full-service-moving" },
    { label: "all services", href: "/services" },
  ],
};

export const podLoadingPage: ServiceGuide = {
  path: "/pod-loading-orlando",
  crumb: "POD loading",
  metadata: {
    title: "POD loading help in Orlando | U-Haul & storage",
    description:
      "POD loading help in Orlando for a container, U-Haul, or storage unit. You keep the truck. Up-front hourly rates. Call (689) 600-2720.",
    ogTitle: "POD loading help in Orlando",
    ogDescription:
      "Load or unload a POD, U-Haul, or storage unit in Orlando. Labor by the hour, with the vehicle staying yours.",
  },
  hero: {
    eyebrow: "POD, U-Haul & storage · Orlando",
    h1: "POD loading help in Orlando",
    lede:
      "POD loading help in Orlando is labor for a container, a U-Haul or other rental truck, or a storage unit you already have. Toro Movers loads it, unloads it, or both, with up-front hourly rates explained before the crew starts. You keep the vehicle or the unit. We do not bring a moving truck on this booking. The crew is family-owned and bilingual in English and Spanish.",
    image: {
      src: "/images/moves/svc-labor.webp",
      alt: "Toro Movers crew padding furniture on a labor-only load in Central Florida",
    },
    chips: [
      "POD and containers",
      "U-Haul and rental trucks",
      "Storage unit loading",
      "You keep the vehicle",
    ],
    blogHref: "/blog/uhaul-pod-loading-help-orlando",
    blogLabel: "what to have ready for a U-Haul or POD",
    blogNote:
      "That guide, and the storage, POD, and U-Haul guide, are the prep: truck size, container placement, and facility hours. This page is how you hire the crew. It is not the short-lift page and not the whole-home labor comparison.",
  },
  sections: [
    {
      h2: "What this page is for",
      paragraphs: [
        "Book POD loading help when the thing being filled is a portable container, a rental truck, or a storage unit. A POD in the driveway, a U-Haul, Penske, or Budget truck at the curb, and a unit at a storage facility all fit. One end is load-only or unload-only. Both ends means a crew at each stop. You still drive the rental, or the container company moves the POD.",
        "The pack has to stay stable after the crew leaves, so placement matters as much as the furniture list. Tell us the truck length or the unit size, where the ramp or the container doors will sit, and the carry from the home to that opening. Stairs, an elevator, or a long sidewalk belong in the booking. If the container company moves the unit, book the crew for the day it is on site.",
      ],
    },
    {
      h2: "U-Haul, POD, and storage are not the same clock",
      paragraphs: [
        "A U-Haul load is your rental. Share the truck length, where the ramp will sit, and whether the job is one-way or a local hop you are driving. A short unload at one house is a different clock than a full truck on a walk-up. Toro does not drive the rental on this booking. If you want the truck and the crew together, that is full-service moving, not POD loading help.",
        "A POD needs a dense, protected pack because it may travel after we leave. HOA rules and driveway placement decide whether the doors can open where the container sits. A storage unit adds a gate code, a unit number, aisle width, and the hours the facility stays open. A transfer from a unit into a rental, or from a truck into a unit, fits when you already have the vehicle or the unit.",
      ],
    },
    {
      h2: "How this differs from labor-only and loading help",
      paragraphs: [
        "Labor-only moving is the broader service: you already have a truck or container, and you are choosing that model for the move, including a household load. Use that page when you are comparing labor-only with full-service. Use this page when you already know the job is POD loading help, U-Haul loading, or storage unit loading. Same crew, same hourly model, a tighter booking so those three jobs are not mixed with a whole-home decision.",
        "Loading and unloading is the short lift that is not a container, a rental-truck pack, or a storage unit. A curb unload, or help with a truck that only needs a few minutes, stays there. A single piece or a furniture pickup and delivery between two addresses is a small move, and it often uses our truck. If your list is one sofa and no container, book small movers. If your list is the unit, the POD, or the U-Haul, book this page.",
      ],
    },
    {
      h2: "How the hourly clock works",
      paragraphs: [
        "Local labor is quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs, a long carry, a late gate, and an elevator wait add time on the hourly clock. They are not a separate fee. Crew size, and whether you book one stop or two, still change the total. Many loads start with two movers. A tight stair or a heavier inventory may need more so the pack finishes inside the window you actually have. The rate is per mover per hour, so the quote balances people and time.",
        "Have the truck, the container, or the storage access on site when the crew arrives: keys, gate code, and unit number. Clear a path from the rooms to the door. Closed boxes let the crew stay on furniture. Packing that is still undone adds time on the same clock. Photos of bulky pieces help size the crew. If the building asks for a certificate, send the manager’s contact and the deadline when you book.",
      ],
    },
    {
      h2: "Where we load containers and rental trucks",
      paragraphs: [
        "Toro Movers is based in Orlando and does this work across Central Florida, including Winter Springs, Deltona, Horizon West, Lake Nona, Dr. Phillips, Winter Park, and Winter Garden. Drive time between two local stops is on the clock and quoted honestly. If the drop-off leaves Central Florida, that route is a trip quote rather than this local hourly load. You would still drive a rental. The quote follows the route.",
        "Hours are Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM. Call or text (689) 600-2720, or email hello@toromovers.com. Lead with the vehicle: POD, U-Haul or other rental, or storage unit. Add the size, one end or both, the addresses or the facility name, and stairs or an elevator.",
      ],
    },
  ],
  areas: {
    h2: "POD and U-Haul loading across Central Florida",
    intro:
      "Family-owned local movers based in Orlando. Container, rental-truck, and storage loading in these cities:",
    links: AREA_LINKS,
  },
  faqs: [
    {
      q: "Do you offer POD loading help in Orlando?",
      a: "Yes. Toro loads or unloads a POD or similar container when it is on site. Tell us where it will sit, how the doors open, and the path from the home, including stairs, an elevator, or an HOA window. You keep the container. The container company moves it.",
    },
    {
      q: "Do you load U-Haul trucks and storage units?",
      a: "Yes. U-Haul, Penske, Budget, and other rental trucks, plus storage units, are this booking when you already have the vehicle or the unit. Share truck length or unit size, the gate code, and whether you need one end or both. Toro does not bring a moving truck on this page.",
    },
    {
      q: "How is this different from labor-only moving?",
      a: "Labor-only is the broader choice when you have a truck and you are comparing that model with full-service for a household. This page is the hire page for POD loading help, U-Haul loading, and storage unit loading. The crew and the hourly rate are the same.",
    },
    {
      q: "How is this different from loading and unloading or a small move?",
      a: "Loading and unloading is a short lift that is not a container, a rental pack, or a storage unit. A small move is one piece or a short furniture list, often with our truck. A POD, U-Haul, or storage unit belongs here.",
    },
    {
      q: "How much does POD or U-Haul loading cost?",
      a: "Local labor is quoted from $75 per mover per hour, with a 2-hour minimum, no fuel surcharge, and no stair fees. Stairs, a late gate, and a long carry add time. They are not a separate fee. Call or text (689) 600-2720 or request a quote online. Hours: Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM.",
    },
  ],
  closing: {
    h2: "Ready for POD loading help in Orlando?",
    body: "Tell us whether it is a container, a U-Haul, or a storage unit, and whether you need one end or both. We will match the crew, explain the hourly rate, and confirm this is the right page before anyone rolls.",
  },
  service: {
    name: "POD loading help in Orlando",
    serviceType: "POD, U-Haul, and storage unit loading",
  },
  related: [
    { label: "storage, POD, and U-Haul guide", href: "/blog/orlando-pod-uhaul-storage-loading" },
    { label: "loading and unloading", href: "/loading-unloading" },
    { label: "labor-only moving", href: "/labor-only-moving" },
    { label: "small moves", href: "/small-moves-orlando" },
    { label: "all services", href: "/services" },
  ],
};

export const serviceGuides = [
  packingServicesPage,
  officeMoversPage,
  sameDayMoversPage,
  smallMovesPage,
  podLoadingPage,
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
