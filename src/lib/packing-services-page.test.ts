import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { packingServicesPage, serviceGuideGraph, serviceGuideWordCount } from "./service-guides.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "What are packing services in Orlando?",
  "Is there a separate price for packing?",
  "Can packing be added to labor-only or full-service?",
  "Will on-site packing use my elevator window?",
  "How do I book packing services in Orlando?",
  "Do I need to buy boxes before the crew arrives?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("packing page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(packingServicesPage.path, "/packing-services-orlando");
  assert.equal(packingServicesPage.hero.h1, "Packing services in Orlando");
  assert.equal(packingServicesPage.hero.blogHref, "/blog/orlando-packing-help-movers");
  assert.deepEqual(
    packingServicesPage.areas.links.map((link) => link.href),
    [
      "/orlando-movers",
      "/lake-nona-movers",
      "/dr-phillips-movers",
      "/winter-park-movers",
      "/oviedo-movers",
      "/kissimmee-movers",
      "/winter-garden-movers",
      "/lake-mary-movers",
      "/winter-springs-movers",
      "/horizon-west-movers",
      "/deltona-movers",
      "/central-florida-movers",
    ],
  );
  const cost = packingServicesPage.faqs.find((item) => item.q === QUESTIONS[1]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(packingServicesPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(packingServicesPage.metadata.description, /321-234-0510/);
  assert.ok(packingServicesPage.metadata.description.length >= 120);
  assert.ok(packingServicesPage.metadata.description.length <= 160);
  const words = serviceGuideWordCount(packingServicesPage);
  assert.ok(words >= 1000, String(words));
  assert.deepEqual(
    packingServicesPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("packing JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = serviceGuideGraph(packingServicesPage);
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/packing-services-orlando#faq");
  assert.equal(faq?.mainEntity[1].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("packing page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(
    new URL("../app/packing-services-orlando/page.tsx", import.meta.url),
    "utf8",
  );
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_packing"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of [
    "/full-service-moving",
    "/labor-only-moving",
    "/apartment-movers-orlando-fl",
    "/loading-unloading",
    "/small-moves-orlando",
    "/services",
  ]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /blogHref/);
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /packing-services-orlando/);
  assert.match(lead, /service_packing: "service_packing"/);
});
