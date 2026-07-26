// Lead form model — mirrors toromovers.net lead-capture-agent (English).
// No rates or hour estimates — owner quotes on the call.

export type ServiceKind = "full-service" | "labor" | "not-sure";
export type HomeSize = "studio-1br" | "2br" | "3br+" | "office" | "";

export type LeadPhase =
  | "capture"
  | "service"
  | "fromZip"
  | "toZip"
  | "size"
  | "when"
  | "done";

export type ActivePhase = Exclude<LeadPhase, "done">;

export const PHASE_ORDER: ActivePhase[] = [
  "capture",
  "service",
  "fromZip",
  "toZip",
  "size",
  "when",
];

export const ADVANCE_MS = 200;

export const SERVICE_OPTS: {
  id: ServiceKind;
  label: string;
  hint: string;
}[] = [
  {
    id: "full-service",
    label: "Full-service with movers & truck",
    hint: "Truck + crew · load, move & place",
  },
  {
    id: "labor",
    label: "Labor only",
    hint: "You have a truck, U-Haul, or POD",
  },
  {
    id: "not-sure",
    label: "Other / not sure yet",
    hint: "We'll help you pick the right option",
  },
];

export const SERVICE_LABELS: Record<ServiceKind, string> = {
  "full-service": "Full-service (truck + crew)",
  labor: "Labor-only (you have a truck)",
  "not-sure": "Not sure yet",
};

export const SIZE_OPTS: { id: Exclude<HomeSize, "">; label: string }[] = [
  { id: "studio-1br", label: "Studio / 1 bedroom" },
  { id: "2br", label: "2 bedrooms" },
  { id: "3br+", label: "3+ bedrooms" },
  { id: "office", label: "Office / storage" },
];

export const HOME_SIZE_LABELS: Record<Exclude<HomeSize, "">, string> = {
  "studio-1br": "Studio / 1BR",
  "2br": "2 bedrooms",
  "3br+": "3+ bedrooms",
  office: "Office / storage",
};

export const WHEN_OPTS = [
  { id: "asap", label: "As soon as possible", hot: true },
  { id: "this-week", label: "This week", hot: true },
  { id: "next-2-weeks", label: "Next 2 weeks", hot: false },
  { id: "flexible", label: "I'm flexible", hot: false },
] as const;

export const OPEN_LEAD_EVENT = "toro-open-lead";

export type OpenLeadDetail = {
  source?: string;
  serviceType?: string;
};

export function formatPhone(raw: string) {
  const d = String(raw || "")
    .replace(/\D/g, "")
    .slice(0, 10);
  if (d.length > 6) return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length > 3) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  if (d.length > 0) return `(${d}`;
  return "";
}

export function digits(raw: string) {
  return String(raw || "").replace(/\D/g, "");
}

/** Dispatch site-wide open lead modal. */
export function openLeadModal(detail?: OpenLeadDetail) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(OPEN_LEAD_EVENT, { detail: detail || { source: "site-cta" } }),
  );
}
