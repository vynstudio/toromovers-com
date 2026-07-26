"use client";

import { FormEvent, useState } from "react";
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * Lightweight mobile-first quote form.
 * Submits via mailto (no backend). Phone remains the primary conversion path.
 * Inputs are ≥16px / 48px tall for touch + iOS zoom prevention.
 */
export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "ready">("idle");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const moveType = String(fd.get("moveType") || "").trim();
    const date = String(fd.get("date") || "").trim();

    const lines = [
      "Quote request from toromovers.com",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Move type: ${moveType}`,
      date ? `Preferred date: ${date}` : null,
    ].filter(Boolean);

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      `Quote request — ${name || "Toro Movers"}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;

    setStatus("ready");
    window.location.href = href;
  }

  return (
    <form
      id="quote-form"
      onSubmit={onSubmit}
      className="mx-auto mt-10 grid w-full max-w-md gap-4 rounded-2xl border border-white/12 bg-white/5 p-5 sm:mt-12 sm:p-7"
      aria-label="Request a moving quote"
      noValidate={false}
    >
      <div className="field">
        <label htmlFor="quote-name">Name</label>
        <input
          id="quote-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="quote-phone">Phone</label>
        <input
          id="quote-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(689) 000-0000"
          required
        />
      </div>
      <div className="field">
        <label htmlFor="quote-move">Move type</label>
        <select id="quote-move" name="moveType" defaultValue="Full-service">
          <option>Full-service</option>
          <option>Labor-only</option>
          <option>Apartment</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="quote-date">Preferred date (optional)</label>
        <input id="quote-date" name="date" type="date" />
      </div>
      <p className="text-xs leading-relaxed text-white/45">
        Prefer to talk? Call{" "}
        <a
          href={PHONE_TEL}
          className="tap-target inline min-h-0 underline underline-offset-2"
        >
          {PHONE_DISPLAY}
        </a>
        . This form opens your email app with the details filled in.
      </p>
      <button
        type="submit"
        data-cta="quote-form-submit"
        className="btn-on-dark btn-fluid tap-target w-full"
      >
        {status === "ready" ? "Opening email…" : "Send quote request"}
      </button>
    </form>
  );
}
