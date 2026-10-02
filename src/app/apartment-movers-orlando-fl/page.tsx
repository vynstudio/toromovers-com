import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import {
  APARTMENT_PHONE,
  APARTMENT_PHONE_TEL,
  apartmentMoversPage,
  apartmentMoversPageGraph,
} from "@/lib/apartment-movers-page";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = apartmentMoversPage;
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
  title: "Apartment movers in Orlando | Stairs, elevators & condos",
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
 * Apartment movers page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged service_apartment.
 * Layout classes are shared with the full-service stylesheet.
 */
export default function ApartmentMoversOrlandoPage() {
  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(apartmentMoversPageGraph()),
        }}
      />
      <section className="fs-hero" aria-labelledby="apartment-movers-heading">
        <div className="fs-copy">
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1 id="apartment-movers-heading">{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
          <ul className="fs-chips" aria-label="Apartment move highlights">
            {page.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={APARTMENT_PHONE_TEL} data-cta="apartment-movers-call">
            <span>Call {APARTMENT_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="apartment-movers-quote">
              Get a free quote
            </a>
            <a href="/labor-only-moving" data-cta="apartment-movers-labor">
              Labor-only option
            </a>
          </p>
        </div>
        <QuoteWizard
          source="service_apartment"
          phoneDisplay={APARTMENT_PHONE}
          phoneTel={APARTMENT_PHONE_TEL}
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
        <section aria-labelledby="apartment-fit">
          <h2 id="apartment-fit">{page.forWhom.h2}</h2>
          <p className="aeo-answer">{page.forWhom.intro}</p>
          <ul>
            {page.forWhom.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="apartment-access">
          <h2 id="apartment-access">{page.access.h2}</h2>
          <p>{page.access.intro}</p>
          <ul>
            {page.access.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{page.access.note}</p>
        </section>

        <section aria-labelledby="apartment-options">
          <h2 id="apartment-options">{page.options.h2}</h2>
          <p>{page.options.intro}</p>
          {page.options.blocks.map((block) => (
            <div key={block.title}>
              <h3>{block.title}</h3>
              <p>
                {block.body}{" "}
                {block.title.includes("Labor-only") ? (
                  <a href="/labor-only-moving">Labor-only movers</a>
                ) : (
                  <a href="/services">All services</a>
                )}
                .
              </p>
            </div>
          ))}
        </section>

        <section aria-labelledby="apartment-pricing">
          <h2 id="apartment-pricing">{page.pricing.h2}</h2>
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
            <a href={APARTMENT_PHONE_TEL} data-cta="apartment-inline">
              {APARTMENT_PHONE}
            </a>{" "}
            or <a href={QUOTE_PATH}>get a free quote online</a>. Read our guide:{" "}
            <a href="/blog/how-much-does-a-local-move-cost-orlando">how much movers cost in Orlando</a>.
          </p>
          <p className="fs-note">{page.pricing.marketNote}</p>
        </section>

        <section aria-labelledby="apartment-areas">
          <h2 id="apartment-areas">{page.areas.h2}</h2>
          <p>{page.areas.intro}</p>
          <ul className="fs-cities">
            {page.areas.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" aria-labelledby="apartment-faq">
          <h2 id="apartment-faq">Common questions</h2>
          <dl>
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="apartment-close">
          <h2 id="apartment-close">{page.closing.h2}</h2>
          <p>{page.closing.body}</p>
          <a className="btn btn-red fs-call" href={APARTMENT_PHONE_TEL} data-cta="apartment-movers-close-call">
            <span>Call {APARTMENT_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="apartment-movers-close-quote">
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </section>
      </div>
    </main>
  );
}
