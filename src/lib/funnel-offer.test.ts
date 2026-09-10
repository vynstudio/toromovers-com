import assert from "node:assert/strict";
import test from "node:test";
import {
  FUNNEL_ACCENT,
  FUNNEL_ACCENT_HOVER,
  FUNNEL_ACCENT_SOFT,
  FUNNEL_CTA,
  FUNNEL_FLOOR_RATE,
  FUNNEL_GOOGLE_RATING,
  FUNNEL_INK,
  FUNNEL_MOVES,
  FUNNEL_RATE_NOTE,
  FUNNEL_SLA,
  FUNNEL_TRUST_CHIPS,
} from "./funnel-offer.ts";

test("approved funnel offer copy is unchanged", () => {
  assert.equal(FUNNEL_FLOOR_RATE, "from $75/mover/hour");
  assert.equal(
    FUNNEL_RATE_NOTE,
    "2-hour minimum · no fuel surcharge · no stair fees",
  );
  assert.equal(FUNNEL_GOOGLE_RATING, "4.9★ on Google");
  assert.equal(FUNNEL_MOVES, "1,000+ local moves");
  assert.equal(FUNNEL_CTA, "Get my free moving quote");
  assert.match(FUNNEL_SLA, /15 minutes/);
  assert.doesNotMatch(FUNNEL_SLA, /shortly/i);
  assert.equal(FUNNEL_TRUST_CHIPS.filter((chip) => chip.includes("★")).length, 1);
});

test("funnel brand tokens match advisor spec", () => {
  assert.equal(FUNNEL_ACCENT, "#E20613");
  assert.equal(FUNNEL_ACCENT_HOVER, "#B80510");
  assert.equal(FUNNEL_ACCENT_SOFT, "#FCE6E8");
  assert.equal(FUNNEL_INK, "#0A0A0A");
});
