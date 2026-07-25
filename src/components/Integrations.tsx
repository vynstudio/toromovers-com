import Image from "next/image";
import { integrations } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Integrations() {
  return (
    <section
      className="full-bleed w-full bg-white pb-12 sm:pb-20 lg:pb-24"
      aria-labelledby="integrations-heading"
    >
      <div className="site-container-wide">
        <div className="grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="img-card relative order-1 aspect-[4/3] w-full bg-zinc-100">
            <Image
              src={integrations.image.src}
              alt={integrations.image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="order-2 w-full min-w-0 lg:pl-4">
            <h2 id="integrations-heading" className="fluid-h2 text-foreground">
              {integrations.title}
            </h2>
            <p className="aeo-answer fluid-lede mt-3 max-w-prose text-muted sm:mt-5">
              {integrations.body}
            </p>
            <a
              href={integrations.ctaHref}
              data-cta="integrations"
              className="btn-fluid tap-target mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-medium tracking-tight text-white transition hover:bg-navy sm:mt-8 sm:w-auto sm:justify-start"
            >
              {integrations.cta}
              <IconArrow className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
