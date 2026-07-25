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
    <footer className="bg-foreground px-5 pb-28 pt-4 text-white sm:px-8 sm:pb-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-8 border-t border-white/10 pt-10 sm:flex-row sm:items-center">
        <div className="flex items-center gap-5 text-white/80">
          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition hover:text-white"
          >
            <IconFacebook />
          </a>
          <a
            href={SOCIAL.x}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X"
            className="transition hover:text-white"
          >
            <IconX />
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition hover:text-white"
          >
            <IconInstagram />
          </a>
        </div>

        <a href="/" className="order-first sm:order-none" aria-label={`${BUSINESS_NAME} home`}>
          <Image
            src="/logos/toro-lockup-white.svg"
            alt={BUSINESS_NAME}
            width={120}
            height={26}
            className="h-6 w-auto opacity-95"
          />
        </a>

        <div className="flex flex-col items-center gap-3 text-sm text-white/55 sm:items-end">
          <a href={PHONE_TEL} data-cta="footer-phone" className="text-white/80 transition hover:text-white">
            {PHONE_DISPLAY}
          </a>
          <a href={EMAIL_HREF} className="transition hover:text-white">
            {EMAIL}
          </a>
          <div className="flex items-center gap-6">
            <a
              href={footer.privacyHref}
              className="underline underline-offset-4 transition hover:text-white"
            >
              {footer.privacy}
            </a>
            <a
              href={footer.termsHref}
              className="underline underline-offset-4 transition hover:text-white"
            >
              {footer.terms}
            </a>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-white/35">
        © {new Date().getFullYear()} {BUSINESS_NAME}. Local movers serving Central Florida ·
        Orlando, FL
      </p>
    </footer>
  );
}
