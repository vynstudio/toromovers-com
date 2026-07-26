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

export function Footer() {
  return (
    <footer className="full-bleed w-full bg-foreground px-[var(--container-pad)] pb-32 pt-2 text-white md:pb-12">
      <div className="site-container flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-2 text-white/80">
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="tap-target rounded-full p-2 transition hover:bg-white/10 hover:text-white"
          >
            <IconFacebook />
          </a>
          <a
            href={SOCIAL.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="tap-target rounded-full p-2 transition hover:bg-white/10 hover:text-white"
          >
            <IconX />
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="tap-target rounded-full p-2 transition hover:bg-white/10 hover:text-white"
          >
            <IconInstagram />
          </a>
        </div>

        <a
          href="/"
          className="brand-lockup tap-target order-first text-white md:order-none"
          aria-label={`${BUSINESS_NAME} home`}
        >
          <span className="brand-mark" aria-hidden>
            <Image
              src="/logos/toro-bull-white.svg"
              alt=""
              width={40}
              height={32}
              className="brand-bull"
            />
          </span>
          <span className="brand-name text-white">
            TORO<span className="brand-dot text-white/70">·</span>MOVERS
          </span>
        </a>

        <div className="flex w-full max-w-xs flex-col items-center gap-1 text-sm text-white/55 md:max-w-none md:items-end">
          <a
            href={PHONE_TEL}
            data-cta="footer-phone"
            className="tap-target w-full font-medium text-white/90 transition hover:text-white md:w-auto"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={EMAIL_HREF}
            className="tap-target w-full transition hover:text-white md:w-auto"
          >
            {EMAIL}
          </a>
          <div className="mt-2 flex w-full flex-wrap items-center justify-center gap-2 md:justify-end">
            <a
              href={footer.privacyHref}
              className="tap-target px-2 underline underline-offset-4 transition hover:text-white"
            >
              {footer.privacy}
            </a>
            <a
              href={footer.termsHref}
              className="tap-target px-2 underline underline-offset-4 transition hover:text-white"
            >
              {footer.terms}
            </a>
          </div>
        </div>
      </div>
      <p className="site-container mt-8 text-center text-xs text-white/35">
        © {new Date().getFullYear()} {BUSINESS_NAME}. Local movers serving
        Central Florida · Orlando, FL
      </p>
    </footer>
  );
}
