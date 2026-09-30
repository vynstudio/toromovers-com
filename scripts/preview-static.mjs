/**
 * Local stand-in for the Netlify preview: static files from dist/,
 * netlify.toml redirects, and the Astro SSR function for /pay and /api/*.
 */
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { pathToFileURL } from "node:url";

const root = join(process.cwd(), "dist");
const port = Number(process.env.PORT || 4321);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".woff2": "font/woff2",
};

function loadRedirects() {
  const toml = readFileSync(join(process.cwd(), "netlify.toml"), "utf8");
  const blocks = toml.split("[[redirects]]").slice(1);
  return blocks.map((block) => {
    const from = (block.match(/from = "([^"]+)"/) || [])[1];
    const to = (block.match(/to = "([^"]+)"/) || [])[1];
    const status = Number((block.match(/status = (\d+)/) || [])[1] || 301);
    const query = {};
    const section = block.split("[redirects.query]")[1];
    if (section) {
      for (const line of section.split("\n")) {
        const match = line.match(/^\s*([A-Za-z0-9_-]+)\s*=\s*"([^"]*)"/);
        if (match) query[match[1]] = match[2];
      }
    }
    return { from, to, status, query };
  }).filter((rule) => rule.from && !rule.from.includes("://"));
}

const redirects = loadRedirects();

function pathMatch(from, pathname) {
  if (!from.includes("*")) {
    if (pathname === from) return "";
    // Netlify exact rules also match one trailing slash (/recent-moves/ → gallery).
    if (from.length > 1 && pathname === `${from}/`) return "";
    return null;
  }
  if (from === "/*/") {
    if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(1, -1);
    return null;
  }
  const star = from.indexOf("*");
  const prefix = from.slice(0, star);
  if (pathname.startsWith(prefix)) return pathname.slice(prefix.length);
  if (pathname === prefix.replace(/\/$/, "")) return "";
  return null;
}

function matchRedirect(pathname, search) {
  const params = new URLSearchParams(search);
  for (const rule of redirects) {
    const splat = pathMatch(rule.from, pathname);
    if (splat == null) continue;
    const values = {};
    const required = Object.entries(rule.query || {});
    if (required.length) {
      let ok = true;
      for (const [key, pattern] of required) {
        const value = params.get(key);
        if (!value) {
          ok = false;
          break;
        }
        if (pattern.startsWith(":")) values[pattern.slice(1)] = value;
        else if (value !== pattern) {
          ok = false;
          break;
        }
      }
      if (!ok) continue;
    }
    return apply(rule, splat, search, values);
  }
  return null;
}

function apply(rule, splat, search, values = {}) {
  let location = rule.to.replaceAll(":splat", splat);
  for (const [key, value] of Object.entries(values)) {
    location = location.replaceAll(`:${key}`, value);
  }
  if (!location.startsWith("http") && !location.startsWith("/")) location = `/${location}`;
  if (!location.includes("?") && search) location += search;
  return { status: rule.status, location };
}

function fileFor(pathname) {
  const rel = pathname.replace(/^\/+/, "");
  const direct = join(root, rel);
  if (rel && existsSync(direct) && statSync(direct).isFile()) return direct;
  const index = pathname === "/" ? join(root, "index.html") : join(root, rel, "index.html");
  if (existsSync(index)) return index;
  return null;
}

let ssr;
async function ssrHandler() {
  if (!ssr) {
    const mod = await import(pathToFileURL(join(process.cwd(), ".netlify/v1/functions/ssr/ssr.mjs")).href);
    ssr = mod.default;
  }
  return ssr;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const redirect = matchRedirect(url.pathname, url.search);
  if (redirect) {
    res.writeHead(redirect.status, { location: redirect.location });
    res.end();
    return;
  }
  if (req.method === "GET" || req.method === "HEAD") {
    const file = fileFor(url.pathname);
    if (file) {
      const body = readFileSync(file);
      const type = TYPES[extname(file)] || "application/octet-stream";
      res.writeHead(200, { "content-type": type, "x-content-type-options": "nosniff" });
      res.end(req.method === "HEAD" ? undefined : body);
      return;
    }
  }
  try {
    const handler = await ssrHandler();
    const request = new Request(`http://127.0.0.1:${port}${req.url}`, {
      method: req.method,
      headers: req.headers,
      body: req.method === "GET" || req.method === "HEAD" ? undefined : await readBody(req),
    });
    const response = await handler(request, {
      cookies: { get: () => undefined, set() {}, delete() {} },
      geo: {},
      ip: "127.0.0.1",
      requestId: "local",
    });
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    const buf = Buffer.from(await response.arrayBuffer());
    res.writeHead(response.status, headers);
    res.end(buf);
  } catch (error) {
    const missing = fileFor("/404.html");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(missing ? readFileSync(missing) : "Not found");
    console.error(error);
  }
});

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

server.listen(port, "127.0.0.1", () => {
  console.log(`preview http://127.0.0.1:${port}`);
});
