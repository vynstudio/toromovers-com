import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { officeMoversPage, serviceGuideGraph, serviceGuideWordCount } from "./service-guides.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Do you offer office movers in Orlando?",
  "Are you commercial movers for a small suite?",
  "Can the crew move an office after hours or on Saturday?",
  "What if the building wants paperwork before the truck can enter?",
  "How much do office movers cost in Orlando?",
  "Do you reconnect computers after an office move?",
  "How do I get an office moving quote?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("office page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(officeMoversPage.path, "/office-movers-orlando");
  assert.equal(officeMoversPage.hero.h1, "Office movers in Orlando");
  assert.equal(officeMoversPage.hero.blogHref, "/blog/orlando-office-small-commercial-movers");
  assert.ok(officeMoversPage.faqs.length >= 6);
  const cost = officeMoversPage.faqs.find((item) => item.q === QUESTIONS[4]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(officeMoversPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(officeMoversPage.metadata.description, /321-234-0510/);
  assert.ok(officeMoversPage.metadata.description.length >= 120);
  assert.ok(officeMoversPage.metadata.description.length <= 160);
  const words = serviceGuideWordCount(officeMoversPage);
  assert.ok(words >= 1000, String(words));
  assert.deepEqual(
    officeMoversPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("office JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = serviceGuideGraph(officeMoversPage);
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/office-movers-orlando#faq");
  assert.equal(faq?.mainEntity.length, QUESTIONS.length);
  assert.equal(faq?.mainEntity[4].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("office page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/office-movers-orlando/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_office"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of [
    "/full-service-moving",
    "/labor-only-moving",
    "/packing-services-orlando",
    "/services",
  ]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /blogHref/);
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /office-movers-orlando/);
  assert.match(lead, /service_office: "service_office"/);
});
