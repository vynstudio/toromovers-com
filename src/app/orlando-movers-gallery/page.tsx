import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
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
        name: recentMovesPageMeta.h1,
        description: recentMovesPageMeta.description,
        associatedMedia: recentMoves.map((m) => ({
          "@type": "ImageObject",
          contentUrl: `${SITE_URL}${m.src}`,
          name: m.title,
          description: m.description,
          caption: `${m.title}. ${m.description}`,
          keywords: `${m.serviceLabel}, ${m.area}, Toro Movers`,
          url: `${SITE_URL}${m.href}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Orlando movers",
            item: `${SITE_URL}/orlando-movers`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Gallery",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

/**
 * DID-style city gallery: /orlando-movers-gallery
 * (mirrors didmoving.com/houston-movers-gallery/)
 */
export default function OrlandoMoversGalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(galleryGraph()) }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <header className="gallery-page-hero full-bleed section-pad w-full">
          <div className="site-container-narrow text-center">
            <p className="recent-moves-eyebrow">Gallery</p>
            <h1 className="fluid-h1 text-foreground">
              {recentMovesPageMeta.h1}
            </h1>
            <p className="aeo-answer fluid-lede mx-auto mt-4 text-muted">
              {recentMovesPageMeta.sub}. Organized by service type—apartment,
              residential, full-service, labor-only, packing, and crew—so you
              can see how Toro Movers works local jobs.
            </p>
          </div>
        </header>
        <RecentMoves showAllLink={false} variant="page" />
        <ClosingCta
          title="Ready for your Orlando move?"
          body="Get a clear hourly quote for full-service, labor-only, or apartment moving. Local crew, bilingual support, up-front rates."
        />
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
