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
  BUSINESS_NAME,
  GOOGLE_RATING,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/lib/site";
import {
  OPEN_LEAD_EVENT,
  digits,
  formatPhone,
  type LeadPhase,
  type OpenLeadDetail,
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

/**
 * Quote modal — name + phone only.
 * Submits, shows a short thank-you, then closes (no multi-step funnel).
 * Fixed shell size so layout doesn't jump.
 */
export function LeadModal() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("toromovers.com");
  const [phase, setPhase] = useState<LeadPhase>("capture");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [hp, setHp] = useState("");
  const startRef = useRef(Date.now());
  const closeTimerRef = useRef<number | null>(null);
  const eventIdRef = useRef(
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `lead-${Date.now()}`,
  );
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const phoneOk = digits(phone).length === 10;
  const nameOk = name.trim().length >= 2;
  const canSubmit = nameOk && phoneOk && smsConsent && !sending;

  const reset = useCallback(() => {
    setPhase("capture");
    setName("");
    setPhone("");
    setSmsConsent(true);
    setError("");
    setSending(false);
    setHp("");
    startRef.current = Date.now();
    eventIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `lead-${Date.now()}`;
  }, []);

  const close = useCallback(() => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setOpen(false);
    window.setTimeout(reset, 220);
  }, [reset]);

  const openModal = useCallback(
    (detail?: OpenLeadDetail) => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      reset();
      if (detail?.source) setSource(detail.source);
      startRef.current = Date.now();
      setOpen(true);
    },
    [reset],
  );

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
      });
    };
    document.addEventListener("click", onClick);

    return () => {
      window.removeEventListener(OPEN_LEAD_EVENT, onEvent);
      window.removeEventListener("hashchange", onHash);
      document.removeEventListener("click", onClick);
    };
  }, [openModal]);

  // Body scroll lock + Escape + focus
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.setTimeout(() => nameInputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    };
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Honeypot — pretend success and close
    if (hp.trim()) {
      setPhase("done");
      closeTimerRef.current = window.setTimeout(close, 1600);
      return;
    }

    if (!nameOk) {
      setError("Enter your name.");
      nameInputRef.current?.focus();
      return;
    }
    if (!phoneOk) {
      setError("Enter a 10-digit US phone number.");
      return;
    }
    if (!smsConsent) {
      setError("Please agree so we can call or text about your quote.");
      return;
    }

    setSending(true);
    try {
      // Anti-bot: minimum time on form
      const wait = 800 - (Date.now() - startRef.current);
      if (wait > 0) await new Promise((r) => setTimeout(r, wait));

      await postLead({
        name: name.trim(),
        phone: digits(phone),
        funnel: "full-service",
        source,
        serviceType: "Free quote request · name + phone",
        note: "toromovers.com quote form — name + phone only",
        lang: "en",
        consentSms: true,
        landingPage:
          typeof window !== "undefined"
            ? window.location.href
            : "https://toromovers.com/",
        hp: "",
        elapsedMs: Math.max(Date.now() - startRef.current, 0),
        eventId: eventIdRef.current,
      });

      setPhase("done");
      // Auto-dismiss so the form doesn't stick on screen
      closeTimerRef.current = window.setTimeout(close, 2800);
    } catch {
      setError(`Couldn't send. Please call ${PHONE_DISPLAY}.`);
    } finally {
      setSending(false);
    }
  }

  if (!open) return null;

  const firstName = name.trim().split(/\s+/)[0] || "there";

  return (
    <div
      className="lead-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        className="lead-modal lead-modal--simple"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="lead-progress" aria-hidden>
          <span style={{ width: phase === "done" ? "100%" : "50%" }} />
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

        <div className="lead-scroll lead-scroll--simple">
          {phase === "done" ? (
            <div className="lead-done" role="status">
              <div className="lead-done-check" aria-hidden>
                ✓
              </div>
              <p className="lead-done-eyebrow">Request received</p>
              <h2 className="lead-done-h2">
                Thanks, {firstName} — we&apos;ll call or text you shortly.
              </h2>
              <p className="lead-done-lede">
                A team member will reach out with availability and a clear
                price. No hidden fees.
              </p>
              <a href={PHONE_TEL} className="btn-primary lead-full">
                Call now — {PHONE_DISPLAY}
              </a>
              <button type="button" className="lead-text-btn" onClick={close}>
                Close
              </button>
            </div>
          ) : (
            <form
              id="lead-form"
              className="lead-form lead-enter"
              onSubmit={onSubmit}
              noValidate
            >
              <h2 className="lead-q">Get your free quote.</h2>
              <p className="lead-help">
                Leave your name and phone — we&apos;ll call you back with a clear
                price.
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
                  ref={nameInputRef}
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
                  enterKeyHint="done"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder={PHONE_DISPLAY}
                  required
                  aria-invalid={phone.length > 0 && !phoneOk}
                />
              </label>

              <label className="lead-consent">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                />
                <span>
                  I agree to calls and texts from Toro Movers at {PHONE_DISPLAY}{" "}
                  about my quote. Reply STOP to opt out of SMS.
                </span>
              </label>

              {error ? <p className="lead-err">{error}</p> : null}
            </form>
          )}
        </div>

        {phase === "capture" ? (
          <div className="lead-footer">
            <button
              type="submit"
              form="lead-form"
              className="btn-primary lead-full"
              disabled={!canSubmit}
            >
              {sending ? "Sending…" : "Get my free quote"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
