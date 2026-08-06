import Image from "next/image";
import { servicesHub } from "@/lib/services-hub";

/**
 * Services — 3 horizontal cards only, same section height as split bands.
 * No section heading / lede. Each card fully clickable.
 */
export function FeatureGrid() {
  return (
    <section
      id="services"
      className="svc-band full-bleed w-full"
      aria-label="Moving services"
    >
      <div className="site-container-wide svc-band-inner">
        <ul className="svc-cards" aria-label="Main moving services">
          {servicesHub.primary.map((item) => (
            <li key={item.href + item.title} className="svc-cards-item">
              <a
                href={item.href}
                className="svc-card"
                data-cta={`service-${item.href.replace(/\//g, "")}`}
              >
                <span className="svc-card-frame">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    quality={68}
                    loading="lazy"
                    className="object-cover object-center"
                  />
                </span>
                <span className="svc-card-body">
                  {item.badge ? (
                    <span className="svc-card-badge">{item.badge}</span>
                  ) : null}
                  <span className="svc-card-title">{item.title}</span>
                  <span className="svc-card-copy">{item.body}</span>
                  <span className="svc-card-link">
                    View service <span aria-hidden>→</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
