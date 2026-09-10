import type { Metadata } from "next";
import Link from "next/link";
import { ToroLockup } from "@/components/funnel/ToroLockup";
import { FUNNEL_SLA } from "@/lib/funnel-offer";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote request received",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-5 text-[#0A0A0A]">
      <section className="max-w-xl rounded-3xl bg-white p-8 text-center shadow-2xl ring-1 ring-black/5 sm:p-12">
        <div className="flex justify-center">
          <ToroLockup href={null} size="sm" />
        </div>
        <div
          className="mx-auto mt-6 grid h-16 w-16 place-items-center rounded-full bg-[#E20613] text-3xl text-white"
          aria-hidden
        >
          ✓
        </div>
        <h1 className="mt-6 text-3xl font-black tracking-tight sm:text-4xl">
          We received your quote request.
        </h1>
        <p className="mt-5 leading-7 text-zinc-600">{FUNNEL_SLA}.</p>
        <p className="mt-2 text-sm font-medium text-zinc-500">
          If you need help now, call us directly.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a
            href={PHONE_TEL}
            className="rounded-xl bg-[#E20613] px-6 py-4 font-extrabold text-white transition hover:bg-[#B80510]"
          >
            Call {PHONE_DISPLAY}
          </a>
          <Link
            href="/"
            className="rounded-xl border border-zinc-300 px-6 py-4 font-extrabold"
          >
            Back to Toro Movers
          </Link>
        </div>
      </section>
    </main>
  );
}
