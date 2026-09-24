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

test("quote forms require a selected street address and coordinates", () => {
  const ok = quoteStops("ads_short_form", details);
  assert.equal(ok.required, true);
  assert.equal(ok.stops?.origin, details.origin);
  assert.ok((ok.stops?.distanceMiles || 0) > 1);
  assert.ok((ok.stops?.distanceMiles || 0) < 20);

  const partial = quoteStops("ads_short_form", {
    ...details,
    origin: "5934 Abigail",
  });
  assert.equal(partial.stops, null);

  const callback = quoteStops("homepage_callback", null);
  assert.equal(callback.required, false);
  assert.equal(callback.stops, null);
});
