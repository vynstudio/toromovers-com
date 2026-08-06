"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LeadFunnel } from "@/components/LeadFunnel";
import { OPEN_LEAD_EVENT, type OpenLeadDetail } from "@/lib/lead";

/**
 * Multi-step lead modal shell — form body is LeadFunnel.
 * Opens only via data-open-quote or OPEN_LEAD_EVENT.
 * #quote / /#quote always goes to the homepage callback form (never modal).
 */
export function LeadModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("toromovers.com");
  const [funnelKey, setFunnelKey] = useState(0);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const openModal = useCallback((detail?: OpenLeadDetail) => {
    setSource(detail?.source || "toromovers.com");
    setFunnelKey((k) => k + 1);
    setOpen(true);
  }, []);

  useEffect(() => {
    const onEvent = (e: Event) => {
      const ce = e as CustomEvent<OpenLeadDetail>;
      openModal(ce.detail || { source: "site-event" });
    };
    window.addEventListener(OPEN_LEAD_EVENT, onEvent);

    /** True when #quote is the callback form (not a dual-CTA band). */
    const hasCallbackForm = () =>
      Boolean(document.querySelector("#quote .callback-form, #quote form.callback-form, #quote .callback-done"));

    // Land on homepage form: smooth-scroll if form is present
    const onHash = () => {
      if (window.location.hash !== "#quote") return;
      if (hasCallbackForm()) {
        document
          .getElementById("quote")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // If no form (city ClosingCta id=quote), do not open modal —
      // full /#quote navigation is the conversion path.
    };
    if (window.location.hash === "#quote" && hasCallbackForm()) {
      document
        .getElementById("quote")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
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

      // Smooth-scroll to callback form when already on homepage
      const quoteLink = t?.closest?.(
        'a[href="#quote"], a[href$="#quote"]',
      ) as HTMLAnchorElement | null;
      if (quoteLink && hasCallbackForm()) {
        e.preventDefault();
        document
          .getElementById("quote")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      // Off-homepage /#quote: allow default navigation to homepage form

      // Modal only for explicit data-open-quote (legacy multi-step funnel)
      const openEl = t?.closest?.(
        "[data-open-quote], a[data-open-quote], button[data-open-quote]",
      ) as HTMLElement | null;
      if (!openEl) return;

      e.preventDefault();
      openModal({
        source:
          openEl.getAttribute("data-source") ||
          openEl.getAttribute("data-cta") ||
          "site-cta",
        serviceType:
          openEl.getAttribute("data-service") ||
          openEl.getAttribute("data-service-type") ||
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

    const isDesktop = window.matchMedia("(min-width: 640px)").matches;
    let t: number | undefined;
    if (isDesktop) {
      t = window.setTimeout(() => {
        const el = dialogRef.current?.querySelector<HTMLElement>(
          "input:not([type=hidden]), button.lead-opt",
        );
        el?.focus({ preventScroll: false });
      }, 80);
    }

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.visualViewport?.removeEventListener("resize", syncViewport);
      window.visualViewport?.removeEventListener("scroll", syncViewport);
      window.removeEventListener("resize", syncViewport);
      if (t) window.clearTimeout(t);
    };
  }, [open, close]);

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
      <LeadFunnel
        key={funnelKey}
        variant="modal"
        source={source}
        showClose
        onClose={close}
        dialogRef={dialogRef}
      />
    </div>
  );
}
