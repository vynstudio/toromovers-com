import { areasSnippet } from "@/lib/content";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/** Cities called out on the homepage (links to SEO engine pages). */
const AREA_LINKS = [
  { label: "Orlando movers", href: "/orlando-movers" },
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
 * Service areas — standalone section (separate from the closing CTA).
 */
export function Areas() {
  return (
    <section
      id="areas"
      className="areas-section full-bleed section-pad w-full"
      aria-labelledby="areas-heading"
    >
      <div className="site-container text-center">
        <p className="areas-eyebrow">Coverage</p>
        <h2
          id="areas-heading"
          className="fluid-h2 text-foreground"
        >
          {areasSnippet.heading}
        </h2>
        <p className="aeo-answer areas-lead mx-auto mt-4 max-w-2xl text-[var(--text-body)] leading-relaxed text-muted">
          {areasSnippet.lead}
        </p>

        <ul className="areas-chips mt-8" aria-label="Cities we serve">
          {AREA_LINKS.map((a) => (
            <li key={a.href}>
              <a href={a.href} className="areas-chip">
                {a.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/service-areas" className="areas-chip areas-chip--more">
              Service areas
            </a>
          </li>
        </ul>

        <p className="areas-call mt-8 text-sm text-muted">
          Not sure if we cover your ZIP?{" "}
          <a
            href={PHONE_TEL}
            data-cta="areas-phone"
            className="font-semibold text-foreground underline underline-offset-2"
          >
            Call {PHONE_DISPLAY}
          </a>{" "}
          for availability in your city.
        </p>
      </div>
    </section>
  );
}
