type CityPoint = {
  label: string;
  x: number;
  y: number;
  /** Label anchor relative to the dot */
  anchor: "start" | "middle" | "end";
  dx: number;
  dy: number;
};

const HUB = { x: 420, y: 300 };

const CITIES: CityPoint[] = [
  { label: "Winter Park", x: 445, y: 248, anchor: "start", dx: 12, dy: -6 },
  { label: "Sanford", x: 462, y: 128, anchor: "middle", dx: 0, dy: -16 },
  { label: "Oviedo", x: 532, y: 222, anchor: "start", dx: 12, dy: 4 },
  { label: "Winter Garden", x: 298, y: 286, anchor: "end", dx: -12, dy: 4 },
  { label: "Clermont", x: 212, y: 248, anchor: "end", dx: -12, dy: -6 },
  { label: "Kissimmee", x: 436, y: 422, anchor: "middle", dx: 0, dy: 24 },
  { label: "St. Cloud", x: 508, y: 466, anchor: "start", dx: 12, dy: 6 },
  { label: "Lakeland", x: 132, y: 432, anchor: "end", dx: -12, dy: 6 },
];

/**
 * Schematic (not geo-accurate) Central Florida coverage map — Orlando hub
 * with spoke lines to each service city. Inline SVG: no map API/key, no
 * external request, brand-colored, scales crisp at any size.
 *
 * `preserveAspectRatio="meet"` (fit, not crop) so every city stays visible
 * regardless of the frame's aspect ratio, which differs between mobile and
 * desktop. Height is forced via inline style, not the `h-full` utility —
 * globals.css has an unlayered `svg { height: auto }` reset, and unlayered
 * CSS always beats Tailwind's `@layer utilities` classes regardless of
 * specificity, so `.h-full` silently loses to it here.
 */
export function CoverageMap() {
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 w-full"
      style={{ height: "100%", maxWidth: "none" }}
      role="img"
      aria-label="Map of Toro Movers' Central Florida service area: Orlando and nearby Kissimmee, Winter Park, Clermont, Sanford, Oviedo, Winter Garden, St. Cloud, and Lakeland"
    >
      <defs>
        <radialGradient id="coverageWash" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8102e" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#c8102e" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#c8102e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="800" height="600" fill="#eef1f5" />
      <circle cx={HUB.x} cy={HUB.y} r="360" fill="url(#coverageWash)" />

      {CITIES.map((c) => (
        <line
          key={`line-${c.label}`}
          x1={HUB.x}
          y1={HUB.y}
          x2={c.x}
          y2={c.y}
          stroke="#0a0a0a"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeDasharray="3 5"
          strokeLinecap="round"
        />
      ))}

      {CITIES.map((c) => (
        <g key={c.label}>
          <circle cx={c.x} cy={c.y} r="6.5" fill="#fff" stroke="#c8102e" strokeWidth="2.5" />
          <text
            x={c.x + c.dx}
            y={c.y + c.dy}
            textAnchor={c.anchor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontSize="17"
            fontWeight="600"
            fill="#0a0a0a"
          >
            {c.label}
          </text>
        </g>
      ))}

      {/* Orlando hub — drawn last so it sits above every spoke line */}
      <circle cx={HUB.x} cy={HUB.y} r="9" fill="#0a0a0a" />
      <circle cx={HUB.x} cy={HUB.y} r="14" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeOpacity="0.35" />
      <text
        x={HUB.x}
        y={HUB.y + 34}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#0a0a0a"
      >
        Orlando
      </text>
      <text
        x={HUB.x}
        y={HUB.y + 53}
        textAnchor="middle"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="0.06em"
        fill="#c8102e"
      >
        HQ
      </text>
    </svg>
  );
}
