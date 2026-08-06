import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { CallbackForm } from "@/components/CallbackForm";
import {
  BUSINESS_NAME,
  EMAIL,
  EMAIL_HREF,
  GOOGLE_MAPS_REVIEWS_URL,
  HOURS_LABEL,
  HOURS_NOTE,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_BASE_CITY,
  SERVICE_REGION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · Get a free quote",
  description: `Contact ${BUSINESS_NAME} for an Orlando & Central Florida moving quote. Call ${PHONE_DISPLAY} or get a free quote online. ${HOURS_LABEL}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${BUSINESS_NAME}`,
    description: `Call ${PHONE_DISPLAY} or get a free moving quote in ${SERVICE_REGION}.`,
    url: `${SITE_URL}/contact`,
  },
};

/**
 * Dedicated contact page — NAP + hours + shared callback form.
 */
export default function ContactPage() {
  return (
    <>
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <section
          className="contact-page full-bleed w-full"
          aria-labelledby="contact-heading"
        >
          <div className="site-container contact-page-inner">
            <header className="contact-page-head">
              <p className="split-band-eyebrow">Contact</p>
              <h1 id="contact-heading" className="contact-page-title">
                Get your Orlando moving quote
              </h1>
              <p className="aeo-answer contact-page-lede text-muted">
                Call {PHONE_DISPLAY} or get a free quote online — share what
                you&apos;re moving and when. Prefer we call you? Use the
                callback form below for immediate service.
              </p>
              <div className="contact-page-primary-actions">
                <a
                  href={PHONE_TEL}
                  data-cta="contact-primary-call"
                  className="btn-primary tap-target"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <button
                  type="button"
                  data-open-quote
                  data-source="contact-page-quote"
                  data-cta="contact-page-quote"
                  className="btn-outline tap-target"
                >
                  Get a free quote
                </button>
              </div>
            </header>

            <div className="contact-page-grid">
              <aside className="contact-page-info" aria-label="How to reach us">
                <div className="contact-info-card">
                  <h2 className="contact-info-title">Call or text</h2>
                  <a
                    href={PHONE_TEL}
                    data-cta="contact-page-phone"
                    className="contact-info-phone"
                  >
                    {PHONE_DISPLAY}
                  </a>
                  <p className="contact-info-meta text-muted">
                    {HOURS_LABEL}
                    <br />
                    {HOURS_NOTE}
                  </p>
                </div>

                <div className="contact-info-card">
                  <h2 className="contact-info-title">Email</h2>
                  <a href={EMAIL_HREF} className="contact-info-link">
                    {EMAIL}
                  </a>
                </div>

                <div className="contact-info-card">
                  <h2 className="contact-info-title">Service area</h2>
                  <p className="contact-info-meta">
                    {SERVICE_BASE_CITY} · {SERVICE_REGION}
                  </p>
                  <a
                    href={GOOGLE_MAPS_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-info-link"
                    data-cta="contact-google"
                  >
                    Google reviews →
                  </a>
                </div>
              </aside>

              <div className="contact-page-form-card" id="quote">
                <h2 className="contact-form-title">Prefer a callback?</h2>
                <p className="contact-form-lede text-muted">
                  Leave your name and number — we call you back ASAP, today, or
                  this week. For a full estimate, use Get a free quote above.
                </p>
                <CallbackForm
                  source="contact-page"
                  notePrefix="Contact page callback · toromovers.com"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
