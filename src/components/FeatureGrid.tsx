import { featureGrid } from "@/lib/content";
import { FeatureIcon, IconArrow } from "@/components/icons";

export function FeatureGrid() {
  return (
    <section
      id="how-it-works"
      className="full-bleed w-full bg-white py-14 sm:py-20 lg:py-28"
      aria-label="Services and capabilities"
    >
      <div className="site-container">
        {/* Mobile: 1 col · tablet: 2 · desktop: 3 */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-12">
          {featureGrid.items.map((item) => (
            <div
              key={item.title}
              className="flex w-full flex-col items-start text-left sm:items-center sm:text-center"
            >
              <div className="icon-circle mb-4 sm:mb-5">
                <FeatureIcon name={item.icon} />
              </div>
              <h3 className="fluid-h3 text-foreground">{item.title}</h3>
              <p className="aeo-answer mt-2 w-full max-w-sm text-[var(--text-body)] leading-relaxed text-muted sm:mx-auto">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href={featureGrid.ctaHref}
            data-cta="features-quote"
            className="btn-fluid tap-target inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-md border border-foreground/25 px-7 py-3.5 text-sm tracking-tight text-foreground transition hover:border-navy hover:text-navy sm:w-auto sm:max-w-none"
          >
            {featureGrid.cta}
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
