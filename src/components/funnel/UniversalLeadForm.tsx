"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/analytics";
import {
  resolveServiceParam,
  type ServiceType,
} from "@/lib/funnel-service";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import { PHONE_DISPLAY } from "@/lib/site";

export type { ServiceType };

const services: Array<{
  value: ServiceType;
  title: string;
  description: string;
  image: string;
  alt: string;
}> = [
  {
    value: "full_service_move",
    title: "Full-Service Move",
    description: "Truck + professional movers included",
    image: "/images/services/full-service-move.webp",
    alt: "Two movers loading a sofa into a moving truck",
  },
  {
    value: "labor_only",
    title: "Labor Only",
    description: "Loading, unloading, or moving help",
    image: "/images/services/labor-only.webp",
    alt: "Mover stacking boxes in a truck while another pushes a hand truck",
  },
  {
    value: "same_building_move",
    title: "Same-Building Move",
    description: "Moving within one building or complex",
    image: "/images/services/same-building-move.webp",
    alt: "Two movers carrying a dresser toward an elevator",
  },
  {
    value: "special_item_move",
    title: "Special Item Move",
    description: "Piano, safe, appliance, or heavy furniture",
    image: "/images/services/special-item-move.webp",
    alt: "Two movers rolling a strapped piano on a dolly",
  },
  {
    value: "pod_storage_container",
    title: "POD / Storage Container",
    description: "Load or unload a POD or container",
    image: "/images/services/pod-storage-container.webp",
    alt: "Mover loading boxes into a portable storage container",
  },
  {
    value: "rental_truck_labor",
    title: "U-Haul / Rental Truck",
    description: "You provide the truck; we provide the movers",
    image: "/images/services/rental-truck-move.webp",
    alt: "Two movers loading a dresser into a rental truck",
  },
  {
    value: "single_item_move",
    title: "Single-Item Move",
    description: "One item, furniture pickup, or a small move",
    image: "/images/services/single-item-move.webp",
    alt: "One mover carrying a couch from a house to the curb",
  },
];

const choices: Record<ServiceType, string[]> = {
  full_service_move: ["Studio", "1 bedroom", "2 bedrooms", "3 bedrooms", "4+ bedrooms", "Office / commercial"],
  labor_only: ["Loading only", "Unloading only", "Loading + unloading", "In-home moving"],
  same_building_move: ["Studio", "1 bedroom", "2 bedrooms", "3+ bedrooms", "Office / commercial"],
  special_item_move: ["Piano", "Safe", "Large furniture", "Appliance", "Exercise equipment", "Other"],
  pod_storage_container: ["Load container", "Unload container", "Load + unload"],
  rental_truck_labor: ["Load rental truck", "Unload rental truck", "Load + unload"],
  single_item_move: ["Couch / sectional", "Bed / mattress", "Dining set", "Appliance", "Desk / office furniture", "Other"],
};

function isServiceType(value: string | undefined): value is ServiceType {
  return Boolean(value && services.some((item) => item.value === value));
}

function ChoiceGrid({ options, value, onChange }: { options: string[]; value: string; onChange: (next: string) => void }) {
  return <div className="grid gap-3 sm:grid-cols-2">{options.map((option) => <button type="button" key={option} onClick={() => onChange(option)} className={`rounded-xl border p-4 text-left font-semibold transition ${value === option ? "border-black bg-black text-white" : "border-zinc-200 bg-white hover:border-zinc-500"}`}>{option}</button>)}</div>;
}

export default function UniversalLeadForm({ source = "ads_landing_page", initialService }: { source?: string; initialService?: string }) {
  const resolvedInitialService = isServiceType(initialService) ? initialService : "";
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | "">(resolvedInitialService);
  const [detail, setDetail] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [access, setAccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(() => services.find((item) => item.value === service), [service]);

  useEffect(() => {
    captureAttribution();
    trackFunnelEvent("form_start", {
      form_location: source,
      service_type: resolvedInitialService || undefined,
    });
  }, [resolvedInitialService, source]);

  useEffect(() => {
    if (resolvedInitialService) return;
    const params = new URLSearchParams(window.location.search);
    const fromUrl =
      resolveServiceParam(params.get("service") || undefined) ||
      resolveServiceParam(params.get("servicetype") || undefined);
    if (fromUrl) setService(fromUrl);
  }, [resolvedInitialService]);

  function chooseService(next: ServiceType) {
    setService(next);
    setDetail("");
    trackFunnelEvent("service_type_selected", { service_type: next, form_location: source });
    window.setTimeout(() => setStep(2), 250);
  }

  function completeStep(next: number, stepName: string) {
    setError("");
    trackFunnelEvent("form_step_complete", { step_name: stepName, service_type: service, form_location: source });
    setStep(next);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const phoneE164 = normalizeUsPhone(phone);
    if (!service || !name.trim() || !email.trim() || !phoneE164 || !consent) {
      setError("Please enter your name, a valid mobile number, email address, and consent before continuing.");
      return;
    }
    setSubmitting(true);
    setError("");
    const payload = {
      service_type: service,
      service_label: selectedService?.title || "",
      service_details: { primary_detail: detail, move_date: moveDate, origin, destination, access_conditions: access, notes },
      contact: { full_name: name.trim(), email: email.trim(), phone_e164: phoneE164, sms_call_consent: consent },
      attribution: getAttribution(),
      form_location: source,
    };
    try {
      const response = await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Lead submission failed");
      const result = await response.json().catch(() => ({}));
      trackFunnelEvent("generate_lead", { service_type: service, form_location: source, lead_id: result.lead_id || result.id || undefined });
      window.location.assign("/thank-you");
    } catch {
      setError(`We could not submit your request. Please call ${PHONE_DISPLAY} and our team will help right away.`);
      setSubmitting(false);
    }
  }

  const progress = Math.round((step / 4) * 100);
  return <section id="quote-form" className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8">
    <div className="mb-6 flex items-center justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-widest text-zinc-500">Free moving quote</p><h2 className="mt-1 text-2xl font-black tracking-tight">{step === 1 ? (selectedService ? `Your move: ${selectedService.title}` : "What kind of moving help do you need?") : step === 2 ? "Tell us about the move" : step === 3 ? "Where and when are you moving?" : "How can we reach you?"}</h2></div><span className="text-sm font-bold text-zinc-500">Step {step} of 4</span></div>
    <div className="mb-7 h-2 overflow-hidden rounded-full bg-zinc-100"><div className="h-full rounded-full bg-black transition-all" style={{ width: `${progress}%` }} /></div>
    {step === 1 && <div><p className="mb-4 text-sm text-zinc-600">{selectedService ? "We selected this based on your link. Choose another option if needed." : "Choose the option that best matches the help you need."}</p><div className="grid gap-3">{services.map((item) => <button type="button" key={item.value} onClick={() => chooseService(item.value)} className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition sm:gap-4 sm:p-4 ${service === item.value ? "border-black bg-zinc-100" : "border-zinc-200 hover:border-black hover:bg-zinc-50"}`}><span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100 sm:h-[4.5rem] sm:w-[4.5rem]"><Image src={item.image} alt={item.alt} fill sizes="72px" className="object-contain" /></span><span><span className="block font-extrabold">{item.title}</span><span className="mt-0.5 block text-sm text-zinc-600">{item.description}</span></span></button>)}</div>{service && <button type="button" onClick={() => completeStep(2, "service_selected")} className="mt-5 w-full rounded-xl bg-black px-5 py-3 font-bold text-white">Continue with {selectedService?.title}</button>}</div>}
    {step === 2 && service && <div><p className="mb-4 text-sm text-zinc-600">Choose the option that best describes your move.</p><ChoiceGrid options={choices[service]} value={detail} onChange={setDetail} /><label className="mt-5 block text-sm font-bold">Anything else we should know?<textarea value={notes} onChange={(event) => setNotes(event.target.value)} className="mt-2 min-h-24 w-full rounded-xl border border-zinc-300 p-3 font-normal" placeholder="Add details about items, access, or your move." /></label><div className="mt-5 flex gap-3"><button type="button" onClick={() => setStep(1)} className="rounded-xl px-5 py-3 font-bold">Back</button><button type="button" disabled={!detail} onClick={() => completeStep(3, "service_details")} className="flex-1 rounded-xl bg-black px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continue</button></div></div>}
    {step === 3 && <div className="space-y-4"><label className="block text-sm font-bold">When are you moving?<input type="date" value={moveDate} onChange={(event) => setMoveDate(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" /></label><label className="block text-sm font-bold">Moving from (address or ZIP)<input value={origin} onChange={(event) => setOrigin(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" placeholder="Pickup address or ZIP" /></label><label className="block text-sm font-bold">Moving to (address or ZIP)<input value={destination} onChange={(event) => setDestination(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" placeholder="Destination address or ZIP" /></label><label className="block text-sm font-bold">Access details<select value={access} onChange={(event) => setAccess(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"><option value="">Select one</option><option>Ground floor</option><option>Stairs</option><option>Elevator</option><option>Long carry</option><option>Not sure</option></select></label><div className="flex gap-3"><button type="button" onClick={() => setStep(2)} className="rounded-xl px-5 py-3 font-bold">Back</button><button type="button" disabled={!moveDate || !origin} onClick={() => completeStep(4, "move_logistics")} className="flex-1 rounded-xl bg-black px-5 py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-40">Continue</button></div></div>}
    {step === 4 && <form onSubmit={submit} className="space-y-4"><label className="block text-sm font-bold">Full name<input required value={name} onChange={(event) => setName(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" autoComplete="name" /></label><label className="block text-sm font-bold">Mobile phone<input required inputMode="tel" value={phone} onChange={(event) => setPhone(formatUsPhone(event.target.value))} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" placeholder="(689) 600-2720" autoComplete="tel" /></label><label className="block text-sm font-bold">Email address<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal" autoComplete="email" /></label><label className="flex items-start gap-3 text-sm text-zinc-700"><input required checked={consent} onChange={(event) => setConsent(event.target.checked)} type="checkbox" className="mt-1 h-4 w-4" /><span>I agree to receive calls and texts from Toro Movers about my quote. Reply STOP to opt out.</span></label>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}<div className="flex gap-3"><button type="button" onClick={() => setStep(3)} className="rounded-xl px-5 py-3 font-bold">Back</button><button disabled={submitting} type="submit" className="flex-1 rounded-xl bg-black px-5 py-3 font-bold text-white disabled:opacity-50">{submitting ? "Sending request…" : "Get My Free Quote"}</button></div><p className="text-center text-xs text-zinc-500">Usually responds in minutes.</p></form>}
  </section>;
}
