import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!runtimeEnv("STRIPE_SECRET_KEY")) {
    return NextResponse.json(
      { error: "Stripe is not configured yet." },
      { status: 503 },
    );
  }

  const sessionId = new URL(req.url).searchParams.get("session_id") || "";
  if (!sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Missing session." }, { status: 400 });
  }

  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);
    const metadata = session.metadata || {};
    return NextResponse.json({
      status: session.status,
      kind: metadata.payment_type || metadata.kind || null,
      payment_type: metadata.payment_type || metadata.kind || null,
      amount_total: session.amount_total,
      customer_email: session.customer_details?.email || metadata.customer_email || null,
      payment_status: session.payment_status,
      quote_number: metadata.quote_number || null,
      total_charged: metadata.total_charged || null,
      customer_name: metadata.customer_name || null,
    });
  } catch (err) {
    console.error("[pay/status]", err);
    return NextResponse.json({ error: "Could not load payment." }, { status: 500 });
  }
}
