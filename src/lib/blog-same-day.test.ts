import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "./blog.ts";

const SLUG = "orlando-same-day-movers";
const OPENING =
  "Same-day movers in Orlando are often possible for a local Central Florida hop when a crew is open and both stops stay nearby—not a guarantee. Share addresses, stairs or elevator, how packed you are, and truck vs labor-only right away. Toro Movers quotes same-day local jobs by the hour with clear rates before the crew rolls.";

test("same-day Orlando guide meets the AEO bar", () => {
  const post = getBlogPost(SLUG);
  assert.ok(post);
  assert.notEqual(blogPosts[0]?.slug, SLUG);
  assert.equal(post.title, "Same-day movers in Orlando: what’s realistic");
  assert.equal(post.eyebrow, "Same-day · Orlando");
  assert.equal(post.date, "2026-09-22");
  assert.equal(post.dateLabel, "Sep 22, 2026");
  assert.ok(post.title.length >= 40 && post.title.length <= 60, String(post.title.length));
  assert.ok(
    post.description.length >= 140 && post.description.length <= 155,
    String(post.description.length),
  );
  assert.ok(post.teaser.length >= 110 && post.teaser.length <= 120, String(post.teaser.length));
  assert.equal(post.body[0], OPENING);
  const openingWords = OPENING.replace(/—/g, " ").split(/\s+/).filter(Boolean);
  assert.ok(openingWords.length >= 40 && openingWords.length <= 60, String(openingWords.length));

  const headings = post.body.filter((p) => p.startsWith("## ")).map((p) => p.slice(3));
  assert.ok(headings.length >= 3 && headings.length <= 6, headings.join(" | "));
  assert.ok(headings.some((h) => /when same-day is realistic/i.test(h)));
  assert.ok(headings.some((h) => /what to share immediately/i.test(h)));
  assert.ok(headings.some((h) => /when same-day is not realistic/i.test(h)));
  assert.ok(headings.some((h) => /how toro quotes same-day/i.test(h)));

  assert.ok(post.faqs && post.faqs.length >= 3 && post.faqs.length <= 5);
  assert.equal(post.illustration, "loading");
  assert.equal(post.image.src, "/images/moves/real-22.webp");
  assert.equal(post.image.dedicated, true);
  assert.equal(blogShowsOwnPhoto(post, true), true);

  const copy = [
    post.title,
    post.description,
    post.teaser,
    post.image.alt,
    ...post.body,
    ...post.faqs.map((f) => `${f.q} ${f.a}`),
  ].join("\n");
  assert.doesNotMatch(copy, /licensed|insured|bonded|USDOT|FLDACS|\bCOI\b|\bDOT\b|#1|number one/i);
  assert.match(copy, /\/quotes/);
  assert.match(copy, /\/blog\/orlando-local-vs-long-distance-movers/);
  assert.match(copy, /\/blog\/how-much-does-a-local-move-cost-orlando/);
  assert.match(copy, /\/blog\/orlando-apartment-high-rise-movers/);
  assert.match(copy, /\/full-service-moving/);
  assert.match(copy, /\/labor-only-moving/);
  assert.match(copy, /\$75/);
  assert.match(copy, /2-hour minimum/);
  assert.match(copy, /no fuel surcharge/);
  assert.match(copy, /no stair fees/);
  assert.match(copy, /Mon–Sat/);
  assert.match(copy, /\(689\) 600-2720/);

  const phoneOutsideCtaFaq = [...post.body.slice(0, -1), post.description, post.teaser].join("\n");
  assert.doesNotMatch(phoneOutsideCtaFaq, /689|600-2720/);
});
