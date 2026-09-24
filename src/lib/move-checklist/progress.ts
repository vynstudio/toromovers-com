import { emptyAccess, emptyPayload, type MoveChecklistPayload } from "./model.ts";

/** Same key the checklist has always used. New saves include screen + step. */
export const CHECKLIST_STORAGE_KEY = "toro-move-checklist-v1";

export type ChecklistScreen = "intro" | "form" | "done";
export type ChecklistStep = 1 | 2 | 3 | 4;

export const CHECKLIST_SECTIONS = [
  { num: "01", label: "Details", hint: "Who, when, and both addresses", steps: [1] },
  { num: "02", label: "Pickup", hint: "How we get in", steps: [2] },
  { num: "03", label: "Delivery", hint: "How we get in", steps: [3] },
  { num: "04", label: "Review", hint: "Check it, then send", steps: [4] },
] as const;

export const CHECKLIST_TITLES = [
  "Confirm the stops",
  "Pickup access",
  "Delivery access",
  "Send for confirmation",
] as const;

export type SectionState = "done" | "on" | "upcoming";

export type ChecklistProgress = {
  screen: ChecklistScreen;
  step: ChecklistStep;
  data: MoveChecklistPayload;
};

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

export function clampStep(value: unknown): ChecklistStep {
  const n = typeof value === "number" ? value : Number(value);
  if (n === 2 || n === 3 || n === 4) return n;
  return 1;
}

/** Continue moves forward only. It never wraps to step 1 or the intro. */
export function advanceStep(step: ChecklistStep): ChecklistStep {
  if (step >= 4) return 4;
  return (step + 1) as ChecklistStep;
}

/** Back moves to the previous step. Step 1 returns to the intro on purpose. */
export function retreatStep(step: ChecklistStep): {
  screen: "intro" | "form";
  step: ChecklistStep;
} {
  if (step <= 1) return { screen: "intro", step: 1 };
  return { screen: "form", step: (step - 1) as ChecklistStep };
}

export function sectionState(steps: readonly number[], current: ChecklistStep): SectionState {
  const first = steps[0] ?? 1;
  const last = steps[steps.length - 1] ?? first;
  if (current > last) return "done";
  if (current >= first) return "on";
  return "upcoming";
}

export function sectionIndex(step: ChecklistStep): number {
  return clampStep(step) - 1;
}

/** Fill missing nested fields so a partial draft cannot crash the next step. */
export function normalizePayload(raw: unknown): MoveChecklistPayload {
  const base = emptyPayload();
  if (!isRecord(raw)) return base;
  const pickupRaw = isRecord(raw.pickup) ? raw.pickup : {};
  const deliveryRaw = isRecord(raw.delivery) ? raw.delivery : {};
  const pickup = { ...emptyAccess(), ...pickupRaw };
  const delivery = { ...emptyAccess(), ...deliveryRaw };
  pickup.photos = isRecord(pickupRaw.photos) ? (pickupRaw.photos as MoveChecklistPayload["pickup"]["photos"]) : {};
  delivery.photos = isRecord(deliveryRaw.photos)
    ? (deliveryRaw.photos as MoveChecklistPayload["delivery"]["photos"])
    : {};

  return {
    ...base,
    ...(raw as Partial<MoveChecklistPayload>),
    fullName: typeof raw.fullName === "string" ? raw.fullName : base.fullName,
    email: typeof raw.email === "string" ? raw.email : base.email,
    phone: typeof raw.phone === "string" ? raw.phone : base.phone,
    moveDate: typeof raw.moveDate === "string" ? raw.moveDate : base.moveDate,
    pickupAddress: typeof raw.pickupAddress === "string" ? raw.pickupAddress : base.pickupAddress,
    pickupUnit: typeof raw.pickupUnit === "string" ? raw.pickupUnit : base.pickupUnit,
    deliveryAddress: typeof raw.deliveryAddress === "string" ? raw.deliveryAddress : base.deliveryAddress,
    deliveryUnit: typeof raw.deliveryUnit === "string" ? raw.deliveryUnit : base.deliveryUnit,
    presentPickup: typeof raw.presentPickup === "string" ? raw.presentPickup : base.presentPickup,
    pickupContactName: typeof raw.pickupContactName === "string" ? raw.pickupContactName : "",
    pickupContactPhone: typeof raw.pickupContactPhone === "string" ? raw.pickupContactPhone : "",
    presentDelivery: typeof raw.presentDelivery === "string" ? raw.presentDelivery : base.presentDelivery,
    deliveryContactName: typeof raw.deliveryContactName === "string" ? raw.deliveryContactName : "",
    deliveryContactPhone: typeof raw.deliveryContactPhone === "string" ? raw.deliveryContactPhone : "",
    additionalStop: typeof raw.additionalStop === "string" ? raw.additionalStop : base.additionalStop,
    extraStopAddress: typeof raw.extraStopAddress === "string" ? raw.extraStopAddress : "",
    extraStopKind: typeof raw.extraStopKind === "string" ? raw.extraStopKind : "",
    extraStopAccess: typeof raw.extraStopAccess === "string" ? raw.extraStopAccess : "",
    extraStopPhotos: Array.isArray(raw.extraStopPhotos) ? (raw.extraStopPhotos as MoveChecklistPayload["extraStopPhotos"]) : [],
    pickup,
    delivery,
    changes: stringArray(raw.changes),
    changeNotes: typeof raw.changeNotes === "string" ? raw.changeNotes : "",
    changePhotos: Array.isArray(raw.changePhotos) ? (raw.changePhotos as MoveChecklistPayload["changePhotos"]) : [],
    specialtyItems: stringArray(raw.specialtyItems),
    specialtyDescription: typeof raw.specialtyDescription === "string" ? raw.specialtyDescription : "",
    specialtyPhotos: Array.isArray(raw.specialtyPhotos)
      ? (raw.specialtyPhotos as MoveChecklistPayload["specialtyPhotos"])
      : [],
    specialtyAccessConcern: typeof raw.specialtyAccessConcern === "string" ? raw.specialtyAccessConcern : "",
    specialtyAccessNotes: typeof raw.specialtyAccessNotes === "string" ? raw.specialtyAccessNotes : "",
    packingReady: typeof raw.packingReady === "string" ? raw.packingReady : "",
    services: stringArray(raw.services),
    acks: { ...base.acks, ...(isRecord(raw.acks) ? (raw.acks as Record<string, boolean>) : {}) },
    typedName: typeof raw.typedName === "string" ? raw.typedName : "",
    hp: "",
    elapsedMs: typeof raw.elapsedMs === "number" ? raw.elapsedMs : 0,
  };
}

export function payloadHasAnswers(data: MoveChecklistPayload): boolean {
  return Boolean(
    data.fullName.trim() ||
      data.email.trim() ||
      data.phone.trim() ||
      data.moveDate ||
      data.pickupAddress.trim() ||
      data.deliveryAddress.trim() ||
      data.presentPickup ||
      data.presentDelivery ||
      data.additionalStop ||
      data.pickup.propertyType ||
      data.delivery.propertyType ||
      data.changes.length ||
      data.specialtyItems.length ||
      data.packingReady ||
      data.typedName.trim(),
  );
}

export function parseStored(raw: string | null): ChecklistProgress | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(parsed)) return null;

  if ("data" in parsed && ("step" in parsed || "screen" in parsed)) {
    const data = normalizePayload(parsed.data);
    const screen: ChecklistScreen = parsed.screen === "intro" ? "intro" : "form";
    const step = screen === "intro" ? 1 : clampStep(parsed.step);
    if (screen === "intro" && !payloadHasAnswers(data)) return null;
    return { screen, step, data };
  }

  const data = normalizePayload(parsed);
  if (!payloadHasAnswers(data)) return null;
  return { screen: "form", step: 1, data };
}

export function serializeProgress(progress: ChecklistProgress): string {
  return JSON.stringify({
    screen: progress.screen,
    step: progress.step,
    data: { ...progress.data, hp: "" },
  });
}

export function readProgress(storage: Pick<Storage, "getItem"> | null): ChecklistProgress | null {
  if (!storage) return null;
  try {
    return parseStored(storage.getItem(CHECKLIST_STORAGE_KEY));
  } catch {
    return null;
  }
}

export function writeProgress(storage: Store | null, progress: ChecklistProgress) {
  if (!storage) return;
  try {
    storage.setItem(CHECKLIST_STORAGE_KEY, serializeProgress(progress));
  } catch {
    /* quota */
  }
}

export function clearProgress(storage: Store | null) {
  if (!storage) return;
  try {
    storage.removeItem(CHECKLIST_STORAGE_KEY);
  } catch {
    /* */
  }
}
