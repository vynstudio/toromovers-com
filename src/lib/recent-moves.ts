/**
 * Recent Moves gallery — DID-style SEO proof section.
 * Replace src paths with real job photos as you add them.
 * Captions use service + area language (no invented dates/reviews).
 */

export type MoveShot = {
  id: string;
  src: string;
  alt: string;
  /** Short overlay / caption for SEO */
  title: string;
  /** Service type for filtering & AEO */
  service: string;
  /** City or region label */
  area: string;
};

export const recentMovesHeading = {
  eyebrow: "Recent moves",
  title: "See Toro Movers in action",
  lead: "Real local move work across Orlando and Central Florida—homes, apartments, packing, and careful loading by our bilingual crew.",
  cta: "View all photos",
  ctaHref: "/recent-moves",
} as const;

/** Full gallery (SEO page) */
export const recentMoves: readonly MoveShot[] = [
  {
    id: "orlando-apartment",
    src: "/images/moves/move-apartment-orlando.webp",
    alt: "Toro Movers handling an apartment move in Orlando with careful furniture protection",
    title: "Apartment move · Orlando",
    service: "Apartment moving",
    area: "Orlando, FL",
  },
  {
    id: "orlando-crew",
    src: "/images/moves/move-orlando-crew.webp",
    alt: "Toro Movers local crew ready for a residential move in Orlando",
    title: "Local crew · Orlando",
    service: "Full-service moving",
    area: "Orlando, FL",
  },
  {
    id: "home-move",
    src: "/images/moves/move-home-lake-mary.webp",
    alt: "Toro Movers residential home move in Central Florida",
    title: "Home move · Central Florida",
    service: "Residential moving",
    area: "Central Florida",
  },
  {
    id: "loading",
    src: "/images/moves/move-loading.webp",
    alt: "Toro Movers loading furniture and boxes for a local Central Florida move",
    title: "Loading day",
    service: "Full-service & labor-only",
    area: "Central Florida",
  },
  {
    id: "team",
    src: "/images/moves/move-team.webp",
    alt: "Toro Movers bilingual moving team on a local job",
    title: "Bilingual crew",
    service: "Local movers",
    area: "Orlando metro",
  },
  {
    id: "residential",
    src: "/images/moves/move-residential.webp",
    alt: "Residential furniture protected during a Toro Movers local move",
    title: "Furniture protection",
    service: "Full-service moving",
    area: "Central Florida",
  },
  {
    id: "packing",
    src: "/images/moves/move-packing.webp",
    alt: "Careful packing and box handling before an Orlando move with Toro Movers",
    title: "Packing prep",
    service: "Move day prep",
    area: "Orlando, FL",
  },
  {
    id: "boxes",
    src: "/images/moves/move-boxes.webp",
    alt: "Boxes organized for a labor-only or full-service move with Toro Movers",
    title: "Organized load",
    service: "Labor-only & full-service",
    area: "Central Florida",
  },
  {
    id: "hero-crew",
    src: "/images/moves/move-hero-crew.webp",
    alt: "Toro Movers crew handling a residential move in Central Florida",
    title: "Move day in Central Florida",
    service: "Full-service moving",
    area: "Central Florida",
  },
] as const;

/** Homepage strip — first 6 */
export const recentMovesHome = recentMoves.slice(0, 6);

export const recentMovesPageMeta = {
  title: "Recent Moves Gallery | Orlando & Central Florida Movers",
  description:
    "See recent Toro Movers work: Orlando apartment moves, home moves, packing, and careful loading across Central Florida. Family-owned local crew.",
  path: "/recent-moves",
} as const;
