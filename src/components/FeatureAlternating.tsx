import Image from "next/image";
import { features } from "@/lib/content";

export function FeatureAlternating() {
  return (
    <section
      id="discover"
      className="full-bleed w-full bg-white py-12 sm:py-20 lg:py-28"
      aria-label="Discover Toro Movers"
    >
      <div className="site-container-wide flex flex-col gap-14 sm:gap-20 lg:gap-28">
        {features.map((f) => {
          const textFirstMobile = Boolean(f.mobileTextFirst);

          return (
            <article
              key={f.id}
              className="grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16"
            >
              <div
                className={`img-card relative aspect-[4/3] w-full bg-zinc-100 ${
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
                  f.reverse ? "lg:order-1 lg:pr-4" : "lg:order-2 lg:pl-4"
                } ${textFirstMobile ? "order-1" : "order-2"}`}
              >
                <h2 className="fluid-h2 text-foreground">{f.title}</h2>
                <p className="aeo-answer fluid-lede mt-3 max-w-prose text-muted sm:mt-5">
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
