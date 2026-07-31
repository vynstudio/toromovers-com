/**
 * Desktop-only Orlando skyline layer behind the hero card.
 * Implemented as CSS background (see .hero-skyline) so phones never download it.
 */
export function HeroSkyline() {
  return (
    <div className="hero-skyline" aria-hidden>
      <div className="hero-skyline-veil" />
    </div>
  );
}
