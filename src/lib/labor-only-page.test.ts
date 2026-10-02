import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  LABOR_ONLY_PATH,
  LABOR_ONLY_PHONE,
  laborOnlyPage,
  laborOnlyPageGraph,
} from "./labor-only-page.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Do you offer labor-only loading and unloading in Orlando?",
  "Do labor-only movers bring a truck?",
  "Can you load or unload a U-Haul?",
  "Can you pack a POD or portable storage container?",
  "How many movers will I need?",
  "How long does a labor-only job take?",
  "How much do labor-only movers cost in Orlando?",
  "Are your movers bilingual?",
  "How do I get a labor-only quote?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("labor-only page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(LABOR_ONLY_PATH, "/labor-only-moving");
  assert.equal(laborOnlyPage.path, "/labor-only-moving");
  assert.equal(laborOnlyPage.hero.h1, "Labor-only movers in Orlando");
  assert.equal(LABOR_ONLY_PHONE, "321-234-0510");
  assert.deepEqual(
    laborOnlyPage.areas.links.map((link) => link.href),
    [
      "/orlando-movers",
      "/winter-park-movers",
      "/kissimmee-movers",
      "/clermont-movers",
      "/sanford-movers",
      "/lake-mary-movers",
      "/oviedo-movers",
      "/winter-garden-movers",
      "/altamonte-springs-movers",
      "/st-cloud-movers",
      "/lakeland-movers",
      "/central-florida-movers",
    ],
  );
  const cost = laborOnlyPage.faqs.find((item) => item.q === QUESTIONS[6]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(laborOnlyPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(laborOnlyPage.metadata.description, /321-234-0510/);
  assert.deepEqual(
    laborOnlyPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("labor-only JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = laborOnlyPageGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/labor-only-moving#faq");
  assert.equal(faq?.mainEntity[6].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("labor-only page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/labor-only-moving/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_labor_only"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of [
    "/pod-loading-orlando",
    "/small-moves-orlando",
    "/loading-unloading",
    "/full-service-moving",
    "/services",
    "/orlando-movers",
    "/orlando-movers-gallery",
  ]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /labor-only-moving/);
  assert.match(lead, /service_labor_only: "service_labor_only"/);
});
