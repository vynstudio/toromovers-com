import assert from "node:assert/strict";
import test from "node:test";
import {
  quotePage,
  quotePageGraph,
  QUOTE_AEO_ANSWER,
  QUOTE_PAGE_URL,
} from "./quote-page.ts";

test("quote page canonical and heads target the live funnel URL", () => {
  assert.equal(quotePage.path, "/quotes");
  assert.equal(QUOTE_PAGE_URL, "https://toromovers.com/quotes");
  assert.match(quotePage.metadata.title.absolute, /quote/i);
  assert.match(quotePage.metadata.title.absolute, /Orlando/);
  assert.match(quotePage.metadata.title.absolute, /\$75/);
  assert.ok(quotePage.metadata.description.length >= 120);
  assert.ok(quotePage.metadata.description.length <= 165);
  assert.equal(quotePage.hero.lede, quotePage.faqs[0].a);
  assert.equal(quotePage.hero.lede, QUOTE_AEO_ANSWER);
  assert.ok(QUOTE_AEO_ANSWER.length <= 180);
  assert.equal(quotePage.metadata.ogImage, "/og/get-my-price.jpg");
});

test("quote hero uses the face-crop customer-proof webp and a short AEO lede", () => {
  assert.equal(quotePage.hero.image.src, "/images/proof-customer-faces.webp");
  assert.equal(
    quotePage.hero.image.alt,
    "Toro Movers with a customer on a Central Florida canal after a local move",
  );
  assert.equal(quotePage.hero.image.position, "object-center");
  assert.equal(quotePage.hero.image.width, 900);
  assert.equal(quotePage.hero.image.height, 750);
  assert.match(quotePage.hero.lede, /\$75\/mover\/hour/);
  assert.match(quotePage.hero.lede, /2-hour minimum/);
  assert.match(quotePage.form.h2, /call you back/i);
  assert.match(quotePage.form.lede, /15 minutes/);
});

test("FAQ schema text matches on-page FAQ copy", () => {
  const graph = quotePageGraph();
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage") as {
    mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
  };
  assert.equal(faq.mainEntity.length, quotePage.faqs.length);
  for (const [i, item] of quotePage.faqs.entries()) {
    assert.equal(faq.mainEntity[i].name, item.q);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, item.a);
  }
});

test("JSON-LD description and primary image stay in sync with visible hero", () => {
  const graph = quotePageGraph();
  const webpage = graph["@graph"].find((node) => node["@type"] === "WebPage") as {
    description: string;
    headline: string;
    primaryImageOfPage: { url: string };
  };
  assert.equal(webpage.description, quotePage.hero.lede);
  assert.equal(webpage.headline, quotePage.hero.h1);
  assert.ok(webpage.primaryImageOfPage.url.endsWith(quotePage.hero.image.src));
});

test("quote page copy does not claim licensed, insured, or a partner carrier", () => {
  const blob = JSON.stringify(quotePage);
  assert.doesNotMatch(blob, /licensed/i);
  assert.doesNotMatch(blob, /insured/i);
  assert.doesNotMatch(blob, /bonded/i);
  assert.doesNotMatch(blob, /eeze/i);
  assert.doesNotMatch(blob, /don.?t offer long-distance/i);
  assert.match(blob, /long-distance and interstate/);
});

test("HowTo schema matches the compact on-page line", () => {
  const graph = quotePageGraph();
  const howTo = graph["@graph"].find((node) => node["@type"] === "HowTo") as {
    name: string;
    description: string;
    step: Array<{ name: string; text: string }>;
  };
  assert.equal(howTo.name, quotePage.howTo.h2);
  assert.equal(howTo.description, quotePage.howTo.intro);
  assert.equal(howTo.step.length, 1);
  assert.equal(howTo.step.length, quotePage.howTo.steps.length);
  assert.equal(howTo.step[0].name, quotePage.howTo.steps[0].name);
  assert.equal(howTo.step[0].text, quotePage.howTo.intro);
  assert.ok(quotePage.howTo.intro.length <= 140);
});

test("quotes landing stays a short ad page: 4 FAQs, 4 service links, 1 HowTo step", () => {
  assert.equal(quotePage.faqs.length, 4);
  assert.equal(quotePage.services.links.length, 4);
  assert.equal(quotePage.howTo.steps.length, 1);
  for (const item of quotePage.faqs) {
    assert.ok(item.a.length <= 220, item.q);
  }
  assert.match(quotePage.faqs[0].q, /cost|price|\$75/i);
  assert.match(quotePage.faqs[1].q, /quote/i);
  assert.match(quotePage.faqs[2].q, /call back/i);
  assert.match(quotePage.faqs[3].q, /long-distance|interstate|bilingual/i);
});
