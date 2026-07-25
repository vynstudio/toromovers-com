import Image from "next/image";
import { hero } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import { GOOGLE_RATING, PHONE_DISPLAY, PHONE_TEL, REVIEW_COUNT } from "@/lib/site";

export function Hero() {
  return (
    <section
      className="hero-wash relative overflow-hidden pb-6 pt-[5.25rem] sm:pb-24 sm:pt-32 lg:min-h-[100svh] lg:pb-16 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-5 px-3.5 sm:gap-10 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* White content card — first on mobile (matches reference) */}
        <div className="order-1 lg:order-2 lg:pl-4">
          <div className="card-elevated rounded-[1.35rem] bg-white px-5 py-7 sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h1
              id="hero-heading"
              className="whitespace-pre-line text-[2.15rem] font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer mt-4 max-w-md text-[14.5px] leading-relaxed text-muted sm:mt-6 sm:text-base">
              {hero.lede}
            </p>
            <a
              href={hero.ctaHref}
              data-cta="hero-discover"
              className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-md border border-foreground/20 px-4 py-2.5 text-[13.5px] tracking-tight text-foreground transition hover:border-navy hover:text-navy sm:mt-8 sm:px-5 sm:py-3 sm:text-sm"
            >
              {hero.cta}
              <IconArrow />
            </a>
            {/* Trust micro-line for conversion + AEO */}
            <p className="mt-5 text-xs text-muted/90 sm:mt-6 sm:text-sm">
              <span className="font-medium text-foreground">{GOOGLE_RATING}★</span> on Google
              {" · "}
              {REVIEW_COUNT}+ reviews
              {" · "}
              <a href={PHONE_TEL} data-cta="hero-phone" className="underline underline-offset-2">
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        {/* Product visual — below card on mobile, left on desktop */}
        <div className="relative order-2 mx-auto w-full max-w-lg lg:order-1 lg:max-w-none">
          <div className="img-card relative aspect-[5/4] w-full overflow-hidden bg-white/40 sm:aspect-[4/5] lg:aspect-[5/5.2] lg:bg-transparent">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-center sm:object-contain lg:drop-shadow-[0_30px_60px_rgba(11,31,58,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
