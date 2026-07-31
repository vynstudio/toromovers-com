// Toro Movers — toromovers.com (standalone; not toromovers.net)

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://toromovers.com";

export const BUSINESS_NAME = "Toro Movers";
export const LEGAL_NAME = "Toro Movers LLC";
export const SLOGAN = "Moving People Forward";

/** Site-wide SEO description — 120–160 chars for SERP (audit target). */
export const SITE_DESCRIPTION =
  "Family-owned Orlando movers for Central Florida. Full-service, labor-only & apartment moves. Up-front hourly rates. Call (689) 600-2720.";

/** Default browser tab / OG title — 50–60 chars (audit target). */
export const SITE_TITLE =
  "Toro Movers | Orlando & Central Florida Movers";

export const PHONE_DISPLAY = "(689) 600-2720";
export const PHONE_TEL = "tel:+16896002720";
export const PHONE_E164 = "+16896002720";

export const EMAIL = "hello@toromovers.com";
export const EMAIL_HREF = "mailto:hello@toromovers.com";

export const HOURS_LABEL = "Mon–Sat · 7:00 AM – 7:00 PM";
export const HOURS_NOTE = "Sunday on request";

export const GOOGLE_RATING = "5";
export const REVIEW_COUNT = "36";
export const MOVES_DONE = "1,000+";

export const GOOGLE_MAPS_REVIEWS_URL =
  "https://maps.app.goo.gl/4VLksGpLoVTYXv3k7";

export const SERVICE_REGION = "Central Florida";
export const SERVICE_BASE_CITY = "Orlando, FL";
export const SERVICE_BASE_LOCALITY = "Orlando";
export const POSTAL_CODE = "32789";

export const SOCIAL = {
  facebook: "https://www.facebook.com/722514634274519",
  instagram: "https://www.instagram.com/", // update when live
  x: "https://x.com/", // update when live
} as const;

export const SOCIAL_PROFILES = [
  "https://www.facebook.com/722514634274519",
  "https://www.google.com/maps/place/Toro+Movers/@27.5242113,-82.9347487,8z/data=!4m10!1m2!2m1!1storo+movers!3m6!1s0xaab4eea8998e0b43:0xef948707b4ba0a80!8m2!3d28.5187116!4d-81.5872639!15sCgt0b3JvIG1vdmVyc1oNIgt0b3JvIG1vdmVyc5IBDm1vdmluZ19jb21wYW554AEA!16s%2Fg%2F11xmqc_lk7",
];
