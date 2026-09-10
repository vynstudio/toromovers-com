import assert from "node:assert/strict";
import test from "node:test";
import {
  FUNNEL_ACCENT,
  FUNNEL_ESPANOL,
  FUNNEL_INK,
} from "./funnel-offer.ts";
import {
  buildLeadConfirmationEmail,
  formatResendError,
  parseBareEmail,
  resendSender,
} from "./lead-email.ts";

test("parseBareEmail unwraps quotes and display names", () => {
  assert.equal(parseBareEmail("hello@toromovers.com"), "hello@toromovers.com");
  assert.equal(
    parseBareEmail('  "hello@toromovers.com"  '),
    "hello@toromovers.com",
  );
  assert.equal(
    parseBareEmail("Toro Movers <hello@toromovers.com>"),
    "hello@toromovers.com",
  );
  assert.equal(parseBareEmail("not-an-email"), null);
});

test("resendSender never double-wraps from and uses a bare reply_to", () => {
  const prev = process.env.RESEND_FROM_EMAIL;
  process.env.RESEND_FROM_EMAIL = "Toro Movers <hello@toromovers.com>";
  try {
    const sender = resendSender();
    assert.ok(sender);
    assert.equal(sender.from, "Toro Movers <hello@toromovers.com>");
    assert.equal(sender.replyTo, "hello@toromovers.com");
    assert.equal(sender.from.includes("<Toro Movers"), false);
  } finally {
    if (prev === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = prev;
  }
});

test("formatResendError explains domain verification and invalid from", () => {
  assert.match(
    formatResendError(
      422,
      JSON.stringify({
        message: "The toromovers.com domain is not verified. Please, add and verify your domain.",
        name: "validation_error",
      }),
    ),
    /domain not verified/,
  );
  assert.match(
    formatResendError(
      422,
      JSON.stringify({
        message:
          "Invalid `from` field. The email address needs to follow the email@example.com or Name <email@example.com> format.",
        name: "validation_error",
      }),
    ),
    /invalid from/,
  );
});

test("confirmation email is branded and does not claim licensed or insured", () => {
  const copy = buildLeadConfirmationEmail({
    name: "Ada Perez",
    serviceType: "Full-Service Move",
    city: "32801",
    moveDate: "2026-09-18",
  });
  assert.match(copy.subject, /Toro Movers/);
  assert.match(copy.html, new RegExp(FUNNEL_INK, "i"));
  assert.match(copy.html, new RegExp(FUNNEL_ACCENT, "i"));
  assert.match(copy.html, /15 minutes/);
  assert.match(copy.html, /689/);
  assert.match(copy.html, new RegExp(FUNNEL_ESPANOL));
  assert.match(copy.html, /Full-Service Move/);
  assert.match(copy.text, /15 minutes/);
  assert.doesNotMatch(copy.html, /licensed/i);
  assert.doesNotMatch(copy.html, /insured/i);
  assert.doesNotMatch(copy.text, /licensed/i);
  assert.doesNotMatch(copy.text, /insured/i);
});
