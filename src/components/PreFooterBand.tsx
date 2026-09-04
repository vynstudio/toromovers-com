import { IconArrow } from "@/components/icons";
import {
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_REGION,
} from "@/lib/site";

/**
 * Soft bridge between the lead form and the dark footer.
 * Avoids an abrupt white → black cut.
 */
export function PreFooterBand() {
  return (
    <section
      className="pre-footer full-bleed w-full"
      aria-label="Next steps"
    >
      <div className="site-container pre-footer-inner">
        <div className="pre-footer-grid">
          <div className="pre-footer-block">
            <p className="pre-footer-label">Talk to a local crew</p>
            <a
              href={PHONE_TEL}
              className="pre-footer-link"
              data-cta="prefooter-phone"
            >
              Call {PHONE_DISPLAY}
              <IconArrow />
            </a>
            <p className="pre-footer-meta text-muted">
              Mon–Sat · 7:00 AM – 7:00 PM · English &amp; Spanish
            </p>
          </div>

          <div className="pre-footer-block">
            <p className="pre-footer-label">See real customer feedback</p>
            <a
              href={GOOGLE_MAPS_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="pre-footer-link"
              data-cta="prefooter-reviews"
            >
              {GOOGLE_RATING}★ Google reviews
              <IconArrow />
            </a>
            <p className="pre-footer-meta text-muted">
              Verified reviews from {SERVICE_REGION} moves
            </p>
          </div>

          <div className="pre-footer-block">
            <p className="pre-footer-label">Browse recent work</p>
            <a
              href="/orlando-movers-gallery"
              className="pre-footer-link"
              data-cta="prefooter-gallery"
            >
              Orlando movers gallery
              <IconArrow />
            </a>
            <p className="pre-footer-meta text-muted">
              Homes, apartments &amp; labor-only
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
