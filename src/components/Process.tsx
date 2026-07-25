import { process } from "@/lib/content";

export function Process() {
  return (
    <section
      id="process"
      className="full-bleed w-full border-t border-border bg-zinc-50 py-14 sm:py-20"
      aria-labelledby="process-heading"
    >
      <div className="site-container">
        <h2 id="process-heading" className="fluid-h2 text-foreground">
          {process.heading}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-8 lg:gap-12">
          {process.steps.map((step, i) => (
            <li key={step.name} className="relative w-full min-w-0">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy text-sm font-medium text-white">
                {i + 1}
              </span>
              <h3 className="fluid-h3 text-foreground">{step.name}</h3>
              <p className="aeo-answer mt-2 text-[var(--text-body)] leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
