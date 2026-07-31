/**
 * Homepage services hub — S1 layout, menu aligned to Toro’s full service list
 * (residential, apartment, commercial, packing, loading, labor-only, full-service).
 * Real work photos only.
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
  heading: "Local moving services in Orlando & Central Florida",
  lead: "From residential and apartment moves to commercial, packing help, and loading only—Toro Movers offers full-service and labor-only options with up-front hourly rates. Pick a service below or call and we’ll match the right crew.",
  cta: "Get a free quote",
  galleryCta: "See recent moves",
  galleryHref: "/orlando-movers-gallery",

  /**
   * High-intent primary (most booked / highest search).
   * Matches the three ways customers usually start a quote.
   */
  primary: [
    {
      title: "Full-service moving",
      body: "Truck, crew, packing protection, loading, transport, unloading, and placement—door to door for local Orlando moves.",
      href: "/full-service-moving",
      image: "/images/moves/svc-full-service.jpg",
      imageAlt:
        "Toro Movers real job: furniture stretch-wrapped and padded for a full-service local move",
      badge: "Most booked",
    },
    {
      title: "Labor-only moving",
      body: "You bring the U-Haul, POD, or rental truck. We load, unload, and handle stairs by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.jpg",
      imageAlt:
        "Toro Movers crew member stretch-wrapping furniture on a real labor-only job",
      badge: "Hourly labor",
    },
    {
      title: "Apartment movers in Orlando",
      body: "Stairs, elevators, loading zones, and complex move-in windows—planned before the crew arrives.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/svc-apartment.jpg",
      imageAlt:
        "Toro Movers carrying boxes in an apartment hallway on a real Orlando-area move",
      badge: "Access planned",
    },
  ] satisfies ServiceHubItem[],

  /**
   * Full menu (DID-style categories) — compact secondary list.
   * Every item maps to a real Toro URL (or engine-proxied page).
   */
  secondary: [
    {
      title: "Residential moving services",
      body: "Houses, townhomes, and HOA communities across Central Florida.",
      href: "/residential-movers",
      image: "/images/moves/svc-residential.jpg",
      imageAlt:
        "Toro Movers handling a large residential item on a real Central Florida home job",
    },
    {
      title: "Commercial moving services",
      body: "Offices, retail, and small commercial spaces—after-hours when needed.",
      href: "/commercial-movers",
      image: "/images/moves/svc-commercial.jpg",
      imageAlt: "Toro Movers real commercial and office-style move work",
    },
    {
      title: "Packing & unpacking services",
      body: "Protection, wrap, and careful packing as part of a full-service move.",
      href: "/packing-services",
      image: "/images/moves/svc-full-service.jpg",
      imageAlt: "Furniture protection and packing on a real Toro Movers job",
    },
    {
      title: "Loading & unloading services",
      body: "Tight loads and careful unloads for trucks, PODS, and storage.",
      href: "/loading-unloading",
      image: "/images/moves/svc-loading.jpg",
      imageAlt: "Wrapped furniture staged during a real Toro Movers loading job",
    },
    {
      title: "Local Orlando movers",
      body: "Family-owned local movers for Orlando and nearby Central Florida cities.",
      href: "/orlando-movers",
      image: "/images/moves/svc-residential.jpg",
      imageAlt: "Local Orlando moving crew on a real Toro Movers job",
    },
    {
      title: "Business moving partnership",
      body: "Recurring office, suite, and partner moves with planned access and timing.",
      href: "/commercial-movers",
      image: "/images/moves/svc-commercial.jpg",
      imageAlt: "Commercial move coordination with Toro Movers",
    },
  ] satisfies ServiceHubItem[],
} as const;

export const servicesHubItems = [
  ...servicesHub.primary,
  ...servicesHub.secondary,
] as const;
