import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { serviceCityPages } from "./city-pages.ts";
import {
  ORLANDO_HUB_DESCRIPTION,
  ORLANDO_HUB_H1,
  ORLANDO_HUB_SOURCE,
  orlandoHub,
  orlandoHubGraph,
  orlandoHubWordCount,
} from "./orlando-hub.ts";
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

test("orlando hub keeps its URL, H1 intent, and price-free copy", () => {
  assert.equal(orlandoHub.path, "/orlando-movers");
  assert.match(ORLANDO_HUB_H1, /Orlando movers/i);
  assert.equal(ORLANDO_HUB_SOURCE, "city-orlando-movers");
  assert.ok(orlandoHub.faqs.length >= 6);
  assert.equal(orlandoHub.faqs[0].a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(orlandoHub).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
    assert.doesNotMatch(line, /#1|5 stars|review/i);
  }
  assert.match(ORLANDO_HUB_DESCRIPTION, /321-234-0510/);
  assert.ok(ORLANDO_HUB_DESCRIPTION.length >= 120, String(ORLANDO_HUB_DESCRIPTION.length));
  assert.ok(ORLANDO_HUB_DESCRIPTION.length <= 160);
  assert.ok(orlandoHubWordCount() >= 1000, String(orlandoHubWordCount()));
});

test("orlando hub JSON-LD keeps the city graph and one rate sentence", () => {
  const graph = orlandoHubGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, [
    ["MovingCompany", "LocalBusiness"],
    "WebPage",
    "BreadcrumbList",
    "FAQPage",
  ]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/orlando-movers#faq");
  assert.equal(faq?.mainEntity.length, orlandoHub.faqs.length);
  assert.equal(faq?.mainEntity[0].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
  assert.equal(json.includes("aggregateRating"), false);
});

test("orlando hub route uses the rebrand page, every service, and every city", () => {
  const route = routeFor("/orlando-movers");
  assert.equal(route?.key, "../app/orlando-movers/page.tsx");
  assert.equal(
    routeFor("orlando-movers")?.path,
    "orlando-movers",
  );
  const page = readFileSync(new URL("../app/orlando-movers/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source=\{ORLANDO_HUB_SOURCE\}/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of SERVICES) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /central-florida-movers/);
  assert.match(page, /citiesByCounty/);
  const cities = serviceCityPages().filter((city) => city.slug !== "orlando-movers");
  assert.ok(cities.length >= 25);
  assert.match(view, /orlando-movers/);
  assert.match(lead, /"city-orlando-movers": "city-orlando-movers"/);
});
