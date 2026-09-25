import assert from "node:assert/strict";
import test from "node:test";
import { customerProof, hero } from "./content.ts";
import {
  allCityPages,
  citiesByCounty,
  getCityPage,
  nearbyCityPages,
  serviceCityPages,
} from "./city-pages.ts";
import { blogPosts } from "./blog.ts";
import { servicesHub } from "./services-hub.ts";
import { SITE_DESCRIPTION, SITE_TITLE } from "./site.ts";
import { loadingUnloadingPage } from "./loading-unloading-page.ts";

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
    assert.deepEqual(
      city.services.map((s) => [s.illustration, s.href]),
      [
        ["local", "/full-service-moving"],
        ["labor-only", "/labor-only-moving"],
        ["apartment", "/apartment-movers-orlando-fl"],
      ],
    );
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

  assert.equal(
    SITE_TITLE,
    "Trusted Orlando & Central Florida movers",
  );
  assert.equal(
    SITE_DESCRIPTION,
    "Toro Movers is a family-owned, bilingual Orlando moving company with upfront hourly rates and no hidden fees. Call or text (689) 600-2720.",
  );
  assert.equal(hero.h1, "Trusted Orlando & Central Florida movers");
  assert.equal(
    hero.lede,
    "Home, apartment, townhome, condo, and office moves — plus storage, POD, and U-Haul load & unload. Local and long-distance across Orlando and Central Florida. Family-owned, bilingual, with upfront hourly rates and no hidden fees.",
  );
  assert.doesNotMatch(hero.lede, /600-2720/);
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
  assert.equal(cf.why.h2, "Central Florida and beyond");
  assert.doesNotMatch(cf.about.body, /surrounding city/i);
  assert.match(cf.about.body, /home base/i);
  assert.doesNotMatch(cf.faqs.map((item) => item.a).join(" "), /surrounding city/i);
  assert.equal(cf.closing.title, "Request a Central Florida moving estimate");
});

test("hub links every city and each city links nearby pages", () => {
  const cities = serviceCityPages();
  assert.equal(cities.length, 31);
  assert.ok(getCityPage("lake-nona-movers"));
  assert.ok(getCityPage("dr-phillips-movers"));
  assert.equal(getCityPage("winter-springs-movers")?.county, "Seminole County");
  assert.equal(getCityPage("deltona-movers")?.county, "Volusia County");
  assert.equal(getCityPage("horizon-west-movers")?.county, "Orange County");

  const linked = citiesByCounty().flatMap((group) => group.cities.map((city) => city.slug));
  assert.deepEqual(new Set(linked), new Set(cities.map((city) => city.slug)));
  assert.ok(cities.every((city) => city.county.length > 0));

  const mentioned = new Set<string>();
  for (const city of cities) {
    const nearby = nearbyCityPages(city.slug);
    assert.ok(nearby.length >= 4 && nearby.length <= 8, city.slug);
    assert.ok(nearby.every((item) => item.slug !== city.slug));
    for (const item of nearby) mentioned.add(item.slug);
  }
  assert.ok(mentioned.has("lake-nona-movers"));
  assert.ok(mentioned.has("dr-phillips-movers"));
  assert.ok(mentioned.has("winter-springs-movers"));
  assert.ok(mentioned.has("deltona-movers"));
  assert.ok(mentioned.has("horizon-west-movers"));
  for (const city of cities) {
    assert.ok(mentioned.has(city.slug), city.slug);
  }
});

test("service and blog art is explicit, not index-cycled", () => {
  assert.deepEqual(
    servicesHub.primary.map((item) => [item.title, item.illustration]),
    [
      ["Full-service local", "local"],
      ["Labor-only", "labor-only"],
      ["Apartment movers", "apartment"],
    ],
  );
  assert.deepEqual(
    servicesHub.secondary.map((item) => [item.title, item.illustration, item.href]),
    [
      ["Loading & unloading", "loading", "/loading-unloading"],
      ["Recent moves", "packing", "/orlando-movers-gallery"],
      ["Central Florida coverage", "long-distance", "/central-florida-movers"],
      ["Packing services", "packing", "/packing-services-orlando"],
      ["Office movers", "office", "/office-movers-orlando"],
      ["Same-day movers", "access", "/same-day-movers-orlando"],
      ["Small moves", "crew", "/small-moves-orlando"],
      ["POD & U-Haul loading", "labor-only", "/pod-loading-orlando"],
    ],
  );
  const primaryKeys = servicesHub.primary.map((item) => item.illustration);
  assert.equal(new Set(primaryKeys).size, primaryKeys.length);
  assert.ok(
    [...servicesHub.primary, ...servicesHub.secondary].every(
      (item) => item.illustration.length > 0,
    ),
  );

  const bySlug = Object.fromEntries(
    blogPosts.map((post) => [post.slug, post.illustration]),
  );
  assert.equal(bySlug["choose-family-owned-bilingual-movers-orlando"], "local");
  assert.equal(bySlug["orlando-office-small-commercial-movers"], "office");
  assert.equal(bySlug["orlando-apartment-high-rise-movers"], "apartment");
  assert.equal(bySlug["uhaul-pod-loading-help-orlando"], "loading");
  assert.equal(bySlug["orlando-local-vs-long-distance-movers"], "long-distance");
  assert.equal(bySlug["orlando-pod-uhaul-storage-loading"], "labor-only");
  assert.ok(blogPosts.every((post) => post.illustration.length > 0));

  assert.equal(
    loadingUnloadingPage.hero.image.src,
    "/images/moves/svc-loading.webp",
  );
});
