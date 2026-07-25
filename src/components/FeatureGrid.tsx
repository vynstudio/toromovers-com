import { featureGrid } from "@/lib/content";
import { FeatureIcon, IconArrow } from "@/components/icons";

export function FeatureGrid() {
  return (
    <section id="how-it-works" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {featureGrid.items.map((item) => (
            <div key={item.title} className="flex flex-col items-center text-center">
              <div className="icon-circle mb-5">
                <FeatureIcon name={item.icon} />
              </div>
              <h3 className="text-lg font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-muted">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={featureGrid.ctaHref}
            className="inline-flex items-center gap-2 rounded-md border border-foreground/25 px-7 py-3.5 text-sm tracking-tight text-foreground transition hover:border-navy hover:text-navy"
          >
            {featureGrid.cta}
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
