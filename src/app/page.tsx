import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustMarquee } from "@/components/TrustMarquee";
import { CustomerProof } from "@/components/CustomerProof";
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
import { ClientChrome } from "@/components/ClientChrome";
import { homePageGraph } from "@/lib/schema";

/**
 * DID-style homepage strategy (Toro layout kept):
 * Hero → customer proof (animated) → services → process → recent moves
 * → why Toro → reviews → FAQ → areas → close.
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
        <TrustMarquee />
        <CustomerProof />
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
      <ClientChrome />
    </>
  );
}
