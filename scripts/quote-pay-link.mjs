#!/usr/bin/env node
// Mint signed Toro Movers payment URLs for an approved quote PDF.
// Usage:
//   QUOTE_PAY_SECRET=... node scripts/quote-pay-link.mjs --quote Q-1042 --total 1560 --name "Alex Rivera"
import { createHmac } from "node:crypto";

function arg(name, fallback = "") {
  const index = process.argv.indexOf(`--${name}`);
  if (index === -1) return fallback;
  return process.argv[index + 1] || fallback;
}

function b64url(buf) {
  return Buffer.from(buf)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

const secret = process.env.QUOTE_PAY_SECRET || process.env.STRIPE_SECRET_KEY || "";
if (!secret) {
  console.error("Set QUOTE_PAY_SECRET or STRIPE_SECRET_KEY to sign quote payment links.");
  process.exit(1);
}

const totalUsd = Number.parseFloat(String(arg("total")).replace(/[$,]/g, ""));
const payload = { v: 1 };
if (arg("quote")) payload.quote_number = arg("quote");
if (arg("ref")) payload.move_reference = arg("ref");
if (arg("name")) payload.customer_name = arg("name");
if (arg("email")) payload.customer_email = arg("email");
if (arg("date")) payload.move_date = arg("date");
if (arg("pickup")) payload.pickup_address = arg("pickup");
if (arg("delivery")) payload.delivery_address = arg("delivery");
if (Number.isFinite(totalUsd) && totalUsd > 0) payload.quote_total_cents = Math.round(totalUsd * 100);

const json = JSON.stringify(payload);
const token = `${b64url(json)}.${b64url(createHmac("sha256", secret).update(json).digest())}`;
const encoded = encodeURIComponent(token);
console.log(`Pay Deposit: https://toromovers.com/pay?type=deposit&q=${encoded}`);
console.log(`Pay Remaining Balance: https://toromovers.com/pay?type=balance&q=${encoded}`);
