import Image from "next/image";
import { whyBanner } from "@/lib/content";

export function WhyBanner() {
  return (
    <section id="why" className="relative min-h-[52vh] overflow-hidden sm:min-h-[58vh]">
      <Image
        src={whyBanner.image.src}
        alt={whyBanner.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/30 to-black/15" />
      <div className="relative flex min-h-[52vh] items-end px-6 pb-14 sm:min-h-[58vh] sm:px-12 sm:pb-16 lg:px-20">
        <h2 className="text-4xl font-normal tracking-tight text-white sm:text-5xl lg:text-6xl">
          {whyBanner.title}
        </h2>
      </div>
    </section>
  );
}
