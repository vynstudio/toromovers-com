import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { customerProof } from "@/lib/content";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import { VectorSlot } from "@/components/ServiceIllustrations";
import {
  BUSINESS_NAME,
  GOOGLE_MAPS_REVIEWS_URL,
  GOOGLE_RATING,
  HOURS_LABEL,
  LEGAL_NAME,
  MOVES_DONE,
  PHONE_DISPLAY,
  PHONE_TEL,
  REVIEW_COUNT,
  SERVICE_BASE_CITY,
  SERVICE_REGION,
  SITE_URL,
  SLOGAN,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "About us · Family-owned Orlando movers",
  description: `${BUSINESS_NAME} is a family-owned local moving company in ${SERVICE_BASE_CITY} serving ${SERVICE_REGION}. ${GOOGLE_RATING}★ Google, bilingual crews, up-front hourly rates. Call ${PHONE_DISPLAY}.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${BUSINESS_NAME}`,
    description: `Family-owned Orlando movers — local crews, bilingual support, up-front hourly rates across ${SERVICE_REGION}.`,
    url: `${SITE_URL}/about`,
    images: [
      {
        url: customerProof.image.src,
        width: 1200,
        height: 1500,
        alt: customerProof.image.alt,
      },
    ],
  },
};

/**
 * About page — company story, trust signals, how to book.
 */
export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <section
          className="about-page full-bleed w-full"
          aria-labelledby="about-heading"
        >
          <div className="site-container about-page-inner">
            <div className="about-page-grid">
              <div className="about-page-copy">
                <p className="split-band-eyebrow">About us</p>
                <h1 id="about-heading" className="about-page-title">
                  Family-owned local movers in Orlando
                </h1>
                <p className="aeo-answer about-page-lede text-muted">
                  {customerProof.lede}
                </p>
                <p className="about-page-body text-muted">
                  {LEGAL_NAME} operates as {BUSINESS_NAME} — local crews based
                  around {SERVICE_BASE_CITY}, committed to every job.
                  We plan apartments, homes, labor-only loads, and single-item
                  deliveries around real building access: stairs, elevators,
                  loading zones, and parking. Our slogan says it simply:{" "}
                  <em>{SLOGAN}</em>.
                </p>

                <ul className="about-stats" aria-label="Trust signals">
                  <li>
                    <strong>{GOOGLE_RATING}★</strong>
                    <span>Google · {REVIEW_COUNT}+ reviews</span>
                  </li>
                  <li>
                    <strong>{MOVES_DONE}</strong>
                    <span>local moves</span>
                  </li>
                  <li>
                    <strong>EN · ES</strong>
                    <span>bilingual crews</span>
                  </li>
                  <li>
                    <strong>Local</strong>
                    <span>{SERVICE_REGION}</span>
                  </li>
                </ul>

                <div className="about-how">
                  <h2 className="about-how-title">How booking works</h2>
                  <ol className="about-how-list">
                    <li>
                      <strong>Call or get a free quote</strong> — share when
                      you need us and what you&apos;re moving.
                    </li>
                    <li>
                      <strong>We match the crew</strong> — size, access notes,
                      and up-front hourly rates explained before move day.
                    </li>
                    <li>
                      <strong>We show up and move</strong> — load, protect, and
                      place with a local team that knows Central Florida.
                    </li>
                  </ol>
                  <p className="about-how-hours text-muted">
                    Hours: {HOURS_LABEL}. Sunday on request.
                  </p>
                </div>

                <div className="about-page-actions">
                  <a
                    href={PHONE_TEL}
                    data-cta="about-call"
                    className="btn-primary tap-target"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                  <button
                    type="button"
                    data-open-quote
                    data-source="about-quote"
                    data-cta="about-quote"
                    className="btn-outline tap-target"
                  >
                    Get a free quote
                  </button>
                  <a
                    href="/contact"
                    data-cta="about-callback"
                    className="about-reviews-link"
                  >
                    Or request a callback →
                  </a>
                  <a
                    href={GOOGLE_MAPS_REVIEWS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="about-google"
                    className="about-reviews-link"
                  >
                    Read Google reviews →
                  </a>
                </div>
              </div>

              <div className="about-page-photo">
                <div className="about-page-frame">
                  {VECTORS_ONLY ? (
                    <VectorSlot kind="crew" />
                  ) : (
                    <Image
                      src={customerProof.image.src}
                      alt={customerProof.image.alt}
                      fill
                      sizes="(max-width: 899px) 92vw, 42vw"
                      quality={80}
                      priority
                      className={`object-cover ${customerProof.image.position ?? "object-center"}`}
                    />
                  )}
                </div>
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
