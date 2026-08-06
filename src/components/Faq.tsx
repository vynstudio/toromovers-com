import { faq } from "@/lib/content";
import { SplitBand } from "@/components/SplitBand";

export type FaqItem = { q: string; a: string };

type FaqProps = {
  heading?: string;
  sub?: string;
  items?: readonly FaqItem[];
  groupName?: string;
  eyebrow?: string;
};

/**
 * FAQ split-band — all items fit the locked section (no scroll, no CTAs).
 */
export function Faq({
  heading = faq.heading,
  sub = faq.sub,
  items = faq.items,
  groupName = "toro-faq",
  eyebrow = faq.eyebrow,
}: FaqProps) {
  return (
    <SplitBand
      id="faq"
      soft
      reverse={faq.reverse}
      image={faq.image}
      aria-labelledby="faq-heading"
    >
      <header className="faq-head">
        <p className="split-band-eyebrow">{eyebrow}</p>
        <h2 id="faq-heading" className="split-band-title faq-title-compact">
          {heading}
        </h2>
        {sub ? (
          <p className="aeo-answer faq-sub-compact">{sub}</p>
        ) : null}
      </header>

      <div className="faq-accordion">
        {items.map((item) => (
          <details key={item.q} className="faq-details" name={groupName}>
            <summary className="faq-summary">
              <span className="faq-summary-text">{item.q}</span>
              <span className="faq-chevron" aria-hidden>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M7 2.5v9M2.5 7h9" className="faq-chevron-plus" />
                </svg>
              </span>
            </summary>
            <div className="aeo-answer faq-panel-body">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>
    </SplitBand>
  );
}
