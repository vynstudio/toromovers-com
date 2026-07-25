# Toro Movers — toromovers.com source handoff

**Last updated:** 2026-07-25  
**Domain:** https://toromovers.com (custom domain configured; DNS may still be propagating)  
**Staging / Netlify:** https://toromovers-com.netlify.app  
**GitHub:** https://github.com/vynstudio/toromovers-com (private)  
**Local path:** `/Users/vynstudio/toromovers-com`  
**Not related to:** `toromovers.net` / `toromovers-site` (separate repo & Netlify project)

---

## Framework & stack

| Layer | Choice |
|--------|--------|
| Framework | **Next.js 16** (App Router) |
| UI | **React 19** + **TypeScript** |
| Styling | **Tailwind CSS v4** via `@tailwindcss/postcss` + global CSS tokens in `src/app/globals.css` |
| Deploy | **Netlify** + `@netlify/plugin-nextjs` |
| Node | 20 (set in `netlify.toml`) |
| Forms | None yet — conversion is `tel:` + anchor CTAs (`#quote`) |
| CMS | None — copy lives in `src/lib/content.ts` |

There is **no** WordPress, Webflow export, or plain multi-page HTML app.  
There is **no** separate `tailwind.config.js` — Tailwind v4 is configured through PostCSS + CSS `@theme` in `globals.css`.

---

## URLs

| Purpose | URL |
|---------|-----|
| Production (intended) | https://toromovers.com |
| Staging / always works | https://toromovers-com.netlify.app |
| Netlify admin | https://app.netlify.com/projects/toromovers-com |
| GitHub | https://github.com/vynstudio/toromovers-com |
| Site ID | `7b7a56de-fba2-4228-a704-3a583cf0849b` |

---

## Run locally

```bash
git clone https://github.com/vynstudio/toromovers-com.git
cd toromovers-com
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build   # production build
npm run start   # serve production build
```

---

## Deploy

```bash
# Linked Netlify project: toromovers-com
netlify deploy --build --prod
```

Or push to `main` once GitHub ↔ Netlify continuous deploy is fully wired with the GitHub App installation for the org.

`netlify.toml`:

- Build: `npm run build`
- Publish: `.next` (handled by Next runtime plugin)
- Env: `NEXT_PUBLIC_SITE_URL=https://toromovers.com`
- Redirect: `www.toromovers.com` → apex 301

---

## Source map (implementation-critical)

### App shell & pages

| File | Role |
|------|------|
| `src/app/layout.tsx` | Root layout, fonts (Inter), viewport meta, SEO metadata, org JSON-LD |
| `src/app/page.tsx` | Homepage composition (section order) |
| `src/app/globals.css` | **Global design system** — tokens, containers, fluid type, mobile-first breakpoints, buttons, tap targets |
| `src/app/privacy/page.tsx` | Privacy |
| `src/app/terms/page.tsx` | Terms |
| `src/app/robots.ts` | robots.txt (incl. AI crawlers) |
| `src/app/sitemap.ts` | sitemap.xml |

### Layout / conversion components

| File | Role |
|------|------|
| `src/components/Nav.tsx` | Header / pill nav (mobile Call now; desktop links + quote) |
| `src/components/Hero.tsx` | Hero card + dual CTAs (Call + Quote) + image |
| `src/components/TrustBar.tsx` | Trust strip under hero |
| `src/components/FeatureGrid.tsx` | Services (6 items) |
| `src/components/Process.tsx` | How it works (3 steps) |
| `src/components/FeatureAlternating.tsx` | Lifestyle feature blocks |
| `src/components/Integrations.tsx` | Coordination section + CTA |
| `src/components/WhyBanner.tsx` | Full-bleed “Why Toro” |
| `src/components/DesignedForLife.tsx` | Full-bleed lifestyle |
| `src/components/SplitStories.tsx` | Two stacked story bands |
| `src/components/Testimonial.tsx` | Quote block |
| `src/components/Faq.tsx` | FAQ (AEO) |
| `src/components/Areas.tsx` | Service area blurb |
| `src/components/ClosingCta.tsx` | Dark final CTA `#quote` |
| `src/components/Footer.tsx` | Footer / legal / social / phone |
| `src/components/StickyCta.tsx` | **Client** sticky mobile Call + Quote bar |
| `src/components/Container.tsx` | Optional fluid container helper |
| `src/components/icons.tsx` | SVG icons |

### Content & SEO data

| File | Role |
|------|------|
| `src/lib/content.ts` | All homepage copy (nav, hero, features, FAQ, process, etc.) |
| `src/lib/site.ts` | Phone, email, ratings, URLs, social |
| `src/lib/schema.ts` | JSON-LD: MovingCompany, FAQPage, HowTo, WebPage |

### Config

| File | Role |
|------|------|
| `package.json` | Dependencies & scripts |
| `next.config.ts` | Next config (images, turbopack root) |
| `postcss.config.mjs` | Tailwind v4 PostCSS |
| `tsconfig.json` | TypeScript paths (`@/*`) |
| `netlify.toml` | Build + domain redirect |
| `public/llms.txt` | AEO / LLM summary |
| `public/manifest.webmanifest` | PWA-ish manifest |
| `public/logos/*` | Brand SVGs |
| `public/images/*` | Stock / photo assets |

### JavaScript behavior

Almost all UI is **server components**. Client JS is limited to:

- `src/components/StickyCta.tsx` (`"use client"`) — scroll show/hide for sticky mobile CTA

No menu drawers, no form JS, no viewport scale hacks, no zoom/`transform: scale()` layout scripts.

---

## Design tokens (from `globals.css`)

```
--navy:        #0b1f3a
--foreground:  #0a0a0a
--background:  #ffffff
--muted:       #5c5c5c
--tap-min:     48px
--container-pad: 16px → 24px (768) → 32px (1024)
max-width:     100% mobile → 1200 / 1280 at 1024px
```

Breakpoints used: **320 (base), 390, 768, 1024, 1280**.

---

## Design handoff status

| Source | Status |
|--------|--------|
| VitaBand-style layout screenshots (desktop + mobile) | **Implemented** as the visual system (white / black / navy) |
| Responsive fix README PDF | Implemented (fluid containers, no scale hacks) |
| Mobile-first README PDF | Implemented (conversion-first order, min-width enhance) |
| Figma | **None attached** — no Figma link in project. If design exists in Figma, share link and mark frames “Ready for implementation.” |

---

## What’s not in the repo yet (future pages)

- Quote form / multi-step funnel  
- Service detail pages  
- City / service-area SEO pages  
- Blog  
- Spanish locale  
- Analytics (GTM/GA4) wiring  
- Real branded photography (currently mixed stock + prior Toro assets)

---

## GitHub access for implementers

Repo is **private** under `vynstudio`.

1. Owner (Diler / vynstudio) invites collaborator:  
   GitHub → **vynstudio/toromovers-com** → Settings → Collaborators → Add people  
2. Recommended role for implementation: **Write** (push branches + open PRs) or **Maintain** if they need merge without admin.  
3. Or add a GitHub team / deploy key as needed.

Clone:

```bash
git clone git@github.com:vynstudio/toromovers-com.git
# or
git clone https://github.com/vynstudio/toromovers-com.git
```

---

## ZIP archive

A snapshot excluding `node_modules` / `.next` / `.git` can be generated as:

```bash
cd /Users/vynstudio
zip -r Desktop/toromovers-com-source.zip toromovers-com \
  -x "toromovers-com/node_modules/*" \
  -x "toromovers-com/.next/*" \
  -x "toromovers-com/.netlify/*" \
  -x "*/.DS_Store"
```

After install: `npm install && npm run dev`.

---

## Separate from toromovers.net

| | toromovers.com | toromovers.net |
|--|----------------|----------------|
| Path | `/Users/vynstudio/toromovers-com` | `/Users/vynstudio/toromovers-site` |
| GitHub | `vynstudio/toromovers-com` | existing toromovers-site repo |
| Netlify | `toromovers-com` | production toromovers.net project |

Do not mix deploys or env vars between the two.
