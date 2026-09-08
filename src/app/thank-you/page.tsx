import Link from "next/link";

export const metadata = { title: "Quote Request Received | Toro Movers" };

export default function ThankYouPage() {
  return <main className="grid min-h-screen place-items-center bg-zinc-950 px-5 text-white"><section className="max-w-xl rounded-3xl bg-white p-8 text-center text-zinc-950 shadow-2xl sm:p-12"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-black text-3xl text-white">✓</div><p className="mt-6 text-sm font-extrabold uppercase tracking-widest text-zinc-500">Toro Movers</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">We received your quote request.</h1><p className="mt-5 leading-7 text-zinc-600">A Toro Movers team member will review your move details and follow up shortly. If you need help now, call us directly.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center"><a href="tel:+13217580094" className="rounded-xl bg-black px-6 py-4 font-extrabold text-white">Call (321) 758-0094</a><Link href="/" className="rounded-xl border border-zinc-300 px-6 py-4 font-extrabold">Back to Toro Movers</Link></div></section></main>;
}
