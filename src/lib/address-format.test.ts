import assert from "node:assert/strict";
import test from "node:test";
import {
  addressWithUnit,
  formatMapboxAddress,
  isFullStreetAddress,
  stripCountry,
} from "./address-format.ts";

test("formatMapboxAddress keeps street, city, state, and ZIP", () => {
  const line = formatMapboxAddress({
    address: "123",
    text: "Orange Avenue",
    place_name: "123 Orange Avenue, Orlando, Florida 32801, United States",
    context: [
      { id: "postcode.1", text: "32801" },
      { id: "place.1", text: "Orlando" },
      { id: "region.1", short_code: "US-FL", text: "Florida" },
    ],
  });
  assert.equal(line, "123 Orange Avenue, Orlando, FL 32801");
  assert.equal(isFullStreetAddress(line), true);
});

test("addressWithUnit keeps city, state, and ZIP after the unit", () => {
  assert.equal(
    addressWithUnit("123 Orange Avenue, Orlando, FL 32801", "4B"),
    "123 Orange Avenue, 4B, Orlando, FL 32801",
  );
});

test("stripCountry removes a trailing country only", () => {
  assert.equal(
    stripCountry("10 Main St, Orlando, FL 32801, United States"),
    "10 Main St, Orlando, FL 32801",
  );
  assert.equal(isFullStreetAddress("Orlando, FL"), false);
});
