"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";
import Image from "next/image";
import {
  BUSINESS_NAME,
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";
import {
  ADVANCE_MS,
  HOME_SIZE_LABELS,
  PHASE_ORDER,
  SERVICE_LABELS,
  SERVICE_OPTS,
  SIZE_OPTS,
  WHEN_OPTS,
  digits,
  formatPhone,
  type ActivePhase,
  type HomeSize,
  type LeadPhase,
  type ServiceKind,
} from "@/lib/lead";

async function postLead(payload: Record<string, unknown>) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`status ${res.status}`);
  return res.json().catch(() => ({ ok: true }));
}

function funnelOf(svc: ServiceKind | ""): "labor" | "full-service" {
  return svc === "labor" ? "labor" : "full-service";
}

export type CapturedContact = {
  name: string;
  phone: string;
  email?: string;
  smsConsent: boolean;
  eventId: string;
  source: string;
};

export type LeadFunnelProps = {
  source?: string;
  /** modal = sheet styles; inline = page section card */
  variant?: "modal" | "inline";
  showClose?: boolean;
  onClose?: () => void;
  /** When true, reset state on mount (inline always starts fresh) */
  resetOnMount?: boolean;
  dialogRef?: RefObject<HTMLDivElement | null>;
  className?: string;
  /**
   * Two-page split flow: once the capture step's soft lead is saved, hand
   * the contact off here instead of transitioning in-place to "service".
   * Pairs with startPhase/initialContact on the page that continues it.
   */
  onSoftCaptured?: (contact: CapturedContact) => void;
  /** Resume mid-flow — e.g. page 2 of a split funnel skips "capture". */
  startPhase?: LeadPhase;
  initialContact?: Partial<CapturedContact>;
  /** Back button on startPhase's first question (split flow only) */
  onBackToStart?: () => void;
};

/**
 * Shared multi-step lead funnel (contact → service → ZIPs → size → when → done).
 * Used by LeadModal (overlay) and LeadSection (homepage embed).
 */
export function LeadFunnel({
  source: sourceProp = "toromovers.com",
  variant = "modal",
  showClose = false,
  onClose,
  resetOnMount = false,
  dialogRef: dialogRefProp,
  className = "",
  onSoftCaptured,
  startPhase,
  initialContact,
  onBackToStart,
}: LeadFunnelProps) {
  const fallbackTitleId = useId();
  const titleId = fallbackTitleId;
  const formId = `lead-form-${useId().replace(/:/g, "")}`;
  const localDialogRef = useRef<HTMLDivElement>(null);
  const dialogRef = dialogRefProp ?? localDialogRef;

  const [source, setSource] = useState(sourceProp);
  const [phase, setPhase] = useState<LeadPhase>(startPhase ?? "capture");
  const [name, setName] = useState(initialContact?.name ?? "");
  const [phone, setPhone] = useState(initialContact?.phone ?? "");
  const [email, setEmail] = useState(initialContact?.email ?? "");
  const [smsConsent, setSmsConsent] = useState(
    initialContact?.smsConsent ?? true,
  );
  const [service, setService] = useState<ServiceKind | "">("");
  const [fromZip, setFromZip] = useState("");
  const [toZip, setToZip] = useState("");
  const [homeSize, setHomeSize] = useState<HomeSize>("");
  const [whenId, setWhenId] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [advancing, setAdvancing] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [hp, setHp] = useState("");
  const startRef = useRef(Date.now());
  const softSentRef = useRef(Boolean(startPhase && startPhase !== "capture"));
  const eventIdRef = useRef(
    initialContact?.eventId ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}`),
  );

  const phoneOk = digits(phone).length === 10;
  const nameOk = name.trim().length >= 2;

  const stepTotal = PHASE_ORDER.length;
  const stepIndex =
    phase === "done"
      ? stepTotal - 1
      : Math.max(0, PHASE_ORDER.indexOf(phase as ActivePhase));
  const stepNum =
    phase === "done" ? stepTotal : Math.min(stepIndex + 1, stepTotal);
  const progress =
    phase === "done"
      ? "100%"
      : `${Math.round((stepNum / stepTotal) * 100)}%`;

  const reset = useCallback(() => {
    setPhase(startPhase ?? "capture");
    setName(initialContact?.name ?? "");
    setPhone(initialContact?.phone ?? "");
    setEmail(initialContact?.email ?? "");
    setSmsConsent(initialContact?.smsConsent ?? true);
    setService("");
    setFromZip("");
    setToZip("");
    setHomeSize("");
    setWhenId("");
    setError("");
    setSending(false);
    setAdvancing(false);
    setHp("");
    softSentRef.current = Boolean(startPhase && startPhase !== "capture");
    startRef.current = Date.now();
    eventIdRef.current =
      initialContact?.eventId ||
      (typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}`);
    setAnimKey((k) => k + 1);
    setSource(sourceProp);
  }, [sourceProp, startPhase, initialContact]);

  useEffect(() => {
    if (resetOnMount) reset();
  }, [resetOnMount, reset]);

  useEffect(() => {
    setSource(sourceProp);
  }, [sourceProp]);

  function goTo(next: LeadPhase) {
    setError("");
    setAnimKey((k) => k + 1);
    setPhase(next);
  }

  async function sendSoftLead() {
    if (softSentRef.current) return;
    softSentRef.current = true;
    await postLead({
      name: name.trim(),
      phone: digits(phone),
      email: email.trim() || undefined,
      funnel: funnelOf(service),
      source,
      serviceType: "Pending qualify",
      note: "Soft capture (contact first · name + phone) — still qualifying · toromovers.com",
      lang: "en",
      consentSms: smsConsent,
      consentEmail: Boolean(email.trim()),
      landingPage:
        typeof window !== "undefined"
          ? window.location.href
          : "https://toromovers.com/",
      hp: "",
      elapsedMs: Math.max(Date.now() - startRef.current, 0),
      eventId: eventIdRef.current,
    });
  }

  const submitFull = useCallback(
    async (when: string, size: HomeSize, svc: ServiceKind | "") => {
      setSending(true);
      setError("");
      try {
        const eventId = eventIdRef.current;
        const resolvedSvc = (svc || "full-service") as ServiceKind;
        const sizeLabel =
          size && HOME_SIZE_LABELS[size as Exclude<HomeSize, "">]
            ? HOME_SIZE_LABELS[size as Exclude<HomeSize, "">]
            : "";
        const whenLbl =
          WHEN_OPTS.find((w) => w.id === when)?.label || when || "";

        await postLead({
          name: name.trim(),
          phone: digits(phone),
          email: email.trim() || undefined,
          funnel: funnelOf(resolvedSvc),
          source,
          serviceType: [
            SERVICE_LABELS[resolvedSvc] || resolvedSvc,
            sizeLabel,
            fromZip && `from ${fromZip}`,
            toZip && `to ${toZip}`,
            whenLbl,
          ]
            .filter(Boolean)
            .join(" · "),
          moveDate: whenLbl || undefined,
          city: fromZip || undefined,
          note: [
            when === "this-week" || when === "asap"
              ? "🔥 PRIORITY — move soon — call ASAP"
              : "",
            "Full agent funnel complete · toromovers.com",
            SERVICE_LABELS[resolvedSvc] &&
              `Service: ${SERVICE_LABELS[resolvedSvc]}`,
            fromZip && `From ZIP: ${fromZip}`,
            toZip && `To ZIP: ${toZip}`,
            sizeLabel && `Size: ${sizeLabel}`,
            whenLbl && `When: ${whenLbl}`,
            `event_id=${eventId}`,
          ]
            .filter(Boolean)
            .join(" — "),
          lang: "en",
          consentSms: smsConsent,
          consentEmail: Boolean(email.trim()),
          landingPage:
            typeof window !== "undefined"
              ? window.location.href
              : "https://toromovers.com/",
          hp: "",
          elapsedMs: Math.max(Date.now() - startRef.current, 0),
          eventId: `${eventId}-full`,
        });
        goTo("done");
      } catch {
        setError(`Couldn't send. Please call ${PHONE_DISPLAY}.`);
      } finally {
        setSending(false);
        setAdvancing(false);
      }
    },
    [name, phone, email, fromZip, toZip, smsConsent, source],
  );

  function pickAndAdvance(apply: () => void, next: ActivePhase | "finish") {
    if (advancing || sending) return;
    setAdvancing(true);
    apply();
    window.setTimeout(() => {
      if (next === "finish") {
        void submitFull(
          whenId || "flexible",
          homeSize,
          service || "full-service",
        );
        return;
      }
      goTo(next);
      setAdvancing(false);
    }, ADVANCE_MS);
  }

  async function onCaptureContinue(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (hp.trim()) {
      goTo("service");
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
      setError("Please agree so we can contact you about your quote.");
      return;
    }
    setSending(true);
    try {
      const wait = 800 - (Date.now() - startRef.current);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));
      await sendSoftLead();
    } catch {
      softSentRef.current = false;
    } finally {
      setSending(false);
    }
    if (onSoftCaptured) {
      onSoftCaptured({
        name: name.trim(),
        phone: digits(phone),
        email: email.trim() || undefined,
        smsConsent,
        eventId: eventIdRef.current,
        source,
      });
      return;
    }
    goTo(service ? "fromZip" : "service");
  }

  function backFrom(current: ActivePhase) {
    if (advancing || sending) return;
    const i = PHASE_ORDER.indexOf(current);
    const startIndex = PHASE_ORDER.indexOf((startPhase as ActivePhase) ?? "capture");
    if (i <= startIndex) {
      if (i === startIndex) onBackToStart?.();
      return;
    }
    goTo(PHASE_ORDER[i - 1]!);
  }

  const shellClass =
    variant === "inline"
      ? `lead-modal lead-modal--funnel lead-modal--inline ${className}`.trim()
      : `lead-modal lead-modal--funnel ${className}`.trim();

  return (
    <div
      ref={dialogRef}
      className={shellClass}
      role={variant === "modal" ? "dialog" : "region"}
      aria-modal={variant === "modal" ? true : undefined}
      aria-labelledby={titleId}
    >
      <div className="lead-progress" aria-hidden>
        <span style={{ width: progress }} />
      </div>

      <header className="lead-top">
        <div className="lead-brand">
          <span className="lead-brand-mark" aria-hidden>
            <Image
              src="/logos/toro-bull-black.svg"
              alt=""
              width={28}
              height={22}
            />
          </span>
          <div>
            <strong id={titleId}>{BUSINESS_NAME}</strong>
            <div className="lead-stars">
              ★★★★★{" "}
              <span>
                {GOOGLE_RATING} · Central Florida · free quote
              </span>
            </div>
          </div>
        </div>
        {showClose && onClose ? (
          <button
            type="button"
            className="lead-close tap-target"
            aria-label="Close quote form"
            onClick={onClose}
          >
            ×
          </button>
        ) : null}
      </header>

      {phase !== "done" && (
        <p className="lead-step">
          Step {stepNum} of {stepTotal}
          <span className="lead-step-hint">
            {phase === "capture" ? " · contact" : " · tap one"}
          </span>
        </p>
      )}

      <div className="lead-scroll">
        {phase === "done" ? (
          <div className="lead-done" role="status">
            <div className="lead-done-check" aria-hidden>
              ✓
            </div>
            <p className="lead-done-eyebrow">Request received</p>
            <h2 className="lead-done-h2">
              Thanks, {name.trim().split(/\s+/)[0]} — we&apos;ll contact you in
              minutes.
            </h2>
            <p className="lead-done-lede">
              A team member will call or text shortly with availability and a
              clear price. No hidden fees.
            </p>
            <a href={PHONE_TEL} className="btn-primary lead-full">
              Call now — {PHONE_DISPLAY}
            </a>
            {onClose ? (
              <button type="button" className="lead-text-btn" onClick={onClose}>
                Close
              </button>
            ) : (
              <button
                type="button"
                className="lead-text-btn"
                onClick={reset}
              >
                Submit another request
              </button>
            )}
          </div>
        ) : (
          <>
            {phase === "capture" && (
              <form
                id={formId}
                key={animKey}
                className="lead-form lead-enter"
                onSubmit={onCaptureContinue}
                noValidate
              >
                <h2 className="lead-q">Get your free quote.</h2>
                <p className="lead-help">
                  Name and phone first — we save your contact, then a few quick
                  questions to qualify your move.
                </p>

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

                <label className="lead-field">
                  <span>Full name</span>
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

                <label className="lead-field">
                  <span>Mobile phone</span>
                  <input
                    type="tel"
                    name="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    value={phone}
                    onChange={(e) => setPhone(formatPhone(e.target.value))}
                    placeholder={PHONE_DISPLAY}
                    required
                    aria-invalid={phone.length > 0 && !phoneOk}
                  />
                </label>

                <label className="lead-field">
                  <span>
                    Email{" "}
                    <span className="lead-optional">(for confirmation)</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    enterKeyHint="done"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@email.com"
                  />
                </label>

                <label className="lead-consent">
                  <input
                    type="checkbox"
                    checked={smsConsent}
                    onChange={(e) => setSmsConsent(e.target.checked)}
                  />
                  <span>
                    I agree to texts, calls
                    {email.trim() ? ", and email" : ""} from Toro Movers at{" "}
                    {PHONE_DISPLAY}
                    {email.trim() ? ` / ${email.trim()}` : ""}. Reply STOP to
                    opt out of SMS.
                  </span>
                </label>

                {error && <p className="lead-err">{error}</p>}
              </form>
            )}

            {phase === "service" && (
              <div key={animKey} className="lead-form lead-enter">
                <h2 className="lead-q">What kind of help do you need?</h2>
                <p className="lead-help">Tap one to continue.</p>
                <div className="lead-options" role="radiogroup">
                  {SERVICE_OPTS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`lead-opt${service === o.id ? " on" : ""}`}
                      aria-checked={service === o.id}
                      disabled={advancing || sending}
                      onClick={() =>
                        pickAndAdvance(() => setService(o.id), "fromZip")
                      }
                    >
                      <span className="lead-opt-label">
                        {o.label}
                        <span className="lead-opt-hint">{o.hint}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "fromZip" && (
              <form
                id={formId}
                key={animKey}
                className="lead-form lead-enter"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (fromZip.length === 5) goTo("toZip");
                  else setError("Enter a 5-digit ZIP code.");
                }}
              >
                <h2 className="lead-q">Where are you moving from?</h2>
                <p className="lead-help">
                  Just the 5-digit ZIP — any city is fine.
                </p>
                <label className="lead-field">
                  <span>Origin ZIP</span>
                  <input
                    className="lead-zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="postal-code"
                    maxLength={5}
                    autoFocus
                    value={fromZip}
                    onChange={(e) => {
                      const z = e.target.value.replace(/\D/g, "").slice(0, 5);
                      setFromZip(z);
                      setError("");
                      if (z.length === 5) {
                        window.setTimeout(() => goTo("toZip"), 180);
                      }
                    }}
                    placeholder="32801"
                  />
                </label>
                {error && <p className="lead-err">{error}</p>}
              </form>
            )}

            {phase === "toZip" && (
              <form
                id={formId}
                key={animKey}
                className="lead-form lead-enter"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (toZip.length === 5) goTo("size");
                  else setError("Enter a 5-digit ZIP code.");
                }}
              >
                <h2 className="lead-q">Where are you moving to?</h2>
                <p className="lead-help">Just the 5-digit ZIP.</p>
                <label className="lead-field">
                  <span>Destination ZIP</span>
                  <input
                    className="lead-zip"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    autoComplete="postal-code"
                    maxLength={5}
                    autoFocus
                    value={toZip}
                    onChange={(e) => {
                      const z = e.target.value.replace(/\D/g, "").slice(0, 5);
                      setToZip(z);
                      setError("");
                      if (z.length === 5) {
                        window.setTimeout(() => goTo("size"), 180);
                      }
                    }}
                    placeholder="34787"
                  />
                </label>
                {error && <p className="lead-err">{error}</p>}
              </form>
            )}

            {phase === "size" && (
              <div key={animKey} className="lead-form lead-enter">
                <h2 className="lead-q">How big is the move?</h2>
                <p className="lead-help">Tap one to continue.</p>
                <div className="lead-options" role="radiogroup">
                  {SIZE_OPTS.map((o) => (
                    <button
                      key={o.id}
                      type="button"
                      className={`lead-opt${homeSize === o.id ? " on" : ""}`}
                      aria-checked={homeSize === o.id}
                      disabled={advancing || sending}
                      onClick={() =>
                        pickAndAdvance(() => setHomeSize(o.id), "when")
                      }
                    >
                      <span className="lead-opt-label">{o.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {phase === "when" && (
              <div key={animKey} className="lead-form lead-enter">
                <h2 className="lead-q">When do you need us?</h2>
                <p className="lead-help">
                  Last question — we contact you right away.
                </p>
                <div className="lead-options" role="radiogroup">
                  {WHEN_OPTS.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      className={`lead-opt${whenId === w.id ? " on" : ""}${
                        w.hot ? " lead-opt-hot" : ""
                      }`}
                      aria-checked={whenId === w.id}
                      disabled={advancing || sending}
                      onClick={() => {
                        setWhenId(w.id);
                        setAdvancing(true);
                        window.setTimeout(() => {
                          void submitFull(
                            w.id,
                            homeSize,
                            service || "full-service",
                          );
                        }, ADVANCE_MS);
                      }}
                    >
                      <span className="lead-opt-label">{w.label}</span>
                    </button>
                  ))}
                </div>
                {sending && <p className="lead-sending">Sending…</p>}
                {error && <p className="lead-err">{error}</p>}
              </div>
            )}
          </>
        )}
      </div>

      {phase !== "done" && (
        <div className="lead-footer">
          {phase !== "capture" && (
            <button
              type="button"
              className="lead-back"
              onClick={() => backFrom(phase as ActivePhase)}
              disabled={advancing || sending}
            >
              ← Back
            </button>
          )}
          {(phase === "capture" ||
            phase === "fromZip" ||
            phase === "toZip") && (
            <button
              type="submit"
              form={formId}
              className="btn-primary lead-full"
              disabled={
                sending ||
                (phase === "capture" &&
                  (!nameOk || !phoneOk || !smsConsent)) ||
                (phase === "fromZip" && fromZip.length !== 5) ||
                (phase === "toZip" && toZip.length !== 5)
              }
            >
              {sending
                ? "Saving…"
                : phase === "capture"
                  ? "Save & continue"
                  : "Next"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
