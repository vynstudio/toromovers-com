import type { Metadata } from "next";
import UniversalLeadForm from "@/components/funnel/UniversalLeadForm";
import { ToroLockup } from "@/components/funnel/ToroLockup";
import { resolveServiceParam } from "@/lib/funnel-service";
import {
  FUNNEL_CTA,
  FUNNEL_FLOOR_RATE,
  FUNNEL_LOCAL_NOTE,
  FUNNEL_RATE_NOTE,
  FUNNEL_SLA,
  FUNNEL_TRUST_CHIPS,
} from "@/lib/funnel-offer";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Get my free moving quote",
  description:
    "Get a free local moving quote from Toro Movers. From $75/mover/hour. Central Florida only. Call (689) 600-2720.",
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
  alternates: { canonical: "/get-my-price" },
};

export default async function GetMyPricePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialService =
    resolveServiceParam(params.service) ||
    resolveServiceParam(params.servicetype);

  return (
    <main className="min-h-screen bg-white text-[#0A0A0A]">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-3xl flex-col gap-2.5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-3.5">
          <ToroLockup size="sm" className="shrink-0" />
          <a
            className="inline-flex min-h-12 w-full shrink-0 items-center justify-center rounded-xl bg-[#E20613] px-4 py-2.5 text-sm font-extrabold whitespace-nowrap text-white transition hover:bg-[#B80510] sm:min-h-0 sm:w-auto"
            href={PHONE_TEL}
          >
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-5 py-10 sm:py-14">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Local moving {FUNNEL_FLOOR_RATE}.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-lg font-semibold text-[#0A0A0A]">
            {FUNNEL_CTA}.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm font-medium text-zinc-600">
            {FUNNEL_RATE_NOTE}
          </p>
          <ul className="mx-auto mt-5 flex max-w-2xl flex-wrap items-center justify-center gap-2">
            {FUNNEL_TRUST_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full bg-[#FCE6E8] px-3 py-1.5 text-xs font-bold text-[#0A0A0A] sm:text-sm"
              >
                {chip}
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-zinc-600">
            {FUNNEL_SLA}.
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
            {FUNNEL_LOCAL_NOTE}
          </p>
        </div>
        <UniversalLeadForm
          source="get_my_price"
          initialService={initialService}
        />
      </section>
    </main>
  );
}
