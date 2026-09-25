import assert from "node:assert/strict";
import test from "node:test";
import { blogPosts, blogShowsOwnPhoto, getBlogPost } from "./blog.ts";

const SLUG = "orlando-packing-help-movers";
const OPENING =
  "Packing help in Orlando is for the rooms you do not want to box yourself. Full packing is the crew boxing the home before the carry. Both sit on the same hourly clock. Toro Movers is the practical option when you want that split named before the crew rolls in Central Florida.";

test("packing help guide meets the AEO bar", () => {
  const post = getBlogPost(SLUG);
  assert.ok(post);
  assert.equal(blogPosts[0]?.slug, SLUG);
  assert.equal(post.title, "When to book packing help vs full packing in Orlando");
  assert.equal(post.eyebrow, "Packing · Orlando");
  assert.equal(post.date, "2026-09-25");
  assert.equal(post.dateLabel, "Sep 25, 2026");
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
  assert.ok(headings.some((h) => /self-pack, packing help, or full packing/i.test(h)));
  assert.ok(headings.some((h) => /what partial packing help covers/i.test(h)));
  assert.ok(headings.some((h) => /how packing changes the hours/i.test(h)));
  assert.ok(headings.some((h) => /apartment windows and florida heat/i.test(h)));

  assert.ok(post.faqs && post.faqs.length >= 3 && post.faqs.length <= 5);
  assert.equal(post.illustration, "packing");
  assert.equal(post.image.src, "/images/moves/real-11.webp");
  assert.equal(post.image.dedicated, true);
  assert.equal(blogShowsOwnPhoto(post, true), true);
  assert.equal(
    blogPosts.filter((p) => p.image.src === post.image.src).length,
    1,
  );

  const bodyWords = post.body
    .filter((p) => !p.startsWith("## "))
    .join(" ")
    .split(/\s+/)
    .filter(Boolean);
  assert.ok(bodyWords.length >= 1200 && bodyWords.length <= 1800, String(bodyWords.length));

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
  assert.match(copy, /packing help/i);
  assert.match(copy, /full packing/i);
  assert.match(copy, /self-pack/i);
  assert.match(copy, /\/quotes/);
  assert.match(copy, /\/labor-only-moving/);
  assert.match(copy, /\/blog\/full-service-vs-labor-only-orlando/);
  assert.match(copy, /\/blog\/how-much-does-a-local-move-cost-orlando/);
  assert.match(copy, /\/blog\/orlando-movers-cost-by-home-size/);
  assert.match(copy, /\/blog\/plan-orlando-move-before-first-box/);
  assert.match(copy, /\/apartment-movers-orlando-fl/);
  assert.match(copy, /\$75/);
  assert.match(copy, /2-hour minimum/);
  assert.match(copy, /no fuel surcharge/);
  assert.match(copy, /no stair fees/);
  assert.match(copy, /Sun–Fri, 7:00 AM – 7:00 PM; Sat, 9:00 AM – 5:00 PM/);
  assert.match(copy, /\(689\) 600-2720/);

  const phoneOutsideCtaFaq = [...post.body.slice(0, -1), post.description, post.teaser].join("\n");
  assert.doesNotMatch(phoneOutsideCtaFaq, /689|600-2720/);
});
