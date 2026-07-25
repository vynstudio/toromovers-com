import { featureGrid } from "@/lib/content";
import { FeatureIcon, IconArrow } from "@/components/icons";

export function FeatureGrid() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-14 sm:py-28"
      aria-label="Services and capabilities"
    >
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* Mobile: single-column left-aligned stack (matches reference) */}
        <div className="flex flex-col gap-12 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-14 lg:grid-cols-3">
          {featureGrid.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start text-left sm:items-center sm:text-center"
            >
              <div className="icon-circle mb-4 sm:mb-5">
                <FeatureIcon name={item.icon} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="aeo-answer mt-2 max-w-[280px] text-[14px] leading-relaxed text-muted sm:text-sm">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center sm:mt-16">
          <a
            href={featureGrid.ctaHref}
            data-cta="features-quote"
            className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-md border border-foreground/25 px-7 py-3.5 text-sm tracking-tight text-foreground transition hover:border-navy hover:text-navy sm:w-auto"
          >
            {featureGrid.cta}
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
