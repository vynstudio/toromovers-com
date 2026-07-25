import Image from "next/image";
import { hero } from "@/lib/content";
import { IconArrow } from "@/components/icons";
import {
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
} from "@/lib/site";

export function Hero() {
  return (
    <section
      className="hero-wash full-bleed relative w-full overflow-hidden pb-8 pt-[5.5rem] sm:pb-20 sm:pt-32 lg:min-h-[min(100svh,920px)] lg:pb-20 lg:pt-36"
      aria-labelledby="hero-heading"
    >
      <div className="site-container-wide grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* White content card — first on mobile */}
        <div className="order-1 w-full min-w-0 lg:order-2">
          <div className="card-elevated rounded-[1.35rem] bg-white px-5 py-7 sm:rounded-[1.5rem] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h1
              id="hero-heading"
              className="fluid-h1 whitespace-pre-line text-foreground"
            >
              {hero.h1}
            </h1>
            <p className="aeo-answer fluid-lede mt-4 max-w-prose text-muted sm:mt-6">
              {hero.lede}
            </p>
            <a
              href={hero.ctaHref}
              data-cta="hero-discover"
              className="btn-fluid tap-target mt-6 inline-flex items-center gap-2 rounded-md border border-foreground/20 px-5 py-3 text-sm tracking-tight text-foreground transition hover:border-navy hover:text-navy sm:mt-8"
            >
              {hero.cta}
              <IconArrow />
            </a>
            <p className="mt-5 text-xs text-muted/90 sm:mt-6 sm:text-sm">
              <span className="font-medium text-foreground">
                {GOOGLE_RATING}★
              </span>{" "}
              on Google
              {" · "}
              {REVIEW_COUNT}+ reviews
              {" · "}
              <a
                href={PHONE_TEL}
                data-cta="hero-phone"
                className="underline underline-offset-2"
              >
                {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </div>

        {/* Product visual — fluid width, no fixed desktop cap */}
        <div className="relative order-2 w-full min-w-0 lg:order-1">
          <div className="img-card relative aspect-[5/4] w-full bg-white/40 sm:aspect-[4/3] lg:aspect-[5/5] lg:bg-transparent">
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
