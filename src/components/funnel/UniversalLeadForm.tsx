"use client";

import { AddressAutocomplete } from "@/components/address-autocomplete";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/analytics";
import { fireBrowserLead, mintEventId } from "@/lib/meta-pixel";
import {
  resolveServiceParam,
  type ServiceType,
} from "@/lib/funnel-service";
import {
  FUNNEL_BILINGUAL,
  FUNNEL_CTA,
  FUNNEL_SLA,
} from "@/lib/funnel-offer";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import { isUsableLocation } from "@/lib/fl-zip-cities";
import {
  milesBetween,
  stopFields,
  type SelectedPlace,
} from "@/lib/selected-place";

export type { ServiceType };

const primaryBtn =
  "lp-submit px-5 py-3 font-bold disabled:cursor-not-allowed disabled:opacity-40";
const selectedCard = "is-on border-[#DB1A1A] bg-[#FFF6F6]";
const idleCard =
  "border-[#F0DEDE] bg-white hover:border-[#DB1A1A] hover:bg-[#FFF6F6]";

const services: Array<{
  value: ServiceType;
  /** Sent as service_label. Do not change. */
  title: string;
  /** Visible name. Falls back to title. */
  display?: string;
  description: string;
}> = [
  {
    value: "house_2plus_move",
    title: "House — 2+ rooms",
    display: "House, 2+ rooms",
    description: "Full-service house move, 2 rooms or more",
  },
  {
    value: "apartment_2plus_move",
    title: "Apartment — 2+ rooms",
    display: "Apartment, 2+ rooms",
    description: "Apt or condo move, 2 rooms or more",
  },
  {
    value: "long_distance_move",
    title: "Long-distance / interstate",
    description: "Out of area and out of state",
  },
  {
    value: "full_service_move",
    title: "Full-Service Move",
    description: "Crew for the whole move, from load to unload",
  },
  {
    value: "labor_only",
    title: "Labor Only",
    description: "Loading, unloading, or moving help",
  },
  {
    value: "same_building_move",
    title: "Same-Building Move",
    description: "Moving within one building or complex",
  },
  {
    value: "special_item_move",
    title: "Special Item Move",
    description: "Piano, safe, appliance, or heavy furniture",
  },
  {
    value: "pod_storage_container",
    title: "POD / Storage Container",
    description: "Load or unload a POD or container",
  },
  {
    value: "rental_truck_labor",
    title: "U-Haul / Rental Truck",
    description: "You provide the truck. We provide the movers.",
  },
  {
    value: "single_item_move",
    title: "Single-Item Move",
    description: "One item, furniture pickup, or a small move",
  },
];

const choices: Record<ServiceType, string[]> = {
  house_2plus_move: ["2 bedrooms", "3 bedrooms", "4+ bedrooms"],
  apartment_2plus_move: ["2 bedrooms", "3 bedrooms", "3+ bedrooms"],
  long_distance_move: ["Within Florida", "Out of state", "Not sure yet"],
  full_service_move: [
    "Studio",
    "1 bedroom",
    "2 bedrooms",
    "3 bedrooms",
    "4+ bedrooms",
    "Office / commercial",
  ],
  labor_only: [
    "Loading only",
    "Unloading only",
    "Loading + unloading",
    "In-home moving",
  ],
  same_building_move: [
    "Studio",
    "1 bedroom",
    "2 bedrooms",
    "3+ bedrooms",
    "Office / commercial",
  ],
  special_item_move: [
    "Piano",
    "Safe",
    "Large furniture",
    "Appliance",
    "Exercise equipment",
    "Other",
  ],
  pod_storage_container: ["Load container", "Unload container", "Load + unload"],
  rental_truck_labor: [
    "Load rental truck",
    "Unload rental truck",
    "Load + unload",
  ],
  single_item_move: [
    "Couch / sectional",
    "Bed / mattress",
    "Dining set",
    "Appliance",
    "Desk / office furniture",
    "Other",
  ],
};

function serviceName(item: { title: string; display?: string }) {
  return item.display || item.title;
}

function isServiceType(value: string | undefined): value is ServiceType {
  return Boolean(value && services.some((item) => item.value === value));
}

function ChoiceGrid({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {options.map((option) => (
        <button
          type="button"
          key={option}
          onClick={() => onChange(option)}
          className={`rounded-xl border p-4 text-left font-semibold transition ${
            value === option ? `${selectedCard} text-[#0A0A0A]` : idleCard
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function UniversalLeadForm({
  source = "ads_landing_page",
  initialService,
}: {
  source?: string;
  initialService?: string;
}) {
  const resolvedInitialService = isServiceType(initialService)
    ? initialService
    : "";
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceType | "">(
    resolvedInitialService,
  );
  const [detail, setDetail] = useState("");
  const [moveDate, setMoveDate] = useState("");
  const [originText, setOriginText] = useState("");
  const [destinationText, setDestinationText] = useState("");
  const [origin, setOrigin] = useState<SelectedPlace | null>(null);
  const [destination, setDestination] = useState<SelectedPlace | null>(null);
  const [access, setAccess] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(
    () => services.find((item) => item.value === service),
    [service],
  );

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
    trackFunnelEvent("service_type_selected", {
      service_type: next,
      form_location: source,
    });
    window.setTimeout(() => setStep(2), 250);
  }

  function completeStep(next: number, stepName: string) {
    if (stepName === "move_logistics") {
      if (!isUsableLocation(originText)) {
        setError("Enter the pickup street address, city, or ZIP code.");
        return;
      }
    }
    setError("");
    trackFunnelEvent("form_step_complete", {
      step_name: stepName,
      service_type: service,
      form_location: source,
    });
    setStep(next);
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const phoneE164 = normalizeUsPhone(phone);
    if (!isUsableLocation(originText)) {
      setError("Enter the pickup street address, city, or ZIP code.");
      return;
    }
    if (!service || !name.trim() || !email.trim() || !phoneE164 || !consent) {
      setError(
        "Please enter your name, a valid mobile number, email address, and consent before continuing.",
      );
      return;
    }
    setSubmitting(true);
    setError("");
    const eventId = mintEventId();
    const payload = {
      service_type: service,
      service_label: selectedService?.title || "",
      service_details: {
        primary_detail: detail,
        move_date: moveDate,
        ...stopFields("origin", origin, originText),
        ...stopFields("destination", destination, destinationText),
        access_conditions: access,
        notes,
      },
      contact: {
        full_name: name.trim(),
        email: email.trim(),
        phone_e164: phoneE164,
        sms_call_consent: consent,
      },
      attribution: { ...getAttribution(), event_id: eventId },
      form_location: source,
    };
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const failure = (await response.clone().json().catch(() => ({}))) as {
        error?: string;
      };
      if (failure.error === "full_address_required") {
        setError("Enter the pickup street address, city, or ZIP code.");
        setSubmitting(false);
        return;
      }
      if (!response.ok) throw new Error("Lead submission failed");
      const result = await response.json().catch(() => ({}));
      fireBrowserLead(eventId, source, {
        service_type: service,
        form_location: source,
        lead_id: result.lead_id || result.id || undefined,
        pickup_selected: Boolean(origin),
        dropoff_selected: Boolean(destination),
        distance_miles: milesBetween(origin, destination),
      });
      window.location.assign("/thank-you");
    } catch {
      setError(
        "We could not submit your request. Please call 321-234-0510 and our team will help right away.",
      );
      setSubmitting(false);
    }
  }

  const progress = Math.round((step / 4) * 100);
  const stepTitle =
    step === 1
      ? selectedService
        ? `Your move: ${serviceName(selectedService)}`
        : "What kind of moving help do you need?"
      : step === 2
        ? "Tell us about the move"
        : step === 3
          ? "Where and when are you moving?"
          : "How can we reach you?";

  return (
    <section
      id="quote-form"
      className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#E20613]">
            {FUNNEL_CTA}
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight">{stepTitle}</h2>
        </div>
        <span className="text-sm font-bold text-zinc-500">Step {step} of 4</span>
      </div>
      <div className="mb-7 h-2 overflow-hidden rounded-full bg-[#FCE6E8]">
        <div
          className="h-full rounded-full bg-[#E20613] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      {step === 1 && (
        <div>
          <p className="mb-4 text-sm text-zinc-600">
            {selectedService
              ? "We selected this based on your link. Choose another option if needed."
              : "Choose the option that best matches the help you need."}
          </p>
          <div className="grid gap-3">
            {services.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => chooseService(item.value)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition sm:gap-4 sm:p-4 ${
                  service === item.value ? selectedCard : idleCard
                }`}
              >
                <span>
                  <span className="block font-extrabold">{serviceName(item)}</span>
                  <span className="mt-0.5 block text-sm text-zinc-600">
                    {item.description}
                  </span>
                </span>
              </button>
            ))}
          </div>
          {service && (
            <button
              type="button"
              onClick={() => completeStep(2, "service_selected")}
              className={`mt-5 w-full ${primaryBtn}`}
            >
              Continue with {selectedService ? serviceName(selectedService) : ""}
            </button>
          )}
        </div>
      )}
      {step === 2 && service && (
        <div>
          <p className="mb-4 text-sm text-zinc-600">
            Choose the option that best describes your move.
          </p>
          <ChoiceGrid
            options={choices[service]}
            value={detail}
            onChange={setDetail}
          />
          <label className="mt-5 block text-sm font-bold">
            Anything else we should know?
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="mt-2 min-h-24 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              placeholder="Add details about items, access, or your move."
            />
          </label>
          <div className="mt-5 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-xl px-5 py-3 font-bold"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!detail}
              onClick={() => completeStep(3, "service_details")}
              className={`flex-1 ${primaryBtn}`}
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="space-y-4">
          <p className="text-sm text-zinc-600">
            Local Central Florida, long-distance, and interstate. Request a
            quote for the job you have.
          </p>
          <label className="block text-sm font-bold">
            When are you moving?
            <input
              type="date"
              value={moveDate}
              onChange={(event) => setMoveDate(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Pickup address
            <AddressAutocomplete
              value={originText}
              onChange={(next) => {
                setOriginText(next);
                setOrigin((current) => (current?.line === next ? current : null));
                if (error) setError("");
              }}
              onSelect={(place) => {
                setOrigin(place);
                setOriginText(place.line);
                trackFunnelEvent("address_selected", {
                  form_location: source,
                  field: "pickup",
                });
                if (error) setError("");
              }}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              placeholder="Street, city, or ZIP"
              ariaLabel="Pickup address"
              autoComplete="off"
              flexible
            />
          </label>
          <label className="block text-sm font-bold">
            Drop-off address
            <AddressAutocomplete
              value={destinationText}
              onChange={(next) => {
                setDestinationText(next);
                setDestination((current) =>
                  current?.line === next ? current : null,
                );
                if (error) setError("");
              }}
              onSelect={(place) => {
                setDestination(place);
                setDestinationText(place.line);
                trackFunnelEvent("address_selected", {
                  form_location: source,
                  field: "dropoff",
                });
                if (error) setError("");
              }}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              placeholder="Street, city, or ZIP"
              ariaLabel="Drop-off address"
              autoComplete="off"
              flexible
            />
          </label>
          <label className="block text-sm font-bold">
            Access details
            <select
              value={access}
              onChange={(event) => setAccess(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            >
              <option value="">Select one</option>
              <option>Ground floor</option>
              <option>Stairs</option>
              <option>Elevator</option>
              <option>Long carry</option>
              <option>Not sure</option>
            </select>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-xl px-5 py-3 font-bold"
            >
              Back
            </button>
            <button
              type="button"
              disabled={!moveDate}
              onClick={() => completeStep(4, "move_logistics")}
              className={`flex-1 ${primaryBtn}`}
            >
              Continue
            </button>
          </div>
          {error ? (
            <p role="alert" className="text-sm font-medium text-[#B80510]">
              {error}
            </p>
          ) : null}
        </div>
      )}
      {step === 4 && (
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-bold">
            Full name
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm font-bold">
            Mobile phone
            <input
              required
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(formatUsPhone(event.target.value))}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              placeholder="(407) 555-0123"
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm font-bold">
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
              autoComplete="email"
            />
          </label>
          <label className="flex items-start gap-3 text-sm text-zinc-700">
            <input
              required
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              type="checkbox"
              className="mt-1 h-4 w-4"
            />
            <span>
              I agree to receive calls and texts from Toro Movers about my
              quote. Reply STOP to opt out. {FUNNEL_BILINGUAL}.
            </span>
          </label>
          {error && (
            <p
              role="alert"
              className="rounded-xl bg-[#FCE6E8] p-3 text-sm font-medium text-[#B80510]"
            >
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-xl px-5 py-3 font-bold"
            >
              Back
            </button>
            <button
              disabled={submitting}
              type="submit"
              className={`flex-1 ${primaryBtn} disabled:opacity-50`}
            >
              {submitting ? "Sending request…" : FUNNEL_CTA}
            </button>
          </div>
          <p className="text-center text-xs text-zinc-500">{FUNNEL_SLA}.</p>
        </form>
      )}
    </section>
  );
}
