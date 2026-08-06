"use client";

import { useEffect, useRef, useState } from "react";
import { IconArrow } from "@/components/icons";
import { SplitBand } from "@/components/SplitBand";
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
 * Proof split-band — same size/frame as every other section.
 */
export function CustomerProof() {
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={visible ? "is-visible" : undefined}>
      <SplitBand
        id="proof"
        soft
        reverse={customerProof.reverse}
        image={customerProof.image}
        aria-labelledby="proof-heading"
      >
        <p className="split-band-eyebrow">{customerProof.eyebrow}</p>
        <h2 id="proof-heading" className="split-band-title">
          {customerProof.title}
        </h2>
        <p className="aeo-answer split-band-lede text-muted">
          {customerProof.lede}
        </p>

        <ul className="customer-proof-stats" aria-label="Trust signals">
          <li className="customer-proof-stat">
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="proof-google"
              className="customer-proof-stat-link"
            >
              <span className="customer-proof-stat-value">
                {GOOGLE_RATING}★
              </span>
              <span className="customer-proof-stat-label">on Google</span>
            </a>
          </li>
          <li className="customer-proof-stat">
            <span className="customer-proof-stat-value">{MOVES_DONE}</span>
            <span className="customer-proof-stat-label">Orlando moves</span>
          </li>
          <li className="customer-proof-stat">
            <span className="customer-proof-stat-value">EN · ES</span>
            <span className="customer-proof-stat-label">bilingual movers</span>
          </li>
          <li className="customer-proof-stat">
            <span className="customer-proof-stat-value">Family</span>
            <span className="customer-proof-stat-label">
              owned · {SERVICE_REGION}
            </span>
          </li>
        </ul>

        <div className="split-band-actions">
          <a
            href={PHONE_TEL}
            data-cta="proof-call"
            className="btn-primary btn-fluid tap-target inline-flex"
          >
            <span className="sm:hidden">Call now</span>
            <span className="hidden sm:inline">Call {PHONE_DISPLAY}</span>
          </a>
          <button
            type="button"
            data-open-quote
            data-source="proof-quote"
            data-cta="proof-quote"
            className="btn-outline btn-fluid tap-target inline-flex"
          >
            {customerProof.ctaQuote}
            <IconArrow />
          </button>
        </div>
      </SplitBand>
    </div>
  );
}
