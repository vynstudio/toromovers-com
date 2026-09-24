import assert from "node:assert/strict";
import test from "node:test";
import { emptyPayload } from "./model.ts";
import {
  advanceStep,
  normalizePayload,
  parseStored,
  retreatStep,
  sectionState,
  serializeProgress,
} from "./progress.ts";

const address = "123 Orange Avenue, Orlando, FL 32801";

test("continue advances and never wraps to the intro", () => {
  assert.equal(advanceStep(1), 2);
  assert.equal(advanceStep(2), 3);
  assert.equal(advanceStep(3), 4);
  assert.equal(advanceStep(4), 4);
});

test("back goes to the previous step and only step 1 returns to the intro", () => {
  assert.deepEqual(retreatStep(3), { screen: "form", step: 2 });
  assert.deepEqual(retreatStep(2), { screen: "form", step: 1 });
  assert.deepEqual(retreatStep(1), { screen: "intro", step: 1 });
});

test("section states distinguish done, active, and upcoming", () => {
  assert.equal(sectionState([1], 1), "on");
  assert.equal(sectionState([1], 2), "done");
  assert.equal(sectionState([2, 3], 1), "upcoming");
  assert.equal(sectionState([2, 3], 2), "on");
  assert.equal(sectionState([2, 3], 3), "on");
  assert.equal(sectionState([2, 3], 4), "done");
  assert.equal(sectionState([4], 3), "upcoming");
  assert.equal(sectionState([4], 4), "on");
});

test("a saved step is restored instead of resetting to the intro", () => {
  const saved = serializeProgress({
    screen: "form",
    step: 3,
    data: { ...emptyPayload(), fullName: "Ada Lovelace", pickupAddress: address },
  });
  const progress = parseStored(saved);
  assert.equal(progress?.screen, "form");
  assert.equal(progress?.step, 3);
  assert.equal(progress?.data.fullName, "Ada Lovelace");
  assert.equal(progress?.data.pickupAddress, address);
});

test("older drafts without a step resume the form and keep answers", () => {
  const legacy = JSON.stringify({
    ...emptyPayload(),
    fullName: "Ada Lovelace",
    email: "ada@example.com",
    pickup: { propertyType: "House" },
  });
  const progress = parseStored(legacy);
  assert.equal(progress?.screen, "form");
  assert.equal(progress?.step, 1);
  assert.equal(progress?.data.fullName, "Ada Lovelace");
  assert.equal(progress?.data.pickup.propertyType, "House");
  assert.deepEqual(progress?.data.pickup.photos, {});
});

test("a partial access object cannot crash the next step", () => {
  const data = normalizePayload({ pickup: null, delivery: { floor: "Ground floor" } });
  assert.equal(data.pickup.propertyType, "");
  assert.deepEqual(data.pickup.photos, {});
  assert.equal(data.delivery.floor, "Ground floor");
  assert.deepEqual(data.delivery.photos, {});
  assert.equal(data.acks.infoAccurate, false);
});

test("an empty draft stays on the intro", () => {
  assert.equal(parseStored(JSON.stringify(emptyPayload())), null);
  assert.equal(parseStored("not-json"), null);
  assert.equal(parseStored(null), null);
});
