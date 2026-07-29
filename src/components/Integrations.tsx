import Image from "next/image";
import { integrations } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Integrations() {
  return (
    <section
      className="full-bleed section-pad w-full bg-white"
      aria-labelledby="integrations-heading"
    >
      <div className="site-container-wide">
        <div className="grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          <div className="img-card relative order-1 aspect-[4/3] w-full lg:aspect-auto lg:h-[min(380px,46vh)] xl:h-[min(400px,42vh)]">
            <Image
              src={integrations.image.src}
              alt={integrations.image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1023px) 90vw, 40vw"
              quality={75}
              className={`object-cover ${integrations.image.position ?? "object-center"}`}
            />
          </div>
          <div className="order-2 w-full min-w-0 text-center lg:pl-2 lg:text-left">
            <h2 id="integrations-heading" className="fluid-h2 text-foreground">
              {integrations.title}
            </h2>
            <p className="aeo-answer fluid-lede mx-auto mt-3 max-w-prose text-muted sm:mt-5 lg:mx-0">
              {integrations.body}
            </p>
            <a
              href={integrations.ctaHref}
              data-cta="integrations"
              className="btn-primary btn-fluid tap-target mx-auto mt-7 inline-flex w-full max-w-sm sm:mt-8 sm:w-auto lg:mx-0 lg:max-w-none"
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
