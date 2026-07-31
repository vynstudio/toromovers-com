/**
 * Homepage services hub — property-type focus first:
 * Residential · Townhome · Apartment (primary), then full menu.
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
  heading: "Residential, townhome & apartment movers in Orlando",
  lead: "Toro Movers specializes in residential homes, townhomes, and apartments across Orlando and Central Florida—plus full-service, labor-only, commercial, packing, and loading help with up-front hourly rates.",
  cta: "Get a free quote",
  galleryCta: "See recent moves",
  galleryHref: "/orlando-movers-gallery",

  /** Highlighted property-type services */
  primary: [
    {
      title: "Residential moving services",
      body: "Houses and single-family homes across Orlando and Central Florida—careful furniture handling, HOA access, and placement room by room.",
      href: "/residential-movers",
      image: "/images/moves/svc-residential.jpg",
      imageAlt:
        "Toro Movers handling a large residential item on a real Central Florida home job",
      badge: "Homes",
    },
    {
      title: "Townhome movers",
      body: "Multi-level townhomes with stairs, tight turns, garages, and shared driveways—planned so walls, floors, and railings stay protected.",
      href: "/residential-movers",
      image: "/images/moves/svc-loading.jpg",
      imageAlt:
        "Toro Movers loading furniture carefully on a real multi-level home job",
      badge: "Townhomes",
    },
    {
      title: "Apartment movers in Orlando",
      body: "Stairs, elevators, loading zones, and complex move-in windows—planned before the crew arrives for Orlando apartments and condos.",
      href: "/apartment-movers-orlando-fl",
      image: "/images/moves/svc-apartment.jpg",
      imageAlt:
        "Toro Movers carrying boxes in an apartment hallway on a real Orlando-area move",
      badge: "Apartments",
    },
  ] satisfies ServiceHubItem[],

  /** Rest of the service menu */
  secondary: [
    {
      title: "Full-service moving",
      body: "Truck, crew, load, transport, unload, and place—end to end.",
      href: "/full-service-moving",
      image: "/images/moves/svc-full-service.jpg",
      imageAlt:
        "Toro Movers real job: furniture stretch-wrapped and padded for a full-service local move",
    },
    {
      title: "Labor-only moving",
      body: "You have the U-Haul, POD, or truck—we load and unload by the hour.",
      href: "/labor-only-moving",
      image: "/images/moves/svc-labor.jpg",
      imageAlt:
        "Toro Movers crew member stretch-wrapping furniture on a real labor-only job",
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
      body: "Protection, wrap, and careful packing with a full-service move.",
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
      title: "Business moving partnership",
      body: "Recurring office and partner moves with planned access and timing.",
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
