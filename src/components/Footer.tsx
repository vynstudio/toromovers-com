import Image from "next/image";
import { footer } from "@/lib/content";
import { BUSINESS_NAME, SOCIAL } from "@/lib/site";
import { IconFacebook, IconInstagram, IconX } from "@/components/icons";

export function Footer() {
  return (
    <footer className="bg-foreground px-5 pb-10 pt-4 text-white sm:px-8">
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

        <a href="/" className="order-first sm:order-none">
          <Image
            src="/logos/toro-lockup-white.svg"
            alt={BUSINESS_NAME}
            width={120}
            height={26}
            className="h-6 w-auto opacity-95"
          />
        </a>

        <div className="flex items-center gap-6 text-sm text-white/55">
          <a href={footer.privacyHref} className="underline underline-offset-4 transition hover:text-white">
            {footer.privacy}
          </a>
          <a href={footer.termsHref} className="underline underline-offset-4 transition hover:text-white">
            {footer.terms}
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl text-center text-xs text-white/35">
        © {new Date().getFullYear()} {BUSINESS_NAME}. Local movers serving Central Florida.
      </p>
    </footer>
  );
}
