import assert from "node:assert/strict";
import test from "node:test";
import { PHONE_DISPLAY } from "./site.ts";
import {
  CONTACT_GROUPS,
  FIELD_KEYS,
  LEAD_CTA,
  LEAD_FORM_SOURCE,
  MOVE_TYPES,
  PIANO_NOTE,
  STEP1_HELPER,
  STEP_LABELS,
  emptyLeadFormState,
  itemChecklist,
  leadFormIntake,
  pruneItems,
  legacyService,
  leadFormNote,
  leadFormTitle,
  questionGroups,
  selectMoveType,
  toPayload,
  validateLeadForm,
  visibleFieldKeys,
  type FieldKey,
  type LeadFormState,
  type MoveType,
} from "./lead-form.ts";

function filled(type: MoveType): LeadFormState {
  const state = emptyLeadFormState();
  state.moveType = type;
  for (const field of questionGroups(type).flatMap((group) => group.fields)) {
    if (field.optional) continue;
    state.answers[field.key] =
      field.kind === "choice" ? (field.options?.[0] ?? "") : "3";
  }
  state.fromPlace = "32801";
  state.toPlace = "32789";
  state.preferredDate = "2026-10-04";
  state.name = "Ada Perez";
  state.phone = "(321) 555-0100";
  state.email = "Ada@Example.com";
  state.notes = "Gate code 12";
  state.items = [itemChecklist(state)[0]];
  return state;
}

test("step 1 is five move types and the price CTA", () => {
  assert.deepEqual(
    MOVE_TYPES.map((type) => type.label),
    ["Home", "Apartment", "Condo", "Storage", "Single item"],
  );
  assert.equal(LEAD_CTA, "Get my price");
  assert.equal(STEP1_HELPER, "This picks the right questions. Takes 20 seconds.");
  assert.deepEqual(STEP_LABELS, ["What", "Details", "Contact"]);
  assert.equal(PHONE_DISPLAY, "(689) 600-2720");
  for (const type of MOVE_TYPES) {
    assert.doesNotMatch(type.label, /labor/i);
    assert.doesNotMatch(type.label, /full-service/i);
  }
});

test("each move type shows a different step-2 field set", () => {
  const signatures = MOVE_TYPES.map((type) =>
    visibleFieldKeys(type.value).join("|"),
  );
  assert.equal(new Set(signatures).size, 5);
  for (const type of MOVE_TYPES) {
    const keys = visibleFieldKeys(type.value);
    assert.equal(new Set(keys).size, keys.length);
    const grouped = questionGroups(type.value).flatMap((group) =>
      group.fields.map((field) => field.key),
    );
    assert.deepEqual(grouped, keys);
  }
});

test("home, apartment, condo, storage, and single item keep their own questions", () => {
  const home = new Set(visibleFieldKeys("home"));
  assert.deepEqual([...home], [
    "bedrooms",
    "stairs_pickup",
    "stairs_dropoff",
    "truck",
    "packing",
    "distance",
  ]);
  for (const hidden of [
    "floor",
    "floor_pickup",
    "apartment_access",
    "building_coi",
    "move_in_window",
    "unit_size",
    "item_type",
    "hoa_rules",
  ] as FieldKey[]) {
    assert.equal(home.has(hidden), false, hidden);
  }

  const apartment = visibleFieldKeys("apartment");
  assert.ok(apartment.includes("floor_pickup"));
  assert.ok(apartment.includes("floor_dropoff"));
  assert.ok(apartment.includes("elevator_reserved"));
  assert.ok(apartment.includes("building_coi"));
  assert.ok(apartment.includes("move_in_window"));
  assert.equal(
    questionGroups("apartment")
      .flatMap((group) => group.fields)
      .find((field) => field.key === "bedrooms")?.optional,
    true,
  );
  assert.equal(apartment.includes("hoa_rules"), false);
  assert.equal(apartment.includes("unit_size"), false);
  assert.equal(apartment.includes("item_type"), false);

  const condo = visibleFieldKeys("condo");
  assert.ok(condo.includes("floor"));
  assert.ok(condo.includes("hoa_rules"));
  assert.ok(condo.includes("coi_required"));
  assert.ok(condo.includes("reserved_time"));
  assert.equal(condo.includes("bedrooms"), false);
  assert.equal(condo.includes("unit_size"), false);
  assert.equal(condo.includes("item_type"), false);

  const storage = visibleFieldKeys("storage");
  assert.deepEqual(storage, [
    "direction",
    "unit_size",
    "storage_access",
    "job",
    "truck",
  ]);
  assert.equal(storage.includes("bedrooms"), false);
  assert.equal(storage.includes("packing"), false);
  assert.equal(storage.includes("distance"), false);
  assert.equal(storage.includes("building_coi"), false);

  const item = visibleFieldKeys("single_item");
  assert.deepEqual(item, [
    "item_type",
    "pickup_access",
    "dropoff_access",
    "truck",
    "timing",
  ]);
  assert.equal(item.includes("bedrooms"), false);
  assert.equal(item.includes("packing"), false);
  assert.equal(item.includes("unit_size"), false);
  assert.equal(item.includes("coi_required"), false);
});

test("switching move type resets step 2 and keeps contact", () => {
  const home = filled("home");
  home.answers.bedrooms = "3";
  home.answers.stairs_pickup = "Yes";
  home.items = ["2 bedrooms", "3 bedrooms"];
  const apartment = selectMoveType(home, "apartment");
  assert.equal(apartment.moveType, "apartment");
  assert.equal(apartment.name, "Ada Perez");
  assert.equal(apartment.phone, "(321) 555-0100");
  assert.equal(apartment.email, "Ada@Example.com");
  assert.equal(apartment.notes, "Gate code 12");
  assert.equal(apartment.fromPlace, "32801");
  assert.equal(apartment.toPlace, "32789");
  assert.equal(apartment.preferredDate, "2026-10-04");
  assert.equal(apartment.answers.bedrooms, "");
  assert.equal(apartment.answers.stairs_pickup, "");
  assert.deepEqual(apartment.items, []);
  assert.equal(home.answers.bedrooms, "3");
  assert.equal(selectMoveType(apartment, "apartment"), apartment);
});

test("not sure does not block, and storage can use one place", () => {
  const storage = filled("storage");
  storage.answers.unit_size = "Not sure";
  storage.answers.direction = "Home → storage";
  storage.toPlace = "";
  assert.equal(validateLeadForm(storage), null);

  storage.fromPlace = "";
  storage.toPlace = "";
  assert.match(
    String(validateLeadForm(storage)),
    /at least one stop/,
  );

  storage.answers.direction = "Storage → storage";
  storage.fromPlace = "32801";
  storage.toPlace = "";
  assert.match(String(validateLeadForm(storage)), /to ZIP or city/);
});

test("single item can be ASAP and a piano asks for a phone confirm", () => {
  const item = filled("single_item");
  item.answers.timing = "ASAP";
  item.answers.item_type = "Piano or safe";
  item.items = ["Piano"];
  item.preferredDate = "";
  assert.equal(validateLeadForm(item), null);
  const payload = toPayload(item, {
    page_url: "https://toromovers.com/quotes",
    timestamp: "2026-09-24T15:00:00.000Z",
  });
  assert.ok(payload);
  assert.equal(payload.preferred_date, null);
  assert.equal(payload.timing, "ASAP");
  assert.equal(payload.bedrooms, null);
  assert.equal(payload.packing, null);
  assert.equal(payload.unit_size, null);
  assert.match(leadFormTitle(payload), /^Single item · ASAP · 32801 → 32789$/);
  assert.match(leadFormNote(payload), new RegExp(PIANO_NOTE.replace(/[.]/g, "\\.")));

  item.answers.timing = "Date";
  item.preferredDate = "";
  assert.match(String(validateLeadForm(item)), /preferred date/);
});

test("payload keeps visible answers, nulls hidden fields, and notifies with the route title", () => {
  const state = filled("home");
  state.answers.bedrooms = "2";
  state.answers.distance = "Not sure";
  const raw = toPayload(state, {
    page_url: "https://toromovers.com/quotes?utm=ads",
    timestamp: "2026-09-24T15:04:00.000Z",
  });
  assert.ok(raw);
  raw.floor_pickup = "9";
  const intake = leadFormIntake({
    ...raw,
    floor_pickup: "9",
    consentSms: true,
    hp: "",
    elapsedMs: 1200,
  });
  assert.ok(intake && intake.ok);
  if (!intake || !intake.ok) return;
  assert.equal(intake.payload.source, LEAD_FORM_SOURCE);
  assert.equal(intake.payload.move_type, "home");
  assert.equal(intake.payload.bedrooms, "2");
  assert.equal(intake.payload.distance, "Not sure");
  assert.equal(intake.payload.floor_pickup, null);
  assert.equal(intake.payload.item_type, null);
  assert.equal(intake.payload.unit_size, null);
  assert.equal(intake.payload.hoa_rules, null);
  assert.equal(intake.payload.phone, "+13215550100");
  assert.equal(intake.payload.email, "ada@example.com");
  assert.equal(intake.payload.page_url, "https://toromovers.com/quotes?utm=ads");
  assert.equal(intake.payload.timestamp, "2026-09-24T15:04:00.000Z");
  assert.equal(intake.flat.source, "lead_form");
  assert.equal(intake.flat.phone, "3215550100");
  assert.equal(intake.payload.service, "house_2plus_move");
  assert.equal(intake.payload.service_label, "House — 2+ rooms");
  assert.equal(intake.payload.when, "This week");
  assert.deepEqual(intake.payload.items, ["Boxes"]);
  assert.equal(intake.payload.primary_detail, "Boxes");
  assert.equal(intake.flat.serviceType, "House — 2+ rooms");
  assert.equal(intake.flat.service, "house_2plus_move");
  assert.equal(intake.flat.city, "32801 → 32789");
  assert.equal(intake.flat.moveDate, "2026-10-04");
  assert.equal(intake.title, "Home · 2026-10-04 · 32801 → 32789");
  assert.match(intake.flat.note, /Bedrooms: 2/);
  assert.match(intake.flat.note, /Not sure/);
  for (const key of FIELD_KEYS) {
    assert.ok(key in intake.payload);
  }
  assert.equal(leadFormIntake({ source: "homepage-callback", name: "Ada" }), null);
});

test("contact groups stay on the last step", () => {
  assert.deepEqual(
    CONTACT_GROUPS.map((group) => group.id),
    ["places", "when", "items", "who"],
  );
  const state = filled("condo");
  state.phone = "555";
  assert.match(String(validateLeadForm(state)), /phone/);
  state.phone = "(321) 555-0100";
  state.email = "not-an-email";
  assert.match(String(validateLeadForm(state)), /email/);
});

test("item checklist is inventory for the mapped quote service", () => {
  const home = filled("home");
  assert.ok(itemChecklist(home).includes("Sofa or sectional"));
  assert.ok(itemChecklist(home).includes("Washer and dryer"));
  home.answers.truck = "I have U-Haul, POD, or rental truck";
  assert.deepEqual(
    [...itemChecklist(home)],
    ["Boxes", "Furniture", "Appliances", "Loading", "Unloading"],
  );
  assert.ok(itemChecklist(home).length < 9);
  const pruned = pruneItems({
    ...home,
    items: ["Sofa or sectional", "Boxes"],
  });
  assert.deepEqual(pruned.items, ["Boxes"]);

  const apartment = filled("apartment");
  const condo = filled("condo");
  assert.deepEqual([...itemChecklist(apartment)], [...itemChecklist(condo)]);
  assert.ok(itemChecklist(apartment).includes("Dining table"));

  const storage = filled("storage");
  assert.ok(itemChecklist(storage).includes("Garage or storage items"));
  assert.equal(itemChecklist(storage).includes("Dining table"), false);

  const item = filled("single_item");
  assert.deepEqual(itemChecklist(item)[0], "Couch / sectional");
  item.answers.item_type = "Piano or safe";
  assert.deepEqual(itemChecklist(item)[0], "Couch / sectional");
  item.answers.truck = "I have a truck";
  assert.ok(itemChecklist(item).includes("Loading"));

  home.answers.truck = "Need Toro truck";
  home.items = ["Boxes", "Not a CRM option"];
  assert.equal(validateLeadForm(home), null);
  const payload = toPayload(home, {
    page_url: "https://toromovers.com/quotes",
    timestamp: "2026-09-24T15:10:00.000Z",
  });
  assert.deepEqual(payload?.items, ["Boxes"]);
  assert.equal(payload?.service_label, "House — 2+ rooms");
  assert.equal(payload?.when, "This week");

  home.items = [];
  assert.equal(validateLeadForm(home), null);
  assert.deepEqual(
    toPayload(home, {
      page_url: "https://toromovers.com/quotes",
      timestamp: "2026-09-24T15:10:00.000Z",
    })?.items,
    [],
  );
});

test("service label follows the live quote names", () => {
  const home = filled("home");
  home.answers.truck = "Need Toro truck";
  home.answers.distance = "Long-distance";
  assert.equal(legacyService(home).label, "House — 2+ rooms");

  home.answers.truck = "I have U-Haul, POD, or rental truck";
  assert.equal(legacyService(home).label, "U-Haul / rental truck");

  const apartment = filled("apartment");
  apartment.answers.truck = "Need Toro truck";
  assert.equal(legacyService(apartment).label, "Apartment — 2+ rooms");

  const condo = filled("condo");
  condo.answers.truck = "Need Toro truck";
  assert.equal(legacyService(condo).label, "Apartment — 2+ rooms");
  condo.answers.truck = "I have U-Haul, POD, or rental truck";
  assert.equal(legacyService(condo).label, "U-Haul / rental truck");

  const storage = filled("storage");
  storage.answers.truck = "I already have truck or POD";
  assert.equal(legacyService(storage).label, "POD / container");
  storage.answers.truck = "Need Toro truck";
  assert.equal(legacyService(storage).label, "POD / container");

  const item = filled("single_item");
  item.answers.item_type = "Piano or safe";
  item.answers.truck = "Need Toro truck";
  assert.equal(legacyService(item).label, "Single item");
  item.answers.truck = "I have a truck";
  assert.equal(legacyService(item).label, "U-Haul / rental truck");
});
