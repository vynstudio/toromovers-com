import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

export function Nav() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-3 pt-4 sm:px-6 sm:pt-6 lg:px-10">
      {/* Mobile: compact pill — logo + CTA only (matches reference) */}
      <nav
        className="nav-pill pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full bg-white px-3.5 py-2.5 sm:gap-4 sm:px-7 sm:py-3.5"
        aria-label="Primary"
      >
        <a href="/" className="flex shrink-0 items-center" aria-label={`${BUSINESS_NAME} home`}>
          <Image
            src="/logos/toro-lockup-navy.svg"
            alt={BUSINESS_NAME}
            width={132}
            height={28}
            priority
            className="h-6 w-auto sm:h-8"
          />
        </a>

        <ul className="hidden items-center gap-8 text-[15px] tracking-tight text-foreground md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link transition-opacity hover:opacity-70">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile CTA goes to phone for conversion; desktop scrolls to quote */}
        <a
          href={PHONE_TEL}
          data-cta="nav-phone"
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-full bg-foreground px-3.5 py-2 text-[12px] font-medium tracking-tight text-white transition hover:bg-navy sm:hidden sm:px-5 sm:text-sm"
        >
          {nav.cta}
        </a>
        <a
          href={nav.ctaHref}
          data-cta="nav-quote"
          className="hidden min-h-10 shrink-0 items-center justify-center rounded-full bg-foreground px-5 py-2 text-sm font-medium tracking-tight text-white transition hover:bg-navy sm:inline-flex"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
