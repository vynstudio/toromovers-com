import { whyToro } from "@/lib/content";
import { FeatureIcon, IconArrow } from "@/components/icons";
import {
  GOOGLE_MAPS_REVIEWS_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

/**
 * Compact “why us” band — SEO/AEO header + 4 tight cards + stats + CTAs.
 * Fits a desktop viewport without towering empty pad.
 */
export function WhyToro() {
  return (
    <section
      id="why"
      className="why-band full-bleed w-full bg-white"
      aria-labelledby="why-heading"
    >
      <div className="site-container">
        <header className="why-head">
          <p className="why-eyebrow">{whyToro.eyebrow}</p>
          <h2 id="why-heading" className="why-title text-foreground">
            {whyToro.title}
          </h2>
          <p className="aeo-answer why-lede text-muted">{whyToro.lede}</p>
        </header>

        <div className="why-grid">
          {whyToro.items.map((item) => (
            <article key={item.title} className="why-card">
              <div className="why-card-icon" aria-hidden>
                <FeatureIcon name={item.icon} />
              </div>
              <div className="why-card-body">
                <h3 className="why-card-title">{item.title}</h3>
                <p className="aeo-answer why-card-text text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </div>

        <ul className="why-stats" aria-label="Trust signals">
          {whyToro.stats.map((s) => (
            <li key={s.label} className="why-stat">
              <span className="why-stat-value">{s.value}</span>
              <span className="why-stat-label">{s.label}</span>
            </li>
          ))}
        </ul>

        <p className="why-reviews-note text-muted">
          <a
            href={GOOGLE_MAPS_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline underline-offset-2"
            data-cta="why-google-reviews"
          >
            Read Google reviews
          </a>
        </p>

        <div className="why-cta-bar">
          <a
            href={PHONE_TEL}
            data-cta="why-call"
            className="btn-primary btn-fluid tap-target inline-flex justify-center"
          >
            {whyToro.ctaPhone}
            <span className="hidden sm:inline"> · {PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            data-open-quote
            data-source="why-quote"
            data-cta="why-quote"
            className="btn-outline btn-fluid tap-target inline-flex justify-center"
          >
            {whyToro.ctaQuote}
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  );
}
