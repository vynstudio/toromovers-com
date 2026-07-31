"use client";

import { useEffect, useState } from "react";

type HeroSkylineProps = {
  /** Desktop-only background video (homepage). Never loaded on mobile. */
  withVideo?: boolean;
};

/**
 * Desktop-only hero backdrop.
 * - Always: poster/skyline CSS image (no mobile download of video)
 * - Optional video: injected only at lg+ after idle so LCP stays clean
 */
export function HeroSkyline({ withVideo = false }: HeroSkylineProps) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!withVideo) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    if (!mq.matches) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setVideoSrc("/videos/hero-desktop.mp4");
    };

    // Defer past first paint — poster shows first
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(enable, { timeout: 1800 });
    } else {
      timeoutId = setTimeout(enable, 600);
    }

    const onChange = () => {
      if (!mq.matches) {
        setVideoSrc(null);
      } else if (!cancelled) {
        enable();
      }
    };
    mq.addEventListener("change", onChange);

    return () => {
      cancelled = true;
      mq.removeEventListener("change", onChange);
      if (idleId != null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId != null) clearTimeout(timeoutId);
    };
  }, [withVideo]);

  return (
    <div className="hero-skyline" aria-hidden>
      {videoSrc ? (
        <video
          className="hero-skyline-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-video-poster.jpg"
          src={videoSrc}
        />
      ) : null}
      <div className="hero-skyline-veil" />
    </div>
  );
}
