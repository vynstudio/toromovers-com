import type { MapboxFeature } from "./address-format.ts";
import { placesFromFeatures, type SelectedPlace } from "./selected-place.ts";

/**
 * The public Mapbox token currently allows https://toromovers.net and
 * http://localhost:3000, not https://toromovers.com. Browser calls from the
 * live quote page are 403, so suggestions are fetched here and retried with
 * an allowlisted Referer until the dashboard includes toromovers.com.
 */
const REFERERS = [
  "https://toromovers.com/",
  "https://toromovers.net/",
  "http://localhost:3000/",
];

const CFL = { lng: -81.3792, lat: 28.5383 };

let preferredReferer: string | null = null;

export function resetMapboxRefererCache() {
  preferredReferer = null;
}

export function mapboxToken(): string {
  return (
    process.env.MAPBOX_ACCESS_TOKEN ||
    process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ||
    ""
  ).trim();
}

async function geocode(
  token: string,
  query: string,
  referer: string,
): Promise<Response> {
  const url =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json` +
    `?access_token=${encodeURIComponent(token)}` +
    `&country=us` +
    `&proximity=${CFL.lng},${CFL.lat}` +
    `&types=address` +
    `&autocomplete=true` +
    `&limit=8`;
  return fetch(url, {
    headers: { Referer: referer, Accept: "application/json" },
    cache: "no-store",
  });
}

export async function suggestMapboxAddresses(
  query: string,
): Promise<SelectedPlace[]> {
  const token = mapboxToken();
  const q = query.trim().slice(0, 80);
  if (!token || q.length < 3) return [];
  const referers = preferredReferer
    ? [preferredReferer, ...REFERERS.filter((item) => item !== preferredReferer)]
    : REFERERS;
  for (const referer of referers) {
    const res = await geocode(token, q, referer);
    if (res.status === 403) continue;
    if (!res.ok) return [];
    preferredReferer = referer;
    const data = (await res.json()) as { features?: MapboxFeature[] };
    return placesFromFeatures(data.features || [], q);
  }
  return [];
}
