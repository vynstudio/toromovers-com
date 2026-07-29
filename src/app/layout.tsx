import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { organizationGraph } from "@/lib/schema";

/** Searchable Analytics (browser) — human + AI-referred traffic */
const SEARCHABLE_SITE_TOKEN =
  process.env.NEXT_PUBLIC_SEARCHABLE_SITE_TOKEN ||
  "pst_18bcf81295a1c8185e489122";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const titleDefault =
  "Toro Movers | Orlando Movers & Central Florida Moving Company";
const description = SITE_DESCRIPTION;

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
    "Orlando movers",
    "Central Florida movers",
    "local moving company Orlando",
    "apartment movers Orlando",
    "labor only movers Orlando",
    "full service movers Florida",
    "bilingual movers Orlando",
    "Toro Movers",
    "movers near me Central Florida",
  ],
  authors: [{ name: BUSINESS_NAME, url: SITE_URL }],
  creator: BUSINESS_NAME,
  publisher: BUSINESS_NAME,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
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
        url: "/images/hero-poster.webp",
        width: 960,
        height: 960,
        alt: "Toro Movers — professional local moving in Central Florida",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
    images: ["/images/hero-poster.webp"],
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
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  category: "business",
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Orlando",
    "geo.position": "28.5383;-81.3792",
    ICBM: "28.5383, -81.3792",
  },
};

/**
 * Required for true responsive layout.
 * content="width=device-width, initial-scale=1"
 * (maximumScale kept high so users can zoom — a11y; not a shrink hack)
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  // Let the browser shrink the layout when the mobile keyboard opens
  // so the quote sheet stays usable (Chrome/Android; Safari uses visualViewport).
  interactiveWidget: "resizes-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full w-full min-w-0 flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationGraph()),
          }}
        />
        {/* Searchable Analytics — queue stub + deferred tracker */}
        <Script id="searchable-queue" strategy="beforeInteractive">
          {`window.sa=window.sa||function(){(sa.q=sa.q||[]).push(arguments)}`}
        </Script>
        <Script
          id="searchable-tracker"
          src="https://searchable-tracker.searchable.workers.dev/s.js"
          strategy="afterInteractive"
          data-domain="toromovers.com"
          data-site-token={SEARCHABLE_SITE_TOKEN}
        />
        {children}
      </body>
    </html>
  );
}
