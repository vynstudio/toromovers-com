import Image from "next/image";
import { footer } from "@/lib/content";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  HOURS_LABEL,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_BASE_CITY,
  SERVICE_REGION,
  SOCIAL,
} from "@/lib/site";
import { IconFacebook, IconInstagram, IconX } from "@/components/icons";

/** Hide placeholder social profiles until real handles ship. */
function isLiveSocial(url: string) {
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/+$/, "");
    return path.length > 0 && path !== "/";
  } catch {
    return false;
  }
}

/**
 * Dark footer — brand bar + sitemap columns + NAP / legal.
 * Sitemap mirrors professional local-service IA (findability + crawl paths).
 */
export function Footer() {
  const socials = [
    { href: SOCIAL.facebook, label: "Facebook", Icon: IconFacebook },
    { href: SOCIAL.x, label: "X", Icon: IconX },
    { href: SOCIAL.instagram, label: "Instagram", Icon: IconInstagram },
  ].filter((s) => isLiveSocial(s.href));

  return (
    <footer className="full-bleed w-full bg-foreground px-[var(--container-pad)] pb-28 text-white md:pb-4">
      <div className="site-container border-t border-white/10">
        <div className="footer-bar" role="group" aria-label="Brand and social">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-social-link"
            >
              <Icon />
            </a>
          ))}

          <a
            href="/"
            className="footer-lockup"
            aria-label={`${BUSINESS_NAME} home`}
          >
            <Image
              src="/logos/toro-bull-white.svg"
              alt=""
              width={40}
              height={32}
              className="footer-bull"
              priority={false}
            />
            <span className="footer-wordmark">
              TORO<span className="footer-dot">·</span>MOVERS
            </span>
          </a>
        </div>

        <nav className="footer-sitemap" aria-label="Footer">
          {footer.columns.map((col) => (
            <div key={col.title} className="footer-col">
              <p className="footer-col-title">{col.title}</p>
              <ul className="footer-col-list">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href} className="footer-col-link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="footer-nap" aria-label="Contact details">
          <a
            href={PHONE_TEL}
            data-cta="footer-phone"
            className="tap-target min-h-0 py-1"
          >
            {PHONE_DISPLAY}
          </a>
          <a href={EMAIL_HREF} className="tap-target min-h-0 py-1">
            {EMAIL}
          </a>
          <span className="footer-nap-text">
            {SERVICE_BASE_CITY} · {SERVICE_REGION}
          </span>
          <span className="footer-nap-text">{HOURS_LABEL}</span>
        </div>

        <div className="footer-meta">
          <a href={footer.privacyHref} className="tap-target min-h-0 py-1">
            {footer.privacy}
          </a>
          <a href={footer.cookiesHref} className="tap-target min-h-0 py-1">
            {footer.cookies}
          </a>
          <a href={footer.termsHref} className="tap-target min-h-0 py-1">
            {footer.terms}
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} {BUSINESS_NAME}. Local movers serving{" "}
          {SERVICE_REGION} · {SERVICE_BASE_CITY}
        </p>
      </div>
    </footer>
  );
}
