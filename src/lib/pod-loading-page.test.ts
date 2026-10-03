import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";
import { podLoadingPage, serviceGuideGraph, serviceGuideWordCount } from "./service-guides.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

const QUESTIONS = [
  "Do you offer POD loading help in Orlando?",
  "Do you load U-Haul trucks and storage units?",
  "How is this different from labor-only moving?",
  "How is this different from loading and unloading or a small move?",
  "How much does POD or U-Haul loading cost?",
  "What has to be on site before the crew arrives?",
];

function strings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) value.forEach((item) => strings(item, out));
  else if (value && typeof value === "object") {
    Object.values(value).forEach((item) => strings(item, out));
  }
  return out;
}

test("POD page keeps its URL, H1, links, and price-free chrome copy", () => {
  assert.equal(podLoadingPage.path, "/pod-loading-orlando");
  assert.equal(podLoadingPage.hero.h1, "POD loading help in Orlando");
  assert.equal(podLoadingPage.hero.blogHref, "/blog/uhaul-pod-loading-help-orlando");
  assert.ok(podLoadingPage.faqs.length >= 6);
  const cost = podLoadingPage.faqs.find((item) => item.q === QUESTIONS[4]);
  assert.equal(cost?.a, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const visible = strings(podLoadingPage).filter((line) => line !== QUOTE_RATE_ANSWER);
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(podLoadingPage.metadata.description, /321-234-0510/);
  assert.ok(podLoadingPage.metadata.description.length >= 120, String(podLoadingPage.metadata.description.length));
  assert.ok(podLoadingPage.metadata.description.length <= 160);
  assert.ok(serviceGuideWordCount(podLoadingPage) >= 1000);
  assert.deepEqual(
    podLoadingPage.faqs.map((item) => item.q),
    QUESTIONS,
  );
});

test("POD JSON-LD keeps the service graph and one rate sentence", () => {
  const graph = serviceGuideGraph(podLoadingPage);
  const types = graph["@graph"].map((node) => node["@type"]);
  assert.deepEqual(types, ["Service", "WebPage", "BreadcrumbList", "FAQPage"]);
  const faq = graph["@graph"].find((node) => node["@type"] === "FAQPage");
  assert.equal(faq?.["@id"], "https://toromovers.com/pod-loading-orlando#faq");
  assert.equal(faq?.mainEntity[4].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
  assert.equal(json.includes("689"), false);
  assert.equal(json.includes("\u2014"), false);
});

test("POD page shell uses the homepage wizard and family photos", () => {
  const page = readFileSync(new URL("../app/pod-loading-orlando/page.tsx", import.meta.url), "utf8");
  const view = readFileSync(new URL("../components/render/PageView.astro", import.meta.url), "utf8");
  const lead = readFileSync(new URL("../app/api/lead/route.ts", import.meta.url), "utf8");
  assert.match(page, /source="service_pod_loading"/);
  assert.match(page, /happy-family|family-boxes|family-new-house|family-together/);
  assert.match(page, /loading="lazy"/);
  assert.equal(page.includes("/images/moves/"), false);
  assert.equal(page.includes("689"), false);
  assert.equal(page.includes("\u2014"), false);
  for (const href of ["/loading-unloading", "/labor-only-moving", "/small-moves-orlando", "/services", "/blog/orlando-pod-uhaul-storage-loading"]) {
    assert.match(page, new RegExp(href.replace(/\//g, "\\/")));
  }
  assert.match(page, /blogHref/);
  assert.match(page, /QUOTE_PATH/);
  assert.match(view, /pod-loading-orlando/);
  assert.match(lead, /service_pod_loading: "service_pod_loading"/);
});
