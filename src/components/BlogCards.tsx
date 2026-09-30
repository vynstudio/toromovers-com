import Image from "next/image";
import { blogHref, blogShowsOwnPhoto } from "@/lib/blog";
import { recentBlogPosts } from "@/lib/blog-index";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import { VectorSlot } from "@/components/ServiceIllustrations";
import { IconArrow } from "@/components/icons";

/**
 * Homepage — six newest blog cards.
 * Same band height language as services; cards only, no section headline.
 */
export function BlogCards() {
  const posts = recentBlogPosts();

  return (
    <section
      id="discover"
      className="svc-band full-bleed w-full"
      aria-label="Moving tips and guides"
    >
      <div className="site-container-wide svc-band-inner">
        <ul className="svc-cards" aria-label="Blog guides">
          {posts.map((post) => (
            <li key={post.slug} className="svc-cards-item">
              <a
                href={blogHref(post.slug)}
                className="svc-card"
                data-cta={`blog-${post.slug}`}
              >
                <span className="svc-card-frame">
                  {blogShowsOwnPhoto(post, VECTORS_ONLY) ? (
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      sizes="(max-width: 1023px) 100vw, 33vw"
                      quality={68}
                      loading="lazy"
                      className={`object-cover ${post.image.position ?? "object-center"}`}
                    />
                  ) : (
                    <VectorSlot kind={post.illustration} />
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
        <div className="mt-6 flex justify-center pb-2 sm:mt-8">
          <a
            href="/blog"
            className="btn-outline btn-fluid tap-target inline-flex"
            data-cta="blog-see-all"
          >
            See all articles
            <IconArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
