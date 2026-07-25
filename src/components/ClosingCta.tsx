import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL, HOURS_LABEL } from "@/lib/site";

export function ClosingCta() {
  return (
    <section
      id="quote"
      className="bg-foreground px-5 py-16 text-center text-white sm:px-8 sm:py-32"
      aria-labelledby="closing-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="closing-heading"
          className="whitespace-pre-line text-[2rem] font-normal leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {closing.title}
        </h2>
        <p className="aeo-answer mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/70 sm:mt-6 sm:text-base">
          {closing.body}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
          <a
            href={PHONE_TEL}
            data-cta="closing-phone"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm tracking-tight text-white transition hover:border-white hover:bg-white hover:text-foreground"
          >
            {closing.cta}
            <IconArrow />
          </a>
          <a
            href={PHONE_TEL}
            data-cta="closing-phone-number"
            className="text-sm text-white/70 transition hover:text-white"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mt-5 text-xs text-white/40">{HOURS_LABEL}</p>
      </div>
    </section>
  );
}
