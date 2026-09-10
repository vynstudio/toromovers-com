import { MOVES_DONE, PHONE_DISPLAY } from "./site.ts";

/**
 * Senior Marketing Advisor–approved offer copy for /get-my-price.
 * Do not invent new rates or review counts — keep these literals.
 */
export const FUNNEL_ACCENT = "#E20613";
export const FUNNEL_ACCENT_HOVER = "#B80510";
export const FUNNEL_ACCENT_SOFT = "#FCE6E8";
export const FUNNEL_INK = "#0A0A0A";

export const FUNNEL_FLOOR_RATE = "from $75/mover/hour";
export const FUNNEL_RATE_NOTE =
  "2-hour minimum · no fuel surcharge · no stair fees";
export const FUNNEL_GOOGLE_RATING = "4.9★ on Google";
export const FUNNEL_MOVES = `${MOVES_DONE} local moves`;
export const FUNNEL_FAMILY = "Family-owned";
export const FUNNEL_BILINGUAL = "Bilingual — English & Spanish";
export const FUNNEL_ESPANOL = "Se habla español";
export const FUNNEL_CTA = "Get my free moving quote";
export const FUNNEL_SLA =
  "Usually call back within 15 minutes during business hours (Mon–Sat, 7am–7pm)";
export const FUNNEL_PHONE = PHONE_DISPLAY;
export const FUNNEL_LOCAL_NOTE =
  "Local Central Florida moves only — we don’t offer long-distance or interstate.";

export const FUNNEL_TRUST_CHIPS = [
  FUNNEL_GOOGLE_RATING,
  FUNNEL_MOVES,
  FUNNEL_FAMILY,
  FUNNEL_BILINGUAL,
  FUNNEL_ESPANOL,
] as const;
