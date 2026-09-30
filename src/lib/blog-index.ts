import type { Metadata } from "next";
import { blogHref, blogPosts, type BlogPost } from "./blog.ts";
import { BUSINESS_NAME, SITE_URL } from "./site.ts";

/** Cards shown on homepage and any listing outside the /blog index. */
export const BLOG_PREVIEW_COUNT = 6;

/** Posts per /blog index page. */
export const BLOG_PAGE_SIZE = 12;

const BLOG_INDEX_TITLE = "Moving tips & guides for Orlando";

const BLOG_INDEX_DESCRIPTION = `Orlando and Central Florida moving guides from ${BUSINESS_NAME}: plan before move day, careful furniture handling, and building access logistics.`;

/**
 * Newest first. Same-day posts keep their existing array order.
 * Does not mutate `blogPosts`.
 */
export function blogPostsNewestFirst(): readonly BlogPost[] {
  return blogPosts
    .map((post, index) => ({ post, index }))
    .sort((a, b) => {
      const byDate = b.post.date.localeCompare(a.post.date);
      if (byDate !== 0) return byDate;
      return a.index - b.index;
    })
    .map(({ post }) => post);
}

export function blogPageCount(pageSize = BLOG_PAGE_SIZE): number {
  if (blogPosts.length === 0) return 1;
  return Math.ceil(blogPosts.length / pageSize);
}

/** Page 1 is /blog. Later pages are /blog/page/2, which is not a post slug. */
export function blogIndexHref(page: number): string {
  if (!Number.isInteger(page) || page <= 1) return "/blog";
  return `/blog/page/${page}`;
}

export function parseBlogPageNumber(raw: string): number | null {
  if (!/^[1-9]\d*$/.test(raw)) return null;
  const page = Number(raw);
  if (!Number.isSafeInteger(page)) return null;
  return page;
}

export function blogPostsForPage(
  page: number,
  pageSize = BLOG_PAGE_SIZE,
): readonly BlogPost[] {
  if (!Number.isInteger(page) || page < 1) return [];
  const start = (page - 1) * pageSize;
  return blogPostsNewestFirst().slice(start, start + pageSize);
}

export function recentBlogPosts(
  count = BLOG_PREVIEW_COUNT,
): readonly BlogPost[] {
  return blogPostsNewestFirst().slice(0, count);
}

/** Index pages after page 1. Page 1 stays on the existing /blog sitemap entry. */
export function blogPaginationPaths(): readonly string[] {
  const count = blogPageCount();
  const paths: string[] = [];
  for (let page = 2; page <= count; page += 1) paths.push(blogIndexHref(page));
  return paths;
}

export function blogIndexTitle(page: number): string {
  if (page <= 1) return BLOG_INDEX_TITLE;
  return `${BLOG_INDEX_TITLE} — Page ${page}`;
}

export function blogIndexMetadata(page: number): Metadata {
  const pageCount = blogPageCount();
  const path = blogIndexHref(page);
  const title = blogIndexTitle(page);
  const description =
    page <= 1
      ? BLOG_INDEX_DESCRIPTION
      : `Page ${page} of ${BLOG_INDEX_DESCRIPTION}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title:
        page <= 1
          ? `Moving tips & guides · ${BUSINESS_NAME}`
          : `${title} · ${BUSINESS_NAME}`,
      description:
        page <= 1
          ? "Local Orlando move planning, careful handling, and building access guides from a family-owned crew."
          : `Page ${page} of local Orlando move planning, careful handling, and building access guides from a family-owned crew.`,
      url: `${SITE_URL}${path}`,
    },
    pagination: {
      previous: page > 1 ? blogIndexHref(page - 1) : null,
      next: page < pageCount ? blogIndexHref(page + 1) : null,
    },
  };
}

/** Every existing post URL. Pagination must not replace or redirect these. */
export function existingBlogPostHrefs(): readonly string[] {
  return blogPosts.map((post) => blogHref(post.slug));
}
