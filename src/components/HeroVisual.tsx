"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { hero } from "@/lib/content";

/**
 * Mobile: static hero image (no video download).
 * Desktop (lg+): muted autoplay loop — video only mounts when viewport qualifies.
 */
export function HeroVisual() {
  const [showDesktopVideo, setShowDesktopVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setShowDesktopVideo(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return (
    <div className="img-card relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4.6]">
      {/* Mobile + LCP fallback; sits under the video on desktop */}
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(11,31,58,0.16)]"
      />
      {showDesktopVideo ? (
        <video
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(11,31,58,0.16)]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={hero.image.src}
          aria-label={hero.image.alt}
        >
          <source src={hero.video.src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
