"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PayShell } from "@/components/pay/PayShell";
import { CompanyPhoneLinks } from "@/components/CompanyPhoneLinks";
import { PHONE_LINES } from "@/lib/site";

function ThanksBody() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const [status, setStatus] = useState<"loading" | "complete" | "open" | "error">(
    "loading",
  );
  const [kind, setKind] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | null>(null);
  const [quoteNumber, setQuoteNumber] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    fetch(`/api/pay/status?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "complete") {
          setStatus("complete");
          setKind(data.payment_type || data.kind || "");
          setEmail(data.customer_email || "");
          setAmount(typeof data.amount_total === "number" ? data.amount_total : null);
          setQuoteNumber(data.quote_number || "");
        } else if (data.status === "open") {
          setStatus("open");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [sessionId]);

  useEffect(() => {
    if (status === "open") window.location.replace("/pay");
  }, [status]);

  if (status === "open") return null;

  const dollars =
    amount != null
      ? new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
        }).format(amount / 100)
      : "";

  const noun =
    kind === "deposit"
      ? "deposit"
      : kind === "tip" || kind === "crew_tip"
        ? "tip"
        : kind === "balance"
          ? "remaining balance"
          : "payment";

  let heading = "We could not confirm that payment.";
  if (status === "complete") heading = "Payment received.";
  if (status === "loading") heading = "Checking your payment…";

  let body = "One moment.";
  if (status === "complete") {
    const receipt = email ? ` A receipt goes to ${email}.` : "";
    const quote = quoteNumber ? ` Quote ${quoteNumber} is on the payment record.` : "";
    body = `Your ${dollars} ${noun} is in.${receipt}${quote} Toro Movers has it.`;
    if (kind === "deposit") {
      body += " Your move date is held now that this deposit succeeded.";
    }
  } else if (status === "error") {
    body = `If you were charged, we still have it. Call ${PHONE_LINES} and we will confirm.`;
  }

  return (
    <section
      className={`pay-thanks-main${status !== "error" ? " pay-thanks-main--photo" : ""}`}
    >
      {status !== "error" ? (
        <figure className="pay-thanks-photo">
          {/* native img: pay.css sizes the frame; eager because it is above the fold */}
          <img
            src="/images/pay-confirm-family.webp"
            srcSet="/images/pay-confirm-family-640.webp 640w, /images/pay-confirm-family.webp 1200w"
            sizes="(min-width: 900px) 26rem, calc(100vw - 2.5rem)"
            width={1200}
            height={1666}
            alt="A smiling boy runs down the hallway of his family's new home past moving boxes as his sister and parents follow behind"
            loading="eager"
            decoding="async"
          />
        </figure>
      ) : null}
      <div className="pay-card pay-thanks-card">
        <div className="pay-thanks-mark" aria-hidden>
          {status === "complete" ? "✓" : status === "loading" ? "…" : "!"}
        </div>
        <p className="pay-kicker" style={{ marginTop: "1.25rem" }}>
          Toro Movers
        </p>
        <h1>{heading}</h1>
        <p className="pay-lede">{body}</p>
        <div className="pay-actions">
          <CompanyPhoneLinks
            cta="pay-thanks-call"
            prefix="Call "
            linkClassName="pay-call"
            style={{ minHeight: "3.15rem" }}
          />
          <Link href="/" className="pay-secondary">
            Back to Toro Movers
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function PayThanksPage() {
  return (
    <PayShell>
      <Suspense>
        <ThanksBody />
      </Suspense>
    </PayShell>
  );
}
