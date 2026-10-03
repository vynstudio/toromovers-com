import type { Metadata } from "next";
import QuoteWizard from "@/components/home/QuoteWizard";
import boxes from "../../assets/home/family-boxes-2.jpg";
import newHouse from "../../assets/home/family-new-house-3.jpg";
import together from "../../assets/home/family-together-6.jpg";
import happyFamily from "../../assets/home/happy-family.jpg";
import { nearbyCityPages } from "@/lib/city-pages";
import { cityRebrandGraph, type CityRebrandCopy } from "@/lib/city-rebrand";
import { QUOTE_PATH, SITE_URL } from "@/lib/site";

const PHONE = "321-234-0510";
const PHONE_TEL = "tel:+13212340510";

const SERVICES = [
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

function assetSrc(asset: string | { src: string }) {
  return typeof asset === "string" ? asset : asset.src;
}

const heroPhoto = assetSrc(happyFamily);
const PHOTOS = [
  { src: heroPhoto, alt: "Kids running into their new home on moving day" },
  { src: assetSrc(newHouse), alt: "Parents and a child at the door of a new home" },
  { src: assetSrc(boxes), alt: "A couple with moving boxes in a living room" },
  { src: assetSrc(together), alt: "A family standing with moving boxes in a new home" },
];

export function cityMetadata(city: CityRebrandCopy): Metadata {
  const pageUrl = `${SITE_URL}${city.path}`;
  return {
    title: { absolute: city.title },
    description: city.description,
    alternates: { canonical: city.path },
    robots: { index: true, follow: true },
    openGraph: {
      title: city.title,
      description: city.description,
      url: pageUrl,
      images: [{ url: heroPhoto, alt: PHOTOS[0].alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: city.title,
      description: city.description,
      images: [heroPhoto],
    },
  };
}

export function RebrandCityPage({ city }: { city: CityRebrandCopy }) {
  const headingId = `${city.slug}-heading`;
  const nearby = nearbyCityPages(city.slug).filter((item) => item.slug !== "orlando-movers");

  return (
    <main id="main" className="fs-rebrand">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(cityRebrandGraph(city)) }}
      />
      <section className="fs-hero" aria-labelledby={headingId}>
        <div className="fs-copy">
          <p className="eyebrow">{city.eyebrow}</p>
          <h1 id={headingId}>{city.h1}</h1>
          <p className="aeo-answer">{city.lede}</p>
          {city.chips.length > 0 ? (
            <ul className="fs-chips" aria-label={`${city.cityName} moving highlights`}>
              {city.chips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          ) : null}
          <a className="btn btn-red fs-call" href={PHONE_TEL} data-cta={`${city.slug}-call`}>
            <span>Call {PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta={`${city.slug}-quote`}>
              Get a free quote
            </a>
            <a href="/services">All services</a>
          </p>
        </div>
        <QuoteWizard
          source={city.source}
          phoneDisplay={PHONE}
          phoneTel={PHONE_TEL}
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
        {city.included ? (
          <section aria-labelledby={`${city.slug}-included`}>
            <h2 id={`${city.slug}-included`}>{city.included.heading}</h2>
            <ul>
              {city.included.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {(Array.isArray(city.localNote) ? city.localNote : city.localNote ? [city.localNote] : []).map(
              (paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ),
            )}
          </section>
        ) : (
          city.sections.map((section) => (
            <section key={section.h2}>
              <h2>{section.h2}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </section>
          ))
        )}

        <section aria-labelledby={`${city.slug}-services`}>
          <h2 id={`${city.slug}-services`}>{city.servicesHeading}</h2>
          {city.servicesIntro ? <p>{city.servicesIntro}</p> : null}
          <ul className="fs-cities">
            {SERVICES.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby={`${city.slug}-cities`}>
          <h2 id={`${city.slug}-cities`}>{city.nearbyHeading}</h2>
          <p>
            {city.nearbyIntro}{" "}
            <a href="/orlando-movers">Orlando movers</a>
            {" · "}
            <a href="/central-florida-movers">Central Florida movers</a>
          </p>
          <ul className="fs-cities">
            {nearby.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.name}</a>
              </li>
            ))}
          </ul>
        </section>

        <section id="faq" aria-labelledby={`${city.slug}-faq`}>
          <h2 id={`${city.slug}-faq`}>Common questions</h2>
          <dl>
            {city.faqs.map((item) => (
              <div key={item.q}>
                <dt>{item.q}</dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="fs-close" aria-labelledby={`${city.slug}-close`}>
          <h2 id={`${city.slug}-close`}>{city.closing.h2}</h2>
          <p>{city.closing.body}</p>
          <a className="btn btn-red fs-call" href={PHONE_TEL} data-cta={`${city.slug}-close-call`}>
            <span>Call {PHONE}</span>
          </a>
          <p className="fs-actions">
            <a href={QUOTE_PATH} data-cta={`${city.slug}-close-quote`}>
              Get a free quote
            </a>
            <a href="/orlando-movers">Orlando movers</a>
          </p>
        </section>
      </div>
    </main>
  );
}
