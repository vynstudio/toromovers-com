import assert from "node:assert/strict";
import test from "node:test";
import {
  SERVICE_DETAIL_OPTIONS,
  SERVICE_LABELS,
  SERVICE_OPTIONS,
  resolveServiceParam,
  serviceFromSearch,
} from "./funnel-service.ts";

test("serviceFromSearch reads Meta service aliases and defaults", () => {
  assert.equal(serviceFromSearch(""), "house_2plus_move");
  assert.equal(serviceFromSearch("?service=labor-only"), "labor_only");
  assert.equal(serviceFromSearch("?servicetype=full-service"), "full_service_move");
  assert.equal(serviceFromSearch("?service=house"), "house_2plus_move");
  assert.equal(serviceFromSearch("?service=apt"), "apartment_2plus_move");
  assert.equal(serviceFromSearch("?service=long-distance"), "long_distance_move");
  assert.equal(resolveServiceParam("interstate"), "long_distance_move");
  assert.equal(resolveServiceParam("uhaul"), "rental_truck_labor");
});

test("every service option has a label", () => {
  assert.equal(SERVICE_OPTIONS.length, 10);
  assert.equal(SERVICE_OPTIONS[0].value, "house_2plus_move");
  assert.equal(SERVICE_OPTIONS[1].value, "apartment_2plus_move");
  for (const option of SERVICE_OPTIONS) {
    assert.equal(SERVICE_LABELS[option.value], option.label);
    assert.ok(option.label.length > 2);
    assert.ok(SERVICE_DETAIL_OPTIONS[option.value].length > 0);
  }
});
