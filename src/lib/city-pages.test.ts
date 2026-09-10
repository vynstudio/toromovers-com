import assert from "node:assert/strict";
import test from "node:test";
import { allCityPages, getCityPage } from "./city-pages.ts";

test("restored city catalog has unique slugs and local copy", () => {
  const pages = allCityPages();
  assert.ok(pages.length >= 26, `expected 26+ cities, got ${pages.length}`);
  const slugs = pages.map((p) => p.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  for (const city of pages) {
    assert.equal(city.href, `/${city.slug}`);
    assert.match(city.metadata.title, new RegExp(city.name, "i"));
    assert.match(city.h1, new RegExp(city.name, "i"));
    assert.ok(city.lede.toLowerCase().includes(city.name.toLowerCase().split(" ")[0]));
    assert.ok(city.faqs.length >= 3, city.slug);
    assert.ok(city.neighborhoods.length >= 4, city.slug);
    assert.ok(city.about.body.length > 80, city.slug);
    assert.equal(city.services.every((s) => s.href === "/services"), true);
  }
  assert.ok(getCityPage("winter-park-movers"));
  assert.ok(getCityPage("kissimmee-movers"));
  assert.ok(getCityPage("ocoee-movers"));
  assert.ok(getCityPage("central-florida-movers"));
  assert.ok(getCityPage("orlando-movers"));
});
