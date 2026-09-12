"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/analytics";
import {
  resolveServiceParam,
  type ServiceType,
} from "@/lib/funnel-service";
import {
  FUNNEL_BILINGUAL,
  FUNNEL_CTA,
  FUNNEL_SLA,
} from "@/lib/funnel-offer";
import { fireAdsLeadOnce, mintEventId } from "@/lib/meta-pixel";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import { PHONE_DISPLAY } from "@/lib/site";

const primaryBtn =
  "rounded-xl bg-[#E20613] px-5 py-3 font-bold text-white transition hover:bg-[#B80510] disabled:cursor-not-allowed disabled:opacity-40";

const SERVICE_LABELS: Record<ServiceType, string> = {
  full_service_move: "Full-Service Move",
  labor_only: "Labor Only",
  same_building_move: "Same-Building Move",
  special_item_move: "Special Item Move",
  pod_storage_container: "POD / Storage Container",
  rental_truck_labor: "U-Haul / Rental Truck",
  single_item_move: "Single-Item Move",
};

const WHEN = [
  { id: "ASAP", label: "ASAP" },
  { id: "Today", label: "Today" },
  { id: "This week", label: "This week" },
] as const;

export default function AdsShortForm({
  initialService,
}: {
  initialService?: string;
}) {
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );
  const eventIdRef = useRef("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [origin, setOrigin] = useState("");
  const [when, setWhen] = useState<(typeof WHEN)[number]["id"]>("ASAP");
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const service: ServiceType =
    resolveServiceParam(initialService) || "full_service_move";

  useEffect(() => {
    captureAttribution();
    eventIdRef.current = mintEventId();
    trackFunnelEvent("form_start", {
      form_location: "ads_short_form",
      service_type: service,
    });
  }, [service]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const phoneE164 = normalizeUsPhone(phone);
    if (!name.trim() || name.trim().length < 2 || !phoneE164 || !consent) {
      setError(
        "Please enter your name, a valid mobile number, and consent before continuing.",
      );
      return;
    }
    setSubmitting(true);
    setError("");
    const wait =
      800 -
      ((typeof performance !== "undefined" ? performance.now() : Date.now()) -
        startRef.current);
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));

    const eventId = eventIdRef.current || mintEventId();
    const payload = {
      service_type: service,
      service_label: SERVICE_LABELS[service],
      service_details: {
        primary_detail: "",
        move_date: when,
        origin: origin.trim(),
        destination: "",
        access_conditions: "",
        notes:
          "Short Meta ads callback form (name + phone). No email required.",
      },
      contact: {
        full_name: name.trim(),
        phone_e164: phoneE164,
        sms_call_consent: consent,
      },
      attribution: {
        ...getAttribution(),
        event_id: eventId,
      },
      form_location: "ads_short_form",
      hp,
      elapsedMs: Math.max(
        800,
        Math.round(
          (typeof performance !== "undefined"
            ? performance.now()
            : Date.now()) - startRef.current,
        ),
      ),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json().catch(() => ({}))) as {
        ok?: boolean;
        spam?: boolean;
        error?: string;
      };
      if (!response.ok || result.ok === false) {
        throw new Error(result.error || "Lead submission failed");
      }
      if (!result.spam) {
        fireAdsLeadOnce(eventId);
        trackFunnelEvent("generate_lead", {
          service_type: service,
          form_location: "ads_short_form",
        });
      }
      window.location.assign("/thank-you");
    } catch {
      setError(
        `We could not submit your request. Please call ${PHONE_DISPLAY} and our team will help right away.`,
      );
      setSubmitting(false);
    }
  }

  return (
    <section
      id="quote-form"
      className="rounded-3xl bg-white p-5 shadow-2xl ring-1 ring-black/5 sm:p-8"
    >
      <p className="text-sm font-bold uppercase tracking-widest text-[#E20613]">
        {FUNNEL_CTA}
      </p>
      <h2 className="mt-1 text-2xl font-black tracking-tight">
        Name and mobile — we call you back.
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        No email required. Local Central Florida {SERVICE_LABELS[service].toLowerCase()}.
      </p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        <input
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />

        <label className="block text-sm font-bold">
          Full name
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            autoComplete="name"
            enterKeyHint="next"
          />
        </label>

        <label className="block text-sm font-bold">
          Mobile phone
          <input
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(formatUsPhone(e.target.value))}
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            placeholder={PHONE_DISPLAY}
            autoComplete="tel"
            enterKeyHint="next"
          />
        </label>

        <label className="block text-sm font-bold">
          ZIP <span className="font-medium text-zinc-500">(optional)</span>
          <input
            inputMode="numeric"
            value={origin}
            onChange={(e) =>
              setOrigin(e.target.value.replace(/\D/g, "").slice(0, 5))
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            placeholder="32801"
            autoComplete="postal-code"
          />
        </label>

        <fieldset className="min-w-0 border-0 p-0">
          <legend className="text-sm font-bold">When do you need us?</legend>
          <div className="mt-2 flex flex-wrap gap-2" role="radiogroup">
            {WHEN.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={when === item.id}
                onClick={() => setWhen(item.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                  when === item.id
                    ? "border-[#E20613] bg-[#E20613] text-white"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="flex items-start gap-3 text-sm text-zinc-700">
          <input
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            type="checkbox"
            className="mt-1 h-4 w-4"
          />
          <span>
            I agree to receive calls and texts from Toro Movers about my quote.
            Reply STOP to opt out. {FUNNEL_BILINGUAL}.
          </span>
        </label>

        {error ? (
          <p
            role="alert"
            className="rounded-xl bg-[#FCE6E8] p-3 text-sm font-medium text-[#B80510]"
          >
            {error}
          </p>
        ) : null}

        <button
          disabled={submitting}
          type="submit"
          className={`w-full ${primaryBtn} disabled:opacity-50`}
        >
          {submitting ? "Sending request…" : FUNNEL_CTA}
        </button>
        <p className="text-center text-xs text-zinc-500">{FUNNEL_SLA}.</p>
      </form>
    </section>
  );
}
