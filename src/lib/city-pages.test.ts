import assert from "node:assert/strict";
import test from "node:test";
import { customerProof, hero } from "./content.ts";
import { allCityPages, getCityPage } from "./city-pages.ts";
import { SITE_DESCRIPTION, SITE_TITLE } from "./site.ts";

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

test("homepage vs central-florida-movers copy does not cannibalize", () => {
  const cf = getCityPage("central-florida-movers");
  assert.ok(cf);

  assert.equal(SITE_TITLE, "Toro Movers | Book Orlando Movers — Full-Service & Labor-Only");
  assert.equal(
    SITE_DESCRIPTION,
    "Toro Movers helps you book full-service, labor-only, and apartment moves in Orlando. Up-front hourly rates. Call or text (689) 600-2720.",
  );
  assert.equal(hero.h1, "Book Toro Movers for Your Orlando Move");
  assert.equal(customerProof.title, "Why Orlando customers book Toro");
  assert.deepEqual(
    customerProof.regionLinks.map((l) => l.label),
    ["Central Florida movers", "region coverage"],
  );
  assert.ok(customerProof.regionLinks.every((l) => l.href === "/central-florida-movers"));

  assert.equal(cf.metadata.title, "Central Florida Movers | Local Moves Across the Region");
  assert.equal(
    cf.metadata.description,
    "Central Florida movers for local jobs in Winter Park, Kissimmee, Clermont, Sanford, Winter Garden, and nearby cities. Up-front hourly rates. Call (689) 600-2720.",
  );
  assert.equal(cf.h1, "Central Florida Movers for Local Home & Apartment Moves");
  assert.doesNotMatch(cf.metadata.title, /orlando/i);
  assert.doesNotMatch(cf.h1, /orlando/i);
  assert.notEqual(cf.why.h2, customerProof.title);
  assert.equal(cf.about.h2, "Cities we serve in Central Florida");
  assert.equal(cf.why.h2, "Local-only region moves");
  assert.equal(cf.closing.title, "Request a Central Florida moving estimate");
});
