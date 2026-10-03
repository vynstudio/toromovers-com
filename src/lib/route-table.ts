import { blogPosts } from "./blog.ts";
import { allCitySlugs } from "./city-pages.ts";

/** Glob keys relative to src/lib/page-modules.ts */
export type RouteSpec = {
  /** URL path without leading slash. Homepage is "". */
  path: string;
  /** import.meta.glob key */
  key: string;
  props: Record<string, unknown>;
};

const STATIC: Array<[string, string]> = [
  ["", "../app/page.tsx"],
  ["about", "../app/about/page.tsx"],
  ["apartment-movers-orlando-fl", "../app/apartment-movers-orlando-fl/page.tsx"],
  ["blog", "../app/blog/page.tsx"],
  ["careers/ops-coordinator", "../app/careers/ops-coordinator/page.tsx"],
  ["contact", "../app/contact/page.tsx"],
  ["cookies", "../app/cookies/page.tsx"],
  ["full-service-moving", "../app/full-service-moving/page.tsx"],
  ["labor-only-moving", "../app/labor-only-moving/page.tsx"],
  ["loading-unloading", "../app/loading-unloading/page.tsx"],
  ["lp/local-movers", "../app/lp/local-movers/page.tsx"],
  ["move-day-checklist", "../app/move-day-checklist/page.tsx"],
  ["office-movers-orlando", "../app/office-movers-orlando/page.tsx"],
  ["orlando-movers", "../app/orlando-movers/page.tsx"],
  ["orlando-movers-gallery", "../app/orlando-movers-gallery/page.tsx"],
  ["packing-services-orlando", "../app/packing-services-orlando/page.tsx"],
  ["pod-loading-orlando", "../app/pod-loading-orlando/page.tsx"],
  ["privacy", "../app/privacy/page.tsx"],
  ["quotes", "../app/quotes/page.tsx"],
  ["same-day-movers-orlando", "../app/same-day-movers-orlando/page.tsx"],
  ["services", "../app/services/page.tsx"],
  ["small-moves-orlando", "../app/small-moves-orlando/page.tsx"],
  ["terms", "../app/terms/page.tsx"],
  ["thank-you", "../app/thank-you/page.tsx"],
  ["pay", "../app/pay/page.tsx"],
  ["pay/thanks", "../app/pay/thanks/page.tsx"],
];

export function contentRoutes(): RouteSpec[] {
  const routes: RouteSpec[] = STATIC.map(([path, key]) => ({
    path,
    key,
    props: {},
  }));

  for (const slug of blogPosts.map((post) => post.slug)) {
    routes.push({
      path: `blog/${slug}`,
      key: "../app/blog/[slug]/page.tsx",
      props: { slug },
    });
  }

  for (const slug of allCitySlugs()) {
    if (slug === "orlando-movers") continue;
    routes.push({
      path: slug,
      key: "../app/(cities)/[slug]/page.tsx",
      props: { slug },
    });
  }

  return routes;
}

export function routeFor(path: string): RouteSpec | undefined {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return contentRoutes().find((route) => route.path === normalized);
}

export function staticContentPaths(): string[] {
  return contentRoutes()
    .map((route) => route.path)
    .filter((path) => path !== "" && path !== "pay");
}
