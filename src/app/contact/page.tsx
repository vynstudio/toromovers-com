import type { Metadata } from "next";
import { CallbackForm } from "@/components/CallbackForm";
import QuotesFaq from "@/components/funnel/QuotesFaq";
import {
  CONTACT_DESCRIPTION,
  CONTACT_DONE_HEADLINE,
  CONTACT_FORM_LEDE,
  CONTACT_H1,
  CONTACT_LEDE,
  CONTACT_OG_TITLE,
  CONTACT_PATH,
  CONTACT_PHONE,
  CONTACT_PHONE_TEL,
  CONTACT_TITLE,
  contactFaqGraph,
} from "@/lib/contact-page";
import {
  EMAIL,
  EMAIL_HREF,
  GOOGLE_MAPS_REVIEWS_URL,
  HOURS_SAT_LABEL,
  HOURS_SUN_FRI_LABEL,
  QUOTE_PATH,
  SERVICE_BASE_CITY,
  SERVICE_REGION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: CONTACT_TITLE,
  description: CONTACT_DESCRIPTION,
  alternates: { canonical: CONTACT_PATH },
  openGraph: {
    title: CONTACT_OG_TITLE,
    description: CONTACT_DESCRIPTION,
    url: `${SITE_URL}${CONTACT_PATH}`,
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_OG_TITLE,
    description: CONTACT_DESCRIPTION,
  },
};

/**
 * Dedicated contact page — NAP + hours + shared callback form.
 * Form payload and Lead/generate_lead tracking stay in CallbackForm.
 */
export default function ContactPage() {
  return (
    <main id="main" className="contact-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactFaqGraph()),
        }}
      />
      <section className="contact-hero" aria-labelledby="contact-heading">
        <header className="contact-copy">
          <p className="eyebrow">Contact</p>
          <h1 id="contact-heading">{CONTACT_H1}</h1>
          <p className="aeo-answer">{CONTACT_LEDE}</p>
          <div className="contact-actions">
            <a
              className="btn btn-red"
              href={CONTACT_PHONE_TEL}
              data-cta="contact-primary-call"
              data-track="phone"
            >
              <span>Call {CONTACT_PHONE}</span>
            </a>
            <a
              href={QUOTE_PATH}
              data-cta="contact-page-quote"
              data-track="quote"
              className="btn btn-red"
            >
              <span>Get a free quote</span>
            </a>
          </div>
        </header>

        <div className="contact-grid">
          <aside className="contact-info" aria-label="How to reach us">
            <div className="contact-info-card">
              <h2>Call or text</h2>
              <a
                href={CONTACT_PHONE_TEL}
                className="contact-phone"
                data-cta="contact-page-phone"
                data-track="phone"
              >
                {CONTACT_PHONE}
              </a>
              <p>
                {HOURS_SUN_FRI_LABEL}
                <br />
                {HOURS_SAT_LABEL}
              </p>
            </div>

            <div className="contact-info-card">
              <h2>Email</h2>
              <a href={EMAIL_HREF} className="contact-mail">
                {EMAIL}
              </a>
            </div>

            <div className="contact-info-card">
              <h2>Service area</h2>
              <p>
                {SERVICE_BASE_CITY} · {SERVICE_REGION}
              </p>
              <a
                href={GOOGLE_MAPS_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-mail"
                data-cta="contact-google"
              >
                Google reviews
              </a>
            </div>
          </aside>

          <div className="contact-card" id="quote">
            <h2>Prefer a callback?</h2>
            <p className="contact-form-lede">{CONTACT_FORM_LEDE}</p>
            <CallbackForm
              source="contact-page"
              notePrefix="Contact page callback · toromovers.com"
              phoneLines={CONTACT_PHONE}
              phonePlaceholder="(407) 555-0123"
              donePhone={{ display: CONTACT_PHONE, tel: CONTACT_PHONE_TEL }}
              doneHeadline={CONTACT_DONE_HEADLINE}
            />
          </div>
        </div>
      </section>
      <QuotesFaq />
    </main>
  );
}
