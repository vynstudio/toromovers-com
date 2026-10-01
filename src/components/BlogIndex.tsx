import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { VectorSlot } from "@/components/ServiceIllustrations";
import { blogHref, blogShowsOwnPhoto } from "@/lib/blog";
import {
  blogIndexHref,
  blogPageCount,
  blogPostsForPage,
} from "@/lib/blog-index";
import { VECTORS_ONLY } from "@/lib/vectors-temp";

export function BlogIndex({ page }: { page: number }) {
  const posts = blogPostsForPage(page);
  const pageCount = blogPageCount();

  return (
    <>
      <Nav />
      <main id="main" className="full-bleed w-full bg-white">
        <div className="site-container py-14 sm:py-16 lg:py-20">
          <p className="split-band-eyebrow">Blog</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Moving tips for Orlando &amp; Central Florida
          </h1>
          <p className="aeo-answer mt-3 max-w-2xl text-muted">
            Practical guides from Toro Movers—how to plan a local move, protect
            furniture, and work around apartment and HOA access with up-front
            hourly rates.
          </p>
          {page > 1 ? (
            <p className="mt-3 text-sm text-muted">Page {page}</p>
          ) : null}

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={blogHref(post.slug)}
                  className="svc-card block h-full"
                  data-cta={`blog-index-${post.slug}`}
                >
                  <span className="svc-card-frame">
                    {blogShowsOwnPhoto(post, VECTORS_ONLY) ? (
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(max-width: 639px) 90vw, 33vw"
                        quality={75}
                        className={`object-cover ${post.image.position ?? "object-center"}`}
                      />
                    ) : (
                      <VectorSlot kind={post.illustration} />
                    )}
                  </span>
                  <span className="svc-card-body">
                    <span className="svc-card-badge">{post.eyebrow}</span>
                    <span className="svc-card-title">{post.title}</span>
                    <span className="svc-card-copy text-muted">
                      {post.teaser}
                    </span>
                    <span className="text-xs text-muted">{post.dateLabel}</span>
                    <span className="svc-card-link">
                      Read guide <span aria-hidden>→</span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <BlogPagination page={page} pageCount={pageCount} />
        </div>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}

function BlogPagination({
  page,
  pageCount,
}: {
  page: number;
  pageCount: number;
}) {
  if (pageCount <= 1) return null;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label="Blog pages"
    >
      <PageStep
        href={page > 1 ? blogIndexHref(page - 1) : null}
        rel="prev"
        label="Previous"
      />
      <ol className="flex flex-wrap items-center justify-center gap-2">
        {pages.map((number) => (
          <li key={number}>
            {number === page ? (
              <span
                className="btn-primary tap-target min-w-12 px-3"
                aria-current="page"
                aria-label={`Page ${number}`}
              >
                {number}
              </span>
            ) : (
              <Link
                href={blogIndexHref(number)}
                className="btn-outline tap-target min-w-12 px-3"
                aria-label={`Page ${number}`}
              >
                {number}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <PageStep
        href={page < pageCount ? blogIndexHref(page + 1) : null}
        rel="next"
        label="Next"
      />
    </nav>
  );
}

function PageStep({
  href,
  rel,
  label,
}: {
  href: string | null;
  rel: "prev" | "next";
  label: string;
}) {
  if (!href) {
    return (
      <span
        className="btn-outline tap-target px-4 opacity-40"
        aria-disabled="true"
      >
        {label}
      </span>
    );
  }
  return (
    <Link href={href} rel={rel} className="btn-outline tap-target px-4">
      {label}
    </Link>
  );
}
