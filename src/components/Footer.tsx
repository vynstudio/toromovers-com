import { SafeImage } from "@/components/SafeImage";
import { footer } from "@/lib/content";
import { CompanyPhoneLinks } from "@/components/CompanyPhoneLinks";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  HOURS_LABEL,
  SERVICE_BASE_CITY,
  SERVICE_REGION,
  SOCIAL_FOOTER_LINKS,
} from "@/lib/site";
import { SOCIAL_ICON_PATHS } from "@/lib/social-icons";

/**
 * Dark footer — brand bar + sitemap columns + NAP / legal.
 * Sitemap mirrors professional local-service IA (findability + crawl paths).
 */
export function Footer() {
  return (
    <footer className="full-bleed w-full bg-foreground px-[var(--container-pad)] pb-28 text-white md:pb-4">
      <div className="site-container border-t border-white/10">
        <div className="footer-bar" role="group" aria-label="Brand and social">
          {SOCIAL_FOOTER_LINKS.map(({ href, label, id }) => (
            <a
              key={id}
              href={href}
              target="_blank"
              rel="noopener"
              aria-label={label}
              className="footer-social-link"
            >
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
                <path fill="currentColor" d={SOCIAL_ICON_PATHS[id]} />
              </svg>
            </a>
          ))}

          <a
            href="/"
            className="footer-lockup"
            aria-label={`${BUSINESS_NAME} home`}
          >
            <span className="footer-mark" aria-hidden>
              <SafeImage
                src="/logos/toro-bull-white.svg"
                alt=""
                width={40}
                height={32}
                className="footer-bull"
                priority={false}
              />
            </span>
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
          <CompanyPhoneLinks
            cta="footer-phone"
            groupClassName="footer-phones"
            linkClassName="tap-target min-h-0 py-1"
          />
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
