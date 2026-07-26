import { faq } from "@/lib/content";

export function Faq() {
  return (
    <section
      id="faq"
      className="full-bleed section-pad w-full border-t border-border bg-white"
      aria-labelledby="faq-heading"
    >
      <div className="site-container-narrow">
        <h2 id="faq-heading" className="fluid-h2 text-foreground">
          {faq.heading}
        </h2>
        <p className="mt-2 text-[var(--text-body)] text-muted">{faq.sub}</p>

        <dl className="mt-10 space-y-8 sm:space-y-10">
          {faq.items.map((item) => (
            <div key={item.q} className="w-full min-w-0">
              <dt>
                <h3 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {item.q}
                </h3>
              </dt>
              <dd className="aeo-answer mt-2 text-[var(--text-body)] leading-relaxed text-muted">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
