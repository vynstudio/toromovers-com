import Image from "next/image";
import { whyBanner } from "@/lib/content";

export function WhyBanner() {
  return (
    <section
      id="why"
      className="full-bleed relative w-full min-h-[42vh] overflow-hidden sm:min-h-[52vh] lg:min-h-[58vh]"
      aria-labelledby="why-heading"
    >
      <Image
        src={whyBanner.image.src}
        alt={whyBanner.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/20" />
      <div className="site-container-wide relative flex min-h-[42vh] items-end pb-10 sm:min-h-[52vh] sm:pb-14 lg:min-h-[58vh] lg:pb-16">
        <h2 id="why-heading" className="fluid-display text-white">
          {whyBanner.title}
        </h2>
      </div>
    </section>
  );
}
