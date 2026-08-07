// Homepage copy — mobile-first layout adapted for Toro Movers.
// SEO/AEO answer-first copy. Real business facts only (phone, rating, services, area).

/**
 * Primary nav — professional local-service IA.
 * Logo = Home. No “Resources→FAQ” primary item.
 * Anchors until dedicated hub pages ship (Services/About/Areas steps).
 */
export const nav = {
  links: [
    { label: "Services", href: "/services" },
    { label: "Areas", href: "/#areas" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "/#reviews" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  /** Principal conversion CTA — opens multi-step quote modal */
  cta: "Get a quote",
  ctaHref: "/contact",
  ctaPhoneLabel: "Call",
  /** Secondary path — contact page */
  ctaSecondary: "Contact",
  ctaSecondaryHref: "/contact",
} as const;

export const hero = {
  h1: "#1 Trusted Movers in\nOrlando & Central Florida",
  lede: "Toro Movers is your local Orlando & Central Florida moving company—full-service, labor-only loading, apartment moves, and up-front hourly rates.",
  cta: "discover toro movers",
  ctaHref: "#discover",
} as const;

/**
 * Post-hero proof band — SEO/AEO answer-first copy.
 * Targets: local Orlando movers, family-owned, bilingual, hourly rates.
 */
export const customerProof = {
  eyebrow: "Orlando movers customers trust",
  title: "Why Central Florida chooses Toro for local moves",
  lede: "Toro Movers is a family-owned local moving company in Orlando. Customers hire us for on-time crews, careful handling, bilingual English and Spanish communication, and up-front hourly rates across Central Florida.",
  ctaQuote: "Get a free quote",
  /** reverse=false → photo LEFT (band 1) */
  reverse: false,
  image: {
    src: "/images/proof-customer-closeup.webp",
    alt: "Toro Movers owner and a happy customer after a real local move in Central Florida",
    position: "object-[center_28%]",
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
  /** Small label for AEO section context */
  eyebrow?: string;
  title: string;
  body: string;
  image: ImageAsset;
  reverse: boolean;
  /** When true, mobile stacks text above image (matches VitaBand precise block). */
  mobileTextFirst?: boolean;
};

/**
 * Photo-band alternation (reverse = photo RIGHT), full homepage order:
 * 1 Proof L · 2 Services R · 3 Reviews L · 4 FAQ R · 5 Areas L
 * 6 comfort R · 7 precise L · 8 integrations R · 9 closing L
 */
export const features: FeatureBlock[] = [
  {
    id: "comfort",
    eyebrow: "Orlando move planning",
    title: "Plan your Orlando move before the first box",
    body: "A smooth Orlando move starts with logistics, not packing-day chaos. Toro Movers plans around apartment access, stairs, elevator windows, parking, storage units, and rental trucks—so you get a clear crew plan and up-front hourly rates before move day in Central Florida.",
    image: {
      src: "/images/proof-protect.webp",
      alt: "Toro Movers stretch-wrapping furniture for protection on a real Orlando local move",
      position: "object-[center_42%]",
    },
    reverse: true,
  },
  {
    id: "precise",
    eyebrow: "Careful local movers",
    title: "Careful furniture handling for apartments and homes",
    body: "Careful moving is more than strength. Toro Movers protects furniture, boxes, and fragile items through tight stairwells, doorways, floors, and truck space—whether you hire full-service movers or labor-only loading and unloading for your Orlando or Central Florida move.",
    image: {
      src: "/images/proof-apartment.webp",
      alt: "Wrapped furniture staged by Toro Movers during a real apartment move in Central Florida",
      position: "object-[center_32%]",
    },
    reverse: false,
  },
];

export const integrations = {
  eyebrow: "Building access & logistics",
  title: "Central Florida movers who plan around the building",
  body: "Toro Movers works around real apartment and HOA logistics across Central Florida: elevators, stairs, loading zones, storage access, and U-Haul or POD loading. Local crews help you plan the move around the building—not the other way around—with clear up-front hourly rates.",
  ctaCall: "Call now",
  ctaEstimate: "Get an estimate",
  reverse: true,
  image: {
    src: "/images/proof-loading.webp",
    alt: "Toro Movers crew carrying boxes on a real Central Florida apartment move",
    position: "object-[center_40%]",
  },
} as const;

/**
 * Why Toro — compact differentiators (SEO/AEO).
 * Avoid repeating services hub + proof section claims.
 */
export const whyToro = {
  eyebrow: "Why Toro Movers",
  title: "Local Orlando movers with clear rates and a local crew",
  lede: "Toro Movers is a family-owned moving company in Orlando. Hire a local crew for up-front hourly rates, bilingual English and Spanish service, and careful residential, townhome, and apartment moves across Central Florida.",
  items: [
    {
      title: "Family-owned, committed to every job",
      body: "You work with the people running the job—clear scheduling and accountability on every local move.",
      icon: "truck" as const,
    },
    {
      title: "Up-front hourly pricing",
      body: "Crew size, minimums, and the hourly model explained before move day—no vague ballpark games.",
      icon: "tag" as const,
    },
    {
      title: "Bilingual English & Spanish",
      body: "Access rules, placement, and timing stay clear when everyone understands the plan.",
      icon: "chat" as const,
    },
    {
      title: "Built for real access",
      body: "Stairs, elevators, loading zones, HOAs, and storage—planned around the building, not against it.",
      icon: "building" as const,
    },
  ],
  stats: [
    { value: "5★", label: "Google" },
    { value: "1,000+", label: "local moves" },
    { value: "EN · ES", label: "bilingual" },
    { value: "Orlando", label: "Central Florida" },
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
      body: "Local Orlando and Central Florida crew for metro hops, apartments, storage, and nearby cities.",
      icon: "map" as const,
    },
  ],
  cta: "Get a quote",
  ctaHref: "/contact",
} as const;

/**
 * Closing CTA band (city pages etc.) — quote-first conversion.
 * Never use “get a clear quote.” Homepage no longer embeds a callback section.
 */
export const closing = {
  eyebrow: "Book local movers",
  title: "Get your Orlando moving estimate",
  body: "Call or text (689) 600-2720—or get a free quote online. Share what you are moving, pickup and drop-off, and access details. We match crew size, explain up-front hourly rates, and help plan your Central Florida move.",
  ctaPhone: "Call",
  ctaQuote: "Get a quote",
  formCta: "Request callback",
  reverse: false,
  image: {
    src: "/images/moves/real-12.webp",
    alt: "Toro Movers crew on a real local Orlando and Central Florida move",
    position: "object-center",
  },
  secondaryRatingLabel: "Google rating · real local customers",
  secondaryAreaLabel: "Local crews · same-week when available",
  secondaryCta: "Get a quote",
  secondaryNote: "Free quote online",
} as const;

/**
 * Footer sitemap — professional local-service IA (crawlable + human findability).
 * Anchors until dedicated hub pages ship.
 */
export const footer = {
  privacy: "Privacy Policy",
  privacyHref: "/privacy",
  cookies: "Cookie Policy",
  cookiesHref: "/cookies",
  terms: "Terms of Service",
  termsHref: "/terms",
  columns: [
    {
      title: "Services",
      links: [
        { label: "All services", href: "/services" },
        { label: "Residential moving", href: "/residential-movers" },
        { label: "Labor-only moving", href: "/labor-only-moving" },
        { label: "Single item & delivery", href: "/loading-unloading" },
      ],
    },
    {
      title: "Areas",
      links: [
        { label: "Service areas", href: "/#areas" },
        { label: "Orlando movers", href: "/orlando-movers" },
        { label: "Winter Park", href: "/winter-park-movers" },
        { label: "Kissimmee", href: "/kissimmee-movers" },
        { label: "Clermont", href: "/clermont-movers" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Reviews", href: "/#reviews" },
        { label: "Blog", href: "/blog" },
        { label: "Gallery", href: "/orlando-movers-gallery" },
        { label: "Recent moves", href: "/recent-moves" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: "Contact page", href: "/contact" },
        { label: "Get a quote", href: "/contact" },
        { label: "Call us", href: "tel:+16896002720" },
        { label: "Email", href: "mailto:hello@toromovers.com" },
      ],
    },
  ],
} as const;

// AEO: answer-first FAQs for featured snippets / AI answers
// Visible FAQ text must match FAQ schema exactly (see schema.ts).
// Band 4: photo RIGHT (after reviews LEFT)
export const faq = {
  eyebrow: "FAQ",
  heading: "Common questions",
  sub: "Straight answers from a local Orlando moving company",
  image: {
    src: "/images/hero-crew-real.webp",
    alt: "Toro Movers crew on a real local Orlando moving job",
    position: "object-[center_30%]",
  },
  reverse: true,
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
      a: "Yes, Toro Movers is a family-owned local moving company serving Orlando and Central Florida. You work directly with our local crew, which helps keep communication, scheduling, and move-day expectations clear.",
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
      a: "To get a moving estimate from Toro Movers, call or text (689) 600-2720—or request a callback online for immediate service. Share what you are moving, pickup and drop-off locations, and access details (stairs, elevator, parking). We match crew size, explain up-front hourly rates, and help plan your Orlando or Central Florida move. Hours: Mon–Sat, 7:00 AM – 7:00 PM.",
    },
  ],
} as const;

// Ultra-short process strip (HowTo schema + conversion)
export const process = {
  heading: "Book in 3 steps",
  cta: "Get a free quote",
  steps: [
    { name: "Share details", text: "Date, addresses, home type" },
    { name: "Get the rate", text: "Up-front hourly pricing" },
    { name: "We move you", text: "Load, protect, place" },
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
  eyebrow: "Coverage",
  heading: "Service areas",
  lead: "Toro Movers serves Orlando and Central Florida with local moving help for homes, apartments, storage units, U-Haul loading, POD loading, and labor-only moves. Pick your city below—or call if you’re nearby.",
  reverse: false,
  image: {
    src: "/images/hero-orlando-skyline.webp",
    alt: "Orlando skyline — Toro Movers Central Florida service area",
    position: "object-[center_40%]",
  },
} as const;
