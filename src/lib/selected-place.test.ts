import assert from "node:assert/strict";
import test from "node:test";
import type { MapboxFeature } from "./address-format.ts";
import {
  isAreaQuery,
  isSelectedStreetAddress,
  placesFromFeatures,
} from "./selected-place.ts";

const lincoln: MapboxFeature = {
  id: "address.lincoln",
  address: "5934",
  text: "Abigail Drive",
  center: [-96.613704, 40.752724],
  context: [
    { id: "postcode.1", text: "68516" },
    { id: "place.1", text: "Lincoln" },
    { id: "region.1", short_code: "US-NE", text: "Nebraska" },
  ],
};

const apopkaStreet: MapboxFeature = {
  id: "address.apopka",
  text: "Abigail Drive",
  center: [-81.482459, 28.683051],
  context: [
    { id: "postcode.2", text: "32703" },
    { id: "place.2", text: "Apopka" },
    { id: "region.2", short_code: "US-FL", text: "Florida" },
  ],
};

const winterPark: MapboxFeature = {
  id: "address.winter-park",
  address: "1305",
  text: "Morgan Stanley Ave",
  center: [-81.366525, 28.608845],
  context: [
    { id: "postcode.3", text: "32789" },
    { id: "place.3", text: "Winter Park" },
    { id: "region.3", short_code: "US-FL", text: "Florida" },
  ],
};

test("isSelectedStreetAddress requires a picked street, city, state, and ZIP", () => {
  assert.equal(
    isSelectedStreetAddress("1305 Morgan Stanley Ave, Winter Park, FL 32789"),
    true,
  );
  assert.equal(isSelectedStreetAddress("5934 Abigail"), false);
  assert.equal(isSelectedStreetAddress("1305 Morgan Stanley"), false);
  assert.equal(isSelectedStreetAddress("Orlando, FL 32801"), false);
  assert.equal(isSelectedStreetAddress("32801"), false);
});

test("placesFromFeatures keeps an exact house and a typed number on a matching street", () => {
  const places = placesFromFeatures(
    [lincoln, apopkaStreet],
    "5934 Abigail",
  );
  assert.equal(places[0]?.line, "5934 Abigail Drive, Lincoln, NE 68516");
  assert.equal(places[0]?.placeId, "address.lincoln");
  assert.equal(places[1]?.line, "5934 Abigail Drive, Apopka, FL 32703");
  assert.equal(places[1]?.lng, -81.482459);
  assert.equal(places[1]?.lat, 28.683051);
});

test("placesFromFeatures does not invent a number for a different street", () => {
  const orange: MapboxFeature = {
    id: "address.orange",
    text: "South Orange Avenue",
    center: [-81.379231, 28.541162],
    context: [
      { id: "postcode.4", text: "32801" },
      { id: "place.4", text: "Orlando" },
      { id: "region.4", short_code: "US-FL", text: "Florida" },
    ],
  };
  assert.deepEqual(placesFromFeatures([orange], "5934 Abigail"), []);
  const picked = placesFromFeatures([winterPark], "1305 Morgan Stanley");
  assert.equal(
    picked[0]?.line,
    "1305 Morgan Stanley Ave, Winter Park, FL 32789",
  );
  assert.equal(picked[0]?.placeId, "address.winter-park");
});

const zip32801 = {
  id: "postcode.32801",
  place_type: ["postcode"],
  text: "32801",
  center: [-81.38, 28.54] as [number, number],
  context: [
    { id: "place.orlando", text: "Orlando" },
    { id: "region.fl", short_code: "US-FL", text: "Florida" },
  ],
};

const highway520 = {
  id: "address.hwy520",
  place_type: ["address"],
  address: "32801",
  text: "Florida Highway 520",
  center: [-80.875345, 28.369577] as [number, number],
  context: [
    { id: "postcode.32709", text: "32709" },
    { id: "place.christmas", text: "Christmas" },
    { id: "region.fl", short_code: "US-FL", text: "Florida" },
  ],
};

const winterParkCity = {
  id: "place.winter-park",
  place_type: ["place"],
  text: "Winter Park",
  center: [-81.339, 28.6] as [number, number],
  context: [{ id: "region.fl", short_code: "US-FL", text: "Florida" }],
};

test("a typed ZIP is not treated as a house number", () => {
  assert.deepEqual(
    placesFromFeatures([highway520, zip32801], "Orlando, FL 32801"),
    [],
  );
});

test("flexible fields suggest cities and ZIP codes first for area queries", () => {
  const places = placesFromFeatures(
    [highway520, zip32801, winterPark],
    "Orlando, FL 32801",
    { areas: true },
  );
  assert.equal(places[0]?.line, "Orlando, FL 32801");
  assert.equal(places[0]?.kind, "area");
  assert.ok(!places.some((p) => p.line.includes("Highway 520")));
  const city = placesFromFeatures([winterParkCity], "Winter Park", {
    areas: true,
  });
  assert.equal(city[0]?.line, "Winter Park, FL");
});

test("street queries still put street addresses first", () => {
  const places = placesFromFeatures(
    [zip32801, winterPark],
    "1305 Morgan Stanley",
    { areas: true },
  );
  assert.equal(places[0]?.line, "1305 Morgan Stanley Ave, Winter Park, FL 32789");
  assert.equal(places[0]?.kind, "address");
});

test("isAreaQuery spots city and ZIP only input", () => {
  assert.equal(isAreaQuery("Orlando, FL 32801"), true);
  assert.equal(isAreaQuery("32789"), true);
  assert.equal(isAreaQuery("Winter Park"), true);
  assert.equal(isAreaQuery("1 E Pine St Orlando"), false);
});

test("a bare ZIP suggests its city and drops house-number lookalikes", async () => {
  const { placesFromFeatures: places } = await import("./selected-place.ts");
  const postcode = {
    id: "postcode.109227756",
    text: "32789",
    place_type: ["postcode"],
    center: [-81.351021, 28.595943] as [number, number],
    context: [
      { id: "place.1", text: "Winter Park" },
      { id: "region.1", short_code: "US-FL", text: "Florida" },
    ],
  };
  const highway = {
    id: "address.hwy",
    address: "32789",
    text: "Florida Highway 520",
    center: [-81.0, 28.5] as [number, number],
    context: [
      { id: "postcode.2", text: "32709" },
      { id: "place.2", text: "Christmas" },
      { id: "region.2", short_code: "US-FL" },
    ],
  };
  const out = places([highway, postcode], "32789", { areas: true });
  assert.deepEqual(
    out.map((place) => place.line),
    ["Winter Park, FL 32789"],
  );
  // No Mapbox hit: the backup map still answers.
  const backup = places([], "34741", { areas: true });
  assert.equal(backup[0]?.line, "Kissimmee, FL 34741");
  assert.equal(backup[0]?.kind, "area");
  // Strict (street only) fields never get backup cities.
  assert.deepEqual(places([], "34741"), []);
});

test("city suggestions stay in Florida", async () => {
  const { placesFromFeatures: places } = await import("./selected-place.ts");
  const city = (id: string, code: string, lng: number) => ({
    id,
    text: "Winter Park",
    place_type: ["place"],
    center: [lng, 28.6] as [number, number],
    context: [{ id: "region.x", short_code: code }],
  });
  const out = places(
    [city("place.co", "US-CO", -105.78), city("place.fl", "US-FL", -81.35)],
    "Winter Park",
    { areas: true },
  );
  assert.deepEqual(out.map((place) => place.line), ["Winter Park, FL"]);
});
