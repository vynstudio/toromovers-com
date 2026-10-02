/**
 * Compare live toromovers.com to an Astro preview for every inventory URL.
 *
 * Usage:
 *   node scripts/parity-check.mjs --preview http://127.0.0.1:4321
 *   node scripts/parity-check.mjs --preview https://deploy-preview-N--live-toro-site.netlify.app
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

const args = process.argv.slice(2);
function arg(name, fallback) {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
}
const LIVE = arg("--live", "https://toromovers.com").replace(/\/$/, "");
const PREVIEW = arg("--preview", "http://127.0.0.1:4321").replace(/\/$/, "");
const CSV = arg("--inventory", join(process.cwd(), "docs/migration/url-inventory.csv"));
const OUT = arg("--out", join(process.cwd(), "docs/migration/parity-report.md"));

function parseCsv(text) {
  const lines = text.trimEnd().split("\n");
  const headers = splitCsv(lines[0]);
  return lines.slice(1).filter(Boolean).map((line) => {
    const cells = splitCsv(line);
    const row = {};
    headers.forEach((header, i) => {
      row[header] = cells[i] || "";
    });
    return row;
  });
}
function splitCsv(line) {
  const cells = [];
  let cur = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted && ch === '"' && line[i + 1] === '"') {
      cur += '"';
      i++;
    } else if (ch === '"') quoted = !quoted;
    else if (ch === "," && !quoted) {
      cells.push(cur);
      cur = "";
    } else cur += ch;
  }
  cells.push(cur);
  return cells;
}

function previewUrl(row) {
  if (row.kind === "host-redirect") return null;
  if (!row.url.startsWith("http")) return null;
  const url = new URL(row.url);
  return `${PREVIEW}${url.pathname}${url.search}`;
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: "manual" });
  const text = await res.text();
  return {
    status: res.status,
    location: res.headers.get("location") || "",
    text,
    type: res.headers.get("content-type") || "",
  };
}

function decode(text) {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ");
}
function norm(text) {
  return decode(text).replace(/\s+/g, " ").trim();
}

function extract(html) {
  const title = norm((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const metas = [...html.matchAll(/<meta\b([^>]*)>/gi)].map((m) => m[1]);
  function meta(attr, key) {
    const found = [];
    for (const raw of metas) {
      const attrMatch = raw.match(new RegExp(`${attr}=["']([^"']+)["']`, "i"));
      const content = raw.match(/content=["']([^"']*)["']/i);
      if (attrMatch && content && attrMatch[1].toLowerCase() === key.toLowerCase()) {
        found.push(decode(content[1]));
      }
    }
    return found;
  }
  const canonical = (
    html.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i) || [""]
  )[0];
  const canonicalHref = decode((canonical.match(/href=["']([^"']+)["']/i) || [])[1] || "");
  const hreflang = [...html.matchAll(/<link\b[^>]*rel=["']alternate["'][^>]*>/gi)]
    .map((m) => m[0])
    .filter((tag) => /hreflang=/i.test(tag))
    .map((tag) => {
      const lang = (tag.match(/hreflang=["']([^"']+)["']/i) || [])[1] || "";
      const href = (tag.match(/href=["']([^"']+)["']/i) || [])[1] || "";
      return `${lang}|${href}`;
    });
  const jsonld = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
    .map((m) => stable(JSON.parse(m[1])));
  const withoutScripts = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "");
  const headings = {};
  for (const level of ["h1", "h2", "h3"]) {
    headings[level] = [...withoutScripts.matchAll(new RegExp(`<${level}\\b[^>]*>([\\s\\S]*?)</${level}>`, "gi"))].map(
      (m) => norm(m[1].replace(/<[^>]+>/g, " ")),
    );
  }
  const body = norm(withoutScripts.replace(/<[^>]+>/g, " "));
  const links = [...withoutScripts.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
    .map((m) => m[1])
    .filter((href) => href.startsWith("/") || href.startsWith(LIVE) || href.startsWith(PREVIEW))
    .map((href) => href.replace(LIVE, "").replace(PREVIEW, ""));
  const images = [...withoutScripts.matchAll(/<img\b[^>]*>/gi)].map((m) => {
    const src = (m[0].match(/\bsrc=["']([^"']*)["']/i) || [])[1] || "";
    const alt = (m[0].match(/\balt=["']([^"']*)["']/i) || [])[1];
    return { src: assetPath(src), alt: alt ? decode(alt) : "" };
  }).filter((image) => image.src !== "fb-pixel");
  const alts = images.map((image) => image.alt);
  const srcs = images.map((image) => image.src);
  const og = {};
  for (const raw of metas) {
    const prop = raw.match(/property=["'](og:[^"']+)["']/i);
    const content = raw.match(/content=["']([^"']*)["']/i);
    if (prop && content) {
      const key = prop[1].toLowerCase();
      og[key] = og[key] ? `${og[key]} | ${decode(content[1])}` : decode(content[1]);
    }
  }
  const twitter = {};
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image"]) {
    const values = meta("name", name);
    if (values.length) twitter[name] = values.join(" | ");
  }
  return {
    title,
    description: meta("name", "description")[0] || "",
    canonical: canonicalHref,
    robots: meta("name", "robots").join(" | "),
    googlebot: meta("name", "googlebot").join(" | "),
    og,
    twitter,
    hreflang,
    jsonld,
    headings,
    body,
    links,
    alts,
    srcs,
  };
}

function assetPath(src) {
  const value = decode(src);
  try {
    const url = new URL(value, "https://toromovers.com");
    if (url.hostname === "www.facebook.com") return "fb-pixel";
    if (url.pathname === "/_next/image") {
      const inner = url.searchParams.get("url") || "";
      return inner.startsWith("/") ? inner : `/${inner}`;
    }
    return url.pathname;
  } catch {
    return value;
  }
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = stable(value[key]);
        return acc;
      }, {});
  }
  return value;
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const rows = parseCsv(readFileSync(CSV, "utf8"));
const htmlRows = rows.filter((row) => row.kind === "page" || row.kind === "not-found");
const statusRows = rows.filter((row) => row.kind !== "host-redirect");
const diffs = [];
let statusMismatches = 0;
let missing = 0;
const fieldFails = {};

const concurrency = 8;
let cursor = 0;
const results = new Array(statusRows.length);
async function worker() {
  while (cursor < statusRows.length) {
    const i = cursor++;
    const row = statusRows[i];
    const target = previewUrl(row);
    if (!target) continue;
    let preview;
    try {
      preview = await fetchText(target);
    } catch (error) {
      missing += 1;
      statusMismatches += 1;
      diffs.push(`- ${row.path}: preview fetch failed (${error instanceof Error ? error.message : error})`);
      continue;
    }
    const liveStatus = row.live_status;
    if (String(preview.status) !== String(liveStatus)) {
      statusMismatches += 1;
      diffs.push(`- ${row.path}: status live ${liveStatus} vs preview ${preview.status} (location ${preview.location})`);
    } else if (row.kind === "redirect" || row.kind === "trailing-slash" || (liveStatus.startsWith("3") && row.live_location)) {
      const liveLoc = (row.live_location || "").replace(LIVE, "");
      const prevLoc = preview.location.replace(PREVIEW, "").replace(LIVE, "");
      if (liveLoc && prevLoc && liveLoc !== prevLoc) {
        statusMismatches += 1;
        diffs.push(`- ${row.path}: location live ${liveLoc} vs preview ${prevLoc}`);
      }
    }
    results[i] = { row, preview };
  }
}

function jsonValue(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
await Promise.all(Array.from({ length: concurrency }, () => worker()));

const htmlTargets = results.filter((item) => item && (item.row.kind === "page" || item.row.kind === "not-found") && item.preview.status === 200 || (item && item.row.kind === "not-found"));
let compared = 0;
for (const item of results) {
  if (!item) continue;
  if (item.row.kind !== "page" && item.row.kind !== "not-found") continue;
  if (item.preview.status !== Number(item.row.live_status) && String(item.preview.status) !== item.row.live_status) continue;
  if (!item.preview.type.includes("html") && item.row.kind === "page" && item.row.path.includes(".")) continue;
  if (item.preview.status >= 300) continue;
  let live;
  try {
    live = await fetchText(item.row.url.startsWith("http") ? item.row.url : `${LIVE}${item.row.path}`);
  } catch {
    continue;
  }
  if (!live.type.includes("html") || !item.preview.type.includes("html")) continue;
  const a = extract(live.text);
  const b = extract(item.preview.text);
  compared += 1;
  const checks = [
    ["title", a.title, b.title],
    ["description", a.description, b.description],
    ["canonical", a.canonical.replace(LIVE, "").replace(PREVIEW, ""), b.canonical.replace(LIVE, "").replace(PREVIEW, "")],
    ["robots", a.robots, b.robots],
    ["googlebot", a.googlebot, b.googlebot],
    ["og", a.og, b.og],
    ["twitter", a.twitter, b.twitter],
    ["hreflang", a.hreflang, b.hreflang],
    ["jsonld", a.jsonld, b.jsonld],
    ["h1", a.headings.h1, b.headings.h1],
    ["h2", a.headings.h2, b.headings.h2],
    ["h3", a.headings.h3, b.headings.h3],
    ["body", a.body, b.body],
    ["links", a.links, b.links],
    ["alts", a.alts, b.alts],
    ["images", a.srcs, b.srcs],
  ];
  for (const [name, left, right] of checks) {
    if (!same(left, right)) {
      fieldFails[name] = (fieldFails[name] || 0) + 1;
      const leftText = JSON.stringify(left).slice(0, 240);
      const rightText = JSON.stringify(right).slice(0, 240);
      diffs.push(`- ${item.row.path} ${name}\n  live: ${leftText}\n  preview: ${rightText}`);
    }
  }
}

const envNotes = [];
for (const item of results) {
  if (!item) continue;
  const isText = /\.(txt|xml)$/.test(item.row.path);
  if (item.row.kind !== "api" && !isText) continue;
  if (String(item.preview.status) !== String(item.row.live_status)) continue;
  let live;
  try {
    live = await fetchText(item.row.url.startsWith("http") ? item.row.url : `${LIVE}${item.row.path}`);
  } catch {
    continue;
  }
  if (item.row.kind === "api") {
    const liveJson = live.type.includes("json");
    const previewJson = item.preview.type.includes("json");
    if (!liveJson && !previewJson) {
      if (live.text.trim() !== item.preview.text.trim()) {
        diffs.push(`- ${item.row.path} body\n  live: ${JSON.stringify(live.text.slice(0, 120))}\n  preview: ${JSON.stringify(item.preview.text.slice(0, 120))}`);
      }
      continue;
    }
    const left = jsonValue(live.text);
    const right = jsonValue(item.preview.text);
    if (!left || !right) {
      diffs.push(`- ${item.row.path} json\n  live: ${live.text.slice(0, 180)}\n  preview: ${item.preview.text.slice(0, 180)}`);
      continue;
    }
    const redact = (value) => {
      if (value && typeof value.publishableKey === "string") {
        return { ...value, publishableKey: `[len ${value.publishableKey.length}]` };
      }
      return value;
    };
    const a = redact(left);
    const b = redact(right);
    if (!same(a, b)) {
      const onlyConfigured = same({ ...a, configured: b.configured }, b) && a.configured === true && b.configured === false;
      if (onlyConfigured) {
        envNotes.push(`- ${item.row.path}: \`configured\` is false because STRIPE_SECRET_KEY is not in this runtime. The publishable key length matches live.`);
      } else {
        fieldFails.json = (fieldFails.json || 0) + 1;
        diffs.push(`- ${item.row.path} json\n  live: ${JSON.stringify(a).slice(0, 240)}\n  preview: ${JSON.stringify(b).slice(0, 240)}`);
      }
    }
    continue;
  }
  const normalizeText = (text) => text.replace(/\r\n/g, "\n").trim();
  if (normalizeText(live.text) !== normalizeText(item.preview.text)) {
    fieldFails.body = (fieldFails.body || 0) + 1;
    diffs.push(`- ${item.row.path} bytes\n  live ${live.text.length} vs preview ${item.preview.text.length}`);
  }
}

const livePages = rows.filter((row) => row.kind === "page" && row.live_status === "200").length;
const previewPages = results.filter((item) => item && item.row.kind === "page" && item.preview.status === 200).length;
const clean = diffs.length === 0 && missing === 0;
const lines = [
  "# Astro preview parity",
  "",
  `Live: ${LIVE}`,
  `Preview: ${PREVIEW}`,
  "",
  `| Check | Result |`,
  `| --- | --- |`,
  `| Inventory rows compared for status | ${statusRows.length} |`,
  `| Live HTML 200 pages in inventory | ${livePages} |`,
  `| Preview HTML 200 pages | ${previewPages} |`,
  `| Missing (fetch failed) | ${missing} |`,
  `| Status or redirect mismatches | ${statusMismatches} |`,
  `| HTML documents field-compared | ${compared} |`,
  `| Field diffs | ${Object.values(fieldFails).reduce((s, n) => s + n, 0)} |`,
  `| Clean | ${clean ? "yes" : "no"} |`,
  "",
  "## Environment notes",
  "",
  envNotes.length ? envNotes.join("\n") : "None.",
  "",
  "## Field failures",
  "",
  Object.keys(fieldFails).length
    ? Object.entries(fieldFails).map(([k, n]) => `- ${k}: ${n}`).join("\n")
    : "None.",
  "",
  "## Diffs",
  "",
  diffs.length ? diffs.slice(0, 80).join("\n") : "None.",
  "",
];
if (diffs.length > 80) lines.push(`\n… ${diffs.length - 80} more diffs omitted from this summary.\n`);
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, lines.join("\n"));
console.log(lines.slice(0, 20).join("\n"));
console.log(`wrote ${OUT}`);
if (!clean) process.exitCode = 1;
