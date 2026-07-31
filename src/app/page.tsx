import dynamic from "next/dynamic";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Process } from "@/components/Process";
import { FeatureAlternating } from "@/components/FeatureAlternating";
import { Integrations } from "@/components/Integrations";
import { WhyToro } from "@/components/WhyToro";
import { RecentMoves } from "@/components/RecentMoves";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Areas } from "@/components/Areas";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { homePageGraph } from "@/lib/schema";

/** Heavy client chrome — load after first paint */
const LeadModal = dynamic(
  () => import("@/components/LeadModal").then((m) => m.LeadModal),
  { ssr: false },
);
const CookieBanner = dynamic(
  () => import("@/components/CookieBanner").then((m) => m.CookieBanner),
  { ssr: false },
);

/**
 * DID-style homepage strategy (Toro layout kept):
 * Hero → trust → all services (linked) → process → recent moves (real photos)
 * → why Toro → reviews → FAQ → areas → close.
 * Lifestyle blocks kept lower for brand, not competing with service SEO.
 */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageGraph()) }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <Process />
        <RecentMoves />
        <WhyToro />
        <Reviews />
        <Faq />
        <Areas />
        <FeatureAlternating />
        <Integrations />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
      <LeadModal />
      <CookieBanner />
    </>
  );
}
