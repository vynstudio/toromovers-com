import { features } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { SplitBand } from "@/components/SplitBand";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * Discover split-bands — identical size/frame as every homepage section.
 */
export function FeatureAlternating() {
  return (
    <div id="discover" className="split-band-stack" aria-label="Discover Toro Movers">
      {features.map((f, i) => (
        <SplitBand
          key={f.id}
          reverse={f.reverse}
          soft={i % 2 === 0}
          image={f.image}
        >
          {f.eyebrow ? (
            <p className="split-band-eyebrow">{f.eyebrow}</p>
          ) : null}
          <h2 className="split-band-title">{f.title}</h2>
          <p className="aeo-answer split-band-lede text-muted">{f.body}</p>
          <div className="split-band-actions">
            <a
              href={PHONE_TEL}
              data-cta={`feature-${f.id}-call`}
              className="btn-primary btn-fluid tap-target inline-flex"
            >
              <span className="sm:hidden">Call now</span>
              <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
            </a>
            <button
              type="button"
              data-open-quote
              data-source={`feature-${f.id}-quote`}
              data-cta={`feature-${f.id}-quote`}
              className="btn-outline btn-fluid tap-target inline-flex"
            >
              Get a free quote
              <IconArrow />
            </button>
          </div>
        </SplitBand>
      ))}
    </div>
  );
}
