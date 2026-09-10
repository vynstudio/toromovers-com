import { SafeImage } from "@/components/SafeImage";
import { BUSINESS_NAME } from "@/lib/site";

type ToroLockupProps = {
  href?: string | null;
  size?: "sm" | "md";
  className?: string;
};

export function ToroLockup({
  href = "/",
  size = "md",
  className = "",
}: ToroLockupProps) {
  const bull = size === "sm" ? 32 : 52;
  const type =
    size === "sm"
      ? "text-[1.05rem] sm:text-[1.55rem]"
      : "text-[1.7rem] sm:text-[1.95rem]";
  const inner = (
    <>
      <SafeImage
        src="/logos/toro-bull-black.svg"
        alt=""
        width={bull}
        height={Math.round(bull * 0.87)}
        className="h-[1.05em] w-auto shrink-0"
        unoptimized
        priority
      />
      <span
        className={`flex items-baseline gap-[0.18em] font-black uppercase leading-none tracking-[-0.045em] ${type}`}
      >
        <span className="text-[#0A0A0A]">TORO</span>
        <span className="text-[#E20613]">MOVERS</span>
      </span>
    </>
  );

  const classes = `inline-flex min-w-0 items-center gap-1.5 no-underline sm:gap-2.5 ${className}`;

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
