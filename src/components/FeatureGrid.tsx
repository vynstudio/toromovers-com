import { featureGrid } from "@/lib/content";
import { FeatureIcon, IconArrow } from "@/components/icons";

/**
 * Services — high priority on mobile (conversion).
 * Base: 1-col stack. 768px: 2-col. 1024px: 3-col.
 */
export function FeatureGrid() {
  return (
    <section
      id="how-it-works"
      className="full-bleed w-full bg-white py-12 sm:py-16 lg:py-24"
      aria-label="Services and capabilities"
    >
      <div className="site-container">
        <h2 className="fluid-h2 mb-8 text-foreground sm:mb-12 sm:text-center">
          What we handle
        </h2>

        <div className="section-grid section-grid-3">
          {featureGrid.items.map((item) => (
            <div
              key={item.title}
              className="flex w-full flex-col items-start text-left sm:items-center sm:text-center"
            >
              <div className="icon-circle mb-3 sm:mb-4">
                <FeatureIcon name={item.icon} />
              </div>
              <h3 className="fluid-h3 text-foreground">{item.title}</h3>
              <p className="aeo-answer mt-2 w-full text-[var(--text-body)] leading-relaxed text-muted sm:max-w-sm">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center sm:mt-14">
          <a
            href={featureGrid.ctaHref}
            data-cta="features-quote"
            className="btn-outline btn-fluid tap-target inline-flex w-full max-w-sm gap-2 sm:w-auto sm:max-w-none"
          >
            {featureGrid.cta}
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
