import UniversalLeadForm, { type ServiceType } from "@/components/funnel/UniversalLeadForm";

type SearchParams = Record<string, string | string[] | undefined>;

const aliases: Record<string, ServiceType> = {
  "full-service": "full_service_move",
  full_service: "full_service_move",
  full_service_move: "full_service_move",
  "labor-only": "labor_only",
  labor_only: "labor_only",
  "same-building": "same_building_move",
  same_building: "same_building_move",
  same_building_move: "same_building_move",
  "special-item": "special_item_move",
  special_item: "special_item_move",
  special_item_move: "special_item_move",
  pod: "pod_storage_container",
  container: "pod_storage_container",
  "pod-storage-container": "pod_storage_container",
  pod_storage_container: "pod_storage_container",
  uhaul: "rental_truck_labor",
  "u-haul": "rental_truck_labor",
  "rental-truck": "rental_truck_labor",
  rental_truck: "rental_truck_labor",
  rental_truck_labor: "rental_truck_labor",
  "single-item": "single_item_move",
  single_item: "single_item_move",
  single_item_move: "single_item_move",
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function resolveService(searchParams: SearchParams): ServiceType | undefined {
  const value = firstValue(searchParams.service) || firstValue(searchParams.servicetype);
  if (!value) return undefined;
  return aliases[value.trim().toLowerCase()];
}

export const metadata = {
  title: "Get Your Free Moving Quote | Toro Movers",
  description: "Choose the moving help you need and request a free quote from Toro Movers.",
  alternates: { canonical: "/get-my-price" },
};

export default function GetMyPricePage({ searchParams }: { searchParams: SearchParams }) {
  const initialService = resolveService(searchParams);
  return <main className="min-h-screen bg-zinc-50 text-zinc-950">
    <header className="border-b border-zinc-200 bg-white"><div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4"><a href="/" className="text-lg font-black tracking-tight">TORO MOVERS</a><a className="font-bold underline underline-offset-4" href="tel:+13217580094">Call (321) 758-0094</a></div></header>
    <section className="mx-auto max-w-3xl px-5 py-10 sm:py-16"><div className="mb-8 text-center"><p className="text-sm font-extrabold uppercase tracking-widest text-zinc-500">Central Florida moving help</p><h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl">Get your free moving quote.</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-600">Tell us what kind of help you need, add a few move details, and Toro Movers will help you plan the next step.</p></div><UniversalLeadForm source="get_my_price" initialService={initialService} /></section>
  </main>;
}
