import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts } from "./blog.ts";
import {
  BLOG_PAGE_SIZE,
  BLOG_PREVIEW_COUNT,
  blogIndexHref,
  blogIndexMetadata,
  blogPageCount,
  blogPaginationPaths,
  blogPostsForPage,
  blogPostsNewestFirst,
  existingBlogPostHrefs,
  parseBlogPageNumber,
  recentBlogPosts,
} from "./blog-index.ts";

const POST_HREFS = [
  "/blog/orlando-hoa-coi-movers",
  "/blog/orlando-furniture-only-movers",
  "/blog/orlando-packing-help-movers",
  "/blog/orlando-movers-cost-by-home-size",
  "/blog/orlando-weekend-movers",
  "/blog/orlando-same-day-movers",
  "/blog/how-much-to-tip-movers-orlando",
  "/blog/choose-family-owned-bilingual-movers-orlando",
  "/blog/orlando-office-small-commercial-movers",
  "/blog/central-florida-townhome-condo-movers",
  "/blog/orlando-local-vs-long-distance-movers",
  "/blog/orlando-apartment-high-rise-movers",
  "/blog/orlando-pod-uhaul-storage-loading",
  "/blog/uhaul-pod-loading-help-orlando",
  "/blog/full-service-vs-labor-only-orlando",
  "/blog/how-much-does-a-local-move-cost-orlando",
  "/blog/plan-orlando-move-before-first-box",
  "/blog/careful-furniture-handling-orlando-movers",
  "/blog/central-florida-movers-building-access",
] as const;

test("the removed lawn photo is not used on a guide", () => {
  assert.equal(
    blogPosts.some((post) => post.image.src.includes("real-21")),
    false,
  );
  const hoa = blogPosts.find((post) => post.slug === "orlando-hoa-coi-movers");
  assert.equal(hoa?.image.src, "/images/stock/movers-carrying-sofa.webp");
  assert.equal(hoa?.image.dedicated, true);
  const access = blogPosts.find(
    (post) => post.slug === "central-florida-movers-building-access",
  );
  assert.equal(access?.image.src, "/images/moves/real-14.webp");
});

test("existing post URLs stay on /blog/[slug]", () => {
  assert.deepEqual(existingBlogPostHrefs(), POST_HREFS);
  assert.equal(blogPosts.some((post) => post.slug === "page"), false);
});

test("listings are newest first, preview is 6, index pages are 12", () => {
  const newest = blogPostsNewestFirst();
  assert.equal(newest.length, blogPosts.length);
  for (let i = 1; i < newest.length; i += 1) {
    assert.ok(newest[i - 1].date >= newest[i].date);
  }

  assert.equal(recentBlogPosts().length, BLOG_PREVIEW_COUNT);
  assert.deepEqual(
    recentBlogPosts().map((post) => post.slug),
    newest.slice(0, BLOG_PREVIEW_COUNT).map((post) => post.slug),
  );

  const pageCount = blogPageCount();
  assert.equal(pageCount, 2);
  assert.equal(blogPostsForPage(1).length, BLOG_PAGE_SIZE);
  assert.equal(
    blogPostsForPage(pageCount).length,
    blogPosts.length - BLOG_PAGE_SIZE,
  );
  assert.equal(blogPostsForPage(0).length, 0);
  assert.equal(blogPostsForPage(pageCount + 1).length, 0);

  const seen = new Set<string>();
  for (let page = 1; page <= pageCount; page += 1) {
    for (const post of blogPostsForPage(page)) seen.add(post.slug);
  }
  assert.equal(seen.size, blogPosts.length);
});

test("pagination URLs stay off post slugs and page 1", () => {
  assert.equal(blogIndexHref(1), "/blog");
  assert.equal(blogIndexHref(2), "/blog/page/2");
  assert.equal(parseBlogPageNumber("2"), 2);
  assert.equal(parseBlogPageNumber("1"), 1);
  assert.equal(parseBlogPageNumber("02"), null);
  assert.equal(parseBlogPageNumber("0"), null);
  assert.equal(parseBlogPageNumber("page"), null);

  const slugs = new Set(blogPosts.map((post) => post.slug));
  assert.deepEqual(blogPaginationPaths(), ["/blog/page/2"]);
  for (const path of blogPaginationPaths()) {
    assert.equal(slugs.has(path.slice("/blog/".length)), false);
  }
});

test("paginated metadata is self-canonical and page 1 is indexable", () => {
  const first = blogIndexMetadata(1);
  const second = blogIndexMetadata(2);
  assert.equal(first.title, "Moving tips & guides for Orlando");
  assert.deepEqual(first.alternates, { canonical: "/blog" });
  assert.equal(first.robots, undefined);
  assert.equal(first.pagination?.previous, null);
  assert.equal(first.pagination?.next, "/blog/page/2");

  assert.equal(second.title, "Moving tips & guides for Orlando — Page 2");
  assert.deepEqual(second.alternates, { canonical: "/blog/page/2" });
  assert.equal(second.robots, undefined);
  assert.equal(second.pagination?.previous, "/blog");
  assert.equal(second.pagination?.next, null);
  assert.match(String(second.description), /^Page 2 of /);
});
