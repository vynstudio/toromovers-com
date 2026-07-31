import Image from "next/image";
import { process } from "@/lib/content";
import { servicesHub } from "@/lib/services-hub";
import { IconArrow } from "@/components/icons";

/**
 * S1 services hub + how-it-works footer (process no longer a separate section).
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

        <div className="services-hub-primary">
          {servicesHub.primary.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="services-hub-card services-hub-card--primary"
              data-cta={`service-${item.href.replace(/\//g, "")}`}
            >
              <div className="services-hub-img services-hub-img--primary">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                  quality={70}
                  loading="lazy"
                  className="object-cover object-center"
                />
                {item.badge ? (
                  <span className="services-hub-badge">{item.badge}</span>
                ) : null}
              </div>
              <div className="services-hub-body">
                <h3 className="services-hub-title text-foreground">
                  {item.title}
                </h3>
                <p className="aeo-answer services-hub-copy text-muted">
                  {item.body}
                </p>
                <span className="services-hub-link">
                  View service <IconArrow />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="services-hub-secondary" aria-label="More services">
          {servicesHub.secondary.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="services-hub-row"
              data-cta={`service-${item.href.replace(/\//g, "")}`}
            >
              <div className="services-hub-row-img">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="96px"
                  quality={60}
                  loading="lazy"
                  className="object-cover object-center"
                />
              </div>
              <div className="services-hub-row-body">
                <h3 className="services-hub-row-title">{item.title}</h3>
                <p className="services-hub-row-copy text-muted">{item.body}</p>
              </div>
              <span className="services-hub-row-chevron" aria-hidden>
                <IconArrow />
              </span>
            </a>
          ))}
        </div>

        {/* How it works — footer of services (replaces standalone Process) */}
        <div id="how-it-works" className="services-hub-footer">
          <p className="services-hub-footer-label">{process.heading}</p>
          <ol className="services-hub-steps">
            {process.steps.map((step, i) => (
              <li key={step.name} className="services-hub-step">
                <span className="services-hub-step-num" aria-hidden>
                  {i + 1}
                </span>
                <span className="services-hub-step-copy">
                  <span className="services-hub-step-name">{step.name}</span>
                  <span className="services-hub-step-text text-muted">
                    {step.text}
                  </span>
                </span>
              </li>
            ))}
          </ol>
          <div className="services-hub-actions">
            <button
              type="button"
              data-open-quote
              data-source="features-quote"
              data-cta="features-quote"
              className="btn-primary btn-fluid tap-target inline-flex"
            >
              {process.cta}
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
      </div>
    </section>
  );
}
