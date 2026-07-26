import { areasSnippet } from "@/lib/content";
import { PHONE_TEL } from "@/lib/site";

export function Areas() {
  return (
    <section
      id="areas"
      className="full-bleed w-full bg-white py-10 sm:py-14"
      aria-labelledby="areas-heading"
    >
      <div className="site-container-narrow text-center">
        <h2
          id="areas-heading"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {areasSnippet.heading}
        </h2>
        <p className="aeo-answer mx-auto mt-3 max-w-prose text-[var(--text-body)] leading-relaxed text-muted">
          {areasSnippet.lead}{" "}
          <a
            href={PHONE_TEL}
            data-cta="areas-phone"
            className="tap-target inline-flex min-h-0 py-1 font-medium text-foreground underline underline-offset-2"
          >
            Call for availability in your city
          </a>
          .
        </p>
      </div>
    </section>
  );
}
