import { NextResponse } from "next/server";
import {
  TIP_MAX_CENTS,
  TIP_MIN_CENTS,
  dollarsToCents,
  getStripe,
  tipReturnUrl,
} from "@/lib/stripe";

function randomSuffix(): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  let out = "";
  for (let i = 0; i < 8; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export async function POST(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Stripe is not configured yet." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    amountUsd?: unknown;
    note?: unknown;
  } | null;

  const amountUsd =
    typeof body?.amountUsd === "number"
      ? body.amountUsd
      : Number.parseFloat(String(body?.amountUsd ?? ""));
  if (!Number.isFinite(amountUsd)) {
    return NextResponse.json({ error: "Enter a tip amount." }, { status: 400 });
  }

  const amountCents = dollarsToCents(amountUsd);
  if (amountCents < TIP_MIN_CENTS || amountCents > TIP_MAX_CENTS) {
    return NextResponse.json(
      { error: "Tip must be between $5 and $500." },
      { status: 400 },
    );
  }

  const note =
    typeof body?.note === "string" ? body.note.trim().slice(0, 200) : "";

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      mode: "payment",
      submit_type: "pay",
      integration_identifier: `toro-crew-tip-${randomSuffix()}`,
      return_url: tipReturnUrl(),
      customer_creation: "always",
      billing_address_collection: "auto",
      metadata: {
        kind: "crew_tip",
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
              name: "Tip for the Toro Movers crew",
              description: note || "Thank you for taking care of our move.",
            },
          },
        },
      ],
    });

    if (!session.client_secret) {
      return NextResponse.json(
        { error: "Could not start checkout." },
        { status: 500 },
      );
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.error("[tip/checkout]", err);
    return NextResponse.json(
      { error: "Could not start checkout. Please try again." },
      { status: 500 },
    );
  }
}
