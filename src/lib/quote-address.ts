import { haversineMiles, isSelectedStreetAddress } from "./selected-place.ts";

const QUOTE_FORMS = new Set(["ads_short_form", "local_movers_ads_landing"]);

export type QuoteStops = {
  origin: string;
  destination: string;
  originPlaceId: string;
  destinationPlaceId: string;
  originLng: number;
  originLat: number;
  destinationLng: number;
  destinationLat: number;
  distanceMiles: number;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function coord(value: unknown): number | null {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function inRange(lng: number, lat: number): boolean {
  return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

/** Quote forms must submit a picked Mapbox address for both stops. */
export function quoteStops(
  source: string,
  details: Record<string, unknown> | null,
): { required: boolean; stops: QuoteStops | null } {
  const required = QUOTE_FORMS.has(source);
  if (!details) return { required, stops: null };
  const origin = str(details.origin);
  const destination = str(details.destination);
  const originLng = coord(details.origin_lng);
  const originLat = coord(details.origin_lat);
  const destinationLng = coord(details.destination_lng);
  const destinationLat = coord(details.destination_lat);
  const originPlaceId = str(details.origin_place_id);
  const destinationPlaceId = str(details.destination_place_id);
  if (
    !isSelectedStreetAddress(origin) ||
    !isSelectedStreetAddress(destination) ||
    !originPlaceId ||
    !destinationPlaceId ||
    originLng == null ||
    originLat == null ||
    destinationLng == null ||
    destinationLat == null ||
    !inRange(originLng, originLat) ||
    !inRange(destinationLng, destinationLat)
  ) {
    return { required, stops: null };
  }
  return {
    required,
    stops: {
      origin,
      destination,
      originPlaceId,
      destinationPlaceId,
      originLng,
      originLat,
      destinationLng,
      destinationLat,
      distanceMiles: haversineMiles(
        { lng: originLng, lat: originLat },
        { lng: destinationLng, lat: destinationLat },
      ),
    },
  };
}
