import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

/**
 * Sticky header — grouped flex regions (left / center / right).
 * Avoids justify-between so CTAs stay together and links stay centered.
 * Mobile: logo + Call now. Desktop: logo | links | Call + Quote.
 */
export function Nav() {
  return (
    <header className="site-header pointer-events-none">
      <nav className="nav-pill pointer-events-auto" aria-label="Primary">
        {/* Left — logo */}
        <div className="nav-left">
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
              className="h-6 w-auto sm:h-7 md:h-8"
            />
          </a>
        </div>

        {/* Center — in-page links (md+) */}
        <div className="nav-center">
          <ul className="nav-links">
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
        </div>

        {/* Right — CTAs grouped with controlled gap */}
        <div className="nav-right">
          <a
            href={PHONE_TEL}
            data-cta="nav-phone"
            className="btn-primary tap-target shrink-0 rounded-full px-3.5 text-[13px] sm:px-4 sm:text-sm"
          >
            Call now
          </a>
          <a
            href={nav.ctaHref}
            data-cta="nav-quote"
            className="btn-primary tap-target hidden shrink-0 rounded-full px-4 text-sm md:inline-flex"
          >
            {nav.cta}
          </a>
        </div>
      </nav>
    </header>
  );
}
