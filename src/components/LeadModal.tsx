"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import Image from "next/image";
import {
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
  BUSINESS_NAME,
} from "@/lib/site";
import {
  ADVANCE_MS,
  HOME_SIZE_LABELS,
  OPEN_LEAD_EVENT,
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
  type OpenLeadDetail,
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

/**
 * Multi-step lead modal — same model as toromovers.net get-my-price:
 * contact → service → from ZIP → to ZIP → size → when → done.
 */
export function LeadModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("toromovers.com");
  const [phase, setPhase] = useState<LeadPhase>("capture");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [smsConsent, setSmsConsent] = useState(true);
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
  const softSentRef = useRef(false);
  const eventIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `lead-${Date.now()}`,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const phoneOk = digits(phone).length === 10;
  const nameOk = name.trim().length >= 2;

  const stepTotal = PHASE_ORDER.length;
  const stepIndex =
    phase === "done"
      ? stepTotal - 1
      : Math.max(0, PHASE_ORDER.indexOf(phase as ActivePhase));
  const stepNum = phase === "done" ? stepTotal : Math.min(stepIndex + 1, stepTotal);
  const progress =
    phase === "done"
      ? "100%"
      : `${Math.round((stepNum / stepTotal) * 100)}%`;

  const reset = useCallback(() => {
    setPhase("capture");
    setName("");
    setPhone("");
    setEmail("");
    setSmsConsent(true);
    setService("");
    setFromZip("");
    setToZip("");
    setHomeSize("");
    setWhenId("");
    setError("");
    setSending(false);
    setAdvancing(false);
    setHp("");
    softSentRef.current = false;
    startRef.current = Date.now();
    eventIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}`;
    setAnimKey((k) => k + 1);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    // Reset after close animation
    window.setTimeout(reset, 200);
  }, [reset]);

  const openModal = useCallback((detail?: OpenLeadDetail) => {
    reset();
    if (detail?.source) setSource(detail.source);
    if (detail?.serviceType) {
      const s = detail.serviceType.toLowerCase();
      if (s.includes("labor")) setService("labor");
      else if (s.includes("full")) setService("full-service");
    }
    startRef.current = Date.now();
    setOpen(true);
  }, [reset]);

  // Global open triggers
  useEffect(() => {
    const onEvent = (e: Event) => {
      const ce = e as CustomEvent<OpenLeadDetail>;
      openModal(ce.detail || { source: "site-event" });
    };
    window.addEventListener(OPEN_LEAD_EVENT, onEvent);

    if (window.location.hash === "#quote") {
      openModal({ source: "site-hash" });
    }
    const onHash = () => {
      if (window.location.hash === "#quote") {
        openModal({ source: "site-hash" });
      }
    };
    window.addEventListener("hashchange", onHash);

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const t = e.target as HTMLElement | null;
      const a = t?.closest?.(
        'a[href="#quote"], a[href$="#quote"], [data-open-quote], a[data-open-quote], button[data-open-quote]',
      ) as HTMLElement | null;
      if (!a) return;
      e.preventDefault();
      openModal({
        source:
          a.getAttribute("data-source") ||
          a.getAttribute("data-cta") ||
          "site-cta",
        serviceType:
          a.getAttribute("data-service") ||
          a.getAttribute("data-service-type") ||
          undefined,
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener(OPEN_LEAD_EVENT, onEvent);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [openModal]);

  // Body scroll lock + Escape + visualViewport (iOS keyboard)
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);

    const overlay = overlayRef.current;
    const syncViewport = () => {
      const vv = window.visualViewport;
      if (!overlay) return;
      if (vv) {
        // Keep sheet inside the visible area above the keyboard
        overlay.style.setProperty("--lead-vvh", `${Math.round(vv.height)}px`);
        overlay.style.setProperty("--lead-vvt", `${Math.round(vv.offsetTop)}px`);
      } else {
        overlay.style.setProperty("--lead-vvh", "100dvh");
        overlay.style.setProperty("--lead-vvt", "0px");
      }
    };
    syncViewport();
    window.visualViewport?.addEventListener("resize", syncViewport);
    window.visualViewport?.addEventListener("scroll", syncViewport);
    window.addEventListener("resize", syncViewport);

    // Desktop: focus first control. Mobile: do NOT autofocus on the first
    // "contact" step — that immediately opens the keyboard + iOS AutoFill bar
    // and buries the form (bad first paint). User taps the field when ready.
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    const shouldAutofocus =
      isDesktop || (phase !== "capture" && phase !== "done");
    let t: number | undefined;
    if (shouldAutofocus) {
      t = window.setTimeout(() => {
        const el = dialogRef.current?.querySelector<HTMLElement>(
          "input:not([type=hidden]), button.lead-opt",
        );
        el?.focus({ preventScroll: false });
        el?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 80);
    }

    const onFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (!(t instanceof HTMLElement)) return;
      if (t.tagName !== "INPUT" && t.tagName !== "TEXTAREA") return;
      // After keyboard animates, keep the field above the autofill bar
      window.setTimeout(() => {
        t.scrollIntoView({ block: "center", behavior: "smooth" });
        syncViewport();
      }, 300);
    };
    dialogRef.current?.addEventListener("focusin", onFocusIn);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.visualViewport?.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
      dialogRef.current?.removeEventListener("focusin", onFocusIn);
      if (t) window.clearTimeout(t);
    };
  }, [open, close, phase]);

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
        typeof window !== "undefined" ? window.location.href : "https://toromovers.com/",
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
          // Full complete: always notify client (SMS + email when present)
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
        void submitFull(whenId || "flexible", homeSize, service || "full-service");
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
    goTo(service ? "fromZip" : "service");
  }

  function backFrom(current: ActivePhase) {
    if (advancing || sending) return;
    const i = PHASE_ORDER.indexOf(current);
    if (i <= 0) return;
    goTo(PHASE_ORDER[i - 1]!);
  }

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="lead-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="lead-modal lead-modal--funnel"
        role="dialog"
        aria-modal="true"
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
          <button
            type="button"
            className="lead-close tap-target"
            aria-label="Close quote form"
            onClick={close}
          >
            ×
          </button>
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
                Thanks, {name.trim().split(/\s+/)[0]} — we&apos;ll contact you
                in minutes.
              </h2>
              <p className="lead-done-lede">
                A team member will call or text shortly with availability and a
                clear price. No hidden fees.
              </p>
              <a href={PHONE_TEL} className="btn-primary lead-full">
                Call now — {PHONE_DISPLAY}
              </a>
              <button type="button" className="lead-text-btn" onClick={close}>
                Close
              </button>
            </div>
          ) : (
            <>
              {phase === "capture" && (
                <form
                  id="lead-form"
                  key={animKey}
                  className="lead-form lead-enter"
                  onSubmit={onCaptureContinue}
                  noValidate
                >
                  <h2 className="lead-q">Get your free quote.</h2>
                  <p className="lead-help">
                    Name and phone first — we save your contact, then a few
                    quick questions to qualify your move.
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
                      // No autoFocus — on mobile it opens the keyboard + AutoFill
                      // bar immediately and covers the form (bad first paint).
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
                  id="lead-form"
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
                  id="lead-form"
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
                form="lead-form"
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
    </div>
  );
}
