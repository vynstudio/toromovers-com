import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { FeatureGrid } from "@/components/FeatureGrid";
import { Process } from "@/components/Process";
import { FeatureAlternating } from "@/components/FeatureAlternating";
import { Integrations } from "@/components/Integrations";
import { WhyBanner } from "@/components/WhyBanner";
import { DesignedForLife } from "@/components/DesignedForLife";
import { SplitStories } from "@/components/SplitStories";
import { Testimonial } from "@/components/Testimonial";
import { Faq } from "@/components/Faq";
import { Areas } from "@/components/Areas";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { homePageGraph } from "@/lib/schema";

/**
 * Mobile-first content priority (per product brief):
 * 1. Heading + value + CTA/phone (Hero)
 * 2. Trust signals
 * 3. Services
 * 4. How it works (process)
 * 5. Secondary lifestyle proof
 * 6. FAQ + service area
 * 7. Closing conversion
 *
 * Layout enhances to multi-column only via min-width media queries.
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
        {/* Primary conversion path */}
        <Hero />
        <TrustBar />
        <FeatureGrid />
        <Process />

        {/* Secondary / brand storytelling */}
        <FeatureAlternating />
        <Integrations />
        <WhyBanner />
        <DesignedForLife />
        <SplitStories />
        <Testimonial />

        {/* Answers + local SEO + final CTA */}
        <Faq />
        <Areas />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
