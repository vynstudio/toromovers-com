"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IconArrow } from "@/components/icons";
import { customerProof } from "@/lib/content";
import {
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  MOVES_DONE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_REGION,
} from "@/lib/site";

/**
 * Standalone post-hero attention band — mobile-first photo + trust chips.
 * CSS motion only; IntersectionObserver gates the entrance.
 */
export function CustomerProof() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="proof"
      className={`customer-proof full-bleed${visible ? " is-visible" : ""}`}
      aria-labelledby="proof-heading"
    >
      <div className="customer-proof-inner site-container">
        <header className="customer-proof-copy">
          <p className="customer-proof-eyebrow">{customerProof.eyebrow}</p>
          <h2 id="proof-heading" className="customer-proof-title">
            {customerProof.title}
          </h2>
          <p className="aeo-answer customer-proof-lede text-muted">
            {customerProof.lede}
          </p>
        </header>

        <div className="customer-proof-stage">
          <div className="customer-proof-frame">
            <Image
              src={customerProof.image.src}
              alt={customerProof.image.alt}
              fill
              quality={70}
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 70vw, 480px"
              className="customer-proof-img object-cover object-[center_18%]"
            />
            <div className="customer-proof-shine" aria-hidden />
          </div>

          <ul className="customer-proof-chips" aria-label="Trust signals">
            <li className="customer-proof-chip customer-proof-chip--accent">
              <a
                href={GOOGLE_MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="proof-google"
              >
                <strong>{GOOGLE_RATING}★</strong> Google rated
              </a>
            </li>
            <li className="customer-proof-chip">
              <strong>{MOVES_DONE}</strong> moves
            </li>
            <li className="customer-proof-chip">
              <strong>{SERVICE_REGION}</strong>
            </li>
          </ul>
        </div>

        <div className="customer-proof-actions">
          <a
            href={PHONE_TEL}
            data-cta="proof-call"
            className="btn-primary btn-fluid tap-target inline-flex w-full sm:w-auto"
          >
            <span className="sm:hidden">Call now</span>
            <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            data-open-quote
            data-source="proof-quote"
            data-cta="proof-quote"
            className="btn-outline btn-fluid tap-target inline-flex w-full sm:w-auto"
          >
            {customerProof.ctaQuote}
            <IconArrow />
          </button>
        </div>
      </div>
    </section>
  );
}
