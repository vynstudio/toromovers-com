import Image from "next/image";
import { integrations } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Integrations() {
  return (
    <section className="bg-white pb-10 sm:pb-24" aria-labelledby="integrations-heading">
      <div className="mx-auto max-w-6xl px-3.5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mobile: image before text (matches reference flow) */}
          <div className="img-card relative order-1 aspect-[4/3] w-full bg-zinc-100 lg:order-1">
            <Image
              src={integrations.image.src}
              alt={integrations.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-2 lg:order-2 lg:pl-4">
            <h2
              id="integrations-heading"
              className="text-[1.75rem] font-normal leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]"
            >
              {integrations.title}
            </h2>
            <p className="aeo-answer mt-3 max-w-md text-[14.5px] leading-relaxed text-muted sm:mt-5 sm:text-base">
              {integrations.body}
            </p>

            {/* Mobile: solid black CTA under copy (matches reference) */}
            <a
              href={integrations.ctaHref}
              data-cta="integrations"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-medium tracking-tight text-white transition hover:bg-navy sm:mt-8 sm:w-auto sm:justify-start"
            >
              {integrations.cta}
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Desktop-only centered secondary placement if needed — hidden on mobile since CTA is inline */}
        <div className="mt-14 hidden justify-center sm:mt-16 lg:flex">
          <span className="sr-only">Continue to why Toro Movers</span>
        </div>
      </div>
    </section>
  );
}
