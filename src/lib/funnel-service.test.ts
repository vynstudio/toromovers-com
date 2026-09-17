import assert from "node:assert/strict";
import test from "node:test";
import {
  SERVICE_LABELS,
  SERVICE_OPTIONS,
  resolveServiceParam,
  serviceFromSearch,
} from "./funnel-service.ts";

test("serviceFromSearch reads Meta service aliases and defaults", () => {
  assert.equal(serviceFromSearch(""), "full_service_move");
  assert.equal(serviceFromSearch("?service=labor-only"), "labor_only");
  assert.equal(serviceFromSearch("?servicetype=full-service"), "full_service_move");
  assert.equal(resolveServiceParam("uhaul"), "rental_truck_labor");
});

test("every service option has a label", () => {
  assert.equal(SERVICE_OPTIONS.length, 7);
  for (const option of SERVICE_OPTIONS) {
    assert.equal(SERVICE_LABELS[option.value], option.label);
    assert.ok(option.label.length > 2);
  }
});
