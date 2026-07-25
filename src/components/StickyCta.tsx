"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { IconArrow } from "@/components/icons";

/**
 * Always-reachable mobile conversion bar.
 * Hidden on md+ (desktop has nav + hero CTAs).
 * 48px+ targets, safe-area aware, no hover-only.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const quote = document.getElementById("quote");
      const nearQuote =
        quote != null &&
        quote.getBoundingClientRect().top < window.innerHeight * 0.9;
      // Show after hero scroll; hide when closing CTA is in view
      setVisible(y > 280 && !nearQuote);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 w-full px-3 safe-bottom pt-2 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="mx-auto flex w-full max-w-lg items-stretch gap-2 rounded-2xl bg-foreground p-2 shadow-[0_-8px_40px_rgba(0,0,0,0.28)]"
        role="group"
        aria-label="Quick contact"
      >
        <a
          href={PHONE_TEL}
          data-cta="sticky-phone"
          className="tap-target flex min-h-12 flex-1 items-center justify-center rounded-xl bg-white px-2 text-sm font-semibold tracking-tight text-foreground"
        >
          Call {PHONE_DISPLAY}
        </a>
        <a
          href="#quote"
          data-cta="sticky-quote"
          className="tap-target flex min-h-12 flex-1 items-center justify-center gap-1 rounded-xl bg-navy px-2 text-sm font-semibold tracking-tight text-white"
        >
          Quote
          <IconArrow className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
