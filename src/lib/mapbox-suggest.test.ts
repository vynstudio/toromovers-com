import assert from "node:assert/strict";
import test from "node:test";
import {
  resetMapboxRefererCache,
  suggestMapboxAddresses,
} from "./mapbox-suggest.ts";

const feature = {
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

test("suggestMapboxAddresses retries with the allowlisted legacy origin", async () => {
  resetMapboxRefererCache();
  const prev = process.env.MAPBOX_ACCESS_TOKEN;
  process.env.MAPBOX_ACCESS_TOKEN = "pk.test";
  const referers: string[] = [];
  const original = globalThis.fetch;
  globalThis.fetch = (async (_url, init) => {
    const referer = new Headers(init?.headers).get("referer") || "";
    referers.push(referer);
    if (referer.includes("toromovers.com")) {
      return new Response(JSON.stringify({ message: "Forbidden" }), {
        status: 403,
      });
    }
    return new Response(JSON.stringify({ features: [feature] }), {
      status: 200,
    });
  }) as typeof fetch;
  try {
    const places = await suggestMapboxAddresses("1305 Morgan Stanley");
    assert.equal(
      places[0]?.line,
      "1305 Morgan Stanley Ave, Winter Park, FL 32789",
    );
    assert.equal(places[0]?.placeId, "address.winter-park");
    assert.ok(referers.some((item) => item.includes("toromovers.net")));
    assert.equal(referers[0]?.includes("toromovers.com"), true);
  } finally {
    globalThis.fetch = original;
    resetMapboxRefererCache();
    if (prev === undefined) delete process.env.MAPBOX_ACCESS_TOKEN;
    else process.env.MAPBOX_ACCESS_TOKEN = prev;
  }
});
