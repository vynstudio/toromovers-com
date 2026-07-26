import Image from "next/image";
import { footer } from "@/lib/content";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_TEL,
  SOCIAL,
} from "@/lib/site";
import { IconFacebook, IconInstagram, IconX } from "@/components/icons";

/**
 * Dark footer only — brand bar matches reference:
 * social icons + bull + TORO·MOVERS in one centered row.
 */
export function Footer() {
  return (
    <footer className="full-bleed w-full bg-foreground px-[var(--container-pad)] pb-28 text-white md:pb-4">
      <div className="site-container border-t border-white/10">
        {/* Brand bar: f · X · IG · bull · TORO·MOVERS */}
        <div className="footer-bar">
          <div className="footer-socials">
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="tap-target rounded-full p-2"
            >
              <IconFacebook />
            </a>
            <a
              href={SOCIAL.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="tap-target rounded-full p-2"
            >
              <IconX />
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="tap-target rounded-full p-2"
            >
              <IconInstagram />
            </a>
          </div>

          <a
            href="/"
            className="footer-brand-inline"
            aria-label={`${BUSINESS_NAME} home`}
          >
            <span className="brand-mark" aria-hidden>
              <Image
                src="/logos/toro-bull-white.svg"
                alt=""
                width={36}
                height={28}
                className="brand-bull"
              />
            </span>
            <span className="brand-name">
              TORO<span className="brand-dot">·</span>MOVERS
            </span>
          </a>
        </div>

        <div className="footer-meta">
          <a href={PHONE_TEL} data-cta="footer-phone" className="tap-target min-h-0 py-1">
            {PHONE_DISPLAY}
          </a>
          <a href={EMAIL_HREF} className="tap-target min-h-0 py-1">
            {EMAIL}
          </a>
          <a href={footer.privacyHref} className="tap-target min-h-0 py-1">
            {footer.privacy}
          </a>
          <a href={footer.termsHref} className="tap-target min-h-0 py-1">
            {footer.terms}
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} {BUSINESS_NAME}. Local movers serving
          Central Florida · Orlando, FL
        </p>
      </div>
    </footer>
  );
}
