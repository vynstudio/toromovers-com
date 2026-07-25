import { areasSnippet } from "@/lib/content";
import { PHONE_TEL } from "@/lib/site";

export function Areas() {
  return (
    <section
      id="areas"
      className="bg-white py-12 sm:py-16"
      aria-labelledby="areas-heading"
    >
      <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <h2
          id="areas-heading"
          className="text-xl font-medium tracking-tight text-foreground sm:text-2xl"
        >
          {areasSnippet.heading}
        </h2>
        <p className="aeo-answer mx-auto mt-3 max-w-2xl text-[14.5px] leading-relaxed text-muted sm:text-base">
          {areasSnippet.lead}{" "}
          <a href={PHONE_TEL} data-cta="areas-phone" className="text-navy underline underline-offset-2">
            Call for availability in your city
          </a>
          .
        </p>
      </div>
    </section>
  );
}
