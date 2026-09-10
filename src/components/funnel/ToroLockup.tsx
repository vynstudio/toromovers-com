import { SafeImage } from "@/components/SafeImage";
import { BUSINESS_NAME } from "@/lib/site";

type ToroLockupProps = {
  href?: string | null;
  className?: string;
};

/**
 * One lockup unit: official bull + TORO (#0A0A0A) + MOVERS (#E20613).
 * Font-size drives bull and wordmark together so letters never clip.
 * Parent should be `@container w-full min-w-0` so `cqi` tracks available width.
 */
export function ToroLockup({ href = "/", className = "" }: ToroLockupProps) {
  const inner = (
    <>
      <SafeImage
        src="/logos/toro-bull-black.svg"
        alt=""
        width={72}
        height={56}
        className="h-[1.12em] w-auto shrink-0"
        unoptimized
        priority
      />
      <span className="whitespace-nowrap font-black uppercase leading-none tracking-[-0.045em]">
        <span className="text-[#0A0A0A]">TORO</span>
        <span className="ml-[0.18em] text-[#E20613]">MOVERS</span>
      </span>
    </>
  );

  const classes = `inline-flex max-w-full items-center gap-[0.32em] no-underline text-[clamp(1.05rem,7.2cqi,1.7rem)] ${className}`;

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
