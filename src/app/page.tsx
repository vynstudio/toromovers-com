import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { FeatureAlternating } from "@/components/FeatureAlternating";
import { Integrations } from "@/components/Integrations";
import { WhyBanner } from "@/components/WhyBanner";
import { FeatureGrid } from "@/components/FeatureGrid";
import { DesignedForLife } from "@/components/DesignedForLife";
import { SplitStories } from "@/components/SplitStories";
import { Testimonial } from "@/components/Testimonial";
import { ClosingCta } from "@/components/ClosingCta";
import { Footer } from "@/components/Footer";
import { SITE_URL } from "@/lib/site";
import { testimonial } from "@/lib/content";

const homeJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: SITE_URL,
  name: "Toro Movers | Local Movers in Orlando & Central Florida",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#movingcompany` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/hero-truck.jpg`,
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
  mainEntity: {
    "@type": "Review",
    reviewBody: testimonial.quote,
    author: { "@type": "Person", name: testimonial.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <Hero />
        <FeatureAlternating />
        <Integrations />
        <WhyBanner />
        <FeatureGrid />
        <DesignedForLife />
        <SplitStories />
        <Testimonial />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
