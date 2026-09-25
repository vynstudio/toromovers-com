import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { businessAreaServed, businessPostalAddress } from "./business-profile.ts";
import { blogPosts } from "./blog.ts";
import {
  citiesByCounty,
  nearbyCityPages,
  serviceCityPages,
} from "./city-pages.ts";
import { serviceGuideWordCount, serviceGuides } from "./service-guides.ts";

test("every city page is linked from the hub and from a nearby block", () => {
  const cities = serviceCityPages();
  assert.equal(cities.length, 31);
  const linked = citiesByCounty().flatMap((group) => group.cities.map((city) => city.slug));
  assert.deepEqual([...linked].sort(), cities.map((city) => city.slug).sort());
  const mentioned = new Set<string>();
  for (const city of cities) {
    const nearby = nearbyCityPages(city.slug);
    assert.ok(nearby.length >= 4 && nearby.length <= 8, `${city.slug} ${nearby.length}`);
    for (const item of nearby) mentioned.add(item.slug);
  }
  for (const city of cities) {
    assert.ok(mentioned.has(city.slug), city.slug);
  }
});

test("service-area address has no street, ZIP, or geo point", () => {
  const address = businessPostalAddress();
  assert.equal(address.addressLocality, "Orlando");
  assert.equal(address.addressRegion, "FL");
  assert.equal(address.addressCountry, "US");
  assert.equal("streetAddress" in address, false);
  assert.equal("postalCode" in address, false);

  const schema = readFileSync(new URL("./schema.ts", import.meta.url), "utf8");
  const layout = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");
  for (const source of [schema, layout, site, llms]) {
    assert.equal(source.includes("32789"), false);
    assert.equal(source.includes("streetAddress"), false);
    assert.equal(source.includes("postalCode"), false);
    assert.equal(source.includes("GeoCoordinates"), false);
    assert.equal(source.includes("geo.position"), false);
  }
});

test("new service pages stay in the word range and cross-link the guides", () => {
  const expected = [
    ["/packing-services-orlando", "orlando-packing-help-movers"],
    ["/office-movers-orlando", "orlando-office-small-commercial-movers"],
    ["/same-day-movers-orlando", "orlando-same-day-movers"],
    ["/small-moves-orlando", "careful-furniture-handling-orlando-movers"],
    ["/pod-loading-orlando", "uhaul-pod-loading-help-orlando"],
  ] as const;

  assert.deepEqual(
    serviceGuides.map((page) => page.path),
    expected.map(([path]) => path),
  );

  for (const [path, blogSlug] of expected) {
    const page = serviceGuides.find((item) => item.path === path);
    assert.ok(page);
    const words = serviceGuideWordCount(page);
    assert.ok(words >= 800 && words <= 1200, `${path} ${words}`);
    assert.equal(page.hero.blogHref, `/blog/${blogSlug}`);
    assert.ok(page.metadata.description.length >= 120 && page.metadata.description.length <= 160);
    const post = blogPosts.find((item) => item.slug === blogSlug);
    assert.ok(post);
    assert.match(post.body.join("\n"), new RegExp(path));
    const copy = [
      page.hero.lede,
      ...page.sections.flatMap((section) => section.paragraphs),
      ...page.faqs.map((item) => item.a),
    ].join("\n");
    assert.doesNotMatch(copy, /USDOT|FDACS|licensed|bonded|junk removal|piano moving/i);
    assert.equal(copy.includes("32789"), false);
  }

  const footer = readFileSync(new URL("./content.ts", import.meta.url), "utf8");
  for (const [path] of expected) {
    assert.ok(footer.includes(`href: "${path}"`), path);
  }

  const storage = blogPosts.find((item) => item.slug === "orlando-pod-uhaul-storage-loading");
  assert.ok(storage);
  assert.match(storage.body.join("\n"), /\/pod-loading-orlando/);
  const pod = serviceGuides.find((item) => item.path === "/pod-loading-orlando");
  assert.ok(pod?.related?.some((link) => link.href === "/blog/orlando-pod-uhaul-storage-loading"));
  assert.ok(pod?.related?.some((link) => link.href === "/loading-unloading"));
  assert.ok(pod?.related?.some((link) => link.href === "/labor-only-moving"));

  const areas = businessAreaServed();
  assert.ok(areas.some((area) => area.name === "Volusia County"));
  assert.ok(areas.some((area) => area.name === "Deltona"));
  assert.equal(areas.some((area) => "postalCode" in area), false);
});
