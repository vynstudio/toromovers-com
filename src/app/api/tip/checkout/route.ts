import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { createPaymentSession } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** @deprecated Use POST /api/pay/checkout with kind=tip */
export async function POST(req: Request) {
  if (!runtimeEnv("STRIPE_SECRET_KEY")) {
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
  try {
    const session = await createPaymentSession({
      kind: "tip",
      amountUsd,
      note: typeof body?.note === "string" ? body.note : "",
    });
    return NextResponse.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
