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
 * Dense proof band: large photo + filled copy column
 * (stats, points, CTAs) — no empty dead zones.
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
      { threshold: 0.12, rootMargin: "0px 0px -4% 0px" },
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
      <div className="customer-proof-inner site-container-wide">
        <div className="customer-proof-stage">
          <div className="customer-proof-frame">
            <Image
              src={customerProof.image.src}
              alt={customerProof.image.alt}
              fill
              quality={72}
              sizes="(max-width: 639px) 94vw, (max-width: 1023px) 80vw, 48vw"
              className="customer-proof-img object-cover object-[center_18%]"
            />
            <div className="customer-proof-shine" aria-hidden />
          </div>
        </div>

        <div className="customer-proof-content">
          <p className="customer-proof-eyebrow">{customerProof.eyebrow}</p>
          <h2 id="proof-heading" className="customer-proof-title">
            {customerProof.title}
          </h2>
          <p className="aeo-answer customer-proof-lede text-muted">
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
                <span className="customer-proof-stat-label">Google rated</span>
              </a>
            </li>
            <li className="customer-proof-stat">
              <span className="customer-proof-stat-value">{MOVES_DONE}</span>
              <span className="customer-proof-stat-label">local moves</span>
            </li>
            <li className="customer-proof-stat">
              <span className="customer-proof-stat-value">EN · ES</span>
              <span className="customer-proof-stat-label">bilingual crew</span>
            </li>
            <li className="customer-proof-stat">
              <span className="customer-proof-stat-value">Local</span>
              <span className="customer-proof-stat-label">{SERVICE_REGION}</span>
            </li>
          </ul>

          <ul className="customer-proof-points">
            {customerProof.points.map((p) => (
              <li key={p.title} className="customer-proof-point">
                <span className="customer-proof-point-mark" aria-hidden>
                  ✓
                </span>
                <span>
                  <strong className="customer-proof-point-title">{p.title}</strong>
                  <span className="customer-proof-point-body text-muted">
                    {p.body}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="customer-proof-actions">
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
        </div>
      </div>
    </section>
  );
}
