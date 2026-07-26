import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { QuoteForm } from "@/components/QuoteForm";
import { PHONE_DISPLAY, PHONE_TEL, HOURS_LABEL } from "@/lib/site";

/**
 * Final conversion block on a light background.
 * Dark surface is reserved for the footer only.
 */
export function ClosingCta() {
  return (
    <section
      id="quote"
      className="full-bleed section-pad w-full border-t border-border bg-white px-[var(--container-pad)]"
      aria-labelledby="closing-heading"
    >
      <div className="site-container-narrow">
        <div className="text-center">
          <h2
            id="closing-heading"
            className="fluid-display whitespace-pre-line text-foreground"
          >
            {closing.title}
          </h2>
          <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-prose text-muted sm:mt-5">
            {closing.body}
          </p>
        </div>

        <div className="tap-stack mt-8 justify-center sm:mt-10">
          <a
            href={PHONE_TEL}
            data-cta="closing-phone"
            className="btn-primary btn-fluid tap-target inline-flex w-full sm:w-auto"
          >
            Call {PHONE_DISPLAY}
          </a>
          <a
            href="#quote-form"
            data-cta="closing-form"
            className="btn-outline btn-fluid tap-target inline-flex w-full sm:w-auto"
          >
            Request a quote
            <IconArrow />
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-muted">{HOURS_LABEL}</p>

        <QuoteForm />
      </div>
    </section>
  );
}
