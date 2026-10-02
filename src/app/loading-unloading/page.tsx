import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import {
  LOADING_PHONE,
  LOADING_PHONE_TEL,
  loadingUnloadingPage,
  loadingUnloadingPageGraph,
} from "@/lib/loading-unloading-page";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = loadingUnloadingPage;
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
  title: "Loading & unloading help in Orlando | Short jobs",
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
 * Loading and unloading page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged service_loading_unloading.
 * Layout classes are shared with the full-service stylesheet.
 */
export default function LoadingUnloadingPage() {
  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(loadingUnloadingPageGraph()),
        }}
      />
      <section className="fs-hero" aria-labelledby="loading-unloading-heading">
        <div className="fs-copy">
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1 id="loading-unloading-heading">{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
          <ul className="fs-chips" aria-label="Loading help highlights">
            {page.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={LOADING_PHONE_TEL} data-cta="loading-call">
            <span>Call {LOADING_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="loading-quote">
              Get a free quote
            </a>
            <a href="/labor-only-moving">Full labor-only jobs</a>
          </p>
        </div>
        <QuoteWizard
          source="service_loading_unloading"
          phoneDisplay={LOADING_PHONE}
          phoneTel={LOADING_PHONE_TEL}
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
        <section aria-labelledby="loading-fit">
          <h2 id="loading-fit">{page.forWhom.h2}</h2>
          <p className="aeo-answer">{page.forWhom.intro}</p>
          <ul>
            {page.forWhom.bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            {page.forWhom.aside} <a href="/small-moves-orlando">Small moves</a>
            {" · "}
            <a href="/pod-loading-orlando">POD, U-Haul, and storage loading</a>
            {" · "}
            <a href="/full-service-moving">Full-service</a>
            {" · "}
            <a href="/labor-only-moving">Labor-only</a>.
          </p>
        </section>

        <section aria-labelledby="loading-included">
          <h2 id="loading-included">{page.included.h2}</h2>
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
        </section>

        <section aria-labelledby="loading-pricing">
          <h2 id="loading-pricing">{page.pricing.h2}</h2>
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
            <a href={LOADING_PHONE_TEL} data-cta="loading-inline">
              {LOADING_PHONE}
            </a>
            {" · "}
            <a href={QUOTE_PATH}>Get a free quote</a>.
          </p>
        </section>

        <section aria-labelledby="loading-areas">
          <h2 id="loading-areas">{page.areas.h2}</h2>
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
          Related: <a href="/small-moves-orlando">small moves</a>
          {" · "}
          <a href="/pod-loading-orlando">POD and U-Haul loading</a>
          {" · "}
          <a href="/labor-only-moving">labor-only movers</a>
          {" · "}
          <a href="/full-service-moving">full-service moving</a>
          {" · "}
          <a href="/apartment-movers-orlando-fl">apartment movers</a>
          {" · "}
          <a href="/packing-services-orlando">packing services</a>
          {" · "}
          <a href="/services">all services</a>.
        </p>

        <section id="faq" aria-labelledby="loading-faq">
          <h2 id="loading-faq">Common questions</h2>
          <dl>
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="loading-close">
          <h2 id="loading-close">{page.closing.h2}</h2>
          <p>{page.closing.body}</p>
          <a className="btn btn-red fs-call" href={LOADING_PHONE_TEL} data-cta="loading-close-call">
            <span>Call {LOADING_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="loading-close-quote">
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </section>
      </div>
    </main>
  );
}
