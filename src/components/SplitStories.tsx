import Image from "next/image";
import { splitStories } from "@/lib/content";

export function SplitStories() {
  return (
    <section>
      {splitStories.map((story, i) => (
        <div
          key={story.title}
          className={`relative min-h-[48vh] overflow-hidden sm:min-h-[52vh] ${
            i === 0 ? "" : ""
          }`}
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
                ? "bg-gradient-to-l from-black/60 via-black/40 to-black/25"
                : "bg-gradient-to-r from-black/55 via-black/35 to-transparent"
            }`}
          />
          <div
            className={`relative flex min-h-[48vh] items-center px-6 py-16 sm:min-h-[52vh] sm:px-12 lg:px-20 ${
              i === 0 ? "justify-end" : "justify-start"
            }`}
          >
            <div className={`max-w-md ${i === 0 ? "text-right sm:text-left sm:max-w-lg" : ""}`}>
              <h2 className="text-3xl font-normal tracking-tight text-white sm:text-4xl">
                {story.title}
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-white/90 sm:text-base">
                {story.body}
              </p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
