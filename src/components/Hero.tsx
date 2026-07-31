import { hero } from "@/lib/content";
import { HeroSkyline } from "@/components/HeroSkyline";
import { IconArrow } from "@/components/icons";
import {
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";

/**
 * Mobile-first conversion hero — copy + CTAs only.
 * Desktop: background video (lazy) + poster; mobile: light wash only.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="hero-wash hero-with-skyline full-bleed relative w-full overflow-hidden pb-6 pt-3 sm:pb-12 sm:pt-4 lg:py-16"
      aria-labelledby="hero-heading"
    >
      <HeroSkyline withVideo />

      <div className="site-container-wide relative z-[1] flex w-full flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-3xl">
          <div className="card-elevated rounded-[1.25rem] bg-white px-5 py-7 text-center sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line text-foreground"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-prose text-muted sm:mt-5">
              {hero.lede}
            </p>

            <div className="tap-stack mx-auto mt-7 max-w-sm sm:mt-8 sm:max-w-md">
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

            <p className="mt-5 text-xs text-muted sm:mt-6 sm:text-sm">
              <strong className="font-semibold text-foreground">
                {GOOGLE_RATING}★
              </strong>{" "}
              Google rated · Local Orlando crew
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
