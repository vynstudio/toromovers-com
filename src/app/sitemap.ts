import { sitemapXml } from "../lib/sitemap-xml.ts";

/** Design-owned sitemap. Served by the Astro route at /sitemap.xml. */
export function buildSitemap(): string {
  return sitemapXml();
}
