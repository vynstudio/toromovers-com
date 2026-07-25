import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  BUSINESS_NAME,
  EMAIL,
  GOOGLE_RATING,
  PHONE_E164,
  POSTAL_CODE,
  REVIEW_COUNT,
  SERVICE_BASE_LOCALITY,
  SERVICE_REGION,
  SITE_URL,
  SOCIAL_PROFILES,
  SLOGAN,
} from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const titleDefault = "Toro Movers | Local Movers in Orlando & Central Florida";
const description =
  "Family-owned movers in Orlando & Central Florida. Full-service, labor-only & apartment moves. Up-front hourly pricing, bilingual crew. Call (689) 600-2720.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: titleDefault,
    template: `%s · ${BUSINESS_NAME}`,
  },
  description,
  applicationName: BUSINESS_NAME,
  keywords: [
    "movers Orlando",
    "Central Florida movers",
    "local moving company",
    "apartment movers Orlando",
    "labor only movers",
    "full service movers Florida",
    "Toro Movers",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BUSINESS_NAME,
    title: titleDefault,
    description,
    images: [
      {
        url: "/images/hero-truck.jpg",
        width: 1400,
        height: 591,
        alt: "Toro Movers — professional local moving in Central Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/images/hero-truck.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0b1f3a",
  width: "device-width",
  initialScale: 1,
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MovingCompany",
      "@id": `${SITE_URL}/#movingcompany`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logos/toro-lockup-navy.svg`,
      image: `${SITE_URL}/images/hero-truck.jpg`,
      description,
      slogan: SLOGAN,
      telephone: PHONE_E164,
      email: EMAIL,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: SERVICE_BASE_LOCALITY,
        addressRegion: "FL",
        postalCode: POSTAL_CODE,
        addressCountry: "US",
      },
      areaServed: {
        "@type": "AdministrativeArea",
        name: SERVICE_REGION,
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: GOOGLE_RATING,
        bestRating: "5",
        reviewCount: REVIEW_COUNT,
      },
      sameAs: SOCIAL_PROFILES,
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "07:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: BUSINESS_NAME,
      url: SITE_URL,
      publisher: { "@id": `${SITE_URL}/#movingcompany` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
