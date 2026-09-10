import type { Metadata } from "next";
import PayFlow from "@/components/pay/PayFlow";
import { PayShell } from "@/components/pay/PayShell";
import { runtimeEnv, stripePublishableKey } from "@/lib/env";
import { parsePaymentKind } from "@/lib/payments";

export const metadata: Metadata = {
  title: "Pay Toro Movers — deposit or remaining balance",
  description:
    "Pay a move deposit or the remaining balance after your deposit. Secure card checkout on toromovers.com.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/pay" },
};

export const dynamic = "force-dynamic";

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialKind = parsePaymentKind(params.type || params.kind);
  const quoteToken = Array.isArray(params.q) ? params.q[0] : params.q || "";
  const quoteNumber = Array.isArray(params.quote)
    ? params.quote[0]
    : params.quote ||
      (Array.isArray(params.quote_number) ? params.quote_number[0] : params.quote_number) ||
      "";
  const heading =
    initialKind === "tip"
      ? "Tip the Toro Movers crew."
      : initialKind === "balance"
        ? "Pay your remaining balance."
        : "Pay your move deposit.";
  const intro =
    initialKind === "tip"
      ? "Send a post-move tip to the crew. Card details stay on this page."
      : "Pay a deposit to hold your move date after payment succeeds, or pay the remaining balance. Card details stay on this page.";
  const checkoutReady = Boolean(runtimeEnv("STRIPE_SECRET_KEY") && stripePublishableKey());
  return (
    <PayShell>
      <section className="pay-main">
        <div className="pay-intro">
          <p className="pay-kicker">Secure checkout</p>
          <h1>{heading}</h1>
          <p className="pay-lede">{intro}</p>
        </div>
        <div className="pay-card">
          <PayFlow
            initialKind={initialKind}
            publishableKey={stripePublishableKey()}
            quoteToken={quoteToken}
            quoteNumber={quoteNumber}
            checkoutReady={checkoutReady}
          />
        </div>
      </section>
    </PayShell>
  );
}
