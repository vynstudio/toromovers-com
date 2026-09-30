# Astro preview parity

Live: https://toromovers.com
Preview: http://127.0.0.1:4321

| Check | Result |
| --- | --- |
| Inventory rows compared for status | 246 |
| Live HTML 200 pages in inventory | 88 |
| Preview HTML 200 pages | 88 |
| Missing (fetch failed) | 0 |
| Status or redirect mismatches | 0 |
| HTML documents field-compared | 77 |
| Field diffs | 0 |
| Clean | yes |

## Environment notes

- /api/pay/config: `configured` is false because STRIPE_SECRET_KEY is not in this runtime. The publishable key length matches live.

## Field failures

None.

## Diffs

None.
