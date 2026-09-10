import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { CityLanding } from "@/components/city/CityLanding";
import { allCitySlugs, getCityPage } from "@/lib/city-pages";
import { cityPageGraph } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allCitySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const city = getCityPage(slug);
  if (!city) return {};
  return {
    title: { absolute: city.metadata.title },
    description: city.metadata.description,
    alternates: { canonical: city.href },
    openGraph: {
      title: city.metadata.title,
      description: city.metadata.description,
      url: city.href,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: "/images/moves/real-23.webp",
          width: 1200,
          height: 900,
          alt: `Toro Movers crew on a real local move near ${city.name}`,
        },
      ],
    },
    robots: { index: true, follow: true },
  };
}

export default async function CityMoversPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const city = getCityPage(slug);
  if (!city) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(cityPageGraph(city)),
        }}
      />
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <CityLanding city={city} />
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
