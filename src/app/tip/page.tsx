import type { Metadata } from "next";
import TipFlow from "@/components/tip/TipFlow";

export const metadata: Metadata = {
  title: "Tip the Toro Movers crew",
  description:
    "Say thank you to your Toro Movers crew with a secure card tip. Stays on toromovers.com.",
  alternates: { canonical: "/tip" },
};

export default function TipPage() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
          <a href="/" className="text-lg font-black tracking-tight">
            TORO MOVERS
          </a>
          <a className="font-bold underline underline-offset-4" href="tel:+13217580094">
            Call (321) 758-0094
          </a>
        </div>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-10 sm:py-16">
        <div className="mb-8 text-center">
          <p className="text-sm font-extrabold uppercase tracking-widest text-zinc-500">
            After your move
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">
            Tip the crew.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">
            100% goes to Toro Movers for your crew. Pay on this page — you never leave
            toromovers.com.
          </p>
        </div>
        <div className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8">
          <TipFlow />
        </div>
      </section>
    </main>
  );
}
