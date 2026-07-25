import Image from "next/image";
import { hero } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Hero() {
  return (
    <section className="hero-wash relative min-h-[100svh] overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-32 lg:pt-36">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10">
        {/* Product-style visual (left) */}
        <div className="relative order-2 mx-auto w-full max-w-lg lg:order-1 lg:max-w-none">
          <div className="relative aspect-[4/5] w-full sm:aspect-[5/5.2]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-contain object-center drop-shadow-[0_30px_60px_rgba(11,31,58,0.18)]"
            />
          </div>
        </div>

        {/* White content card (right) */}
        <div className="order-1 lg:order-2 lg:pl-4">
          <div className="card-elevated rounded-[1.5rem] bg-white px-7 py-9 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <h1 className="whitespace-pre-line text-[2.5rem] font-normal leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]">
              {hero.h1}
            </h1>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              {hero.lede}
            </p>
            <a
              href={hero.ctaHref}
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-foreground/20 px-5 py-3 text-sm tracking-tight text-foreground transition hover:border-navy hover:text-navy"
            >
              {hero.cta}
              <IconArrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
