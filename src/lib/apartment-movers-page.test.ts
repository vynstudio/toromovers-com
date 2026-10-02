import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  APARTMENT_PATH,
  APARTMENT_PHONE,
  apartmentMoversPage,
  apartmentMoversPageGraph,
} from "./apartment-movers-page.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Do you handle apartment moves in Orlando?",
  "Can you move a walk-up apartment?",
  "Do you work with reserved elevators?",
  "Is labor-only available for apartment moves?",
  "How much do apartment movers cost in Orlando?",
  "Are your movers bilingual?",
  "How do I get an apartment moving quote?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("apartment page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(APARTMENT_PATH, "/apartment-movers-orlando-fl");
  assert.equal(apartmentMoversPage.path, "/apartment-movers-orlando-fl");
  assert.equal(apartmentMoversPage.hero.h1, "Apartment movers in Orlando");
  assert.equal(APARTMENT_PHONE, "321-234-0510");
  assert.deepEqual(
    apartmentMoversPage.areas.links.map((link) => link.href),
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
      "/central-florida-movers",
    ],
  );
  const cost = apartmentMoversPage.faqs.find((item) => item.q === QUESTIONS[4]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(apartmentMoversPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(apartmentMoversPage.metadata.description, /321-234-0510/);
  assert.deepEqual(
    apartmentMoversPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("apartment JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = apartmentMoversPageGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/apartment-movers-orlando-fl#faq");
  assert.equal(faq?.mainEntity[4].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("apartment page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(
    new URL("../app/apartment-movers-orlando-fl/page.tsx", import.meta.url),
    "utf8",
  );
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_apartment"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of [
    "/labor-only-moving",
    "/services",
    "/blog/how-much-does-a-local-move-cost-orlando",
  ]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /apartment-movers-orlando-fl/);
  assert.match(lead, /service_apartment: "service_apartment"/);
});
