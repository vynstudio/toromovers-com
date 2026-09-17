import type { Metadata } from "next";
import AdsShortForm from "@/components/funnel/AdsShortForm";
import { ToroLockup } from "@/components/funnel/ToroLockup";
import { quotePage, quotePageGraph, QUOTE_PAGE_URL } from "@/lib/quote-page";
import {
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

export const dynamic = "force-static";

const page = quotePage;

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
    "movers from $75 per hour",
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
    <main id="main" className="gmp-page gmp-land bg-white text-[#0A0A0A]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(quotePageGraph()),
        }}
      />
      <header className="gmp-head">
        <ToroLockup className="gmp-head-lockup" />
        <a className="gmp-call" href={PHONE_TEL}>
          Call {PHONE_DISPLAY}
        </a>
      </header>

      <section className="gmp-land-body">
        <h1>{page.hero.h1}</h1>
        <p className="aeo-answer">{page.hero.lede}</p>
        <AdsShortForm />
      </section>

      <footer className="gmp-nap">
        <p>
          {page.footer.nap}
          {" · "}
          {page.footer.hours}
          {" · "}
          <a href={PHONE_TEL}>Call</a>
          {" · "}
          <a href={EMAIL_HREF}>{EMAIL}</a>
          {" · "}
          <a href="/privacy">Privacy</a>
        </p>
      </footer>
    </main>
  );
}
