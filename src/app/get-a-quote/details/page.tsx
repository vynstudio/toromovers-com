import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { QuoteDetailsFunnel } from "@/components/QuoteDetailsFunnel";
import { ClientChrome } from "@/components/ClientChrome";
import { BUSINESS_NAME, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Complete Your Quote Request",
  robots: { index: false, follow: false },
};

/**
 * Page 2 of the split /get-a-quote flow. Never a direct entry point —
 * QuoteDetailsFunnel bounces here-without-contact visits back to page 1.
 */
export default function GetAQuoteDetailsPage() {
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
          data-cta="quote-details-header-phone"
          className="quote-page-phone tap-target"
        >
          Call {PHONE_DISPLAY}
        </a>
      </header>

      <main id="main" className="quote-page-main">
        <div className="quote-page-copy">
          <p className="split-band-eyebrow">Almost done</p>
          <h1 className="quote-page-title">A few quick questions.</h1>
          <p className="aeo-answer quote-page-lede text-muted">
            We already saved your contact info — just tap through these so
            we can call you back with real pricing, not a guess.
          </p>
        </div>

        <QuoteDetailsFunnel />
      </main>

      <footer className="quote-page-footer">
        <a href={PHONE_TEL} data-cta="quote-details-footer-phone">
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
