import assert from "node:assert/strict";
import test from "node:test";
import {
  LP_DESCRIPTION,
  LP_H1,
  LP_LEDE,
  LP_PATH,
  LP_ROBOTS,
  LP_SERVICES,
  LP_TITLE,
  lpFaqGraph,
} from "./lp-local-page.ts";
import { QUOTE_RATE_ANSWER } from "./quote-faqs.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

test("local movers landing keeps noindex and price-free heads", () => {
  assert.equal(LP_PATH, "/lp/local-movers");
  assert.deepEqual(LP_ROBOTS, { index: false, follow: false });
  assert.equal(LP_TITLE, "Local Movers in Central Florida | Free Quote");
  assert.match(LP_H1, /Central Florida movers/i);
  assert.match(LP_H1, /free quote/i);
  const visible = [LP_TITLE, LP_DESCRIPTION, LP_H1, LP_LEDE, ...LP_SERVICES];
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|our own truck|rush fee/i);
  }
});

test("landing FAQ JSON-LD holds the only rate sentence", () => {
  const graph = lpFaqGraph();
  assert.equal(graph["@type"], "FAQPage");
  assert.equal(graph.mainEntity[0].acceptedAnswer.text, RATE);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  assert.equal(JSON.stringify(graph).split("$95").length - 1, 1);
});
