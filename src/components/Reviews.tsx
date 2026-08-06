import { googleReviews, type GoogleReview } from "@/lib/reviews";
import { GOOGLE_MAPS_REVIEWS_URL } from "@/lib/site";

/** Official multicolor Google “G” mark */
function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
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
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span className="rv-h-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden>
          ★
        </span>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <a
      href={GOOGLE_MAPS_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="rv-h-card"
      data-cta="review-google"
    >
      <header className="rv-h-card-head">
        <span className={`rv-h-avatar review-avatar--${review.tone}`}>
          {review.initial}
          <span className="rv-h-g-badge" title="Google">
            <GoogleG />
          </span>
        </span>
        <span className="rv-h-meta">
          <span className="rv-h-name">{review.name}</span>
          <span className="rv-h-verified">
            <GoogleG />
            Verified Google review
          </span>
        </span>
      </header>
      <Stars n={review.rating} />
      <p className="rv-h-text">{review.text}</p>
      {review.context ? (
        <span className="rv-h-context">{review.context}</span>
      ) : null}
    </a>
  );
}

/** Exactly 6 real GBP reviews — 2 rows × 3 cards */
const HOME_REVIEWS = googleReviews.slice(0, 6);

/**
 * Reviews — 2×3 card grid only (no headline).
 * Same locked section height; no scroll; cards link to Google.
 */
export function Reviews() {
  return (
    <section
      id="reviews"
      className="rv-h-band full-bleed w-full"
      aria-label="Verified Google customer reviews"
    >
      <div className="site-container-wide rv-h-inner">
        <ul className="rv-h-row" aria-label="Verified Google customer reviews">
          {HOME_REVIEWS.map((r, i) => (
            <li key={`${r.name}-${i}`} className="rv-h-item">
              <ReviewCard review={r} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
