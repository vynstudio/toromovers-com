"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { closing } from "@/lib/content";
import { digits, formatPhone } from "@/lib/lead";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const URGENCY = [
  { id: "asap", label: "ASAP" },
  { id: "today", label: "Today" },
  { id: "this-week", label: "This week" },
] as const;

type UrgencyId = (typeof URGENCY)[number]["id"];

async function postLead(payload: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  return res.json().catch(() => ({ ok: true }));
}

export type CallbackFormProps = {
  /** Lead source tag for /api/lead */
  source?: string;
  /** Optional note prefix for ops */
  notePrefix?: string;
  className?: string;
};

/**
 * Shared callback request form — name, phone, urgency.
 * Used by homepage LeadSection and /contact.
 */
export function CallbackForm({
  source = "callback-form",
  notePrefix = "Callback form · toromovers.com",
  className = "",
}: CallbackFormProps) {
  const formId = `callback-form-${useId().replace(/:/g, "")}`;
  const startRef = useRef(Date.now());
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState<UrgencyId>("asap");
  const [smsConsent, setSmsConsent] = useState(true);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const phoneOk = digits(phone).length === 10;
  const nameOk = name.trim().length >= 2;
  const firstName = name.trim().split(/\s+/)[0] || "there";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (hp.trim()) {
      setDone(true);
      return;
    }
    if (!nameOk) {
      setError("Enter your name.");
      return;
    }
    if (!phoneOk) {
      setError("Enter a 10-digit US phone number.");
      return;
    }
    if (!smsConsent) {
      setError("Please agree so we can call you back.");
      return;
    }

    setSending(true);
    try {
      const wait = 800 - (Date.now() - startRef.current);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));

      const urgencyLabel =
        URGENCY.find((u) => u.id === urgency)?.label ?? urgency;
      const priority =
        urgency === "asap" || urgency === "today"
          ? "🔥 PRIORITY — callback for immediate service"
          : "Callback request — this week";

      await postLead({
        name: name.trim(),
        phone: digits(phone),
        funnel: "full-service",
        source,
        serviceType: `Callback · immediate service · ${urgencyLabel}`,
        moveDate: urgencyLabel,
        note: [priority, notePrefix, `When: ${urgencyLabel}`].join(" — "),
        lang: "en",
        consentSms: smsConsent,
        consentEmail: false,
        landingPage:
          typeof window !== "undefined"
            ? window.location.href
            : "https://toromovers.com/",
        hp: "",
        elapsedMs: Math.max(Date.now() - startRef.current, 800),
        eventId:
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `cb-${Date.now()}`,
      });
      setDone(true);
    } catch {
      setError(`Couldn't send. Please call ${PHONE_DISPLAY}.`);
    } finally {
      setSending(false);
    }
  }

  function reset() {
    setName("");
    setPhone("");
    setUrgency("asap");
    setSmsConsent(true);
    setHp("");
    setError("");
    setSending(false);
    setDone(false);
    startRef.current = Date.now();
  }

  if (done) {
    return (
      <div className={`callback-done ${className}`.trim()} role="status">
        <p className="callback-done-title">
          Got it, {firstName} — we&apos;ll call you back shortly.
        </p>
        <p className="callback-done-lede text-muted">
          Prefer not to wait? Call us now.
        </p>
        <div className="callback-done-actions">
          <a
            href={PHONE_TEL}
            className="btn-primary tap-target"
            data-cta="callback-done-phone"
          >
            Call {PHONE_DISPLAY}
          </a>
          <button type="button" className="callback-reset" onClick={reset}>
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className={`callback-form ${className}`.trim()}
      onSubmit={onSubmit}
      noValidate
    >
      <input
        className="hp-field"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => setHp(e.target.value)}
      />

      <div className="callback-fields">
        <label className="callback-field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            autoComplete="name"
            enterKeyHint="next"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </label>

        <label className="callback-field">
          <span>Phone</span>
          <input
            type="tel"
            name="phone"
            inputMode="tel"
            autoComplete="tel"
            enterKeyHint="done"
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            placeholder={PHONE_DISPLAY}
            required
            aria-invalid={phone.length > 0 && !phoneOk}
          />
        </label>
      </div>

      <fieldset className="callback-urgency">
        <legend>When do you need us?</legend>
        <div className="callback-urgency-opts" role="radiogroup">
          {URGENCY.map((u) => (
            <button
              key={u.id}
              type="button"
              className={`callback-chip${urgency === u.id ? " on" : ""}${
                u.id === "asap" ? " hot" : ""
              }`}
              aria-checked={urgency === u.id}
              role="radio"
              onClick={() => setUrgency(u.id)}
            >
              {u.label}
            </button>
          ))}
        </div>
      </fieldset>

      <label className="callback-consent">
        <input
          type="checkbox"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
        />
        <span>
          I agree to calls and texts from Toro Movers at {PHONE_DISPLAY}. Reply
          STOP to opt out of SMS.
        </span>
      </label>

      {error ? <p className="callback-err">{error}</p> : null}

      <button
        type="submit"
        className="btn-primary callback-submit tap-target"
        disabled={sending || !nameOk || !phoneOk || !smsConsent}
      >
        {sending ? "Sending…" : closing.formCta}
      </button>
    </form>
  );
}
