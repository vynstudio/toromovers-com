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
 * Desktop: poster first (preloaded) + lazy video; mobile: light wash only.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="hero-wash hero-with-skyline full-bleed relative w-full overflow-hidden pb-4 pt-2 sm:pb-12 sm:pt-4 lg:py-16"
      aria-labelledby="hero-heading"
    >
      <link
        rel="preload"
        as="image"
        href="/images/hero-video-poster.webp"
        type="image/webp"
        media="(min-width: 1024px)"
        fetchPriority="high"
      />
      <HeroSkyline withVideo />

      <div className="site-container-wide relative z-[1] flex w-full flex-1 items-center justify-center">
        <div className="mx-auto w-full max-w-3xl">
          <div className="card-elevated rounded-[1.25rem] border border-white/40 bg-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl px-5 py-7 text-center sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:bg-white/45 lg:px-14 lg:py-14">
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line font-semibold tracking-tight text-black [text-shadow:0_1px_0_rgba(255,255,255,0.55)]"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-prose font-medium text-neutral-900 [text-shadow:0_1px_0_rgba(255,255,255,0.4)] sm:mt-5">
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
                className="btn-outline btn-fluid tap-target inline-flex w-full !border-neutral-900 !bg-white/80 !text-neutral-900 backdrop-blur-sm"
              >
                Get a free quote
                <IconArrow />
              </button>
            </div>

            <p className="mt-5 text-xs font-medium text-neutral-800 sm:mt-6 sm:text-sm">
              <strong className="font-bold text-black">
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
