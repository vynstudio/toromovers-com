import { process } from "@/lib/content";

export function Process() {
  return (
    <section
      id="how-it-works"
      className="full-bleed section-pad w-full border-t border-border bg-zinc-50"
      aria-labelledby="process-heading"
    >
      <div className="site-container">
        <h2
          id="process-heading"
          className="fluid-h2 text-center text-foreground"
        >
          {process.heading}
        </h2>
        <ol className="section-grid section-grid-3 mt-8 sm:mt-10">
          {process.steps.map((step, i) => (
            <li
              key={step.name}
              className="relative flex w-full min-w-0 flex-col items-center text-center sm:items-start sm:text-left md:items-center md:text-center"
            >
              <span
                className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-sm font-medium text-white"
                aria-hidden
              >
                {i + 1}
              </span>
              <h3 className="fluid-h3 text-foreground">{step.name}</h3>
              <p className="aeo-answer mt-2 max-w-sm text-[var(--text-body)] leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
