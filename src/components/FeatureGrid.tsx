import Image from "next/image";
import { servicesHub } from "@/lib/services-hub";

/**
 * Services — 3 premium cards, same section height as the split bands.
 * Title sits on the photo under a scrim so each card leads with the service
 * name; proof points carry the detail. Whole card is one link.
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
                className="svc-card svc-card--premium"
                data-cta={`service-${item.href.replace(/\//g, "")}`}
              >
                <span className="svc-card-frame">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    quality={72}
                    loading="lazy"
                    className="object-cover object-center"
                  />
                  <span className="svc-card-scrim" aria-hidden />
                  {item.badge ? (
                    <span className="svc-card-badge">{item.badge}</span>
                  ) : null}
                  <span className="svc-card-title">{item.title}</span>
                </span>

                <span className="svc-card-body">
                  <span className="svc-card-copy text-muted">{item.body}</span>

                  {item.points?.length ? (
                    <span className="svc-card-points">
                      {item.points.map((p) => (
                        <span key={p} className="svc-card-point">
                          <svg
                            className="svc-card-tick"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path
                              d="M5 10.5l3.2 3.2L15 7"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          {p}
                        </span>
                      ))}
                    </span>
                  ) : null}

                  <span className="svc-card-link">
                    {item.linkLabel ?? "View service"}{" "}
                    <span aria-hidden>→</span>
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
