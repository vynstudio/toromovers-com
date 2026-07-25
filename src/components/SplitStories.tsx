import Image from "next/image";
import { splitStories } from "@/lib/content";

export function SplitStories() {
  return (
    <section aria-label="Stories">
      {splitStories.map((story, i) => (
        <div
          key={story.title}
          className="relative min-h-[48vh] overflow-hidden sm:min-h-[52vh]"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            className={`absolute inset-0 ${
              i === 0
                ? "bg-gradient-to-t from-black/70 via-black/45 to-black/30 sm:bg-gradient-to-l sm:from-black/60 sm:via-black/40 sm:to-black/25"
                : "bg-gradient-to-t from-black/70 via-black/45 to-black/25 sm:bg-gradient-to-r sm:from-black/55 sm:via-black/35 sm:to-transparent"
            }`}
          />
          {/* Mobile: always left-aligned bottom copy (matches stacked reference) */}
          <div
            className={`relative flex min-h-[48vh] items-end px-5 py-12 sm:min-h-[52vh] sm:items-center sm:px-12 sm:py-16 lg:px-20 ${
              i === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            <div className="max-w-md">
              <h2 className="text-[1.85rem] font-normal leading-tight tracking-tight text-white sm:text-4xl">
                {story.title}
              </h2>
              <p className="aeo-answer mt-3 text-[14.5px] leading-relaxed text-white/90 sm:mt-4 sm:text-base">
                {story.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
