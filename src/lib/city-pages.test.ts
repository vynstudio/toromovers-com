import assert from "node:assert/strict";
import test from "node:test";
import { customerProof, hero } from "./content.ts";
import { allCityPages, getCityPage } from "./city-pages.ts";
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
  assert.equal(cf.why.h2, "Local-only region moves");
  assert.equal(cf.closing.title, "Request a Central Florida moving estimate");
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
    servicesHub.secondary.map((item) => [item.title, item.illustration]),
    [
      ["Loading & unloading", "loading"],
      ["Recent moves", "packing"],
      ["Central Florida coverage", "long-distance"],
    ],
  );
  const hubKeys = [...servicesHub.primary, ...servicesHub.secondary].map(
    (item) => item.illustration,
  );
  assert.equal(new Set(hubKeys).size, hubKeys.length);
  assert.equal((hubKeys as readonly string[]).includes("access"), false);

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
