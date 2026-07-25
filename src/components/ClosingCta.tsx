import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, HOURS_LABEL } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      id="quote"
      className="full-bleed w-full bg-foreground px-[var(--container-pad)] py-16 text-center text-white sm:py-24 lg:py-32"
      aria-labelledby="closing-heading"
    >
      <div className="site-container-narrow">
        <h2
          id="closing-heading"
          className="fluid-display whitespace-pre-line text-white"
        >
          {closing.title}
        </h2>
        <p className="aeo-answer fluid-lede mx-auto mt-5 max-w-prose text-white/70 sm:mt-6">
          {closing.body}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={PHONE_TEL}
            data-cta="closing-phone"
            className="btn-fluid tap-target inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm tracking-tight text-white transition hover:border-white hover:bg-white hover:text-foreground"
          >
            {closing.cta}
            <IconArrow />
          </a>
          <a
            href={PHONE_TEL}
            data-cta="closing-phone-number"
            className="tap-target inline-flex items-center justify-center text-sm text-white/70 transition hover:text-white"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mt-5 text-xs text-white/40">{HOURS_LABEL}</p>
      </div>
    </section>
  );
}
