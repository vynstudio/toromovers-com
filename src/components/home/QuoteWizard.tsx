"use client";

import { useEffect, useRef, useState } from "react";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { mintEventId } from "@/lib/meta-pixel";
import { trackHome, trackHomeLead } from "@/lib/home-track";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import type { SelectedPlace } from "@/lib/selected-place";
const HOME_PHONE_DISPLAY = "888-503-1756";
const HOME_PHONE_TEL = "tel:+18885031756";

type ServiceId = "full" | "labor" | "packing" | "apartment" | "office" | "pod";
type LoadMode = "loading" | "unloading" | "both";
type WhenChoice = "this-week" | "next-week" | "date";

const SERVICES: { id: ServiceId; label: string; kind: "both" | "load" | "one" }[] = [
  { id: "full", label: "Full move", kind: "both" },
  { id: "labor", label: "Labor only", kind: "load" },
  { id: "packing", label: "Packing", kind: "one" },
  { id: "apartment", label: "Apartment move", kind: "both" },
  { id: "office", label: "Office move", kind: "both" },
  { id: "pod", label: "POD / U-Haul loading", kind: "load" },
];

function Icon({ d, size = 26 }: { d: string; size?: number }) {
  return (
    <svg
      className="ic"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const ICONS: Record<ServiceId, string> = {
  full: "m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  labor: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0.01 0 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  packing:
    "m7.5 4.27 9 5.15 M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z M3.3 7 12 12l8.7-5 M12 22V12",
  apartment:
    "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2 M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2 M10 6h4 M10 10h4 M10 14h4 M10 18h4",
  office: "M2 7h20v14H2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  pod: "M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z M10 21.9V14L2.1 9.1 M10 14l11.9-6.9 M14 19.8v-8.1 M18 17.5V9.4",
};

function placeFields(prefix: "origin" | "destination", place: SelectedPlace | null) {
  if (!place) return {};
  return {
    [prefix]: place.line,
    [`${prefix}_place_id`]: place.placeId,
    [`${prefix}_lng`]: place.lng,
    [`${prefix}_lat`]: place.lat,
  };
}

export default function QuoteWizard() {
  const started = useRef(Date.now());
  const eventId = useRef("");
  const partialKey = useRef("");
  const [step, setStep] = useState(1);
  const [serviceId, setServiceId] = useState<ServiceId>("full");
  const [loadMode, setLoadMode] = useState<LoadMode>("both");
  const [originText, setOriginText] = useState("");
  const [destText, setDestText] = useState("");
  const [origin, setOrigin] = useState<SelectedPlace | null>(null);
  const [dest, setDest] = useState<SelectedPlace | null>(null);
  const [when, setWhen] = useState<WhenChoice>("this-week");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    captureAttribution();
    eventId.current = mintEventId();
  }, []);

  const service = SERVICES.find((item) => item.id === serviceId) ?? SERVICES[0];
  const needsOrigin =
    service.kind === "both" ||
    service.kind === "one" ||
    loadMode === "loading" ||
    loadMode === "both";
  const needsDest =
    service.kind === "both" || loadMode === "unloading" || loadMode === "both";

  async function postLead(soft: boolean) {
    const moveDate =
      when === "date" ? date : when === "this-week" ? "This week" : "Next week";
    const details = {
      primary_detail: service.kind === "load" ? loadMode : "",
      move_date: soft ? "" : moveDate,
      notes: soft ? "soft capture" : "",
      ...placeFields("origin", needsOrigin ? origin : null),
      ...placeFields("destination", needsDest ? dest : null),
    };
    const phoneE164 = normalizeUsPhone(phone);
    const body = {
      service_type: service.id,
      service_label: service.label,
      service_details: details,
      contact: soft
        ? undefined
        : {
            full_name: name.trim(),
            phone_e164: phoneE164,
            email: "",
            sms_call_consent: consent,
          },
      attribution: { ...getAttribution(), event_id: eventId.current },
      form_location: "homepage_quote",
      source: "homepage_quote",
      note: soft ? "soft capture" : "",
      hp,
      elapsedMs: Date.now() - started.current,
      landingPage: window.location.href,
      funnel: service.id,
      consentSms: consent,
    };
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean; spam?: boolean } | null;
    if (!res.ok || !data?.ok || data.spam) {
      throw new Error("send");
    }
  }

  function goNext() {
    setError("");
    if (step === 1) {
      trackHome("Lead started", { service: service.label, event_id: eventId.current });
      setStep(2);
      return;
    }
    if (step === 2) {
      if (needsOrigin && (!origin || origin.line !== originText.trim())) {
        setError("Choose a pickup address from the suggestions.");
        return;
      }
      if (needsDest && (!dest || dest.line !== destText.trim())) {
        setError("Choose a drop-off address from the suggestions.");
        return;
      }
      const key = `${service.id}|${loadMode}|${origin?.placeId || ""}|${dest?.placeId || ""}`;
      setStep(3);
      if (partialKey.current !== key) {
        partialKey.current = key;
        void postLead(true).catch(() => {
          partialKey.current = "";
        });
      }
    }
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (when === "date" && !date) {
      setError("Pick a date.");
      return;
    }
    if (name.trim().length < 2) {
      setError("Enter your name.");
      return;
    }
    if (!normalizeUsPhone(phone)) {
      setError("Enter a 10-digit phone number.");
      return;
    }
    if (!consent) {
      setError("Check the box so we can call or text you about this quote.");
      return;
    }
    setBusy(true);
    try {
      await postLead(false);
      trackHomeLead(eventId.current, service.label);
      setDone(true);
    } catch {
      setError("We could not send that. Call 888-503-1756 and we will quote you.");
    } finally {
      setBusy(false);
    }
  }

  const hint =
    step === 1
      ? "Next: pickup and drop-off, then date and phone."
      : step === 2
        ? "Next: date, name, and phone."
        : "We will call you back with the quote.";

  return (
    <form className="form-card fc-c" id="quote" onSubmit={onSubmit} noValidate>
      <input
        className="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(event) => setHp(event.target.value)}
        style={{ position: "absolute", left: "-9999px" }}
      />
      <div className="fc-top">
        <div>
          <p className="fc-kicker">Free to ask. Fast to answer.</p>
          <p className="fc-title">Get your quote</p>
        </div>
        <span className="fc-step">
          Step <b>{done ? 3 : step}</b> of 3
        </span>
      </div>
      <div className="fc-progress" role="group" aria-label={`Step ${step} of 3`}>
        <i className={step >= 1 ? "on" : ""} />
        <i className={step >= 2 ? "on" : ""} />
        <i className={step >= 3 ? "on" : ""} />
      </div>
      {done ? (
        <div className="fc-done">
          <p className="fc-q">Quote received.</p>
          <p className="fc-hint" style={{ textAlign: "left" }}>
            We have {service.label.toLowerCase()} and your number. A person will call you at{" "}
            {formatUsPhone(phone)}.
          </p>
        </div>
      ) : null}
      {!done && step === 1 ? (
        <>
          <p className="fc-q">What do you need?</p>
          <div className="tiles" role="radiogroup" aria-label="What do you need?">
            {SERVICES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === serviceId ? "tile is-on" : "tile"}
                role="radio"
                aria-checked={item.id === serviceId}
                onClick={() => setServiceId(item.id)}
              >
                <span className="tile-ic">
                  <Icon d={ICONS[item.id]} />
                </span>
                <span className="tile-t">{item.label}</span>
                <span className="tile-check">
                  <Icon d="M20 6 9 17l-5-5" size={12} />
                </span>
              </button>
            ))}
          </div>
        </>
      ) : null}
      {!done && step === 2 ? (
        <>
          <p className="fc-q">
            {service.kind === "one" ? "Where should we pack?" : "Where are we going?"}
          </p>
          {service.kind === "load" ? (
            <div className="fc-choices" role="radiogroup" aria-label="Loading, unloading, or both?">
              {(
                [
                  ["loading", "Loading"],
                  ["unloading", "Unloading"],
                  ["both", "Both"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={loadMode === id ? "fc-choice is-on" : "fc-choice"}
                  role="radio"
                  aria-checked={loadMode === id}
                  onClick={() => setLoadMode(id)}
                >
                  {label}
                </button>
              ))}
            </div>
          ) : null}
          {needsOrigin ? (
            <div className="fc-field">
              <label htmlFor="quote-origin">{service.kind === "one" ? "Address" : "Pickup"}</label>
              <AddressAutocomplete
                id="quote-origin"
                value={originText}
                onChange={(value) => {
                  setOriginText(value);
                  if (origin && origin.line !== value) setOrigin(null);
                }}
                onSelect={(place) => {
                  setOrigin(place);
                  setOriginText(place.line);
                }}
                ariaLabel={service.kind === "one" ? "Address" : "Pickup address"}
                placeholder="Street, city, ZIP"
                phoneLines={HOME_PHONE_DISPLAY}
                className=""
              />
            </div>
          ) : null}
          {needsDest ? (
            <div className="fc-field">
              <label htmlFor="quote-dest">Drop-off</label>
              <AddressAutocomplete
                id="quote-dest"
                value={destText}
                onChange={(value) => {
                  setDestText(value);
                  if (dest && dest.line !== value) setDest(null);
                }}
                onSelect={(place) => {
                  setDest(place);
                  setDestText(place.line);
                }}
                ariaLabel="Drop-off address"
                placeholder="Street, city, ZIP"
                phoneLines={HOME_PHONE_DISPLAY}
                className=""
              />
            </div>
          ) : null}
        </>
      ) : null}
      {!done && step === 3 ? (
        <>
          <p className="fc-q">When should we call?</p>
          <div className="fc-choices" role="radiogroup" aria-label="Move timing">
            {(
              [
                ["this-week", "This week"],
                ["next-week", "Next week"],
                ["date", "Pick a date"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                className={when === id ? "fc-choice is-on" : "fc-choice"}
                onClick={() => setWhen(id)}
              >
                {label}
              </button>
            ))}
          </div>
          {when === "date" ? (
            <div className="fc-field">
              <label htmlFor="quote-date">Date</label>
              <input
                id="quote-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </div>
          ) : null}
          <div className="fc-field">
            <label htmlFor="quote-name">Name</label>
            <input
              id="quote-name"
              name="name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="fc-field">
            <label htmlFor="quote-phone">Phone</label>
            <input
              id="quote-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(formatUsPhone(event.target.value))}
            />
          </div>
          <label className="fc-consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />
            <span>You can call or text me about this quote.</span>
          </label>
        </>
      ) : null}
      {error ? (
        <p className="fc-error" role="alert">
          {error}
        </p>
      ) : null}
      {!done && step < 3 ? (
        <div className="fc-row">
          {step > 1 ? (
            <button type="button" className="fc-back" onClick={() => setStep(step - 1)}>
              Back
            </button>
          ) : null}
          <button type="button" className="btn btn-red btn-block" data-text="Next" onClick={goNext}>
            <span>
              Next{" "}
              <svg className="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </span>
          </button>
        </div>
      ) : null}
      {!done && step === 3 ? (
        <div className="fc-row">
          <button type="button" className="fc-back" onClick={() => setStep(2)}>
            Back
          </button>
          <button
            type="submit"
            className="btn btn-red btn-block"
            data-text="Get my free quote"
            disabled={busy}
          >
            <span>{busy ? "Sending..." : "Get my free quote"}</span>
          </button>
        </div>
      ) : null}
      {!done ? <p className="fc-hint">{hint}</p> : null}
      <p className="fc-alt">
        Rather talk?{" "}
        <a href={HOME_PHONE_TEL} data-track="phone">
          Call {HOME_PHONE_DISPLAY}
        </a>
      </p>
    </form>
  );
}
