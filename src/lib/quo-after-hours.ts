export const SONA_GREETING =
  "Thanks for calling Toro Movers. Our team is currently away, but I can take your first and last name, phone number, and the service you need or a short message. A team member will follow up as soon as possible. How can I help?";
export const JOB_SIMPLE = "After-Hours Message Intake";
export const SPANISH_ACKNOWLEDGMENT =
  "Gracias por comunicarse con Toro Movers. Nuestro equipo no está disponible en este momento, pero puedo recopilar los detalles de su mudanza para una solicitud de cotización. Un miembro del equipo de Toro Movers le dará seguimiento lo antes posible durante horario laboral.";
export const MISSED_CALL_SMS =
  "Hi, this is Toro Movers. Sorry we missed your call. How can we help with your move? Reply with your move date, pickup and destination city/ZIP, and whether you need a full-service move with a truck or labor-only help. A team member will follow up as soon as possible.";
export const SHARED_GUARDRAILS =
  "Never invent prices, business hours, discounts, insurance or licensing claims, guarantees, refund terms, or damage-resolution terms. Never promise availability, a booking, a crew, a truck, same-day service, special-item acceptance, a schedule change, a refund, or a resolution. Never forward or transfer an after-hours call to a person, including Sabina Bender.";

export const JOB_QUOTE = "After-Hours Moving Quote Intake";
export const JOB_MISSED = "Missed Call Follow-Up";
export const JOB_URGENT = "Urgent or Same-Day Move Request";
export const JOB_BOOKING = "Booking Change or Cancellation Request";
export const JOB_DAMAGE = "Damage or Service Concern Intake";
export const JOB_SPANISH = "Spanish Moving Lead Intake";
export const JOB_UNKNOWN = "Unknown Request — Team Review";

export const TAG = {
  afterHours: "After Hours — Needs Follow-Up",
  urgent: "Urgent — Needs Team Review",
  quote: "Quote Request",
  laborOnly: "Labor Only",
  fullService: "Full-Service",
  spanish: "Spanish",
  booking: "Booking Change — Needs Team Review",
  concern: "Service Concern — Needs Team Review",
} as const;

export const FORBIDDEN_CLAIM_PATTERNS: Array<{ id: string; re: RegExp }> = [
  { id: "invented_price", re: /\$\s*\d|\d+\s*(dollars|an hour|\/hr|per hour)/i },
  { id: "invented_hours", re: /\b(open|closed)\b.{0,20}\b(am|pm|monday|tuesday)\b/i },
  { id: "availability_promise", re: /\b(we (can|will) (be there|send a crew|do it) today|you're booked|crew is assigned)\b/i },
  { id: "guarantee", re: /\b(we guarantee|100% guaranteed|fully insured|licensed and insured)\b/i },
  { id: "refund_or_fault", re: /\b(i('ll| will) refund|we accept (full )?liability|that's our fault)\b/i },
];

export type AfterHoursLead = {
  lead_type: string;
  customer_name: string;
  phone: string;
  email: string;
  preferred_contact_method: string;
  preferred_callback_time: string;
  service_type: string;
  needs_toro_truck: string;
  move_date: string;
  date_flexibility: string;
  pickup_city: string;
  pickup_zip: string;
  pickup_location_type: string;
  pickup_floor: string;
  pickup_access_notes: string;
  destination_city: string;
  destination_zip: string;
  destination_location_type: string;
  destination_floor: string;
  destination_access_notes: string;
  move_size: string;
  multiple_stops: string;
  special_items: string;
  packing_needs: string;
  language: string;
  urgency: string;
  existing_booking_reference: string;
  customer_message_summary: string;
  call_recording_or_transcript_reference: string;
  source: "phone_call";
  after_hours: true;
  needs_team_review: true;
  jobs: string[];
  tags: string[];
  policy_flags: string[];
};

type JobResult = { name?: string; result?: { data?: Array<{ name?: string; value?: unknown }> } };

const FIELD_ALIASES: Record<string, keyof AfterHoursLead> = {
  name: "customer_name",
  first_name: "customer_name",
  last_name: "customer_name",
  full_name: "customer_name",
  customer_name: "customer_name",
  message: "customer_message_summary",
  service_or_message: "customer_message_summary",
  phone: "phone",
  phone_number: "phone",
  best_phone_number: "phone",
  email: "email",
  preferred_contact_method: "preferred_contact_method",
  preferred_callback_time: "preferred_callback_time",
  preferred_contact_time: "preferred_callback_time",
  service: "service_type",
  service_needed: "service_type",
  service_type: "service_type",
  needs_toro_truck: "needs_toro_truck",
  truck: "needs_toro_truck",
  move_date: "move_date",
  date: "move_date",
  date_range: "date_flexibility",
  date_flexibility: "date_flexibility",
  pickup_city: "pickup_city",
  origin_city: "pickup_city",
  pickup_zip: "pickup_zip",
  pickup_location_type: "pickup_location_type",
  pickup_floor: "pickup_floor",
  pickup_access_notes: "pickup_access_notes",
  access: "pickup_access_notes",
  destination_city: "destination_city",
  destination_zip: "destination_zip",
  destination_location_type: "destination_location_type",
  destination_floor: "destination_floor",
  destination_access_notes: "destination_access_notes",
  move_size: "move_size",
  multiple_stops: "multiple_stops",
  special_items: "special_items",
  packing_needs: "packing_needs",
  language: "language",
  urgency: "urgency",
  existing_booking_reference: "existing_booking_reference",
  booking: "existing_booking_reference",
  summary: "customer_message_summary",
  concern: "customer_message_summary",
};

function emptyLead(): AfterHoursLead {
  return {
    lead_type: JOB_UNKNOWN,
    customer_name: "",
    phone: "",
    email: "",
    preferred_contact_method: "",
    preferred_callback_time: "",
    service_type: "",
    needs_toro_truck: "",
    move_date: "",
    date_flexibility: "",
    pickup_city: "",
    pickup_zip: "",
    pickup_location_type: "",
    pickup_floor: "",
    pickup_access_notes: "",
    destination_city: "",
    destination_zip: "",
    destination_location_type: "",
    destination_floor: "",
    destination_access_notes: "",
    move_size: "",
    multiple_stops: "",
    special_items: "",
    packing_needs: "",
    language: "en",
    urgency: "normal",
    existing_booking_reference: "",
    customer_message_summary: "",
    call_recording_or_transcript_reference: "",
    source: "phone_call",
    after_hours: true,
    needs_team_review: true,
    jobs: [],
    tags: [TAG.afterHours],
    policy_flags: [],
  };
}

export function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

export function detectPolicyFlags(text: string): string[] {
  if (!text) return [];
  return FORBIDDEN_CLAIM_PATTERNS.filter((row) => row.re.test(text)).map((row) => row.id);
}

export function classifyJobs(input: {
  jobNames?: string[];
  transcript?: string;
  language?: string;
}): string[] {
  const names = new Set((input.jobNames || []).filter(Boolean));
  const blob = `${(input.jobNames || []).join(" ")} ${input.transcript || ""}`.toLowerCase();
  if (input.language === "es" || /\b(spanish|español|espanol)\b/i.test(blob)) names.add(JOB_SPANISH);
  if (/\b(today|tomorrow|urgent|asap|same[- ]day)\b/i.test(blob)) names.add(JOB_URGENT);
  if (/\b(cancel|reschedule|change (the )?date|where('s| is) my crew|existing booking)\b/i.test(blob)) {
    names.add(JOB_BOOKING);
  }
  if (/\b(damage|broken|complaint|refund|service concern)\b/i.test(blob)) names.add(JOB_DAMAGE);
  if (
    /\b(quote|moving help|price estimate|full-service|labor-only|labor only|pod|rental truck)\b/i.test(blob)
  ) {
    names.add(JOB_QUOTE);
  }
  if (/\b(message intake|first and last name|leave a message)\b/i.test(blob) || (input.jobNames || []).includes(JOB_SIMPLE)) {
    names.add(JOB_SIMPLE);
  }
  if (names.size === 0) names.add(JOB_UNKNOWN);
  return [...names];
}

export function tagsForJobs(jobs: string[], serviceType: string): string[] {
  const tags = new Set<string>([TAG.afterHours]);
  if (jobs.includes(JOB_URGENT)) tags.add(TAG.urgent);
  if (jobs.includes(JOB_QUOTE) || jobs.includes(JOB_SPANISH) || jobs.includes(JOB_URGENT)) {
    tags.add(TAG.quote);
  }
  if (jobs.includes(JOB_SPANISH)) tags.add(TAG.spanish);
  if (jobs.includes(JOB_BOOKING)) tags.add(TAG.booking);
  if (jobs.includes(JOB_DAMAGE)) tags.add(TAG.concern);
  const service = serviceType.toLowerCase();
  if (service.includes("labor")) tags.add(TAG.laborOnly);
  if (service.includes("full")) tags.add(TAG.fullService);
  return [...tags];
}

export function primaryJob(jobs: string[]): string {
  if (jobs.includes(JOB_DAMAGE)) return JOB_DAMAGE;
  if (jobs.includes(JOB_BOOKING)) return JOB_BOOKING;
  if (jobs.includes(JOB_URGENT)) return JOB_URGENT;
  if (jobs.includes(JOB_SPANISH)) return JOB_SPANISH;
  if (jobs.includes(JOB_QUOTE)) return JOB_QUOTE;
  if (jobs.includes(JOB_SIMPLE)) return JOB_SIMPLE;
  return JOB_UNKNOWN;
}

function applyField(lead: AfterHoursLead, name: string, value: unknown) {
  const raw = normalizeKey(name);
  if (value == null) return;
  const text = String(value).trim();
  if (!text) return;
  if (raw === "first_name") {
    lead.customer_name = lead.customer_name.includes(text)
      ? lead.customer_name
      : [text, lead.customer_name].filter(Boolean).join(" ").trim();
    return;
  }
  if (raw === "last_name") {
    lead.customer_name = lead.customer_name.includes(text)
      ? lead.customer_name
      : [lead.customer_name, text].filter(Boolean).join(" ").trim();
    return;
  }
  const key = FIELD_ALIASES[raw];
  if (!key) return;
  if (!lead[key]) (lead[key] as string) = text;
}

export function leadFromSonaEvent(event: {
  callId?: string;
  fromPhone?: string;
  summary?: string[] | string | null;
  transcript?: string | null;
  jobs?: JobResult[] | null;
  language?: string;
}): AfterHoursLead {
  const lead = emptyLead();
  lead.call_recording_or_transcript_reference = event.callId || "";
  lead.phone = event.fromPhone || "";
  const summaryText = Array.isArray(event.summary)
    ? event.summary.join("\n")
    : event.summary || "";
  lead.customer_message_summary = summaryText;
  const jobNames = (event.jobs || []).map((job) => job.name || "").filter(Boolean);
  for (const job of event.jobs || []) {
    for (const row of job.result?.data || []) {
      if (row.name) applyField(lead, row.name, row.value);
    }
  }
  const jobs = classifyJobs({
    jobNames,
    transcript: `${summaryText}\n${event.transcript || ""}`,
    language: event.language || lead.language,
  });
  lead.jobs = jobs;
  lead.lead_type = primaryJob(jobs);
  if (jobs.includes(JOB_SPANISH)) lead.language = "es";
  if (jobs.includes(JOB_URGENT)) lead.urgency = "urgent";
  lead.tags = tagsForJobs(jobs, lead.service_type);
  lead.policy_flags = detectPolicyFlags(`${summaryText}\n${event.transcript || ""}`);
  return lead;
}

export function taskTitle(lead: AfterHoursLead): string {
  const bits = [lead.lead_type, lead.customer_name || lead.phone || "unknown caller"].filter(Boolean);
  return bits.join(" — ").slice(0, 120);
}

export function taskDescription(lead: AfterHoursLead): string {
  const rows: Array<[string, string]> = [
    ["lead_type", lead.lead_type],
    ["customer_name", lead.customer_name],
    ["phone", lead.phone],
    ["email", lead.email],
    ["preferred_contact_method", lead.preferred_contact_method],
    ["preferred_callback_time", lead.preferred_callback_time],
    ["service_type", lead.service_type],
    ["needs_toro_truck", lead.needs_toro_truck],
    ["move_date", lead.move_date],
    ["date_flexibility", lead.date_flexibility],
    ["pickup_city", lead.pickup_city],
    ["pickup_zip", lead.pickup_zip],
    ["pickup_location_type", lead.pickup_location_type],
    ["pickup_floor", lead.pickup_floor],
    ["pickup_access_notes", lead.pickup_access_notes],
    ["destination_city", lead.destination_city],
    ["destination_zip", lead.destination_zip],
    ["destination_location_type", lead.destination_location_type],
    ["destination_floor", lead.destination_floor],
    ["destination_access_notes", lead.destination_access_notes],
    ["move_size", lead.move_size],
    ["multiple_stops", lead.multiple_stops],
    ["special_items", lead.special_items],
    ["packing_needs", lead.packing_needs],
    ["language", lead.language],
    ["urgency", lead.urgency],
    ["existing_booking_reference", lead.existing_booking_reference],
    ["customer_message_summary", lead.customer_message_summary],
    ["call_recording_or_transcript_reference", lead.call_recording_or_transcript_reference],
    ["source", lead.source],
    ["after_hours", "true"],
    ["needs_team_review", "true"],
    ["tags", lead.tags.join(", ")],
    ["jobs", lead.jobs.join(", ")],
  ];
  return rows
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

export function telegramMessage(lead: AfterHoursLead): string {
  const title =
    lead.lead_type === JOB_URGENT
      ? "URGENT after-hours call — Toro Movers"
      : lead.lead_type === JOB_DAMAGE
        ? "SERVICE CONCERN after-hours — Toro Movers"
        : lead.lead_type === JOB_BOOKING
          ? "BOOKING CHANGE after-hours — Toro Movers"
          : "AFTER-HOURS quote — Toro Movers";
  return [
    title,
    `Tags: ${lead.tags.join(" · ")}`,
    lead.customer_name && `Name: ${lead.customer_name}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.email && `Email: ${lead.email}`,
    lead.service_type && `Service: ${lead.service_type}`,
    lead.move_date && `Move date: ${lead.move_date}`,
    (lead.pickup_city || lead.destination_city) &&
      `Route: ${[lead.pickup_city, lead.pickup_zip].filter(Boolean).join(" ")} → ${[lead.destination_city, lead.destination_zip].filter(Boolean).join(" ")}`,
    lead.move_size && `Size: ${lead.move_size}`,
    lead.special_items && `Special items: ${lead.special_items}`,
    lead.preferred_callback_time && `Callback: ${lead.preferred_callback_time}`,
    lead.customer_message_summary && `Summary: ${lead.customer_message_summary.slice(0, 800)}`,
    lead.call_recording_or_transcript_reference &&
      `Call: ${lead.call_recording_or_transcript_reference}`,
    "needs_team_review: true",
  ]
    .filter(Boolean)
    .join("\n");
}

export function missedCallSmsEnabled(): boolean {
  return process.env.OPENPHONE_MISSED_CALL_SMS === "true";
}

export function smsFollowUpAllowed(opts: {
  humanAnswered: boolean;
  sonaCompleted: boolean;
  spamOrBlocked: boolean;
  optedOut: boolean;
  alreadySent: boolean;
  enabled?: boolean;
}): { ok: boolean; reason: string } {
  if (!(opts.enabled ?? missedCallSmsEnabled())) {
    return { ok: false, reason: "disabled_pending_compliance" };
  }
  if (opts.humanAnswered) return { ok: false, reason: "human_answered" };
  if (opts.sonaCompleted) return { ok: false, reason: "sona_completed" };
  if (opts.spamOrBlocked) return { ok: false, reason: "spam_or_blocked" };
  if (opts.optedOut) return { ok: false, reason: "opted_out" };
  if (opts.alreadySent) return { ok: false, reason: "already_sent" };
  return { ok: true, reason: "allowed" };
}

export function looksLikeOptOut(text: string): boolean {
  return /^\s*(stop|stopall|unsubscribe|cancel|end|quit)\s*$/i.test(text.trim());
}

export function parseQuoEvent(body: Record<string, unknown>): {
  type: string;
  callId: string;
  fromPhone: string;
  conversationId: string;
  phoneNumberId: string;
  summary: string[] | string | null;
  jobs: JobResult[];
  handledByAi: boolean;
  humanAnswered: boolean;
  callStatus: string;
  messageText: string;
  direction: string;
} {
  const type = String(body.type || "");
  const data = (body.data || {}) as Record<string, unknown>;
  const resource = (data.resource || data.object || data) as Record<string, unknown>;
  const context = (data.context || {}) as Record<string, unknown>;
  const participants = (context.participants || {}) as Record<string, unknown>;
  const external = Array.isArray(participants.external) ? participants.external : [];
  const fromPhone =
    String(resource.fromPhoneNumber || resource.from || external[0] || "").trim();
  return {
    type,
    callId: String(resource.callId || resource.id || "").trim(),
    fromPhone,
    conversationId: String(context.conversationId || resource.conversationId || "").trim(),
    phoneNumberId: String(context.phoneNumberId || resource.phoneNumberId || "").trim(),
    summary: (resource.summary as string[] | string | null) || null,
    jobs: Array.isArray(resource.jobs) ? (resource.jobs as JobResult[]) : [],
    handledByAi:
      resource.handledByAiAgent === true ||
      resource.aiHandled === "ai-agent" ||
      String(resource.aiHandled || "").includes("ai"),
    humanAnswered: Boolean(resource.answeredByUserId || resource.answeredBy),
    callStatus: String(resource.status || resource.processingStatus || "").toLowerCase(),
    messageText: String(resource.text || resource.body || resource.content || "").trim(),
    direction: String(resource.direction || "").toLowerCase(),
  };
}
