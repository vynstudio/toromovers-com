import Image from "next/image";
import {
  recentMovesHeading,
  recentMovesHome,
  type MoveShot,
} from "@/lib/recent-moves";
import { IconArrow } from "@/components/icons";

type RecentMovesProps = {
  /** Full list for gallery page; defaults to homepage strip */
  items?: readonly MoveShot[];
  /** Show link to full gallery (homepage) */
  showAllLink?: boolean;
  /** denser grid on full page */
  variant?: "home" | "page";
};

/**
 * DID-style Recent Moves image grid — SEO alts + captions.
 */
export function RecentMoves({
  items = recentMovesHome,
  showAllLink = true,
  variant = "home",
}: RecentMovesProps) {
  const isPage = variant === "page";

  return (
    <section
      id="recent-moves"
      className={`recent-moves full-bleed section-pad w-full${
        isPage ? " recent-moves--page" : ""
      }`}
      aria-labelledby="recent-moves-heading"
    >
      <div className="site-container">
        <header className="recent-moves-head">
          <p className="recent-moves-eyebrow">{recentMovesHeading.eyebrow}</p>
          <h2
            id="recent-moves-heading"
            className="fluid-h2 text-foreground"
          >
            {recentMovesHeading.title}
          </h2>
          <p className="aeo-answer recent-moves-lead text-muted">
            {recentMovesHeading.lead}
          </p>
        </header>

        <ul
          className={`recent-moves-grid${isPage ? " recent-moves-grid--page" : ""}`}
          aria-label="Recent move photos"
        >
          {items.map((shot, i) => (
            <li key={shot.id} className="recent-moves-item">
              <figure className="recent-moves-card">
                <div className="recent-moves-frame">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes={
                      isPage
                        ? "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    }
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
                <figcaption className="recent-moves-cap">
                  <span className="recent-moves-cap-title">{shot.title}</span>
                  <span className="recent-moves-cap-meta">
                    {shot.service} · {shot.area}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {showAllLink ? (
          <div className="recent-moves-cta">
            <a
              href={recentMovesHeading.ctaHref}
              className="btn-outline btn-fluid tap-target inline-flex"
              data-cta="recent-moves-all"
            >
              {recentMovesHeading.cta}
              <IconArrow />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
