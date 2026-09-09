import Stripe from "stripe";
import { SITE_URL } from "@/lib/site";
import { PAYMENT_KIND, type PaymentKind } from "@/lib/payments";

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(key);
}

export function payReturnUrl(): string {
  const base = SITE_URL.replace(/\/$/, "");
  return `${base}/pay/thanks?session_id={CHECKOUT_SESSION_ID}`;
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

function randomSuffix(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < 8; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export async function createPaymentSession(opts: {
  kind: PaymentKind;
  amountUsd: number;
  note?: string;
}): Promise<{ clientSecret: string }> {
  const spec = PAYMENT_KIND[opts.kind];
  if (!Number.isFinite(opts.amountUsd)) {
    throw new Error("Enter an amount.");
  }
  if (opts.amountUsd < spec.minUsd || opts.amountUsd > spec.maxUsd) {
    throw new Error(
      `Amount must be between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`,
    );
  }
  const amountCents = dollarsToCents(opts.amountUsd);
  const note = (opts.note || "").trim().slice(0, 200);
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "payment",
    submit_type: "pay",
    integration_identifier: `toro-${opts.kind}-${randomSuffix()}`,
    return_url: payReturnUrl(),
    customer_creation: "always",
    billing_address_collection: "auto",
    metadata: {
      kind: opts.kind,
      amount_cents: String(amountCents),
      note,
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amountCents,
          product_data: {
            name: spec.productName,
            description: note || spec.label,
          },
        },
      },
    ],
  });
  if (!session.client_secret) {
    throw new Error("Could not start checkout.");
  }
  return { clientSecret: session.client_secret };
}
