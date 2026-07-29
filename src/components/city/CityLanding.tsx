import { CityHero } from "@/components/city/CityHero";
import { TrustBar } from "@/components/TrustBar";
import { Reviews } from "@/components/Reviews";
import { ClosingCta } from "@/components/ClosingCta";
import { Areas } from "@/components/Areas";
import { IconArrow } from "@/components/icons";
import type { CityPageContent } from "@/lib/city-pages";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * City SEO landing — homepage design system, city-only copy.
 * Shared shell: hero video, trust bar, reviews, areas, closing CTA.
 */
export function CityLanding({ city }: { city: CityPageContent }) {
  return (
    <>
      <CityHero
        badge={city.badge}
        h1={city.h1}
        lede={city.lede}
        discoverHref="#about"
        discoverLabel={`${city.name} services`}
        source={`city-${city.slug}`}
      />
      <TrustBar />

      {/* About + SEO sections */}
      <section
        id="about"
        className="full-bleed section-pad w-full bg-white"
        aria-labelledby="about-heading"
      >
        <div className="site-container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="about-heading" className="fluid-h2 text-foreground">
              {city.about.h2}
            </h2>
            <p className="aeo-answer fluid-lede mx-auto mt-4 text-muted">
              {city.about.body}
            </p>
          </div>

          <div className="city-seo-grid mt-12 sm:mt-14">
            {city.sections.map((sec) => (
              <article key={sec.h2} className="city-seo-card">
                <h3 className="fluid-h3 text-foreground">{sec.h2}</h3>
                <p className="aeo-answer mt-2 text-[var(--text-body)] leading-relaxed text-muted">
                  {sec.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Service links */}
      <section
        id="services"
        className="full-bleed section-pad w-full border-t border-border bg-zinc-50"
        aria-labelledby="services-heading"
      >
        <div className="site-container">
          <h2
            id="services-heading"
            className="fluid-h2 text-center text-foreground"
          >
            {city.name} moving services
          </h2>
          <p className="aeo-answer mx-auto mt-3 max-w-xl text-center text-muted">
            Full-service, labor-only, and apartment moves in {city.name} — same
            up-front hourly model across Central Florida.
          </p>
          <div className="section-grid section-grid-3 mt-10">
            {city.services.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="city-seo-card city-service-link flex w-full flex-col items-center text-center md:items-start md:text-left"
              >
                <h3 className="fluid-h3 text-foreground">{s.title}</h3>
                <p className="aeo-answer mx-auto mt-2 w-full max-w-sm text-[var(--text-body)] leading-relaxed text-muted md:mx-0">
                  {s.body}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                  Learn more <IconArrow />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section
        className="full-bleed section-pad w-full bg-white"
        aria-labelledby="areas-local-heading"
      >
        <div className="site-container text-center">
          <h2 id="areas-local-heading" className="fluid-h2 text-foreground">
            Serving {city.name} &amp; nearby
          </h2>
          <ul className="nbhd-tags mt-8" aria-label={`${city.name} neighborhoods`}>
            {city.neighborhoods.map((n) => (
              <li key={n}>
                <span className="nbhd-tag">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why */}
      <section
        id="why"
        className="full-bleed section-pad w-full border-t border-border bg-zinc-50"
        aria-labelledby="why-heading"
      >
        <div className="site-container-narrow text-center">
          <h2 id="why-heading" className="fluid-h2 text-foreground">
            {city.why.h2}
          </h2>
          <p className="aeo-answer fluid-lede mx-auto mt-4 text-muted">
            {city.why.body}
          </p>
          <div className="tap-stack mt-8 justify-center">
            <a
              href={PHONE_TEL}
              data-cta={`city-${city.slug}-why-call`}
              className="btn-primary btn-fluid tap-target inline-flex w-full sm:w-auto"
            >
              Call {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              data-open-quote
              data-source={`city-${city.slug}-why`}
              className="btn-outline btn-fluid tap-target inline-flex w-full sm:w-auto"
            >
              Get a free quote
              <IconArrow />
            </button>
          </div>
        </div>
      </section>

      <Reviews />

      {/* FAQ */}
      <section
        id="faq"
        className="full-bleed w-full border-t border-border bg-white py-8 sm:py-10"
        aria-labelledby="faq-heading"
      >
        <div className="site-container-narrow">
          <div className="faq-head">
            <h2 id="faq-heading" className="faq-title">
              {city.name} movers — common questions
            </h2>
            <p className="faq-sub">
              Straight answers from a local {city.name} moving company
            </p>
          </div>
          <div className="faq-accordion">
            {city.faqs.map((item) => (
              <details
                key={item.q}
                className="faq-details"
                name={`toro-faq-${city.slug}`}
              >
                <summary className="faq-summary">
                  <span className="faq-summary-text">{item.q}</span>
                  <span className="faq-chevron" aria-hidden>
                    +
                  </span>
                </summary>
                <div className="aeo-answer faq-panel">
                  <p>{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Areas />
      <ClosingCta title={city.closing.title} body={city.closing.body} />
    </>
  );
}
