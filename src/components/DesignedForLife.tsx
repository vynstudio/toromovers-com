import Image from "next/image";
import { designedForLife } from "@/lib/content";

export function DesignedForLife() {
  return (
    <section
      className="relative min-h-[52vh] overflow-hidden sm:min-h-[64vh]"
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
      <div className="relative flex min-h-[52vh] items-end px-5 pb-12 sm:min-h-[64vh] sm:px-12 sm:pb-20 lg:max-w-2xl lg:px-20">
        <div>
          <h2
            id="designed-heading"
            className="text-[1.85rem] font-normal tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {designedForLife.title}
          </h2>
          <p className="aeo-answer mt-3 max-w-lg text-[14.5px] leading-relaxed text-white/90 sm:mt-4 sm:text-base">
            {designedForLife.body}
          </p>
        </div>
      </div>
    </section>
  );
}
