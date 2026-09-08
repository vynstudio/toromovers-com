import { integrations } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { SplitBand } from "@/components/SplitBand";
import { PHONE_DISPLAY, PHONE_TEL, QUOTE_PATH } from "@/lib/site";

/**
 * Integrations split-band — same size as every section.
 */
export function Integrations() {
  return (
    <SplitBand
      soft
      reverse={integrations.reverse}
      image={integrations.image}
      aria-labelledby="integrations-heading"
    >
      <p className="split-band-eyebrow">{integrations.eyebrow}</p>
      <h2 id="integrations-heading" className="split-band-title">
        {integrations.title}
      </h2>
      <p className="aeo-answer split-band-lede text-muted">
        {integrations.body}
      </p>
      <div className="split-band-actions">
        <a
          href={PHONE_TEL}
          data-cta="integrations-call"
          className="btn-primary btn-fluid tap-target inline-flex"
        >
          <span className="sm:hidden">Call now</span>
          <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
        </a>
        <a
          href={QUOTE_PATH}
          data-cta="integrations-quote"
          className="btn-outline btn-fluid tap-target inline-flex"
        >
          Get a free quote
          <IconArrow />
        </a>
      </div>
    </SplitBand>
  );
}
