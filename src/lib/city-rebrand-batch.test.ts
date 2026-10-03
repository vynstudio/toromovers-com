import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { kissimmeeMovers } from "./city-rebrand/kissimmee.ts";
import { sanfordMovers } from "./city-rebrand/sanford.ts";
import { winterParkMovers } from "./city-rebrand/winter-park.ts";
import { cityRebrandGraph, cityRebrandWordCount, type CityRebrandCopy } from "./city-rebrand.ts";
import { centralFloridaHub } from "./central-florida-hub.ts";
import { orlandoHub } from "./orlando-hub.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { routeFor } from "./route-table.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const CITIES = [kissimmeeMovers, winterParkMovers, sanfordMovers];

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

function bodyLines(copy: CityRebrandCopy): string[] {
  return [
    copy.lede,
    ...copy.sections.flatMap((section) => section.paragraphs),
    ...copy.faqs.map((item) => item.a),
    copy.servicesIntro,
    copy.nearbyIntro,
    copy.closing.body,
  ].filter((line) => line !== QUOTE_RATE_ANSWER);
}

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") Object.values(value).forEach((item) => strings(item, out));
  return out;
}

test("batch 1 city pages keep URL, source, H1 intent, and unique copy", () => {
  const seen = new Set<string>();
  const hubLines = new Set(
    [
      orlandoHub.lede,
      ...orlandoHub.sections.flatMap((section) => section.paragraphs),
      ...orlandoHub.faqs.map((item) => item.a),
      orlandoHub.closing.body,
      centralFloridaHub.lede,
      ...centralFloridaHub.sections.flatMap((section) => section.paragraphs),
      ...centralFloridaHub.faqs.map((item) => item.a),
      centralFloridaHub.closing.body,
    ].filter((line) => line && line !== QUOTE_RATE_ANSWER),
  );

  for (const city of CITIES) {
    assert.equal(city.path, `/${city.slug}`);
    assert.equal(city.source, `city-${city.slug}`);
    assert.match(city.h1, new RegExp(city.cityName, "i"));
    assert.doesNotMatch(city.h1, /\u2014/);
    assert.ok(city.faqs.length >= 6, city.slug);
    assert.equal(city.faqs[0].a, QUOTE_RATE_ANSWER);
    assert.equal(QUOTE_RATE_ANSWER, RATE);
    assert.ok(city.description.length >= 120 && city.description.length <= 160, `${city.slug} ${city.description.length}`);
    assert.match(city.description, /321-234-0510/);
    assert.ok(cityRebrandWordCount(city) >= 1000, `${city.slug} ${cityRebrandWordCount(city)}`);
    for (const line of strings(city)) {
      if (line === QUOTE_RATE_ANSWER) continue;
      assert.equal(line.includes("$"), false, line);
      assert.equal(line.includes("689"), false, line);
      assert.equal(line.includes("\u2014"), false, line);
      assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
      assert.doesNotMatch(line, /#1|5 stars|\breviews?\b/i);
      assert.doesNotMatch(line, /this page|the hub/i);
    }
    for (const line of bodyLines(city)) {
      assert.equal(seen.has(line), false, line.slice(0, 80));
      assert.equal(hubLines.has(line), false, line.slice(0, 80));
      seen.add(line);
    }
  }
});

test("batch 1 JSON-LD keeps the city graph and one rate sentence", () => {
  for (const city of CITIES) {
    const graph = cityRebrandGraph(city);
    const types = graph["@graph"].map((node) => node["@type"]);
    assert.deepEqual(types, [["MovingCompany", "LocalBusiness"], "WebPage", "BreadcrumbList", "FAQPage"]);
    const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
    assert.equal(faq?.["@id"], `https://toromovers.com${city.path}#faq`);
    assert.equal(faq?.mainEntity.length, city.faqs.length);
    const json = JSON.stringify(graph);
    assert.equal(json.split("$95").length - 1, 1);
    assert.equal(json.includes("689"), false);
    assert.equal(json.includes("\u2014"), false);
    assert.equal(json.includes("aggregateRating"), false);
  }
});

test("batch 1 routes use the rebrand pages, services, hubs, and nearby cities", () => {
  const shell = readFileSync(new URL("../components/city/RebrandCityPage.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  for (const href of SERVICES) assert.match(shell, new RegExp(href.replace(/\//g, "\\/")));
  assert.match(shell, /\/orlando-movers/);
  assert.match(shell, /\/central-florida-movers/);
  assert.match(shell, /nearbyCityPages/);
  assert.match(shell, /loading="lazy"/);
  assert.equal(shell.includes("/images/moves/"), false);
  assert.equal(shell.includes("689"), false);
  for (const city of CITIES) {
    const route = routeFor(city.path);
    assert.equal(route?.key, `../app/${city.slug}/page.tsx`);
    const page = readFileSync(new URL(`../app/${city.slug}/page.tsx`, import.meta.url), "utf8");
    assert.match(page, /RebrandCityPage/);
    assert.match(view, new RegExp(city.slug));
    assert.match(lead, new RegExp(`"${city.source}": "${city.source}"`));
  }
});
