import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

/**
 * Sticky header — always reachable on scroll (mobile + desktop).
 * Mobile: logo + Call now (one tap).
 * md+: in-page links + Get a quote.
 */
export function Nav() {
  return (
    <header className="site-header pointer-events-none">
      <nav
        className="nav-pill pointer-events-auto flex items-center justify-between gap-2 rounded-full px-3 py-1.5 sm:gap-4 sm:px-6 sm:py-2.5"
        aria-label="Primary"
      >
        <a
          href="/"
          className="tap-target flex shrink-0 items-center rounded-full px-1"
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

        <ul className="hidden items-center gap-1 text-[15px] tracking-tight text-foreground md:flex lg:gap-2">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link tap-target inline-flex items-center rounded-md transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Primary conversion — always ≥48px; call on small, quote on larger */}
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
