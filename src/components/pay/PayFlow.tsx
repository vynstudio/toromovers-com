"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { PAYMENT_KIND, PAYMENT_KINDS, type PaymentKind } from "@/lib/payments";
import { PHONE_DISPLAY } from "@/lib/site";

export default function PayFlow({ initialKind = "deposit" }: { initialKind?: PaymentKind }) {
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);
  const [kind, setKind] = useState<PaymentKind>(initialKind);
  const spec = PAYMENT_KIND[kind];
  const [amount, setAmount] = useState<number>(spec.defaultUsd);
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    fetch("/api/pay/config")
      .then((res) => res.json())
      .then((data: { publishableKey?: string }) => {
        if (data.publishableKey) setStripePromise(loadStripe(data.publishableKey));
      })
      .catch(() => {});
  }, []);

  const selected = custom ? Number.parseFloat(custom) : amount;
  const valid =
    Number.isFinite(selected) && selected >= spec.minUsd && selected <= spec.maxUsd;

  function chooseKind(next: PaymentKind) {
    setKind(next);
    setAmount(PAYMENT_KIND[next].defaultUsd);
    setCustom("");
    setClientSecret("");
    setError("");
  }

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      setError(`Enter an amount between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`);
      return;
    }
    if (!stripePromise) {
      setError(`Checkout is not connected yet. Call ${PHONE_DISPLAY}.`);
      return;
    }
    setStarting(true);
    setError("");
    try {
      const response = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, amountUsd: selected, note }),
      });
      const data = (await response.json()) as { clientSecret?: string; error?: string };
      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error || "Could not start checkout.");
      }
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
    } finally {
      setStarting(false);
    }
  };

  const fetchClientSecret = useCallback(async () => clientSecret, [clientSecret]);
  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);

  if (clientSecret && stripePromise) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          className="text-sm font-bold underline underline-offset-4"
          onClick={() => setClientSecret("")}
        >
          Change amount
        </button>
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  return (
    <form onSubmit={startCheckout} className="space-y-5">
      <div className="grid gap-2 sm:grid-cols-3">
        {PAYMENT_KINDS.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => chooseKind(item)}
            className={`rounded-xl border p-3 text-sm font-extrabold ${
              kind === item
                ? "border-black bg-black text-white"
                : "border-zinc-200 bg-white hover:border-black"
            }`}
          >
            {PAYMENT_KIND[item].label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {spec.presetsUsd.map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => {
              setAmount(preset);
              setCustom("");
            }}
            className={`rounded-xl border p-4 text-lg font-black ${
              !custom && amount === preset
                ? "border-black bg-black text-white"
                : "border-zinc-200 bg-white hover:border-black"
            }`}
          >
            ${preset}
          </button>
        ))}
      </div>
      <label className="block text-sm font-bold">
        Or enter another amount
        <input
          inputMode="decimal"
          value={custom}
          onChange={(event) => setCustom(event.target.value.replace(/[^\d.]/g, ""))}
          placeholder={String(spec.defaultUsd)}
          className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        Note (optional)
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={200}
          placeholder={spec.notePlaceholder}
          className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
        />
      </label>
      {error && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={starting || !valid}
        className="w-full rounded-xl bg-black px-5 py-3 font-bold text-white disabled:opacity-40"
      >
        {starting
          ? "Opening checkout…"
          : `${spec.cta} · $${Number.isFinite(selected) ? selected : ""}`}
      </button>
      <p className="text-center text-xs text-zinc-500">
        Card details go to Stripe. You stay on toromovers.com.
      </p>
    </form>
  );
}
