"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { TIP_PRESETS_USD } from "@/lib/stripe";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export default function TipFlow() {
  const [amount, setAmount] = useState<number>(20);
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  const selected = custom ? Number.parseFloat(custom) : amount;
  const valid =
    Number.isFinite(selected) && selected >= 5 && selected <= 500;

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    if (!valid) {
      setError("Choose a tip between $5 and $500.");
      return;
    }
    if (!stripePromise) {
      setError("Tip checkout is not connected yet. Call (321) 758-0094.");
      return;
    }
    setStarting(true);
    setError("");
    try {
      const response = await fetch("/api/tip/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amountUsd: selected, note }),
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {TIP_PRESETS_USD.map((preset) => (
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
          placeholder="25"
          className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
        />
      </label>
      <label className="block text-sm font-bold">
        Note for the crew (optional)
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={200}
          placeholder="Thanks for taking care of the piano."
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
        {starting ? "Opening checkout…" : `Continue with $${Number.isFinite(selected) ? selected : ""}`}
      </button>
      <p className="text-center text-xs text-zinc-500">
        Card details go to Stripe, not Toro. Minimum $5.
      </p>
    </form>
  );
}
