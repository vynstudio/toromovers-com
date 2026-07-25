import Image from "next/image";
import { features } from "@/lib/content";

export function FeatureAlternating() {
  return (
    <section
      id="discover"
      className="bg-white py-10 sm:py-24 lg:py-28"
      aria-label="Discover Toro Movers"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-3.5 sm:gap-28 sm:px-8 lg:px-10">
        {features.map((f) => {
          const textFirstMobile = Boolean(f.mobileTextFirst);

          return (
            <article
              key={f.id}
              className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16"
            >
              {/* Image */}
              <div
                className={`img-card relative aspect-[4/3] w-full bg-zinc-100 ${
                  f.reverse
                    ? "lg:order-2"
                    : "lg:order-1"
                } ${textFirstMobile ? "order-2" : "order-1"}`}
              >
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Copy */}
              <div
                className={`${
                  f.reverse ? "lg:order-1 lg:pr-6" : "lg:order-2 lg:pl-6"
                } ${textFirstMobile ? "order-1" : "order-2"}`}
              >
                <h2 className="text-[1.75rem] font-normal leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
                  {f.title}
                </h2>
                <p className="aeo-answer mt-3 max-w-md text-[14.5px] leading-relaxed text-muted sm:mt-5 sm:text-base">
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
