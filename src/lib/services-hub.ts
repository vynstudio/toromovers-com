/**
 * Homepage services hub — 3 main service cards that fit the split content card:
 * Residential · Labor-only · Single item / delivery
 */

export type ServiceHubItem = {
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  badge?: string;
};

export const servicesHub = {
  eyebrow: "Moving services",
  heading: "Orlando movers for homes, labor-only & single-item delivery",
  lead: "Three clear ways to hire Toro Movers in Orlando and Central Florida—full home moves, labor-only loading, or single-item and delivery help with up-front hourly rates.",
  cta: "Get a quote",
  galleryCta: "See recent moves",
  galleryHref: "/orlando-movers-gallery",
  /** reverse=true → photo RIGHT (band 2 after proof LEFT) */
  reverse: true,
  image: {
    src: "/images/moves/svc-primary-residential.webp",
    alt: "Toro Movers residential crew on a real Orlando home move",
    position: "object-center",
  },

  /** Exactly 3 main services — fit inside white placeholder card */
  primary: [
    {
      title: "Residential moving service",
      body: "Homes, townhomes & apartments—crew, truck, careful load, and room-by-room placement.",
      href: "/residential-movers",
      image: "/images/moves/svc-primary-residential.webp",
      imageAlt:
        "Toro Movers crew carrying a padded item on a real residential home move",
      badge: "Homes",
    },
    {
      title: "Labor-only moving service",
      body: "You have the U-Haul, POD, or truck—we load and unload by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.webp",
      imageAlt:
        "Toro Movers stretch-wrapping furniture on a real labor-only job",
      badge: "Labor-only",
    },
    {
      title: "Single item & delivery service",
      body: "One heavy piece, furniture delivery, or store pickup—planned access and careful handling.",
      href: "/loading-unloading",
      image: "/images/moves/svc-loading.webp",
      imageAlt:
        "Toro Movers loading a large wrapped item for single-item delivery",
      badge: "Delivery",
    },
  ] satisfies ServiceHubItem[],

  /** Full menu kept for schema / future pages — not shown on homepage cards */
  secondary: [
    {
      title: "Full-service moving",
      body: "Truck, crew, load, transport, unload, and place—end to end.",
      href: "/full-service-moving",
      image: "/images/moves/svc-full-service.webp",
      imageAlt:
        "Toro Movers real job: furniture stretch-wrapped and padded for a full-service local move",
    },
    {
      title: "Apartment movers in Orlando",
      body: "Stairs, elevators, loading zones, and move-in windows planned before the crew arrives.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/real-21.webp",
      imageAlt:
        "Toro Movers crew carrying furniture up stairs on a real Orlando-area apartment move",
    },
    {
      title: "Commercial moving services",
      body: "Offices, retail, and small commercial spaces—after-hours when needed.",
      href: "/commercial-movers",
      image: "/images/moves/real-42.webp",
      imageAlt: "Toro Movers real commercial and office-style move work",
    },
  ] satisfies ServiceHubItem[],
} as const;

/** Homepage shows primary only (3 cards) */
export const servicesHubItems = servicesHub.primary;
