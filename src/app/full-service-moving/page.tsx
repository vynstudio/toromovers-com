import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import {
  FULL_SERVICE_PHONE,
  FULL_SERVICE_PHONE_TEL,
  fullServicePage,
  fullServicePageGraph,
} from "@/lib/full-service-page";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = fullServicePage;
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
  title: "Full-service movers in Orlando | Truck, crew & placement",
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
 * Full-service service page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged service_full_service.
 */
export default function FullServiceMovingPage() {
  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(fullServicePageGraph()),
        }}
      />
      <section className="fs-hero" aria-labelledby="full-service-heading">
        <div className="fs-copy">
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1 id="full-service-heading">{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
          <ul className="fs-chips" aria-label="Full-service highlights">
            {page.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={FULL_SERVICE_PHONE_TEL} data-cta="full-service-call">
            <span>Call {FULL_SERVICE_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="full-service-quote">
              Get a free quote
            </a>
            <a href="/blog/full-service-vs-labor-only-orlando" data-cta="full-service-compare">
              Full-service vs labor-only
            </a>
          </p>
        </div>
        <QuoteWizard
          source="service_full_service"
          phoneDisplay={FULL_SERVICE_PHONE}
          phoneTel={FULL_SERVICE_PHONE_TEL}
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
        <section aria-labelledby="full-service-fit">
          <h2 id="full-service-fit">{page.forWhom.h2}</h2>
          <p className="aeo-answer">{page.forWhom.intro}</p>
          <ul>
            {page.forWhom.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {page.forWhom.aside} <a href="/labor-only-moving">Labor-only movers</a>.
          </p>
        </section>

        <section aria-labelledby="full-service-included">
          <h2 id="full-service-included">{page.included.h2}</h2>
          <p>{page.included.intro}</p>
          <h3>Usually included</h3>
          <ul>
            {page.included.weBring.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3>Share when you book</h3>
          <ul>
            {page.included.youShare.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>{page.included.note}</p>
        </section>

        <section aria-labelledby="full-service-compare-heading">
          <h2 id="full-service-compare-heading">{page.vsLabor.h2}</h2>
          <p className="aeo-answer">{page.vsLabor.intro}</p>
          <div className="fs-split">
            {page.vsLabor.blocks.map((block) => (
              <article key={block.title}>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </article>
            ))}
          </div>
          <p>
            Deeper comparison:{" "}
            <a href="/blog/full-service-vs-labor-only-orlando">
              full-service vs labor-only in Orlando
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="full-service-pricing">
          <h2 id="full-service-pricing">{page.pricing.h2}</h2>
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
            <a href={FULL_SERVICE_PHONE_TEL} data-cta="full-service-inline">
              {FULL_SERVICE_PHONE}
            </a>{" "}
            or <a href={QUOTE_PATH}>get a free quote online</a>. Also see{" "}
            <a href="/blog/how-much-does-a-local-move-cost-orlando">how much movers cost in Orlando</a>.
          </p>
          <p className="fs-note">{page.pricing.marketNote}</p>
        </section>

        <section aria-labelledby="full-service-areas">
          <h2 id="full-service-areas">{page.areas.h2}</h2>
          <p>{page.areas.intro}</p>
          <ul className="fs-cities">
            {page.areas.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        {page.sections.map((section) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <p>
          Related: <a href="/labor-only-moving">labor-only movers</a>
          {" · "}
          <a href="/apartment-movers-orlando-fl">apartment movers</a>
          {" · "}
          <a href="/packing-services-orlando">packing services</a>
          {" · "}
          <a href="/loading-unloading">loading and unloading</a>
          {" · "}
          <a href="/services">all services</a>.
        </p>

        <section id="faq" aria-labelledby="full-service-faq">
          <h2 id="full-service-faq">Common questions</h2>
          <dl>
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="full-service-close">
          <h2 id="full-service-close">{page.closing.h2}</h2>
          <p>{page.closing.body}</p>
          <a className="btn btn-red fs-call" href={FULL_SERVICE_PHONE_TEL} data-cta="full-service-close-call">
            <span>Call {FULL_SERVICE_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="full-service-close-quote">
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </section>
      </div>
    </main>
  );
}
