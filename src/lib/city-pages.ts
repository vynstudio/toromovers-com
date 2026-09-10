/**
 * City SEO landing content for design-site pages.
 * Same shell as homepage; unique copy per city.
 */

import { CITIES as ENGINE_CITIES, type CityData } from "./engine-cities.ts";
import { PHONE_DISPLAY, QUOTE_PATH } from "./site.ts";

export type CityFaq = { q: string; a: string };

export type CitySection = { h2: string; body: string };

export type CityPageContent = {
  slug: string;
  href: string;
  name: string;
  badge: string;
  metadata: {
    title: string;
    description: string;
  };
  h1: string;
  lede: string;
  about: CitySection;
  sections: readonly CitySection[];
  neighborhoods: readonly string[];
  why: CitySection;
  faqs: readonly CityFaq[];
  services: readonly {
    title: string;
    body: string;
    href: string;
  }[];
  closing: {
    title: string;
    body: string;
  };
  schema: { lat: number; lng: number };
};

export const ORLANDO: CityPageContent = {
  slug: "orlando-movers",
  href: "/orlando-movers",
  name: "Orlando",
  badge: "Orlando, FL movers",
  metadata: {
    // 50–60 chars
    title: "Orlando Movers | Local Moving Company FL",
    // 120–160 chars
    description:
      "Need Orlando movers? Family-owned Toro Movers offers full-service, labor-only & apartment moves with up-front hourly rates. Call (689) 600-2720.",
  },
  h1: "#1 Trusted Movers in\nOrlando & Central Florida",
  lede: "Toro Movers is your local Orlando moving company—full-service, labor-only loading, apartment moves, and up-front hourly rates for Central Florida.",
  about: {
    h2: "Local movers in Orlando, FL",
    body: "Toro Movers provides local moving help in Orlando, FL for homes, apartments, storage units, rental trucks, and POD-style containers. Our bilingual English and Spanish crew helps with full-service moves, labor-only loading, apartment moves, and careful placement at your new address.",
  },
  sections: [
    {
      h2: "Full-service movers in Orlando",
      body: "Our full-service movers in Orlando handle loading, transportation, unloading, and placement so you do not have to manage the heavy parts yourself. Toro Movers plans around access details like stairs, elevators, parking, storage units, and building rules before move day.",
    },
    {
      h2: "Labor-only movers in Orlando",
      body: "Toro Movers offers labor-only moving help in Orlando for U-Haul trucks, PODS, trailers, rental trucks, and storage units. You provide the vehicle or container, and our crew handles loading, unloading, heavy lifting, and placement by the hour.",
    },
    {
      h2: "Apartment movers in Orlando",
      body: "Toro Movers helps with apartment moves in Orlando, including walk-ups, elevators, tight hallways, parking limits, loading zones, and scheduled move-in windows. Our crew plans around access details so the move stays organized and careful.",
    },
    {
      h2: "Up-front hourly moving rates",
      body: "Toro Movers uses up-front hourly rates for most Orlando local moves. Pricing depends on crew size, truck needs, stairs, elevators, access, distance, and how much you need moved. We explain the rate structure before move day so expectations are clear.",
    },
  ],
  neighborhoods: [
    "Downtown Orlando",
    "Lake Nona",
    "Dr. Phillips",
    "MetroWest",
    "Baldwin Park",
    "Audubon Park",
    "College Park",
    "Thornton Park",
  ],
  why: {
    h2: "Why Orlando customers choose Toro Movers",
    body: "Toro Movers is family-owned, locally operated, bilingual in English and Spanish, and rated 5 stars on Google. Orlando customers choose Toro because they want a local crew, clear communication, up-front hourly pricing, and movers who understand apartments, storage moves, stairs, elevators, and rental truck loading.",
  },
  faqs: [
    {
      q: "How much do movers cost in Orlando?",
      a: "Toro Movers quotes most Orlando moves with up-front hourly rates. The final cost depends on crew size, truck needs, stairs, elevators, distance, access, and how much you need moved. Call or text (689) 600-2720 with your move details and we will explain the hourly pricing model before move day.",
    },
    {
      q: "Do you offer labor-only movers in Orlando?",
      a: "Yes, Toro Movers offers labor-only movers in Orlando for U-Haul trucks, PODS, trailers, storage units, and rental trucks. You provide the vehicle or container, and our crew handles the loading, unloading, heavy lifting, and placement.",
    },
    {
      q: "Do you handle apartment moves in Orlando?",
      a: "Yes, Toro Movers handles apartment moves in Orlando, including walk-ups, elevators, loading zones, tight hallways, parking limits, and scheduled move-in windows. We ask about apartment access before quoting so the crew can plan the move correctly.",
    },
    {
      q: "Are you a local Orlando moving company?",
      a: "Yes, Toro Movers is a family-owned local moving company serving Orlando and Central Florida. You work directly with our local crew, which helps keep communication, scheduling, and move-day expectations clear.",
    },
    {
      q: "What is the difference between full-service and labor-only moving?",
      a: "Full-service moving includes the crew, truck, loading, transportation, unloading, and placement. Labor-only moving is for customers who already have a U-Haul, POD, trailer, or rental truck and only need movers for loading, unloading, or heavy lifting.",
    },
    {
      q: "How do I get a moving quote in Orlando?",
      a: "To get a moving quote in Orlando, call or text Toro Movers at (689) 600-2720. Share your move date, pickup and drop-off locations, home or apartment type, stairs or elevators, and whether you need full-service movers or labor-only help.",
    },
  ],
  services: [
    {
      title: "Full-service movers",
      body: "Truck, crew, loading, transport, unloading, and careful placement across Orlando and Central Florida.",
      href: "/services",
    },
    {
      title: "Labor-only movers",
      body: "U-Haul, POD, trailer, and rental truck loading and unloading by the hour.",
      href: "/services",
    },
    {
      title: "Apartment movers",
      body: "Stairs, elevators, loading zones, and tight move-in windows handled carefully.",
      href: "/services",
    },
  ],
  closing: {
    title: "Request an Orlando moving estimate before move day",
    body: "To get a moving estimate from Toro Movers in Orlando, call or text (689) 600-2720—or request a quote online. Share what you are moving, your Orlando addresses, and access details. We match crew size, explain up-front hourly rates, and help plan your local move.",
  },
  schema: { lat: 28.5384, lng: -81.3789 },
};

function cityServices(name: string): CityPageContent["services"] {
  return [
    {
      title: "Full-service movers",
      body: `Truck, crew, loading, transport, unloading, and careful placement in ${name} and nearby Central Florida.`,
      href: "/services",
    },
    {
      title: "Labor-only movers",
      body: `U-Haul, POD, trailer, and rental truck loading and unloading by the hour in ${name}.`,
      href: "/services",
    },
    {
      title: "Apartment movers",
      body: `Stairs, elevators, loading zones, and tight move-in windows in ${name} handled carefully.`,
      href: "/services",
    },
  ];
}

function defaultSections(city: CityData): CityPageContent["sections"] {
  if (city.sections?.length) {
    return city.sections.map((s) => ({ h2: s.h2, body: s.body }));
  }
  const nearby = city.neighborhoods.slice(0, 3).join(", ");
  return [
    {
      h2: `Full-service movers in ${city.name}`,
      body: `Toro Movers handles full-service moves in ${city.name} — loading, transportation, unloading, and placement. ${city.uniqueAngle.body} Nearby areas we serve include ${nearby}.`,
    },
    {
      h2: `Labor-only movers in ${city.name}`,
      body: `Already have a U-Haul, POD, trailer, or rental truck in ${city.name}? Toro Movers provides labor-only loading and unloading by the hour. You supply the vehicle or container; our crew handles the heavy lifting and placement.`,
    },
    {
      h2: `Apartment movers in ${city.name}`,
      body: `Toro Movers helps with apartment and condo moves in ${city.name}, including walk-ups, elevators, loading zones, tight hallways, parking limits, and scheduled move-in windows. We ask about access before the crew is booked.`,
    },
    {
      h2: `Up-front hourly moving rates in ${city.name}`,
      body: `Most ${city.name} local moves are quoted with up-front hourly rates. Cost depends on crew size, truck needs, stairs, elevators, access, distance, and how much you need moved. We explain the rate before move day.`,
    },
  ];
}

function fromEngine(city: CityData): CityPageContent {
  return {
    slug: city.slug,
    href: city.href,
    name: city.name,
    badge: `${city.name}, FL movers`,
    metadata: city.metadata,
    h1: city.h1,
    lede: city.subline,
    about: { h2: city.about.h2, body: city.about.lead },
    sections: defaultSections(city),
    neighborhoods: city.neighborhoods,
    why: { h2: city.uniqueAngle.h2, body: city.uniqueAngle.body },
    faqs: city.faqs ?? [],
    services: cityServices(city.name),
    closing: {
      title: `Request a ${city.name} moving estimate before move day`,
      body: `Call or text Toro Movers at ${PHONE_DISPLAY}, or request a quote at ${QUOTE_PATH}. Share what you are moving, your ${city.name} addresses, and access details. We match crew size, explain up-front hourly rates, and help plan the local move.`,
    },
    schema: city.schema,
  };
}

function extraCity(opts: {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  about: CitySection;
  angle: CitySection;
  neighborhoods: string[];
  faqs: CityFaq[];
  lat: number;
  lng: number;
}): CityPageContent {
  const nearby = opts.neighborhoods.slice(0, 3).join(", ");
  return {
    slug: opts.slug,
    href: `/${opts.slug}`,
    name: opts.name,
    badge: `${opts.name}, FL movers`,
    metadata: { title: opts.title, description: opts.description },
    h1: opts.h1,
    lede: opts.lede,
    about: opts.about,
    sections: [
      {
        h2: `Full-service movers in ${opts.name}`,
        body: `Toro Movers provides full-service moving in ${opts.name} — load, transport, unload, and place. ${opts.angle.body} Nearby: ${nearby}.`,
      },
      {
        h2: `Labor-only movers in ${opts.name}`,
        body: `If you already have a U-Haul, POD, or rental truck in ${opts.name}, hire Toro for labor-only loading and unloading by the hour.`,
      },
      {
        h2: `Apartment movers in ${opts.name}`,
        body: `Apartment and condo moves in ${opts.name} often mean elevators, walk-ups, HOA windows, and tight parking. Toro plans those details before move day.`,
      },
      {
        h2: `Up-front hourly moving rates in ${opts.name}`,
        body: `Toro quotes most ${opts.name} local moves with up-front hourly rates. Crew size, access, and inventory drive the time — we explain the rate before the crew is booked.`,
      },
    ],
    neighborhoods: opts.neighborhoods,
    why: opts.angle,
    faqs: opts.faqs,
    services: cityServices(opts.name),
    closing: {
      title: `Request a ${opts.name} moving estimate before move day`,
      body: `Call or text Toro Movers at ${PHONE_DISPLAY}. Share your ${opts.name} addresses, access, and whether you need full-service or labor-only help.`,
    },
    schema: { lat: opts.lat, lng: opts.lng },
  };
}

const EXTRA_CITIES: CityPageContent[] = [
  extraCity({
    slug: "ocoee-movers",
    name: "Ocoee",
    title: "Ocoee Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Ocoee, FL? Toro Movers handles local moves, apartments, and labor-only loading with up-front hourly rates. Call (689) 600-2720.",
    h1: "Ocoee Movers for West Orange Local Moves",
    lede:
      "Toro Movers is a family-owned crew serving Ocoee and west Orange County with full-service moves, labor-only loading, and up-front hourly pricing.",
    about: {
      h2: "Local movers in Ocoee, FL",
      body: "Ocoee sits on the west side of metro Orlando along the Turnpike and SR-50, with lake neighborhoods, older ranch homes, and newer subdivisions. Toro Movers helps with household moves, apartments, storage loads, and rental-truck labor in Ocoee and nearby Winter Garden and Windermere.",
    },
    angle: {
      h2: "Built for west Orange access and lake streets",
      body: "Ocoee jobs often mean lake-lot driveways, HOA gates west of the Turnpike, and mix of older homes and new construction. Toro plans truck placement and quotes by the hour — no surprise fuel or stair fees.",
    },
    neighborhoods: [
      "Downtown Ocoee",
      "Lake Olympia",
      "Wesmere",
      "Forest Lake",
      "Ocoee Lakeshore",
      "West Oaks",
      "SR-50 corridor",
    ],
    faqs: [
      {
        q: "Do you move homes in Ocoee?",
        a: "Yes. Toro Movers handles household, townhome, and apartment moves in Ocoee and west Orange County with up-front hourly rates.",
      },
      {
        q: "Can you move me from Ocoee to Orlando?",
        a: "Yes. Local hops between Ocoee, Winter Garden, Windermere, and Orlando are a regular part of our week. Same hourly model across Central Florida.",
      },
      {
        q: "Do you offer labor-only help in Ocoee?",
        a: "Yes. If you already have a U-Haul, POD, or rental truck, we load and unload by the hour.",
      },
    ],
    lat: 28.5692,
    lng: -81.544,
  }),
  extraCity({
    slug: "longwood-movers",
    name: "Longwood",
    title: "Longwood Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Longwood, FL? Toro Movers handles local moves, historic homes, and labor-only loading with up-front hourly rates. Call (689) 600-2720.",
    h1: "Longwood Movers for Seminole County Local Moves",
    lede:
      "Toro Movers serves Longwood with full-service household moves, apartment help, and labor-only loading — up-front hourly pricing, local crew.",
    about: {
      h2: "Local movers in Longwood, FL",
      body: "Longwood’s historic district, ranch homes off 434, and Seminole County HOAs each have different truck access. Toro Movers plans around those details for homes, townhomes, and apartments in Longwood and nearby Altamonte Springs and Lake Mary.",
    },
    angle: {
      h2: "Built for Historic Longwood and 434 corridor homes",
      body: "Older Longwood streets can be narrow, with mature oaks and limited driveway depth. Toro plans truck placement, pads floors and doorways, and bills by the hour so a careful historic-home move stays predictable.",
    },
    neighborhoods: [
      "Historic Longwood",
      "Wekiva",
      "Sabal Point",
      "Sweetwater",
      "SR-434",
      "Rangeline",
      "Sand Lake",
    ],
    faqs: [
      {
        q: "Do you move older Longwood homes?",
        a: "Yes. Tight turns, older staircases, and oak-lined streets are common here. We plan access before move day and protect floors and doorways.",
      },
      {
        q: "How is a Longwood move priced?",
        a: `Most Longwood moves are quoted with up-front hourly rates. Call ${PHONE_DISPLAY} with addresses, stairs, and inventory and we will explain crew size and the rate.`,
      },
      {
        q: "Do you do labor-only in Longwood?",
        a: "Yes. U-Haul, POD, and rental-truck loading and unloading by the hour.",
      },
    ],
    lat: 28.703,
    lng: -81.3384,
  }),
  extraCity({
    slug: "casselberry-movers",
    name: "Casselberry",
    title: "Casselberry Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Casselberry, FL? Toro Movers handles local moves, condos, and labor-only loading with up-front hourly rates. Call (689) 600-2720.",
    h1: "Casselberry Movers for Seminole County Local Moves",
    lede:
      "Toro Movers handles Casselberry household, condo, and labor-only moves with a local crew and up-front hourly pricing.",
    about: {
      h2: "Local movers in Casselberry, FL",
      body: "Casselberry sits on the 436 corridor between Winter Park and Fern Park, with lake neighborhoods, condos, and short local hops. Toro Movers helps with apartments, homes, and rental-truck labor across Casselberry and nearby Seminole County.",
    },
    angle: {
      h2: "Built for 436 corridor condos and lake neighborhoods",
      body: "Casselberry moves are often short hops with elevator windows, lake-lot parking, or 436 traffic. Toro plans those constraints and quotes by the hour — no per-mile padding on a nearby local move.",
    },
    neighborhoods: [
      "Downtown Casselberry",
      "Lake Concord",
      "Lake Kathryn",
      "SR-436",
      "Winter Park Drive",
      "Fern Park border",
    ],
    faqs: [
      {
        q: "Do you move condos in Casselberry?",
        a: "Yes. We plan elevator reservations, loading zones, and long carries common in Casselberry condo communities.",
      },
      {
        q: "Can you move me from Casselberry to Winter Park?",
        a: "Yes. That is a regular local hop. Same hourly pricing across Central Florida.",
      },
      {
        q: "Do you offer labor-only movers in Casselberry?",
        a: "Yes. Hire the crew to load or unload your U-Haul, POD, or rental truck by the hour.",
      },
    ],
    lat: 28.6778,
    lng: -81.3278,
  }),
  extraCity({
    slug: "celebration-movers",
    name: "Celebration",
    title: "Celebration Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Celebration, FL? Toro Movers handles HOA and planned-community moves with up-front hourly rates. Call (689) 600-2720.",
    h1: "Celebration Movers for Planned-Community Local Moves",
    lede:
      "Toro Movers serves Celebration with full-service and labor-only moves, including HOA windows, tight streets, and up-front hourly pricing.",
    about: {
      h2: "Local movers in Celebration, FL",
      body: "Celebration is a planned Osceola community with HOA rules, limited truck parking, and walkable downtown streets. Toro Movers coordinates access, protects interiors, and quotes household and vacation-home moves by the hour.",
    },
    angle: {
      h2: "Built for Celebration HOA rules and tight streets",
      body: "Celebration jobs often need HOA arrival windows, no oversized trucks on certain streets, and careful carries into townhomes. Toro plans the access you share and bills by the hour — no surprise gate or stair fees.",
    },
    neighborhoods: [
      "Downtown Celebration",
      "North Village",
      "South Village",
      "East Village",
      "West Village",
      "Artisan Park",
    ],
    faqs: [
      {
        q: "Do you work with Celebration HOA rules?",
        a: "Yes. Share elevator, loading, and arrival-window rules when you book. We plan the crew and truck around what the community allows.",
      },
      {
        q: "Do you move vacation homes in Celebration?",
        a: "Yes. Furnished turnovers and household moves are both common here. We quote by the hour so a tight window stays honest.",
      },
      {
        q: "Is labor-only available in Celebration?",
        a: "Yes, for U-Haul, POD, and rental-truck loading or unloading by the hour.",
      },
    ],
    lat: 28.3253,
    lng: -81.5331,
  }),
  extraCity({
    slug: "poinciana-movers",
    name: "Poinciana",
    title: "Poinciana Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Poinciana, FL? Toro Movers handles HOA and Solivita-area moves with up-front hourly rates. Call (689) 600-2720.",
    h1: "Poinciana Movers for Osceola and Polk Local Moves",
    lede:
      "Toro Movers serves Poinciana and Solivita-area homes with full-service moving, labor-only help, and up-front hourly pricing.",
    about: {
      h2: "Local movers in Poinciana, FL",
      body: "Poinciana sits south of Kissimmee across Osceola and Polk, with gated 55+ communities, long internal drives, and HOA check-ins. Toro Movers plans those logistics for household moves and quotes the drive honestly by the hour.",
    },
    angle: {
      h2: "Built for Solivita gates and long community drives",
      body: "Poinciana and Solivita jobs often include guard gates, golf-cart streets, and a longer haul to Orlando. Toro books realistic arrival times and quotes hourly — no padded flat rate for the drive.",
    },
    neighborhoods: [
      "Solivita",
      "Poinciana Parkway",
      "Cypress Parkway",
      "Little Creek",
      "Osceola Polk line",
    ],
    faqs: [
      {
        q: "Do you move in Solivita?",
        a: "Yes. Share gate and HOA instructions when you book. We plan arrival windows and truck access before move day.",
      },
      {
        q: "How do you price a Poinciana to Orlando move?",
        a: "Up-front hourly rates. Drive time is on the clock, quoted honestly — no mystery mileage surcharge.",
      },
      {
        q: "Do you offer labor-only in Poinciana?",
        a: "Yes. Loading and unloading for U-Haul, POD, and rental trucks by the hour.",
      },
    ],
    lat: 28.1403,
    lng: -81.4584,
  }),
  extraCity({
    slug: "minneola-movers",
    name: "Minneola",
    title: "Minneola Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Minneola, FL? Toro Movers handles Lake County local moves and new-construction move-ins with up-front hourly rates. Call (689) 600-2720.",
    h1: "Minneola Movers for Lake County Local Moves",
    lede:
      "Toro Movers serves Minneola and the US-27 growth corridor with full-service, labor-only, and up-front hourly moving help.",
    about: {
      h2: "Local movers in Minneola, FL",
      body: "Minneola is growing fast along US-27 with new construction, hills, and HOA streets. Toro Movers coordinates builder and HOA timing for first-day move-ins and household moves in Minneola, Clermont, and nearby Lake County.",
    },
    angle: {
      h2: "Built for new construction and US-27 hills",
      body: "Minneola jobs often mean fresh floors, builder punch-list timing, and rolling terrain. Toro protects new interiors, books realistic drive time from Orlando, and quotes by the hour.",
    },
    neighborhoods: [
      "Downtown Minneola",
      "US-27",
      "Sugarloaf",
      "Grassy Lake",
      "Clermont border",
    ],
    faqs: [
      {
        q: "Do you handle new-construction move-ins in Minneola?",
        a: "Yes. Share builder and HOA windows. We protect new floors and paint and quote hourly.",
      },
      {
        q: "Can you move me from Minneola to Orlando?",
        a: "Yes. That drive is quoted honestly on the hourly clock — no surprise mileage fee.",
      },
      {
        q: "Is labor-only available in Minneola?",
        a: "Yes, for U-Haul, POD, and rental-truck loading or unloading.",
      },
    ],
    lat: 28.5744,
    lng: -81.7462,
  }),
  extraCity({
    slug: "mount-dora-movers",
    name: "Mount Dora",
    title: "Mount Dora Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Mount Dora, FL? Toro Movers handles historic downtown and hillside homes with up-front hourly rates. Call (689) 600-2720.",
    h1: "Mount Dora Movers for Historic and Lakeside Local Moves",
    lede:
      "Toro Movers serves Mount Dora with careful household moving — hillside streets, older homes, and up-front hourly pricing.",
    about: {
      h2: "Local movers in Mount Dora, FL",
      body: "Mount Dora’s historic downtown, hills, and lakefront streets need planned truck access. Toro Movers pads interiors, works tight lots, and quotes household and antique-heavy moves by the hour in Mount Dora and nearby Lake County.",
    },
    angle: {
      h2: "Built for hills, historic lots, and downtown access",
      body: "Mount Dora streets near downtown can be steep, narrow, and event-busy. Toro plans parking and carries ahead of time and moves furniture deliberately through older homes.",
    },
    neighborhoods: [
      "Historic Downtown",
      "Lakeside",
      "Donnelly",
      "Highland",
      "US-441",
      "Tavares border",
    ],
    faqs: [
      {
        q: "Can you move older Mount Dora homes?",
        a: "Yes. Tight staircases, hills, and limited parking are common. We plan access and protect floors and doorways.",
      },
      {
        q: "Do you move antiques and high-value pieces?",
        a: "We pad, wrap, and carry carefully. Specialty items should be listed when you book so the crew is prepared. We do not invent insurance coverage — ask us what valuation applies.",
      },
      {
        q: "How is a Mount Dora move priced?",
        a: `Up-front hourly rates. Call ${PHONE_DISPLAY} with addresses, stairs, and inventory.`,
      },
    ],
    lat: 28.8025,
    lng: -81.6445,
  }),
  extraCity({
    slug: "leesburg-movers",
    name: "Leesburg",
    title: "Leesburg Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Leesburg, FL? Toro Movers handles Lake County local moves with up-front hourly rates. Call (689) 600-2720.",
    h1: "Leesburg Movers for Lake County Local Moves",
    lede:
      "Toro Movers serves Leesburg with full-service household moving, labor-only loading, and up-front hourly pricing.",
    about: {
      h2: "Local movers in Leesburg, FL",
      body: "Leesburg sits on US-27/441 in Lake County, with lake neighborhoods, established homes, and regional hops toward Orlando. Toro Movers quotes the drive honestly and handles homes, apartments, and storage loads by the hour.",
    },
    angle: {
      h2: "Built for Lake County hops and lake-lot access",
      body: "Leesburg jobs often include longer Orlando-metro drives and lake-lot parking. Toro books realistic timing and bills by the hour — no mystery mileage surcharge.",
    },
    neighborhoods: [
      "Downtown Leesburg",
      "Venetian Gardens",
      "US-27",
      "US-441",
      "Lake Harris",
      "Tavares border",
    ],
    faqs: [
      {
        q: "Do you move from Leesburg to Orlando?",
        a: "Yes. Local Central Florida hops are quoted on the hourly clock with drive time included honestly.",
      },
      {
        q: "Do you offer labor-only in Leesburg?",
        a: "Yes. U-Haul, POD, and rental-truck loading and unloading by the hour.",
      },
      {
        q: "How do I get a Leesburg moving quote?",
        a: `Call or text ${PHONE_DISPLAY} with pickup, drop-off, access, and whether you need the truck or labor only.`,
      },
    ],
    lat: 28.8108,
    lng: -81.8779,
  }),
  extraCity({
    slug: "tavares-movers",
    name: "Tavares",
    title: "Tavares Movers | Local Moving Company | Toro Movers",
    description:
      "Need movers in Tavares, FL? Toro Movers handles Lake County waterfront and household moves with up-front hourly rates. Call (689) 600-2720.",
    h1: "Tavares Movers for Lake County Local Moves",
    lede:
      "Toro Movers serves Tavares with household, waterfront, and labor-only moving help — up-front hourly rates, local crew.",
    about: {
      h2: "Local movers in Tavares, FL",
      body: "Tavares is the Lake County seat, with waterfront streets, downtown lots, and hops to Mount Dora and Leesburg. Toro Movers plans truck access and quotes homes, apartments, and storage moves by the hour.",
    },
    angle: {
      h2: "Built for waterfront streets and county-seat access",
      body: "Tavares jobs can mean lake-road parking, downtown congestion, and a longer Orlando-metro drive. Toro plans those details and quotes hourly.",
    },
    neighborhoods: [
      "Downtown Tavares",
      "Wooton Park",
      "US-441",
      "Lake Dora",
      "Mount Dora border",
    ],
    faqs: [
      {
        q: "Do you move waterfront homes in Tavares?",
        a: "Yes. Share driveway, dock, and parking constraints when you book so we can plan the truck and carry.",
      },
      {
        q: "Can you move me from Tavares to Orlando?",
        a: "Yes. Drive time is on the hourly clock and quoted honestly.",
      },
      {
        q: "Is labor-only available in Tavares?",
        a: "Yes, for U-Haul, POD, and rental-truck loading or unloading.",
      },
    ],
    lat: 28.8042,
    lng: -81.7256,
  }),
];

const CENTRAL_FLORIDA: CityPageContent = {
  slug: "central-florida-movers",
  href: "/central-florida-movers",
  name: "Central Florida",
  badge: "Central Florida movers",
  metadata: {
    title: "Central Florida Movers | Orlando Metro Moving Company",
    description:
      "Local movers serving Orlando and Central Florida. Family-owned, bilingual, up-front hourly pricing for apartments, homes, and loading help.",
  },
  h1: "Central Florida Movers for Local Orlando-Metro Moves",
  lede:
    "Toro Movers is a family-owned Central Florida moving company — full-service, labor-only, and apartment moves with up-front hourly rates across the Orlando metro.",
  about: {
    h2: "Local movers across the Orlando metro",
    body: "Toro Movers serves Orlando and surrounding cities including Winter Park, Kissimmee, Lake Mary, Sanford, Altamonte Springs, Oviedo, Winter Garden, Clermont, and more. We focus on local Central Florida moves — not long-distance or interstate.",
  },
  sections: [
    {
      h2: "Cities we serve in Central Florida",
      body: "Dedicated local pages cover Orlando, Winter Park, Kissimmee, Lake Mary, Sanford, Altamonte Springs, Oviedo, Winter Garden, Clermont, Apopka, Windermere, Maitland, St. Cloud, Davenport, Fern Park, Lakeland, Winter Haven, and nearby west and Lake County cities.",
    },
    {
      h2: "Full-service and labor-only across the metro",
      body: "Need the truck and crew, or only loading help for a U-Haul or POD? Toro quotes both models with up-front hourly rates so you know the structure before move day.",
    },
    {
      h2: "Local crew, not a long-distance franchise",
      body: "Toro Movers stays on local Central Florida jobs. That keeps scheduling tighter and pricing on the clock instead of a long-haul flat rate.",
    },
    {
      h2: "Up-front hourly moving rates",
      body: "Most local moves are quoted by the hour. Crew size, access, stairs, elevators, and inventory drive the time. We explain the rate before the crew is booked.",
    },
  ],
  neighborhoods: [
    "Orlando",
    "Winter Park",
    "Kissimmee",
    "Lake Mary",
    "Sanford",
    "Winter Garden",
    "Clermont",
    "Oviedo",
    "Windermere",
    "Lakeland",
  ],
  why: {
    h2: "Why Central Florida customers choose Toro Movers",
    body: "Family-owned, bilingual English and Spanish, 5-star Google rated, and priced by the hour. You work with a local crew for apartments, homes, storage, and rental-truck labor across the metro.",
  },
  faqs: [
    {
      q: "What areas does Toro Movers serve?",
      a: "Orlando and the surrounding Central Florida metro — Winter Park, Maitland, Oviedo, Winter Garden, Kissimmee, Sanford, Apopka, Altamonte Springs, Lake Mary, Clermont, Davenport, St. Cloud, Windermere, and nearby cities.",
    },
    {
      q: "Do you do long-distance or out-of-state moves?",
      a: "No. Toro Movers focuses on local moves across the Orlando metro and Central Florida.",
    },
    {
      q: "How do you price a move?",
      a: "Up-front hourly pricing with crew size agreed before the day. You pay for the time the move takes.",
    },
    {
      q: "Do you have a bilingual crew?",
      a: "Yes — English and Spanish. We can quote, schedule, and run the move in either.",
    },
  ],
  services: cityServices("Central Florida"),
  closing: {
    title: "Request a Central Florida moving estimate",
    body: `Call or text ${PHONE_DISPLAY} with your cities, access, and whether you need full-service or labor-only help.`,
  },
  schema: { lat: 28.5384, lng: -81.3789 },
};

const fromEngineExceptOrlando = ENGINE_CITIES.filter((c) => c.slug !== "orlando-movers").map(
  fromEngine,
);

export const CITY_PAGES: Record<string, CityPageContent> = Object.fromEntries(
  [ORLANDO, ...fromEngineExceptOrlando, ...EXTRA_CITIES, CENTRAL_FLORIDA].map((c) => [c.slug, c]),
);

export function getCityPage(slug: string): CityPageContent | undefined {
  return CITY_PAGES[slug];
}

export function allCitySlugs(): string[] {
  return Object.keys(CITY_PAGES);
}

export function allCityPages(): CityPageContent[] {
  return Object.values(CITY_PAGES);
}

