import { faq } from "@/lib/content";

/** Compact FAQ list — tight spacing, border dividers, no heavy section pad. */
export function Faq() {
  return (
    <section
      id="faq"
      className="full-bleed w-full border-t border-border bg-white py-10 sm:py-12"
      aria-labelledby="faq-heading"
    >
      <div className="site-container-narrow">
        <h2
          id="faq-heading"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {faq.heading}
        </h2>
        <p className="mt-1 text-sm text-muted">{faq.sub}</p>

        <dl className="faq-list mt-5">
          {faq.items.map((item) => (
            <div key={item.q} className="faq-item">
              <dt>
                <h3 className="faq-q">{item.q}</h3>
              </dt>
              <dd className="aeo-answer faq-a">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
