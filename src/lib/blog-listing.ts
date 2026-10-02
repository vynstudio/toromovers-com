/**
 * Blog listing windows.
 *
 * This branch matches live main: the homepage and /blog each show every post
 * on a single page. Open PR #76 (not included) wants:
 * - homepage: 6 newest posts plus a "See all articles" link
 * - /blog: 12 per page, with /blog/page/2
 *
 * Flip the two constants and add a /blog/page/[page] route to apply #76
 * without restructuring the cards.
 */
export const BLOG_HOME_LIMIT: number | null = null;
export const BLOG_PAGE_SIZE: number | null = null;

export function postsForHomepage<T>(posts: readonly T[]): T[] {
  if (BLOG_HOME_LIMIT == null) return [...posts];
  return [...posts].slice(0, BLOG_HOME_LIMIT);
}

export function postsForBlogIndex<T>(posts: readonly T[], page = 1): T[] {
  if (BLOG_PAGE_SIZE == null) return page === 1 ? [...posts] : [];
  const start = (page - 1) * BLOG_PAGE_SIZE;
  return [...posts].slice(start, start + BLOG_PAGE_SIZE);
}

export function blogPageCount(total: number): number {
  if (BLOG_PAGE_SIZE == null) return 1;
  return Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
}
