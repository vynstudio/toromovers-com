import type { AnchorHTMLAttributes, ReactNode } from "react";

type Href = string | { pathname?: string; hash?: string; search?: string };

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: Href;
  children?: ReactNode;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  legacyBehavior?: boolean;
  passHref?: boolean;
};

function hrefString(href: Href): string {
  if (typeof href === "string") return href;
  const path = href.pathname || "/";
  return `${path}${href.search || ""}${href.hash || ""}`;
}

/** next/link stand-in. Renders a plain anchor so crawlers see the same href. */
export default function Link({
  href,
  children,
  prefetch: _prefetch,
  replace: _replace,
  scroll: _scroll,
  legacyBehavior: _legacy,
  passHref: _pass,
  ...rest
}: LinkProps) {
  return (
    <a href={hrefString(href)} {...rest}>
      {children}
    </a>
  );
}
