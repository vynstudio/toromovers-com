import Image from "next/image";
import { designedForLife } from "@/lib/content";

export function DesignedForLife() {
  return (
    <section
      className="full-bleed relative w-full min-h-[52vh] overflow-hidden sm:min-h-[60vh] lg:min-h-[64vh]"
      aria-labelledby="designed-heading"
    >
      <Image
        src={designedForLife.image.src}
        alt={designedForLife.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="site-container-wide relative flex min-h-[52vh] items-end pb-12 sm:min-h-[60vh] sm:pb-16 lg:min-h-[64vh] lg:pb-20">
        <div className="w-full max-w-2xl min-w-0">
          <h2 id="designed-heading" className="fluid-h2 text-white">
            {designedForLife.title}
          </h2>
          <p className="aeo-answer fluid-lede mt-3 text-white/90 sm:mt-4">
            {designedForLife.body}
          </p>
        </div>
      </div>
    </section>
  );
}
