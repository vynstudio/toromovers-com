import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FeatureAlternating } from "@/components/FeatureAlternating";
import { Integrations } from "@/components/Integrations";
import { WhyBanner } from "@/components/WhyBanner";
import { FeatureGrid } from "@/components/FeatureGrid";
import { DesignedForLife } from "@/components/DesignedForLife";
import { SplitStories } from "@/components/SplitStories";
import { Testimonial } from "@/components/Testimonial";
import { Process } from "@/components/Process";
import { Faq } from "@/components/Faq";
import { Areas } from "@/components/Areas";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { homePageGraph } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageGraph()) }}
      />
      <Nav />
      <main className="w-full min-w-0 flex-1">
        <Hero />
        <FeatureAlternating />
        <Integrations />
        <WhyBanner />
        <FeatureGrid />
        <DesignedForLife />
        <SplitStories />
        <Testimonial />
        <Process />
        <Faq />
        <Areas />
        <ClosingCta />
      </main>
      <Footer />
      <StickyCta />
    </>
  );
}
