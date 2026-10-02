import { sitemapXml } from "../lib/sitemap-xml";

export function GET() {
  return new Response(sitemapXml(), {
    headers: {
      "content-type": "application/xml; charset=utf-8",
    },
  });
}
