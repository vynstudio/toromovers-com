import assert from "node:assert/strict";
import test from "node:test";
import {
  JOB_BOOKING,
  JOB_DAMAGE,
  JOB_QUOTE,
  JOB_SPANISH,
  JOB_UNKNOWN,
  JOB_URGENT,
  MISSED_CALL_SMS,
  SONA_GREETING,
  SPANISH_ACKNOWLEDGMENT,
  TAG,
  detectPolicyFlags,
  leadFromSonaEvent,
  looksLikeOptOut,
  smsFollowUpAllowed,
  telegramMessage,
} from "./quo-after-hours.ts";

function job(name: string, data: Record<string, string>) {
  return {
    name,
    result: { data: Object.entries(data).map(([k, v]) => ({ name: k, value: v })) },
  };
}

test("greeting has no Sharon and stays on after-hours collection", () => {
  assert.equal(SONA_GREETING.includes("Sharon"), false);
  assert.match(SONA_GREETING, /currently away/);
  assert.match(SONA_GREETING, /first and last name/);
});

test("simple intake captures name, phone, and service or message", () => {
  const lead = leadFromSonaEvent({
    fromPhone: "+14075550111",
    jobs: [
      job("After-Hours Message Intake", {
        first_name: "Alex",
        last_name: "Rivera",
        phone: "+14075550111",
        service_or_message: "labor-only loading for a POD",
      }),
    ],
    summary: ["Caller left name, number, and a labor-only message."],
  });
  assert.equal(lead.customer_name, "Alex Rivera");
  assert.equal(lead.phone, "+14075550111");
  assert.match(lead.customer_message_summary, /labor-only/i);
});

test("1 full-service quote inquiry", () => {
  const lead = leadFromSonaEvent({
    callId: "ACfull1",
    fromPhone: "+14075550100",
    jobs: [
      job(JOB_QUOTE, {
        customer_name: "Alex Rivera",
        phone: "+14075550100",
        email: "alex@example.com",
        service_type: "full-service",
        needs_toro_truck: "yes",
        move_date: "2026-09-20",
        pickup_city: "Orlando",
        pickup_zip: "32801",
        destination_city: "Winter Park",
        destination_zip: "32789",
        move_size: "2 bedroom",
        pickup_access_notes: "elevator",
      }),
    ],
    summary: ["Caller wants a full-service move with a Toro truck."],
  });
  assert.equal(lead.lead_type, JOB_QUOTE);
  assert.ok(lead.tags.includes(TAG.quote));
  assert.ok(lead.tags.includes(TAG.fullService));
  assert.equal(lead.customer_name, "Alex Rivera");
  assert.equal(lead.pickup_city, "Orlando");
  assert.equal(lead.needs_team_review, true);
});

test("2 labor-only POD request", () => {
  const lead = leadFromSonaEvent({
    fromPhone: "+14075550101",
    jobs: [
      job(JOB_QUOTE, {
        service_type: "labor-only",
        needs_toro_truck: "no",
        pickup_city: "Kissimmee",
        destination_city: "POD / storage",
      }),
    ],
    summary: ["Labor-only help loading a customer-provided POD."],
  });
  assert.ok(lead.tags.includes(TAG.laborOnly));
  assert.equal(lead.needs_toro_truck, "no");
});

test("3 Spanish quote inquiry", () => {
  const lead = leadFromSonaEvent({
    language: "es",
    jobs: [job(JOB_SPANISH, { customer_name: "Maria", pickup_city: "Orlando" })],
    summary: ["Spanish-speaking caller requested a quote."],
  });
  assert.ok(lead.jobs.includes(JOB_SPANISH));
  assert.ok(lead.tags.includes(TAG.spanish));
  assert.equal(lead.language, "es");
  assert.match(SPANISH_ACKNOWLEDGMENT, /Gracias por comunicarse con Toro Movers/);
});

test("4 same-day urgent request is flagged, not promised", () => {
  const lead = leadFromSonaEvent({
    jobs: [job(JOB_URGENT, { move_date: "today", phone: "+14075550102" })],
    summary: ["Caller needs a move today. Availability must be confirmed by the team."],
  });
  assert.equal(lead.lead_type, JOB_URGENT);
  assert.equal(lead.urgency, "urgent");
  assert.ok(lead.tags.includes(TAG.urgent));
  assert.equal(detectPolicyFlags(lead.customer_message_summary).includes("availability_promise"), false);
});

test("5 exact price request does not invent a rate", () => {
  const lead = leadFromSonaEvent({
    jobs: [job(JOB_QUOTE, { service_type: "full-service" })],
    summary: ["Caller asked for an exact price. Sona said the team must review details before quoting."],
  });
  assert.deepEqual(lead.policy_flags, []);
});

test("6 crew available today is not confirmed", () => {
  const flags = detectPolicyFlags("You're booked. We will send a crew today.");
  assert.ok(flags.includes("availability_promise"));
});

test("7 booking cancellation routes to booking job", () => {
  const lead = leadFromSonaEvent({
    jobs: [job(JOB_BOOKING, { customer_name: "Sam", existing_booking_reference: "move Saturday" })],
    summary: ["Caller asked to cancel an existing booking."],
  });
  assert.equal(lead.lead_type, JOB_BOOKING);
  assert.ok(lead.tags.includes(TAG.booking));
});

test("8 damage report does not admit fault", () => {
  const lead = leadFromSonaEvent({
    jobs: [job(JOB_DAMAGE, { customer_message_summary: "dresser scratched" })],
    summary: ["Caller reported damage. Team will review. No fault admitted."],
  });
  assert.equal(lead.lead_type, JOB_DAMAGE);
  assert.ok(lead.tags.includes(TAG.concern));
  assert.equal(detectPolicyFlags(lead.customer_message_summary).includes("refund_or_fault"), false);
});

test("9 missed-call SMS stays disabled without compliance approval", () => {
  const gate = smsFollowUpAllowed({
    humanAnswered: false,
    sonaCompleted: false,
    spamOrBlocked: false,
    optedOut: false,
    alreadySent: false,
    enabled: false,
  });
  assert.equal(gate.ok, false);
  assert.equal(gate.reason, "disabled_pending_compliance");
  assert.match(MISSED_CALL_SMS, /Sorry we missed your call/);
});

test("10 opted-out caller never gets SMS", () => {
  assert.equal(looksLikeOptOut("STOP"), true);
  const gate = smsFollowUpAllowed({
    humanAnswered: false,
    sonaCompleted: false,
    spamOrBlocked: false,
    optedOut: true,
    alreadySent: false,
    enabled: true,
  });
  assert.equal(gate.ok, false);
  assert.equal(gate.reason, "opted_out");
});

test("11 unknown request still creates a team-review handoff", () => {
  const lead = leadFromSonaEvent({
    fromPhone: "+14075550109",
    summary: ["Caller asked something unclear and left a name and callback number."],
    jobs: [job(JOB_UNKNOWN, { customer_name: "Pat", phone: "+14075550109" })],
  });
  assert.equal(lead.lead_type, JOB_UNKNOWN);
  assert.ok(lead.tags.includes(TAG.afterHours));
  assert.match(telegramMessage(lead), /Phone: \+14075550109/);
});

test("12 human-answered business-hours call does not send missed-call SMS", () => {
  const gate = smsFollowUpAllowed({
    humanAnswered: true,
    sonaCompleted: false,
    spamOrBlocked: false,
    optedOut: false,
    alreadySent: false,
    enabled: true,
  });
  assert.equal(gate.ok, false);
  assert.equal(gate.reason, "human_answered");
});

test("Sona completed call does not also send missed-call SMS", () => {
  const gate = smsFollowUpAllowed({
    humanAnswered: false,
    sonaCompleted: true,
    spamOrBlocked: false,
    optedOut: false,
    alreadySent: false,
    enabled: true,
  });
  assert.equal(gate.reason, "sona_completed");
});
