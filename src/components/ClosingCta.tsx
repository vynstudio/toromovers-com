import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { SplitBand } from "@/components/SplitBand";
import {
  GOOGLE_RATING,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_REGION,
} from "@/lib/site";

type ClosingCtaProps = {
  title?: string;
  body?: string;
};

/**
 * Closing split-band — SEO/AEO estimate CTA (never “get a clear quote”).
 */
export function ClosingCta({ title, body }: ClosingCtaProps = {}) {
  const heading = title ?? closing.title;
  const lede = body ?? closing.body;

  return (
    <SplitBand
      id="closing"
      soft
      reverse={closing.reverse}
      image={closing.image}
      aria-labelledby="closing-heading"
    >
      <p className="split-band-eyebrow">{closing.eyebrow}</p>
      <h2 id="closing-heading" className="split-band-title">
        {heading}
      </h2>
      {/* AEO: direct answer — how to request an Orlando moving estimate */}
      <p className="aeo-answer split-band-lede text-muted">{lede}</p>

      <ul className="customer-proof-stats" aria-label="Why book Toro Movers">
        <li className="customer-proof-stat">
          <span className="customer-proof-stat-value">{GOOGLE_RATING}★</span>
          <span className="customer-proof-stat-label">
            {closing.secondaryRatingLabel}
          </span>
        </li>
        <li className="customer-proof-stat">
          <span className="customer-proof-stat-value">{SERVICE_REGION}</span>
          <span className="customer-proof-stat-label">
            {closing.secondaryAreaLabel}
          </span>
        </li>
        <li className="customer-proof-stat">
          <span className="customer-proof-stat-value">~60s</span>
          <span className="customer-proof-stat-label">
            {closing.secondaryNote}
          </span>
        </li>
      </ul>

      <div className="split-band-actions">
        <a
          href={PHONE_TEL}
          data-cta="closing-phone"
          className="btn-primary btn-fluid tap-target inline-flex"
        >
          <span className="sm:hidden">Call now</span>
          <span className="hidden sm:inline">
            {closing.ctaPhone} {PHONE_DISPLAY}
          </span>
        </a>
        <button
          type="button"
          data-open-quote
          data-source="closing-cta"
          data-cta="closing-form"
          className="btn-outline btn-fluid tap-target inline-flex"
        >
          {closing.ctaQuote}
          <IconArrow />
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">{HOURS_LABEL}</p>
    </SplitBand>
  );
}
