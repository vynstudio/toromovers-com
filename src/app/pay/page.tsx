import type { Metadata } from "next";
import PayFlow from "@/components/pay/PayFlow";
import { stripePublishableKey } from "@/lib/env";
import { parsePaymentKind } from "@/lib/payments";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pay Toro Movers — deposit or remaining balance",
  description:
    "Pay a move deposit or the remaining balance after your deposit. Secure card checkout on toromovers.com.",
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
    : params.quote || (Array.isArray(params.quote_number) ? params.quote_number[0] : params.quote_number) || "";
  const heading =
    initialKind === "tip"
      ? "Tip the Toro Movers crew."
      : initialKind === "balance"
        ? "Pay your remaining balance."
        : "Pay your move deposit.";
  const intro =
    initialKind === "tip"
      ? "Send a post-move tip to the crew. You never leave this page."
      : "Pay a deposit to hold your move date after payment succeeds, or pay the remaining balance. You never leave this page.";
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="text-lg font-black tracking-tight">
            TORO MOVERS
          </a>
          <a className="font-bold underline underline-offset-4" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-extrabold uppercase tracking-widest text-zinc-500">
            Secure checkout
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">{heading}</h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">{intro}</p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8">
          <PayFlow
            initialKind={initialKind}
            publishableKey={stripePublishableKey()}
            quoteToken={quoteToken}
            quoteNumber={quoteNumber}
          />
        </div>
      </section>
    </main>
  );
}
