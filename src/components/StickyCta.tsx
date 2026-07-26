"use client";

import { useEffect, useState } from "react";
import { PHONE_TEL } from "@/lib/site";
import { IconArrow } from "@/components/icons";

/**
 * Mobile sticky conversion bar — Call + Quote.
 * Hidden from 768px up. Safe-area aware. No hover-only.
 * Short labels avoid overflow at 320px.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const quote = () => document.getElementById("quote");

    const onScroll = () => {
      const y = window.scrollY;
      const el = quote();
      const nearQuote =
        el != null && el.getBoundingClientRect().top < window.innerHeight * 0.88;
      setVisible(y > 240 && !nearQuote);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 w-full px-3 safe-bottom pt-2 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-[120%]"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="mx-auto flex w-full max-w-lg items-stretch gap-2 rounded-2xl bg-foreground p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.3)]"
        role="group"
        aria-label="Quick contact"
      >
        <a
          href={PHONE_TEL}
          data-cta="sticky-phone"
          className="tap-target flex min-h-12 flex-1 items-center justify-center rounded-xl bg-white px-3 text-sm font-semibold tracking-tight text-foreground"
        >
          <span className="sticky-cta-label">Call now</span>
        </a>
        <button
          type="button"
          data-open-quote
          data-source="sticky-quote"
          data-cta="sticky-quote"
          className="tap-target flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl bg-navy px-3 text-sm font-semibold tracking-tight text-white"
        >
          <span className="sticky-cta-label">Get quote</span>
          <IconArrow className="h-3.5 w-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
