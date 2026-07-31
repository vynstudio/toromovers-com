import { HeroVisual } from "@/components/HeroVisual";
import { IconArrow } from "@/components/icons";
import {
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
} from "@/lib/site";

type CityHeroProps = {
  badge: string;
  h1: string;
  lede: string;
  /** Anchor for secondary in-page link (default first content block). */
  discoverHref?: string;
  discoverLabel?: string;
  source?: string;
};

/**
 * Homepage hero shell — same wash, card, video, CTAs.
 * Only copy differs per city.
 */
export function CityHero({
  badge,
  h1,
  lede,
  discoverHref = "#about",
  discoverLabel = "See services",
  source = "city-hero",
}: CityHeroProps) {
  return (
    <section
      id="hero"
      className="hero-wash full-bleed relative w-full overflow-hidden pb-8 pt-2 sm:pb-16 lg:pb-24 lg:pt-4"
      aria-labelledby="hero-heading"
    >
      <div className="site-container-wide grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        <div className="order-1 w-full min-w-0 lg:order-2">
          <div className="card-elevated rounded-[1.25rem] bg-white px-5 py-7 text-center sm:rounded-[1.5rem] sm:px-10 sm:py-12 sm:text-left lg:px-12 lg:py-14 xl:px-14 xl:py-16">
            <p className="city-hero-badge mx-auto mb-3 sm:mx-0">{badge}</p>
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line text-foreground"
            >
              {h1}
            </h1>
            <p className="aeo-answer fluid-lede mx-auto mt-4 max-w-prose text-muted sm:mx-0 sm:mt-5">
              {lede}
            </p>

            <div className="tap-stack mx-auto mt-7 max-w-sm sm:mx-0 sm:mt-8 sm:max-w-none">
              <a
                href={PHONE_TEL}
                data-cta={`${source}-call`}
                className="btn-primary btn-fluid tap-target inline-flex w-full"
              >
                <span className="sm:hidden">Call now</span>
                <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
              </a>
              <button
                type="button"
                data-open-quote
                data-source={source}
                data-cta={`${source}-quote`}
                className="btn-outline btn-fluid tap-target inline-flex w-full"
              >
                Get a free quote
                <IconArrow />
              </button>
            </div>

            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs text-muted sm:mt-6 sm:justify-start sm:text-sm">
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
                href={discoverHref}
                data-cta={`${source}-discover`}
                className="tap-target hidden min-h-0 py-1 underline underline-offset-2 sm:inline-flex"
              >
                {discoverLabel}
              </a>
            </p>
          </div>
        </div>

        {/* Image desktop only — copy/CTAs first on mobile */}
        <div className="relative order-2 hidden w-full min-w-0 lg:order-1 lg:block">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
