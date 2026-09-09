"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

function ThanksBody() {
  const params = useSearchParams();
  const sessionId = params.get("session_id") || "";
  const [status, setStatus] = useState<"loading" | "complete" | "open" | "error">(
    "loading",
  );
  const [kind, setKind] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

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
          setKind(data.kind || "");
          setEmail(data.customer_email || "");
          setAmount(typeof data.amount_total === "number" ? data.amount_total : null);
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
          maximumFractionDigits: 0,
        }).format(amount / 100)
      : "";

  const noun =
    kind === "deposit" ? "deposit" : kind === "tip" || kind === "crew_tip" ? "tip" : "payment";

  let heading = "We could not confirm that payment.";
  if (status === "complete") heading = "Payment received.";
  if (status === "loading") heading = "Checking your payment…";

  let body = "One moment.";
  if (status === "complete") {
    const receipt = email ? ` A receipt goes to ${email}.` : "";
    body = `Your ${dollars} ${noun} is in.${receipt} Toro Movers has it.`;
  } else if (status === "error") {
    body = `If you were charged, we still have it. Call ${PHONE_DISPLAY} and we will confirm.`;
  }

  return (
    <section className="max-w-xl rounded-3xl bg-white p-8 text-center text-zinc-950 shadow-2xl sm:p-12">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-black text-3xl text-white">
        {status === "complete" ? "✓" : status === "loading" ? "…" : "!"}
      </div>
      <p className="mt-6 text-sm font-extrabold uppercase tracking-widest text-zinc-500">
        Toro Movers
      </p>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">{heading}</h1>
      <p className="mt-5 leading-7 text-zinc-600">{body}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <a href={PHONE_TEL} className="rounded-xl bg-black px-6 py-4 font-extrabold text-white">
          Call {PHONE_DISPLAY}
        </a>
        <Link href="/" className="rounded-xl border border-zinc-300 px-6 py-4 font-extrabold">
          Back to Toro Movers
        </Link>
      </div>
    </section>
  );
}

export default function PayThanksPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-950 px-5 text-white">
      <Suspense>
        <ThanksBody />
      </Suspense>
    </main>
  );
}
