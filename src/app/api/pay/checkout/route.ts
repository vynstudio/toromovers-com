import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { isPaymentKind, mergeQuoteFields } from "@/lib/payments";
import { createPaymentSession } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!runtimeEnv("STRIPE_SECRET_KEY")) {
    return NextResponse.json(
      { error: "Stripe is not configured yet." },
      { status: 503 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    kind?: unknown;
    amountUsd?: unknown;
    note?: unknown;
    quoteToken?: unknown;
    quoteNumber?: unknown;
    moveReference?: unknown;
    customerName?: unknown;
    customerEmail?: unknown;
    moveDate?: unknown;
    pickupAddress?: unknown;
    deliveryAddress?: unknown;
    quoteTotalUsd?: unknown;
    tipType?: unknown;
    customTipUsd?: unknown;
  } | null;

  if (!isPaymentKind(body?.kind)) {
    return NextResponse.json(
      { error: "Choose deposit, remaining balance, or tip." },
      { status: 400 },
    );
  }

  const amountUsd =
    typeof body?.amountUsd === "number"
      ? body.amountUsd
      : Number.parseFloat(String(body?.amountUsd ?? ""));
  const note = typeof body?.note === "string" ? body.note : "";
  const quote = mergeQuoteFields({
    quote_number: typeof body?.quoteNumber === "string" ? body.quoteNumber : "",
    move_reference: typeof body?.moveReference === "string" ? body.moveReference : "",
    customer_name: typeof body?.customerName === "string" ? body.customerName : "",
    customer_email: typeof body?.customerEmail === "string" ? body.customerEmail : "",
    move_date: typeof body?.moveDate === "string" ? body.moveDate : "",
    pickup_address: typeof body?.pickupAddress === "string" ? body.pickupAddress : "",
    delivery_address: typeof body?.deliveryAddress === "string" ? body.deliveryAddress : "",
    customer_note: note,
  });

  try {
    const session = await createPaymentSession({
      kind: body.kind,
      amountUsd,
      note,
      quoteToken: typeof body?.quoteToken === "string" ? body.quoteToken : "",
      quote,
      quoteTotalUsd: body?.quoteTotalUsd,
      tipType: body?.tipType,
      customTipUsd: body?.customTipUsd,
    });
    return NextResponse.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    const stripeType =
      err && typeof err === "object" && "type" in err ? String(err.type) : "";
    if (
      message.includes("STRIPE_SECRET_KEY") ||
      message.includes("Invalid API Key") ||
      stripeType === "StripeAuthenticationError"
    ) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 503 },
      );
    }
    const clientError =
      message.startsWith("Enter") ||
      message.startsWith("Amount") ||
      message.startsWith("Custom tip") ||
      message.startsWith("This move") ||
      message.startsWith("Choose") ||
      message.startsWith("Could not verify");
    if (!clientError) {
      const extra =
        err && typeof err === "object"
          ? {
              type: "type" in err ? err.type : undefined,
              code: "code" in err ? err.code : undefined,
              param: "param" in err ? err.param : undefined,
            }
          : {};
      console.error("[pay/checkout]", message, extra);
    }
    return NextResponse.json(
      { error: clientError ? message : "Could not start checkout. Please try again." },
      { status: clientError ? 400 : 500 },
    );
  }
}
