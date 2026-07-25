# toromovers.com

Professional marketing site for **Toro Movers** on the **toromovers.com** domain.

> **Separate from** [toromovers.net](https://toromovers.net) (`toromovers-site` repo). Do not mix deploys, env, or Netlify projects.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS v4
- Netlify (`@netlify/plugin-nextjs`)
- SEO: metadata, sitemap, robots, JSON-LD (`MovingCompany`)

## Design

Homepage layout mirrors the provided product-landing reference (hero pill nav, product + card, alternating features, feature grid, lifestyle banners, testimonial, dark CTA, footer). Palette: **white / black / navy**.

## Local

```bash
npm install
npm run dev
```

## Deploy

Linked Netlify site: **toromovers-com** (production domain `toromovers.com`).

```bash
netlify deploy --prod
```

## Build plan

1. ✅ Desktop homepage layout
2. ⏳ Mobile polish pass
3. ⏳ Inner pages (services, areas, quote) — page by page
