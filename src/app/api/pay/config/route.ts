import { NextResponse } from "next/server";
import { runtimeEnv, stripePublishableKey } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Publishable key for Embedded Checkout. Read at request time, not build time. */
export async function GET() {
  const publishableKey = stripePublishableKey();
  return NextResponse.json({
    publishableKey,
    configured: Boolean(runtimeEnv("STRIPE_SECRET_KEY") && publishableKey),
  });
}
