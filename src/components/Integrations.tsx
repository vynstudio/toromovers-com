import Image from "next/image";
import { integrations } from "@/lib/content";
import { IconArrow } from "@/components/icons";

export function Integrations() {
  return (
    <section className="bg-white pb-16 sm:pb-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="img-card relative aspect-[4/3] w-full bg-zinc-100">
            <Image
              src={integrations.image.src}
              alt={integrations.image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="lg:pl-4">
            <h2 className="text-3xl font-normal leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
              {integrations.title}
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted sm:text-base">
              {integrations.body}
            </p>
          </div>
        </div>

        <div className="mt-14 flex justify-center sm:mt-16">
          <a
            href={integrations.ctaHref}
            className="inline-flex items-center gap-2 rounded-md bg-navy px-7 py-3.5 text-sm font-medium tracking-tight text-white transition hover:bg-navy-mid"
          >
            {integrations.cta}
            <IconArrow className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
