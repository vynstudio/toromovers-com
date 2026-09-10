import type { Metadata } from "next";
import PayFlow from "@/components/pay/PayFlow";
import { PayShell } from "@/components/pay/PayShell";
import { runtimeEnv, stripePublishableKey } from "@/lib/env";
import { firstQueryValue, parsePayLink } from "@/lib/payments";

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
  const link = parsePayLink(params);
  const quoteToken = firstQueryValue(params.q);
  const quoteNumber =
    firstQueryValue(params.quote) || firstQueryValue(params.quote_number);
  const heading =
    link.kind === "tip"
      ? "Tip the Toro Movers crew."
      : link.kind === "balance"
        ? "Pay your remaining balance."
        : "Pay your move deposit.";
  const intro =
    link.kind === "tip"
      ? "Send a post-move tip to the crew. Card details stay on this page. Stripe processes the payment."
      : "Pay a deposit to hold your move date after payment succeeds, or pay the remaining balance. You can add an optional tip here. Card details stay on this page. Stripe processes the payment.";
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
            initialKind={link.kind}
            initialMode={link.mode}
            amountCents={link.amountCents}
            amountLocked={link.amountLocked}
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
