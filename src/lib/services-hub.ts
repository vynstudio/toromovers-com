/**
 * Homepage services hub — S1: 3 primary + 3 secondary.
 * Real work photos only (no stock).
 */

export type ServiceHubItem = {
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Short badge on primary cards */
  badge?: string;
};

export const servicesHub = {
  eyebrow: "Moving services",
  heading: "Local moving services in Orlando & Central Florida",
  lead: "Toro Movers handles full-service moves, labor-only loading, and apartment moves with up-front hourly rates. Pick the service that fits your job—or call and we’ll help you choose.",
  cta: "Get a free quote",
  galleryCta: "See recent moves",
  galleryHref: "/orlando-movers-gallery",
  /** High-intent primary services */
  primary: [
    {
      title: "Full-service movers",
      body: "Crew, truck, load, transport, unload, and place—end to end for local Orlando and Central Florida moves.",
      href: "/full-service-moving",
      image: "/images/moves/svc-full-service.jpg",
      imageAlt:
        "Toro Movers real job: furniture stretch-wrapped and padded for a full-service local move",
      badge: "Most booked",
    },
    {
      title: "Labor-only movers",
      body: "You have the U-Haul, POD, trailer, or rental truck. We load and unload by the hour with careful packing.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.jpg",
      imageAlt:
        "Toro Movers crew member stretch-wrapping furniture on a real labor-only job",
      badge: "Hourly labor",
    },
    {
      title: "Apartment movers",
      body: "Stairs, elevators, loading zones, and tight move-in windows—planned before move day for Orlando apartments.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/svc-apartment.jpg",
      imageAlt:
        "Toro Movers carrying boxes in an apartment hallway on a real Orlando-area move",
      badge: "Access planned",
    },
  ] satisfies ServiceHubItem[],
  /** Supporting services — compact row */
  secondary: [
    {
      title: "Residential movers",
      body: "Homes and townhomes with careful furniture handling.",
      href: "/residential-movers",
      image: "/images/moves/svc-residential.jpg",
      imageAlt:
        "Toro Movers handling a large residential item on a real Central Florida home job",
    },
    {
      title: "Loading & unloading",
      body: "Tight truck packs and careful unloads for storage hops.",
      href: "/loading-unloading",
      image: "/images/moves/svc-loading.jpg",
      imageAlt: "Wrapped furniture staged during a real Toro Movers loading job",
    },
    {
      title: "Commercial movers",
      body: "Small offices and suites with planned access windows.",
      href: "/commercial-movers",
      image: "/images/moves/svc-commercial.jpg",
      imageAlt: "Toro Movers real commercial and office-style move work",
    },
  ] satisfies ServiceHubItem[],
} as const;

/** Flat list for any consumer that needs all items */
export const servicesHubItems = [
  ...servicesHub.primary,
  ...servicesHub.secondary,
] as const;
