// Toro Movers — toromovers.com (standalone; not toromovers.net)

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toromovers.com";

export const BUSINESS_NAME = "Toro Movers";
export const LEGAL_NAME = "Toro Movers LLC";
export const SLOGAN = "Moving People Forward";

/**
 * Homepage document / Open Graph / Twitter title.
 * The homepage sets this as an absolute title so the root `%s · Toro Movers`
 * template is not appended.
 */
export const SITE_TITLE = "Trusted Orlando & Central Florida movers";

/** Primary company line. Single-number CTAs use these. */
export const PHONE_DISPLAY = "(321) 234-0510";
export const PHONE_TEL = "tel:+13212340510";
export const PHONE_E164 = "+13212340510";

/** Secondary company line. Shown after the primary number. */
export const PHONE_SECONDARY_DISPLAY = "(689) 600-2720";
export const PHONE_SECONDARY_TEL = "tel:+16896002720";
export const PHONE_SECONDARY_E164 = "+16896002720";

/** Prose form: primary, then secondary. */
export const PHONE_LINES = `${PHONE_DISPLAY} or ${PHONE_SECONDARY_DISPLAY}`;

/** Site-wide SEO description — 120–160 chars for SERP (audit target). */
export const SITE_DESCRIPTION = `Toro Movers is a family-owned, bilingual Orlando moving company with upfront hourly rates and no hidden fees. Call or text ${PHONE_LINES}.`;

/** Click-to-call company lines. Primary first. */
export const COMPANY_PHONES = [
  { display: PHONE_DISPLAY, tel: PHONE_TEL },
  { display: PHONE_SECONDARY_DISPLAY, tel: PHONE_SECONDARY_TEL },
] as const;

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

/**
 * Public profiles. Leave yelp empty until the URL is known; empty entries
 * are omitted from the footer and from JSON-LD sameAs.
 */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/toromovers/",
  facebook: "https://www.facebook.com/722514634274519",
  google: "https://maps.app.goo.gl/4VLksGpLoVTYXv3k7",
  yelp: "",
} as const;

export const SOCIAL = {
  facebook: SOCIAL_LINKS.facebook,
} as const;

/** Footer order. Yelp is skipped while SOCIAL_LINKS.yelp is empty. */
export const SOCIAL_FOOTER_LINKS = (
  [
    ["instagram", "Toro Movers on Instagram"],
    ["facebook", "Toro Movers on Facebook"],
    ["google", "Toro Movers on Google"],
    ["yelp", "Toro Movers on Yelp"],
  ] as const
)
  .map(([id, label]) => ({ id, label, href: SOCIAL_LINKS[id] }))
  .filter((item) => item.href.length > 0);

/** Organization sameAs: Facebook, Instagram, the short Google Maps link, Yelp when set. */
export const SOCIAL_PROFILES = [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.google,
  SOCIAL_LINKS.yelp,
].filter((url) => url.length > 0);
