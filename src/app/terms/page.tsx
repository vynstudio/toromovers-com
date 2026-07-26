import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${BUSINESS_NAME} website and services.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="site-container-narrow py-16 sm:py-24">
      <Link href="/" className="text-sm text-foreground underline underline-offset-4">
        ← Back home
      </Link>
      <h1 className="mt-8 text-3xl font-normal tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: July 25, 2026</p>
      <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
        <p>
          By using {SITE_URL} or booking with {BUSINESS_NAME}, you agree to these terms.
          Quotes provided online or by phone are estimates based on the information you
          share; final charges follow the rate and hours agreed for your move.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">Services</h2>
        <p>
          We provide local residential and commercial moving services in Central Florida.
          Availability, crew size, and truck capacity are confirmed at booking.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">Website use</h2>
        <p>
          Content on this site is for general information. Do not misuse the site,
          attempt unauthorized access, or scrape it in ways that harm performance.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">Contact</h2>
        <p>
          Questions:{" "}
          <a className="text-foreground underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
