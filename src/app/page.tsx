import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Process } from "@/components/Process";
import { FeatureAlternating } from "@/components/FeatureAlternating";
import { Integrations } from "@/components/Integrations";
import { WhyToro } from "@/components/WhyToro";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Areas } from "@/components/Areas";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { LeadModal } from "@/components/LeadModal";
import { CookieBanner } from "@/components/CookieBanner";
import { homePageGraph } from "@/lib/schema";

/**
 * Mobile-first conversion path:
 * Hero → trust → services → process → lifestyle proof → why Toro →
 * reviews → FAQ → areas → close.
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
        <FeatureAlternating />
        <Integrations />
        <WhyToro />
        <Reviews />
        <Faq />
        <Areas />
        <ClosingCta />
      </main>
      <Footer />
      <LeadModal />
      <CookieBanner />
    </>
  );
}
