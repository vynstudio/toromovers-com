/**
 * Homepage services hub — DID strategy, REAL work photos only (no stock).
 */

export type ServiceHubItem = {
  title: string;
  body: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: "truck" | "box" | "building" | "tag" | "chat" | "map" | "home" | "load";
};

export const servicesHub = {
  eyebrow: "Services",
  heading: "Professional local moving in Orlando & Central Florida",
  lead: "Full-service, labor-only, apartment, residential, loading, and commercial moves—clear hourly rates, bilingual crew, local coverage.",
  cta: "Get your free quote",
  galleryCta: "See recent moves",
  galleryHref: "/orlando-movers-gallery",
  items: [
    {
      title: "Full-service movers",
      body: "Truck, crew, loading, transport, unloading, and placement—end to end.",
      href: "/full-service-moving",
      image: "/images/moves/svc-full-service.jpg",
      imageAlt:
        "Toro Movers real job: furniture stretch-wrapped and padded for a full-service local move",
      icon: "truck" as const,
    },
    {
      title: "Labor-only movers",
      body: "U-Haul, POD, trailer, or rental truck—loading and unloading by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.jpg",
      imageAlt:
        "Toro Movers crew member stretch-wrapping furniture on a real labor-only job",
      icon: "box" as const,
    },
    {
      title: "Apartment movers Orlando",
      body: "Stairs, elevators, loading zones, and tight move-in windows handled carefully.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/svc-apartment.jpg",
      imageAlt:
        "Toro Movers carrying boxes in an apartment hallway on a real Orlando-area move",
      icon: "building" as const,
    },
    {
      title: "Residential movers",
      body: "Homes and townhomes across Central Florida with careful furniture handling.",
      href: "/residential-movers",
      image: "/images/moves/svc-residential.jpg",
      imageAlt:
        "Toro Movers handling a large residential item on a real Central Florida home job",
      icon: "home" as const,
    },
    {
      title: "Loading & unloading",
      body: "Tight truck packs and careful unloads for storage and short local hops.",
      href: "/loading-unloading",
      image: "/images/moves/svc-loading.jpg",
      imageAlt:
        "Wrapped furniture staged during a real Toro Movers loading job",
      icon: "load" as const,
    },
    {
      title: "Commercial movers",
      body: "Small offices and suites with planned access and after-hours options when available.",
      href: "/commercial-movers",
      image: "/images/moves/svc-commercial.jpg",
      imageAlt: "Toro Movers real commercial and office-style move work",
      icon: "map" as const,
    },
  ] satisfies ServiceHubItem[],
} as const;
