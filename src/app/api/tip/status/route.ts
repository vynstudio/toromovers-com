import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: Request) {
  if (!process.env.STRIPE_SECRET_KEY) {
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
    return NextResponse.json({
      status: session.status,
      amount_total: session.amount_total,
      customer_email: session.customer_details?.email || null,
      payment_status: session.payment_status,
    });
  } catch (err) {
    console.error("[tip/status]", err);
    return NextResponse.json({ error: "Could not load payment." }, { status: 500 });
  }
}
