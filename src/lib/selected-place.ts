import type { MapboxFeature } from "./address-format.ts";

export type SelectedPlace = {
  /** Street number, street, city, state, ZIP (or city/ZIP for an area). */
  line: string;
  placeId: string;
  lng: number;
  lat: number;
  /** "address" is a full street address. "area" is a city or ZIP only. */
  kind?: "address" | "area";
};

type MapboxAreaFeature = MapboxFeature & { place_type?: string[] };

const CFL = { lng: -81.3792, lat: 28.5383 };

/** A suggestion the person actually picked: number, street, city, state, ZIP. */
export function isSelectedStreetAddress(value: string): boolean {
  const text = value.trim();
  return /^\d+\s+.+,\s*.+,\s*[A-Z]{2}\s+\d{5}(?:-\d{4})?\b/.test(text);
}

export function haversineMiles(
  a: { lng: number; lat: number },
  b: { lng: number; lat: number },
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earth = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)));
}

function queryStreetWords(query: string): string[] {
  return query
    .trim()
    .replace(/^\d+[a-zA-Z]?\s*/, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word.length >= 3);
}

function streetMatches(street: string, query: string): boolean {
  const words = queryStreetWords(query);
  if (!words.length) return false;
  const hay = street.toLowerCase();
  return words.every((word) => hay.includes(word));
}

function contextText(feature: MapboxFeature, prefix: string): string {
  return (
    (feature.context || []).find((item) => (item.id || "").startsWith(prefix))
      ?.text || ""
  ).trim();
}

function stateCode(feature: MapboxFeature): string {
  const region = (feature.context || []).find((item) =>
    (item.id || "").startsWith("region."),
  );
  return (region?.short_code || "").replace(/^US-/i, "").trim();
}

/**
 * Mapbox line for a picked suggestion. If the hit is only the street, keep a
 * typed house number when the street name matches, and use that street point
 * for distance.
 */
export function placeFromMapboxFeature(
  feature: MapboxFeature,
  query = "",
): (SelectedPlace & { exact: boolean }) | null {
  const center = feature.center;
  if (!center || center.length < 2) return null;
  const [lng, lat] = center;
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  const street = (feature.text || "").trim();
  const placeId = (feature.id || "").trim();
  if (!street || !placeId) return null;
  const typed = query.trim().match(/^(\d{1,6})\b/)?.[1] || "";
  const fromFeature = (feature.address || "").trim();
  const number =
    fromFeature || (typed && streetMatches(street, query) ? typed : "");
  if (!number) return null;
  const city = contextText(feature, "place.") || contextText(feature, "locality.");
  const state = stateCode(feature);
  const zip = (contextText(feature, "postcode.").match(/\d{5}/) || [])[0] || "";
  if (!city || !/^[A-Z]{2}$/.test(state) || !/^\d{5}$/.test(zip)) return null;
  const line = `${number} ${street}, ${city}, ${state} ${zip}`;
  if (!isSelectedStreetAddress(line)) return null;
  return {
    line,
    placeId,
    lng,
    lat,
    exact: Boolean(fromFeature && typed && fromFeature === typed),
  };
}

/** ZIP codes typed after other words, like "Orlando, FL 32801". */
function typedZips(query: string): string[] {
  const text = query.trim();
  const lead = text.match(/^\d+/)?.[0] || "";
  return (text.match(/\b\d{5}\b/g) || []).filter(
    (zip, index) => !(index === 0 && zip === lead),
  );
}

/**
 * True when the query has no leading house number, for example
 * "Orlando, FL 32801", "Winter Park" or "32789".
 */
export function isAreaQuery(query: string): boolean {
  const text = query.trim();
  if (!text) return false;
  if (/^\d{5}(?:-\d{4})?$/.test(text)) return true;
  return !/^\d{1,6}[a-zA-Z]?\s+\S/.test(text);
}

/** A city or ZIP suggestion: "Orlando, FL 32801" or "Winter Park, FL". */
export function areaFromMapboxFeature(
  feature: MapboxAreaFeature,
): (SelectedPlace & { exact: boolean }) | null {
  const types = feature.place_type || [];
  const isPostcode = types.includes("postcode");
  const isCity = types.includes("place") || types.includes("locality");
  if (!isPostcode && !isCity) return null;
  const center = feature.center;
  if (!center || center.length < 2) return null;
  const [lng, lat] = center;
  if (!Number.isFinite(lng) || !Number.isFinite(lat)) return null;
  const placeId = (feature.id || "").trim();
  const state = stateCode(feature);
  if (!placeId || !/^[A-Z]{2}$/.test(state)) return null;
  const text = (feature.text || "").trim();
  let line = "";
  if (isPostcode) {
    const zip = (text.match(/\d{5}/) || [])[0] || "";
    const city =
      contextText(feature, "place.") || contextText(feature, "locality.");
    if (!zip) return null;
    line = city ? `${city}, ${state} ${zip}` : `${state} ${zip}`;
  } else {
    if (!text) return null;
    line = `${text}, ${state}`;
  }
  return { line, placeId, lng, lat, kind: "area", exact: false };
}

/**
 * Exact house-number hits first, then nearer Central Florida streets.
 * With `areas`, city and ZIP matches are kept too (flexible fields).
 */
export function placesFromFeatures(
  features: MapboxFeature[],
  query: string,
  options: { areas?: boolean } = {},
): SelectedPlace[] {
  const zips = typedZips(query);
  const streets = features
    .map((feature) => placeFromMapboxFeature(feature, query))
    .filter((place): place is SelectedPlace & { exact: boolean } => place != null)
    // "Orlando, FL 32801" should not match house number 32801 on some highway.
    .filter((place) => {
      const number = place.line.match(/^(\d+)/)?.[1] || "";
      return !zips.includes(number);
    })
    .map((place) => ({ ...place, kind: "address" as const }));
  const areas = options.areas
    ? features
        .map((feature) => areaFromMapboxFeature(feature as MapboxAreaFeature))
        .filter(
          (place): place is SelectedPlace & { exact: boolean } => place != null,
        )
    : [];
  const areaFirst = isAreaQuery(query);
  const ranked = areaFirst ? [...areas, ...streets] : [...streets, ...areas];
  const unique = new Map<string, (typeof ranked)[number]>();
  for (const place of ranked) {
    if (!unique.has(place.line)) unique.set(place.line, place);
  }
  return [...unique.values()]
    .sort((a, b) => {
      if (a.kind !== b.kind) {
        const aFirst = areaFirst ? a.kind === "area" : a.kind === "address";
        return aFirst ? -1 : 1;
      }
      if (a.exact !== b.exact) return a.exact ? -1 : 1;
      return (
        haversineMiles(CFL, a) - haversineMiles(CFL, b)
      );
    })
    .slice(0, 6)
    .map(({ line, placeId, lng, lat, kind }) => ({
      line,
      placeId,
      lng,
      lat,
      kind,
    }));
}
