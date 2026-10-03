import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { sameDayMoversPage, serviceGuideGraph, serviceGuideWordCount } from "./service-guides.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Can I book same-day movers in Orlando?",
  "What should I send for a same-day quote?",
  "Why might same-day not work for my apartment?",
  "Is same-day priced differently from a booked local move?",
  "What if every crew is already out?",
  "Do you run same-day long-distance moves?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("same-day page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(sameDayMoversPage.path, "/same-day-movers-orlando");
  assert.equal(sameDayMoversPage.hero.h1, "Same-day movers in Orlando");
  assert.equal(sameDayMoversPage.hero.blogHref, "/blog/orlando-same-day-movers");
  assert.ok(sameDayMoversPage.faqs.length >= 6);
  const cost = sameDayMoversPage.faqs.find((item) => item.q === QUESTIONS[3]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(sameDayMoversPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
    assert.doesNotMatch(line, /same-day (fee|surcharge)|rush fee/i);
  }
  assert.match(sameDayMoversPage.metadata.description, /321-234-0510/);
  assert.ok(sameDayMoversPage.metadata.description.length >= 120);
  assert.ok(sameDayMoversPage.metadata.description.length <= 160);
  const words = serviceGuideWordCount(sameDayMoversPage);
  assert.ok(words >= 1000, String(words));
  assert.deepEqual(
    sameDayMoversPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("same-day JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = serviceGuideGraph(sameDayMoversPage);
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/same-day-movers-orlando#faq");
  assert.equal(faq?.mainEntity.length, QUESTIONS.length);
  assert.equal(faq?.mainEntity[3].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
  assert.doesNotMatch(json, /same-day fee|same-day surcharge|rush fee/i);
});

test("same-day page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/same-day-movers-orlando/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_same_day"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of ["/full-service-moving", "/labor-only-moving", "/services"]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /blogHref/);
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /same-day-movers-orlando/);
  assert.match(lead, /service_same_day: "service_same_day"/);
});
