/**
 * Recent Moves — real Toro job photos + DID-style SEO parameters.
 * title / description / service / area / href interlink to service pages.
 */

export type MoveService =
  | "full-service"
  | "apartment"
  | "residential"
  | "labor-only"
  | "packing"
  | "crew";

export type MoveShot = {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  service: MoveService;
  serviceLabel: string;
  area: string;
  /** Internal link for SEO (service or city page) */
  href: string;
};

export const recentMovesHeading = {
  eyebrow: "Recent moves",
  title: "See us in action",
  lead: "Real Toro Movers work across Orlando and Central Florida—loading, packing, residential homes, and careful full-service moves by our local crew.",
  cta: "View full gallery",
  ctaHref: "/orlando-movers-gallery",
} as const;

export const MOVE_SERVICE_ORDER: readonly {
  id: MoveService;
  label: string;
  href: string;
}[] = [
  { id: "full-service", label: "Full-service", href: "/full-service-moving" },
  { id: "apartment", label: "Apartment moves", href: "/apartment-movers-orlando-fl" },
  { id: "residential", label: "Residential / homes", href: "/residential-movers" },
  { id: "labor-only", label: "Labor-only / loading", href: "/labor-only-moving" },
  { id: "packing", label: "Packing & protection", href: "/full-service-moving" },
  { id: "crew", label: "Local crew", href: "/orlando-movers" },
] as const;

/** Primary catalog: real work photos first (Desktop/Toromovers job shots) */
export const recentMoves: readonly MoveShot[] = [
  {
    id: "work-01",
    src: "/images/moves/work-01.jpg",
    alt: "Toro Movers loading patio furniture tightly into a moving truck on a local Orlando area job",
    title: "Tight Truck Load — Local Full-Service Move",
    description:
      "Toro Movers packs outdoor furniture and household items tight on the truck so nothing shifts—full-service and labor-only loading across Orlando and Central Florida.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Orlando metro",
    href: "/full-service-moving",
  },
  {
    id: "work-06",
    src: "/images/moves/work-06.jpg",
    alt: "Labeled moving boxes staged on a Central Florida driveway for a residential home move with Toro Movers",
    title: "Residential Home Move — Central Florida",
    description:
      "Labeled boxes staged for a residential home move. Toro Movers handles house moves with clear hourly pricing and a local bilingual crew.",
    service: "residential",
    serviceLabel: "Residential moving",
    area: "Central Florida",
    href: "/residential-movers",
  },
  {
    id: "work-02",
    src: "/images/moves/work-02.jpg",
    alt: "Toro Movers crew working a local move job in Central Florida",
    title: "Local Crew On the Job",
    description:
      "Family-owned local movers—same crew style you meet on quote day, careful with furniture and access in Orlando apartments and homes.",
    service: "crew",
    serviceLabel: "Local crew",
    area: "Orlando, FL",
    href: "/orlando-movers",
  },
  {
    id: "work-03",
    src: "/images/moves/work-03.jpg",
    alt: "Furniture and items protected during a Toro Movers local move",
    title: "Furniture Protection — Full-Service",
    description:
      "Pads, wraps, and careful carries protect furniture on full-service Orlando moves so pieces arrive ready for placement.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Central Florida",
    href: "/full-service-moving",
  },
  {
    id: "work-04",
    src: "/images/moves/work-04.jpg",
    alt: "Loading and unloading work by Toro Movers labor-only or full-service crew",
    title: "Loading & Unloading — Labor-Only or Truck",
    description:
      "Labor-only loading for U-Haul, PODS, and rental trucks—or full-service truck and crew—quoted by the hour with clear minimums.",
    service: "labor-only",
    serviceLabel: "Labor-only / loading",
    area: "Central Florida",
    href: "/labor-only-moving",
  },
  {
    id: "work-05",
    src: "/images/moves/work-05.jpg",
    alt: "Apartment or condo move access work with Toro Movers in Orlando",
    title: "Apartment Access — Orlando Movers",
    description:
      "Apartment movers in Orlando plan for stairs, elevators, parking, and move-in windows so the crew works carefully in tight spaces.",
    service: "apartment",
    serviceLabel: "Apartment moving",
    area: "Orlando, FL",
    href: "/apartment-movers-orlando-fl",
  },
  {
    id: "work-07",
    src: "/images/moves/work-07.jpg",
    alt: "Toro Movers packing and staging boxes on move day",
    title: "Packing & Staging — Move Day Prep",
    description:
      "Organized packing and staging help the crew load faster and protect fragile items on local Central Florida moves.",
    service: "packing",
    serviceLabel: "Packing & protection",
    area: "Orlando metro",
    href: "/full-service-moving",
  },
  {
    id: "work-08",
    src: "/images/moves/work-08.jpg",
    alt: "Toro Movers handling household items on a residential move",
    title: "Careful Handling — Residential Move",
    description:
      "Residential movers for Central Florida homes—careful handling, clear communication, and up-front hourly rates.",
    service: "residential",
    serviceLabel: "Residential moving",
    area: "Central Florida",
    href: "/residential-movers",
  },
  {
    id: "work-09",
    src: "/images/moves/work-09.jpg",
    alt: "Toro Movers crew loading a truck for a local Orlando move",
    title: "Truck Loading — Orlando Local Movers",
    description:
      "Full-service truck loading by a local Orlando crew with bilingual English and Spanish support on the job.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Orlando, FL",
    href: "/full-service-moving",
  },
  {
    id: "work-10",
    src: "/images/moves/work-10.jpg",
    alt: "Protected furniture and appliances on a Toro Movers job",
    title: "Appliance & Furniture Protection",
    description:
      "Appliances and furniture wrapped and moved carefully—part of full-service and careful labor-only jobs across the metro.",
    service: "packing",
    serviceLabel: "Packing & protection",
    area: "Central Florida",
    href: "/full-service-moving",
  },
  {
    id: "work-11",
    src: "/images/moves/work-11.jpg",
    alt: "Toro Movers team on a Central Florida local moving job",
    title: "Bilingual Local Crew",
    description:
      "English and Spanish-speaking movers keep instructions clear from first call to final box on Orlando and Central Florida jobs.",
    service: "crew",
    serviceLabel: "Local crew",
    area: "Orlando metro",
    href: "/orlando-movers",
  },
  {
    id: "work-12",
    src: "/images/moves/work-12.jpg",
    alt: "Completed local move work with Toro Movers in Central Florida",
    title: "Local Move Complete — Central Florida",
    description:
      "Local movers for Orlando and nearby cities—homes, apartments, storage, and labor-only loading with honest hourly pricing.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Central Florida",
    href: "/orlando-movers",
  },
  {
    id: "fs-crew-truck",
    src: "/images/moves/fs-04-orlando-crew-truck.jpg",
    alt: "Toro Movers crew with truck for full-service Orlando moving",
    title: "Full-Service Crew & Truck — Orlando",
    description:
      "Full-service movers in Orlando bring the truck, crew, loading, transport, unloading, and placement with up-front hourly rates.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Orlando, FL",
    href: "/full-service-moving",
  },
  {
    id: "fs-wrap",
    src: "/images/moves/fs-02-wrap-protect.jpg",
    alt: "Furniture wrap and protection during a Toro Movers full-service job",
    title: "Wrap & Protect — Full-Service Moving",
    description:
      "Professional wrap and pad protection on full-service moves so sofas, mattresses, and fragile pieces stay safe in transit.",
    service: "packing",
    serviceLabel: "Packing & protection",
    area: "Central Florida",
    href: "/full-service-moving",
  },
] as const;

export const recentMovesHome = recentMoves.slice(0, 6);

export function recentMovesByService(): {
  id: MoveService;
  label: string;
  href: string;
  items: MoveShot[];
}[] {
  return MOVE_SERVICE_ORDER.map((s) => ({
    id: s.id,
    label: s.label,
    href: s.href,
    items: recentMoves.filter((m) => m.service === s.id) as MoveShot[],
  })).filter((g) => g.items.length > 0);
}

export const recentMovesPageMeta = {
  title: "Orlando Movers Gallery | Recent Moves & Local Work",
  description:
    "Real Toro Movers photos: Orlando apartment moves, home moves, packing, and truck loading across Central Florida. Family-owned local crew.",
  path: "/orlando-movers-gallery",
  h1: "Orlando movers gallery",
  sub: "Recent work from real local jobs",
} as const;
