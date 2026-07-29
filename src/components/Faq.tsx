import { faq } from "@/lib/content";

export type FaqItem = { q: string; a: string };

type FaqProps = {
  heading?: string;
  sub?: string;
  items?: readonly FaqItem[];
  /** Unique name for exclusive accordion open (native details). */
  groupName?: string;
  eyebrow?: string;
};

/**
 * FAQ accordion — native <details> (no JS), answers stay in DOM for AEO.
 * Shared by homepage and city landings.
 */
export function Faq({
  heading = faq.heading,
  sub = faq.sub,
  items = faq.items,
  groupName = "toro-faq",
  eyebrow = "FAQ",
}: FaqProps) {
  return (
    <section
      id="faq"
      className="faq-section full-bleed section-pad w-full"
      aria-labelledby="faq-heading"
    >
      <div className="site-container">
        <div className="faq-panel">
          <header className="faq-head">
            <p className="faq-eyebrow">{eyebrow}</p>
            <h2 id="faq-heading" className="fluid-h2 faq-title text-foreground">
              {heading}
            </h2>
            {sub ? <p className="faq-sub">{sub}</p> : null}
          </header>

          <div className="faq-accordion">
            {items.map((item) => (
              <details key={item.q} className="faq-details" name={groupName}>
                <summary className="faq-summary">
                  <span className="faq-summary-text">{item.q}</span>
                  <span className="faq-chevron" aria-hidden>
                    <svg
                      width="14"
                      height="14"
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
        </div>
      </div>
    </section>
  );
}
