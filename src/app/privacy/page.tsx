import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_NAME, EMAIL, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS_NAME} collects and uses information on ${SITE_URL.replace("https://", "")}.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="site-container-narrow py-16 sm:py-24">
      <Link href="/" className="text-sm text-foreground underline underline-offset-4">
        ← Back home
      </Link>
      <h1 className="mt-8 text-3xl font-normal tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: July 25, 2026</p>
      <div className="prose prose-neutral mt-8 space-y-4 text-[15px] leading-relaxed text-muted">
        <p>
          {BUSINESS_NAME} (“we,” “us”) operates {SITE_URL}. This policy explains what
          information we collect when you visit our site or request a quote, and how we
          use it.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">Information we collect</h2>
        <p>
          Contact details you submit (name, phone, email, move details), technical data
          such as browser type and approximate location from your IP, and analytics
          events that help us improve the site.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">How we use it</h2>
        <p>
          To respond to quote requests, schedule moves, improve our website and services,
          and meet legal obligations. We do not sell your personal information.
        </p>
        <h2 className="pt-4 text-lg font-medium text-foreground">Contact</h2>
        <p>
          Questions about privacy:{" "}
          <a className="text-foreground underline" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
