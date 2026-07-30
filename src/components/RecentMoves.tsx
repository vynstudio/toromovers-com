import Image from "next/image";
import {
  recentMovesHeading,
  recentMovesHome,
  recentMovesByService,
  type MoveShot,
} from "@/lib/recent-moves";
import { IconArrow } from "@/components/icons";

type RecentMovesProps = {
  items?: readonly MoveShot[];
  showAllLink?: boolean;
  variant?: "home" | "page";
};

/**
 * Real work photos — homepage strip or service-grouped gallery.
 * Each card interlinks to the matching service/city page.
 */
export function RecentMoves({
  items = recentMovesHome,
  showAllLink = true,
  variant = "home",
}: RecentMovesProps) {
  const isPage = variant === "page";
  const groups = isPage ? recentMovesByService() : null;

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
            {isPage ? "Recent work" : recentMovesHeading.title}
          </h2>
          <p className="aeo-answer recent-moves-lead text-muted">
            {recentMovesHeading.lead}
          </p>
        </header>

        {isPage && groups ? (
          <div className="recent-moves-groups">
            {groups.map((g) => (
              <div key={g.id} className="recent-moves-group">
                <div className="recent-moves-group-bar">
                  <h3 className="recent-moves-group-title">{g.label}</h3>
                  <a href={g.href} className="recent-moves-group-link">
                    {g.label} service <IconArrow />
                  </a>
                </div>
                <MoveGrid items={g.items} isPage />
              </div>
            ))}
          </div>
        ) : (
          <MoveGrid items={items} isPage={false} />
        )}

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

function MoveGrid({
  items,
  isPage,
}: {
  items: readonly MoveShot[];
  isPage: boolean;
}) {
  return (
    <ul
      className={`recent-moves-grid${isPage ? " recent-moves-grid--page" : ""}`}
      aria-label="Recent move photos"
    >
      {items.map((shot, i) => (
        <li key={shot.id} className="recent-moves-item">
          <a href={shot.href} className="recent-moves-card-link">
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
                  {shot.serviceLabel} · {shot.area}
                </span>
                {isPage ? (
                  <p className="recent-moves-cap-desc aeo-answer">
                    {shot.description}
                  </p>
                ) : null}
              </figcaption>
            </figure>
          </a>
        </li>
      ))}
    </ul>
  );
}
