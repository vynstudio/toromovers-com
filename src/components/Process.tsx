import { process } from "@/lib/content";

export function Process() {
  return (
    <section
      id="process"
      className="border-t border-border bg-zinc-50 py-14 sm:py-20"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <h2
          id="process-heading"
          className="text-[1.75rem] font-normal tracking-tight text-foreground sm:text-4xl"
        >
          {process.heading}
        </h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-10">
          {process.steps.map((step, i) => (
            <li key={step.name} className="relative">
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-navy text-sm font-medium text-white">
                {i + 1}
              </span>
              <h3 className="text-base font-medium tracking-tight text-foreground">
                {step.name}
              </h3>
              <p className="aeo-answer mt-2 text-sm leading-relaxed text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
