import Image from "next/image";
import { nav } from "@/lib/content";
import { BUSINESS_NAME } from "@/lib/site";

export function Nav() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-10">
      <nav
        className="nav-pill pointer-events-auto mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full bg-white px-5 py-3 sm:px-7 sm:py-3.5"
        aria-label="Primary"
      >
        <a href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logos/toro-lockup-navy.svg"
            alt={BUSINESS_NAME}
            width={132}
            height={28}
            priority
            className="h-7 w-auto sm:h-8"
          />
        </a>

        <ul className="hidden items-center gap-8 text-[15px] tracking-tight text-foreground md:flex">
          {nav.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="nav-link transition-opacity hover:opacity-70">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={nav.ctaHref}
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-foreground px-4 py-2 text-[13px] font-medium tracking-tight text-white transition hover:bg-navy sm:px-5 sm:text-sm"
        >
          {nav.cta}
        </a>
      </nav>
    </header>
  );
}
