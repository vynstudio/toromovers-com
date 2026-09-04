import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { blogHref, blogPosts } from "@/lib/blog";
import { BUSINESS_NAME, SITE_URL } from "@/lib/site";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import {
  VectorSlot,
  illustrationKeyAt,
} from "@/components/ServiceIllustrations";

export const metadata: Metadata = {
  title: "Moving tips & guides for Orlando",
  description: `Orlando and Central Florida moving guides from ${BUSINESS_NAME}: plan before move day, careful furniture handling, and building access logistics.`,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Moving tips & guides · ${BUSINESS_NAME}`,
    description:
      "Local Orlando move planning, careful handling, and building access guides from a family-owned crew.",
    url: `${SITE_URL}/blog`,
  },
};

export default function BlogIndexPage() {
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

          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
            {blogPosts.map((post, i) => (
              <li key={post.slug}>
                <Link
                  href={blogHref(post.slug)}
                  className="svc-card block h-full"
                  data-cta={`blog-index-${post.slug}`}
                >
                  <span className="svc-card-frame">
                    {VECTORS_ONLY ? (
                      <VectorSlot kind={illustrationKeyAt(i)} />
                    ) : (
                      <Image
                        src={post.image.src}
                        alt={post.image.alt}
                        fill
                        sizes="(max-width: 639px) 90vw, 33vw"
                        quality={75}
                        className={`object-cover ${post.image.position ?? "object-center"}`}
                      />
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
        </div>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
