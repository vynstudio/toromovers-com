import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteCaptureFunnel } from "@/components/QuoteCaptureFunnel";
import { ClientChrome } from "@/components/ClientChrome";
import {
  BUSINESS_NAME,
  GOOGLE_RATING,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: `Get a free, no-obligation Orlando moving quote from ${BUSINESS_NAME} in under a minute. Call ${PHONE_DISPLAY} or request pricing online. ${HOURS_LABEL}.`,
  alternates: { canonical: "/get-a-quote" },
  openGraph: {
    title: `Get a Free Quote · ${BUSINESS_NAME}`,
    description:
      "Free, no-obligation Orlando & Central Florida moving quote in under a minute.",
    url: `${SITE_URL}/get-a-quote`,
  },
};

/**
 * Distraction-free full-page quote capture (no nav, no sticky CTA) —
 * for ads, SMS, QR, and direct-link traffic. Renders the same
 * essentials-first LeadFunnel used in the modal, just full-page.
 */
export default function GetAQuotePage() {
  return (
    <>
      <header className="quote-page-header">
        <Link
          href="/"
          className="quote-page-brand"
          aria-label={`${BUSINESS_NAME} home`}
        >
          <Image
            src="/logos/toro-bull-black.svg"
            alt=""
            width={30}
            height={24}
            priority
          />
          <span>{BUSINESS_NAME}</span>
        </Link>
        <a
          href={PHONE_TEL}
          data-cta="quote-page-header-phone"
          className="quote-page-phone tap-target"
        >
          Call {PHONE_DISPLAY}
        </a>
      </header>

      <main id="main" className="quote-page-main">
        <div className="quote-page-copy">
          <p className="split-band-eyebrow">Free quote</p>
          <h1 className="quote-page-title">
            Get your Orlando moving quote in under a minute.
          </h1>
          <p className="aeo-answer quote-page-lede text-muted">
            Share your name and number first — we save it right away — then a
            few quick questions so we can call you back with real pricing,
            not a guess.
          </p>
          <ul className="quote-page-trust" aria-label="Why Toro Movers">
            <li>
              ★★★★★ {GOOGLE_RATING} · {REVIEW_COUNT} Google reviews
            </li>
            <li>Up-front hourly rates — no hidden fees</li>
            <li>{HOURS_LABEL}</li>
          </ul>
        </div>

        <QuoteCaptureFunnel />
      </main>

      <footer className="quote-page-footer">
        <a href={PHONE_TEL} data-cta="quote-page-footer-phone">
          Prefer to talk? Call {PHONE_DISPLAY}
        </a>
        <nav aria-label="Legal">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </footer>

      <ClientChrome />
    </>
  );
}
