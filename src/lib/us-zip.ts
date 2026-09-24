/** US ZIP or optional ZIP+4. Lead payload already stores this as origin/destination. */
export const US_ZIP_RE = /^\d{5}(?:-\d{4})?$/;

export const QUOTE_ZIP_ERROR =
  "Enter a valid US ZIP for pickup and drop-off (5 digits, or ZIP+4).";

export function isUsZip(value: string): boolean {
  return US_ZIP_RE.test(value.trim());
}

/**
 * Keep a ZIP field numeric. A pasted street line keeps the last ZIP or ZIP+4
 * so an old full address does not get mashed into the street number.
 */
export function formatUsZip(raw: string): string {
  if (/^[\d\s-]*$/.test(raw)) {
    return formatZipDigits(raw.replace(/\D/g, ""));
  }
  const matches = [...raw.matchAll(/\b(\d{5})(?:-(\d{4}))?\b/g)];
  const last = matches.at(-1);
  if (last) return last[2] ? `${last[1]}-${last[2]}` : last[1];
  return formatZipDigits(raw.replace(/\D/g, ""));
}

function formatZipDigits(digits: string): string {
  const zip = digits.slice(0, 9);
  if (zip.length <= 5) return zip;
  return `${zip.slice(0, 5)}-${zip.slice(5)}`;
}

export function quoteZipError(pickup: string, dropoff: string): string | null {
  const pickupOk = isUsZip(pickup);
  const dropoffOk = isUsZip(dropoff);
  if (pickupOk && dropoffOk) return null;
  if (!pickupOk && !dropoffOk) return QUOTE_ZIP_ERROR;
  if (!pickupOk) return "Enter a valid pickup ZIP (5 digits, or ZIP+4).";
  return "Enter a valid drop-off ZIP (5 digits, or ZIP+4).";
}
