"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { BUSINESS_NAME, PHONE_TEL } from "@/lib/site";

/**
 * Desktop: sticky top pill + Title Case links + CTAs.
 * Mobile: logo + menu + Call; sheet opens for full nav.
 * Hides on any downward scroll on phone so the sticky pill (position:
 * sticky, transparent shell) never overlaps hero/page text mid-scroll —
 * sticky bottom CTAs take over as the conversion path once hidden.
 */
export function Nav() {
  const [hiddenMobile, setHiddenMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => {
      if (!mq.matches) {
        setHiddenMobile(false);
        return;
      }
      // Keep nav visible while menu is open
      if (menuOpen) {
        setHiddenMobile(false);
        return;
      }

      setHiddenMobile(window.scrollY > 24);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    mq.addEventListener("change", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`site-header pointer-events-none${
          hiddenMobile && !menuOpen ? " site-header--hidden" : ""
        }`}
        data-mobile-nav={hiddenMobile && !menuOpen ? "hidden" : "visible"}
      >
        <nav className="nav-pill pointer-events-auto" aria-label="Primary">
          <div className="nav-left">
            <a
              href="/"
              className="brand-lockup tap-target"
              aria-label={`${BUSINESS_NAME} home`}
              onClick={closeMenu}
            >
              <span className="brand-mark" aria-hidden>
                <Image
                  src="/logos/toro-bull-black.svg"
                  alt=""
                  width={32}
                  height={26}
                  priority
                  className="brand-bull"
                />
              </span>
              <span className="brand-name">
                TORO<span className="brand-dot">·</span>MOVERS
              </span>
            </a>
          </div>

          <div className="nav-center">
            <ul className="nav-links">
              {nav.links.map((link) => (
                <li key={link.href + link.label}>
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

          <div className="nav-right">
            <button
              type="button"
              className="nav-menu-btn tap-target"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="nav-menu-icon" aria-hidden>
                {menuOpen ? (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4 4l10 10M14 4L4 14"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3 5h12M3 9h12M3 13h12"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </span>
            </button>
            <a
              href={PHONE_TEL}
              data-cta="nav-phone"
              className="btn-primary tap-target nav-cta"
            >
              {nav.ctaPhoneLabel}
            </a>
            <button
              type="button"
              data-open-quote
              data-source="nav-quote"
              data-cta="nav-quote"
              className="btn-primary tap-target nav-cta nav-cta-quote"
            >
              {nav.cta}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu sheet */}
      <div
        className={`nav-sheet${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className="nav-sheet-backdrop"
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          id="mobile-nav-panel"
          className="nav-sheet-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <ul className="nav-sheet-links">
            {nav.links.map((link) => (
              <li key={`m-${link.href}-${link.label}`}>
                <a
                  href={link.href}
                  className="nav-sheet-link tap-target"
                  onClick={closeMenu}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav-sheet-actions">
            <a
              href={PHONE_TEL}
              data-cta="nav-menu-phone"
              className="btn-primary btn-fluid tap-target inline-flex w-full justify-center"
              onClick={closeMenu}
            >
              Call now
            </a>
            <button
              type="button"
              data-open-quote
              data-source="nav-menu-quote"
              data-cta="nav-menu-quote"
              className="btn-outline btn-fluid tap-target inline-flex w-full justify-center"
              onClick={closeMenu}
            >
              {nav.cta}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
