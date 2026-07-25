import { faq } from "@/lib/content";

export function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-white py-14 sm:py-24"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2
          id="faq-heading"
          className="text-[1.75rem] font-normal tracking-tight text-foreground sm:text-4xl"
        >
          {faq.heading}
        </h2>
        <p className="mt-2 text-sm text-muted sm:text-base">{faq.sub}</p>

        <dl className="mt-10 space-y-8">
          {faq.items.map((item) => (
            <div key={item.q}>
              <dt>
                <h3 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                  {item.q}
                </h3>
              </dt>
              <dd className="aeo-answer mt-2 text-[14.5px] leading-relaxed text-muted sm:text-[15px]">
                {item.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
