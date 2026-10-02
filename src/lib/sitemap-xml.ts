import { CAREERS_OPS_COORDINATOR_PATH, SITE_URL } from "./site.ts";
import { allCityPages } from "./city-pages.ts";
import { blogPosts } from "./blog.ts";
import { serviceGuides } from "./service-guides.ts";

/** Live production sitemap build time. Keeps lastmod identical to toromovers.com. */
export const SITEMAP_BUILD_LASTMOD = "2026-09-29T12:38:55.658Z";

type Entry = {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
};

function entry(
  path: string,
  changefreq: string,
  priority: string,
  lastmod = SITEMAP_BUILD_LASTMOD,
): Entry {
  const loc = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  return { loc, lastmod, changefreq, priority };
}

export function sitemapEntries(): Entry[] {
  const core: Entry[] = [
    entry("/", "weekly", "1"),
    entry("/orlando-movers-gallery", "weekly", "0.75"),
    entry("/blog", "weekly", "0.8"),
    entry("/quotes", "weekly", "0.95"),
    entry("/contact", "monthly", "0.9"),
    entry("/services", "monthly", "0.9"),
    entry("/labor-only-moving", "monthly", "0.9"),
    entry("/apartment-movers-orlando-fl", "monthly", "0.9"),
    entry("/full-service-moving", "monthly", "0.9"),
    entry("/loading-unloading", "monthly", "0.85"),
    ...serviceGuides.map((page) => entry(page.path, "monthly", "0.9")),
    entry("/about", "monthly", "0.75"),
    entry(CAREERS_OPS_COORDINATOR_PATH, "weekly", "0.6"),
    entry("/privacy", "yearly", "0.2"),
    entry("/cookies", "yearly", "0.2"),
    entry("/terms", "yearly", "0.2"),
  ];

  const blogs: Entry[] = blogPosts.map((post) =>
    entry(
      `/blog/${post.slug}`,
      "monthly",
      "0.7",
      `${post.date}T00:00:00.000Z`,
    ),
  );

  const cities: Entry[] = allCityPages().map((city) =>
    entry(
      city.href,
      "monthly",
      city.slug === "orlando-movers" || city.slug === "central-florida-movers"
        ? "0.95"
        : "0.85",
    ),
  );

  return [...core, ...blogs, ...cities];
}

export function sitemapXml(): string {
  const urls = sitemapEntries()
    .map(
      (item) =>
        `<url>\n<loc>${item.loc}</loc>\n<lastmod>${item.lastmod}</lastmod>\n<changefreq>${item.changefreq}</changefreq>\n<priority>${item.priority}</priority>\n</url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
