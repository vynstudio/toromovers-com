import Image from "next/image";
import { blogPosts, blogHref } from "@/lib/blog";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import {
  VectorSlot,
  illustrationKeyAt,
} from "@/components/ServiceIllustrations";

/**
 * Homepage — 3 blog cards (compacted former feature + integration sections).
 * Same band height language as services; cards only, no section headline.
 */
export function BlogCards() {
  return (
    <section
      id="discover"
      className="svc-band full-bleed w-full"
      aria-label="Moving tips and guides"
    >
      <div className="site-container-wide svc-band-inner">
        <ul className="svc-cards" aria-label="Blog guides">
          {blogPosts.map((post, i) => (
            <li key={post.slug} className="svc-cards-item">
              <a
                href={blogHref(post.slug)}
                className="svc-card"
                data-cta={`blog-${post.slug}`}
              >
                <span className="svc-card-frame">
                  {VECTORS_ONLY ? (
                    <VectorSlot kind={illustrationKeyAt(i)} />
                  ) : (
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      quality={68}
                      loading="lazy"
                      className={`object-cover ${post.image.position ?? "object-center"}`}
                    />
                  )}
                </span>
                <span className="svc-card-body">
                  <span className="svc-card-badge">{post.eyebrow}</span>
                  <span className="svc-card-title">{post.title}</span>
                  <span className="svc-card-copy text-muted aeo-answer">
                    {post.teaser}
                  </span>
                  <span className="svc-card-link">
                    Read guide <span aria-hidden>→</span>
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
