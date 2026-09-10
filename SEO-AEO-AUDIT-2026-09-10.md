# Toro Movers SEO/AEO Audit — 2026-09-10

**Repo:** `vynstudio/toromovers-com` (live: https://toromovers.com)  
**Scope:** Read-only. Audited from GitHub shallow clone (Mac checkout `machineId 574e3b1b-…` was not reachable from this subagent shell; live HTTP probes used for verification).  
**Do not confuse with** `toromovers-site` / `live-toromovers`.

---

## Executive summary

Highest-impact issues: (1) many footer / services / gallery links point at **engine proxy URLs that 404** because `live-toro-site.netlify.app` is now the **same** Next app; (2) **root `alternates.canonical: "/"`** leaks onto `/thank-you` and `/lp/local-movers` (live-confirmed); (3) funnel/thank-you pages are **indexable**; (4) `/manifest.webmanifest` is force-proxied to a dead engine URL and **404s** despite a good file in `public/`. Sitemap generation code is healthy and **currently returns HTTP 200** with 41 URLs — the stale “proxy sitemap via netlify.toml” comment is outdated; intermittent 500s may still occur at the edge.

---

## Critical

| Finding | Path / evidence | One-line fix |
|---|---|---|
| Homepage + services hub + gallery cards link to dead engine money pages (`/full-service-moving`, `/labor-only-moving`, `/apartment-movers-orlando-fl`, `/residential-movers`, `/commercial-movers`, `/loading-unloading`) — live **404** on apex **and** `live-toro-site.netlify.app` | `src/lib/services-hub.ts`, `src/lib/recent-moves.ts`, `src/components/FeatureGrid.tsx`, `src/app/services/page.tsx`; `netlify.toml` self-proxies | Retarget all hrefs to live design routes (`/services`, `/orlando-movers`, `/contact` or `/get-my-price`) **and** remove/replace stale `[[redirects]]` 200-proxies to self |
| Footer Services column same dead URLs | `src/lib/content.ts` `footer.columns[0]` | Change to `/services` (or dedicated design pages when built) |
| Areas CTA `/service-areas` live **404** | `src/components/Areas.tsx` + `netlify.toml` proxy | Point to `/#areas` or `/central-florida-movers`; drop self-proxy |
| `/manifest.webmanifest` force-proxied → engine → **404**, shadows `public/manifest.webmanifest` | `netlify.toml` ~L339–343; `src/app/layout.tsx` `manifest` | Delete that redirect so Next/public file is served |
| `/thank-you` live canonical = `https://toromovers.com/` + `index, follow` | `src/app/thank-you/page.tsx` (no robots/canonical); inherits `src/app/layout.tsx` | Add `robots: { index: false, follow: false }` + `alternates.canonical: "/thank-you"` |
| `/lp/local-movers` live canonical = homepage + indexable (ads LP duplicate) | `src/app/lp/local-movers/page.tsx` | Set own canonical + prefer `noindex` (or keep index with unique canonical if intentional SEO LP) |

---

## High

| Finding | Path / evidence | One-line fix |
|---|---|---|
| Root layout hardcodes `alternates.canonical: "/"` — any page without override inherits homepage canonical | `src/app/layout.tsx` L61–63 | Remove root canonical (or set only on `src/app/page.tsx`); keep per-page `alternates.canonical` |
| `/get-my-price` is indexable (`index, follow`) — thin funnel | `src/app/get-my-price/page.tsx`; live meta | Add `robots: { index: false, follow: false }`; optionally Disallow in `robots.ts` |
| `/pay/thanks` is client-only — inherits homepage canonical + index | `src/app/pay/thanks/page.tsx` | Add a server parent `layout.tsx`/`generateMetadata` with `noindex` + `/pay/thanks` canonical |
| Dozens of `netlify.toml` 200-rewrites to `live-toro-site.netlify.app` are **self-proxies** that 404 (engine blog posts, packing, ads, bookings, move-details, thank-you-*, etc.) | `netlify.toml` L51–555; header comment already warns | Audit each proxy: delete dead ones; 301 legacy URLs to design equivalents; only keep rewrites if a **separate** engine host still exists |
| Gallery/filter chips + shot cards mass-link to 404 service URLs | `src/lib/recent-moves.ts` (~40+ hrefs) | Rewrite hrefs to `/services` or `/orlando-movers` |
| Legacy engine blog URLs still proxied but 404 (e.g. `/blog/hidden-moving-fees-orlando`) | `netlify.toml` blog block; live 404 | 301 those slugs to `/blog` or matching design posts; remove dead proxies |
| `/move-details` live 404 (proxied) | `netlify.toml`; known funnel path | Restore real engine host, or 301 to `/move-day-checklist` / `/get-my-price` |

---

## Medium

| Finding | Path / evidence | One-line fix |
|---|---|---|
| Sitemap includes `/recent-moves` which **307 →** `/orlando-movers-gallery` | `src/app/sitemap.ts`; `src/app/recent-moves/page.tsx` | Drop `/recent-moves` from sitemap; list only final URL |
| Sitemap includes `/pay` (transactional) | `src/app/sitemap.ts` | Remove `/pay` from sitemap; add `noindex` on pay if desired |
| `sitemap.ts` comment claims production still proxies `/sitemap.xml` via netlify — **false** (no sitemap rule in `netlify.toml`; live serves this app’s 41 URLs) | `src/app/sitemap.ts` L6–10 | Update/delete stale comment |
| Intermittent `/sitemap.xml` **500** observed via some fetchers; curl/Googlebot UA currently **200** — not a generation bug in code (imports `blogPosts` + `allCityPages` are sync/static) | Live probes | Monitor Netlify function logs; ensure no leftover edge proxy; keep `sitemap.ts` pure/no I/O |
| `robots.ts` Disallow only `/move-day-checklist` — funnels/thank-you/pay/API still crawlable | `src/app/robots.ts` | Disallow `/get-my-price`, `/thank-you`, `/pay`, `/tip`, `/lp/`, `/api/` |
| Footer “Get a quote” → `/contact` while primary CTAs use `/get-my-price` | `src/lib/content.ts` | Align to `QUOTE_PATH` (`/get-my-price`) or intentional contact-only path |
| Homepage JSON-LD `potentialAction` → `/contact`, not quote funnel | `src/lib/schema.ts` `homePageGraph` | Point `urlTemplate` to `/get-my-price` or `/contact` consistently with CTA strategy |
| Root `openGraph.url` always `SITE_URL` — pages without OG override inherit homepage OG URL | `src/app/layout.tsx` | Remove root `openGraph.url`; set per page |
| `llms.txt` “Pages” lists only `/`, privacy, terms — misses services/cities/blog | `public/llms.txt` | Expand with `/services`, `/blog`, key city URLs, `/orlando-movers-gallery` |
| `/tip` canonical is `/pay?type=tip` (query in canonical) | `src/app/tip/page.tsx` | Prefer canonical `/pay` or `/pay?type=tip` only if tip UX is distinct and indexed |

---

## Low

| Finding | Path / evidence | One-line fix |
|---|---|---|
| Instagram/X placeholders in `SOCIAL` (footer correctly hides empty paths) | `src/lib/site.ts` | Fill real handles or remove keys |
| Duplicate redirect definitions: Next `redirects()` **and** `netlify.toml` both map quote/checklist aliases | `next.config.ts`, `netlify.toml` | Prefer one layer (Netlify force:true currently wins for overlapping) |
| `DATE_MODIFIED = new Date()` in schema rebuilds “today” every request | `src/lib/schema.ts` | Use content git date or fixed publish date |
| AI crawler allows in `robots.ts` are good for AEO; no `llms.txt` link in robots | `robots.ts`, `public/llms.txt` | Optional: mention llms.txt in footer or well-known |
| No `middleware.ts` | — | N/A |

---

## Canonical strategy (verified live)

| Route | Canonical live | Notes |
|---|---|---|
| `/` | `https://toromovers.com/` | OK (`metadataBase` + `/`) |
| `/services`, `/about`, `/contact`, `/blog`, `/pay`, `/cookies`, cities | Self | OK — page overrides work |
| `/orlando-movers` | Self | OK |
| `/get-my-price` | Self | OK URL; **should noindex** |
| `/move-day-checklist` | Self + **noindex,nofollow** | OK |
| `/thank-you` | **Homepage** | Broken — inherits root |
| `/lp/local-movers` | **Homepage** | Broken — inherits root |

`metadataBase: new URL(SITE_URL)` is correct. Absolute URLs resolve properly when overrides exist.

---

## Robots / noindex audit

| Surface | Indexable? | Source |
|---|---|---|
| Root default | Yes `index,follow` | `layout.tsx` |
| `/move-day-checklist` | **No** | page metadata + `robots.txt` Disallow |
| `/get-my-price` | **Yes (bad)** | page metadata only |
| `/thank-you` | **Yes (bad)** | inherits root |
| `/lp/local-movers` | **Yes** | inherits root |
| `/pay`, `/pay/thanks` | Yes / inherits | pay has canonical; thanks no metadata |
| `/api/*` | N/A HTML | Not disallowed in robots.txt |
| Engine funnels `/move-details`, thank-you-* | **404** | netlify proxies dead |

---

## JSON-LD / AEO

**Present (good):**
- Sitewide `LocalBusiness` + `MovingCompany` + `WebSite` (`organizationGraph` in root layout)
- Homepage `WebPage` + `FAQPage` + `HowTo` + `speakable` (`homePageGraph`)
- City pages: `MovingCompany` + `WebPage` + `BreadcrumbList` + `FAQPage` + speakable
- Blog posts: Article JSON-LD
- Gallery: CollectionPage / ImageGallery-style graph
- Visible FAQ text aligned with schema (comment in `content.ts`)
- `public/llms.txt` for answer engines

**Gaps / risks:**
- `potentialAction` → `/contact` vs CTAs → `/get-my-price`
- AggregateRating/reviewCount hardcoded (`36`) — keep in sync with Google
- City `Offer.url` points at `s.href` which is often `/services` (OK) not dead engine URLs
- No FAQ schema on `/services` / `/about` / `/contact`
- Thin `llms.txt` page list

---

## Sitemap diagnosis (500)

1. **Code (`src/app/sitemap.ts`):** Pure sync function; builds core + 3 design blogs + `allCityPages()`. No async I/O; unlikely to throw.
2. **`netlify.toml`:** **No** `/sitemap.xml` proxy (comment in sitemap.ts is stale).
3. **Live now:** HTTP **200**, `application/xml`, **41** `<loc>` entries matching this file (core 11 + blogs 3 + cities 27).
4. **Intermittent 500:** Observed via alternate fetch path earlier; not reproduced with curl / Googlebot UA. Treat as edge/runtime flake or historical proxy — **not** a bad URL inside current generator.
5. **Soft issues in XML:** includes redirecting `/recent-moves` and transactional `/pay`.

**Fix:** Keep serving Next sitemap; delete stale comment; remove redirect/transactional URLs; watch Netlify logs if 500 recurs.

---

## Link inventory (key)

### Nav (`src/lib/content.ts` → `Nav.tsx`)
`/services`, `/#areas`, `/about`, `/#reviews`, `/blog`, `/contact`, CTA `QUOTE_PATH`=`/get-my-price`, `tel:`, `/`

### Footer
- Services: `/services` OK; `/residential-movers`, `/labor-only-moving`, `/loading-unloading` **404**
- Areas: `/#areas` OK; city pages OK
- Company: OK (`/recent-moves` redirects OK)
- Contact: `/contact`, `/pay` OK; “Get a quote”→`/contact` (mismatch vs funnel)

### CTAs sitewide
Phone + `/get-my-price` (Hero, StickyCta, ClosingCta, CityHero, etc.) — OK

### next.config.ts redirects
`/free-quote|/get-a-quote|/get-quote|/quote` → `/get-my-price` (301)  
`/job-size|/your-move|/movingday-checklist` → `/move-day-checklist` (301)  
Live: `/get-a-quote` → 301 `/get-my-price` OK

### netlify.toml (selected)
www/apex + brand domains OK; many **self-proxies 404** (see Critical/High).  
City aliases `/movers-orlando` → `/orlando-movers` etc. OK.

### No `_redirects` file; no `middleware.ts`

---

## Production routes & indexability

### Design app (`src/app`) — HTML pages

| Route | Live | Indexable intent | Actual |
|---|---|---|---|
| `/` | 200 | Yes | Yes |
| `/about` | 200 | Yes | Yes |
| `/services` | 200 | Yes | Yes |
| `/contact` | 200 | Yes | Yes |
| `/blog` | 200 | Yes | Yes |
| `/blog/plan-orlando-move-before-first-box` | 200 | Yes | Yes |
| `/blog/careful-furniture-handling-orlando-movers` | 200 | Yes | Yes |
| `/blog/central-florida-movers-building-access` | 200 | Yes | Yes |
| `/orlando-movers-gallery` | 200 | Yes | Yes |
| `/recent-moves` | 307→gallery | No (redirect) | Redirect |
| `/privacy` `/cookies` `/terms` | 200 | Yes (low) | Yes |
| `/pay` | 200 | Prefer no | Yes (in sitemap) |
| `/pay/thanks` | 200 | No | Yes (inherits) |
| `/tip` | 307→pay?type=tip | No | Redirect |
| `/tip/thanks` | redirect pay/thanks | No | Redirect |
| `/get-my-price` | 200 | **No** | **Yes** |
| `/thank-you` | 200 | **No** | **Yes** + wrong canonical |
| `/lp/local-movers` | 200 | Prefer no | Yes + wrong canonical |
| `/move-day-checklist` | 200 | No | **No** (good) |
| City pages (27) | 200 | Yes | Yes |
| `/robots.txt` `/sitemap.xml` | 200 | — | OK |

**City slugs (design-owned, indexable):**  
`orlando-movers`, `lake-mary-movers`, `winter-park-movers`, `kissimmee-movers`, `sanford-movers`, `clermont-movers`, `oviedo-movers`, `winter-garden-movers`, `altamonte-springs-movers`, `apopka-movers`, `st-cloud-movers`, `windermere-movers`, `maitland-movers`, `davenport-movers`, `lakeland-movers`, `winter-haven-movers`, `fern-park-movers`, `ocoee-movers`, `longwood-movers`, `casselberry-movers`, `celebration-movers`, `poinciana-movers`, `minneola-movers`, `mount-dora-movers`, `leesburg-movers`, `tavares-movers`, `central-florida-movers`

### API routes (non-indexable; should Disallow)
`/api/lead`, `/api/move-checklist`, `/api/move-checklist/upload`, `/api/pay/*`, `/api/stripe/webhook`, `/api/tip/*`

### Proxied / legacy (many **404** today)
`/service-areas`, `/full-service-moving`, `/labor-only-moving`, `/residential-movers`, `/loading-unloading`, `/apartment-movers-orlando-fl`, `/commercial-movers`, `/packing-services`, `/apartment-movers`, `/move-details`, `/book`, `/bookings`, `/intake`, engine `/blog/*` list in netlify.toml, `/thank-you-full-service`, `/thank-you-labor`, `/thank-you-checklist`, `/manifest.webmanifest` (404 due to proxy), `/ads/*`, `/es/*`, etc.

---

## Priority fix order

1. Kill self-proxies that 404; retarget footer/services/gallery hrefs to live pages.  
2. Remove root `canonical: "/"`; fix `/thank-you` + `/lp/local-movers` metadata.  
3. noindex funnels: `/get-my-price`, `/thank-you`, `/pay/thanks`, optionally `/pay` + `/lp/*`.  
4. Remove `/manifest.webmanifest` Netlify proxy.  
5. Clean sitemap (`/recent-moves`, `/pay`); refresh comment; expand `llms.txt`.  
6. Align quote CTA + schema `potentialAction` + footer “Get a quote”.

---

*End of audit.*


---

## Fixes shipped

PR branch `fix/seo-critical-high-2026-09-10` (Critical + High):

- Removed obsolete `live-toro-site.netlify.app` 200 self-proxies (service pages, blogs, `/service-areas`, `/es/*`, `/ads/*`, engine funnels, **`/manifest.webmanifest`**). Kept www/brand 301s. Verified former API proxies 404 (GET+POST); left note — `/api/lead` stays on this app.
- Added 301s: service money URLs → `/services`, areas → `/central-florida-movers`, old blogs → `/blog`, bookings → `/pay`, checklist aliases → `/move-day-checklist`.
- Retargeted footer, services hub, Areas CTA, and `recent-moves` gallery hrefs off dead URLs.
- Indexing: noindex `/thank-you`, `/lp/local-movers`, `/get-my-price`, `/pay`, `/pay/thanks`; removed root `alternates.canonical: "/"`; fixed title doubling; dropped `/pay` + `/recent-moves` from sitemap; removed placeholder Instagram/X from `SOCIAL`.
