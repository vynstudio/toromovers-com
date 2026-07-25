import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:items-start lg:gap-16 lg:px-10">
        <p className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {testimonial.name}
        </p>
        <blockquote className="relative">
          <span
            className="absolute -left-1 -top-4 select-none text-5xl font-serif leading-none text-foreground/90 sm:-left-3 sm:-top-6 sm:text-6xl"
            aria-hidden
          >
            “
          </span>
          <p className="pl-6 text-2xl font-normal leading-snug tracking-tight text-foreground sm:pl-8 sm:text-3xl lg:text-[2.05rem] lg:leading-[1.25]">
            {testimonial.quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
