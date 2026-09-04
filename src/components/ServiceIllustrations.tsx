/**
 * Flat service illustrations — authored in-house so there is no stock licence
 * to track and the palette is exactly the brand's. Inline SVG (not <Image>)
 * so they inherit currentColor and need no next/image SVG allowances.
 *
 * Shared 320x200 viewBox keeps all three optically the same size in the card.
 */

import Image from "next/image";

const NAVY = "#1B2A52";
const NAVY_DEEP = "#101C3A";
const RED = "#C8102E";
const PALE = "#DCE3F2";
const PALE_2 = "#C7D2E9";
const SAND = "#E3C08D";
const SAND_DK = "#CBA269";
const WHITE = "#FFFFFF";

type Props = { className?: string };

const base = {
  viewBox: "0 0 320 200",
  xmlns: "http://www.w3.org/2000/svg",
  role: "presentation" as const,
  focusable: "false" as const,
  "aria-hidden": true,
};

/** Local moving — box truck at the curb of a house. */
export function IllustrationLocal({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="160" cy="150" rx="128" ry="40" fill={PALE} />
      {/* house */}
      <path d="M62 96 L104 64 L146 96 Z" fill={NAVY} />
      <rect x="72" y="96" width="64" height="52" rx="3" fill={WHITE} />
      <rect x="96" y="118" width="16" height="30" rx="2" fill={RED} />
      <rect x="79" y="104" width="13" height="13" rx="2" fill={PALE_2} />
      <rect x="116" y="104" width="13" height="13" rx="2" fill={PALE_2} />
      {/* truck body */}
      <rect x="152" y="92" width="78" height="46" rx="4" fill={WHITE} />
      <rect x="152" y="92" width="78" height="12" rx="4" fill={PALE_2} />
      <rect x="160" y="112" width="62" height="5" rx="2.5" fill={RED} />
      {/* cab */}
      <path d="M230 104 h22 l16 20 v14 h-38 Z" fill={NAVY} />
      <path d="M236 110 h14 l11 14 h-25 Z" fill={PALE_2} />
      {/* chassis + wheels */}
      <rect x="150" y="138" width="120" height="6" rx="3" fill={NAVY_DEEP} />
      <circle cx="178" cy="148" r="11" fill={NAVY_DEEP} />
      <circle cx="178" cy="148" r="4.5" fill={PALE} />
      <circle cx="248" cy="148" r="11" fill={NAVY_DEEP} />
      <circle cx="248" cy="148" r="4.5" fill={PALE} />
      {/* boxes waiting on the kerb, clear of the house */}
      <rect x="34" y="126" width="22" height="22" rx="2" fill={SAND} />
      <rect x="34" y="135" width="22" height="3" fill={SAND_DK} />
      <rect x="40" y="108" width="18" height="18" rx="2" fill={SAND_DK} />
    </svg>
  );
}

/** Long distance — truck running a dashed route between two pins. */
export function IllustrationLongDistance({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="160" cy="152" rx="128" ry="38" fill={PALE} />
      {/* route */}
      <path
        d="M44 132 C 96 132, 96 84, 150 84 S 226 120, 276 84"
        fill="none"
        stroke={PALE_2}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M44 132 C 96 132, 96 84, 150 84 S 226 120, 276 84"
        fill="none"
        stroke={WHITE}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="8 10"
      />
      {/* origin pin */}
      <path d="M52 96 a13 13 0 1 1 26 0 c0 10 -13 24 -13 24 S52 106 52 96 Z" fill={RED} />
      <circle cx="65" cy="96" r="5" fill={WHITE} />
      {/* destination pin */}
      <path d="M250 52 a13 13 0 1 1 26 0 c0 10 -13 24 -13 24 S250 62 250 52 Z" fill={NAVY} />
      <circle cx="263" cy="52" r="5" fill={WHITE} />
      {/* truck mid-route */}
      <g transform="translate(118 84)">
        <rect x="0" y="0" width="52" height="30" rx="4" fill={WHITE} />
        <rect x="0" y="0" width="52" height="8" rx="4" fill={PALE_2} />
        <rect x="6" y="14" width="40" height="4" rx="2" fill={RED} />
        <path d="M52 8 h16 l12 14 v8 h-28 Z" fill={NAVY} />
        <path d="M57 12 h9 l8 10 h-17 Z" fill={PALE_2} />
        <rect x="-2" y="30" width="84" height="5" rx="2.5" fill={NAVY_DEEP} />
        <circle cx="18" cy="38" r="8.5" fill={NAVY_DEEP} />
        <circle cx="18" cy="38" r="3.5" fill={PALE} />
        <circle cx="64" cy="38" r="8.5" fill={NAVY_DEEP} />
        <circle cx="64" cy="38" r="3.5" fill={PALE} />
      </g>
      {/* speed marks */}
      <rect x="86" y="96" width="20" height="4" rx="2" fill={PALE_2} />
      <rect x="76" y="108" width="13" height="4" rx="2" fill={PALE_2} />
    </svg>
  );
}

/** Labor only — crew hand-truck stacked with the customer's boxes. */
export function IllustrationLaborOnly({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="160" cy="154" rx="128" ry="36" fill={PALE} />
      {/* stacked boxes on the dolly */}
      <rect x="112" y="56" width="62" height="42" rx="3" fill={SAND} />
      <rect x="112" y="72" width="62" height="4" fill={SAND_DK} />
      <rect x="138" y="56" width="10" height="42" fill={SAND_DK} opacity="0.55" />
      <rect x="106" y="98" width="74" height="44" rx="3" fill={SAND_DK} />
      <rect x="106" y="116" width="74" height="4" fill={SAND} opacity="0.6" />
      <rect x="137" y="98" width="10" height="44" fill={SAND} opacity="0.45" />
      {/* dolly frame */}
      <rect x="186" y="40" width="8" height="106" rx="4" fill={NAVY} />
      <rect x="96" y="140" width="98" height="8" rx="4" fill={NAVY} />
      <path d="M186 52 h-14 a6 6 0 0 0 0 12 h14 Z" fill={NAVY_DEEP} />
      <circle cx="196" cy="152" r="13" fill={NAVY_DEEP} />
      <circle cx="196" cy="152" r="5" fill={PALE} />
      {/* crew figure — navy torso, not white: a white shirt disappears against
          the card's pale panel and leaves the head and legs floating. */}
      <circle cx="234" cy="64" r="12" fill={SAND} />
      <path d="M222 62 a12 12 0 0 1 24 0 Z" fill={RED} />
      <rect x="243" y="60" width="7" height="4" rx="2" fill={RED} />
      {/* torso */}
      <path d="M226 78 h16 a11 11 0 0 1 11 11 v27 h-38 V89 a11 11 0 0 1 11 -11 Z" fill={NAVY} />
      {/* arm reaching for the dolly handle */}
      <path
        d="M226 88 C 214 92, 204 96, 197 102"
        fill="none"
        stroke={NAVY}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="196" cy="103" r="5" fill={SAND} />
      {/* legs + shoes */}
      <rect x="226" y="114" width="12" height="32" rx="5" fill={NAVY_DEEP} />
      <rect x="242" y="114" width="12" height="32" rx="5" fill={NAVY_DEEP} />
      <rect x="221" y="144" width="19" height="7" rx="3.5" fill={NAVY} />
      <rect x="240" y="144" width="19" height="7" rx="3.5" fill={NAVY} />
    </svg>
  );
}

/** Proof / about — crew with a customer at a local house. */
export function IllustrationCrew({ className }: Props) {
  return (
    <svg {...base} className={className}>
      <ellipse cx="160" cy="154" rx="128" ry="36" fill={PALE} />
      <path d="M38 108 L78 76 L118 108 Z" fill={NAVY} />
      <rect x="48" y="108" width="60" height="42" rx="3" fill={WHITE} />
      <rect x="70" y="124" width="16" height="26" rx="2" fill={RED} />
      <rect x="54" y="114" width="12" height="12" rx="2" fill={PALE_2} />
      <rect x="90" y="114" width="12" height="12" rx="2" fill={PALE_2} />
      <rect x="148" y="98" width="70" height="40" rx="4" fill={WHITE} />
      <rect x="148" y="98" width="70" height="10" rx="4" fill={PALE_2} />
      <rect x="156" y="116" width="54" height="5" rx="2.5" fill={RED} />
      <path d="M218 108 h20 l14 18 v12 h-34 Z" fill={NAVY} />
      <rect x="146" y="138" width="108" height="6" rx="3" fill={NAVY_DEEP} />
      <circle cx="170" cy="148" r="10" fill={NAVY_DEEP} />
      <circle cx="170" cy="148" r="4" fill={PALE} />
      <circle cx="236" cy="148" r="10" fill={NAVY_DEEP} />
      <circle cx="236" cy="148" r="4" fill={PALE} />
      <circle cx="268" cy="92" r="11" fill={SAND} />
      <path d="M257 90 a11 11 0 0 1 22 0 Z" fill={NAVY} />
      <path d="M256 104 h24 a9 9 0 0 1 9 9 v22 h-42 v-22 a9 9 0 0 1 9 -9 Z" fill={NAVY} />
      <rect x="258" y="134" width="10" height="22" rx="4" fill={NAVY_DEEP} />
      <rect x="272" y="134" width="10" height="22" rx="4" fill={NAVY_DEEP} />
      <circle cx="236" cy="100" r="10" fill={SAND} />
      <path d="M226 98 a10 10 0 0 1 20 0 Z" fill={RED} />
      <path d="M226 112 h20 a8 8 0 0 1 8 8 v18 h-36 v-18 a8 8 0 0 1 8 -8 Z" fill={WHITE} />
      <rect x="228" y="138" width="9" height="18" rx="4" fill={NAVY_DEEP} />
      <rect x="240" y="138" width="9" height="18" rx="4" fill={NAVY_DEEP} />
    </svg>
  );
}

export const SERVICE_ILLUSTRATIONS = {
  local: IllustrationLocal,
  "long-distance": IllustrationLongDistance,
  "labor-only": IllustrationLaborOnly,
  crew: IllustrationCrew,
} as const;

export type ServiceIllustrationKey =
  | "local"
  | "long-distance"
  | "labor-only"
  | "packing"
  | "access"
  | "crew";

export const VECTOR_ART: Record<ServiceIllustrationKey, string> = {
  local: "/images/vectors/local.webp",
  "long-distance": "/images/vectors/long-distance.webp",
  "labor-only": "/images/vectors/labor-only.webp",
  packing: "/images/vectors/packing.webp",
  access: "/images/vectors/access.webp",
  crew: "/images/vectors/local.webp",
};

const CYCLE: ServiceIllustrationKey[] = [
  "local",
  "long-distance",
  "labor-only",
  "packing",
  "access",
];

export function illustrationKeyAt(i: number): ServiceIllustrationKey {
  const n = CYCLE.length;
  return CYCLE[((i % n) + n) % n];
}

/** High-end vector illustration in the photo frame. */
export function VectorSlot({
  kind = "local",
  className = "",
}: {
  kind?: ServiceIllustrationKey;
  className?: string;
}) {
  return (
    <div className={`vec-slot ${className}`.trim()}>
      <Image
        src={VECTOR_ART[kind]}
        alt=""
        fill
        sizes="(max-width: 1023px) 100vw, 50vw"
        quality={80}
        className="object-cover object-center"
      />
    </div>
  );
}
