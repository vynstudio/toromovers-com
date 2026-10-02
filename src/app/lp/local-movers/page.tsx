import type { Metadata } from "next";
import UniversalLeadForm from "@/components/funnel/UniversalLeadForm";
import QuotesFaq from "@/components/funnel/QuotesFaq";
import {
  LP_DESCRIPTION,
  LP_H1,
  LP_LEDE,
  LP_PATH,
  LP_PHONE,
  LP_PHONE_TEL,
  LP_ROBOTS,
  LP_SERVICES,
  LP_TITLE,
  lpFaqGraph,
} from "@/lib/lp-local-page";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: LP_TITLE,
  description: LP_DESCRIPTION,
  robots: LP_ROBOTS,
  alternates: { canonical: LP_PATH },
  openGraph: {
    title: LP_TITLE,
    description: LP_DESCRIPTION,
    url: `${SITE_URL}${LP_PATH}`,
  },
  twitter: {
    card: "summary_large_image",
    title: LP_TITLE,
    description: LP_DESCRIPTION,
  },
};

const steps = [
  ["1", "Choose service"],
  ["2", "Add move details"],
  ["3", "Get connected"],
] as const;

/**
 * Ads landing. Form payload, attribution, and Lead tracking stay in UniversalLeadForm.
 * Header and footer are the nav-free LP chrome mounted in PageView.
 */
export default function LocalMoversLandingPage() {
  return (
    <main id="main" className="lp-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lpFaqGraph()) }}
      />
      <section className="lp-hero" aria-labelledby="lp-heading">
        <div className="lp-copy">
          <p className="eyebrow">Local movers</p>
          <h1 id="lp-heading">{LP_H1}</h1>
          <p className="aeo-answer">{LP_LEDE}</p>
          <div className="lp-actions">
            <a className="btn btn-red" href="#quote-form" data-track="quote">
              <span>Get my free quote</span>
            </a>
            <a
              className="btn btn-red"
              href={LP_PHONE_TEL}
              data-cta="lp-local-call"
              data-track="phone"
            >
              <span>Call {LP_PHONE}</span>
            </a>
          </div>
        </div>
        <ul className="lp-services">
          {LP_SERVICES.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </section>

      <section className="lp-form-band">
        <div className="lp-steps">
          <p className="eyebrow">Get started</p>
          <h2>Tell us what kind of move you need.</h2>
          <p>
            Choose your service, answer a few quick questions, and send your
            request. We will use the details to prepare the right next step.
          </p>
          <ol>
            {steps.map(([number, label]) => (
              <li key={number}>
                <span>{number}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>
        <UniversalLeadForm source="local_movers_ads_landing" />
      </section>

      <section className="lp-why">
        <p className="eyebrow">Why Toro Movers</p>
        <h2>
          A straightforward way to get moving help without a complicated quote
          process.
        </h2>
        <div className="lp-why-grid">
          <article>
            <h3>Choose the right service</h3>
            <p>
              Full-service, labor-only, container, rental-truck, special-item,
              and small-move options in one quote flow.
            </p>
          </article>
          <article>
            <h3>Share the details that matter</h3>
            <p>
              Your move details help the team understand access, timing,
              locations, and scope before following up.
            </p>
          </article>
          <article>
            <h3>Get a clear next step</h3>
            <p>
              Send your request online or call the team directly when you need
              help right away.
            </p>
          </article>
        </div>
      </section>
      <QuotesFaq />
    </main>
  );
}
