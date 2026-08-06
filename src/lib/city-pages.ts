/**
 * City SEO landing content for design-site pages.
 * Same shell as homepage; unique copy per city.
 */

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
      a: "Yes, Toro Movers is a family-owned local moving company serving Orlando and Central Florida. You work with a local crew instead of a franchise hand-off, which helps keep communication, scheduling, and move-day expectations clear.",
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
      href: "/full-service-moving",
    },
    {
      title: "Labor-only movers",
      body: "U-Haul, POD, trailer, and rental truck loading and unloading by the hour.",
      href: "/labor-only-moving",
    },
    {
      title: "Apartment movers",
      body: "Stairs, elevators, loading zones, and tight move-in windows handled carefully.",
      href: "/apartment-movers-orlando-fl",
    },
  ],
  closing: {
    title: "Request an Orlando moving estimate before move day",
    body: "To get a moving estimate from Toro Movers in Orlando, call or text (689) 600-2720—or request a quote online. Share what you are moving, your Orlando addresses, and access details. We match crew size, explain up-front hourly rates, and help plan your local move.",
  },
  schema: { lat: 28.5384, lng: -81.3789 },
};
