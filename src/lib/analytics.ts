import { consentGranted } from "@/lib/tracking-consent";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackFunnelEvent(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
  if (!consentGranted("analytics")) return;
  try {
    window.gtag?.("event", event, data);
  } catch {
    /* tag not ready */
  }
}
