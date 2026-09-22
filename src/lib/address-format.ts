type MapboxContext = { id?: string; text?: string; short_code?: string };

export type MapboxFeature = {
  id?: string;
  place_name?: string;
  text?: string;
  address?: string;
  context?: MapboxContext[];
};

/** Street number, a city, and a 5-digit ZIP. */
export function isFullStreetAddress(value: string): boolean {
  const text = value.trim();
  return (
    text.length >= 10 &&
    /\d/.test(text) &&
    text.includes(",") &&
    /\b\d{5}(?:-\d{4})?\b/.test(text)
  );
}

/** Drop a trailing country so the saved line is street, city, state, ZIP. */
export function stripCountry(address: string): string {
  return address.replace(/,\s*(United States|USA)\s*$/i, "").trim();
}

/** Street number, street, city, state, ZIP from a Mapbox address feature. */
export function formatMapboxAddress(feature: MapboxFeature): string {
  const number = (feature.address || "").trim();
  const street = (feature.text || "").trim();
  const line1 = [number, street].filter(Boolean).join(" ");
  const ctx = feature.context || [];
  const pick = (prefix: string) =>
    ctx.find((item) => (item.id || "").startsWith(prefix));
  const city = pick("place.")?.text || pick("locality.")?.text || "";
  const region = pick("region.");
  const state =
    (region?.short_code || "").replace(/^US-/i, "") || region?.text || "";
  const zip = pick("postcode.")?.text || "";
  const tail = [city, [state, zip].filter(Boolean).join(" ")]
    .filter(Boolean)
    .join(", ");
  const built = [line1, tail].filter(Boolean).join(", ");
  if (number && city && zip) return built;
  return stripCountry(feature.place_name || built);
}
