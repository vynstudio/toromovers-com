import Image from "next/image";
import { designedForLife } from "@/lib/content";

export function DesignedForLife() {
  return (
    <section
      className="full-bleed relative w-full min-h-[40vh] overflow-hidden sm:min-h-[44vh] lg:min-h-[42vh] lg:max-h-[460px]"
      aria-labelledby="designed-heading"
    >
      <Image
        src={designedForLife.image.src}
        alt={designedForLife.image.alt}
        fill
        sizes="100vw"
        quality={72}
        className={`object-cover ${designedForLife.image.position ?? "object-center"}`}
      />
      <div className="absolute inset-0 bg-black/55" />
      <div className="site-container-wide relative flex min-h-[40vh] items-end pb-10 sm:min-h-[44vh] sm:pb-14 lg:min-h-[42vh] lg:pb-16">
        <div className="w-full max-w-2xl min-w-0 lg:max-w-3xl">
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
