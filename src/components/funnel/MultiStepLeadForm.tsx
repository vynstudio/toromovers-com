"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import { trackFunnelEvent } from "@/lib/analytics";
import { FUNNEL_BILINGUAL, FUNNEL_SLA } from "@/lib/funnel-offer";
import {
  CONTACT_GROUPS,
  LEAD_CTA,
  markNow,
  MOVE_TYPES,
  PIANO_NOTE,
  STEP1_HEADING,
  STEP1_HELPER,
  STEP_LABELS,
  allowsOnePlace,
  dateOptional,
  emptyLeadFormState,
  itemChecklist,
  moveTypeLabel,
  questionGroups,
  selectMoveType,
  toPayload,
  validateContactGroup,
  validateGroup,
  validateLeadForm,
  validateStep1,
  validateStep2,
  type FieldDef,
  type FieldKey,
  type LeadFormState,
  type MoveType,
} from "@/lib/lead-form";
import { fireAdsLeadOnce, mintEventId } from "@/lib/meta-pixel";
import { formatUsPhone } from "@/lib/phone";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const NARROW_QUERY = "(max-width: 639px)";

function isNarrowNow() {
  return window.matchMedia(NARROW_QUERY).matches;
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string;
  onChange: (next: string) => void;
}) {
  const optional = field.optional ? (
    <span className="gmp-optional"> (optional)</span>
  ) : null;
  if (field.kind === "text") {
    return (
      <label className="lf-label" data-field={field.key}>
        <span>
          {field.label}
          {optional}
        </span>
        <input
          className="gmp-field"
          value={value}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }
  const options = field.options ?? [];
  const compact =
    options.length > 1 && options.every((option) => option.length <= 18);
  return (
    <fieldset className="lf-q" data-field={field.key}>
      <legend>
        {field.label}
        {optional}
      </legend>
      <div
        className={compact ? "lf-choices is-compact" : "lf-choices"}
        role="radiogroup"
        aria-label={field.label}
      >
        {options.map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            className={value === option ? "lf-choice is-on" : "lf-choice"}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {field.key === "item_type" && value === "Piano or safe" ? (
        <p className="lf-note">{PIANO_NOTE}</p>
      ) : null}
    </fieldset>
  );
}

export default function MultiStepLeadForm() {
  const startRef = useRef(0);
  const eventIdRef = useRef("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const submitToken = useRef(0);
  const [state, setState] = useState<LeadFormState>(emptyLeadFormState);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [groupIndex, setGroupIndex] = useState(0);
  const [narrow, setNarrow] = useState(true);
  const [consent, setConsent] = useState(true);
  const [hp, setHp] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitReady, setSubmitReady] = useState(false);

  function holdSubmit() {
    submitToken.current += 1;
    setSubmitReady(false);
  }

  function armSubmit() {
    const token = ++submitToken.current;
    setSubmitReady(false);
    window.setTimeout(() => {
      if (submitToken.current === token) setSubmitReady(true);
    }, 450);
  }

  useEffect(() => {
    startRef.current = markNow();
    captureAttribution();
    eventIdRef.current = mintEventId();
    trackFunnelEvent("form_start", { form_location: "lead_form" });
    const media = window.matchMedia(NARROW_QUERY);
    const apply = () => setNarrow(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!moved.current) return;
    headingRef.current?.focus();
  }, [step, groupIndex]);

  const detailGroups = state.moveType ? questionGroups(state.moveType) : [];
  const finishing =
    step === 3 && (!narrow || groupIndex >= CONTACT_GROUPS.length - 1);

  function patch(partial: Partial<LeadFormState>) {
    setState((current) => ({ ...current, ...partial }));
    setError("");
  }

  function toggleItem(item: string) {
    setState((current) => ({
      ...current,
      items: current.items.includes(item)
        ? current.items.filter((entry) => entry !== item)
        : [...current.items, item],
    }));
    setError("");
  }

  function setAnswer(key: FieldKey, value: string) {
    setState((current) => ({
      ...current,
      answers: { ...current.answers, [key]: value },
    }));
    setError("");
  }

  function chooseType(next: MoveType) {
    setState((current) => selectMoveType(current, next));
    if (state.moveType !== next) setGroupIndex(0);
    setError("");
  }

  function showInvalid(message: string) {
    setError(message);
    moved.current = true;
    if (!state.moveType || validateStep1(state)) {
      setStep(1);
      setGroupIndex(0);
      return;
    }
    const detailIndex = detailGroups.findIndex((group) =>
      validateGroup(state, group),
    );
    if (detailIndex >= 0) {
      holdSubmit();
      setStep(2);
      setGroupIndex(detailIndex);
      return;
    }
    const contactIndex = CONTACT_GROUPS.findIndex((group) =>
      validateContactGroup(state, group.id),
    );
    setStep(3);
    setGroupIndex(contactIndex >= 0 ? contactIndex : 0);
    armSubmit();
  }

  function advance() {
    setError("");
    moved.current = true;
    if (step === 1) {
      const message = validateStep1(state);
      if (message) {
        setError(message);
        return;
      }
      holdSubmit();
      setStep(2);
      setGroupIndex(0);
      return;
    }
    if (step === 2) {
      if (isNarrowNow() && groupIndex < detailGroups.length - 1) {
        const message = validateGroup(state, detailGroups[groupIndex]);
        if (message) {
          setError(message);
          return;
        }
        setGroupIndex((current) => current + 1);
        return;
      }
      const message = validateStep2(state);
      if (message) {
        showInvalid(message);
        return;
      }
      setStep(3);
      setGroupIndex(0);
      armSubmit();
      return;
    }
    const contactId = CONTACT_GROUPS[groupIndex]?.id;
    if (isNarrowNow() && groupIndex < CONTACT_GROUPS.length - 1 && contactId) {
      const message = validateContactGroup(state, contactId);
      if (message) {
        setError(message);
        return;
      }
      setGroupIndex((current) => current + 1);
    }
  }

  function back() {
    setError("");
    moved.current = true;
    if (isNarrowNow() && groupIndex > 0) {
      setGroupIndex((current) => current - 1);
      return;
    }
    if (step === 2) {
      holdSubmit();
      setStep(1);
      setGroupIndex(0);
      return;
    }
    if (step === 3) {
      holdSubmit();
      setStep(2);
      setGroupIndex(isNarrowNow() ? Math.max(detailGroups.length - 1, 0) : 0);
    }
  }

  function goTo(target: 1 | 2 | 3) {
    setError("");
    if (target >= 2) {
      const message = validateStep1(state);
      if (message) {
        setError(message);
        return;
      }
    }
    if (target >= 3) {
      const message = validateStep2(state);
      if (message) {
        showInvalid(message);
        return;
      }
    }
    moved.current = true;
    if (target === 3) armSubmit();
    else holdSubmit();
    setStep(target);
    setGroupIndex(0);
  }

  async function send() {
    const message = validateLeadForm(state);
    if (message) {
      showInvalid(message);
      return;
    }
    const payload = toPayload(state, {
      page_url: window.location.href,
      timestamp: new Date().toISOString(),
    });
    if (!payload) {
      setError("Choose what you are moving.");
      setStep(1);
      return;
    }
    setSubmitting(true);
    setError("");
    const elapsed = markNow() - startRef.current;
    if (elapsed < 800) {
      await new Promise((resolve) => setTimeout(resolve, 800 - elapsed));
    }
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          consentSms: consent,
          hp,
          elapsedMs: Math.max(800, Math.round(elapsed)),
          attribution: {
            ...getAttribution(),
            event_id: eventIdRef.current || mintEventId(),
          },
        }),
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
        fireAdsLeadOnce(eventIdRef.current || mintEventId());
        trackFunnelEvent("generate_lead", {
          service_type: payload.move_type,
          form_location: "lead_form",
        });
      }
      window.location.assign("/thank-you");
    } catch (err) {
      const api = err instanceof Error ? err.message : "";
      setError(
        api && api !== "Lead submission failed"
          ? api
          : `We could not submit your request. Please call ${PHONE_DISPLAY} and our team will help right away.`,
      );
      setSubmitting(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (submitting) return;
    if (
      step === 3 &&
      submitReady &&
      (!isNarrowNow() || groupIndex >= CONTACT_GROUPS.length - 1)
    ) {
      void send();
      return;
    }
    advance();
  }

  const canSubmit = finishing && submitReady;

  const countLabel =
    step === 2 && detailGroups[groupIndex]
      ? `${detailGroups[groupIndex].title} · ${groupIndex + 1} of ${detailGroups.length}`
      : step === 3 && CONTACT_GROUPS[groupIndex]
        ? `${CONTACT_GROUPS[groupIndex].title} · ${groupIndex + 1} of ${CONTACT_GROUPS.length}`
        : "";

  return (
    <section id="quote-form" className="lf" data-step={step} data-move-type={state.moveType || undefined}>
      <ol className="lf-steps">
        {STEP_LABELS.map((label, index) => {
          const number = (index + 1) as 1 | 2 | 3;
          const className =
            number === step ? "is-current" : number < step ? "is-done" : "";
          return (
            <li key={label}>
              <button
                type="button"
                className={className}
                aria-current={number === step ? "step" : undefined}
                onClick={() => goTo(number)}
              >
                <span className="lf-step-num">{number}</span>
                <span>{label}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <form onSubmit={onSubmit} noValidate>
        <input
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={hp}
          onChange={(event) => setHp(event.target.value)}
        />

        <h2 ref={headingRef} tabIndex={-1}>
          {step === 1 ? STEP1_HEADING : step === 2 ? "Details" : "Contact"}
        </h2>
        {step === 1 ? <p className="lf-help">{STEP1_HELPER}</p> : null}
        {step === 1 ? <p className="lf-bilingual">{FUNNEL_BILINGUAL}</p> : null}
        {step === 2 && state.moveType ? (
          <p className="lf-type-name">{moveTypeLabel(state.moveType)}</p>
        ) : null}
        {countLabel ? <p className="lf-count">{countLabel}</p> : null}

        {step === 1 ? (
          <div className="lf-types" role="radiogroup" aria-label={STEP1_HEADING}>
            {MOVE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                role="radio"
                data-move-type={type.value}
                aria-checked={state.moveType === type.value}
                className={
                  state.moveType === type.value ? "lf-type is-on" : "lf-type"
                }
                onClick={() => chooseType(type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        ) : null}

        {step === 2
          ? detailGroups.map((group, index) => (
              <div
                key={group.id}
                className={index === groupIndex ? "lf-group is-current" : "lf-group"}
                data-group={group.id}
              >
                {group.fields.map((field) => (
                  <FieldControl
                    key={field.key}
                    field={field}
                    value={state.answers[field.key]}
                    onChange={(next) => setAnswer(field.key, next)}
                  />
                ))}
              </div>
            ))
          : null}

        {step === 3 ? (
          <>
            <div
              className={
                CONTACT_GROUPS[groupIndex]?.id === "places"
                  ? "lf-group is-current"
                  : "lf-group"
              }
              data-group="places"
            >
              <label className="lf-label" data-field="from_place">
                From ZIP or city
                <input
                  className="gmp-field"
                  value={state.fromPlace}
                  autoComplete="address-level2"
                  placeholder="ZIP or city"
                  onChange={(event) => patch({ fromPlace: event.target.value })}
                />
              </label>
              <label className="lf-label" data-field="to_place">
                To ZIP or city
                <input
                  className="gmp-field"
                  value={state.toPlace}
                  autoComplete="address-level2"
                  placeholder="ZIP or city"
                  onChange={(event) => patch({ toPlace: event.target.value })}
                />
              </label>
              {allowsOnePlace(state) ? (
                <p className="lf-hint">
                  One ZIP or city is enough for this storage move.
                </p>
              ) : null}
            </div>
            <div
              className={
                CONTACT_GROUPS[groupIndex]?.id === "when"
                  ? "lf-group is-current"
                  : "lf-group"
              }
              data-group="when"
            >
              <label className="lf-label" data-field="preferred_date">
                <span>
                  Preferred date
                  {dateOptional(state) ? (
                    <span className="gmp-optional"> (optional)</span>
                  ) : null}
                </span>
                <input
                  className="gmp-field"
                  type="date"
                  value={state.preferredDate}
                  onChange={(event) =>
                    patch({ preferredDate: event.target.value })
                  }
                />
              </label>
              {dateOptional(state) ? (
                <p className="lf-hint">
                  ASAP works. Add a date only if you have one.
                </p>
              ) : null}
            </div>
            <div
              className={
                CONTACT_GROUPS[groupIndex]?.id === "items"
                  ? "lf-group is-current"
                  : "lf-group"
              }
              data-group="items"
            >
              <fieldset className="lf-q" data-field="items">
                <legend>
                  What&apos;s moving?
                  <span className="gmp-optional"> (optional)</span>
                </legend>
                <div className="lf-choices" role="group" aria-label="What's moving?">
                  {(state.moveType ? itemChecklist(state.moveType) : []).map(
                    (item) => (
                      <button
                        key={item}
                        type="button"
                        aria-pressed={state.items.includes(item)}
                        className={
                          state.items.includes(item)
                            ? "lf-choice is-on"
                            : "lf-choice"
                        }
                        onClick={() => toggleItem(item)}
                      >
                        {item}
                      </button>
                    ),
                  )}
                </div>
              </fieldset>
            </div>
            <div
              className={
                CONTACT_GROUPS[groupIndex]?.id === "who"
                  ? "lf-group is-current"
                  : "lf-group"
              }
              data-group="who"
            >
              <label className="lf-label" data-field="name">
                Name
                <input
                  className="gmp-field"
                  value={state.name}
                  autoComplete="name"
                  autoCapitalize="words"
                  onChange={(event) => patch({ name: event.target.value })}
                />
              </label>
              <label className="lf-label" data-field="phone">
                Phone
                <input
                  className="gmp-field"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder={PHONE_DISPLAY}
                  value={state.phone}
                  onChange={(event) =>
                    patch({ phone: formatUsPhone(event.target.value) })
                  }
                />
              </label>
              <label className="lf-label" data-field="email">
                <span>
                  Email <span className="gmp-optional">(optional)</span>
                </span>
                <input
                  className="gmp-field"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(event) => patch({ email: event.target.value })}
                />
              </label>
              <label className="lf-label" data-field="notes">
                <span>
                  Notes <span className="gmp-optional">(optional)</span>
                </span>
                <textarea
                  className="gmp-field lf-area"
                  value={state.notes}
                  maxLength={2000}
                  onChange={(event) => patch({ notes: event.target.value })}
                />
              </label>
              <label className="gmp-consent">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(event) => setConsent(event.target.checked)}
                />
                <span>Call and text me about this quote.</span>
              </label>
            </div>
          </>
        ) : null}

        {error ? (
          <p role="alert" className="gmp-form-error">
            {error}
          </p>
        ) : null}

        <div className="lf-actions">
          <button
            type={canSubmit ? "submit" : "button"}
            className="gmp-submit"
            disabled={submitting || (finishing && !submitReady)}
            onClick={canSubmit ? undefined : advance}
          >
            {submitting ? "Sending…" : finishing ? LEAD_CTA : "Continue"}
          </button>
          <a className="lf-call" href={PHONE_TEL}>
            Call {PHONE_DISPLAY}
          </a>
          {step > 1 || groupIndex > 0 ? (
            <button type="button" className="lf-back" onClick={back}>
              Back
            </button>
          ) : null}
        </div>
        {step === 3 ? <p className="lf-sla">{FUNNEL_SLA}.</p> : null}
      </form>
    </section>
  );
}
