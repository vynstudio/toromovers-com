import Image from "next/image";
import { servicesHub } from "@/lib/services-hub";
import { FeatureIcon, IconArrow } from "@/components/icons";

/**
 * DID-style services hub on homepage — all core services, linked + photo proof.
 * Layout stays card grid; light accent on icons/links.
 */
export function FeatureGrid() {
  return (
    <section
      id="services"
      className="full-bleed section-pad w-full bg-white"
      aria-labelledby="services-heading"
    >
      <div className="site-container">
        <header className="services-hub-head">
          <p className="services-hub-eyebrow">{servicesHub.eyebrow}</p>
          <h2
            id="services-heading"
            className="fluid-h2 text-center text-foreground"
          >
            {servicesHub.heading}
          </h2>
          <p className="aeo-answer services-hub-lead text-muted">
            {servicesHub.lead}
          </p>
        </header>

        <div className="services-hub-grid">
          {servicesHub.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="services-hub-card"
              data-cta={`service-${item.href.replace(/\//g, "")}`}
            >
              <div className="services-hub-img">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="services-hub-body">
                <div className="services-hub-icon" aria-hidden>
                  <FeatureIcon name={item.icon} />
                </div>
                <h3 className="fluid-h3 text-foreground">{item.title}</h3>
                <p className="aeo-answer services-hub-copy text-muted">
                  {item.body}
                </p>
                <span className="services-hub-link">
                  Learn more <IconArrow />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="services-hub-actions">
          <button
            type="button"
            data-open-quote
            data-source="features-quote"
            data-cta="features-quote"
            className="btn-primary btn-fluid tap-target inline-flex"
          >
            {servicesHub.cta}
            <IconArrow />
          </button>
          <a
            href={servicesHub.galleryHref}
            className="btn-outline btn-fluid tap-target inline-flex"
            data-cta="services-gallery"
          >
            {servicesHub.galleryCta}
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
