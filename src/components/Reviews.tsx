"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  googleReviews,
  reviewsHeading,
  reviewsSub,
  type GoogleReview,
} from "@/lib/reviews";
import { GOOGLE_MAPS_REVIEWS_URL, GOOGLE_RATING } from "@/lib/site";

function Stars({ n }: { n: number }) {
  return (
    <span className="review-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

function GoogleG() {
  return (
    <span className="review-g" aria-hidden title="Google">
      <svg width="14" height="14" viewBox="0 0 48 48" fill="none">
        <path
          fill="#4285F4"
          d="M45.1 24.5c0-1.6-.1-3.1-.4-4.6H24v8.7h11.8c-.5 2.8-2.1 5.2-4.5 6.8v5.6h7.3c4.3-3.9 6.5-9.7 6.5-16.5z"
        />
        <path
          fill="#34A853"
          d="M24 46c6.1 0 11.2-2 14.9-5.5l-7.3-5.6c-2 1.4-4.6 2.2-7.6 2.2-5.9 0-10.8-4-12.6-9.3H3.9v5.8C7.6 41.1 15.2 46 24 46z"
        />
        <path
          fill="#FBBC05"
          d="M11.4 27.8c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-5.8H3.9A21.9 21.9 0 0 0 2 23.4c0 3.5.8 6.9 2 9.9l7.4-5.5z"
        />
        <path
          fill="#EA4335"
          d="M24 10.9c3.3 0 6.3 1.1 8.6 3.4l6.5-6.5C35.2 3.9 30.1 2 24 2 15.2 2 7.6 6.9 3.9 14.2l7.5 5.8C13.2 14.9 18.1 10.9 24 10.9z"
        />
      </svg>
    </span>
  );
}

function ReviewCard({
  review,
  expanded,
  onToggle,
}: {
  review: GoogleReview;
  expanded: boolean;
  onToggle: () => void;
}) {
  const long = review.text.length > 160;
  const shown =
    !long || expanded ? review.text : `${review.text.slice(0, 150).trim()}…`;

  return (
    <article className="review-card">
      <header className="review-card-head">
        <div className={`review-avatar review-avatar--${review.tone}`}>
          {review.initial}
          <GoogleG />
        </div>
        <div className="min-w-0">
          <p className="review-name">
            {review.name}
            <span
              className="review-verified"
              aria-label="Google review"
              title="Google review"
            >
              ✓
            </span>
          </p>
          <p className="review-when">{review.when}</p>
        </div>
      </header>
      <Stars n={review.rating} />
      <p className="review-text">{shown}</p>
      {long ? (
        <button type="button" className="review-more" onClick={onToggle}>
          {expanded ? "Show less" : "Read more"}
        </button>
      ) : null}
      {review.context ? (
        <p className="review-context">{review.context}</p>
      ) : null}
    </article>
  );
}

const AUTOPLAY_MS = 5500;

/**
 * Horizontal snap slider of every Google review on the site.
 * Heading focuses on *why* people leave 5★ — not review counts.
 */
export function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<Record<number, boolean>>({});
  const [paused, setPaused] = useState(false);
  const total = googleReviews.length;

  const updatePage = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".review-card");
    if (!card) return;
    const gap = 16;
    const w = card.offsetWidth + gap;
    if (w <= 0) return;
    const idx = Math.round(el.scrollLeft / w);
    setPage(Math.max(0, Math.min(total - 1, idx)));
  }, [total]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updatePage, { passive: true });
    updatePage();
    return () => el.removeEventListener("scroll", updatePage);
  }, [updatePage]);

  const scrollTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>(".review-card");
    const target = cards[Math.max(0, Math.min(cards.length - 1, i))];
    if (!target) return;
    const left =
      target.offsetLeft - (el.clientWidth - target.offsetWidth) / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, []);

  const go = useCallback(
    (dir: -1 | 1) => {
      const next = (page + dir + total) % total;
      scrollTo(next);
    },
    [page, total, scrollTo],
  );

  // Autoplay slider — pause on hover / focus / reduced motion
  useEffect(() => {
    if (paused || total < 2) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setPage((p) => {
        const next = (p + 1) % total;
        scrollTo(next);
        return next;
      });
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, total, scrollTo]);

  return (
    <section
      className="full-bleed section-pad w-full bg-[#f7f8fa]"
      aria-labelledby="reviews-heading"
      id="reviews"
    >
      <div className="site-container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <p className="review-eyebrow">
            <span aria-hidden>★★★★★</span> {GOOGLE_RATING} on Google
          </p>
          <h2 id="reviews-heading" className="fluid-h2 text-foreground">
            {reviewsHeading}
          </h2>
          <p className="review-sub mt-3 text-sm text-muted sm:text-base">
            {reviewsSub}{" "}
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline underline-offset-2"
              data-cta="reviews-google"
            >
              Read them on Google
            </a>
          </p>
        </div>

        <div
          className="review-slider mt-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          <button
            type="button"
            className="review-nav review-nav--prev"
            aria-label="Previous review"
            onClick={() => go(-1)}
          >
            ‹
          </button>

          <div
            ref={scrollerRef}
            className="review-scroller"
            tabIndex={0}
            aria-roledescription="carousel"
            aria-label="Customer Google reviews"
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") {
                e.preventDefault();
                go(1);
              } else if (e.key === "ArrowLeft") {
                e.preventDefault();
                go(-1);
              }
            }}
          >
            {googleReviews.map((r, i) => (
              <ReviewCard
                key={`${r.name}-${i}`}
                review={r}
                expanded={Boolean(expanded[i])}
                onToggle={() =>
                  setExpanded((prev) => ({ ...prev, [i]: !prev[i] }))
                }
              />
            ))}
          </div>

          <button
            type="button"
            className="review-nav review-nav--next"
            aria-label="Next review"
            onClick={() => go(1)}
          >
            ›
          </button>
        </div>

        <div className="review-dots" role="tablist" aria-label="Review slides">
          {googleReviews.map((r, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={page === i}
              aria-label={`Show review from ${r.name}`}
              className={`review-dot${page === i ? " is-active" : ""}`}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
