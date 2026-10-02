import { isUsableLocation } from "./fl-zip-cities.ts";
import { haversineMiles } from "./selected-place.ts";

// The homepage wizard checks its own stops. Only the short ads form still requires a pickup here.
const QUOTE_FORMS = new Set(["ads_short_form"]);

export type QuoteStops = {
  /** A street address, a city, or a ZIP, as picked or typed. */
  origin: string;
  /** Free text when no suggestion was picked. Can be empty. */
  destination: string;
  /** Only set when the pickup was picked from the suggestions. */
  originPlaceId?: string;
  /** Only set when the drop-off was picked from the suggestions. */
  destinationPlaceId?: string;
  originLng?: number;
  originLat?: number;
  destinationLng?: number;
  destinationLat?: number;
  /** Only set when both stops have coordinates. */
  distanceMiles?: number;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function coord(value: unknown): number | null {
  if (value == null || value === "") return null;
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

function inRange(lng: number, lat: number): boolean {
  return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
}

/**
 * Quote forms need a pickup location: a street address, a city, or a ZIP.
 * Picked suggestions add coordinates; the distance is only kept when both
 * stops have them. The drop-off can be free text or empty.
 */
export function quoteStops(
  source: string,
  details: Record<string, unknown> | null,
): { required: boolean; stops: QuoteStops | null } {
  const required = QUOTE_FORMS.has(source);
  if (!details) return { required, stops: null };
  const origin = str(details.origin).slice(0, 200);
  const destination = str(details.destination).slice(0, 200);
  if (!isUsableLocation(origin)) return { required, stops: null };
  const stops: QuoteStops = { origin, destination };
  const originLng = coord(details.origin_lng);
  const originLat = coord(details.origin_lat);
  const originPlaceId = str(details.origin_place_id);
  if (
    originPlaceId &&
    originLng != null &&
    originLat != null &&
    inRange(originLng, originLat)
  ) {
    stops.originPlaceId = originPlaceId;
    stops.originLng = originLng;
    stops.originLat = originLat;
  }
  const destinationLng = coord(details.destination_lng);
  const destinationLat = coord(details.destination_lat);
  const destinationPlaceId = str(details.destination_place_id);
  if (
    destination &&
    destinationPlaceId &&
    destinationLng != null &&
    destinationLat != null &&
    inRange(destinationLng, destinationLat)
  ) {
    stops.destinationPlaceId = destinationPlaceId;
    stops.destinationLng = destinationLng;
    stops.destinationLat = destinationLat;
  }
  if (
    stops.originLng != null &&
    stops.originLat != null &&
    stops.destinationLng != null &&
    stops.destinationLat != null
  ) {
    stops.distanceMiles = haversineMiles(
      { lng: stops.originLng, lat: stops.originLat },
      { lng: stops.destinationLng, lat: stops.destinationLat },
    );
  }
  return { required, stops };
}
