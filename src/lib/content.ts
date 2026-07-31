// Homepage copy — mobile-first layout adapted for Toro Movers.
// SEO/AEO answer-first copy. Real business facts only (phone, rating, services, area).

/** Primary nav — Title Case IA (v1 plain links; dropdowns later) */
export const nav = {
  links: [
    { label: "Home", href: "/" },
    { label: "About us", href: "/#why" },
    { label: "Moving services", href: "/#services" },
    { label: "Resources", href: "/#faq" },
    { label: "Gallery", href: "/orlando-movers-gallery" },
  ],
  cta: "Get a quote",
  ctaHref: "#quote",
  ctaPhoneLabel: "Call",
} as const;

export const hero = {
  h1: "#1 Trusted Movers in\nOrlando & Central Florida",
  lede: "Toro Movers is your local Orlando & Central Florida moving company—full-service, labor-only loading, apartment moves, and up-front hourly rates.",
  cta: "discover toro movers",
  ctaHref: "#discover",
} as const;

/** Standalone post-hero proof band — real customer photo + trust (mobile-first). */
export const customerProof = {
  eyebrow: "Real customers · Real local moves",
  title: "The smile after the move is the point",
  lede: "Family-owned Orlando movers who show up on time, protect your things, and leave you relieved—not stressed. 5★ Google rated with 1,000+ moves across Central Florida.",
  ctaQuote: "Get a free quote",
  image: {
    src: "/images/hero-lake-customer.jpg",
    alt: "Toro Movers owner with a happy customer by the lake after a local move in Central Florida",
  },
} as const;

/** src + alt + focal point for real job photos inside landscape/tall frames. */
export type ImageAsset = {
  src: string;
  alt: string;
  /** Tailwind object-position class, e.g. object-[center_30%] */
  position?: string;
};

export type FeatureBlock = {
  id: string;
  title: string;
  body: string;
  image: ImageAsset;
  reverse: boolean;
  /** When true, mobile stacks text above image (matches VitaBand precise block). */
  mobileTextFirst?: boolean;
};

export const features: FeatureBlock[] = [
  {
    id: "comfort",
    title: "So smooth, you won't feel buried by move day",
    body: "A good move starts before the first box is lifted. Toro Movers plans around the details that slow down Orlando moves: apartment access, stairs, elevator windows, parking, storage units, and rental trucks. You get a calm, clear plan with the right crew for the job.",
    image: {
      src: "/images/proof-protect.jpg",
      alt: "Furniture stretch-wrapped by Toro Movers on a real local job",
      position: "object-[center_42%]",
    },
    reverse: false,
  },
  {
    id: "precise",
    title: "Precise is nice",
    body: "Careful moving is not just about strength. Our crew loads furniture, boxes, and fragile items with attention to tight stairwells, doorways, floors, and truck space. Whether you need full-service movers or labor-only loading, the goal is simple: move efficiently without making a mess of your day.",
    image: {
      src: "/images/proof-apartment.jpg",
      alt: "Wrapped furniture staged during a real Toro Movers apartment move",
      position: "object-[center_32%]",
    },
    reverse: true,
    mobileTextFirst: true,
  },
];

export const integrations = {
  title: "Better living through local coordination",
  body: "Toro Movers works around the real logistics of Central Florida moves: apartment rules, HOA windows, elevators, stairs, loading zones, storage access, and U-Haul or POD loading. We help you plan the move around the building, not the other way around.",
  cta: "Know your move better",
  ctaHref: "#why",
  image: {
    src: "/images/proof-loading.jpg",
    alt: "Toro Movers crew carrying boxes on a real apartment move job",
    position: "object-[center_40%]",
  },
} as const;

/** Concrete differentiators — replaces full-bleed lifestyle banners */
export const whyToro = {
  title: "Local Orlando movers with clear rates and a real crew",
  lede: "Toro Movers is family-owned, locally operated, and built for Orlando and Central Florida moves. You get up-front hourly pricing, bilingual communication, and movers who understand apartments, stairs, elevators, storage units, and local access rules.",
  items: [
    {
      title: "Family-owned",
      body: "Toro Movers is a local family-owned moving company, not a national franchise hand-off. The goal is direct communication, practical scheduling, and a crew that treats your move like local reputation matters.",
      icon: "truck" as const,
    },
    {
      title: "Up-front hourly rates",
      body: "You get the hourly pricing model, crew size, minimums, and move details explained before the job starts. Toro Movers does not need invented dollar amounts or vague promises to make pricing feel clear.",
      icon: "tag" as const,
    },
    {
      title: "Bilingual crew",
      body: "Our English and Spanish-speaking team helps keep timing, placement, access instructions, and move-day questions clear. That matters when every elevator window, parking rule, and room label counts.",
      icon: "chat" as const,
    },
    {
      title: "Apartment specialists",
      body: "Apartment moves are one of Toro Movers' core strengths. We plan for stairs, elevators, tight hallways, parking limitations, loading zones, and move-in rules so the crew can work carefully and efficiently.",
      icon: "building" as const,
    },
  ],
  stats: [
    { value: "5★", label: "Google rating" },
    { value: "Local", label: "Central Florida movers" },
    { value: "EN · ES", label: "English and Spanish" },
    { value: "Family", label: "owned" },
  ],
  ctaPhone: "Call now",
  ctaQuote: "Get a free quote",
} as const;

export const featureGrid = {
  heading: "Moving services for Orlando homes, apartments, and rental trucks",
  items: [
    {
      title: "Full-Service Movers",
      body: "Orlando movers with truck and crew—loading, transport, unloading, and placement for homes, apartments, and storage across Central Florida.",
      icon: "truck" as const,
    },
    {
      title: "Labor-Only Movers",
      body: "U-Haul, POD, trailer, or rental truck? Labor-only loading and unloading by the hour—tight packs, protected items, no heavy lifting for you.",
      icon: "box" as const,
    },
    {
      title: "Apartment Movers Orlando",
      body: "Stairs, elevators, loading zones, and move-in windows handled carefully for walk-ups, condos, and high-rises in the Orlando area.",
      icon: "building" as const,
    },
    {
      title: "Up-Front Hourly Pricing",
      body: "Clear hourly rates, crew size, and minimums before move day—no vague estimates and no surprise pricing language.",
      icon: "tag" as const,
    },
    {
      title: "Bilingual Moving Crew",
      body: "English and Spanish-speaking crew so timing, placement, and building rules stay clear from quote to final box.",
      icon: "chat" as const,
    },
    {
      title: "Central Florida Coverage",
      body: "Local Orlando and Central Florida crew—not a franchise hand-off—for metro hops, apartments, storage, and nearby cities.",
      icon: "map" as const,
    },
  ],
  cta: "Get your quote",
  ctaHref: "#quote",
} as const;

export const closing = {
  title: "Get a clear moving quote before move day",
  body: "Tell Toro Movers what you are moving, where you are going, and what access looks like. We will help you choose the right crew, explain the up-front hourly rate, and make your Orlando or Central Florida move easier to plan.",
  cta: "start moving better",
  // Primary conversion: phone
  ctaHref: "tel:+16896002720",
} as const;

export const footer = {
  privacy: "Privacy Policy",
  privacyHref: "/privacy",
  cookies: "Cookie Policy",
  cookiesHref: "/cookies",
  terms: "Terms of Service",
  termsHref: "/terms",
} as const;

// AEO: answer-first FAQs for featured snippets / AI answers
// Visible FAQ text must match FAQ schema exactly (see schema.ts).
export const faq = {
  heading: "Common questions",
  sub: "Straight answers from a local Orlando moving company",
  items: [
    {
      q: "How much do movers cost in Orlando?",
      a: "Toro Movers quotes most Orlando moves with up-front hourly rates. The final cost depends on crew size, truck needs, stairs, elevators, distance, and how much you need moved. Call or text (689) 600-2720 with your move details and we will explain the hourly pricing model before move day.",
    },
    {
      q: "Do you offer labor-only loading and unloading?",
      a: "Yes, Toro Movers offers labor-only loading and unloading for U-Haul trucks, PODS, trailers, storage units, and rental trucks. You provide the vehicle or container, and our crew handles the heavy lifting, tight loading, unloading, and placement by the hour.",
    },
    {
      q: "Do you handle apartment moves in Orlando?",
      a: "Yes, Toro Movers handles apartment moves across Orlando and Central Florida. Apartment moves often involve stairs, elevators, loading zones, parking rules, tight hallways, and scheduled move-in windows, so we ask about access details before quoting the job.",
    },
    {
      q: "Is Toro Movers a local moving company?",
      a: "Yes, Toro Movers is a family-owned local moving company serving Orlando and Central Florida. You work with a local crew instead of a franchise hand-off, which helps keep communication, scheduling, and move-day expectations clear.",
    },
    {
      q: "Are your movers bilingual?",
      a: "Yes, Toro Movers has an English and Spanish-speaking crew. Bilingual communication helps customers explain timing, access instructions, fragile items, furniture placement, and building rules clearly from the first quote to the final box.",
    },
    {
      q: "What is the difference between full-service moving and labor-only moving?",
      a: "Full-service moving includes the crew, truck, loading, transportation, unloading, and placement. Labor-only moving is for customers who already have a U-Haul, POD, trailer, or rental truck and only need movers for loading, unloading, or rearranging heavy items.",
    },
    {
      q: "How do I get a moving quote from Toro Movers?",
      a: "To get a moving quote, call or text Toro Movers at (689) 600-2720. Share your move date, pickup and drop-off locations, home or apartment type, stairs or elevators, and whether you need full-service movers or labor-only help.",
    },
  ],
} as const;

// Visible process for HowTo schema + conversion clarity
export const process = {
  heading: "A simple moving plan before the crew arrives",
  steps: [
    {
      name: "Tell us about your move",
      text: "Share your move date, pickup and drop-off locations, home or apartment type, stairs, elevators, truck access, and whether you need full-service moving or labor-only help.",
    },
    {
      name: "Get an up-front hourly rate",
      text: "Toro Movers confirms the recommended crew size, truck needs, hourly pricing model, minimums, and scheduling availability before move day so you know what to expect.",
    },
    {
      name: "We load, move, and place",
      text: "Your bilingual local crew arrives ready to protect your items, handle the heavy lifting, load efficiently, and place furniture and boxes where they belong.",
    },
  ],
} as const;

export const trust = {
  rating: "5",
  ratingLabel: "Google rating",
  reviews: "36+",
  reviewsLabel: "reviews",
  moves: "1,000+",
  movesLabel: "local moves",
  area: "Central Florida",
  areaLabel: "service area",
} as const;

export const areasSnippet = {
  heading: "Service areas",
  lead: "Toro Movers serves Orlando and Central Florida with local moving help for homes, apartments, storage units, U-Haul loading, POD loading, and labor-only moves. Pick your city below—or call if you’re nearby.",
} as const;
