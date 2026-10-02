/** Type-only stand-in for the Next.js package. Runtime imports use the subpath shims. */
export type Metadata = {
  title?: string | { absolute?: string; default?: string; template?: string };
  description?: string;
  keywords?: string | string[];
  robots?: string | Record<string, unknown>;
  alternates?: { canonical?: string; languages?: Record<string, string> };
  openGraph?: Record<string, unknown>;
  twitter?: Record<string, unknown>;
  authors?: unknown;
  [key: string]: unknown;
};

export type Viewport = Record<string, unknown>;
export type NextConfig = Record<string, unknown>;
