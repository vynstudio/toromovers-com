import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "./blog.ts";

const SLUG = "how-much-to-tip-movers-orlando";

test("tipping guide is the newest post and stays inside the content rules", () => {
  const post = getBlogPost(SLUG);
  assert.ok(post);
  assert.equal(blogPosts[0]?.slug, SLUG);
  assert.equal(post.title, "How much to tip movers in Orlando?");
  assert.equal(post.date, "2026-09-21");
  assert.equal(post.dateLabel, "Sep 21, 2026");
  assert.ok(post.teaser.length >= 110 && post.teaser.length <= 120, String(post.teaser.length));
  assert.equal(post.image.src, "/images/moves/real-18.webp");
  assert.equal(post.image.dedicated, true);
  assert.equal(blogShowsOwnPhoto(post, true), true);
  assert.doesNotMatch(post.image.alt, /licensed|insured|bonded/i);

  const headings = post.body.filter((p) => p.startsWith("## ")).map((p) => p.slice(3));
  assert.ok(headings.length >= 3 && headings.length <= 6, headings.join(" | "));

  assert.ok(post.faqs && post.faqs.length === 5);
  const questions = post.faqs.map((f) => f.q).join("\n");
  assert.match(questions, /How much should I tip movers in Orlando/);
  assert.match(questions, /each mover or the whole crew/);
  assert.match(questions, /labor-only/);
  assert.match(questions, /bad weather or stairs/);
  assert.match(questions, /Is tipping movers required/);

  const copy = [
    post.title,
    post.description,
    post.teaser,
    post.image.alt,
    ...post.body,
    ...post.faqs.map((f) => `${f.q} ${f.a}`),
  ].join("\n");
  assert.doesNotMatch(copy, /licensed|insured|bonded|USDOT|FLDACS|\bCOI\b|\bDOT\b|#1|number one/i);
  assert.match(copy, /not required/);
  assert.match(copy, /optional/);
  assert.doesNotMatch(copy, /tipping is required|must tip|tip policy requires/i);
  assert.match(copy, /hello@toromovers\.com/);
  assert.match(copy, /\(689\) 600-2720/);
  assert.match(copy, /\/quotes/);
  assert.match(copy, /\/blog\/how-much-does-a-local-move-cost-orlando/);
  assert.match(copy, /\/blog\/full-service-vs-labor-only-orlando/);
  assert.match(copy, /\/blog\/orlando-apartment-high-rise-movers/);
  assert.match(copy, /\/labor-only-moving/);
  assert.match(copy, /\/full-service-moving/);

  const words = [...post.body, ...post.faqs.map((f) => `${f.q} ${f.a}`)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
  assert.ok(words.length >= 800 && words.length <= 1400, String(words.length));
});
