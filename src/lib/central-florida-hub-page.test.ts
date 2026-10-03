import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { serviceCityPages } from "./city-pages.ts";
import {
  CENTRAL_FLORIDA_HUB_DESCRIPTION,
  CENTRAL_FLORIDA_HUB_H1,
  CENTRAL_FLORIDA_HUB_SOURCE,
  CENTRAL_FLORIDA_HUB_TITLE,
  centralFloridaHub,
  centralFloridaHubGraph,
  centralFloridaHubWordCount,
} from "./central-florida-hub.ts";
import { orlandoHub } from "./orlando-hub.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { routeFor } from "./route-table.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const SERVICES = [
  "/full-service-moving",
  "/labor-only-moving",
  "/apartment-movers-orlando-fl",
  "/loading-unloading",
  "/packing-services-orlando",
  "/office-movers-orlando",
  "/same-day-movers-orlando",
  "/small-moves-orlando",
  "/pod-loading-orlando",
  "/services",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("central florida hub keeps its URL, H1 intent, and price-free copy", () => {
  assert.equal(centralFloridaHub.path, "/central-florida-movers");
  assert.equal(CENTRAL_FLORIDA_HUB_H1, "Central Florida Movers for Local Home & Apartment Moves");
  assert.equal(CENTRAL_FLORIDA_HUB_TITLE, "Central Florida Movers | Local Moves Across the Region");
  assert.doesNotMatch(CENTRAL_FLORIDA_HUB_H1, /orlando/i);
  assert.doesNotMatch(CENTRAL_FLORIDA_HUB_TITLE, /orlando/i);
  assert.equal(CENTRAL_FLORIDA_HUB_SOURCE, "city-central-florida-movers");
  assert.ok(centralFloridaHub.faqs.length >= 6);
  assert.equal(centralFloridaHub.faqs[0].a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(centralFloridaHub).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
    assert.doesNotMatch(line, /#1|5 stars|review/i);
    assert.doesNotMatch(line, /this page|the hub/i);
  }
  assert.match(CENTRAL_FLORIDA_HUB_DESCRIPTION, /321-234-0510/);
  assert.ok(CENTRAL_FLORIDA_HUB_DESCRIPTION.length >= 120, String(CENTRAL_FLORIDA_HUB_DESCRIPTION.length));
  assert.ok(CENTRAL_FLORIDA_HUB_DESCRIPTION.length <= 160);
  assert.ok(centralFloridaHubWordCount() >= 1000, String(centralFloridaHubWordCount()));
  const orlandoBody = new Set(
    [orlandoHub.lede, ...orlandoHub.sections.flatMap((section) => section.paragraphs), ...orlandoHub.faqs.map((item) => item.a), orlandoHub.closing.body]
      .filter((line) => line !== QUOTE_RATE_ANSWER),
  );
  const regionalBody = [
    centralFloridaHub.lede,
    ...centralFloridaHub.sections.flatMap((section) => section.paragraphs),
    ...centralFloridaHub.faqs.map((item) => item.a),
    centralFloridaHub.closing.body,
  ].filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of regionalBody) {
    assert.equal(orlandoBody.has(line), false, line.slice(0, 80));
  }
});

test("central florida hub JSON-LD keeps the regional graph and one rate sentence", () => {
  const graph = centralFloridaHubGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, [
    ["MovingCompany", "LocalBusiness"],
    "WebPage",
    "BreadcrumbList",
    "FAQPage",
  ]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/central-florida-movers#faq");
  assert.equal(faq?.mainEntity.length, centralFloridaHub.faqs.length);
  assert.equal(faq?.mainEntity[0].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
  assert.equal(json.includes("aggregateRating"), false);
});

test("central florida hub route uses the rebrand page, every service, and every city", () => {
  const route = routeFor("/central-florida-movers");
  assert.equal(route?.key, "../app/central-florida-movers/page.tsx");
  assert.equal(routeFor("central-florida-movers")?.path, "central-florida-movers");
  const page = readFileSync(new URL("../app/central-florida-movers/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source=\{CENTRAL_FLORIDA_HUB_SOURCE\}/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  assert.doesNotMatch(page, /this page|the hub/i);
  for (const href of SERVICES) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /\/orlando-movers/);
  assert.match(page, /citiesByCounty/);
  const cities = serviceCityPages();
  assert.ok(cities.length >= 30);
  assert.match(view, /central-florida-movers/);
  assert.match(lead, /"city-central-florida-movers": "city-central-florida-movers"/);
});
