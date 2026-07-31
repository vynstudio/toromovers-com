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
 * Option A — proof band: photo + copy/CTAs as one unit.
 * Mobile: photo → copy → trust row → CTAs.
 * Desktop: 2-col, copy stack vertically centered to photo.
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
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
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
        <div className="customer-proof-stage">
          <div className="customer-proof-frame">
            <Image
              src={customerProof.image.src}
              alt={customerProof.image.alt}
              fill
              quality={70}
              sizes="(max-width: 639px) 92vw, (max-width: 1023px) 70vw, 440px"
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

          <p className="customer-proof-trust">
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="proof-google"
              className="customer-proof-trust-link"
            >
              <strong>{GOOGLE_RATING}★</strong> Google rated
            </a>
            <span className="customer-proof-trust-sep" aria-hidden>
              ·
            </span>
            <span>
              <strong>{MOVES_DONE}</strong> moves
            </span>
            <span className="customer-proof-trust-sep" aria-hidden>
              ·
            </span>
            <span>
              <strong>{SERVICE_REGION}</strong>
            </span>
          </p>

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
