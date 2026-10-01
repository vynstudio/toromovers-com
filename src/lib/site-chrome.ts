/**
 * Shared nav and footer data for the homepage preview.
 * Reuse these on later pages. City-page phone numbers stay in site.ts.
 */

import { blogHref, blogPosts } from "./blog.ts";
import { serviceCityPages } from "./city-pages.ts";
import { QUOTE_PATH } from "./site.ts";

/** Toll-free line for the homepage and the shared nav. Calls only. */
export const HOME_PHONE_DISPLAY = "888-503-1756";
export const HOME_PHONE_TEL = "tel:+18885031756";
export const HOME_PHONE_E164 = "+18885031756";

/**
 * No dedicated nationwide page exists in this repo.
 * The long-distance guide is the existing page that explains interstate moves.
 */
export const NATIONWIDE_HREF = "/blog/orlando-local-vs-long-distance-movers";

export const NAV_QUOTE_HREF = QUOTE_PATH;

export type ChromeLink = { label: string; href: string };

export const SERVICE_LINKS: readonly ChromeLink[] = [
  { label: "Full-service moving", href: "/full-service-moving" },
  { label: "Labor-only moving", href: "/labor-only-moving" },
  { label: "Apartment movers", href: "/apartment-movers-orlando-fl" },
  { label: "Packing", href: "/packing-services-orlando" },
  { label: "Office movers", href: "/office-movers-orlando" },
  { label: "POD & U-Haul loading", href: "/pod-loading-orlando" },
];

/** Orlando first, then the other city pages. The regional hub is not a city. */
export function chromeCities(): ChromeLink[] {
  return serviceCityPages()
    .slice()
    .sort((a, b) => {
      if (a.slug === "orlando-movers") return -1;
      if (b.slug === "orlando-movers") return 1;
      return a.name.localeCompare(b.name);
    })
    .map((city) => ({ label: city.name, href: city.href }));
}

export function chromeGuides(limit = 4): ChromeLink[] {
  return [...blogPosts]
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title))
    .slice(0, limit)
    .map((post) => ({ label: post.title, href: blogHref(post.slug) }));
}

export const GUIDE_COUNT = blogPosts.length;
