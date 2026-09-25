import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ClientChrome } from "@/components/ClientChrome";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "@/lib/blog";
import { VECTORS_ONLY } from "@/lib/vectors-temp";
import { VectorSlot } from "@/components/ServiceIllustrations";
import {
  BUSINESS_NAME,
  PHONE_DISPLAY,
  PHONE_TEL,
  QUOTE_PATH,
  SITE_URL,
} from "@/lib/site";
import { IconArrow } from "@/components/icons";

type Props = { params: Promise<{ slug: string }> };

/** Paths written in guide copy. The href stays the path; the label is words. */
const INTERNAL_PATH =
  /\/(?:quotes|apartment-movers-orlando-fl|full-service-moving|labor-only-moving|loading-unloading|packing-services-orlando|office-movers-orlando|same-day-movers-orlando|blog\/[a-z0-9-]+)/g;

const PATH_LABELS: Record<string, string> = {
  "/quotes": "the quote page",
  "/apartment-movers-orlando-fl": "apartment movers",
  "/full-service-moving": "full-service moving",
  "/labor-only-moving": "labor-only moving",
  "/loading-unloading": "loading and unloading",
  "/packing-services-orlando": "packing services in Orlando",
  "/office-movers-orlando": "office movers in Orlando",
  "/same-day-movers-orlando": "same-day movers in Orlando",
};

function linkLabel(href: string): string {
  const known = PATH_LABELS[href];
  if (known) return known;
  if (href.startsWith("/blog/")) {
    const post = getBlogPost(href.slice("/blog/".length));
    if (post) return post.title.split(":")[0].trim();
  }
  return href;
}

function BlogInline({ text }: { text: string }) {
  const nodes: Array<string | { href: string; key: string }> = [];
  const re = new RegExp(INTERNAL_PATH.source, "g");
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = re.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push({ href: match[0], key: `${match.index}-${match[0]}` });
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes.map((part) =>
    typeof part === "string" ? (
      part
    ) : (
      <Link
        key={part.key}
        href={part.href}
        className="underline underline-offset-4"
      >
        {linkLabel(part.href)}
      </Link>
    ),
  );
}

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
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${SITE_URL}/blog/${post.slug}#article`,
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
      },
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/blog/${post.slug}#faq`,
              mainEntity: post.faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
    ],
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
            {blogShowsOwnPhoto(post, VECTORS_ONLY) ? (
              <Image
                src={post.image.src}
                alt={post.image.alt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 720px"
                quality={82}
                className={`object-cover ${post.image.position ?? "object-center"}`}
              />
            ) : (
              <VectorSlot kind={post.illustration} />
            )}
          </div>

          <div className="aeo-answer mt-8 space-y-5 text-base leading-relaxed text-muted sm:text-[1.05rem]">
            {post.body.map((para, i) =>
              para.startsWith("## ") ? (
                <h2
                  key={i}
                  className="pt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
                >
                  {para.slice(3)}
                </h2>
              ) : (
                <p key={i}>
                  <BlogInline text={para} />
                </p>
              ),
            )}
          </div>

          <p className="mt-6 text-sm text-muted">
            Related:{" "}
            <Link className="underline underline-offset-4" href="/labor-only-moving">
              Labor-only movers
            </Link>
            {" · "}
            <Link className="underline underline-offset-4" href="/loading-unloading">
              Loading & unloading
            </Link>
            {" · "}
            <Link className="underline underline-offset-4" href="/full-service-moving">
              Full-service moving
            </Link>
            {" · "}
            <Link className="underline underline-offset-4" href="/services">
              All services
            </Link>
          </p>


          {post.faqs?.length ? (
            <section id="faq" className="mt-10">
              <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                Common questions
              </h2>
              <dl className="mt-5 space-y-5">
                {post.faqs.map((item) => (
                  <div key={item.q}>
                    <dt className="font-extrabold text-foreground">{item.q}</dt>
                    <dd className="mt-2 text-muted">
                      <BlogInline text={item.a} />
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
            <a
              href={PHONE_TEL}
              data-cta="blog-call"
              className="btn-primary btn-fluid tap-target inline-flex justify-center"
            >
              Call {PHONE_DISPLAY}
            </a>
            <a
              href={QUOTE_PATH}
              data-cta="blog-quote"
              className="btn-outline btn-fluid tap-target inline-flex justify-center"
            >
              Get a free quote
              <IconArrow />
            </a>
          </div>
        </article>
      </main>
      <Footer />
      <StickyCta />
      <ClientChrome />
    </>
  );
}
