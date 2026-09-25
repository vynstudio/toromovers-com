import { CityHero } from "@/components/city/CityHero";
import { CustomerProof } from "@/components/CustomerProof";
import { RecentMoves } from "@/components/RecentMoves";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { ClosingCta } from "@/components/ClosingCta";
import { Areas } from "@/components/Areas";
import { IconArrow } from "@/components/icons";
import { VectorSlot } from "@/components/ServiceIllustrations";
import {
  CENTRAL_FLORIDA_HUB,
  citiesByCounty,
  nearbyCityPages,
  type CityPageContent,
} from "@/lib/city-pages";
import { PHONE_DISPLAY, PHONE_TEL, QUOTE_PATH } from "@/lib/site";

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
      {/* Homepage proof H2 is Orlando-only; region hub keeps unique CF H2s. */}
      {city.slug === "central-florida-movers" ? null : (
        <CustomerProof showRegionLinks={false} />
      )}

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
                <span className="city-service-art">
                  <VectorSlot kind={s.illustration} />
                </span>
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

      {city.slug === "central-florida-movers" ? (
        <section
          className="full-bleed section-pad w-full bg-white"
          aria-labelledby="city-directory-heading"
        >
          <div className="site-container text-center">
            <h2 id="city-directory-heading" className="fluid-h2 text-foreground">
              Every city we serve
            </h2>
            <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-2xl text-muted">
              Orlando is home base. Each city below has its own movers page,
              grouped by county.
            </p>
            <div className="city-county-list">
              {citiesByCounty().map((group) => (
                <div key={group.county}>
                  <h3 className="city-county-name">{group.county}</h3>
                  <ul className="nbhd-tags" aria-label={group.county}>
                    {group.cities.map((item) => (
                      <li key={item.href}>
                        <a className="nbhd-tag" href={item.href}>
                          {item.name} movers
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <>
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

          <section
            className="full-bleed section-pad w-full border-t border-border bg-white"
            aria-labelledby="nearby-cities-heading"
          >
            <div className="site-container text-center">
              <h2 id="nearby-cities-heading" className="fluid-h2 text-foreground">
                Nearby cities we serve
              </h2>
              <p className="aeo-answer mx-auto mt-4 max-w-2xl text-muted">
                Local hops from {city.name} use the same up-front hourly model.
                Pick a nearby city, or see every Central Florida page.
              </p>
              <ul className="nbhd-tags mt-8" aria-label={`Cities near ${city.name}`}>
                {nearbyCityPages(city.slug).map((item) => (
                  <li key={item.href}>
                    <a className="nbhd-tag" href={item.href}>
                      {item.name} movers
                    </a>
                  </li>
                ))}
                <li>
                  <a className="nbhd-tag" href={CENTRAL_FLORIDA_HUB}>
                    Central Florida movers
                  </a>
                </li>
              </ul>
            </div>
          </section>
        </>
      )}

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
            <a
              href={QUOTE_PATH}
              className="btn-outline btn-fluid tap-target inline-flex w-full sm:w-auto"
            >
              Get a free quote
              <IconArrow />
            </a>
          </div>
        </div>
      </section>

      <RecentMoves />

      <Reviews />

      <Faq
        eyebrow="FAQ"
        heading={
          city.slug === "central-florida-movers"
            ? "Central Florida movers FAQs"
            : `${city.name} movers — common questions`
        }
        sub={`Straight answers from a local ${city.name} moving company`}
        items={city.faqs}
        groupName={`toro-faq-${city.slug}`}
      />

      <Areas />
      <ClosingCta title={city.closing.title} body={city.closing.body} />
    </>
  );
}
