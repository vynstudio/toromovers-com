/**
 * Homepage services hub — DID strategy: all core services on home, each links out.
 * Images interlink to gallery work photos + service SEO pages (engine).
 */

export type ServiceHubItem = {
  title: string;
  body: string;
  href: string;
  /** Related gallery photo for visual proof */
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
      image: "/images/moves/work-01.jpg",
      imageAlt: "Toro Movers packing a truck on a full-service local move",
      icon: "truck" as const,
    },
    {
      title: "Labor-only movers",
      body: "U-Haul, POD, trailer, or rental truck—loading and unloading by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/work-04.jpg",
      imageAlt: "Labor-only loading help with Toro Movers",
      icon: "box" as const,
    },
    {
      title: "Apartment movers Orlando",
      body: "Stairs, elevators, loading zones, and tight move-in windows handled carefully.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/work-05.jpg",
      imageAlt: "Apartment move access with Toro Movers in Orlando",
      icon: "building" as const,
    },
    {
      title: "Residential movers",
      body: "Homes and townhomes across Central Florida with careful furniture handling.",
      href: "/residential-movers",
      image: "/images/moves/work-06.jpg",
      imageAlt: "Residential home move boxes staged for Toro Movers",
      icon: "home" as const,
    },
    {
      title: "Loading & unloading",
      body: "Tight truck packs and careful unloads for storage and short local hops.",
      href: "/loading-unloading",
      image: "/images/moves/work-09.jpg",
      imageAlt: "Truck loading by Toro Movers local crew",
      icon: "load" as const,
    },
    {
      title: "Commercial movers",
      body: "Small offices and suites with planned access and after-hours options when available.",
      href: "/commercial-movers",
      image: "/images/moves/work-01.jpg",
      imageAlt:
        "Toro Movers loading furniture tightly into a truck on a local commercial-style job",
      icon: "map" as const,
    },
  ] satisfies ServiceHubItem[],
} as const;
