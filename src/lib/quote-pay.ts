import { createHmac, timingSafeEqual } from "node:crypto";
import {
  clipField,
  dollarsToCents,
  mergeQuoteFields,
  parseUsd,
  type QuoteFields,
} from "./payments.ts";

export type SignedQuotePayload = {
  v: 1;
  quote_number?: string;
  move_reference?: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  move_date?: string;
  pickup_address?: string;
  delivery_address?: string;
  quote_total_cents?: number;
};

export type ResolvedQuote = {
  fields: QuoteFields;
  quoteTotalCents: number | null;
  signed: boolean;
};

function b64url(buf: Buffer | string): string {
  const base = Buffer.isBuffer(buf) ? buf : Buffer.from(buf);
  return base
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function fromB64url(value: string): Buffer {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  return Buffer.from(padded, "base64");
}

export function quotePaySecret(): string {
  const secret = process.env.QUOTE_PAY_SECRET || process.env.STRIPE_SECRET_KEY || "";
  return secret.trim();
}

function hmac(secret: string, payload: string): Buffer {
  return createHmac("sha256", secret).update(payload).digest();
}

export function signQuotePayload(
  payload: SignedQuotePayload,
  secret = quotePaySecret(),
): string {
  if (!secret) throw new Error("QUOTE_PAY_SECRET is not set");
  const body: SignedQuotePayload = { v: 1 };
  if (payload.quote_number) body.quote_number = clipField(payload.quote_number, 80);
  if (payload.move_reference) body.move_reference = clipField(payload.move_reference, 80);
  if (payload.customer_name) body.customer_name = clipField(payload.customer_name, 120);
  if (payload.customer_email) body.customer_email = clipField(payload.customer_email, 180);
  if (payload.customer_phone) body.customer_phone = clipField(payload.customer_phone, 40);
  if (payload.move_date) body.move_date = clipField(payload.move_date, 80);
  if (payload.pickup_address) body.pickup_address = clipField(payload.pickup_address, 180);
  if (payload.delivery_address) body.delivery_address = clipField(payload.delivery_address, 180);
  if (
    typeof payload.quote_total_cents === "number" &&
    Number.isFinite(payload.quote_total_cents) &&
    payload.quote_total_cents > 0
  ) {
    body.quote_total_cents = Math.round(payload.quote_total_cents);
  }
  const json = JSON.stringify(body);
  return `${b64url(json)}.${b64url(hmac(secret, json))}`;
}

export function verifyQuoteToken(
  token: string,
  secret = quotePaySecret(),
): SignedQuotePayload | null {
  if (!token || !secret) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [bodyB64, sigB64] = parts;
  let json: string;
  let actual: Buffer;
  let expected: Buffer;
  try {
    json = fromB64url(bodyB64).toString("utf8");
    actual = fromB64url(sigB64);
    expected = hmac(secret, json);
  } catch {
    return null;
  }
  if (actual.length !== expected.length) return null;
  if (!timingSafeEqual(actual, expected)) return null;
  try {
    const parsed = JSON.parse(json) as SignedQuotePayload;
    if (parsed.v !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function payloadToQuoteFields(payload: SignedQuotePayload | null): QuoteFields {
  if (!payload) return mergeQuoteFields();
  return mergeQuoteFields({
    quote_number: payload.quote_number,
    move_reference: payload.move_reference,
    customer_name: payload.customer_name,
    customer_email: payload.customer_email,
    customer_phone: payload.customer_phone,
    move_date: payload.move_date,
    pickup_address: payload.pickup_address,
    delivery_address: payload.delivery_address,
  });
}

export function resolveQuoteInput(opts: {
  token?: string;
  fields?: Partial<QuoteFields>;
  quoteTotalUsd?: unknown;
  secret?: string;
}): ResolvedQuote {
  const signed = opts.token ? verifyQuoteToken(opts.token, opts.secret) : null;
  const fields = mergeQuoteFields(payloadToQuoteFields(signed), opts.fields);
  let quoteTotalCents: number | null = null;
  if (signed && typeof signed.quote_total_cents === "number" && signed.quote_total_cents > 0) {
    quoteTotalCents = Math.round(signed.quote_total_cents);
  } else {
    const usd = parseUsd(opts.quoteTotalUsd);
    if (Number.isFinite(usd) && usd > 0) quoteTotalCents = dollarsToCents(usd);
  }
  return { fields, quoteTotalCents, signed: Boolean(signed) };
}

export function payUrl(kind: "deposit" | "balance", token?: string, quoteNumber?: string): string {
  const base = "https://toromovers.com/pay";
  const params = new URLSearchParams();
  params.set("type", kind);
  if (token) params.set("q", token);
  else if (quoteNumber) params.set("quote", quoteNumber);
  return `${base}?${params.toString()}`;
}
