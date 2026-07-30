import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { LeadModal } from "@/components/LeadModal";
import { CookieBanner } from "@/components/CookieBanner";
import { RecentMoves } from "@/components/RecentMoves";
import { ClosingCta } from "@/components/ClosingCta";
import {
  recentMoves,
  recentMovesPageMeta,
} from "@/lib/recent-moves";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: recentMovesPageMeta.title },
  description: recentMovesPageMeta.description,
  alternates: { canonical: recentMovesPageMeta.path },
  openGraph: {
    title: recentMovesPageMeta.title,
    description: recentMovesPageMeta.description,
    url: recentMovesPageMeta.path,
    type: "website",
    images: [
      {
        url: recentMoves[0]?.src ?? "/images/hero-poster.webp",
        width: 1200,
        height: 800,
        alt: "Toro Movers recent local moves in Orlando and Central Florida",
      },
    ],
  },
  robots: { index: true, follow: true },
};

function galleryGraph() {
  const pageUrl = `${SITE_URL}${recentMovesPageMeta.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: recentMovesPageMeta.title,
        description: recentMovesPageMeta.description,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#movingcompany` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${SITE_URL}${recentMoves[0]?.src ?? "/images/hero-poster.webp"}`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ImageGallery",
        "@id": `${pageUrl}#gallery`,
        name: "Toro Movers recent moves",
        description: recentMovesPageMeta.description,
        associatedMedia: recentMoves.map((m) => ({
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${m.src}`,
          name: m.title,
          description: m.alt,
          caption: `${m.title} — ${m.service} in ${m.area}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Recent moves",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * SEO gallery page (DID-style /houston-movers-gallery equivalent).
 */
export default function RecentMovesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryGraph()) }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <RecentMoves items={recentMoves} showAllLink={false} variant="page" />
        <ClosingCta
          title="Ready for your Orlando move?"
          body="Get a clear hourly quote for full-service, labor-only, or apartment moving. Local crew, bilingual support, up-front rates."
        />
      </main>
      <Footer />
      <StickyCta />
      <LeadModal />
      <CookieBanner />
    </>
  );
}
