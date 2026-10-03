import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { businessAreaServed, businessPostalAddress, cityPlace } from "./business-profile.ts";
import { blogPosts } from "./blog.ts";
import {
  citiesByCounty,
  getCityPage,
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
    const deep =
      path === "/packing-services-orlando" ||
      path === "/office-movers-orlando" ||
      path === "/same-day-movers-orlando";
    const min = deep ? 1000 : 800;
    const max = deep ? 2200 : 1210;
    assert.ok(words >= min && words <= max, `${path} ${words}`);
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

test("Winter Park and Oviedo stay in areaServed, links, and the sitemap", () => {
  for (const name of ["Winter Park", "Oviedo"]) {
    const city = businessAreaServed().find((area) => area.name === name);
    assert.ok(city);
    assert.equal(city["@type"], "City");
    assert.deepEqual(city, cityPlace(name));
    assert.equal(city.address.addressRegion, "FL");
    assert.equal("postalCode" in city.address, false);
    assert.equal("streetAddress" in city.address, false);
  }

  const areas = readFileSync(new URL("../components/Areas.tsx", import.meta.url), "utf8");
  const footer = readFileSync(new URL("./content.ts", import.meta.url), "utf8");
  const guides = readFileSync(new URL("./service-guides.ts", import.meta.url), "utf8");
  const loading = readFileSync(new URL("./loading-unloading-page.ts", import.meta.url), "utf8");
  const sitemap = readFileSync(new URL("./sitemap-xml.ts", import.meta.url), "utf8");
  const sitemapRoute = readFileSync(new URL("../app/sitemap.ts", import.meta.url), "utf8");
  const llms = readFileSync(new URL("../../public/llms.txt", import.meta.url), "utf8");
  const cityPage = readFileSync(new URL("../app/(cities)/[slug]/page.tsx", import.meta.url), "utf8");
  for (const href of ["/winter-park-movers", "/oviedo-movers"]) {
    for (const source of [areas, footer, guides, loading, llms]) {
      assert.ok(source.includes(href), href);
    }
  }
  assert.match(sitemap, /allCityPages\(\)/);
  assert.match(sitemapRoute, /sitemapXml\(\)/);
  assert.match(cityPage, /canonical: city\.href/);
  assert.match(cityPage, /index: true, follow: true/);
  assert.doesNotMatch(cityPage, /noindex/);

  const winterPark = getCityPage("winter-park-movers");
  const oviedo = getCityPage("oviedo-movers");
  assert.ok(winterPark);
  assert.ok(oviedo);
  assert.ok(winterPark.neighborhoods.includes("Rollins College"));
  assert.match(
    winterPark.faqs.map((item) => `${item.q} ${item.a}`).join("\n"),
    /movers near Rollins College in Winter Park/,
  );
  assert.equal(oviedo.metadata.title, "Oviedo Movers | Local Moving Company | Toro Movers");
  assert.ok(oviedo.metadata.description.length >= 120 && oviedo.metadata.description.length <= 160);
  assert.match(oviedo.metadata.description, /movers in Oviedo, FL/);
  assert.equal(oviedo.closing.title, "Request an Oviedo moving estimate before move day");
  assert.equal(winterPark.closing.title, "Request a Winter Park moving estimate before move day");
  const publicCopy = [
    winterPark.metadata.description,
    oviedo.metadata.description,
    ...winterPark.faqs.map((item) => item.a),
    ...oviedo.faqs.map((item) => item.a),
    llms,
  ].join("\n");
  assert.equal(publicCopy.includes("758-0094"), false);
  assert.equal(publicCopy.includes("32789"), false);
});

test("JSON-LD telephone is the primary line and 689 stays a contact point", () => {
  const schema = readFileSync(new URL("./schema.ts", import.meta.url), "utf8");
  const site = readFileSync(new URL("./site.ts", import.meta.url), "utf8");
  assert.equal(schema.includes('telephone: "+16896002720"'), false);
  assert.equal(schema.includes('telephone: "+13212340510"'), false);
  assert.match(schema, /telephone: PHONE_E164/);
  assert.match(schema, /telephone: PHONE_SECONDARY_E164/);
  assert.match(schema, /contactType: "customer service"/);
  assert.match(site, /PHONE_DISPLAY = "\(321\) 234-0510"/);
  assert.match(site, /PHONE_E164 = "\+13212340510"/);
  assert.match(site, /PHONE_SECONDARY_DISPLAY = "\(689\) 600-2720"/);
  assert.match(site, /PHONE_SECONDARY_E164 = "\+16896002720"/);
  assert.ok(site.indexOf("PHONE_DISPLAY") < site.indexOf("PHONE_SECONDARY_DISPLAY"));
});
