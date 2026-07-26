// Simple lead capture — name + phone only (owner follows up by phone).

export const OPEN_LEAD_EVENT = "toro-open-lead";

export type OpenLeadDetail = {
  source?: string;
  serviceType?: string;
};

export type LeadPhase = "capture" | "done";

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
    new CustomEvent(OPEN_LEAD_EVENT, {
      detail: detail || { source: "site-cta" },
    }),
  );
}
