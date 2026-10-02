import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import {
  LOADING_PATH,
  LOADING_PHONE,
  loadingUnloadingPage,
  loadingUnloadingPageGraph,
} from "./loading-unloading-page.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Do you move a single piece of furniture in Orlando?",
  "Can you just load or unload my truck?",
  "Is this the same as full-service moving?",
  "How is pricing handled?",
  "How do I book loading help?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("loading page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(LOADING_PATH, "/loading-unloading");
  assert.equal(loadingUnloadingPage.path, "/loading-unloading");
  assert.equal(loadingUnloadingPage.hero.h1, "Loading and unloading help in Orlando");
  assert.equal(LOADING_PHONE, "321-234-0510");
  assert.deepEqual(
    loadingUnloadingPage.areas.links.map((link) => link.href),
    [
      "/orlando-movers",
      "/winter-park-movers",
      "/oviedo-movers",
      "/kissimmee-movers",
      "/clermont-movers",
      "/sanford-movers",
      "/small-moves-orlando",
      "/pod-loading-orlando",
      "/labor-only-moving",
      "/full-service-moving",
      "/apartment-movers-orlando-fl",
    ],
  );
  const cost = loadingUnloadingPage.faqs.find((item) => item.q === QUESTIONS[3]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(loadingUnloadingPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(loadingUnloadingPage.metadata.description, /321-234-0510/);
  assert.deepEqual(
    loadingUnloadingPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("loading JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = loadingUnloadingPageGraph();
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/loading-unloading#faq");
  assert.equal(faq?.mainEntity[3].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("loading page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/loading-unloading/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_loading_unloading"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of [
    "/labor-only-moving",
    "/small-moves-orlando",
    "/pod-loading-orlando",
    "/full-service-moving",
    "/services",
  ]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /loading-unloading/);
  assert.match(lead, /service_loading_unloading: "service_loading_unloading"/);
});
