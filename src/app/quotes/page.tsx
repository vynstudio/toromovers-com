import type { Metadata } from "next";
import AdsShortForm from "@/components/funnel/AdsShortForm";
import { quotePage, quotePageGraph, QUOTE_PAGE_URL } from "@/lib/quote-page";

export const dynamic = "force-static";

const page = quotePage;
const QUOTES_PHONE = "321-234-0510";

export const metadata: Metadata = {
  title: page.metadata.title,
  description: page.metadata.description,
  alternates: { canonical: QUOTE_PAGE_URL },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  keywords: [
    "local moving quote Orlando",
    "up-front hourly movers",
    "$95 per mover per hour",
    "no fuel surcharge movers",
    "bilingual movers Orlando",
    "long-distance movers Orlando",
    "interstate movers Florida",
    "Central Florida moving quote",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: QUOTE_PAGE_URL,
    siteName: "Toro Movers",
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    images: [
      {
        url: page.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: page.metadata.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    images: [page.metadata.ogImage],
  },
};

export default function QuotesPage() {
  return (
    <main id="main" className="quotes-rebrand gmp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quotePageGraph()),
        }}
      />
      <section className="quotes-hero">
        <div className="quotes-copy">
          <h1>{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
        </div>
        <div className="form-card quotes-card">
          <AdsShortForm phoneDisplay={QUOTES_PHONE} phoneLines={QUOTES_PHONE} />
        </div>
      </section>
    </main>
  );
}
