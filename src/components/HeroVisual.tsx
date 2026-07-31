"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/content";

/**
 * Mobile: lightweight still (priority LCP).
 * Desktop: load hero MP4 only when in viewport and ≥1024px — never on phones.
 */
export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [showDesktopVideo, setShowDesktopVideo] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setShowDesktopVideo(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!showDesktopVideo || !rootRef.current) return;
    const el = rootRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setLoadVideo(true);
          io.disconnect();
        }
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [showDesktopVideo]);

  return (
    <div
      ref={rootRef}
      className="img-card relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3] lg:aspect-[5/4.6]"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        quality={60}
        sizes="(max-width: 1023px) 100vw, 42vw"
        className={`object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(0,0,0,0.14)] ${
          showDesktopVideo && loadVideo ? "lg:invisible" : ""
        }`}
      />
      {showDesktopVideo && loadVideo ? (
        <video
          className="absolute inset-0 z-[1] h-full w-full object-cover object-center lg:object-contain lg:drop-shadow-[0_32px_64px_rgba(0,0,0,0.14)]"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={hero.image.alt}
        >
          <source src={hero.video.src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
