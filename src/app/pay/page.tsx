import type { Metadata } from "next";
import PayFlow from "@/components/pay/PayFlow";
import { stripePublishableKey } from "@/lib/env";
import { parsePaymentKind } from "@/lib/payments";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pay Toro Movers — deposit, balance, or tip",
  description:
    "Pay a move deposit, pay your balance in full, or tip the Toro Movers crew. Secure card checkout on toromovers.com.",
  alternates: { canonical: "/pay" },
};

export default async function PayPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialKind = parsePaymentKind(params.type || params.kind);
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
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Pay Toro Movers.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">
            Leave a deposit to hold your crew, pay the move in full, or tip after the job.
            You never leave this page.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8">
          <PayFlow initialKind={initialKind} publishableKey={stripePublishableKey()} />
        </div>
      </section>
    </main>
  );
}
