import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import { serviceGuideGraph, smallMovesPage } from "@/lib/service-guides";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const page = smallMovesPage;
const pageUrl = `${SITE_URL}${page.path}`;
const SMALL_PHONE = "321-234-0510";
const SMALL_PHONE_TEL = "tel:+13212340510";
const heroPhoto = assetSrc(happyFamily);
const related = [
  { label: "loading and unloading", href: "/loading-unloading" },
  { label: "POD and U-Haul loading", href: "/pod-loading-orlando" },
  { label: "labor-only moving", href: "/labor-only-moving" },
  { label: "full-service moving", href: "/full-service-moving" },
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
  title: page.metadata.title,
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
 * Small moves page. Homepage header and footer come from the page shell.
 * Leads from the quote wizard are tagged service_small_moves.
 * Layout classes are shared with the full-service stylesheet.
 */
export default function SmallMovesOrlandoPage() {
  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceGuideGraph(page)),
        }}
      />
      <section className="fs-hero" aria-labelledby="small-moves-heading">
        <div className="fs-copy">
          <p className="eyebrow">{page.hero.eyebrow}</p>
          <h1 id="small-moves-heading">{page.hero.h1}</h1>
          <p className="aeo-answer">{page.hero.lede}</p>
          <ul className="fs-chips" aria-label="Small move highlights">
            {page.hero.chips.map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <a className="btn btn-red fs-call" href={SMALL_PHONE_TEL} data-cta="small-moves-orlando-call">
            <span>Call {SMALL_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="small-moves-orlando-quote">
              Get a free quote
            </a>
            <a href={page.hero.blogHref}>{page.hero.blogLabel}</a>
          </p>
        </div>
        <QuoteWizard
          source="service_small_moves"
          phoneDisplay={SMALL_PHONE}
          phoneTel={SMALL_PHONE_TEL}
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
        <p>{page.hero.blogNote}</p>

        {page.sections.map((section) => (
          <section key={section.h2}>
            <h2>{section.h2}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section aria-labelledby="small-moves-areas">
          <h2 id="small-moves-areas">{page.areas.h2}</h2>
          <p>{page.areas.intro}</p>
          <ul className="fs-cities">
            {page.areas.links.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <p>
          Related: <a href={page.hero.blogHref}>{page.hero.blogLabel}</a>
          {related.map((link) => (
            <span key={link.href}>
              {" · "}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </p>

        <section id="faq" aria-labelledby="small-moves-faq">
          <h2 id="small-moves-faq">Common questions</h2>
          <dl>
            {page.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby="small-moves-close">
          <h2 id="small-moves-close">{page.closing.h2}</h2>
          <p>{page.closing.body}</p>
          <a className="btn btn-red fs-call" href={SMALL_PHONE_TEL} data-cta="small-moves-orlando-close-call">
            <span>Call {SMALL_PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta="small-moves-orlando-close-quote">
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </section>
      </div>
    </main>
  );
}
