// Homepage copy — English, VitaBand-layout sections adapted for Toro Movers.

export const nav = {
  links: [
    { label: "discover", href: "#discover" },
    { label: "why toro", href: "#why" },
    { label: "how it works", href: "#how-it-works" },
  ],
  cta: "get a quote",
  ctaHref: "#quote",
} as const;

export const hero = {
  h1: "Your Move,\nSimplified",
  lede: "Stay in control with Toro Movers, the Central Florida crew that handles packing, loading, and careful placement—all on your schedule.",
  cta: "discover toro movers",
  ctaHref: "#discover",
  image: {
    src: "/images/hero-truck.jpg",
    alt: "Professional moving truck ready for a local Central Florida move",
  },
} as const;

export const features = [
  {
    id: "comfort",
    title: "So smooth, you won't even feel the stress",
    body: "Designed for real life, Toro fits effortlessly into your day—whether you're packing a studio, emptying a family home, or winding down a lease. Care and efficiency, perfectly balanced.",
    image: {
      src: "/images/check-watch.webp",
      alt: "Happy customer checking the time on moving day",
    },
    reverse: false,
  },
  {
    id: "precise",
    title: "Precise is nice",
    body: "Our trained crew and proven process ensure you get careful handling with unparalleled attention. Whether it's furniture, fragile boxes, or tight stairwells, Toro delivers reliable moves you can trust—helping you start fresh, every time.",
    image: {
      src: "/images/move-boxes.jpg",
      alt: "Carefully packed and stacked moving boxes",
    },
    reverse: true,
  },
] as const;

export const integrations = {
  title: "Better living through coordination",
  body: "Toro Movers works seamlessly with your timeline, building access, and local logistics—giving you a complete picture of your move in one place. From stairs and elevators to HOA windows, we integrate smoothly so you can focus on the new chapter without missing a beat.",
  cta: "know your move better",
  ctaHref: "#why",
  image: {
    src: "/images/woman-home.jpg",
    alt: "Homeowner planning a smooth local move",
  },
} as const;

export const whyBanner = {
  title: "Why Toro Movers",
  image: {
    src: "/images/forest-smile.jpg",
    alt: "Confident smile outdoors after a stress-free move",
  },
} as const;

export const featureGrid = {
  items: [
    {
      title: "Full-Service Moves",
      body: "Truck, crew, loading, transport, and careful placement—end to end.",
      icon: "truck" as const,
    },
    {
      title: "Labor-Only Help",
      body: "Already have a U-Haul or POD? We load tight and unload fast.",
      icon: "box" as const,
    },
    {
      title: "Apartment Specialists",
      body: "Stairs, elevators, and tight complex windows handled with care.",
      icon: "building" as const,
    },
    {
      title: "Up-Front Pricing",
      body: "Honest hourly rates quoted clearly—no surprise fees on move day.",
      icon: "tag" as const,
    },
    {
      title: "Bilingual Crew",
      body: "English & Spanish-speaking team for clear communication every step.",
      icon: "chat" as const,
    },
    {
      title: "Local Coverage",
      body: "Orlando metro & Central Florida—same-week scheduling when available.",
      icon: "map" as const,
    },
  ],
  cta: "know yourself better",
  ctaHref: "#quote",
} as const;

export const designedForLife = {
  title: "Designed for life",
  body: "Sleek process, lightweight stress, and comfortable communication 24/7 planning—Toro is built to blend seamlessly into your lifestyle—whether you're hitting a new apartment, the office, or a family home.",
  image: {
    src: "/images/team.webp",
    alt: "Toro Movers crew ready for the day",
  },
} as const;

export const splitStories = [
  {
    title: "Care Meets Simplicity",
    body: "Our process is refined with real move experience, ensuring the plan you receive is both accurate and actionable—empowering you to make better choices every move day.",
    image: {
      src: "/images/team-huddle.jpg",
      alt: "Team coordinating a careful local move plan",
    },
  },
  {
    title: "See Your Day, Your Way",
    body: "No more guessing games. Toro gives you clear timing and real-time communication so you stay calm, stay on schedule, and settle into your new space with energy to spare.",
    image: {
      src: "/images/coastal.jpg",
      alt: "Peaceful Florida coastal morning after settling in",
    },
  },
] as const;

export const testimonial = {
  name: "Stael G.",
  quote:
    "Great experience! The team was on time, professional, and handled everything with care. Very easy to work with and made my move stress-free—I highly recommend!",
} as const;

export const closing = {
  title: "Take Control of Your\nMove Today",
  body: "Join neighbors across Central Florida who transformed their moving day with Toro. Get a clear quote and start living your next chapter—one careful step at a time.",
  cta: "start moving better",
  ctaHref: "#quote",
} as const;

export const footer = {
  privacy: "Privacy Policy",
  privacyHref: "/privacy",
  terms: "Terms of Service",
  termsHref: "/terms",
} as const;
