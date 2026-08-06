"use client";

import { CallbackForm } from "@/components/CallbackForm";
import { closing } from "@/lib/content";
import { HOURS_LABEL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

/**
 * Homepage conversion close — callback form only (no photo / placeholder).
 * Secondary path; principal CTA remains “Get a quote” (modal).
 */
export function LeadSection() {
  return (
    <section
      id="quote"
      className="callback-section full-bleed w-full"
      aria-labelledby="closing-heading"
    >
      <div className="site-container callback-section-inner">
        <header className="callback-section-head">
          <p className="split-band-eyebrow">{closing.eyebrow}</p>
          <h2 id="closing-heading" className="callback-section-title">
            {closing.title}
          </h2>
          <p className="aeo-answer callback-section-lede text-muted">
            {closing.body}
          </p>
        </header>

        <div className="callback-section-card">
          <CallbackForm
            source="homepage-callback"
            notePrefix="Homepage callback form · toromovers.com"
          />
        </div>

        <p className="callback-phone callback-section-phone">
          Prefer to talk?{" "}
          <a href={PHONE_TEL} data-cta="callback-section-phone">
            Call {PHONE_DISPLAY}
          </a>
          <span className="text-muted"> · {HOURS_LABEL}</span>
        </p>
      </div>
    </section>
  );
}
