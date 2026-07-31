import {
  GOOGLE_RATING,
  GOOGLE_MAPS_REVIEWS_URL,
  HOURS_LABEL,
  MOVES_DONE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_REGION,
} from "@/lib/site";

/** High-priority trust + contact strip under hero. */
export function TrustBar() {
  return (
    <section
      className="full-bleed w-full border-b border-border bg-white py-3 sm:py-4"
      aria-label="Trust signals"
    >
      <div className="site-container flex flex-col items-center gap-2 text-center sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-0 sm:justify-start">
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="trust-chip px-1 py-2"
            data-cta="trust-google-rating"
          >
            <strong>{GOOGLE_RATING}★</strong> Google rated
          </a>
          <span className="trust-chip px-1 py-2">
            <strong>{MOVES_DONE}</strong> moves
          </span>
          <span className="trust-chip hidden px-1 py-2 sm:inline-flex">
            <strong>{SERVICE_REGION}</strong>
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
          <a
            href={PHONE_TEL}
            data-cta="trust-phone"
            className="tap-target font-semibold text-foreground underline underline-offset-2"
          >
            {PHONE_DISPLAY}
          </a>
          <span className="text-xs text-muted sm:text-sm">{HOURS_LABEL}</span>
        </div>
      </div>
    </section>
  );
}
