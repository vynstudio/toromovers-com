import { trackFunnelEvent } from "@/lib/analytics";

const FUNNEL = "move_day_checklist";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

function pixel(name: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    window.fbq?.("trackCustom", name, { funnel: FUNNEL, ...data });
  } catch {
    /* */
  }
  try {
    window.gtag?.("event", name.toLowerCase(), { funnel: FUNNEL, ...data });
  } catch {
    /* */
  }
}

export function trackChecklistViewed() {
  trackFunnelEvent("checklist_page_viewed", { funnel: FUNNEL });
  pixel("ChecklistPageViewed");
}

export function trackChecklistStarted() {
  trackFunnelEvent("checklist_started", { funnel: FUNNEL });
  pixel("ChecklistStarted");
}

export function trackChecklistStep(step: number) {
  trackFunnelEvent("checklist_step_completed", { funnel: FUNNEL, step });
  pixel("ChecklistStepCompleted", { step });
}

export function trackChecklistSubmitted(id?: string) {
  trackFunnelEvent("checklist_submitted", { funnel: FUNNEL, id: id || "" });
  pixel("ChecklistSubmitted", { content_name: FUNNEL });
}

export function trackChecklistValidationError(step: number, message: string) {
  trackFunnelEvent("checklist_validation_error", {
    funnel: FUNNEL,
    step,
    message: message.slice(0, 80),
  });
  pixel("ChecklistValidationError", { step });
}
