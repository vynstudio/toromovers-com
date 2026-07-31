import Image from "next/image";
import { hero } from "@/lib/content";

/**
 * Static hero still only — no video (faster LCP / less bandwidth).
 */
export function HeroVisual() {
  return (
    <div className="img-card relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4.6]">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        quality={60}
        sizes="(max-width: 1023px) 100vw, 42vw"
        className="object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(0,0,0,0.14)]"
      />
    </div>
  );
}
