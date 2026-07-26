import {
  BUSINESS_NAME,
  EMAIL,
  LEGAL_NAME,
  PHONE_DISPLAY,
  SERVICE_BASE_CITY,
  SITE_URL,
} from "@/lib/site";

/** Shared legal copy — structure mirrors goflex.com privacy/cookie sections, adapted for Toro. */
export const LEGAL = {
  privacyUpdated: "July 25, 2026",
  cookiesUpdated: "July 25, 2026",
  company: LEGAL_NAME,
  brand: BUSINESS_NAME,
  email: EMAIL,
  phone: PHONE_DISPLAY,
  site: SITE_URL,
  city: SERVICE_BASE_CITY,
  supportSubjectPrivacy: "Privacy Rights Request",
  supportSubjectState: "My State Privacy Rights",
} as const;
