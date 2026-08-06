import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { blogPosts, getBlogPost } from "@/lib/blog";
import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  SITE_URL,
} from "@/lib/site";
import { IconArrow } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Guide not found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    image: `${SITE_URL}${post.image.src}`,
    author: { "@type": "Organization", name: BUSINESS_NAME },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main" className="full-bleed w-full bg-white">
        <article className="site-container-narrow py-12 sm:py-16 lg:py-20">
          <Link
            href="/blog"
            className="text-sm font-medium text-foreground underline underline-offset-4"
          >
            ← All guides
          </Link>

          <p className="split-band-eyebrow mt-8">{post.eyebrow}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {post.dateLabel} · {BUSINESS_NAME}
          </p>

          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-[1.25rem] bg-[#e8ebf0]">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 720px"
              quality={82}
              className={`object-cover ${post.image.position ?? "object-center"}`}
            />
          </div>

          <div className="aeo-answer mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-[1.05rem]">
            {post.body.map((para) => (
              <p key={para.slice(0, 48)}>{para}</p>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
            <a
              href={PHONE_TEL}
              data-cta="blog-call"
              className="btn-primary btn-fluid tap-target inline-flex justify-center"
            >
              Call {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              data-open-quote
              data-source={`blog-${post.slug}`}
              data-cta="blog-quote"
              className="btn-outline btn-fluid tap-target inline-flex justify-center"
            >
              Get a free quote
              <IconArrow />
            </button>
          </div>
        </article>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
