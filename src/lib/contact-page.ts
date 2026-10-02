/**
 * Visible copy for /contact.
 * The hourly rate appears only in the shared FAQ answer and its FAQPage JSON-LD.
 */

import { quoteFaqs } from "./quote-faqs.ts";
import { HOURS_LABEL } from "./site.ts";

export const CONTACT_PATH = "/contact";
export const CONTACT_PHONE = "321-234-0510";
export const CONTACT_PHONE_TEL = "tel:+13212340510";
export const CONTACT_H1 = "Get your Orlando moving quote";
export const CONTACT_LEDE =
  "Call 321-234-0510 or get a free quote below. Tell us what you're moving and when, and a local mover calls you back.";
export const CONTACT_TITLE = "Contact · Get a free quote";
export const CONTACT_DESCRIPTION =
  "Contact Toro Movers for an Orlando and Central Florida moving quote. Call 321-234-0510 or request a callback. " +
  HOURS_LABEL +
  ".";
export const CONTACT_OG_TITLE = "Contact Toro Movers";
export const CONTACT_FORM_LEDE =
  "Leave your name and number. We call you back ASAP, today, or this week. For a full estimate, use Get a free quote above.";
export const CONTACT_DONE_HEADLINE =
  "Got it, {name}. We'll call you back shortly.";

export function contactFaqGraph() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: quoteFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
