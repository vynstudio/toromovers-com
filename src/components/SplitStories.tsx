import Image from "next/image";
import { splitStories } from "@/lib/content";

export function SplitStories() {
  return (
    <section className="full-bleed w-full" aria-label="Stories">
      {splitStories.map((story, i) => (
        <div
          key={story.title}
          className="relative w-full min-h-[48vh] overflow-hidden sm:min-h-[52vh] lg:min-h-[56vh]"
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
          <div
            className={`site-container-wide relative flex min-h-[48vh] items-end py-12 sm:min-h-[52vh] sm:items-center sm:py-16 lg:min-h-[56vh] ${
              i === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            <div className="w-full max-w-lg min-w-0">
              <h2 className="fluid-h2 text-white">{story.title}</h2>
              <p className="aeo-answer fluid-lede mt-3 text-white/90 sm:mt-4">
                {story.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
