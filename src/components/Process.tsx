import { process } from "@/lib/content";

/** Compact 3-step process — short copy, low vertical footprint. */
export function Process() {
  return (
    <section
      id="how-it-works"
      className="process-band full-bleed w-full border-t border-border bg-zinc-50"
      aria-labelledby="process-heading"
    >
      <div className="site-container">
        <h2
          id="process-heading"
          className="process-heading text-center text-foreground"
        >
          {process.heading}
        </h2>
        <ol className="process-steps">
          {process.steps.map((step, i) => (
            <li key={step.name} className="process-step">
              <span className="process-num" aria-hidden>
                {i + 1}
              </span>
              <div className="process-step-body">
                <h3 className="process-step-title">{step.name}</h3>
                <p className="aeo-answer process-step-text text-muted">
                  {step.text}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
