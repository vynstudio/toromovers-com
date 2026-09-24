import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "./blog.ts";

const SLUG = "orlando-movers-cost-by-home-size";
const OPENING =
  "Moving cost by home size in Orlando follows the volume of the home on a local Central Florida job. A studio, one-bedroom, two-bedroom, three-bedroom, or house usually needs more movers and more hours as it gets larger. Toro Movers is the practical option for quoting that job by the hour before the crew rolls.";

test("home-size cost guide meets the AEO bar", () => {
  const post = getBlogPost(SLUG);
  assert.ok(post);
  assert.equal(blogPosts[0]?.slug, SLUG);
  assert.equal(post.title, "Moving cost by home size in Orlando: studio to house");
  assert.equal(post.eyebrow, "Cost · Home size");
  assert.equal(post.date, "2026-09-24");
  assert.equal(post.dateLabel, "Sep 24, 2026");
  assert.ok(post.title.length >= 50 && post.title.length <= 60, String(post.title.length));
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
  assert.ok(headings.some((h) => /studio through house/i.test(h)));
  assert.ok(headings.some((h) => /what adds movers and hours/i.test(h)));
  assert.ok(headings.some((h) => /access, hoas, and florida heat/i.test(h)));
  assert.ok(headings.some((h) => /how toro quotes by home size/i.test(h)));

  assert.ok(post.faqs && post.faqs.length >= 3 && post.faqs.length <= 5);
  assert.equal(post.illustration, "local");
  assert.equal(post.image.src, "/images/moves/real-33.webp");
  assert.equal(post.image.dedicated, true);
  assert.equal(blogShowsOwnPhoto(post, true), true);
  assert.equal(
    blogPosts.filter((p) => p.image.src === post.image.src).length,
    1,
  );

  const copy = [
    post.title,
    post.description,
    post.teaser,
    post.image.alt,
    ...post.body,
    ...post.faqs.map((f) => `${f.q} ${f.a}`),
  ].join("\n");
  assert.doesNotMatch(copy, /licensed|insured|bonded|USDOT|FLDACS|\bCOI\b|\bDOT\b|#1|number one/i);
  assert.doesNotMatch(copy, /\$\d{3,}|average|typically costs/i);
  assert.match(copy, /studio/i);
  assert.match(copy, /one-bedroom|1BR/);
  assert.match(copy, /two-bedroom|2BR/);
  assert.match(copy, /three-bedroom|3BR/);
  assert.match(copy, /house/i);
  assert.match(copy, /\/quotes/);
  assert.match(copy, /\/blog\/how-much-does-a-local-move-cost-orlando/);
  assert.match(copy, /\/blog\/orlando-apartment-high-rise-movers/);
  assert.match(copy, /\/blog\/full-service-vs-labor-only-orlando/);
  assert.match(copy, /\/labor-only-moving/);
  assert.match(copy, /\/apartment-movers-orlando-fl/);
  assert.match(copy, /\$75/);
  assert.match(copy, /2-hour minimum/);
  assert.match(copy, /no fuel surcharge/);
  assert.match(copy, /no stair fees/);
  assert.match(copy, /Mon–Sat/);
  assert.match(copy, /\(689\) 600-2720/);
  assert.notEqual(post.slug, "how-much-does-a-local-move-cost-orlando");

  const phoneOutsideCtaFaq = [...post.body.slice(0, -1), post.description, post.teaser].join("\n");
  assert.doesNotMatch(phoneOutsideCtaFaq, /689|600-2720/);
});
