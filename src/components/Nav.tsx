import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

/**
 * Mobile-first nav: logo + one primary CTA (call).
 * Mid/desktop enhances with in-page links via min-width only.
 * No hamburger complexity — conversion is one tap away.
 */
export function Nav() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 w-full px-[var(--container-pad)] pt-3 sm:pt-5">
      <nav
        className="nav-pill pointer-events-auto mx-auto flex w-full items-center justify-between gap-2 rounded-full bg-white px-3 py-2 sm:gap-4 sm:px-6 sm:py-3"
        aria-label="Primary"
      >
        <a
          href="/"
          className="tap-target flex shrink-0 items-center"
          aria-label={`${BUSINESS_NAME} home`}
        >
          <Image
            src="/logos/toro-lockup-navy.svg"
            alt={BUSINESS_NAME}
            width={148}
            height={32}
            priority
            className="h-6 w-auto sm:h-8"
          />
        </a>

        {/* Progressive enhance: show links from 768px up */}
        <ul className="hidden items-center gap-5 text-[15px] tracking-tight text-foreground md:flex lg:gap-8">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link tap-target inline-flex items-center py-1 transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Always tappable — call on phone, quote on larger */}
        <a
          href={PHONE_TEL}
          data-cta="nav-phone"
          className="btn-primary tap-target shrink-0 rounded-full px-4 text-[13px] sm:hidden"
        >
          Call now
        </a>
        <a
          href={nav.ctaHref}
          data-cta="nav-quote"
          className="btn-primary tap-target hidden shrink-0 rounded-full px-5 text-sm sm:inline-flex"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
