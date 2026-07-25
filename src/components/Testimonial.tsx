import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section
      className="full-bleed w-full bg-white py-14 sm:py-20 lg:py-28"
      aria-label="Customer review"
    >
      <div className="site-container grid w-full gap-6 sm:gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16">
        <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2rem]">
          {testimonial.name}
        </p>
        <blockquote className="relative w-full min-w-0">
          <span
            className="mb-2 block select-none text-4xl font-serif leading-none text-foreground sm:mb-3 sm:text-5xl lg:text-6xl"
            aria-hidden
          >
            “
          </span>
          <p className="text-[clamp(1.25rem,1rem+1vw,2rem)] font-normal leading-snug tracking-tight text-foreground">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
