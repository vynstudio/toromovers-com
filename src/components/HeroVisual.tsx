import Image from "next/image";
import { hero } from "@/lib/content";

/**
 * Desktop hero still only (parent hides below lg).
 * No priority — not LCP on mobile; avoids wasted mobile download.
 */
export function HeroVisual() {
  return (
    <div className="img-card relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[4/5] xl:aspect-[5/6]">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        quality={72}
        sizes="(max-width: 1023px) 0px, 42vw"
        className="object-cover object-[center_20%]"
      />
    </div>
  );
}
