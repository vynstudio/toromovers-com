import {
  GOOGLE_RATING,
  MOVES_DONE,
  SERVICE_REGION,
} from "@/lib/site";

/**
 * Desktop trust ticker under hero — credible claims only (site-backed).
 * Continuous sideways marquee; pauses on hover / reduced-motion.
 */
const TRUST_ITEMS = [
  `${GOOGLE_RATING}★ Google rated`,
  `${MOVES_DONE} local moves`,
  "Family-owned",
  "Bilingual EN · ES",
  `Local ${SERVICE_REGION}`,
  "Up-front hourly rates",
  "Full-service & labor-only",
  "Apartment specialists",
  "Local crew, committed to every job",
  "Clear communication",
  "Same-week scheduling",
  "Orlando & Central Florida",
  "Careful loading & placement",
] as const;

function Track({ id }: { id: string }) {
  return (
    <ul className="trust-marquee-track" aria-hidden={id !== "a"}>
      {TRUST_ITEMS.map((label) => (
        <li key={`${id}-${label}`} className="trust-marquee-item">
          <span className="trust-marquee-dot" aria-hidden />
          {label}
        </li>
      ))}
    </ul>
  );
}

export function TrustMarquee() {
  return (
    <section
      className="trust-marquee full-bleed"
      aria-label="Trust signals"
    >
      <div className="trust-marquee-fade trust-marquee-fade--left" aria-hidden />
      <div className="trust-marquee-fade trust-marquee-fade--right" aria-hidden />
      <div className="trust-marquee-viewport">
        <Track id="a" />
        <Track id="b" />
      </div>
      {/* Screen-reader friendly static list (not the animated track) */}
      <p className="sr-only">
        {TRUST_ITEMS.join(". ")}.
      </p>
    </section>
  );
}
