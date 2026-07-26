import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

/**
 * Sticky header — grouped flex regions (left / center / right).
 * Brand: black bull mark + TORO·MOVERS wordmark.
 */
export function Nav() {
  return (
    <header className="site-header pointer-events-none">
      <nav className="nav-pill pointer-events-auto" aria-label="Primary">
        {/* Left — black bull + wordmark */}
        <div className="nav-left">
          <a
            href="/"
            className="brand-lockup tap-target"
            aria-label={`${BUSINESS_NAME} home`}
          >
            <span className="brand-mark" aria-hidden>
              <Image
                src="/logos/toro-bull-black.svg"
                alt=""
                width={40}
                height={32}
                priority
                className="brand-bull"
              />
            </span>
            <span className="brand-name">
              TORO<span className="brand-dot">·</span>MOVERS
            </span>
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
          <button
            type="button"
            data-open-quote
            data-source="nav-quote"
            data-cta="nav-quote"
            className="btn-primary tap-target hidden shrink-0 rounded-full px-4 text-sm md:inline-flex"
          >
            {nav.cta}
          </button>
        </div>
      </nav>
    </header>
  );
}
