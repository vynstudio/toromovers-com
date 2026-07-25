import Image from "next/image";
import { designedForLife } from "@/lib/content";

export function DesignedForLife() {
  return (
    <section className="relative min-h-[56vh] overflow-hidden sm:min-h-[64vh]">
      <Image
        src={designedForLife.image.src}
        alt={designedForLife.image.alt}
        fill
        sizes="100vw"
        className="object-cover object-[center_30%]"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative flex min-h-[56vh] items-end px-6 pb-14 sm:min-h-[64vh] sm:px-12 sm:pb-20 lg:max-w-2xl lg:px-20">
        <div>
          <h2 className="text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl">
            {designedForLife.title}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/85 sm:text-base">
            {designedForLife.body}
          </p>
        </div>
      </div>
    </section>
  );
}
