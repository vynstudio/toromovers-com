# City page conversion — queue + playbook

**Goal:** Minimum **25 dedicated city “local movers” pages**, each matching the Orlando homepage design shell, fully indexable and crawlable.

**Template pages (lock these first):**

| URL | Role | Status |
|-----|------|--------|
| `/` | Principal home (Orlando + Central Florida) | Design shell live — polish ongoing |
| `/orlando-movers` | Principal city SEO page | Design shell live — template for all cities |

---

## Inventory (today)

| Bucket | Count | Notes |
|--------|------:|-------|
| Indexable sitemap URLs | ~40 | Engine sitemap currently proxied at `/sitemap.xml` |
| Existing city pages (engine or design) | **17** | Listed in queue Phase A |
| Design-owned cities | **1** | `/orlando-movers` only |
| New cities to add for **25** | **+8** | Phase B |

Design-owned extras (not all in engine sitemap): `/orlando-movers-gallery`, `/recent-moves`, `/privacy`, `/cookies`, `/terms`.

---

## Conversion queue

### Phase 0 — Template lock (do not skip)

1. [ ] Home `/` conversion + SEO/AEO final pass  
2. [ ] `/orlando-movers` matches home shell (hero, customer proof, services, FAQ, schema)  
3. [ ] Shared components stable: `CityLanding`, `CustomerProof`, `Nav`, CTAs  
4. [ ] Playbook fields verified once on Orlando  

**Rule:** No bulk city conversion until Phase 0 is signed off.

---

### Phase A — Convert existing 16 engine cities (one URL at a time)

Priority = proximity + demand + ads + current crawl presence.

| # | URL | City | Owner today | Design status |
|--:|-----|------|-------------|---------------|
| 1 | `/orlando-movers` | Orlando | **Design** | **Live** (template) |
| 2 | `/winter-park-movers` | Winter Park | Engine | Queued |
| 3 | `/kissimmee-movers` | Kissimmee | Engine | Queued |
| 4 | `/lake-mary-movers` | Lake Mary | Engine | Queued |
| 5 | `/sanford-movers` | Sanford | Engine | Queued |
| 6 | `/altamonte-springs-movers` | Altamonte Springs | Engine | Queued |
| 7 | `/oviedo-movers` | Oviedo | Engine | Queued |
| 8 | `/winter-garden-movers` | Winter Garden | Engine | Queued |
| 9 | `/clermont-movers` | Clermont | Engine | Queued |
| 10 | `/apopka-movers` | Apopka | Engine | Queued |
| 11 | `/windermere-movers` | Windermere | Engine | Queued |
| 12 | `/maitland-movers` | Maitland | Engine | Queued |
| 13 | `/st-cloud-movers` | St. Cloud | Engine | Queued |
| 14 | `/davenport-movers` | Davenport | Engine | Queued |
| 15 | `/fern-park-movers` | Fern Park | Engine | Queued |
| 16 | `/lakeland-movers` | Lakeland | Engine | Queued |
| 17 | `/winter-haven-movers` | Winter Haven | Engine | Queued |

After #17 → **17/25** city pages on design shell.

---

### Phase B — New cities to hit **25** (+ buffer)

These already have Netlify proxy stubs pointing at the engine; create real design pages + unique copy.

| # | URL | City | Notes |
|--:|-----|------|-------|
| 18 | `/ocoee-movers` | Ocoee | West corridor |
| 19 | `/longwood-movers` | Longwood | Seminole |
| 20 | `/casselberry-movers` | Casselberry | Seminole |
| 21 | `/celebration-movers` | Celebration | Osceola / high intent |
| 22 | `/poinciana-movers` | Poinciana | South growth |
| 23 | `/minneola-movers` | Minneola | Lake County |
| 24 | `/mount-dora-movers` | Mount Dora | Lake County |
| 25 | `/leesburg-movers` | Leesburg | Lake County |
| 26 | `/tavares-movers` | Tavares | Buffer / stretch |

---

### Phase C — After cities (not city pages, still redesign)

Convert later, same shell:

- Services: full-service, labor-only, apartment, residential, commercial, loading  
- Hubs: `/central-florida-movers`, `/service-areas`  
- Blog redesign optional  

---

## One-URL playbook (every city)

Run this checklist **per URL**. Do not batch.

### 1. Content (unique SEO)

File: `src/lib/city-pages.ts` (or split modules later).

| Field | Rules |
|-------|--------|
| `slug` / `href` | Exact public path, e.g. `kissimmee-movers` |
| `name` | City name only |
| `badge` | `{City}, FL movers` |
| `metadata.title` | 50–60 chars, primary keyword first |
| `metadata.description` | 120–160 chars, phone optional |
| `h1` | Unique; city + movers intent; can mirror home pattern |
| `lede` | Answer-first, city name in first sentence |
| `about` | Local movers in {City} |
| `sections` | Full-service / labor-only / apartment / rates — each mentions city |
| `neighborhoods` | Real local areas (6–12) |
| `why` | City-specific reasons |
| `faqs` | 5–8 Qs with city name; AEO-friendly |
| `services` | Links to service URLs |
| `closing` | City CTA copy |
| `schema.lat/lng` | City center coords |

**Hard rules**

- No copy-paste Orlando paragraph with city find-replace only.  
- Mentions of stairs, apartments, HOA, lakes, tourism, etc. must fit the city.  
- Trust claims: **5★ Google rated**, **1,000+ moves** only if still true site-wide.

### 2. Route (design site owns the page)

```
src/app/{slug}/page.tsx
```

Clone `src/app/orlando-movers/page.tsx`:

- Import city content constant  
- `metadata` absolute title + description + canonical  
- `robots: { index: true, follow: true }`  
- JSON-LD via `cityPageGraph(city)`  
- Render `<CityLanding city={…} />`  

### 3. Stop proxying that URL to the engine

In `netlify.toml`, **remove or comment out** the `200` rewrite:

```toml
# BEFORE (engine):
# [[redirects]]
#   from = "/kissimmee-movers"
#   to = "https://live-toro-site.netlify.app/kissimmee-movers"
#   status = 200
#   force = true

# AFTER: no proxy — Next design app serves /kissimmee-movers
```

Comment next to Orlando pattern:

```toml
# /{slug} is served by design site. Do not proxy.
```

### 4. Sitemap + robots

When design owns a city, it **must** appear in the sitemap Google uses.

**Target (after several cities):**

- Stop proxying `/sitemap.xml` to the engine **or**  
- Merge design + engine URLs into one source of truth  

Until then, for each converted city:

1. Add URL to design `src/app/sitemap.ts`  
2. Ensure engine sitemap still lists it **or** unified sitemap replaces engine  
3. `robots.ts` allows crawl  

### 5. Internal links (no orphans)

Update on design (and engine if still live):

- Home `Areas` / service-areas chips  
- City page “other cities” block in `CityLanding`  
- Footer city list if any  
- Sibling cities: link to 4–8 nearby cities  

### 6. Deploy + verify

```bash
cd toromovers-com
npm run build
netlify deploy --build --prod
```

Live checks:

```bash
# HTML is design shell (customer-proof present)
curl -sL "https://toromovers.com/{slug}" | grep -c customer-proof

# Canonical
curl -sL "https://toromovers.com/{slug}" | grep -o 'rel="canonical"[^>]*'

# Not engine chrome only
curl -sL "https://toromovers.com/{slug}" | grep -c live-toro  # should be low / asset only
```

### 7. Index in Google Search Console

1. URL Inspection → enter `https://toromovers.com/{slug}`  
2. Request indexing  
3. Confirm sitemap includes URL  
4. After 48–72h: Coverage / Page indexing  

### 8. Mark queue status

Update `src/lib/city-queue.ts`:

```ts
status: "live-design"
```

Commit message pattern:

```
City: design shell for /{slug}

Convert {City} movers page off engine proxy; unique SEO copy + sitemap.
```

---

## Architecture (hybrid)

```
toromovers.com
├── Design (toromovers-com)  → /, /orlando-movers, converted cities, gallery, legal
└── Engine proxy (live-toro-site) → remaining cities, services, blog, funnels
```

**As each city converts:** design route wins; Netlify proxy for that path is removed.

---

## Definition of done (per city)

- [ ] Unique content in `city-pages`  
- [ ] `app/{slug}/page.tsx` live  
- [ ] Netlify proxy removed for path  
- [ ] Sitemap entry  
- [ ] Internal links  
- [ ] Schema + indexable robots  
- [ ] Mobile matches Orlando shell (hero → proof → content → CTA)  
- [ ] GSC request indexing  
- [ ] Queue status → `live-design`  

---

## Next action

1. Finish Phase 0 (home + Orlando template sign-off).  
2. Convert **#2 `/winter-park-movers`** using this playbook.  
3. Repeat one URL at a time through #25.

Machine-readable queue: `src/lib/city-queue.ts`.
