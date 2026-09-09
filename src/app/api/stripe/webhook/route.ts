import { NextResponse } from "next/server";
import { formatUsd, getStripe } from "@/lib/stripe";
import { sendTelegram } from "@/lib/notify";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!process.env.STRIPE_SECRET_KEY || !secret) {
    return NextResponse.json({ error: "webhook_unconfigured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing_signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch (err) {
    console.error("[stripe/webhook] signature", err);
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const kind = session.metadata?.kind || "";
    if (kind === "deposit" || kind === "balance" || kind === "tip" || kind === "crew_tip") {
      const cents = session.amount_total || Number(session.metadata?.amount_cents || 0);
      const note = session.metadata?.note || "";
      const email = session.customer_details?.email || "unknown";
      const title =
        kind === "deposit"
          ? "DEPOSIT received — Toro Movers"
          : kind === "balance"
            ? "PAYMENT received — Toro Movers"
            : "TIP received — Toro Movers";
      await sendTelegram(
        [
          title,
          `Amount: ${formatUsd(cents)}`,
          `From: ${email}`,
          note ? `Note: ${note}` : "",
          `Session: ${session.id}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  }

  return NextResponse.json({ received: true });
}
