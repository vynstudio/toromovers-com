import { SafeImage } from "@/components/SafeImage";
import { BUSINESS_NAME } from "@/lib/site";

type ToroLockupProps = {
  href?: string | null;
  className?: string;
};

/**
 * One lockup unit: official bull + TORO (#0A0A0A) + MOVERS (#E20613).
 * Bull sits in a fixed em box so global img { height: auto } cannot blow
 * the SVG up to its viewBox and clip the wordmark.
 */
export function ToroLockup({ href = "/", className = "" }: ToroLockupProps) {
  const inner = (
    <>
      <span className="funnel-lockup-mark" aria-hidden>
        <SafeImage
          src="/logos/toro-bull-black.svg"
          alt=""
          width={72}
          height={56}
          className="funnel-lockup-bull"
          unoptimized
          priority
          style={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </span>
      <span className="funnel-lockup-wordmark">
        <span className="text-[#0A0A0A]">TORO</span>
        <span className="ml-[0.18em] text-[#E20613]">MOVERS</span>
      </span>
    </>
  );

  const classes = `funnel-lockup ${className}`.trim();

  if (!href) {
    return (
      <span className={classes} aria-label={BUSINESS_NAME}>
        {inner}
      </span>
    );
  }

  return (
    <a href={href} className={classes} aria-label={`${BUSINESS_NAME} home`}>
      {inner}
    </a>
  );
}
