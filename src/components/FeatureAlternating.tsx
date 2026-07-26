import Image from "next/image";
import { features } from "@/lib/content";

export function FeatureAlternating() {
  return (
    <section
      id="discover"
      className="full-bleed section-pad w-full bg-white"
      aria-label="Discover Toro Movers"
    >
      <div className="site-container-wide flex flex-col gap-12 sm:gap-16 lg:gap-24">
        {features.map((f) => {
          const textFirstMobile = Boolean(f.mobileTextFirst);

          return (
            <article
              key={f.id}
              className="grid w-full items-center gap-5 sm:gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-16"
            >
              <div
                className={`img-card relative aspect-[4/3] w-full ${
                  f.reverse ? "lg:order-2" : "lg:order-1"
                } ${textFirstMobile ? "order-2" : "order-1"}`}
              >
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div
                className={`w-full min-w-0 ${
                  f.reverse ? "lg:order-1" : "lg:order-2"
                } ${textFirstMobile ? "order-1" : "order-2"}`}
              >
                <h2 className="fluid-h2 text-foreground">{f.title}</h2>
                <p className="aeo-answer fluid-lede mt-3 max-w-prose text-muted sm:mt-4">
                  {f.body}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
