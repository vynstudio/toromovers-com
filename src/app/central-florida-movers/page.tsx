import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import { citiesByCounty } from "@/lib/city-pages";
import {
  CENTRAL_FLORIDA_HUB_DESCRIPTION,
  CENTRAL_FLORIDA_HUB_H1,
  CENTRAL_FLORIDA_HUB_PATH,
  CENTRAL_FLORIDA_HUB_SOURCE,
  CENTRAL_FLORIDA_HUB_TITLE,
  centralFloridaHub,
  centralFloridaHubGraph,
} from "@/lib/central-florida-hub";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const pageUrl = `${SITE_URL}${CENTRAL_FLORIDA_HUB_PATH}`;
const HUB_PHONE = "321-234-0510";
const HUB_PHONE_TEL = "tel:+13212340510";
const heroPhoto = assetSrc(happyFamily);

const services = [
  { label: "full-service moving", href: "/full-service-moving" },
  { label: "labor-only moving", href: "/labor-only-moving" },
  { label: "apartment movers", href: "/apartment-movers-orlando-fl" },
  { label: "loading and unloading", href: "/loading-unloading" },
  { label: "packing services", href: "/packing-services-orlando" },
  { label: "office movers", href: "/office-movers-orlando" },
  { label: "same-day movers", href: "/same-day-movers-orlando" },
  { label: "small moves", href: "/small-moves-orlando" },
  { label: "POD and U-Haul loading", href: "/pod-loading-orlando" },
  { label: "all services", href: "/services" },
];

const PHOTOS = [
  { src: heroPhoto, alt: "Kids running into their new home on moving day" },
  { src: assetSrc(newHouse), alt: "Parents and a child at the door of a new home" },
  { src: assetSrc(boxes), alt: "A couple with moving boxes in a living room" },
  { src: assetSrc(together), alt: "A family standing with moving boxes in a new home" },
];

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src;
}

export const metadata: Metadata = {
  title: { absolute: CENTRAL_FLORIDA_HUB_TITLE },
  description: CENTRAL_FLORIDA_HUB_DESCRIPTION,
  alternates: { canonical: CENTRAL_FLORIDA_HUB_PATH },
  robots: { index: true, follow: true },
  openGraph: {
    title: CENTRAL_FLORIDA_HUB_TITLE,
    description: CENTRAL_FLORIDA_HUB_DESCRIPTION,
    url: pageUrl,
    images: [{ url: heroPhoto, alt: PHOTOS[0].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: CENTRAL_FLORIDA_HUB_TITLE,
    description: CENTRAL_FLORIDA_HUB_DESCRIPTION,
    images: [heroPhoto],
  },
};

/**
 * Central Florida regional page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard keep the existing source city-central-florida-movers.
 */
export default function CentralFloridaMoversPage() {
  const counties = citiesByCounty().filter((group) => group.cities.length > 0);

  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(centralFloridaHubGraph()) }}
      />
      <section className="fs-hero" aria-labelledby="region-heading">
        <div className="fs-copy">
          <p className="eyebrow">{centralFloridaHub.eyebrow}</p>
          <h1 id="region-heading">{CENTRAL_FLORIDA_HUB_H1}</h1>
          <p className="aeo-answer">{centralFloridaHub.lede}</p>
          <ul className="fs-chips" aria-label="Central Florida moving highlights">
            {centralFloridaHub.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={HUB_PHONE_TEL} data-cta="central-florida-call">
            <span>Call {HUB_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="central-florida-quote">
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </div>
        <QuoteWizard
          source={CENTRAL_FLORIDA_HUB_SOURCE}
          phoneDisplay={HUB_PHONE}
          phoneTel={HUB_PHONE_TEL}
          formId="quote-form"
        />
      </section>

      <section className="fs-photos" aria-label="Families on moving day">
        {PHOTOS.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            width={960}
            height={720}
            loading="lazy"
            decoding="async"
          />
        ))}
      </section>

      <div className="fs-body">
        {centralFloridaHub.sections.map((section) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section aria-labelledby="region-services">
          <h2 id="region-services">Moving services across the region</h2>
          <p>
            Each service has its own page. Start with the one that matches the truck, the building, and the size of the job.
          </p>
          <ul className="fs-cities">
            {services.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="region-cities">
          <h2 id="region-cities">Cities we serve in Central Florida</h2>
          <p>
            Orlando is home base. Every city below has its own movers page, including the{" "}
            <a href="/orlando-movers">Orlando movers</a> page for a job that stays in the city.
          </p>
          {counties.map((group) => (
            <div key={group.county}>
              <h3>{group.county}</h3>
              <ul className="fs-cities">
                {group.cities.map((city) => (
                  <li key={city.href}>
                    <a href={city.href}>{city.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section id="faq" aria-labelledby="region-faq">
          <h2 id="region-faq">Common questions</h2>
          <dl>
            {centralFloridaHub.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="region-close">
          <h2 id="region-close">{centralFloridaHub.closing.h2}</h2>
          <p>{centralFloridaHub.closing.body}</p>
          <a className="btn btn-red fs-call" href={HUB_PHONE_TEL} data-cta="central-florida-close-call">
            <span>Call {HUB_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="central-florida-close-quote">
              Get a free quote
            </a>
            <a href="/orlando-movers">Orlando movers</a>
          </p>
        </section>
      </div>
    </main>
  );
}
