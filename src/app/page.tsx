import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustMarquee } from "@/components/TrustMarquee";
import { CustomerProof } from "@/components/CustomerProof";
import { FeatureGrid } from "@/components/FeatureGrid";
import { BlogCards } from "@/components/BlogCards";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { Areas } from "@/components/Areas";
import { SectionDivider } from "@/components/SectionDivider";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { homePageGraph } from "@/lib/schema";

/**
 * Hero → marquee → proof → services → reviews → FAQ → areas → blog.
 * Mobile: one-column stacks. Desktop: split bands + multi-col grids.
 * Principal conversion: Call + Get a quote (modal). No homepage callback band.
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
        <SectionDivider />
        <CustomerProof />
        <SectionDivider />
        <FeatureGrid />
        <SectionDivider />
        <Reviews />
        <SectionDivider />
        <Faq />
        <SectionDivider />
        <Areas />
        <SectionDivider />
        <BlogCards />
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
