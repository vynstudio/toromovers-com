import {
  GOOGLE_RATING,
  GOOGLE_MAPS_REVIEWS_URL,
  HOURS_LABEL,
  MOVES_DONE,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
  SERVICE_REGION,
} from "@/lib/site";

/**
 * Mobile-first conversion trust strip — sits high on the page
 * so phone leads see proof + contact before lifestyle content.
 */
export function TrustBar() {
  return (
    <section
      className="full-bleed w-full border-b border-border bg-white py-4 sm:py-5"
      aria-label="Trust signals"
    >
      <div className="site-container flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="trust-chip">
            <strong>{GOOGLE_RATING}★</strong> Google
          </span>
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="trust-chip underline underline-offset-2"
          >
            <strong>{REVIEW_COUNT}+</strong> reviews
          </a>
          <span className="trust-chip">
            <strong>{MOVES_DONE}</strong> local moves
          </span>
          <span className="trust-chip hidden sm:inline-flex">
            <strong>{SERVICE_REGION}</strong>
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <a
            href={PHONE_TEL}
            data-cta="trust-phone"
            className="tap-target font-medium text-navy underline underline-offset-2"
          >
            {PHONE_DISPLAY}
          </a>
          <span className="text-xs sm:text-sm">{HOURS_LABEL}</span>
        </div>
      </div>
    </section>
  );
}
