import assert from "node:assert/strict";
import test from "node:test";
import {
  THANKS_BACK,
  THANKS_DESCRIPTION,
  THANKS_H1,
  THANKS_HELP,
  THANKS_OG_TITLE,
  THANKS_PATH,
  THANKS_SLA,
  THANKS_TITLE,
} from "./thank-you-page.ts";

test("thank-you copy stays price-free, on the Orlando line, and dash-free", () => {
  assert.equal(THANKS_PATH, "/thank-you");
  assert.equal(THANKS_H1, "We received your quote request.");
  assert.equal(THANKS_TITLE, "Quote request received");
  const visible = [
    THANKS_TITLE,
    THANKS_DESCRIPTION,
    THANKS_OG_TITLE,
    THANKS_H1,
    THANKS_SLA,
    THANKS_HELP,
    THANKS_BACK,
  ];
  for (const line of visible) {
    assert.equal(line.includes("$"), false, line);
    assert.equal(line.includes("689"), false, line);
    assert.equal(line.includes("888"), false, line);
    assert.equal(line.includes("\u2014"), false, line);
    assert.equal(line.includes("\u2013"), false, line);
    assert.doesNotMatch(line, /licensed|insured|our own truck|rush fee/i);
  }
  assert.match(THANKS_DESCRIPTION, /321-234-0510/);
  assert.match(THANKS_SLA, /Sunday to Friday/);
});
