import assert from "node:assert/strict";
import test from "node:test";
import {
  quotePage,
  quotePageGraph,
  QUOTE_AEO_ANSWER,
  QUOTE_PAGE_URL,
  QUOTE_RATE_ANSWER,
} from "./quote-page.ts";

const RATE_SENTENCE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

test("quote page canonical and heads stay price-free", () => {
  assert.equal(quotePage.path, "/quotes");
  assert.equal(QUOTE_PAGE_URL, "https://toromovers.com/quotes");
  assert.equal(
    quotePage.metadata.title.absolute,
    "Get your moving quote in Orlando | Toro Movers",
  );
  assert.match(quotePage.metadata.title.absolute, /moving quote in Orlando/);
  assert.equal(quotePage.hero.h1, "Get your moving quote in Orlando.");
  assert.equal(quotePage.hero.lede, QUOTE_AEO_ANSWER);
  assert.equal(
    quotePage.hero.lede,
    "Tell us about your move. A local mover calls you back fast.",
  );
  assert.ok(quotePage.metadata.description.length >= 120);
  assert.ok(quotePage.metadata.description.length <= 185);
  assert.equal(quotePage.metadata.ogTitle, quotePage.metadata.title.absolute);
  assert.equal(quotePage.metadata.ogDescription, quotePage.metadata.description);
  assert.equal(quotePage.metadata.ogImage, "/og/get-my-price.jpg");
  assert.equal(QUOTE_RATE_ANSWER, RATE_SENTENCE);
  assert.equal(quotePage.faqs[0].a, QUOTE_RATE_ANSWER);
  for (const keyword of quotePage.metadata.keywords) {
    assert.equal(keyword.includes("$"), false, keyword);
  }
});

test("the hourly rate appears only in the cost FAQ answer", () => {
  const pageJson = JSON.stringify(quotePage);
  assert.equal(pageJson.split("$95").length - 1, 1);
  assert.equal(quotePage.faqs[0].q, "How much does it cost?");
  assert.doesNotMatch(quotePage.hero.h1, /\$/);
  assert.doesNotMatch(quotePage.hero.lede, /\$/);
  assert.doesNotMatch(quotePage.metadata.title.absolute, /\$/);
  assert.doesNotMatch(quotePage.metadata.description, /\$/);
  assert.doesNotMatch(quotePage.metadata.ogDescription, /\$/);
  assert.doesNotMatch(JSON.stringify(quotePage), /\u2014/);
  assert.match(quotePage.form.h2, /call you back/i);
  assert.equal("howTo" in quotePage, false);
  assert.equal("services" in quotePage, false);
  assert.equal("facts" in quotePage.hero, false);
  assert.equal("image" in quotePage.hero, false);
});

test("FAQ schema matches the visible quote-page FAQ", () => {
  const graph = quotePageGraph();
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage") as {
    mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>;
  };
  assert.equal(faq.mainEntity.length, quotePage.faqs.length);
  assert.equal(quotePage.faqs.length, 4);
  assert.match(quotePage.faqs[1].q, /call back/i);
  assert.match(quotePage.faqs[2].q, /same-day/i);
  assert.match(quotePage.faqs[2].a, /crew availability/);
  assert.match(quotePage.faqs[2].a, /no extra fee/);
  assert.match(quotePage.faqs[3].q, /areas/i);
  for (const [i, item] of quotePage.faqs.entries()) {
    assert.equal(faq.mainEntity[i].name, item.q);
    assert.equal(faq.mainEntity[i].acceptedAnswer.text, item.a);
    assert.ok(item.a.length <= 220, item.q);
  }
  const graphJson = JSON.stringify(graph);
  assert.equal(graphJson.split("$95").length - 1, 1);
  assert.ok(graphJson.includes(RATE_SENTENCE));
});

test("JSON-LD keeps WebPage, Service, and FAQPage without a price offer", () => {
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
    name: string;
    primaryImageOfPage: { url: string };
    speakable: { cssSelector: string[] };
  };
  const service = graph["@graph"].find((node) => node["@type"] === "Service") as {
    description: string;
    offers?: { price?: string };
  };
  assert.equal(webpage.description, quotePage.hero.lede);
  assert.equal(webpage.headline, quotePage.hero.h1);
  assert.equal(webpage.name, quotePage.metadata.ogTitle);
  assert.doesNotMatch(webpage.description, /\$95/);
  assert.doesNotMatch(webpage.name, /\$95/);
  assert.doesNotMatch(service.description, /\$95/);
  assert.equal(service.offers, undefined);
  assert.ok(webpage.primaryImageOfPage.url.endsWith(quotePage.metadata.ogImage));
  assert.deepEqual(webpage.speakable.cssSelector, ["h1", ".aeo-answer"]);
  const company = graph["@graph"].find((node) => node["@type"] === "MovingCompany") as {
    telephone: string;
    contactPoint: { "@type": string; telephone: string; contactType: string };
  };
  assert.equal(company.telephone, "+13212340510");
  assert.deepEqual(company.contactPoint, {
    "@type": "ContactPoint",
    telephone: "+13212340510",
    contactType: "customer service",
  });
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
