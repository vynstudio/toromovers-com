import { haversineMiles, isSelectedStreetAddress } from "./selected-place.ts";

const QUOTE_FORMS = new Set(["ads_short_form", "local_movers_ads_landing"]);

export type QuoteStops = {
  origin: string;
  /** Free text when no suggestion was picked. Can be empty. */
  destination: string;
  originPlaceId: string;
  /** Only set when the drop-off was picked from the suggestions. */
  destinationPlaceId?: string;
  originLng: number;
  originLat: number;
  destinationLng?: number;
  destinationLat?: number;
  /** Only set when both stops have coordinates. */
  distanceMiles?: number;
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

/**
 * Quote forms must submit a picked Mapbox street address for the pickup.
 * The drop-off is flexible: a picked suggestion adds coordinates and the
 * distance, but free text (or nothing) is accepted so the lead is never lost.
 */
export function quoteStops(
  source: string,
  details: Record<string, unknown> | null,
): { required: boolean; stops: QuoteStops | null } {
  const required = QUOTE_FORMS.has(source);
  if (!details) return { required, stops: null };
  const origin = str(details.origin);
  const destination = str(details.destination).slice(0, 200);
  const originLng = coord(details.origin_lng);
  const originLat = coord(details.origin_lat);
  const destinationLng = coord(details.destination_lng);
  const destinationLat = coord(details.destination_lat);
  const originPlaceId = str(details.origin_place_id);
  const destinationPlaceId = str(details.destination_place_id);
  if (
    !isSelectedStreetAddress(origin) ||
    !originPlaceId ||
    originLng == null ||
    originLat == null ||
    !inRange(originLng, originLat)
  ) {
    return { required, stops: null };
  }
  const stops: QuoteStops = {
    origin,
    destination,
    originPlaceId,
    originLng,
    originLat,
  };
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
    stops.distanceMiles = haversineMiles(
      { lng: originLng, lat: originLat },
      { lng: destinationLng, lat: destinationLat },
    );
  }
  return { required, stops };
}
