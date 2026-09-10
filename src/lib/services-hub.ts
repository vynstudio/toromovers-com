/**
 * Homepage services hub — 3 main service cards that fit the split content card:
 * Full-service local · Labor-only · Apartment movers
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
  illustration?: "local" | "long-distance" | "labor-only" | "access";
};

export const servicesHub = {
  eyebrow: "Moving services",
  heading: "Orlando movers for full-service, labor-only & apartments",
  lead: "Three clear ways to hire Toro Movers in Orlando—full-service local moving, labor-only loading, or apartment movers—with up-front hourly rates. Nearby Central Florida coverage is listed below.",
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

  /** Exactly 3 main services — homepage FeatureGrid + /services main */
  primary: [
    {
      title: "Full-service local",
      body: "Homes, townhomes and apartments in Orlando — crew, truck, careful load and room-by-room placement.",
      href: "/full-service-moving",
      image: "/images/moves/svc-primary-residential.webp",
      imageAlt:
        "Toro Movers crew carrying a padded item on a real Orlando home move",
      badge: "Local",
      illustration: "local",
      points: [
        "Truck and crew included",
        "Up-front hourly rate",
        "Same-week scheduling",
      ],
    },
    {
      title: "Labor-only",
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
    {
      title: "Apartment movers",
      body: "Stairs, elevators, loading zones, and move-in windows planned before the crew arrives.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/real-21.webp",
      imageAlt:
        "Toro Movers crew carrying furniture up stairs on a real Orlando-area apartment move",
      badge: "Apartments",
      illustration: "access",
      points: [
        "Stairs & elevators",
        "Loading zones planned",
        "Up-front hourly rate",
      ],
    },
  ] satisfies ServiceHubItem[],

  /** /services only — extra money URLs, not shown on homepage cards */
  secondary: [
    {
      title: "Loading & unloading",
      body: "Short loading jobs, single-item furniture moves, and truck unload help—quoted by the hour.",
      href: "/loading-unloading",
      image: "/images/moves/svc-loading.webp",
      imageAlt:
        "Toro Movers carefully handling furniture on a real Orlando loading job",
    },
    {
      title: "Recent moves",
      body: "Real Toro job photos from Orlando homes, apartments, and loading work.",
      href: "/orlando-movers-gallery",
      image: "/images/moves/real-23.webp",
      imageAlt: "Toro Movers crew on a real local Orlando moving job",
      linkLabel: "See recent moves",
    },
    {
      title: "Central Florida coverage",
      body: "Local crews for nearby Central Florida cities—see the region page for coverage and access notes.",
      href: "/central-florida-movers",
      image: "/images/hero-orlando-skyline.webp",
      imageAlt: "Orlando skyline — Toro Movers Central Florida service area",
      linkLabel: "View coverage",
    },
  ] satisfies ServiceHubItem[],
} as const;

/** Homepage shows primary only (3 cards) */
export const servicesHubItems = servicesHub.primary;
