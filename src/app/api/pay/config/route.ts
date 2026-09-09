import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Publishable key for Embedded Checkout. Read at request time, not build time. */
export async function GET() {
  const publishableKey = runtimeEnv(
    "STRIPE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  );
  return NextResponse.json({
    publishableKey,
    configured: Boolean(runtimeEnv("STRIPE_SECRET_KEY") && publishableKey),
  });
}
