import UniversalLeadForm from "@/components/funnel/UniversalLeadForm";
import { resolveServiceParam } from "@/lib/funnel-service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Get Your Free Moving Quote | Toro Movers",
  description: "Choose the moving help you need and request a free quote from Toro Movers.",
  alternates: { canonical: "/get-my-price" },
};

export default async function GetMyPricePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialService =
    resolveServiceParam(params.service) || resolveServiceParam(params.servicetype);
  return <main className="min-h-screen bg-zinc-50 text-zinc-950">
    <header className="border-b border-zinc-200 bg-white"><div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4"><a href="/" className="text-lg font-black tracking-tight">TORO MOVERS</a><a className="font-bold underline underline-offset-4" href="tel:+13217580094">Call (321) 758-0094</a></div></header>
    <section className="mx-auto max-w-3xl px-5 py-10 sm:py-16"><div className="mb-8 text-center"><p className="text-sm font-extrabold uppercase tracking-widest text-zinc-500">Central Florida moving help</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Get your free moving quote.</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">Tell us what kind of help you need, add a few move details, and Toro Movers will help you plan the next step.</p></div><UniversalLeadForm source="get_my_price" initialService={initialService} /></section>
  </main>;
}
