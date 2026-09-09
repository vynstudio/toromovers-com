import Stripe from "stripe";
import { SITE_URL } from "@/lib/site";

export const TIP_MIN_CENTS = 500;
export const TIP_MAX_CENTS = 50_000;
export const TIP_PRESETS_USD = [10, 20, 40, 60] as const;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

export function tipReturnUrl(): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}/tip/thanks?session_id={CHECKOUT_SESSION_ID}`;
}

export function dollarsToCents(value: number): number {
  return Math.round(value * 100);
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
