import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { remainingMoveBalanceCents } from "@/lib/payments";
import { resolveQuoteInput } from "@/lib/quote-pay";
import { lookupDepositCreditCents } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("q") || url.searchParams.get("token") || "";
  const quoteNumber = url.searchParams.get("quote") || url.searchParams.get("quote_number") || "";
  const resolved = resolveQuoteInput({
    token,
    fields: { quote_number: quoteNumber },
  });
  const needle = resolved.fields.quote_number;
  let depositPaidCents = 0;
  if (needle && runtimeEnv("STRIPE_SECRET_KEY")) {
    try {
      depositPaidCents = await lookupDepositCreditCents(
        needle,
        resolved.fields.move_reference,
      );
    } catch (err) {
      console.error("[pay/quote] deposit lookup", err);
    }
  }
  const remainingCents =
    resolved.quoteTotalCents != null
      ? remainingMoveBalanceCents(resolved.quoteTotalCents, depositPaidCents)
      : null;
  return NextResponse.json({
    quote: resolved.fields,
    quoteTotalCents: resolved.quoteTotalCents,
    signed: resolved.signed,
    depositPaidCents,
    remainingCents,
    noDepositApplied: depositPaidCents <= 0,
  });
}
