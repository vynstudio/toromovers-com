import assert from "node:assert/strict";
import test from "node:test";
import { QUOTE_RATE_ANSWER, quoteFaqs } from "./quote-faqs.ts";
import { servicesHub } from "./services-hub.ts";
import {
  SERVICES_DESCRIPTION,
  SERVICES_FOOT,
  SERVICES_H1,
  SERVICES_LEDE,
  SERVICES_OG_TITLE,
  SERVICES_PATH,
  SERVICES_TITLE,
  servicesFaqGraph,
  servicesPagePrimary,
  servicesPageSecondary,
} from "./services-page.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

test("services hub keeps its H1 intent, links, and price-free chrome copy", () => {
  assert.equal(SERVICES_PATH, "/services");
  assert.equal(SERVICES_H1, servicesHub.heading);
  assert.equal(SERVICES_H1, "Orlando movers for full-service, labor-only & apartments");
  const cards = [...servicesPagePrimary, ...servicesPageSecondary];
  assert.deepEqual(
    cards.map((item) => item.href),
    [...servicesHub.primary, ...servicesHub.secondary].map((item) => item.href),
  );
  assert.deepEqual(
    cards.map((item) => item.title),
    [...servicesHub.primary, ...servicesHub.secondary].map((item) => item.title),
  );
  const visible = [
    SERVICES_TITLE,
    SERVICES_DESCRIPTION,
    SERVICES_OG_TITLE,
    SERVICES_H1,
    SERVICES_LEDE,
    SERVICES_FOOT,
    ...cards.flatMap((item) => [item.title, item.body, item.linkLabel, item.badge ?? ""]),
  ];
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|own truck|truck ownership|rush fee|same-day fee/i);
  }
  assert.match(SERVICES_DESCRIPTION, /321-234-0510/);
  assert.match(SERVICES_FOOT, /321-234-0510/);
});

test("services FAQ JSON-LD is the shared Straight answers set and holds the only rate", () => {
  const graph = servicesFaqGraph();
  assert.equal(graph["@type"], "FAQPage");
  assert.equal(graph.mainEntity.length, quoteFaqs.length);
  assert.equal(graph.mainEntity[0].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
});
