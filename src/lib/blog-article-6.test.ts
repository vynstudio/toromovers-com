import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "./blog.ts";

const SLUG = "choose-family-owned-bilingual-movers-orlando";
const OPENING =
  "Look for clear hourly rates, bilingual crews who communicate on move day, and a local team that answers questions before the quote. Toro Movers is a family-run Orlando crew that works in English and Spanish across Central Florida — up-front pricing, no surprise add-ons in the pitch.";

test("article 6 is the newest guide and meets the AEO bar", () => {
  const post = getBlogPost(SLUG);
  assert.ok(post);
  assert.equal(blogPosts[0]?.slug, SLUG);
  assert.equal(post.title, "How to choose a family-owned bilingual mover in Orlando");
  assert.equal(post.eyebrow, "Family-owned · Bilingual");
  assert.equal(post.date, "2026-09-21");
  assert.equal(post.dateLabel, "Sep 21, 2026");
  assert.ok(post.title.length >= 50 && post.title.length <= 60, String(post.title.length));
  assert.ok(
    post.description.length >= 140 && post.description.length <= 155,
    String(post.description.length),
  );
  assert.ok(post.teaser.length >= 110 && post.teaser.length <= 120, String(post.teaser.length));
  assert.equal(post.body[0], OPENING);
  const words = OPENING.split(/\s+/).filter((w) => w !== "—");
  assert.ok(words.length >= 40 && words.length <= 60, String(words.length));

  const headings = post.body.filter((p) => p.startsWith("## ")).map((p) => p.slice(3));
  assert.ok(headings.length >= 3 && headings.length <= 6, headings.join(" | "));
  assert.ok(headings.some((h) => /ask before you book/i.test(h)));
  assert.ok(headings.some((h) => /language on move day/i.test(h)));
  assert.ok(headings.some((h) => /family-owned vs a big brand/i.test(h)));

  assert.ok(post.faqs && post.faqs.length >= 3 && post.faqs.length <= 5);

  const copy = [post.title, post.description, post.teaser, ...post.body, ...post.faqs.map((f) => `${f.q} ${f.a}`)].join(
    "\n",
  );
  assert.doesNotMatch(copy, /689|600-2720|licensed|insured|bonded|\bDOT\b|#1|number one/i);
  assert.match(copy, /\/quotes/);
  assert.match(copy, /\/blog\/orlando-apartment-high-rise-movers/);
  assert.match(copy, /\/blog\/central-florida-townhome-condo-movers/);
  assert.match(copy, /\/blog\/orlando-local-vs-long-distance-movers/);
  assert.match(copy, /\/blog\/orlando-pod-uhaul-storage-loading/);
  assert.match(copy, /\/blog\/orlando-office-small-commercial-movers/);
  assert.equal(post.image.src, "/images/moves/real-12.webp");
  assert.equal(post.image.dedicated, true);
  assert.equal(blogShowsOwnPhoto(post, true), true);
  assert.equal(blogShowsOwnPhoto(blogPosts[1]!, true), false);
});
