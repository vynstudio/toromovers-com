import assert from "node:assert/strict";
import test from "node:test";
import {
  CARD_FEE_RATE,
  CUSTOM_TIP_MAX_USD,
  PAYMENT_KIND,
  PROCESSING_FEE_LABEL,
  balanceSummary,
  depositSummary,
  dollarsToCents,
  parsePaymentKind,
  remainingMoveBalanceCents,
  tipAmountCents,
} from "./payments.ts";
import {
  payloadToQuoteFields,
  payUrl,
  signQuotePayload,
  verifyQuoteToken,
  resolveQuoteInput,
} from "./quote-pay.ts";
import {
  PAY_ACCENT,
  PAY_DISPLAY_NAME,
  stripeCheckoutBranding,
  stripeCheckoutCustomText,
  stripeStatementSuffix,
} from "./pay-brand.ts";


test("fee label is exactly Processing Fee (3.5%)", () => {
  assert.equal(PROCESSING_FEE_LABEL, "Processing Fee (3.5%)");
  assert.equal(CARD_FEE_RATE, 0.035);
});

test("deposit defaults and limits", () => {
  assert.equal(PAYMENT_KIND.deposit.defaultUsd, 100);
  assert.equal(PAYMENT_KIND.deposit.minUsd, 25);
  assert.equal(PAYMENT_KIND.deposit.maxUsd, 5000);
  assert.deepEqual(PAYMENT_KIND.deposit.presetsUsd, [50, 100, 150, 250]);
});

test("full alias routes to remaining-balance", () => {
  assert.equal(parsePaymentKind("deposit"), "deposit");
  assert.equal(parsePaymentKind("balance"), "balance");
  assert.equal(parsePaymentKind("full"), "balance");
  assert.equal(parsePaymentKind("payment"), "balance");
  assert.equal(parsePaymentKind("tip"), "tip");
});

test("deposit $100 adds 3.5% processing fee", () => {
  const summary = depositSummary(dollarsToCents(100));
  assert.equal(summary.depositCents, 10000);
  assert.equal(summary.processingFeeCents, 350);
  assert.equal(summary.totalChargedCents, 10350);
});

test("deposit presets convert to Stripe cents", () => {
  for (const amount of [50, 100, 150, 250]) {
    const summary = depositSummary(dollarsToCents(amount));
    assert.equal(summary.depositCents, amount * 100);
    assert.equal(summary.processingFeeCents, Math.round(amount * 100 * 0.035));
    assert.equal(summary.totalChargedCents, summary.depositCents + summary.processingFeeCents);
  }
});

test("remaining balance credits deposit only, not the processing fee", () => {
  const quote = dollarsToCents(1560);
  const deposit = dollarsToCents(100);
  const feeOnDeposit = depositSummary(deposit).processingFeeCents;
  assert.equal(feeOnDeposit, 350);
  assert.equal(remainingMoveBalanceCents(quote, deposit), 146000);
  assert.notEqual(remainingMoveBalanceCents(quote, deposit + feeOnDeposit), 146000);
});

test("no deposit means remaining equals approved total", () => {
  const summary = balanceSummary({
    quoteTotalCents: dollarsToCents(1460),
    depositPaidCents: 0,
    tipType: "none",
  });
  assert.equal(summary.noDepositApplied, true);
  assert.equal(summary.remainingCents, 146000);
  assert.equal(summary.payable, true);
});

test("zero remaining is not payable", () => {
  const summary = balanceSummary({
    quoteTotalCents: dollarsToCents(100),
    depositPaidCents: dollarsToCents(100),
    tipType: "none",
  });
  assert.equal(summary.remainingCents, 0);
  assert.equal(summary.payable, false);
});

test("example remaining $1460 with 20% tip and 3.5% fee", () => {
  const remaining = dollarsToCents(1460);
  assert.equal(tipAmountCents(remaining, "none"), 0);
  assert.equal(tipAmountCents(remaining, "15_percent"), 21900);
  assert.equal(tipAmountCents(remaining, "20_percent"), 29200);
  assert.equal(tipAmountCents(remaining, "25_percent"), 36500);

  const summary = balanceSummary({
    quoteTotalCents: dollarsToCents(1560),
    depositPaidCents: dollarsToCents(100),
    tipType: "20_percent",
  });
  assert.equal(summary.remainingCents, 146000);
  assert.equal(summary.tipCents, 29200);
  assert.equal(summary.subtotalCents, 175200);
  assert.equal(summary.processingFeeCents, 6132);
  assert.equal(summary.totalChargedCents, 181332);
  assert.equal(summary.tipType, "20_percent");
  assert.equal(summary.tipPercentage, 20);
});

test("custom tip is used only when selected", () => {
  const remaining = dollarsToCents(1460);
  assert.equal(tipAmountCents(remaining, "none", 5000), 0);
  assert.equal(tipAmountCents(remaining, "custom", 4000), 4000);
  assert.equal(CUSTOM_TIP_MAX_USD, 5000);
});

test("signed quote token rejects tampering and unsigned totals", () => {
  const secret = "test-quote-secret";
  const token = signQuotePayload(
    {
      v: 1,
      quote_number: "Q-1042",
      customer_name: "Alex Rivera",
      quote_total_cents: 156000,
    },
    secret,
  );
  const verified = verifyQuoteToken(token, secret);
  assert.ok(verified);
  assert.equal(verified?.quote_number, "Q-1042");
  assert.equal(verified?.quote_total_cents, 156000);

  const tampered = token.slice(0, -2) + "aa";
  assert.equal(verifyQuoteToken(tampered, secret), null);
  assert.equal(verifyQuoteToken(token, "wrong-secret"), null);

  const resolved = resolveQuoteInput({
    token,
    quoteTotalUsd: 1,
    secret,
  });
  assert.equal(resolved.signed, true);
  assert.equal(resolved.quoteTotalCents, 156000);
  assert.equal(resolved.fields.quote_number, "Q-1042");
  assert.equal(payloadToQuoteFields(verified).customer_name, "Alex Rivera");
});

test("PDF pay URLs do not include raw amounts", () => {
  const deposit = payUrl("deposit", undefined, "Q-1042");
  const balance = payUrl("balance", "signed.token");
  assert.equal(deposit, "https://toromovers.com/pay?type=deposit&quote=Q-1042");
  assert.equal(balance, "https://toromovers.com/pay?type=balance&q=signed.token");
  assert.equal(deposit.includes("1560"), false);
  assert.equal(deposit.includes("sk_"), false);
});

test("embedded checkout branding is Toro red on Inter", () => {
  const branding = stripeCheckoutBranding();
  assert.equal(branding.button_color, PAY_ACCENT);
  assert.equal(PAY_ACCENT, "#E20613");
  assert.equal(branding.display_name, PAY_DISPLAY_NAME);
  assert.equal(branding.font_family, "inter");
  assert.equal(branding.border_style, "rounded");
  assert.equal(stripeStatementSuffix().length <= 22, true);
});

test("checkout button copy matches deposit vs remaining balance", () => {
  assert.equal(stripeCheckoutCustomText("deposit").submit.message, "Pay deposit");
  assert.equal(
    stripeCheckoutCustomText("balance").submit.message,
    "Pay remaining balance",
  );
  assert.match(stripeCheckoutCustomText("deposit").after_submit.message, /689/);
});

test("invalid quote token is unsigned so /pay can warn", () => {
  const resolved = resolveQuoteInput({
    token: "not.a.token",
    secret: "test-quote-secret",
  });
  assert.equal(resolved.signed, false);
  assert.equal(resolved.quoteTotalCents, null);
});

