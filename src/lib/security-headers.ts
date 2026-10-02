/**
 * Same values as the [[headers]] block in netlify.toml.
 * Netlify applies that file only to CDN files. SSR and API responses,
 * including /pay, get these headers from src/middleware.ts instead.
 *
 * script-src 'unsafe-inline' is temporary: consent, JSON-LD, gtag, and the
 * homepage handlers are inline. Astro inlines stylesheets, so style-src
 * allows 'unsafe-inline' too.
 */
export const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Content-Security-Policy": "frame-ancestors 'self'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    'camera=(), microphone=(), geolocation=(self), payment=(self "https://js.stripe.com"), usb=(), interest-cohort=()',
  "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "Content-Security-Policy-Report-Only":
    "default-src 'self'; base-uri 'self'; object-src 'none'; form-action 'self'; script-src 'self' 'unsafe-inline' https://js.stripe.com https://*.js.stripe.com https://m.stripe.network https://*.m.stripe.network https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://connect.facebook.net https://searchable-tracker.searchable.workers.dev; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.facebook.com https://www.google.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.googletagmanager.com https://*.stripe.com; font-src 'self' data:; connect-src 'self' https://api.stripe.com https://m.stripe.com https://m.stripe.network https://q.stripe.com https://r.stripe.com https://merchant-ui-api.stripe.com https://checkout.stripe.com https://hooks.stripe.com https://*.stripe.com https://www.google-analytics.com https://*.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://www.google.com https://stats.g.doubleclick.net https://www.facebook.com https://connect.facebook.net https://searchable-tracker.searchable.workers.dev https://tracker.searchableanalytics.com; frame-src 'self' https://js.stripe.com https://*.js.stripe.com https://hooks.stripe.com https://m.stripe.network https://*.m.stripe.network https://*.stripe.com https://www.google.com https://www.facebook.com; media-src 'self' blob:; worker-src 'self' blob: https://m.stripe.network https://*.m.stripe.network; report-uri /api/csp-report",
};

export function applySecurityHeaders(headers: Headers): void {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
}
