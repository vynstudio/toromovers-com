import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  FULL_SERVICE_PATH,
  FULL_SERVICE_PHONE,
  fullServicePage,
  fullServicePageGraph,
} from "./full-service-page.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "What is full-service moving?",
  "How is full-service different from labor-only?",
  "Do you move apartments and houses?",
  "How much do full-service movers cost in Orlando?",
  "Are your movers bilingual?",
  "How do I get a full-service quote?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("full-service page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(FULL_SERVICE_PATH, "/full-service-moving");
  assert.equal(fullServicePage.path, "/full-service-moving");
  assert.equal(fullServicePage.hero.h1, "Full-service movers in Orlando");
  assert.equal(FULL_SERVICE_PHONE, "321-234-0510");
  assert.deepEqual(
    fullServicePage.areas.links.map((link) => link.href),
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
  const cost = fullServicePage.faqs.find((item) => item.q === QUESTIONS[3]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(fullServicePage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(fullServicePage.metadata.description, /321-234-0510/);
  assert.deepEqual(
    fullServicePage.faqs.map((item) => item.q),
    QUESTIONS,
  );
  assert.ok(fullServicePage.faqs.length >= 6);
  assert.ok(bodyWordCount(fullServicePage) >= 1000, String(bodyWordCount(fullServicePage)));
});

function bodyWordCount(value: unknown, key?: string): number {
  if (key === "metadata" || key === "path" || key === "href" || key === "src") return 0;
  if (typeof value === "string") return value.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((sum, item) => sum + bodyWordCount(item), 0);
  if (value && typeof value === "object") {
    return Object.entries(value).reduce((sum, [childKey, child]) => sum + bodyWordCount(child, childKey), 0);
  }
  return 0;
}

test("full-service JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = fullServicePageGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/full-service-moving#faq");
  assert.equal(faq?.mainEntity[3].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("full-service page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/full-service-moving/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_full_service"/);
  assert.match(page, /family-with-boxes|happy-family|family-boxes|family-new-house|family-together/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  assert.match(page, /\/labor-only-moving/);
  assert.match(page, /\/blog\/full-service-vs-labor-only-orlando/);
  assert.match(page, /\/blog\/how-much-does-a-local-move-cost-orlando/);
  assert.match(page, /\/services/);
  assert.match(view, /full-service-moving/);
  assert.match(lead, /service_full_service: "service_full_service"/);
});
