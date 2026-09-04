import type { Metadata } from "next";
import Image from "next/image";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { servicesHub } from "@/lib/services-hub";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import {
  VectorSlot,
  illustrationKeyAt,
} from "@/components/ServiceIllustrations";
import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_REGION,
  SITE_URL,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Moving services in Orlando & Central Florida",
  description: `${BUSINESS_NAME} moving services: residential, labor-only, single-item delivery, apartment, full-service, and commercial moves across ${SERVICE_REGION}. Call ${PHONE_DISPLAY}.`,
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Moving services · ${BUSINESS_NAME}`,
    description: `Residential, labor-only, delivery, apartment & commercial movers in ${SERVICE_REGION}.`,
    url: `${SITE_URL}/services`,
  },
};

/**
 * Services hub — silo parent for all move types.
 * Primary cards (3) + more services (secondary).
 */
export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main id="main" className="w-full min-w-0 flex-1">
        <section
          className="services-hub-page full-bleed w-full"
          aria-labelledby="services-hub-heading"
        >
          <div className="site-container services-hub-inner">
            <header className="services-hub-head">
              <p className="split-band-eyebrow">{servicesHub.eyebrow}</p>
              <h1 id="services-hub-heading" className="services-hub-title">
                {servicesHub.heading}
              </h1>
              <p className="aeo-answer services-hub-lede text-muted">
                {servicesHub.lead}
              </p>
              <div className="services-hub-actions">
                <a
                  href={PHONE_TEL}
                  data-cta="services-hub-call"
                  className="btn-primary tap-target"
                >
                  Call {PHONE_DISPLAY}
                </a>
                <button
                  type="button"
                  data-open-quote
                  data-source="services-hub-quote"
                  data-cta="services-hub-quote"
                  className="btn-outline tap-target"
                >
                  {servicesHub.cta}
                </button>
              </div>
            </header>

            <h2 className="services-hub-section-label">Main services</h2>
            <ul className="services-hub-grid" aria-label="Main moving services">
              {servicesHub.primary.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="services-hub-card"
                    data-cta={`services-hub-${item.href.replace(/\//g, "")}`}
                  >
                    <span className="services-hub-card-frame">
                      {VECTORS_ONLY ? (
                        <VectorSlot kind={item.illustration ?? "local"} />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 45vw, 30vw"
                          quality={75}
                          className="object-cover object-center"
                        />
                      )}
                    </span>
                    <span className="services-hub-card-body">
                      {item.badge ? (
                        <span className="svc-card-badge">{item.badge}</span>
                      ) : null}
                      <span className="services-hub-card-title">
                        {item.title}
                      </span>
                      <span className="services-hub-card-copy text-muted">
                        {item.body}
                      </span>
                      <span className="services-hub-card-link">
                        View service <span aria-hidden>→</span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="services-hub-section-label">More ways we help</h2>
            <ul
              className="services-hub-grid services-hub-grid--secondary"
              aria-label="Additional moving services"
            >
              {servicesHub.secondary.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="services-hub-card services-hub-card--compact"
                    data-cta={`services-hub-${item.href.replace(/\//g, "")}`}
                  >
                    <span className="services-hub-card-frame services-hub-card-frame--sm">
                      {VECTORS_ONLY ? (
                        <VectorSlot kind={illustrationKeyAt(i)} />
                      ) : (
                        <Image
                          src={item.image}
                          alt={item.imageAlt}
                          fill
                          sizes="(max-width: 639px) 92vw, 30vw"
                          quality={70}
                          className="object-cover object-center"
                        />
                      )}
                    </span>
                    <span className="services-hub-card-body">
                      <span className="services-hub-card-title">
                        {item.title}
                      </span>
                      <span className="services-hub-card-copy text-muted">
                        {item.body}
                      </span>
                      <span className="services-hub-card-link">
                        View service <span aria-hidden>→</span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="services-hub-foot text-muted">
              Not sure which option fits?{" "}
              <button
                type="button"
                data-open-quote
                data-source="services-hub-foot"
                data-cta="services-hub-foot-quote"
                className="services-hub-foot-btn"
              >
                Get a free quote
              </button>{" "}
              or{" "}
              <a href="/contact" data-cta="services-hub-foot-contact">
                request a callback
              </a>{" "}
              — call {PHONE_DISPLAY} anytime. We&apos;ll match the right crew
              for your {SERVICE_REGION} move.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
