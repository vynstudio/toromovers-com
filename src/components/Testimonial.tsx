import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="bg-white py-14 sm:py-28" aria-label="Customer review">
      {/* Mobile: stacked name → marks → quote (matches reference) */}
      <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-start lg:gap-16 lg:px-10">
        <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {testimonial.name}
        </p>
        <blockquote className="relative mt-6 sm:mt-0 lg:mt-0">
          <span
            className="mb-2 block select-none text-4xl font-serif leading-none text-foreground sm:absolute sm:-left-3 sm:-top-6 sm:mb-0 sm:text-6xl"
            aria-hidden
          >
            “
          </span>
          <p className="text-[1.35rem] font-normal leading-snug tracking-tight text-foreground sm:pl-8 sm:text-3xl lg:text-[2.05rem] lg:leading-[1.25]">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
