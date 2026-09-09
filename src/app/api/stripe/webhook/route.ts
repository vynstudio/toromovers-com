import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { formatUsd, getStripe } from "@/lib/stripe";
import { sendTelegram } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const secret = runtimeEnv("STRIPE_WEBHOOK_SECRET");
  if (!runtimeEnv("STRIPE_SECRET_KEY") || !secret) {
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
    if (session.payment_status && session.payment_status !== "paid") {
      return NextResponse.json({ received: true, ignored: "unpaid" });
    }
    const meta = session.metadata || {};
    const kind = meta.payment_type || meta.kind || "";
    if (kind === "deposit" || kind === "balance" || kind === "tip" || kind === "crew_tip") {
      const cents = session.amount_total || Number(meta.total_cents || meta.amount_cents || 0);
      const email = session.customer_details?.email || meta.customer_email || "unknown";
      const title =
        kind === "deposit"
          ? "DEPOSIT received — Toro Movers"
          : kind === "balance"
            ? "BALANCE received — Toro Movers"
            : "TIP received — Toro Movers";
      await sendTelegram(
        [
          title,
          `Amount charged: ${formatUsd(cents)}`,
          meta.quote_number ? `Quote: ${meta.quote_number}` : "",
          meta.move_reference ? `Move: ${meta.move_reference}` : "",
          `From: ${meta.customer_name || email}`,
          meta.customer_email ? `Email: ${meta.customer_email}` : "",
          meta.move_date ? `Move date: ${meta.move_date}` : "",
          kind === "deposit" && meta.deposit_amount ? `Deposit: $${meta.deposit_amount}` : "",
          kind === "balance" && meta.quote_total ? `Quote total: $${meta.quote_total}` : "",
          kind === "balance" && meta.deposit_credit ? `Deposit credit: $${meta.deposit_credit}` : "",
          kind === "balance" && meta.remaining_balance_before_tip
            ? `Remaining: $${meta.remaining_balance_before_tip}`
            : "",
          meta.tip_amount && meta.tip_amount !== "0.00" ? `Tip: $${meta.tip_amount}` : "",
          meta.processing_fee ? `Processing fee: $${meta.processing_fee}` : "",
          meta.customer_note ? `Note: ${meta.customer_note}` : "",
          `Session: ${session.id}`,
        ]
          .filter(Boolean)
          .join("\n"),
      );
    }
  }

  return NextResponse.json({ received: true });
}
