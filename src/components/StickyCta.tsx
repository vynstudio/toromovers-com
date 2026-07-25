"use client";

import { useEffect, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { IconArrow } from "@/components/icons";

/**
 * Mobile conversion bar — visible after light scroll, hidden near footer CTA.
 * Desktop: not shown (hero + closing CTAs handle conversion).
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const quote = document.getElementById("quote");
      const nearQuote =
        quote != null &&
        quote.getBoundingClientRect().top < window.innerHeight * 0.85;
      setVisible(y > 420 && !nearQuote);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-lg items-center gap-2 rounded-2xl bg-foreground p-2 shadow-[0_-8px_40px_rgba(0,0,0,0.25)]">
        <a
          href={PHONE_TEL}
          data-cta="sticky-phone"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 text-sm font-medium tracking-tight text-foreground"
        >
          Call {PHONE_DISPLAY}
        </a>
        <a
          href="#quote"
          data-cta="sticky-quote"
          className="flex min-h-12 flex-1 items-center justify-center gap-1.5 rounded-xl bg-navy px-3 text-sm font-medium tracking-tight text-white"
        >
          Get a quote
          <IconArrow className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
