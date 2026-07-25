import { closing } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export function ClosingCta() {
  return (
    <section id="quote" className="bg-foreground px-5 py-24 text-center text-white sm:px-8 sm:py-32">
      <div className="mx-auto max-w-3xl">
        <h2 className="whitespace-pre-line text-4xl font-normal leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          {closing.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/70 sm:text-base">
          {closing.body}
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 rounded-md border border-white/40 px-7 py-3.5 text-sm tracking-tight text-white transition hover:border-white hover:bg-white hover:text-foreground"
          >
            {closing.cta}
            <IconArrow />
          </a>
          <a
            href={PHONE_TEL}
            className="text-sm text-white/60 transition hover:text-white"
          >
            or call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}
