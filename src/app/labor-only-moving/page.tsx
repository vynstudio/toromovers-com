import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import {
  LABOR_ONLY_PHONE,
  LABOR_ONLY_PHONE_TEL,
  laborOnlyPage,
  laborOnlyPageGraph,
} from "@/lib/labor-only-page";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = laborOnlyPage;
const pageUrl = `${SITE_URL}${page.path}`;
const heroPhoto = assetSrc(happyFamily);

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
  title: "Labor-only movers in Orlando | Load & unload by the hour",
  description: page.metadata.description,
  alternates: { canonical: page.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    url: pageUrl,
    images: [{ url: heroPhoto, alt: PHOTOS[0].alt }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.metadata.ogTitle,
    description: page.metadata.ogDescription,
    images: [heroPhoto],
  },
};

/**
 * Labor-only service page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged service_labor_only.
 * Layout classes are shared with the full-service stylesheet.
 */
export default function LaborOnlyMovingPage() {
  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(laborOnlyPageGraph()),
        }}
      />
      <section className="fs-hero" aria-labelledby="labor-only-heading">
        <div className="fs-copy">
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1 id="labor-only-heading">{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
          <ul className="fs-chips" aria-label="Labor-only highlights">
            {page.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={LABOR_ONLY_PHONE_TEL} data-cta="labor-only-call">
            <span>Call {LABOR_ONLY_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="labor-only-quote">
              Get a free quote
            </a>
            <a href="/orlando-movers-gallery" data-cta="labor-only-gallery">
              See recent moves
            </a>
          </p>
        </div>
        <QuoteWizard
          source="service_labor_only"
          phoneDisplay={LABOR_ONLY_PHONE}
          phoneTel={LABOR_ONLY_PHONE_TEL}
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
        <section aria-labelledby="labor-only-fit">
          <h2 id="labor-only-fit">{page.forWhom.h2}</h2>
          <p className="aeo-answer">{page.forWhom.intro}</p>
          <ul>
            {page.forWhom.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {page.forWhom.aside} <a href="/pod-loading-orlando">POD, U-Haul, and storage loading</a>
            {" · "}
            <a href="/small-moves-orlando">Small moves</a>
            {" · "}
            <a href="/loading-unloading">Loading and unloading</a>
            {" · "}
            <a href="/full-service-moving">Full-service</a>
            {" · "}
            <a href="/services">View all services</a>.
          </p>
        </section>

        <section aria-labelledby="labor-only-included">
          <h2 id="labor-only-included">{page.included.h2}</h2>
          <p>{page.included.intro}</p>
          <h3>Usually included</h3>
          <ul>
            {page.included.weBring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>You provide</h3>
          <ul>
            {page.included.youProvide.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{page.included.note}</p>
        </section>

        <section aria-labelledby="labor-only-vehicles">
          <h2 id="labor-only-vehicles">{page.vehicles.h2}</h2>
          <p className="aeo-answer">{page.vehicles.intro}</p>
          {page.vehicles.blocks.map((block) => (
            <div key={block.title}>
              <h3>{block.title}</h3>
              <p>{block.body}</p>
            </div>
          ))}
        </section>

        <section aria-labelledby="labor-only-access">
          <h2 id="labor-only-access">{page.access.h2}</h2>
          <p>{page.access.intro}</p>
          <h3>Share these when you call or request a quote</h3>
          <ul>
            {page.access.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {page.access.note} For apartment-focused full moves, see our <a href="/services">services hub</a> and{" "}
            <a href="/orlando-movers">Orlando movers</a>.
          </p>
        </section>

        <section aria-labelledby="labor-only-pricing">
          <h2 id="labor-only-pricing">{page.pricing.h2}</h2>
          <p className="aeo-answer">{page.pricing.intro}</p>
          <ul className="fs-factors">
            {page.pricing.factors.map((factor) => (
              <li key={factor.title}>
                <strong>{factor.title}.</strong> {factor.body}
              </li>
            ))}
          </ul>
          <p>
            {page.pricing.close} Call or text{" "}
            <a href={LABOR_ONLY_PHONE_TEL} data-cta="labor-only-inline">
              {LABOR_ONLY_PHONE}
            </a>{" "}
            or <a href={QUOTE_PATH}>get a free quote online</a>.
          </p>
          <p className="fs-note">{page.pricing.marketNote}</p>
        </section>

        <section aria-labelledby="labor-only-areas">
          <h2 id="labor-only-areas">{page.areas.h2}</h2>
          <p>{page.areas.intro}</p>
          <ul className="fs-cities">
            {page.areas.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="labor-only-why">
          <h2 id="labor-only-why">{page.why.h2}</h2>
          <ul>
            {page.why.items.map((item) => (
              <li key={item.title}>
                <strong>{item.title}.</strong> {item.body}
              </li>
            ))}
          </ul>
          <p>
            See real job photos in the <a href="/orlando-movers-gallery">Orlando movers gallery</a>.
          </p>
        </section>

        <section id="faq" aria-labelledby="labor-only-faq">
          <h2 id="labor-only-faq">Common questions</h2>
          <dl>
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="labor-only-close">
          <h2 id="labor-only-close">{page.closing.h2}</h2>
          <p>{page.closing.body}</p>
          <a className="btn btn-red fs-call" href={LABOR_ONLY_PHONE_TEL} data-cta="labor-only-close-call">
            <span>Call {LABOR_ONLY_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="labor-only-close-quote">
              Get a free quote
            </a>
            <a href="/services" data-cta="labor-only-close-services">
              All services
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
