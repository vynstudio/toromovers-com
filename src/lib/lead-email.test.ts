import assert from "node:assert/strict";
import test from "node:test";
import {
  FUNNEL_ACCENT,
  FUNNEL_ESPANOL,
} from "./funnel-offer.ts";
import {
  LEAD_EMAIL_BULL_PNG,
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

test("resendSender uses RESEND_FROM_EMAIL as-is for .net or .com and does not guess", () => {
  const prev = process.env.RESEND_FROM_EMAIL;
  try {
    process.env.RESEND_FROM_EMAIL = "hello@toromovers.net";
    const net = resendSender();
    assert.equal(net?.from, "Toro Movers <hello@toromovers.net>");
    assert.equal(net?.replyTo, "hello@toromovers.net");

    process.env.RESEND_FROM_EMAIL = "hello@toromovers.com";
    const com = resendSender();
    assert.equal(com?.from, "Toro Movers <hello@toromovers.com>");
    assert.equal(com?.replyTo, "hello@toromovers.com");

    delete process.env.RESEND_FROM_EMAIL;
    assert.equal(resendSender(), null);
  } finally {
    if (prev === undefined) delete process.env.RESEND_FROM_EMAIL;
    else process.env.RESEND_FROM_EMAIL = prev;
  }
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
    /RESEND_FROM_EMAIL must match a verified Resend domain/,
  );
  assert.match(
    formatResendError(
      422,
      JSON.stringify({
        message: "The toromovers.com domain is not verified. Please, add and verify your domain.",
        name: "validation_error",
      }),
    ),
    /hello@toromovers\.com/,
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
  assert.match(copy.html, /#E20613/);
  assert.doesNotMatch(copy.html, /#E10600/i);
  assert.doesNotMatch(copy.html, /#e10600/);
  assert.doesNotMatch(copy.html, /:hover/i);
  assert.match(copy.html, /15 minutes/);
  assert.match(copy.html, /Mon–Sat/);
  assert.match(copy.html, /7am–7pm/);
  assert.match(copy.html, /689/);
  assert.match(copy.html, new RegExp(FUNNEL_ESPANOL));
  assert.match(copy.html, /Bilingual/);
  assert.match(copy.html, /Full-Service Move/);
  assert.match(copy.text, /15 minutes/);
  assert.doesNotMatch(copy.html, /licensed/i);
  assert.doesNotMatch(copy.html, /insured/i);
  assert.doesNotMatch(copy.text, /licensed/i);
  assert.doesNotMatch(copy.text, /insured/i);
});

test("confirmation email uses a light header, black TORO, hosted bull PNG, tables, bgcolor, Arial", () => {
  const copy = buildLeadConfirmationEmail({ name: "Ada Perez" });
  assert.match(copy.html, /bgcolor="#ffffff"/i);
  assert.match(copy.html, /bgcolor="#f4f4f5"/i);
  assert.match(copy.html, new RegExp(`bgcolor="${FUNNEL_ACCENT}"`, "i"));
  assert.match(copy.html, /font-family:Arial/i);
  assert.match(copy.html, /role="presentation"/);
  assert.match(copy.html, /https:\/\/toromovers\.com\/logos\/toro-bull-black\.png/);
  assert.equal(LEAD_EMAIL_BULL_PNG, "https://toromovers.com/logos/toro-bull-black.png");
  assert.match(
    copy.html,
    /color:#0A0A0A;[\s\S]{0,80}TORO <span style="color:#E20613;">MOVERS<\/span>/,
  );
  // Dark header + white TORO is invisible in iCloud — must not ship.
  assert.doesNotMatch(copy.html, /bgcolor="#0A0A0A"/i);
  assert.doesNotMatch(
    copy.html,
    /color:#ffffff[^>]*>\s*TORO\s+<span/i,
  );
});
