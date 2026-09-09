"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import {
  CUSTOM_TIP_MAX_USD,
  EMPTY_QUOTE_FIELDS,
  PAYMENT_KIND,
  PRIMARY_PAYMENT_KINDS,
  PROCESSING_FEE_LABEL,
  TIP_PERCENT_BY_TYPE,
  balanceSummary,
  depositSummary,
  dollarsToCents,
  formatUsd,
  parseTipType,
  parseUsd,
  tipAmountCents,
  type PaymentKind,
  type QuoteFields,
  type TipType,
} from "@/lib/payments";
import { PHONE_DISPLAY } from "@/lib/site";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe-public";

const TIP_OPTIONS: { type: TipType; label: string }[] = [
  { type: "none", label: "No tip" },
  { type: "15_percent", label: "15% tip" },
  { type: "20_percent", label: "20% tip" },
  { type: "25_percent", label: "25% tip" },
  { type: "custom", label: "Custom tip amount" },
];

function dollarsInput(value: string, fallback = 0): number {
  const parsed = parseUsd(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function PayFlow({
  initialKind = "deposit",
  publishableKey = "",
  quoteToken = "",
  quoteNumber = "",
}: {
  initialKind?: PaymentKind;
  publishableKey?: string;
  quoteToken?: string;
  quoteNumber?: string;
}) {
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);
  const [kind, setKind] = useState<PaymentKind>(initialKind);
  const spec = PAYMENT_KIND[kind];
  const [amount, setAmount] = useState<number>(spec.defaultUsd);
  const [custom, setCustom] = useState("");
  const [note, setNote] = useState("");
  const [quote, setQuote] = useState<QuoteFields>({
    ...EMPTY_QUOTE_FIELDS,
    quote_number: quoteNumber,
  });
  const [quoteTotal, setQuoteTotal] = useState("");
  const [quoteTotalLocked, setQuoteTotalLocked] = useState(false);
  const [depositPaidCents, setDepositPaidCents] = useState(0);
  const [lookupState, setLookupState] = useState<"idle" | "loading" | "done">("idle");
  const [tipType, setTipType] = useState<TipType>("none");
  const [customTip, setCustomTip] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    const baked = publishableKey || process.env.STRIPE_PK || STRIPE_PUBLISHABLE_KEY;
    if (baked) {
      setStripePromise(loadStripe(baked));
      return;
    }
    fetch("/api/pay/config")
      .then((res) => res.json())
      .then((data: { publishableKey?: string }) => {
        if (data.publishableKey) setStripePromise(loadStripe(data.publishableKey));
      })
      .catch(() => {});
  }, [publishableKey]);

  useEffect(() => {
    const token = quoteToken.trim();
    const number = (quote.quote_number || quoteNumber).trim();
    if (!token && !number) {
      setLookupState("done");
      return;
    }
    setLookupState("loading");
    const params = new URLSearchParams();
    if (token) params.set("q", token);
    if (number) params.set("quote", number);
    fetch(`/api/pay/quote?${params.toString()}`)
      .then((res) => res.json())
      .then(
        (data: {
          quote?: Partial<QuoteFields>;
          quoteTotalCents?: number | null;
          depositPaidCents?: number;
        }) => {
          if (data.quote) {
            setQuote((current) => ({
              ...current,
              ...Object.fromEntries(
                Object.entries(data.quote || {}).filter(([, value]) => Boolean(value)),
              ),
            }));
          }
          if (typeof data.quoteTotalCents === "number" && data.quoteTotalCents > 0) {
            setQuoteTotal((data.quoteTotalCents / 100).toFixed(2));
            setQuoteTotalLocked(true);
          }
          setDepositPaidCents(
            typeof data.depositPaidCents === "number" ? data.depositPaidCents : 0,
          );
        },
      )
      .catch(() => {})
      .finally(() => setLookupState("done"));
    // Load once from the URL/token. Manual quote-number changes use the blur handler.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteToken, quoteNumber]);

  const selected = custom ? dollarsInput(custom, NaN) : amount;
  const quoteTotalUsd = dollarsInput(quoteTotal, NaN);
  const customTipUsd = dollarsInput(customTip, 0);
  const depositBreakdown = depositSummary(
    Number.isFinite(selected) ? dollarsToCents(selected) : 0,
  );
  const balanceBreakdown = balanceSummary({
    quoteTotalCents: Number.isFinite(quoteTotalUsd) ? dollarsToCents(quoteTotalUsd) : 0,
    depositPaidCents,
    tipType,
    customTipCents: dollarsToCents(Math.max(0, customTipUsd)),
  });

  const depositValid =
    Number.isFinite(selected) && selected >= spec.minUsd && selected <= spec.maxUsd;
  const customTipValid =
    tipType !== "custom" ||
    (Number.isFinite(customTipUsd) && customTipUsd >= 0 && customTipUsd <= CUSTOM_TIP_MAX_USD);
  const balanceValid =
    Number.isFinite(quoteTotalUsd) &&
    quoteTotalUsd > 0 &&
    balanceBreakdown.payable &&
    customTipValid &&
    balanceBreakdown.remainingCents / 100 <= PAYMENT_KIND.balance.maxUsd;
  const tipValid = depositValid;
  const valid = kind === "balance" ? balanceValid : kind === "tip" ? tipValid : depositValid;

  function chooseKind(next: PaymentKind) {
    setKind(next);
    setAmount(PAYMENT_KIND[next].defaultUsd);
    setCustom("");
    setClientSecret("");
    setError("");
    if (next !== "balance") {
      setTipType("none");
      setCustomTip("");
    }
  }

  async function refreshDeposit(number: string) {
    const trimmed = number.trim();
    if (!trimmed) {
      setDepositPaidCents(0);
      return;
    }
    setLookupState("loading");
    try {
      const params = new URLSearchParams({ quote: trimmed });
      if (quoteToken) params.set("q", quoteToken);
      const res = await fetch(`/api/pay/quote?${params.toString()}`);
      const data = (await res.json()) as { depositPaidCents?: number };
      setDepositPaidCents(typeof data.depositPaidCents === "number" ? data.depositPaidCents : 0);
    } catch {
      setDepositPaidCents(0);
    } finally {
      setLookupState("done");
    }
  }

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    if (kind === "balance" && !Number.isFinite(quoteTotalUsd)) {
      setError("Enter the approved quote total.");
      return;
    }
    if (kind === "balance" && !balanceBreakdown.payable) {
      setError("This move has no remaining balance.");
      return;
    }
    if (kind !== "balance" && !valid) {
      setError(`Enter an amount between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`);
      return;
    }
    if (kind === "balance" && !customTipValid) {
      setError(`Enter a custom tip of $0 to $${CUSTOM_TIP_MAX_USD.toLocaleString("en-US")}.`);
      return;
    }
    setStarting(true);
    setError("");
    try {
      const response = await fetch("/api/pay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          amountUsd: kind === "balance" ? quoteTotalUsd : selected,
          note,
          quoteToken,
          quoteNumber: quote.quote_number,
          moveReference: quote.move_reference,
          customerName: quote.customer_name,
          customerEmail: quote.customer_email,
          moveDate: quote.move_date,
          pickupAddress: quote.pickup_address,
          deliveryAddress: quote.delivery_address,
          quoteTotalUsd: kind === "balance" ? quoteTotalUsd : undefined,
          tipType: kind === "balance" ? tipType : undefined,
          customTipUsd: kind === "balance" && tipType === "custom" ? customTipUsd : undefined,
        }),
      });
      const data = (await response.json()) as {
        clientSecret?: string;
        publishableKey?: string;
        error?: string;
      };
      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error || "Could not start checkout.");
      }
      const pk =
        data.publishableKey ||
        publishableKey ||
        process.env.STRIPE_PK ||
        STRIPE_PUBLISHABLE_KEY;
      const promise = stripePromise || (pk ? loadStripe(pk) : null);
      if (!promise) {
        throw new Error(`Checkout is not connected yet. Call ${PHONE_DISPLAY}.`);
      }
      if (!stripePromise) setStripePromise(promise);
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
      <div className="grid gap-2 sm:grid-cols-2">
        {PRIMARY_PAYMENT_KINDS.map((item) => (
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
      {kind === "tip" && (
        <p className="rounded-xl bg-zinc-50 p-3 text-sm text-zinc-600">
          Post-move tip for the crew. This is separate from the remaining move balance.
        </p>
      )}

      {(kind === "deposit" || kind === "tip") && (
        <>
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
        </>
      )}

      {kind === "balance" && (
        <div className="space-y-4">
          <label className="block text-sm font-bold">
            Quote number / move reference
            <input
              value={quote.quote_number}
              onChange={(event) =>
                setQuote((current) => ({ ...current, quote_number: event.target.value }))
              }
              onBlur={(event) => refreshDeposit(event.target.value)}
              placeholder="Q-1042"
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
            />
          </label>
          <label className="block text-sm font-bold">
            Approved quote total
            <input
              inputMode="decimal"
              value={quoteTotal}
              readOnly={quoteTotalLocked}
              onChange={(event) => setQuoteTotal(event.target.value.replace(/[^\d.]/g, ""))}
              placeholder="1560.00"
              className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal read-only:bg-zinc-50"
            />
          </label>
          <p className="text-sm text-zinc-600">
            {lookupState === "loading"
              ? "Checking for a deposit…"
              : depositPaidCents > 0
                ? `Deposit received: ${formatUsd(depositPaidCents)} (processing fee not credited).`
                : "No deposit has been applied."}
          </p>
          {Number.isFinite(quoteTotalUsd) && !balanceBreakdown.payable && (
            <p className="rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-900">
              This move has no remaining balance.
            </p>
          )}
          <fieldset className="space-y-2">
            <legend className="text-sm font-bold">Optional crew tip</legend>
            <div className="grid gap-2">
              {TIP_OPTIONS.map((option) => {
                const remaining = balanceBreakdown.remainingCents;
                const amountForOption =
                  option.type === "custom"
                    ? Number.isFinite(customTipUsd)
                      ? dollarsToCents(Math.max(0, customTipUsd))
                      : 0
                    : tipAmountCents(remaining, option.type);
                const percent =
                  option.type === "15_percent" ||
                  option.type === "20_percent" ||
                  option.type === "25_percent"
                    ? TIP_PERCENT_BY_TYPE[option.type]
                    : null;
                return (
                  <label
                    key={option.type}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                      tipType === option.type
                        ? "border-black bg-black text-white"
                        : "border-zinc-200 bg-white"
                    }`}
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <input
                        type="radio"
                        name="tip"
                        checked={tipType === option.type}
                        onChange={() => {
                          setTipType(parseTipType(option.type));
                          if (option.type !== "custom") setCustomTip("");
                        }}
                        className="accent-black"
                      />
                      {option.label}
                      {percent != null ? ` · ${percent}%` : ""}
                    </span>
                    <span className="font-semibold">{formatUsd(amountForOption)}</span>
                  </label>
                );
              })}
            </div>
            {tipType === "custom" && (
              <label className="block text-sm font-bold">
                Custom tip amount
                <input
                  inputMode="decimal"
                  value={customTip}
                  onChange={(event) => setCustomTip(event.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="0.00"
                  className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
                />
              </label>
            )}
          </fieldset>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          Customer name
          <input
            value={quote.customer_name}
            onChange={(event) =>
              setQuote((current) => ({ ...current, customer_name: event.target.value }))
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
        <label className="block text-sm font-bold">
          Customer email
          <input
            type="email"
            value={quote.customer_email}
            onChange={(event) =>
              setQuote((current) => ({ ...current, customer_email: event.target.value }))
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
        <label className="block text-sm font-bold">
          Move date
          <input
            value={quote.move_date}
            onChange={(event) =>
              setQuote((current) => ({ ...current, move_date: event.target.value }))
            }
            placeholder="August 22, 2026"
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
        <label className="block text-sm font-bold">
          Pickup address
          <input
            value={quote.pickup_address}
            onChange={(event) =>
              setQuote((current) => ({ ...current, pickup_address: event.target.value }))
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
        <label className="block text-sm font-bold sm:col-span-2">
          Delivery address
          <input
            value={quote.delivery_address}
            onChange={(event) =>
              setQuote((current) => ({ ...current, delivery_address: event.target.value }))
            }
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
      </div>
      {kind === "deposit" && (
        <label className="block text-sm font-bold">
          Quote number / move reference
          <input
            value={quote.quote_number}
            onChange={(event) =>
              setQuote((current) => ({ ...current, quote_number: event.target.value }))
            }
            placeholder="Q-1042"
            className="mt-2 w-full rounded-xl border border-zinc-300 p-3 font-normal"
          />
        </label>
      )}
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

      {kind === "deposit" && depositValid && (
        <div className="rounded-xl bg-zinc-50 p-4 text-sm">
          <div className="flex justify-between">
            <span>Deposit</span>
            <span className="font-semibold">{formatUsd(depositBreakdown.depositCents)}</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-600">
            <span>{PROCESSING_FEE_LABEL}</span>
            <span>{formatUsd(depositBreakdown.processingFeeCents)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-extrabold">
            <span>Total Charged Today</span>
            <span>{formatUsd(depositBreakdown.totalChargedCents)}</span>
          </div>
        </div>
      )}

      {kind === "balance" && Number.isFinite(quoteTotalUsd) && quoteTotalUsd > 0 && (
        <div className="rounded-xl bg-zinc-50 p-4 text-sm">
          <div className="flex justify-between">
            <span>Approved Move Total</span>
            <span className="font-semibold">{formatUsd(balanceBreakdown.quoteTotalCents)}</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-600">
            <span>Deposit Received</span>
            <span>−{formatUsd(balanceBreakdown.depositPaidCents)}</span>
          </div>
          {balanceBreakdown.noDepositApplied && (
            <p className="mt-1 text-xs font-medium text-zinc-500">No deposit has been applied.</p>
          )}
          <div className="mt-1 flex justify-between">
            <span>Remaining Move Balance</span>
            <span className="font-semibold">{formatUsd(balanceBreakdown.remainingCents)}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>Optional Crew Tip</span>
            <span>{formatUsd(balanceBreakdown.tipCents)}</span>
          </div>
          <div className="mt-1 flex justify-between">
            <span>Subtotal</span>
            <span>{formatUsd(balanceBreakdown.subtotalCents)}</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-600">
            <span>{PROCESSING_FEE_LABEL}</span>
            <span>{formatUsd(balanceBreakdown.processingFeeCents)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-extrabold">
            <span>Total Charged Today</span>
            <span>{formatUsd(balanceBreakdown.totalChargedCents)}</span>
          </div>
        </div>
      )}

      {kind === "tip" && tipValid && (
        <div className="rounded-xl bg-zinc-50 p-4 text-sm">
          <div className="flex justify-between">
            <span>Tip</span>
            <span className="font-semibold">{formatUsd(depositBreakdown.depositCents)}</span>
          </div>
          <div className="mt-1 flex justify-between text-zinc-600">
            <span>{PROCESSING_FEE_LABEL}</span>
            <span>{formatUsd(depositBreakdown.processingFeeCents)}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-zinc-200 pt-2 font-extrabold">
            <span>Total Charged Today</span>
            <span>{formatUsd(depositBreakdown.totalChargedCents)}</span>
          </div>
        </div>
      )}

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
          : `${spec.cta} · ${
              valid
                ? formatUsd(
                    kind === "balance"
                      ? balanceBreakdown.totalChargedCents
                      : depositBreakdown.totalChargedCents,
                  )
                : ""
            }`}
      </button>
      {kind === "deposit" && (
        <p className="text-center text-xs text-zinc-500">
          The move date is held after this deposit payment succeeds.
        </p>
      )}
      {kind !== "tip" && (
        <p className="text-center text-xs text-zinc-500">
          Want to tip after the move?{" "}
          <button
            type="button"
            className="font-bold underline underline-offset-4"
            onClick={() => chooseKind("tip")}
          >
            Tip the crew
          </button>
        </p>
      )}
      <p className="text-center text-xs text-zinc-500">You never leave this page.</p>
    </form>
  );
}
