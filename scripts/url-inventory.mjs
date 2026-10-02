/**
 * Build docs/migration/url-inventory.csv from the live site, sitemap,
 * repo routes, and netlify.toml redirects.
 *
 * Usage: node scripts/url-inventory.mjs
 */
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const LIVE = "https://toromovers.com";
const OUT = join(process.cwd(), "docs/migration/url-inventory.csv");

function csvCell(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

async function head(url) {
  const res = await fetch(url, { method: "GET", redirect: "manual" });
  return {
    status: res.status,
    location: res.headers.get("location") || "",
    type: res.headers.get("content-type") || "",
  };
}

const rows = new Map();
function add(row) {
  const key = row.url;
  if (!rows.has(key)) rows.set(key, row);
}

const sitemap = await (await fetch(`${LIVE}/sitemap.xml`)).text();
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const repoPaths = [
  "/",
  "/quotes",
  "/contact",
  "/services",
  "/labor-only-moving",
  "/apartment-movers-orlando-fl",
  "/full-service-moving",
  "/loading-unloading",
  "/packing-services-orlando",
  "/office-movers-orlando",
  "/same-day-movers-orlando",
  "/small-moves-orlando",
  "/pod-loading-orlando",
  "/about",
  "/careers/ops-coordinator",
  "/privacy",
  "/cookies",
  "/terms",
  "/blog",
  "/orlando-movers-gallery",
  "/lp/local-movers",
  "/move-day-checklist",
  "/thank-you",
  "/pay",
  "/pay/thanks",
  "/tip",
  "/tip/thanks",
  "/recent-moves",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/favicon.svg",
  "/favicon-32.png",
  "/apple-touch-icon.png",
  "/icon-192.png",
  "/icon-512.png",
  "/og/default.jpg",
];

for (const loc of locs) {
  const path = new URL(loc).pathname.replace(/\/$/, "") || "/";
  add({
    url: loc,
    path,
    source: "sitemap",
    kind: "page",
  });
}
for (const path of repoPaths) {
  const url = path.startsWith("http") ? path : `${LIVE}${path === "/" ? "" : path}`;
  add({
    url: path === "/" ? `${LIVE}/` : url,
    path,
    source: rows.has(path === "/" ? `${LIVE}/` : url) ? "sitemap+repo" : "repo",
    kind: "page",
  });
}

const toml = readFileSync(join(process.cwd(), "netlify.toml"), "utf8");
const redirectRe =
  /\[\[redirects\]\]\s*from = "([^"]+)"\s*to = "([^"]+)"\s*status = (\d+)/g;
for (const match of toml.matchAll(redirectRe)) {
  const [, from, to, status] = match;
  if (from.includes("://")) {
    add({
      url: from,
      path: from,
      source: "netlify-host-redirect",
      kind: "host-redirect",
      expected_status: status,
      expected_location: to,
    });
    continue;
  }
  const path = from.includes("*") ? from : from;
  add({
    url: `${LIVE}${from}`,
    path,
    source: "netlify-redirect",
    kind: "redirect",
    expected_status: status,
    expected_location: to,
  });
}

add({
  url: `${LIVE}/this-page-does-not-exist-xyz`,
  path: "/this-page-does-not-exist-xyz",
  source: "probe",
  kind: "not-found",
  expected_status: "404",
});

const apiProbes = [
  ["/api/lead", "405"],
  ["/api/pay/config", "200"],
  ["/api/pay/quote", "200"],
  ["/api/pay/status", "400"],
  ["/api/address-suggest?q=ab", "200"],
  ["/api/tip/status", "400"],
];
for (const [path, expected] of apiProbes) {
  add({
    url: `${LIVE}${path}`,
    path,
    source: "api",
    kind: "api",
    expected_status: expected,
  });
}

const pageRows = [...rows.values()].filter(
  (row) => row.kind === "page" && row.path !== "/" && !row.path.includes("*") && !row.path.includes("."),
);
for (const row of pageRows) {
  if (row.path.endsWith("/")) continue;
  add({
    url: `${LIVE}${row.path}/`,
    path: `${row.path}/`,
    source: "trailing-slash",
    kind: "trailing-slash",
    expected_status: "308",
  });
}

mkdirSync(dirname(OUT), { recursive: true });
const list = [...rows.values()];
const concurrency = 8;
let index = 0;
async function worker() {
  while (index < list.length) {
    const row = list[index++];
    if (row.kind === "host-redirect") {
      row.live_status = row.expected_status || "";
      row.live_location = row.expected_location || "";
      row.notes = "host alias; not fetched (would leave toromovers.com)";
      continue;
    }
    try {
      const result = await head(row.url);
      row.live_status = String(result.status);
      row.live_location = result.location;
      row.content_type = result.type.split(";")[0];
    } catch (error) {
      row.live_status = "ERR";
      row.live_location = "";
      row.notes = error instanceof Error ? error.message : String(error);
    }
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()));

const headers = [
  "url",
  "path",
  "source",
  "kind",
  "live_status",
  "live_location",
  "expected_status",
  "expected_location",
  "content_type",
  "notes",
];
const lines = [headers.join(",")];
for (const row of list) {
  lines.push(headers.map((key) => csvCell(row[key] || "")).join(","));
}
writeFileSync(OUT, `${lines.join("\n")}\n`);
const counts = {};
for (const row of list) counts[row.live_status] = (counts[row.live_status] || 0) + 1;
console.log(`wrote ${list.length} rows to ${OUT}`);
console.log(counts);
