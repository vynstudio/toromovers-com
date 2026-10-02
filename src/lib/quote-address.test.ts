import assert from "node:assert/strict";
import test from "node:test";
import { quoteStops } from "./quote-address.ts";

const details = {
  origin: "1305 Morgan Stanley Ave, Winter Park, FL 32789",
  destination: "100 South Orange Avenue, Orlando, FL 32801",
  origin_place_id: "address.winter-park",
  destination_place_id: "address.orange",
  origin_lng: -81.366525,
  origin_lat: 28.608845,
  destination_lng: -81.379231,
  destination_lat: 28.541162,
};

test("quote forms keep a picked street address with coordinates", () => {
  const ok = quoteStops("ads_short_form", details);
  assert.equal(ok.required, true);
  assert.equal(ok.stops?.origin, details.origin);
  assert.equal(ok.stops?.originPlaceId, "address.winter-park");
  assert.ok((ok.stops?.distanceMiles || 0) > 1);
  assert.ok((ok.stops?.distanceMiles || 0) < 20);

  const callback = quoteStops("homepage_callback", null);
  assert.equal(callback.required, false);
  assert.equal(callback.stops, null);
});

const typedOnly = {
  origin_place_id: undefined,
  origin_lng: undefined,
  origin_lat: undefined,
  destination_place_id: undefined,
  destination_lng: undefined,
  destination_lat: undefined,
};

test("pickup and drop-off accept a typed ZIP, city, or street", () => {
  for (const [origin, destination] of [
    ["32789", "32801"],
    ["Winter Park, FL 32789", "Kissimmee, FL 34741"],
    ["Orlando", "Kissimmee"],
    ["5934 Abigail", ""],
  ]) {
    const quoted = quoteStops("ads_short_form", {
      ...details,
      ...typedOnly,
      origin,
      destination,
    });
    assert.equal(quoted.stops?.origin, origin, origin);
    assert.equal(quoted.stops?.destination, destination);
    assert.equal(quoted.stops?.originPlaceId, undefined);
    assert.equal(quoted.stops?.distanceMiles, undefined);
  }
});

test("distance only when both stops have coordinates", () => {
  const typedDropoff = quoteStops("ads_short_form", {
    ...details,
    destination: "Winter Park, FL 32789",
    destination_place_id: undefined,
    destination_lng: undefined,
    destination_lat: undefined,
  });
  assert.equal(typedDropoff.stops?.originPlaceId, "address.winter-park");
  assert.equal(typedDropoff.stops?.distanceMiles, undefined);

  // JSON turns a missing point into null; that is not 0,0.
  const nullPoint = quoteStops("ads_short_form", {
    ...details,
    origin: "Winter Park, FL 32789",
    origin_place_id: "zip.32789",
    origin_lng: null,
    origin_lat: null,
  });
  assert.equal(nullPoint.stops?.originLng, undefined);
  assert.equal(nullPoint.stops?.distanceMiles, undefined);
});

test("quote forms still need some pickup location", () => {
  for (const origin of ["", "  ", "1", "-"]) {
    const quoted = quoteStops("ads_short_form", { ...details, origin });
    assert.equal(quoted.stops, null, JSON.stringify(origin));
  }
});
