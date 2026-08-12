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
  /** 3 short proof points shown on the premium card. Keep each under ~34 chars. */
  points?: readonly string[];
  /** Overrides the default "View service" CTA when the link isn't a service page. */
  linkLabel?: string;
  /** Flat illustration shown instead of a photo on the homepage cards. */
  illustration?: "local" | "long-distance" | "labor-only";
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
      title: "Local moving",
      body: "Homes, townhomes and apartments across Central Florida — crew, truck, careful load and room-by-room placement.",
      href: "/full-service-moving",
      image: "/images/moves/svc-primary-residential.webp",
      imageAlt:
        "Toro Movers crew carrying a padded item on a real Central Florida home move",
      badge: "Local",
      illustration: "local",
      points: [
        "Truck and crew included",
        "Up-front hourly rate",
        "Same-week scheduling",
      ],
    },
    {
      title: "Long distance moving",
      body: "Moving beyond Central Florida? Tell us the route and dates and we will scope the crew, truck and timeline with you.",
      href: "/contact",
      linkLabel: "Ask about your route",
      image: "/images/moves/real-22.webp",
      imageAlt:
        "Toro Movers loading a box truck at the curb on a real Central Florida move",
      badge: "Long distance",
      illustration: "long-distance",
      points: [
        "Route planned with you",
        "Written scope before booking",
        "One crew, start to finish",
      ],
    },
    {
      title: "Labor only",
      body: "You have the U-Haul, POD or rental truck — we bring the crew and load or unload it by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.webp",
      imageAlt:
        "Toro Movers stretch-wrapping furniture on a real labor-only job",
      badge: "Labor only",
      illustration: "labor-only",
      points: [
        "Your truck, our crew",
        "Load, unload or both",
        "Tight, protected packs",
      ],
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
