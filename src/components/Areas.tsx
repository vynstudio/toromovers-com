import { areasSnippet } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { SplitBand } from "@/components/SplitBand";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

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
 * Areas split-band — fits locked section, no scroll.
 */
export function Areas() {
  return (
    <SplitBand
      id="areas"
      reverse={areasSnippet.reverse}
      image={areasSnippet.image}
      aria-labelledby="areas-heading"
    >
      <p className="split-band-eyebrow">{areasSnippet.eyebrow}</p>
      <h2 id="areas-heading" className="split-band-title">
        {areasSnippet.heading}
      </h2>
      <p className="aeo-answer split-band-lede text-muted">
        {areasSnippet.lead}
      </p>

      <ul className="split-chips" aria-label="Cities we serve">
        {AREA_LINKS.map((a) => (
          <li key={a.href}>
            <a href={a.href} className="split-chip" title={a.label}>
              {a.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="split-band-actions">
        <a
          href={PHONE_TEL}
          data-cta="areas-phone"
          className="btn-primary btn-fluid tap-target inline-flex"
        >
          <span className="sm:hidden">Call now</span>
          <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
        </a>
        <a
          href="/service-areas"
          className="btn-outline btn-fluid tap-target inline-flex"
          data-cta="areas-all"
        >
          All service areas
          <IconArrow />
        </a>
      </div>
    </SplitBand>
  );
}
