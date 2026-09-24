/**
 * Multi-step quote lead (/quotes).
 * Option values stay English for the CRM. Hidden answers are null.
 * Switching move type clears step 2 and the item checklist. Contact stays.
 */

import { SERVICE_LABELS, type ServiceType } from "./funnel-service.ts";
import { normalizeUsPhone } from "./phone.ts";

export function markNow(): number {
  return typeof performance !== "undefined" ? performance.now() : Date.now();
}

export const LEAD_FORM_SOURCE = "lead_form" as const;
export const LEAD_CTA = "Get my price";
export const STEP1_HEADING = "What are you moving?";
export const STEP1_HELPER = "This picks the right questions. Takes 20 seconds.";
export const PIANO_NOTE = "We'll confirm this one by phone.";
export const STEP_LABELS = ["What", "Details", "Contact"] as const;

export const MOVE_TYPES = [
  { value: "home", label: "Home" },
  { value: "apartment", label: "Apartment" },
  { value: "condo", label: "Condo" },
  { value: "storage", label: "Storage" },
  { value: "single_item", label: "Single item" },
] as const;

export type MoveType = (typeof MOVE_TYPES)[number]["value"];

export const FIELD_KEYS = [
  "bedrooms",
  "stairs_pickup",
  "stairs_dropoff",
  "truck",
  "packing",
  "distance",
  "floor_pickup",
  "floor_dropoff",
  "apartment_access",
  "elevator_reserved",
  "building_coi",
  "move_in_window",
  "floor",
  "condo_access",
  "hoa_rules",
  "coi_required",
  "reserved_time",
  "direction",
  "unit_size",
  "storage_access",
  "job",
  "item_type",
  "pickup_access",
  "dropoff_access",
  "timing",
] as const;

export type FieldKey = (typeof FIELD_KEYS)[number];

export type FieldDef = {
  key: FieldKey;
  label: string;
  kind: "choice" | "text";
  options?: readonly string[];
  optional?: boolean;
  placeholder?: string;
  maxLength?: number;
};

export type QuestionGroup = {
  id: string;
  title: string;
  fields: FieldDef[];
};

export type ContactGroupId = "places" | "when" | "items" | "who";

export const CONTACT_GROUPS: Array<{ id: ContactGroupId; title: string }> = [
  { id: "places", title: "Where" },
  { id: "when", title: "When" },
  { id: "items", title: "What's moving" },
  { id: "who", title: "How we reach you" },
];

/** Optional inventory. Different list per move type — not the old 10 services. */
export const ITEM_CHECKLIST: Record<MoveType, readonly string[]> = {
  home: [
    "Boxes",
    "Beds and mattresses",
    "Dressers",
    "Sofa or sectional",
    "Dining set",
    "Appliances",
    "Washer and dryer",
    "Garage or patio",
    "Piano or safe",
  ],
  apartment: [
    "Boxes",
    "Beds and mattresses",
    "Sofa or sectional",
    "Desk",
    "Appliances",
    "Washer and dryer",
    "TV",
  ],
  condo: [
    "Boxes",
    "Beds and mattresses",
    "Sofa or sectional",
    "Appliances",
    "Washer and dryer",
    "Oversized furniture",
    "Piano or safe",
  ],
  storage: [
    "Boxes",
    "Furniture",
    "Appliances",
    "Mattress",
    "Gym equipment",
    "Not sure",
  ],
  single_item: [
    "Sofa",
    "Mattress",
    "Fridge",
    "Washer-dryer",
    "Treadmill",
    "Piano or safe",
    "Other",
  ],
};

export function itemChecklist(type: MoveType): readonly string[] {
  return ITEM_CHECKLIST[type];
}

const BEDROOMS = ["Studio", "1", "2", "3", "4+"] as const;
const YES_NO = ["No", "Yes"] as const;
const YES_NO_UNSURE = ["Yes", "No", "Not sure"] as const;
const TRUCK_CREW = [
  "Need Toro truck",
  "I have U-Haul, POD, or rental truck",
] as const;
const PACKING = ["None", "Partial", "Full"] as const;
const DISTANCE = ["Local", "Long-distance", "Not sure"] as const;
const APT_ACCESS = ["Elevator", "Walk-up", "Both"] as const;
const CONDO_ACCESS = ["Elevator", "Stairs", "Both"] as const;
const DIRECTION = [
  "Storage → home",
  "Home → storage",
  "Storage → storage",
] as const;
const UNIT = ["5x5", "5x10", "10x10", "10x20", "Not sure"] as const;
const STORAGE_ACCESS = ["Drive-up", "Indoor", "Upper floor"] as const;
const JOB = ["Load only", "Unload only", "Both"] as const;
const TRUCK_STORAGE = ["I already have truck or POD", "Need Toro truck"] as const;
const ITEMS = [
  "Sofa",
  "Mattress",
  "Fridge",
  "Washer-dryer",
  "Treadmill",
  "Piano or safe",
  "Other",
] as const;
const ITEM_ACCESS = ["Ground", "Stairs", "Elevator"] as const;
const TRUCK_ITEM = ["Need Toro truck", "I have a truck"] as const;
const TIMING = ["Date", "ASAP"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function choice(
  key: FieldKey,
  label: string,
  options: readonly string[],
  optional = false,
): FieldDef {
  return { key, label, kind: "choice", options, optional };
}

function text(
  key: FieldKey,
  label: string,
  optional = false,
  placeholder?: string,
): FieldDef {
  return {
    key,
    label,
    kind: "text",
    optional,
    placeholder,
    maxLength: optional ? 160 : 40,
  };
}

export function isMoveType(value: unknown): value is MoveType {
  return MOVE_TYPES.some((type) => type.value === value);
}

export function moveTypeLabel(type: MoveType): string {
  return MOVE_TYPES.find((item) => item.value === type)?.label ?? type;
}

export function questionGroups(type: MoveType): QuestionGroup[] {
  switch (type) {
    case "home":
      return [
        {
          id: "bedrooms",
          title: "Bedrooms",
          fields: [choice("bedrooms", "Bedrooms", BEDROOMS)],
        },
        {
          id: "stairs",
          title: "Stairs",
          fields: [
            choice("stairs_pickup", "Stairs at pickup", YES_NO),
            choice("stairs_dropoff", "Stairs at drop-off", YES_NO),
          ],
        },
        {
          id: "truck",
          title: "Truck",
          fields: [choice("truck", "Truck", TRUCK_CREW)],
        },
        {
          id: "packing",
          title: "Packing",
          fields: [choice("packing", "Packing", PACKING)],
        },
        {
          id: "distance",
          title: "Local or long-distance",
          fields: [
            choice("distance", "Local or leaving Central Florida", DISTANCE),
          ],
        },
      ];
    case "apartment":
      return [
        {
          id: "floors",
          title: "Floors",
          fields: [
            text("floor_pickup", "Floor at pickup", false, "e.g. 3"),
            text("floor_dropoff", "Floor at drop-off", false, "e.g. 1"),
          ],
        },
        {
          id: "access",
          title: "Access",
          fields: [
            choice("apartment_access", "Access", APT_ACCESS),
            choice("elevator_reserved", "Elevator reserved", YES_NO_UNSURE),
          ],
        },
        {
          id: "building",
          title: "Building",
          fields: [
            choice("building_coi", "Building needs COI", YES_NO_UNSURE),
            text(
              "move_in_window",
              "Move-in window or time slot",
              true,
              "Optional",
            ),
          ],
        },
        {
          id: "truck",
          title: "Truck",
          fields: [choice("truck", "Truck", TRUCK_CREW)],
        },
        {
          id: "distance",
          title: "Local or long-distance",
          fields: [
            choice("distance", "Local or leaving Central Florida", DISTANCE),
          ],
        },
        {
          id: "bedrooms",
          title: "Bedrooms",
          fields: [choice("bedrooms", "Bedrooms", BEDROOMS, true)],
        },
      ];
    case "condo":
      return [
        {
          id: "floor",
          title: "Floor",
          fields: [text("floor", "Floor", false, "e.g. 6")],
        },
        {
          id: "access",
          title: "Access",
          fields: [choice("condo_access", "Access", CONDO_ACCESS)],
        },
        {
          id: "rules",
          title: "Building rules",
          fields: [
            choice("hoa_rules", "HOA or loading-dock rules", YES_NO_UNSURE),
            choice("coi_required", "COI required", YES_NO_UNSURE),
          ],
        },
        {
          id: "reserved",
          title: "Reserved time",
          fields: [
            text(
              "reserved_time",
              "Reserved elevator or dock time",
              true,
              "Optional",
            ),
          ],
        },
        {
          id: "truck",
          title: "Truck",
          fields: [choice("truck", "Truck", TRUCK_CREW)],
        },
        {
          id: "distance",
          title: "Local or long-distance",
          fields: [
            choice("distance", "Local or leaving Central Florida", DISTANCE),
          ],
        },
      ];
    case "storage":
      return [
        {
          id: "direction",
          title: "Direction",
          fields: [choice("direction", "Direction", DIRECTION)],
        },
        {
          id: "unit",
          title: "Unit size",
          fields: [choice("unit_size", "Unit size", UNIT)],
        },
        {
          id: "access",
          title: "Access",
          fields: [choice("storage_access", "Access", STORAGE_ACCESS)],
        },
        {
          id: "job",
          title: "Job",
          fields: [choice("job", "Job", JOB)],
        },
        {
          id: "truck",
          title: "Truck",
          fields: [choice("truck", "Truck", TRUCK_STORAGE)],
        },
      ];
    case "single_item":
      return [
        {
          id: "item",
          title: "Item type",
          fields: [choice("item_type", "Item type", ITEMS)],
        },
        {
          id: "pickup",
          title: "Pickup access",
          fields: [choice("pickup_access", "Pickup access", ITEM_ACCESS)],
        },
        {
          id: "dropoff",
          title: "Drop-off access",
          fields: [choice("dropoff_access", "Drop-off access", ITEM_ACCESS)],
        },
        {
          id: "truck",
          title: "Truck",
          fields: [choice("truck", "Truck", TRUCK_ITEM)],
        },
        {
          id: "timing",
          title: "Timing",
          fields: [choice("timing", "Timing", TIMING)],
        },
      ];
  }
}

export function visibleFields(type: MoveType): FieldDef[] {
  return questionGroups(type).flatMap((group) => group.fields);
}

export function visibleFieldKeys(type: MoveType): FieldKey[] {
  return visibleFields(type).map((field) => field.key);
}

export type LeadFormState = {
  moveType: MoveType | "";
  answers: Record<FieldKey, string>;
  items: string[];
  fromPlace: string;
  toPlace: string;
  preferredDate: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
};

export function emptyAnswers(): Record<FieldKey, string> {
  return Object.fromEntries(FIELD_KEYS.map((key) => [key, ""])) as Record<
    FieldKey,
    string
  >;
}

export function emptyLeadFormState(): LeadFormState {
  return {
    moveType: "",
    answers: emptyAnswers(),
    items: [],
    fromPlace: "",
    toPlace: "",
    preferredDate: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  };
}

/** New move type clears step-2 answers and the item checklist. Contact stays. */
export function selectMoveType(
  state: LeadFormState,
  next: MoveType,
): LeadFormState {
  if (state.moveType === next) return state;
  return {
    ...state,
    moveType: next,
    answers: emptyAnswers(),
    items: [],
  };
}

const CUSTOMER_TRUCK = new Set([
  "I have U-Haul, POD, or rental truck",
  "I have a truck",
  "I already have truck or POD",
]);

/**
 * CRM still stores the older service codes. Step 1 stays the five move types.
 * Long-distance wins over truck. A customer truck is labor or POD, not full-service.
 */
export function legacyService(state: LeadFormState): {
  service: ServiceType;
  label: string;
} {
  const truck = state.answers.truck.trim();
  const distance = state.answers.distance.trim();
  const item = state.answers.item_type.trim();
  let service: ServiceType = "full_service_move";
  if (state.moveType === "single_item") {
    service = item === "Piano or safe" ? "special_item_move" : "single_item_move";
  } else if (
    (state.moveType === "home" ||
      state.moveType === "apartment" ||
      state.moveType === "condo") &&
    distance === "Long-distance"
  ) {
    service = "long_distance_move";
  } else if (state.moveType === "storage") {
    service = CUSTOMER_TRUCK.has(truck)
      ? "pod_storage_container"
      : "full_service_move";
  } else if (CUSTOMER_TRUCK.has(truck)) {
    service = "rental_truck_labor";
  } else if (state.moveType === "home") {
    service = "house_2plus_move";
  } else if (state.moveType === "apartment" || state.moveType === "condo") {
    service = "apartment_2plus_move";
  }
  return { service, label: SERVICE_LABELS[service] };
}

export function validateStep1(state: LeadFormState): string | null {
  if (!state.moveType) return "Choose what you are moving.";
  return null;
}

function validateField(state: LeadFormState, field: FieldDef): string | null {
  const value = state.answers[field.key].trim();
  if (!value) {
    if (field.optional) return null;
    return field.kind === "text"
      ? `Enter ${field.label}.`
      : `Choose ${field.label}.`;
  }
  if (field.kind === "choice" && !field.options?.includes(value)) {
    return `Choose ${field.label}.`;
  }
  if (value.length > (field.maxLength ?? 160)) {
    return `Shorten ${field.label}.`;
  }
  return null;
}

export function validateGroup(
  state: LeadFormState,
  group: QuestionGroup,
): string | null {
  for (const field of group.fields) {
    const message = validateField(state, field);
    if (message) return message;
  }
  return null;
}

export function validateStep2(state: LeadFormState): string | null {
  if (!state.moveType) return "Choose what you are moving.";
  for (const group of questionGroups(state.moveType)) {
    const message = validateGroup(state, group);
    if (message) return message;
  }
  return null;
}

export function allowsOnePlace(state: LeadFormState): boolean {
  return (
    state.moveType === "storage" &&
    (state.answers.direction === "Home → storage" ||
      state.answers.direction === "Storage → home")
  );
}

export function dateOptional(state: LeadFormState): boolean {
  return state.moveType === "single_item" && state.answers.timing === "ASAP";
}

function placeOk(value: string): boolean {
  return value.trim().length >= 2;
}

export function validateContactGroup(
  state: LeadFormState,
  id: ContactGroupId,
): string | null {
  if (id === "places") {
    const from = state.fromPlace.trim();
    const to = state.toPlace.trim();
    if (allowsOnePlace(state)) {
      if (!placeOk(from) && !placeOk(to)) {
        return "Enter a ZIP or city for at least one stop.";
      }
      if (from && !placeOk(from)) return "Enter a from ZIP or city.";
      if (to && !placeOk(to)) return "Enter a to ZIP or city.";
      return null;
    }
    if (!placeOk(from)) return "Enter a from ZIP or city.";
    if (!placeOk(to)) return "Enter a to ZIP or city.";
    return null;
  }
  if (id === "when") {
    const date = state.preferredDate.trim();
    if (!date) return dateOptional(state) ? null : "Choose a preferred date.";
    return isIsoDate(date) ? null : "Choose a preferred date.";
  }
  if (id === "items") return null;
  if (state.name.trim().length < 2) return "Enter your name.";
  if (!normalizeUsPhone(state.phone)) return "Enter a valid phone number.";
  const email = state.email.trim();
  if (email && !EMAIL_RE.test(email)) {
    return "Enter a valid email, or leave it blank.";
  }
  if (state.notes.trim().length > 2000) return "Shorten notes.";
  return null;
}

export function validateStep3(state: LeadFormState): string | null {
  for (const group of CONTACT_GROUPS) {
    const message = validateContactGroup(state, group.id);
    if (message) return message;
  }
  return null;
}

export function validateLeadForm(state: LeadFormState): string | null {
  return (
    validateStep1(state) || validateStep2(state) || validateStep3(state)
  );
}

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

export type LeadFormPayload = {
  move_type: MoveType;
  source: typeof LEAD_FORM_SOURCE;
  page_url: string;
  timestamp: string;
  from_place: string;
  to_place: string;
  preferred_date: string | null;
  name: string;
  phone: string;
  email: string | null;
  notes: string | null;
  items: string[] | null;
  service: ServiceType;
  service_label: string;
} & Record<FieldKey, string | null>;

export function toPayload(
  state: LeadFormState,
  meta: { page_url: string; timestamp: string },
): LeadFormPayload | null {
  if (!state.moveType) return null;
  const visible = new Set(visibleFieldKeys(state.moveType));
  const details = {} as Record<FieldKey, string | null>;
  for (const key of FIELD_KEYS) {
    const raw = state.answers[key].trim();
    details[key] = visible.has(key) && raw ? raw : null;
  }
  const phone = normalizeUsPhone(state.phone);
  const allowed = new Set(itemChecklist(state.moveType));
  const items = state.items.filter((item) => allowed.has(item));
  const legacy = legacyService(state);
  return {
    move_type: state.moveType,
    source: LEAD_FORM_SOURCE,
    page_url: meta.page_url,
    timestamp: meta.timestamp,
    from_place: state.fromPlace.trim(),
    to_place: state.toPlace.trim(),
    preferred_date: state.preferredDate.trim() || null,
    name: state.name.trim(),
    phone: phone || "",
    email: state.email.trim().toLowerCase() || null,
    notes: state.notes.trim() || null,
    items: items.length ? items : null,
    service: legacy.service,
    service_label: legacy.label,
    ...details,
  };
}

export function leadFormTitle(payload: LeadFormPayload): string {
  const when =
    payload.preferred_date ||
    (payload.timing === "ASAP" ? "ASAP" : "Date needed");
  const from = payload.from_place || "—";
  const to = payload.to_place || "—";
  return `${moveTypeLabel(payload.move_type)} · ${when} · ${from} → ${to}`;
}

export function leadFormNote(payload: LeadFormPayload): string {
  const lines: string[] = [];
  for (const field of visibleFields(payload.move_type)) {
    const value = payload[field.key];
    if (typeof value === "string" && value) {
      lines.push(`${field.label}: ${value}`);
    }
  }
  if (payload.item_type === "Piano or safe") lines.push(PIANO_NOTE);
  if (payload.items?.length) lines.push(`Items: ${payload.items.join(", ")}`);
  if (payload.service) lines.push(`Service code: ${payload.service}`);
  if (payload.notes) lines.push(`Notes: ${payload.notes}`);
  return lines.join("\n");
}

function textField(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function stateFromBody(body: Record<string, unknown>): LeadFormState {
  const answers = emptyAnswers();
  for (const key of FIELD_KEYS) {
    const value = body[key];
    if (typeof value === "string") answers[key] = value;
  }
  return {
    moveType: isMoveType(body.move_type) ? body.move_type : "",
    answers,
    fromPlace: textField(body.from_place),
    toPlace: textField(body.to_place),
    preferredDate: textField(body.preferred_date),
    name: textField(body.name),
    phone: textField(body.phone),
    email: textField(body.email),
    notes: textField(body.notes),
    items: Array.isArray(body.items)
      ? body.items.filter((item): item is string => typeof item === "string")
      : [],
  };
}

export type LeadFlat = {
  name: string;
  phone: string;
  email: string;
  serviceType: string;
  service: string;
  moveDate: string;
  city: string;
  source: string;
  consentSms: boolean;
  note: string;
};

export type LeadFormIntake =
  | { ok: false; error: string }
  | {
      ok: true;
      flat: LeadFlat;
      title: string;
      landingPage: string;
      payload: LeadFormPayload;
    };

function nationalPhone(raw: string): string {
  const e164 = normalizeUsPhone(raw);
  return e164 ? e164.slice(2) : "";
}

function routePlaces(from: string, to: string): string {
  if (from && to) return `${from} → ${to}`;
  return from || to;
}

/** Null when this body is not the multi-step lead form. */
export function leadFormIntake(
  body: Record<string, unknown>,
): LeadFormIntake | null {
  if (textField(body.source).trim() !== LEAD_FORM_SOURCE) return null;
  const state = stateFromBody(body);
  const error = validateLeadForm(state);
  if (error) return { ok: false, error };
  const page = textField(body.page_url).trim();
  if (!page || page.length > 500) return { ok: false, error: "Missing page." };
  let timestamp = textField(body.timestamp).trim();
  if (!timestamp || Number.isNaN(Date.parse(timestamp))) {
    timestamp = new Date().toISOString();
  }
  const payload = toPayload(state, { page_url: page, timestamp });
  if (!payload) return { ok: false, error: "Choose what you are moving." };
  const consentSms =
    body.consentSms !== false && body.consentSms !== "false";
  return {
    ok: true,
    payload,
    title: leadFormTitle(payload),
    landingPage: page,
    flat: {
      name: payload.name,
      phone: nationalPhone(payload.phone),
      email: payload.email || "",
      serviceType: payload.service_label,
      service: payload.service,
      moveDate: payload.preferred_date || "ASAP",
      city: routePlaces(payload.from_place, payload.to_place),
      source: LEAD_FORM_SOURCE,
      consentSms,
      note: leadFormNote(payload),
    },
  };
}
