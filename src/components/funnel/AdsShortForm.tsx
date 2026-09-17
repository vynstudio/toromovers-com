"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/analytics";
import {
  SERVICE_LABELS,
  SERVICE_OPTIONS,
  serviceFromSearch,
  type ServiceType,
} from "@/lib/funnel-service";
import {
  FUNNEL_BILINGUAL,
  FUNNEL_CTA,
  FUNNEL_SLA,
} from "@/lib/funnel-offer";
import { fireAdsLeadOnce, mintEventId } from "@/lib/meta-pixel";
import { formatUsPhone, normalizeUsPhone } from "@/lib/phone";
import { quotePage } from "@/lib/quote-page";
import { PHONE_DISPLAY } from "@/lib/site";

const primaryBtn =
  "gmp-submit disabled:cursor-not-allowed disabled:opacity-40";
const fieldClass = "gmp-field";

const WHEN = [
  { id: "This week", label: "This week" },
  { id: "Flexible", label: "Flexible" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AdsShortForm() {
  const startRef = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );
  const eventIdRef = useRef("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceType>("house_2plus_move");
  const [when, setWhen] = useState<(typeof WHEN)[number]["id"]>("This week");
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    captureAttribution();
    eventIdRef.current = mintEventId();
    const next = serviceFromSearch(window.location.search);
    setService(next);
    trackFunnelEvent("form_start", {
      form_location: "ads_short_form",
      service_type: next,
    });
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const phoneE164 = normalizeUsPhone(phone);
    const emailTrim = email.trim().toLowerCase();
    if (emailTrim && !EMAIL_RE.test(emailTrim)) {
      setError("Enter a valid email, or leave it blank.");
      return;
    }
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
        origin: "",
        destination: "",
        access_conditions: "",
        notes: "Short Meta ads callback form (name + phone + optional email).",
      },
      contact: {
        full_name: name.trim(),
        phone_e164: phoneE164,
        email: emailTrim || undefined,
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
    <section id="quote-form" className="gmp-form">
      <h2>{quotePage.form.h2}</h2>

      <form onSubmit={submit} noValidate>
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

        <div className="gmp-form-row">
          <label>
            Name
            <input
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              className={fieldClass}
              autoComplete="name"
              autoCapitalize="words"
              enterKeyHint="next"
            />
          </label>
          <label>
            Phone
            <input
              required
              inputMode="tel"
              value={phone}
              onChange={(e) => {
                setPhone(formatUsPhone(e.target.value));
                if (error) setError("");
              }}
              className={fieldClass}
              placeholder={PHONE_DISPLAY}
              autoComplete="tel"
              enterKeyHint="next"
            />
          </label>
        </div>

        <label>
          Email <span className="gmp-optional">(optional)</span>
          <input
            type="email"
            inputMode="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            className={fieldClass}
            autoComplete="email"
            enterKeyHint="next"
          />
        </label>

        <label>
          Service
          <select
            required
            value={service}
            onChange={(e) => setService(e.target.value as ServiceType)}
            className={fieldClass}
          >
            {SERVICE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <fieldset>
          <legend>When</legend>
          <div className="gmp-when" role="radiogroup">
            {WHEN.map((item) => (
              <button
                key={item.id}
                type="button"
                role="radio"
                aria-checked={when === item.id}
                onClick={() => setWhen(item.id)}
                className={when === item.id ? "is-on" : undefined}
              >
                {item.label}
              </button>
            ))}
          </div>
        </fieldset>

        <label className="gmp-consent">
          <input
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            type="checkbox"
          />
          <span>
            Calls and texts about my quote OK. STOP to opt out.{" "}
            {FUNNEL_BILINGUAL}.
          </span>
        </label>

        {error ? (
          <p role="alert" className="gmp-form-error">
            {error}
          </p>
        ) : null}

        <button
          disabled={submitting}
          type="submit"
          className={`${primaryBtn} disabled:opacity-50`}
        >
          {submitting ? "Sending request…" : FUNNEL_CTA}
        </button>
        <p className="gmp-form-sla">{FUNNEL_SLA}.</p>
      </form>
    </section>
  );
}
