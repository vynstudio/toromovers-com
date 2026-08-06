"use client";

import { useEffect, useState } from "react";
import { PHONE_TEL } from "@/lib/site";
import { IconArrow } from "@/components/icons";

/**
 * Mobile sticky conversion bar — Call + Get quote (principal CTA).
 * Matches top nav pill colors (white shell, accent Call, outline Quote).
 * Appears when the mobile nav hides (past hero). Desktop: never shown.
 */
export function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const onScroll = () => {
      if (!mq.matches) {
        setVisible(false);
        return;
      }

      const hero = document.getElementById("hero");
      // Match Nav hide threshold so bars never stack
      const pastHero = hero
        ? hero.getBoundingClientRect().bottom < 48
        : window.scrollY > 120;

      const quote = document.getElementById("quote");
      const nearQuote =
        quote != null &&
        quote.getBoundingClientRect().top < window.innerHeight * 0.88;

      setVisible(pastHero && !nearQuote);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
    };
  }, []);

  return (
    <div
      className={`sticky-cta-bar fixed inset-x-0 bottom-0 w-full px-3 pt-3 transition-transform duration-300 md:hidden ${
        visible
          ? "is-visible translate-y-0"
          : "pointer-events-none translate-y-[120%]"
      }`}
      aria-hidden={!visible}
    >
      <div
        className="sticky-cta-shell"
        role="group"
        aria-label="Quick contact"
      >
        <a
          href={PHONE_TEL}
          data-cta="sticky-phone"
          className="btn-primary tap-target inline-flex"
        >
          <span className="sticky-cta-label">Call now</span>
        </a>
        <button
          type="button"
          data-open-quote
          data-source="sticky-quote"
          data-cta="sticky-quote"
          className="btn-outline tap-target inline-flex"
        >
          <span className="sticky-cta-label">Get quote</span>
          <IconArrow className="h-3.5 w-3.5 shrink-0" />
        </button>
      </div>
    </div>
  );
}
