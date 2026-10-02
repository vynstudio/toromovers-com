import assert from "node:assert/strict";
import test from "node:test";
import { SOCIAL_FOOTER_LINKS, SOCIAL_LINKS, SOCIAL_PROFILES } from "./site.ts";

test("social profiles omit an empty Yelp URL and the long Maps search link", () => {
  assert.equal(SOCIAL_LINKS.yelp, "");
  assert.deepEqual(
    SOCIAL_FOOTER_LINKS.map((item) => item.id),
    ["instagram", "facebook", "google"],
  );
  assert.deepEqual(SOCIAL_PROFILES, [
    SOCIAL_LINKS.facebook,
    SOCIAL_LINKS.instagram,
    SOCIAL_LINKS.google,
  ]);
  assert.equal(SOCIAL_PROFILES.some((url) => url.includes("google.com/maps/place")), false);
  for (const item of SOCIAL_FOOTER_LINKS) {
    assert.match(item.label, /^Toro Movers on /);
    assert.ok(item.href.startsWith("https://"));
  }
});
