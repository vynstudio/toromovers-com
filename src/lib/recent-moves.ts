/**
 * Recent Moves — organized like didmoving.com gallery SEO.
 *
 * Parameters (per image, DID-style):
 * - title: short job-style headline (lightbox / caption)
 * - description: longer citable SEO sentence
 * - service: category bucket
 * - area: city / metro
 * - src / alt: file + accessibility SEO
 *
 * Swap files in /public/images/moves/ anytime; keep ids stable.
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
  /** DID-style lightbox title */
  title: string;
  /** DID-style longer description (citation-ready) */
  description: string;
  service: MoveService;
  serviceLabel: string;
  area: string;
};

/** Homepage + gallery shared heading (DID: “Recent MOVES” / “See Us in Action”) */
export const recentMovesHeading = {
  eyebrow: "Recent moves",
  title: "See us in action",
  lead: "Orlando and Central Florida move work—apartment moves, home moves, packing, loading, and a bilingual local crew.",
  cta: "View full gallery",
  ctaHref: "/orlando-movers-gallery",
} as const;

/**
 * Service order for gallery filters / grouping (DID service silos, Toro labels).
 */
export const MOVE_SERVICE_ORDER: readonly {
  id: MoveService;
  label: string;
}[] = [
  { id: "apartment", label: "Apartment moves" },
  { id: "residential", label: "Residential / homes" },
  { id: "full-service", label: "Full-service" },
  { id: "labor-only", label: "Labor-only / loading" },
  { id: "packing", label: "Packing & protection" },
  { id: "crew", label: "Local crew" },
] as const;

/** Full gallery catalog */
export const recentMoves: readonly MoveShot[] = [
  {
    id: "orlando-apartment",
    src: "/images/moves/move-apartment-orlando.webp",
    alt: "Apartment furniture carefully handled during an Orlando apartment move with Toro Movers",
    title: "Apartment Moving — Orlando Local Movers",
    description:
      "Toro Movers handles apartment moves in Orlando with attention to stairs, elevators, loading zones, and tight move-in windows so floors, doors, and furniture stay protected.",
    service: "apartment",
    serviceLabel: "Apartment moving",
    area: "Orlando, FL",
  },
  {
    id: "orlando-crew",
    src: "/images/moves/move-orlando-crew.webp",
    alt: "Toro Movers local crew prepared for a residential move in Orlando",
    title: "Local Crew Ready — Orlando Movers",
    description:
      "Family-owned Orlando movers with a local bilingual crew—clear communication and up-front hourly rates for homes and apartments across Central Florida.",
    service: "crew",
    serviceLabel: "Local crew",
    area: "Orlando, FL",
  },
  {
    id: "home-move",
    src: "/images/moves/move-home-lake-mary.webp",
    alt: "Residential home move with Toro Movers in Central Florida",
    title: "Residential Home Move — Central Florida",
    description:
      "Home and residential moves across Central Florida with careful loading, placement, and a local crew that plans around access, parking, and household volume.",
    service: "residential",
    serviceLabel: "Residential moving",
    area: "Central Florida",
  },
  {
    id: "loading",
    src: "/images/moves/move-loading.webp",
    alt: "Toro Movers loading furniture and boxes for a local Central Florida move",
    title: "Loading Day — Full-Service & Labor-Only",
    description:
      "Loading and unloading for full-service truck moves or labor-only help with U-Haul, PODS, trailers, and rental trucks—packed tightly by the hour.",
    service: "labor-only",
    serviceLabel: "Labor-only / loading",
    area: "Central Florida",
  },
  {
    id: "team",
    src: "/images/moves/move-team.webp",
    alt: "Bilingual Toro Movers team on a local Orlando-area job",
    title: "Bilingual Moving Crew — Orlando Metro",
    description:
      "English and Spanish-speaking movers keep timing, furniture placement, and building rules clear from the first quote to the final box.",
    service: "crew",
    serviceLabel: "Local crew",
    area: "Orlando metro",
  },
  {
    id: "residential",
    src: "/images/moves/move-residential.webp",
    alt: "Furniture protected with pads during a Toro Movers full-service local move",
    title: "Furniture Protection — Full-Service Moving",
    description:
      "Full-service Orlando movers protect furniture with pads and careful carries so large pieces and household goods arrive ready for placement.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Central Florida",
  },
  {
    id: "packing",
    src: "/images/moves/move-packing.webp",
    alt: "Boxes packed and staged before an Orlando moving day with Toro Movers",
    title: "Packing Prep — Orlando Move Day",
    description:
      "Organized packing and staging before move day helps full-service and labor-only crews load faster and protect fragile items.",
    service: "packing",
    serviceLabel: "Packing & protection",
    area: "Orlando, FL",
  },
  {
    id: "boxes",
    src: "/images/moves/move-boxes.webp",
    alt: "Organized boxes ready for labor-only or full-service loading with Toro Movers",
    title: "Organized Load — Labor-Only & Full-Service",
    description:
      "Clear stacks and labeled loads support efficient hourly work—whether you need truck-and-crew full-service or labor-only loading.",
    service: "labor-only",
    serviceLabel: "Labor-only / loading",
    area: "Central Florida",
  },
  {
    id: "hero-crew",
    src: "/images/moves/move-hero-crew.webp",
    alt: "Toro Movers crew handling a residential move in Central Florida",
    title: "Move Day — Central Florida Local Movers",
    description:
      "Local Central Florida movers focused on careful handling, clear hourly pricing, and reliable crews for Orlando metro and nearby cities.",
    service: "full-service",
    serviceLabel: "Full-service moving",
    area: "Central Florida",
  },
  {
    id: "lake-mary-crew",
    src: "/images/moves/move-lake-mary-crew.webp",
    alt: "Toro Movers crew support for residential moves near Lake Mary and Orlando",
    title: "Residential Support — North Metro / Central Florida",
    description:
      "Local movers covering Orlando and nearby Central Florida communities with the same up-front hourly model and bilingual crew.",
    service: "residential",
    serviceLabel: "Residential moving",
    area: "Central Florida",
  },
] as const;

/** Homepage strip — first 6 (DID home gallery density) */
export const recentMovesHome = recentMoves.slice(0, 6);

/** Group shots by service for gallery page organization */
export function recentMovesByService(): {
  id: MoveService;
  label: string;
  items: MoveShot[];
}[] {
  return MOVE_SERVICE_ORDER.map((s) => ({
    id: s.id,
    label: s.label,
    items: recentMoves.filter((m) => m.service === s.id) as MoveShot[],
  })).filter((g) => g.items.length > 0);
}

/** Gallery page SEO (DID: Houston Movers Gallery | … Recent Work) */
export const recentMovesPageMeta = {
  title: "Orlando Movers Gallery | Recent Moves & Local Work",
  description:
    "Orlando movers gallery—see Toro Movers apartment moves, home moves, packing, and loading across Central Florida. Family-owned local crew.",
  /** DID-style city gallery slug */
  path: "/orlando-movers-gallery",
  h1: "Orlando movers gallery",
  sub: "Recent work across Orlando and Central Florida",
} as const;
