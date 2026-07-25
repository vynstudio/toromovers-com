import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
  as?: "div" | "section" | "article";
};

/**
 * Fluid layout shell — width 100%, max-width only (never fixed width).
 * Default max 1200px; wide = 1280px; narrow = 720px.
 */
export function Container({
  children,
  className = "",
  narrow = false,
  wide = false,
  as: Tag = "div",
}: ContainerProps) {
  const size = narrow
    ? "site-container-narrow"
    : wide
      ? "site-container-wide"
      : "site-container";

  return <Tag className={`${size} ${className}`.trim()}>{children}</Tag>;
}
