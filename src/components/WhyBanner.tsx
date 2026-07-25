import Image from "next/image";
import { whyBanner } from "@/lib/content";

export function WhyBanner() {
  return (
    <section
      id="why"
      className="relative min-h-[42vh] overflow-hidden sm:min-h-[58vh]"
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
      <div className="relative flex min-h-[42vh] items-end px-5 pb-10 sm:min-h-[58vh] sm:px-12 sm:pb-16 lg:px-20">
        <h2
          id="why-heading"
          className="text-[2rem] font-normal tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {whyBanner.title}
        </h2>
      </div>
    </section>
  );
}
