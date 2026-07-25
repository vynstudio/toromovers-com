import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, HOURS_LABEL } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      id="quote"
      className="full-bleed w-full bg-foreground px-[var(--container-pad)] py-14 text-center text-white sm:py-20 lg:py-28"
      aria-labelledby="closing-heading"
    >
      <div className="site-container-narrow">
        <h2
          id="closing-heading"
          className="fluid-display whitespace-pre-line text-white"
        >
          {closing.title}
        </h2>
        <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-prose text-white/70 sm:mt-6">
          {closing.body}
        </p>

        <div className="tap-stack mt-8 justify-center sm:mt-10">
          <a
            href={PHONE_TEL}
            data-cta="closing-phone"
            className="btn-fluid tap-target inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 bg-white px-7 py-3.5 text-sm font-medium tracking-tight text-foreground transition hover:bg-white/90"
          >
            Call {PHONE_DISPLAY}
          </a>
          <a
            href={PHONE_TEL}
            data-cta="closing-secondary"
            className="btn-fluid tap-target inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm tracking-tight text-white transition hover:border-white hover:bg-white/10"
          >
            {closing.cta}
            <IconArrow />
          </a>
        </div>
        <p className="mt-5 text-xs text-white/40">{HOURS_LABEL}</p>
      </div>
    </section>
  );
}
