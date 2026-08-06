import Image from "next/image";
import type { ReactNode } from "react";

export type SplitBandImage = {
  src: string;
  alt: string;
  /** Tailwind object-position, e.g. object-[center_30%] */
  position?: string;
};

type SplitBandProps = {
  id?: string;
  /** Photo on the right on desktop (default: photo left) */
  reverse?: boolean;
  /** Soft gray band background */
  soft?: boolean;
  /** Required for desktop split; shown compact under content on mobile */
  image?: SplitBandImage | null;
  "aria-labelledby"?: string;
  "aria-label"?: string;
  className?: string;
  children: ReactNode;
};

/**
 * Mobile: one column — content first, optional compact photo under.
 * Desktop (lg+): classic split — photo | content (or reverse).
 */
export function SplitBand({
  id,
  reverse = false,
  soft = false,
  image,
  className = "",
  children,
  ...aria
}: SplitBandProps) {
  return (
    <section
      id={id}
      className={[
        "split-band full-bleed w-full",
        soft ? "split-band--soft" : "split-band--plain",
        reverse ? "split-band--reverse" : "",
        !image ? "split-band--no-photo" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...aria}
    >
      <div className="split-band-inner site-container-wide">
        {image ? (
          <div className="split-band-stage">
            <div className="split-band-frame">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                quality={70}
                loading="lazy"
                className={`object-cover ${image.position ?? "object-center"}`}
              />
            </div>
          </div>
        ) : null}
        <div className="split-band-content">{children}</div>
      </div>
    </section>
  );
}
