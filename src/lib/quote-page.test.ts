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
  assert.ok(QUOTE_AEO_ANSWER.length <= 80);
  assert.equal(quotePage.metadata.ogImage, "/og/get-my-price.jpg");
});

test("quote hero is a one-line $75 lede for a one-screen ads landing", () => {
  assert.match(quotePage.hero.lede, /\$75\/mover\/hour/);
  assert.match(quotePage.hero.lede, /2-hour min/);
  assert.match(quotePage.form.h2, /call you back/i);
  assert.equal("howTo" in quotePage, false);
  assert.equal("services" in quotePage, false);
  assert.equal("facts" in quotePage.hero, false);
  assert.equal("image" in quotePage.hero, false);
});

test("FAQ schema is present and matches quote-page FAQ copy (schema-only UI)", () => {
  const graph = quotePageGraph();
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage") as {
    mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
  };
  assert.equal(faq.mainEntity.length, quotePage.faqs.length);
  assert.equal(quotePage.faqs.length, 4);
  for (const [i, item] of quotePage.faqs.entries()) {
    assert.equal(faq.mainEntity[i].name, item.q);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, item.a);
    assert.ok(item.a.length <= 220, item.q);
  }
});

test("JSON-LD keeps WebPage, Service/Offer, and FAQPage without HowTo", () => {
  const graph = quotePageGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.ok(types.includes("WebPage"));
  assert.ok(types.includes("Service"));
  assert.ok(types.includes("FAQPage"));
  assert.equal(
    graph["@graph"].some((node) => node["@type"] === "HowTo"),
    false,
  );
  const webpage = graph["@graph"].find((node) => node["@type"] === "WebPage") as {
    description: string;
    headline: string;
    primaryImageOfPage: { url: string };
    speakable: { cssSelector: string[] };
  };
  const service = graph["@graph"].find((node) => node["@type"] === "Service") as {
    offers: { "@type": string; price: string };
  };
  assert.equal(webpage.description, quotePage.hero.lede);
  assert.equal(webpage.headline, quotePage.hero.h1);
  assert.ok(webpage.primaryImageOfPage.url.endsWith(quotePage.metadata.ogImage));
  assert.deepEqual(webpage.speakable.cssSelector, ["h1", ".aeo-answer"]);
  assert.equal(service.offers["@type"], "Offer");
  assert.equal(service.offers.price, "75");
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
