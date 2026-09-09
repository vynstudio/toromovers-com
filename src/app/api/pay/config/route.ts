import { NextResponse } from "next/server";

/** Publishable key for Embedded Checkout. Read at runtime so Netlify rebuilds pick it up. */
export async function GET() {
  const publishableKey =
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    process.env.STRIPE_PUBLISHABLE_KEY ||
    "";
  return NextResponse.json({
    publishableKey,
    configured: Boolean(process.env.STRIPE_SECRET_KEY && publishableKey),
  });
}
