import assert from "node:assert/strict";
import test from "node:test";
import {
  CONTACT_DESCRIPTION,
  CONTACT_DONE_HEADLINE,
  CONTACT_FORM_LEDE,
  CONTACT_H1,
  CONTACT_LEDE,
  CONTACT_OG_TITLE,
  CONTACT_PATH,
  CONTACT_TITLE,
  contactFaqGraph,
} from "./contact-page.ts";
import { QUOTE_RATE_ANSWER, quoteFaqs } from "./quote-faqs.ts";

const RATE =
  "Our rate is $95 per hour, per mover. We confirm your crew size when we quote. 2-hour minimum.";

test("contact heads and hero stay price-free and on the Orlando line", () => {
  assert.equal(CONTACT_PATH, "/contact");
  assert.equal(CONTACT_H1, "Get your Orlando moving quote");
  assert.match(CONTACT_H1, /Orlando moving quote/);
  assert.equal(CONTACT_TITLE, "Contact · Get a free quote");
  const visible = [
    CONTACT_TITLE,
    CONTACT_DESCRIPTION,
    CONTACT_OG_TITLE,
    CONTACT_H1,
    CONTACT_LEDE,
    CONTACT_FORM_LEDE,
    CONTACT_DONE_HEADLINE,
  ];
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.doesNotMatch(line, /licensed|insured|our own truck|rush fee/i);
  }
  assert.match(CONTACT_LEDE, /321-234-0510/);
  assert.match(CONTACT_DESCRIPTION, /321-234-0510/);
});

test("contact FAQ JSON-LD matches the quotes FAQ and holds the only rate", () => {
  const graph = contactFaqGraph();
  assert.equal(graph["@type"], "FAQPage");
  assert.equal(graph.mainEntity.length, quoteFaqs.length);
  assert.equal(graph.mainEntity[0].acceptedAnswer.text, QUOTE_RATE_ANSWER);
  assert.equal(QUOTE_RATE_ANSWER, RATE);
  const json = JSON.stringify(graph);
  assert.equal(json.split("$95").length - 1, 1);
});
