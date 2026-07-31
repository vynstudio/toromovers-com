import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { CityLanding } from "@/components/city/CityLanding";
import { ORLANDO } from "@/lib/city-pages";
import { cityPageGraph } from "@/lib/schema";

const LeadModal = dynamic(
  () => import("@/components/LeadModal").then((m) => m.LeadModal),
  { ssr: false },
);
const CookieBanner = dynamic(
  () => import("@/components/CookieBanner").then((m) => m.CookieBanner),
  { ssr: false },
);

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
        url: "/images/hero-crew-real.jpg",
        width: 1200,
        height: 900,
        alt: "Toro Movers crew on a real local move in Central Florida",
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
