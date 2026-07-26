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
 * Mobile-first hero — conversion before decoration.
 * Stacked CTAs on phone; side-by-side from 640px.
 * Desktop: 2-col layout from 1024px (min-width only).
 */
export function Hero() {
  return (
    <section
      className="hero-wash full-bleed relative w-full overflow-hidden pb-8 pt-2 sm:pb-16 lg:pb-24 lg:pt-4"
      aria-labelledby="hero-heading"
    >
      <div className="site-container-wide grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        {/* Copy first on all sizes for conversion priority */}
        <div className="order-1 w-full min-w-0 lg:order-2">
          <div className="card-elevated rounded-[1.25rem] bg-white px-5 py-7 sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14 xl:py-16">
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line text-foreground"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer fluid-lede mt-4 max-w-prose text-muted sm:mt-5">
              {hero.lede}
            </p>

            <div className="tap-stack mt-7 sm:mt-8">
              <a
                href={PHONE_TEL}
                data-cta="hero-call"
                className="btn-primary btn-fluid tap-target inline-flex w-full"
              >
                <span className="sm:hidden">Call now</span>
                <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                data-open-quote
                data-source="hero-quote"
                data-cta="hero-quote"
                className="btn-outline btn-fluid tap-target inline-flex w-full"
              >
                Get a free quote
                <IconArrow />
              </button>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted sm:mt-6 sm:text-sm">
              <span>
                <strong className="font-semibold text-foreground">
                  {GOOGLE_RATING}★
                </strong>{" "}
                Google
              </span>
              <span aria-hidden className="text-border">
                ·
              </span>
              <span>
                <strong className="font-semibold text-foreground">
                  {REVIEW_COUNT}+
                </strong>{" "}
                reviews
              </span>
              <span aria-hidden className="hidden text-border sm:inline">
                ·
              </span>
              <a
                href="#discover"
                data-cta="hero-discover"
                className="tap-target hidden min-h-0 py-1 underline underline-offset-2 sm:inline-flex"
              >
                {hero.cta}
              </a>
            </p>
          </div>
        </div>

        <div className="relative order-2 w-full min-w-0 lg:order-1">
          <div className="img-card relative aspect-[16/10] w-full sm:aspect-[4/3] lg:aspect-[5/4.6]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(11,31,58,0.16)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
