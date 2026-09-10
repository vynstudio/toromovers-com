import Stripe from "stripe";
import { runtimeEnv, stripePublishableKey } from "@/lib/env";
import { PHONE_DISPLAY, SITE_URL } from "@/lib/site";
import {
  CUSTOM_TIP_MAX_USD,
  PAYMENT_KIND,
  PROCESSING_FEE_LABEL,
  balanceSummary,
  centsToDollarString,
  clipField,
  depositSummary,
  dollarsToCents,
  parseTipType,
  parseUsd,
  type PaymentKind,
  type QuoteFields,
  type TipType,
} from "@/lib/payments";
import { resolveQuoteInput } from "@/lib/quote-pay";
import {
  stripeCheckoutBranding,
  stripeCheckoutCustomText,
  stripeStatementSuffix,
} from "@/lib/pay-brand";

export { formatUsd } from "@/lib/payments";

const STRIPE_API_VERSION = "2026-08-26.dahlia" as const;

export function getStripe(): Stripe {
  const key = runtimeEnv("STRIPE_SECRET_KEY");
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  if (!key.startsWith("sk_live_") && !key.startsWith("rk_live_") && !key.startsWith("sk_test_") && !key.startsWith("rk_test_")) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key, { apiVersion: STRIPE_API_VERSION, typescript: true });
}

export function payReturnUrl(): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}/pay/thanks?session_id={CHECKOUT_SESSION_ID}`;
}

function randomSuffix(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < 8; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

function meta(values: Record<string, string | number | undefined | null>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue;
    const text = String(value).trim();
    if (!text) continue;
    out[key] = text.slice(0, 500);
  }
  return out;
}

function lineItem(name: string, unitAmount: number, description?: string) {
  return {
    quantity: 1,
    price_data: {
      currency: "usd" as const,
      unit_amount: unitAmount,
      product_data: description ? { name, description } : { name },
    },
  };
}

function depositCreditFromSession(session: Stripe.Checkout.Session): number {
  const type = session.metadata?.payment_type || session.metadata?.kind || "";
  if (type !== "deposit") return 0;
  if (session.payment_status && session.payment_status !== "paid") return 0;
  const amount = session.metadata?.deposit_amount;
  if (amount) {
    const usd = parseUsd(amount);
    if (Number.isFinite(usd) && usd > 0) return dollarsToCents(usd);
  }
  const cents = Number.parseInt(session.metadata?.amount_cents || "0", 10);
  return Number.isFinite(cents) && cents > 0 ? cents : 0;
}

function sessionMatchesQuote(
  session: Stripe.Checkout.Session,
  needle: string,
  reference: string,
): boolean {
  const metaQuote = clipField(session.metadata?.quote_number, 80);
  const metaRef = clipField(session.metadata?.move_reference, 80);
  return Boolean((needle && metaQuote === needle) || (reference && metaRef === reference));
}

const DEPOSIT_LOOKUP_PAGES = 20;

async function listDepositSessions(
  stripe: Stripe,
  needle: string,
  reference: string,
): Promise<Stripe.Checkout.Session[]> {
  const matches: Stripe.Checkout.Session[] = [];
  let startingAfter: string | undefined;
  for (let page = 0; page < DEPOSIT_LOOKUP_PAGES; page += 1) {
    const listed = await stripe.checkout.sessions.list({
      limit: 100,
      status: "complete",
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    for (const session of listed.data) {
      if (sessionMatchesQuote(session, needle, reference)) matches.push(session);
    }
    if (!listed.has_more) return matches;
    startingAfter = listed.data.at(-1)?.id;
    if (!startingAfter) return matches;
  }
  return matches;
}

/** Sum successful deposit amounts for a quote. Does not include Processing Fee (3.5%). Throws if Stripe is unreachable so remaining-balance checkout cannot silently skip a deposit credit. */
export async function lookupDepositCreditCents(
  quoteNumber: string,
  moveReference = "",
): Promise<number> {
  const needle = clipField(quoteNumber, 80);
  const reference = clipField(moveReference, 80);
  if (!needle && !reference) return 0;
  const stripe = getStripe();
  const sessions = await listDepositSessions(stripe, needle, reference);
  return sessions.reduce((sum, session) => sum + depositCreditFromSession(session), 0);
}

export type CreatePaymentInput = {
  kind: PaymentKind;
  amountUsd?: number;
  note?: string;
  quoteToken?: string;
  quote?: Partial<QuoteFields>;
  quoteTotalUsd?: unknown;
  tipType?: unknown;
  customTipUsd?: unknown;
};

type BuiltSession = {
  params: Stripe.Checkout.SessionCreateParams;
  kind: PaymentKind;
  fields: QuoteFields;
};

function quoteContext(input: CreatePaymentInput): {
  fields: QuoteFields;
  quoteTotalCents: number | null;
} {
  const note = clipField(input.note, 200);
  const resolved = resolveQuoteInput({
    token: typeof input.quoteToken === "string" ? input.quoteToken : "",
    fields: { ...input.quote, customer_note: note || input.quote?.customer_note },
    quoteTotalUsd: input.quoteTotalUsd,
  });
  const fields = resolved.fields;
  if (note && !fields.customer_note) fields.customer_note = note;
  return { fields, quoteTotalCents: resolved.quoteTotalCents };
}

async function buildDepositSession(input: CreatePaymentInput): Promise<BuiltSession> {
  const spec = PAYMENT_KIND.deposit;
  const amountUsd = parseUsd(input.amountUsd);
  if (!Number.isFinite(amountUsd)) throw new Error("Enter an amount.");
  if (amountUsd < spec.minUsd || amountUsd > spec.maxUsd) {
    throw new Error(
      `Amount must be between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`,
    );
  }
  const { fields } = quoteContext(input);
  const depositCents = dollarsToCents(amountUsd);
  const summary = depositSummary(depositCents);
  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "embedded_page",
    mode: "payment",
    submit_type: "pay",
    integration_identifier: `toro-deposit-${randomSuffix()}`,
    return_url: payReturnUrl(),
    customer_creation: "always",
    billing_address_collection: "auto",
    metadata: meta({
      kind: "deposit",
      payment_type: "deposit",
      deposit_amount: centsToDollarString(summary.depositCents),
      processing_fee: centsToDollarString(summary.processingFeeCents),
      total_charged: centsToDollarString(summary.totalChargedCents),
      quote_number: fields.quote_number,
      move_reference: fields.move_reference,
      customer_name: fields.customer_name,
      customer_email: fields.customer_email,
      move_date: fields.move_date,
      pickup_address: fields.pickup_address,
      delivery_address: fields.delivery_address,
      customer_note: fields.customer_note,
      amount_cents: summary.depositCents,
      fee_cents: summary.processingFeeCents,
      total_cents: summary.totalChargedCents,
    }),
    line_items: [
      lineItem(spec.productName, summary.depositCents, fields.customer_note || spec.label),
      ...(summary.processingFeeCents > 0
        ? [lineItem(PROCESSING_FEE_LABEL, summary.processingFeeCents)]
        : []),
    ],
  };
  if (fields.customer_email.includes("@")) params.customer_email = fields.customer_email;
  return { params, kind: "deposit", fields };
}

async function buildBalanceSession(input: CreatePaymentInput): Promise<BuiltSession> {
  const spec = PAYMENT_KIND.balance;
  const { fields, quoteTotalCents } = quoteContext(input);
  if (!quoteTotalCents || quoteTotalCents <= 0) {
    throw new Error("Enter the approved quote total.");
  }
  let depositCredit = 0;
  try {
    depositCredit = await lookupDepositCreditCents(fields.quote_number, fields.move_reference);
  } catch (err) {
    console.error("[stripe] deposit lookup for balance", err);
    throw new Error(`Could not verify the deposit on this quote. Call ${PHONE_DISPLAY}.`);
  }
  const tipType: TipType = parseTipType(input.tipType);
  const customTipUsd = parseUsd(input.customTipUsd);
  const customTipCents =
    tipType === "custom" && Number.isFinite(customTipUsd) ? dollarsToCents(customTipUsd) : 0;
  if (tipType === "custom") {
    if (!Number.isFinite(customTipUsd) || customTipUsd < 0) {
      throw new Error("Enter a custom tip of $0 or more.");
    }
    if (customTipUsd > CUSTOM_TIP_MAX_USD) {
      throw new Error(`Custom tip must be at most $${CUSTOM_TIP_MAX_USD.toLocaleString("en-US")}.`);
    }
  }
  const summary = balanceSummary({
    quoteTotalCents,
    depositPaidCents: depositCredit,
    tipType,
    customTipCents,
  });
  if (!summary.payable) {
    throw new Error("This move has no remaining balance.");
  }
  const remainingUsd = summary.remainingCents / 100;
  if (remainingUsd > spec.maxUsd) {
    throw new Error(
      `Amount must be between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`,
    );
  }
  if (summary.totalChargedCents > dollarsToCents(spec.maxUsd) + dollarsToCents(CUSTOM_TIP_MAX_USD)) {
    throw new Error("Amount is above the maximum supported for card checkout.");
  }
  const lineItems = [
    lineItem(spec.productName, summary.remainingCents, fields.quote_number || spec.label),
  ];
  if (summary.tipCents > 0) {
    lineItems.push(lineItem("Optional crew tip", summary.tipCents));
  }
  if (summary.processingFeeCents > 0) {
    lineItems.push(lineItem(PROCESSING_FEE_LABEL, summary.processingFeeCents));
  }
  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "embedded_page",
    mode: "payment",
    submit_type: "pay",
    integration_identifier: `toro-balance-${randomSuffix()}`,
    return_url: payReturnUrl(),
    customer_creation: "always",
    billing_address_collection: "auto",
    metadata: meta({
      kind: "balance",
      payment_type: "balance",
      quote_total: centsToDollarString(summary.quoteTotalCents),
      deposit_credit: centsToDollarString(summary.depositPaidCents),
      remaining_balance_before_tip: centsToDollarString(summary.remainingCents),
      tip_type: summary.tipType,
      tip_percentage: summary.tipPercentage ? String(summary.tipPercentage) : "0",
      tip_amount: centsToDollarString(summary.tipCents),
      processing_fee: centsToDollarString(summary.processingFeeCents),
      total_charged: centsToDollarString(summary.totalChargedCents),
      quote_number: fields.quote_number,
      move_reference: fields.move_reference,
      customer_name: fields.customer_name,
      customer_email: fields.customer_email,
      move_date: fields.move_date,
      pickup_address: fields.pickup_address,
      delivery_address: fields.delivery_address,
      customer_note: fields.customer_note,
      amount_cents: summary.remainingCents,
      fee_cents: summary.processingFeeCents,
      total_cents: summary.totalChargedCents,
    }),
    line_items: lineItems,
  };
  if (fields.customer_email.includes("@")) params.customer_email = fields.customer_email;
  return { params, kind: "balance", fields };
}

async function buildTipSession(input: CreatePaymentInput): Promise<BuiltSession> {
  const spec = PAYMENT_KIND.tip;
  const amountUsd = parseUsd(input.amountUsd);
  if (!Number.isFinite(amountUsd)) throw new Error("Enter an amount.");
  if (amountUsd < spec.minUsd || amountUsd > spec.maxUsd) {
    throw new Error(
      `Amount must be between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`,
    );
  }
  const { fields } = quoteContext(input);
  const tipCents = dollarsToCents(amountUsd);
  const summary = depositSummary(tipCents);
  const params: Stripe.Checkout.SessionCreateParams = {
    ui_mode: "embedded_page",
    mode: "payment",
    submit_type: "pay",
    integration_identifier: `toro-tip-${randomSuffix()}`,
    return_url: payReturnUrl(),
    customer_creation: "always",
    billing_address_collection: "auto",
    metadata: meta({
      kind: "tip",
      payment_type: "tip",
      tip_type: "custom",
      tip_percentage: "0",
      tip_amount: centsToDollarString(tipCents),
      processing_fee: centsToDollarString(summary.processingFeeCents),
      total_charged: centsToDollarString(summary.totalChargedCents),
      quote_number: fields.quote_number,
      move_reference: fields.move_reference,
      customer_name: fields.customer_name,
      customer_email: fields.customer_email,
      move_date: fields.move_date,
      pickup_address: fields.pickup_address,
      delivery_address: fields.delivery_address,
      customer_note: fields.customer_note,
      amount_cents: tipCents,
      fee_cents: summary.processingFeeCents,
      total_cents: summary.totalChargedCents,
    }),
    line_items: [
      lineItem(spec.productName, tipCents, fields.customer_note || spec.label),
      ...(summary.processingFeeCents > 0
        ? [lineItem(PROCESSING_FEE_LABEL, summary.processingFeeCents)]
        : []),
    ],
  };
  if (fields.customer_email.includes("@")) params.customer_email = fields.customer_email;
  return { params, kind: "tip", fields };
}

function sessionPresentation(
  kind: PaymentKind,
  fields: QuoteFields,
): Pick<
  Stripe.Checkout.SessionCreateParams,
  "locale" | "branding_settings" | "custom_text" | "payment_intent_data" | "client_reference_id"
> {
  const spec = PAYMENT_KIND[kind];
  const who = fields.quote_number
    ? `${spec.shortLabel} ${fields.quote_number}`
    : spec.productName;
  return {
    locale: "en",
    branding_settings: stripeCheckoutBranding(),
    custom_text: stripeCheckoutCustomText(kind),
    payment_intent_data: {
      description: clipField(`Toro Movers — ${who}`, 1000),
      statement_descriptor_suffix: stripeStatementSuffix(),
    },
    client_reference_id:
      clipField(fields.quote_number || fields.move_reference, 200) || undefined,
  };
}

async function createEmbeddedSession(built: BuiltSession): Promise<Stripe.Checkout.Session> {
  // Stripe API 2026-08-26.dahlia rejects ui_mode=embedded. Use embedded_page.
  const session = await getStripe().checkout.sessions.create({
    ...built.params,
    ...sessionPresentation(built.kind, built.fields),
    ui_mode: "embedded_page",
  });
  if (!session.client_secret) {
    throw new Error("Could not start checkout.");
  }
  return session;
}

export async function createPaymentSession(
  input: CreatePaymentInput,
): Promise<{ clientSecret: string; publishableKey: string }> {
  const built =
    input.kind === "deposit"
      ? await buildDepositSession(input)
      : input.kind === "balance"
        ? await buildBalanceSession(input)
        : await buildTipSession(input);
  const session = await createEmbeddedSession(built);
  if (!session.client_secret) {
    throw new Error("Could not start checkout.");
  }
  return {
    clientSecret: session.client_secret,
    publishableKey: stripePublishableKey(),
  };
}
