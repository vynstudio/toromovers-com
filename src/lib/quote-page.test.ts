import assert from "node:assert/strict";
import test from "node:test";
import { quotePage, quotePageGraph, QUOTE_PAGE_URL } from "./quote-page.ts";

test("quote page canonical and heads target the live funnel URL", () => {
  assert.equal(quotePage.path, "/get-my-price");
  assert.equal(QUOTE_PAGE_URL, "https://toromovers.com/get-my-price");
  assert.match(quotePage.metadata.title, /quote/i);
  assert.match(quotePage.metadata.title, /Orlando/);
  assert.ok(quotePage.metadata.description.length >= 120);
  assert.ok(quotePage.metadata.description.length <= 165);
  assert.equal(quotePage.metadata.ogImage, "/og/get-my-price.jpg");
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

test("quote page copy does not claim licensed, insured, or long-distance", () => {
  const blob = JSON.stringify(quotePage);
  assert.doesNotMatch(blob, /licensed/i);
  assert.doesNotMatch(blob, /insured/i);
  assert.doesNotMatch(blob, /bonded/i);
  assert.match(blob, /long-distance/);
});

test("HowTo schema steps match visible steps", () => {
  const graph = quotePageGraph();
  const howTo = graph["@graph"].find((node) => node["@type"] === "HowTo") as {
    name: string;
    step: Array<{ name: string; text: string }>;
  };
  assert.equal(howTo.name, quotePage.howTo.h2);
  assert.equal(howTo.step.length, quotePage.howTo.steps.length);
  assert.equal(howTo.step[0].name, quotePage.howTo.steps[0].name);
});
