import Image from "next/image";
import { splitStories } from "@/lib/content";

export function SplitStories() {
  return (
    <section className="full-bleed w-full" aria-label="Stories">
      {splitStories.map((story, i) => (
        <div
          key={story.title}
          className="relative w-full min-h-[40vh] overflow-hidden sm:min-h-[42vh] lg:min-h-[40vh] lg:max-h-[440px]"
        >
          <Image
            src={story.image.src}
            alt={story.image.alt}
            fill
            sizes="100vw"
            quality={72}
            className={`object-cover ${story.image.position ?? "object-center"}`}
          />
          <div
            className={`absolute inset-0 ${
              i === 0
                ? "bg-gradient-to-t from-black/72 via-black/45 to-black/30 sm:bg-gradient-to-l sm:from-black/60 sm:via-black/40 sm:to-black/25"
                : "bg-gradient-to-t from-black/72 via-black/45 to-black/25 sm:bg-gradient-to-r sm:from-black/55 sm:via-black/35 sm:to-transparent"
            }`}
          />
          <div
            className={`site-container-wide relative flex min-h-[40vh] items-end py-10 sm:min-h-[42vh] sm:items-center sm:py-12 lg:min-h-[40vh] lg:py-14 ${
              i === 0 ? "sm:justify-end" : "sm:justify-start"
            }`}
          >
            <div className="w-full max-w-lg min-w-0 lg:max-w-xl">
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
