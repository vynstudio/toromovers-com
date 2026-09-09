import { NextResponse } from "next/server";
import { runtimeEnv } from "@/lib/env";
import { isPaymentKind } from "@/lib/payments";
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
  } | null;

  if (!isPaymentKind(body?.kind)) {
    return NextResponse.json({ error: "Choose deposit, payment, or tip." }, { status: 400 });
  }

  const amountUsd =
    typeof body?.amountUsd === "number"
      ? body.amountUsd
      : Number.parseFloat(String(body?.amountUsd ?? ""));
  const note = typeof body?.note === "string" ? body.note : "";

  try {
    const session = await createPaymentSession({
      kind: body.kind,
      amountUsd,
      note,
    });
    return NextResponse.json(session);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not start checkout.";
    if (message.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json(
        { error: "Stripe is not configured yet." },
        { status: 503 },
      );
    }
    const clientError =
      message.startsWith("Enter") || message.startsWith("Amount must");
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
