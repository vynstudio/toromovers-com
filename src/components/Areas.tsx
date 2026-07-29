import { areasSnippet } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/** Primary metro cities — consistent labels; Orlando uses SEO-friendly anchor. */
const AREA_LINKS = [
  { label: "Orlando", href: "/orlando-movers", seo: "Orlando movers" },
  { label: "Kissimmee", href: "/kissimmee-movers" },
  { label: "Winter Park", href: "/winter-park-movers" },
  { label: "Clermont", href: "/clermont-movers" },
  { label: "Sanford", href: "/sanford-movers" },
  { label: "Oviedo", href: "/oviedo-movers" },
  { label: "Winter Garden", href: "/winter-garden-movers" },
  { label: "St. Cloud", href: "/st-cloud-movers" },
  { label: "Lakeland", href: "/lakeland-movers" },
] as const;

/**
 * Service areas — homepage-aligned coverage band (shared on city landings).
 */
export function Areas() {
  return (
    <section
      id="areas"
      className="areas-section full-bleed section-pad w-full"
      aria-labelledby="areas-heading"
    >
      <div className="site-container">
        <div className="areas-panel">
          <header className="areas-head">
            <p className="areas-eyebrow">Coverage</p>
            <h2 id="areas-heading" className="fluid-h2 text-foreground">
              {areasSnippet.heading}
            </h2>
            <p className="aeo-answer areas-lead mx-auto text-[var(--text-body)] leading-relaxed text-muted">
              {areasSnippet.lead}
            </p>
          </header>

          <ul className="areas-grid" aria-label="Cities we serve">
            {AREA_LINKS.map((a) => (
              <li key={a.href}>
                <a
                  href={a.href}
                  className="areas-city"
                  title={"seo" in a && a.seo ? a.seo : `${a.label} movers`}
                >
                  <span className="areas-city-name">
                    {"seo" in a && a.seo ? a.seo : a.label}
                  </span>
                  <span className="areas-city-go" aria-hidden>
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="areas-foot">
            <a href="/service-areas" className="areas-all">
              View all service areas
            </a>
            <p className="areas-call">
              Not sure if we cover your ZIP?{" "}
              <a
                href={PHONE_TEL}
                data-cta="areas-phone"
                className="font-semibold text-foreground underline underline-offset-2"
              >
                Call {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
