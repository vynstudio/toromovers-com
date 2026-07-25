import Image from "next/image";
import { hero } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import {
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
} from "@/lib/site";

/**
 * Mobile-first hero:
 * 1. Value (H1 + lede)
 * 2. Primary conversion (Call + Quote) — full-width stacked on phone
 * 3. Trust microcopy
 * 4. Visual last on mobile (secondary)
 * Desktop: two-column enhance via min-width only.
 */
export function Hero() {
  return (
    <section
      className="hero-wash full-bleed relative w-full overflow-hidden pb-6 pt-[5.25rem] sm:pb-16 sm:pt-28 lg:min-h-[min(100svh,900px)] lg:pb-20 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      {/* Base: single column. Enhance: 2-col at 1024px */}
      <div className="site-container-wide grid w-full items-center gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        <div className="order-1 w-full min-w-0 lg:order-2">
          <div className="card-elevated rounded-[1.25rem] bg-white px-4 py-6 sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line text-foreground"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer fluid-lede mt-3 max-w-prose text-muted sm:mt-5">
              {hero.lede}
            </p>

            {/* Conversion stack — primary phone on mobile, no hover-only */}
            <div className="tap-stack mt-6 sm:mt-8">
              <a
                href={PHONE_TEL}
                data-cta="hero-call"
                className="btn-primary btn-fluid tap-target inline-flex w-full gap-2 sm:w-auto"
              >
                Call {PHONE_DISPLAY}
              </a>
              <a
                href="#quote"
                data-cta="hero-quote"
                className="btn-outline btn-fluid tap-target inline-flex w-full gap-2 sm:w-auto"
              >
                Get a free quote
                <IconArrow />
              </a>
            </div>

            <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted sm:mt-5 sm:text-sm">
              <span>
                <strong className="font-semibold text-foreground">
                  {GOOGLE_RATING}★
                </strong>{" "}
                Google
              </span>
              <span aria-hidden>·</span>
              <span>
                <strong className="font-semibold text-foreground">
                  {REVIEW_COUNT}+
                </strong>{" "}
                reviews
              </span>
              <span aria-hidden className="hidden sm:inline">
                ·
              </span>
              <a
                href={hero.ctaHref}
                data-cta="hero-discover"
                className="hidden underline underline-offset-2 sm:inline"
              >
                {hero.cta}
              </a>
            </p>
          </div>
        </div>

        <div className="relative order-2 w-full min-w-0 lg:order-1">
          <div className="img-card relative aspect-[16/10] w-full bg-white/50 sm:aspect-[4/3] lg:aspect-[5/5] lg:bg-transparent">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center lg:object-contain lg:drop-shadow-[0_30px_60px_rgba(11,31,58,0.18)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
