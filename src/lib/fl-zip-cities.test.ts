import assert from "node:assert/strict";
import test from "node:test";
import {
  cityForZip,
  fallbackZipLines,
  isUsableLocation,
  isZipOnly,
  zipAreaLine,
} from "./fl-zip-cities.ts";

test("Central Florida ZIP codes map to their city", () => {
  assert.equal(cityForZip("32789"), "Winter Park");
  assert.equal(cityForZip("32801"), "Orlando");
  assert.equal(cityForZip("34741"), "Kissimmee");
  assert.equal(zipAreaLine("32789"), "Winter Park, FL 32789");
  assert.equal(zipAreaLine("99999"), "");
});

test("ZIP prefixes suggest backup city lines", () => {
  assert.deepEqual(fallbackZipLines("32789"), ["Winter Park, FL 32789"]);
  assert.ok(fallbackZipLines("3474").includes("Kissimmee, FL 34741"));
  assert.deepEqual(fallbackZipLines("32"), []);
  assert.deepEqual(fallbackZipLines("Orlando"), []);
});

test("ZIP, city, or street are usable locations", () => {
  assert.equal(isZipOnly("32789"), true);
  assert.equal(isZipOnly("32789-1234"), true);
  assert.equal(isZipOnly("Winter Park 32789"), false);
  for (const ok of ["32789", "Orlando", "Winter Park, FL", "1 E Pine St"]) {
    assert.equal(isUsableLocation(ok), true, ok);
  }
  for (const bad of ["", "1", "123", "-"]) {
    assert.equal(isUsableLocation(bad), false, bad);
  }
});
