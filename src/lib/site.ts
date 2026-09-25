// Toro Movers — toromovers.com (standalone; not toromovers.net)

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toromovers.com";

export const BUSINESS_NAME = "Toro Movers";
export const LEGAL_NAME = "Toro Movers LLC";
export const SLOGAN = "Moving People Forward";

/** Site-wide SEO description — 120–160 chars for SERP (audit target). */
export const SITE_DESCRIPTION =
  "Toro Movers is a family-owned, bilingual Orlando moving company with upfront hourly rates and no hidden fees. Call or text (689) 600-2720.";

/**
 * Homepage document / Open Graph / Twitter title.
 * The homepage sets this as an absolute title so the root `%s · Toro Movers`
 * template is not appended.
 */
export const SITE_TITLE = "Trusted Orlando & Central Florida movers";

export const PHONE_DISPLAY = "(689) 600-2720";
export const PHONE_TEL = "tel:+16896002720";
export const PHONE_E164 = "+16896002720";

/** Live quote funnel (engine). The multi-step LeadFunnel project was scrapped. */
export const QUOTE_PATH = "/quotes";
/** Remote Operations Coordinator hiring page (Honduras). */
export const CAREERS_OPS_COORDINATOR_PATH = "/careers/ops-coordinator";
export const PAY_PATH = "/pay";
export const MOVE_DAY_CHECKLIST_PATH = "/move-day-checklist";
export const PAY_DEPOSIT_PATH = "/pay?type=deposit";
export const PAY_BALANCE_PATH = "/pay?type=balance";
export const TIP_PATH = "/pay?type=tip";
export const PAY_DEPOSIT_URL = "https://toromovers.com/pay?type=deposit";
export const PAY_BALANCE_URL = "https://toromovers.com/pay?type=balance";

export const EMAIL = "hello@toromovers.com";
export const EMAIL_HREF = "mailto:hello@toromovers.com";

/** Sunday–Friday window. Middle-dot label style used in NAP lines. */
export const HOURS_SUN_FRI_LABEL = "Sun–Fri · 7:00 AM – 7:00 PM";
/** Saturday window. Shorter than the Sunday–Friday day. */
export const HOURS_SAT_LABEL = "Sat · 9:00 AM – 5:00 PM";
/** Full published hours for footer, contact meta, and other one-line NAP slots. */
export const HOURS_LABEL = `${HOURS_SUN_FRI_LABEL} · ${HOURS_SAT_LABEL}`;

export const GOOGLE_RATING = "5";
export const REVIEW_COUNT = "36";
export const MOVES_DONE = "1,000+";

export const GOOGLE_MAPS_REVIEWS_URL =
  "https://maps.app.goo.gl/4VLksGpLoVTYXv3k7";

export const SERVICE_REGION = "Central Florida";
export const SERVICE_BASE_CITY = "Orlando, FL";
export const SERVICE_BASE_LOCALITY = "Orlando";
export const SERVICE_BASE_REGION = "FL";
export const SERVICE_BASE_COUNTRY = "US";

/**
 * Service-area business with a hidden street address.
 * Do not publish a street line or a postal code. A ZIP would imply a
 * storefront and previously pointed at a Winter Park code that does not
 * match the hidden-address listing.
 */

export const SOCIAL = {
  facebook: "https://www.facebook.com/722514634274519",
} as const;

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/722514634274519",
  "https://www.google.com/maps/place/Toro+Movers/@27.5242113,-82.9347487,8z/data=!4m10!1m2!2m1!1storo+movers!3m6!1s0xaab4eea8998e0b43:0xef948707b4ba0a80!8m2!3d28.5187116!4d-81.5872639!15sCgt0b3JvIG1vdmVyc1oNIgt0b3JvIG1vdmVyc5IBDm1vdmluZ19jb21wYW554AEA!16s%2Fg%2F11xmqc_lk7",
];
