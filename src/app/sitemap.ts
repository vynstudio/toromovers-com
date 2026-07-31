import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { CITY_QUEUE } from "@/lib/city-queue";

/**
 * Design-owned sitemap entries.
 * Note: production currently proxies /sitemap.xml to the engine (netlify.toml).
 * When design owns enough SEO URLs, stop that proxy and serve this file live.
 * Always keep live-design cities listed here so cutover is one-line.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/orlando-movers-gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${SITE_URL}/recent-moves`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const designCities: MetadataRoute.Sitemap = CITY_QUEUE.filter(
    (c) => c.status === "live-design",
  ).map((c) => ({
    url: `${SITE_URL}${c.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: c.slug === "orlando-movers" ? 0.95 : 0.85,
  }));

  return [...core, ...designCities];
}
