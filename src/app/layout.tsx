import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";
import { organizationGraph } from "@/lib/schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const titleDefault =
  "Toro Movers | Local Movers in Orlando & Central Florida";
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
  manifest: "/manifest.webmanifest",
  category: "business",
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Orlando",
    "geo.position": "28.5383;-81.3792",
    ICBM: "28.5383, -81.3792",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1f3a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationGraph()),
          }}
        />
        {children}
      </body>
    </html>
  );
}
