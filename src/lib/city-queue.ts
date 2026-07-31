/**
 * City conversion queue — source of truth for the 25-city SEO rollout.
 * Status:
 *   - live-design  → served by toromovers-com (new shell)
 *   - engine       → proxied to live-toro-site
 *   - planned      → not live yet; create design page when queued
 *   - blocked      → waiting on Phase 0 template lock
 */

export type CityQueueStatus =
  | "live-design"
  | "engine"
  | "planned"
  | "blocked";

export type CityQueueItem = {
  /** Public path without domain, e.g. /winter-park-movers */
  href: string;
  slug: string;
  name: string;
  /** Conversion order (1 = Orlando template) */
  order: number;
  phase: "template" | "A" | "B";
  status: CityQueueStatus;
  lat: number;
  lng: number;
  notes?: string;
};

/**
 * Ordered queue. Convert one URL at a time after Phase 0 sign-off.
 * Target: 25 dedicated city pages (orders 1–25).
 */
export const CITY_QUEUE: readonly CityQueueItem[] = [
  // --- Phase 0 / template ---
  {
    order: 1,
    phase: "template",
    href: "/orlando-movers",
    slug: "orlando-movers",
    name: "Orlando",
    status: "live-design",
    lat: 28.5384,
    lng: -81.3789,
    notes: "Principal city template — match homepage shell",
  },

  // --- Phase A: existing engine cities ---
  {
    order: 2,
    phase: "A",
    href: "/winter-park-movers",
    slug: "winter-park-movers",
    name: "Winter Park",
    status: "engine",
    lat: 28.5999,
    lng: -81.3392,
    notes: "Next convert after Phase 0",
  },
  {
    order: 3,
    phase: "A",
    href: "/kissimmee-movers",
    slug: "kissimmee-movers",
    name: "Kissimmee",
    status: "engine",
    lat: 28.292,
    lng: -81.4076,
  },
  {
    order: 4,
    phase: "A",
    href: "/lake-mary-movers",
    slug: "lake-mary-movers",
    name: "Lake Mary",
    status: "engine",
    lat: 28.7589,
    lng: -81.3178,
  },
  {
    order: 5,
    phase: "A",
    href: "/sanford-movers",
    slug: "sanford-movers",
    name: "Sanford",
    status: "engine",
    lat: 28.8117,
    lng: -81.2731,
  },
  {
    order: 6,
    phase: "A",
    href: "/altamonte-springs-movers",
    slug: "altamonte-springs-movers",
    name: "Altamonte Springs",
    status: "engine",
    lat: 28.6611,
    lng: -81.3656,
  },
  {
    order: 7,
    phase: "A",
    href: "/oviedo-movers",
    slug: "oviedo-movers",
    name: "Oviedo",
    status: "engine",
    lat: 28.67,
    lng: -81.2081,
  },
  {
    order: 8,
    phase: "A",
    href: "/winter-garden-movers",
    slug: "winter-garden-movers",
    name: "Winter Garden",
    status: "engine",
    lat: 28.5653,
    lng: -81.5862,
  },
  {
    order: 9,
    phase: "A",
    href: "/clermont-movers",
    slug: "clermont-movers",
    name: "Clermont",
    status: "engine",
    lat: 28.5494,
    lng: -81.7729,
  },
  {
    order: 10,
    phase: "A",
    href: "/apopka-movers",
    slug: "apopka-movers",
    name: "Apopka",
    status: "engine",
    lat: 28.6776,
    lng: -81.5106,
  },
  {
    order: 11,
    phase: "A",
    href: "/windermere-movers",
    slug: "windermere-movers",
    name: "Windermere",
    status: "engine",
    lat: 28.4955,
    lng: -81.5348,
  },
  {
    order: 12,
    phase: "A",
    href: "/maitland-movers",
    slug: "maitland-movers",
    name: "Maitland",
    status: "engine",
    lat: 28.6276,
    lng: -81.3631,
  },
  {
    order: 13,
    phase: "A",
    href: "/st-cloud-movers",
    slug: "st-cloud-movers",
    name: "St. Cloud",
    status: "engine",
    lat: 28.2489,
    lng: -81.2812,
  },
  {
    order: 14,
    phase: "A",
    href: "/davenport-movers",
    slug: "davenport-movers",
    name: "Davenport",
    status: "engine",
    lat: 28.1614,
    lng: -81.6015,
  },
  {
    order: 15,
    phase: "A",
    href: "/fern-park-movers",
    slug: "fern-park-movers",
    name: "Fern Park",
    status: "engine",
    lat: 28.6492,
    lng: -81.3409,
  },
  {
    order: 16,
    phase: "A",
    href: "/lakeland-movers",
    slug: "lakeland-movers",
    name: "Lakeland",
    status: "engine",
    lat: 28.0395,
    lng: -81.9498,
  },
  {
    order: 17,
    phase: "A",
    href: "/winter-haven-movers",
    slug: "winter-haven-movers",
    name: "Winter Haven",
    status: "engine",
    lat: 28.0222,
    lng: -81.7329,
  },

  // --- Phase B: new cities to reach 25 ---
  {
    order: 18,
    phase: "B",
    href: "/ocoee-movers",
    slug: "ocoee-movers",
    name: "Ocoee",
    status: "planned",
    lat: 28.5692,
    lng: -81.544,
  },
  {
    order: 19,
    phase: "B",
    href: "/longwood-movers",
    slug: "longwood-movers",
    name: "Longwood",
    status: "planned",
    lat: 28.703,
    lng: -81.3384,
  },
  {
    order: 20,
    phase: "B",
    href: "/casselberry-movers",
    slug: "casselberry-movers",
    name: "Casselberry",
    status: "planned",
    lat: 28.6778,
    lng: -81.3278,
  },
  {
    order: 21,
    phase: "B",
    href: "/celebration-movers",
    slug: "celebration-movers",
    name: "Celebration",
    status: "planned",
    lat: 28.3253,
    lng: -81.5331,
  },
  {
    order: 22,
    phase: "B",
    href: "/poinciana-movers",
    slug: "poinciana-movers",
    name: "Poinciana",
    status: "planned",
    lat: 28.1403,
    lng: -81.4584,
  },
  {
    order: 23,
    phase: "B",
    href: "/minneola-movers",
    slug: "minneola-movers",
    name: "Minneola",
    status: "planned",
    lat: 28.5744,
    lng: -81.7462,
  },
  {
    order: 24,
    phase: "B",
    href: "/mount-dora-movers",
    slug: "mount-dora-movers",
    name: "Mount Dora",
    status: "planned",
    lat: 28.8025,
    lng: -81.6445,
  },
  {
    order: 25,
    phase: "B",
    href: "/leesburg-movers",
    slug: "leesburg-movers",
    name: "Leesburg",
    status: "planned",
    lat: 28.8108,
    lng: -81.8779,
  },
  // Buffer
  {
    order: 26,
    phase: "B",
    href: "/tavares-movers",
    slug: "tavares-movers",
    name: "Tavares",
    status: "planned",
    lat: 28.8042,
    lng: -81.7256,
    notes: "Buffer beyond 25",
  },
] as const;

export function citiesByStatus(status: CityQueueStatus): CityQueueItem[] {
  return CITY_QUEUE.filter((c) => c.status === status);
}

export function nextCityToConvert(): CityQueueItem | undefined {
  return CITY_QUEUE.find(
    (c) => c.status === "engine" || c.status === "planned",
  );
}

export function cityQueueStats() {
  const totalTarget = 25;
  const live = citiesByStatus("live-design").length;
  return {
    target: totalTarget,
    liveDesign: live,
    remaining: Math.max(0, totalTarget - live),
    next: nextCityToConvert()?.href ?? null,
  };
}
