import { process } from "@/lib/content";
import { IconArrow } from "@/components/icons";

/**
 * Single-row process strip under services — maximum signal, minimal height.
 * Not a full content section; a conversion path.
 */
export function Process() {
  return (
    <section
      id="how-it-works"
      className="process-strip full-bleed w-full"
      aria-labelledby="process-heading"
    >
      <div className="site-container process-strip-inner">
        <h2 id="process-heading" className="process-strip-label">
          {process.heading}
        </h2>

        <ol className="process-strip-steps">
          {process.steps.map((step, i) => (
            <li key={step.name} className="process-strip-step">
              <span className="process-strip-num" aria-hidden>
                {i + 1}
              </span>
              <span className="process-strip-copy">
                <span className="process-strip-name">{step.name}</span>
                <span className="process-strip-text text-muted">{step.text}</span>
              </span>
              {i < process.steps.length - 1 ? (
                <span className="process-strip-join" aria-hidden />
              ) : null}
            </li>
          ))}
        </ol>

        <button
          type="button"
          data-open-quote
          data-source="process-quote"
          data-cta="process-quote"
          className="btn-primary process-strip-cta tap-target inline-flex"
        >
          {process.cta}
          <IconArrow />
        </button>
      </div>
    </section>
  );
}
