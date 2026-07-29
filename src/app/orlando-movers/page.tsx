import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { LeadModal } from "@/components/LeadModal";
import { CookieBanner } from "@/components/CookieBanner";
import { CityLanding } from "@/components/city/CityLanding";
import { ORLANDO } from "@/lib/city-pages";
import { cityPageGraph } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: ORLANDO.metadata.title },
  description: ORLANDO.metadata.description,
  alternates: { canonical: ORLANDO.href },
  openGraph: {
    title: ORLANDO.metadata.title,
    description: ORLANDO.metadata.description,
    url: ORLANDO.href,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/hero-poster.webp",
        width: 960,
        height: 960,
        alt: "Toro Movers crew handling a residential move in Central Florida",
      },
    ],
  },
  robots: { index: true, follow: true },
};

/**
 * Flagship city SEO page — homepage design shell + Orlando-only copy.
 * Served by design site (not engine proxy).
 */
export default function OrlandoMoversPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cityPageGraph(ORLANDO)),
        }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <CityLanding city={ORLANDO} />
      </main>
      <Footer />
      <StickyCta />
      <LeadModal />
      <CookieBanner />
    </>
  );
}
