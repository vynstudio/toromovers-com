import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section
      className="full-bleed section-pad w-full bg-white"
      aria-label="Customer review"
    >
      <div className="site-container grid w-full gap-5 sm:gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16">
        <p className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl lg:text-[2.1rem]">
          {testimonial.name}
        </p>
        <blockquote className="relative w-full min-w-0">
          <span
            className="mb-2 block select-none text-4xl font-serif leading-none text-foreground sm:mb-3 sm:text-5xl lg:text-6xl"
            aria-hidden
          >
            “
          </span>
          <p className="text-[clamp(1.2rem,1rem+0.9vw,2rem)] font-normal leading-snug tracking-tight text-foreground">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
