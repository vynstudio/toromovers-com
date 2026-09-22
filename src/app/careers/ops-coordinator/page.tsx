import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ClientChrome } from "@/components/ClientChrome";
import { SafeImage } from "@/components/SafeImage";
import {
  BUSINESS_NAME,
  CAREERS_OPS_COORDINATOR_PATH,
  EMAIL,
  SITE_URL,
} from "@/lib/site";

const ROLE = "Remote Operations Coordinator";
const EMPLOYER = "Diler Dynamics Group";
const APPLY_SUBJECT = "OPS Coordinator — Honduras";
/** Availability for this role. Toro Movers customer hours are separate. */
const ROLE_HOURS = "Monday–Saturday, 9:00 AM–5:00 PM ET";
const APPLY_HREF = `mailto:${EMAIL}?subject=${encodeURIComponent(APPLY_SUBJECT)}`;

const DESCRIPTION =
  "Diler Dynamics Group is hiring a Remote Operations Coordinator based in Honduras. Fully remote. $500 USD/month base plus commissions. Apply by email.";

const PAGE_TITLE = "Remote Operations Coordinator in Honduras";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CAREERS_OPS_COORDINATOR_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}${CAREERS_OPS_COORDINATOR_PATH}`,
    siteName: BUSINESS_NAME,
    title: `${PAGE_TITLE} · ${BUSINESS_NAME}`,
    description: DESCRIPTION,
    images: [
      {
        url: "/og/default.jpg",
        width: 1200,
        height: 630,
        alt: "Toro Movers — Remote Operations Coordinator role based in Honduras",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PAGE_TITLE} · ${BUSINESS_NAME}`,
    description: DESCRIPTION,
    images: ["/og/default.jpg"],
  },
};

const RESPONSIBILITIES = [
  "Respond to inbound leads via WhatsApp, email, and phone",
  "Prepare and send customer quotes, and manage follow-ups through booking",
  "Maintain the CRM, calendar, and pipeline",
  "Light bookkeeping and operational admin",
] as const;

const QUALIFICATIONS = [
  "Based in Honduras (required)",
  "English proficiency required",
  "Sales experience preferred, or a strong desire to learn",
  "No prior industry experience required; training provided",
  "Comfortable learning WhatsApp Business, Gmail, CRM, calendar, and basic bookkeeping",
  `Available ${ROLE_HOURS}`,
  "Able to start this week",
] as const;

function jobPostingJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: ROLE,
    description:
      `<p>Fully remote Remote Operations Coordinator. Candidates must be based in Honduras. The role supports day-to-day operations for Toro Movers, a U.S. moving-services business, at Diler Dynamics Group.</p><ul><li>Respond to inbound leads via WhatsApp, email, and phone</li><li>Prepare and send customer quotes, and manage follow-ups through booking</li><li>Maintain the CRM, calendar, and pipeline</li><li>Light bookkeeping and operational admin</li></ul><p>Compensation: $500 USD per month base, plus sales commissions. Typical total earnings are $1,100–$2,000 USD per month.</p><p>English proficiency is required. Sales experience is preferred. No prior moving-industry experience is required; training is provided. Hours of availability: ${ROLE_HOURS}. Able to start this week.</p>`,
    datePosted: "2026-09-21",
    validThrough: "2026-12-31",
    employmentType: "FULL_TIME",
    jobLocationType: "TELECOMMUTE",
    applicantLocationRequirements: {
      "@type": "Country",
      name: "Honduras",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "HN",
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: EMPLOYER,
      sameAs: SITE_URL,
      url: SITE_URL,
    },
    industry: "Moving services",
    directApply: true,
    url: `${SITE_URL}${CAREERS_OPS_COORDINATOR_PATH}`,
    baseSalary: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: {
        "@type": "QuantitativeValue",
        value: 500,
        unitText: "MONTH",
      },
    },
    incentiveCompensation:
      "Sales commissions. Typical total earnings $1,100–$2,000 USD per month.",
    workHours: ROLE_HOURS,
  };
}

function ApplyActions({
  id,
  cta,
}: {
  id?: string;
  cta: string;
}) {
  return (
    <div className="careers-actions" id={id}>
      <a
        href={APPLY_HREF}
        data-cta={cta}
        className="btn-primary tap-target btn-fluid careers-apply-btn"
      >
        Email your resume
      </a>
      <p className="careers-subject">
        Subject line: <strong>{APPLY_SUBJECT}</strong>
      </p>
      <p className="careers-email-line">
        <span className="careers-email">{EMAIL}</span>
      </p>
    </div>
  );
}

/**
 * Hiring landing page for the Honduras-based Remote Operations Coordinator.
 * Shared from Instagram, WhatsApp, and job posts — short, scannable, one CTA.
 */
export default function OpsCoordinatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jobPostingJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <header className="careers-header">
        <div className="site-container-narrow careers-header-inner">
          <Link
            href="/"
            className="brand-lockup tap-target"
            aria-label={`${BUSINESS_NAME} home`}
          >
            <span className="brand-mark" aria-hidden>
              <SafeImage
                src="/logos/toro-bull-black.svg"
                alt=""
                width={32}
                height={26}
                priority
                className="brand-bull"
              />
            </span>
            <span className="brand-name">
              TORO<span className="brand-dot">·</span>MOVERS
            </span>
          </Link>
          <p className="careers-header-label">Careers</p>
        </div>
      </header>

      <main id="main" className="careers-page full-bleed w-full min-w-0 flex-1">
        <div className="site-container-narrow">
          <p className="careers-eyebrow">Now hiring</p>
          <h1 className="careers-title">
            Build your career in operations — remote from Honduras.
          </h1>

          <p className="careers-required" role="note">
            <span className="careers-required-kicker">Required</span>
            <strong>Candidates must be based in Honduras.</strong>
          </p>

          <p className="careers-lede text-muted">
            {EMPLOYER} is hiring a {ROLE}.
          </p>

          <ApplyActions cta="careers-apply-hero" />

          <h2 className="careers-h2">The role</h2>
          <ul className="careers-facts">
            <li>
              <strong>Fully remote</strong>
              <span>Work from home. No office commute.</span>
            </li>
            <li>
              <strong>Based in Honduras</strong>
              <span>Required. This is not open to other countries.</span>
            </li>
            <li>
              <strong>U.S. moving services</strong>
              <span>
                Day-to-day operations for Toro Movers / {EMPLOYER}.
              </span>
            </li>
          </ul>

          <h2 className="careers-h2">Pay</h2>
          <div className="careers-pay">
            <p className="careers-pay-amount">$500 USD</p>
            <p className="careers-pay-label">per month base, plus sales commissions</p>
            <p className="careers-pay-total">$1,100–$2,000 USD</p>
            <p className="careers-pay-label">typical total earnings per month</p>
          </div>

          <h2 className="careers-h2">What you will do</h2>
          <ul className="careers-list">
            {RESPONSIBILITIES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h2 className="careers-h2">What you need</h2>
          <ul className="careers-list">
            {QUALIFICATIONS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <section className="careers-apply" aria-labelledby="apply-heading">
            <h2 id="apply-heading" className="careers-h2 careers-h2--plain">
              How to apply
            </h2>
            <p className="careers-apply-copy text-muted">
              Email your resume or CV. The button opens your email app with
              the subject line filled in.
            </p>
            <ApplyActions id="apply" cta="careers-apply-bottom" />
          </section>

          <p className="careers-footnote">
            {EMPLOYER}. Only candidates based in Honduras will be considered.
          </p>
        </div>
      </main>

      <Footer />

      <div
        className="sticky-cta-bar is-visible fixed inset-x-0 bottom-0 w-full px-3 pt-3 md:hidden"
      >
        <div className="sticky-cta-shell" role="group" aria-label="Apply">
          <a
            href={APPLY_HREF}
            data-cta="careers-apply-sticky"
            className="btn-primary tap-target inline-flex"
          >
            <span className="sticky-cta-label">Email your resume</span>
          </a>
        </div>
      </div>

      <ClientChrome />
    </>
  );
}
