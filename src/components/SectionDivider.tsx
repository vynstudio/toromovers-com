/**
 * Subtle horizontal divider between homepage bands.
 */
export function SectionDivider() {
  return (
    <div className="section-divider" aria-hidden>
      <span className="section-divider-line" />
      <span className="section-divider-dot" />
      <span className="section-divider-line" />
    </div>
  );
}
