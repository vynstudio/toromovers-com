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
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
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

function ChargeSummary({
  rows,
  totalCents,
}: {
  rows: { label: string; value: string; muted?: boolean }[];
  totalCents: number;
}) {
  return (
    <div className="pay-summary">
      {rows.map((row) => (
        <div
          key={row.label}
          className={`pay-summary-row${row.muted ? " is-muted" : ""}`}
        >
          <span>{row.label}</span>
          <span className={row.muted ? "" : "font-semibold"}>{row.value}</span>
        </div>
      ))}
      <div className="pay-summary-total">
        <span>Total charged today</span>
        <span>{formatUsd(totalCents)}</span>
      </div>
    </div>
  );
}

export default function PayFlow({
  initialKind = "deposit",
  publishableKey = "",
  quoteToken = "",
  quoteNumber = "",
  checkoutReady = true,
}: {
  initialKind?: PaymentKind;
  publishableKey?: string;
  quoteToken?: string;
  quoteNumber?: string;
  checkoutReady?: boolean;
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
  const [quoteSigned, setQuoteSigned] = useState(false);
  const [depositPaidCents, setDepositPaidCents] = useState(0);
  const [lookupState, setLookupState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [tipType, setTipType] = useState<TipType>("none");
  const [customTip, setCustomTip] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [chargedCents, setChargedCents] = useState(0);
  const [error, setError] = useState("");
  const [starting, setStarting] = useState(false);
  const [ready, setReady] = useState(checkoutReady);

  useEffect(() => {
    const baked = publishableKey || process.env.STRIPE_PK || STRIPE_PUBLISHABLE_KEY;
    if (baked) {
      setStripePromise(loadStripe(baked));
    }
    fetch("/api/pay/config")
      .then((res) => res.json())
      .then((data: { publishableKey?: string; configured?: boolean }) => {
        if (data.publishableKey && !baked) setStripePromise(loadStripe(data.publishableKey));
        if (typeof data.configured === "boolean") setReady(data.configured);
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
      .then(async (res) => {
        const data = (await res.json()) as {
          quote?: Partial<QuoteFields>;
          quoteTotalCents?: number | null;
          depositPaidCents?: number;
          signed?: boolean;
          depositLookupFailed?: boolean;
        };
        if (token && data.signed === false) {
          setError(
            `This payment link is invalid. Call ${PHONE_DISPLAY} and we will send a new one.`,
          );
        }
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
        setQuoteSigned(Boolean(data.signed));
        if (data.depositLookupFailed) {
          setLookupState("error");
          setDepositPaidCents(0);
          return;
        }
        setDepositPaidCents(
          typeof data.depositPaidCents === "number" ? data.depositPaidCents : 0,
        );
        setLookupState("done");
      })
      .catch(() => setLookupState("error"));
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
    lookupState !== "loading" &&
    lookupState !== "error" &&
    Number.isFinite(quoteTotalUsd) &&
    quoteTotalUsd > 0 &&
    balanceBreakdown.payable &&
    customTipValid &&
    balanceBreakdown.remainingCents / 100 <= PAYMENT_KIND.balance.maxUsd;
  const tipValid = depositValid;
  const valid = kind === "balance" ? balanceValid : kind === "tip" ? tipValid : depositValid;
  const todayCents =
    kind === "balance" ? balanceBreakdown.totalChargedCents : depositBreakdown.totalChargedCents;

  function chooseKind(next: PaymentKind) {
    setKind(next);
    setAmount(PAYMENT_KIND[next].defaultUsd);
    setCustom("");
    setClientSecret("");
    setChargedCents(0);
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
      setLookupState("done");
      return;
    }
    setLookupState("loading");
    try {
      const params = new URLSearchParams({ quote: trimmed });
      if (quoteToken) params.set("q", quoteToken);
      const res = await fetch(`/api/pay/quote?${params.toString()}`);
      const data = (await res.json()) as {
        depositPaidCents?: number;
        depositLookupFailed?: boolean;
      };
      if (data.depositLookupFailed) {
        setDepositPaidCents(0);
        setLookupState("error");
        return;
      }
      setDepositPaidCents(typeof data.depositPaidCents === "number" ? data.depositPaidCents : 0);
      setLookupState("done");
    } catch {
      setDepositPaidCents(0);
      setLookupState("error");
    }
  }

  const startCheckout = async (event: FormEvent) => {
    event.preventDefault();
    if (!ready) {
      setError(`Checkout is not connected yet. Call ${PHONE_DISPLAY}.`);
      return;
    }
    if (kind === "balance" && lookupState === "error") {
      setError(`Could not verify the deposit on this quote. Call ${PHONE_DISPLAY}.`);
      return;
    }
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
      setChargedCents(todayCents);
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
    } finally {
      setStarting(false);
    }
  };

  const fetchClientSecret = useCallback(async () => clientSecret, [clientSecret]);
  const options = useMemo(
    () => ({
      fetchClientSecret,
    }),
    [fetchClientSecret],
  );

  const detailsFilled = Boolean(
    quote.customer_name ||
      quote.customer_email ||
      quote.move_date ||
      quote.pickup_address ||
      quote.delivery_address ||
      (kind === "deposit" && quote.quote_number),
  );

  const summaryRows =
    kind === "balance"
      ? [
          {
            label: "Approved move total",
            value: formatUsd(balanceBreakdown.quoteTotalCents),
          },
          {
            label: "Deposit received",
            value: `−${formatUsd(balanceBreakdown.depositPaidCents)}`,
            muted: true,
          },
          {
            label: "Remaining move balance",
            value: formatUsd(balanceBreakdown.remainingCents),
          },
          {
            label: "Optional crew tip",
            value: formatUsd(balanceBreakdown.tipCents),
          },
          {
            label: PROCESSING_FEE_LABEL,
            value: formatUsd(balanceBreakdown.processingFeeCents),
            muted: true,
          },
        ]
      : [
          {
            label: kind === "tip" ? "Tip" : "Deposit",
            value: formatUsd(depositBreakdown.depositCents),
          },
          {
            label: PROCESSING_FEE_LABEL,
            value: formatUsd(depositBreakdown.processingFeeCents),
            muted: true,
          },
        ];

  if (clientSecret && stripePromise) {
    return (
      <div className="pay-checkout">
        <div className="pay-checkout-bar">
          <button
            type="button"
            className="pay-ghost"
            onClick={() => {
              setClientSecret("");
              setChargedCents(0);
            }}
          >
            Change amount
          </button>
          <p className="pay-help" style={{ textAlign: "right" }}>
            {spec.shortLabel}
            {quote.quote_number ? ` · ${quote.quote_number}` : ""} ·{" "}
            {formatUsd(chargedCents || todayCents)}
          </p>
        </div>
        <ChargeSummary rows={summaryRows} totalCents={chargedCents || todayCents} />
        <div id="checkout" className="pay-embed">
          <EmbeddedCheckoutProvider key={clientSecret} stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="pay-embed-frame" />
          </EmbeddedCheckoutProvider>
        </div>
        <p className="pay-help">
          Secure card checkout on this page. Need help?{" "}
          <a href={PHONE_TEL} className="pay-ghost">
            Call {PHONE_DISPLAY}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={startCheckout} className="space-y-5">
      {!ready && (
        <p className="pay-banner pay-banner--warn" role="status">
          Card checkout is not connected yet. Call {PHONE_DISPLAY} to pay by phone.
        </p>
      )}
      {quoteSigned && quote.quote_number && (
        <p className="pay-banner pay-banner--info">
          Quote {quote.quote_number}
          {quote.customer_name ? ` · ${quote.customer_name}` : ""} is loaded from your payment
          link.
        </p>
      )}

      <div className="pay-tabs">
        {PRIMARY_PAYMENT_KINDS.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => chooseKind(item)}
            className={`pay-tab${kind === item ? " is-on" : ""}`}
          >
            {PAYMENT_KIND[item].label}
          </button>
        ))}
      </div>
      {kind === "tip" && (
        <p className="pay-banner pay-banner--info">
          Post-move tip for the crew. This is separate from the remaining move balance.
        </p>
      )}

      {(kind === "deposit" || kind === "tip") && (
        <>
          <div className="pay-presets">
            {spec.presetsUsd.map((preset) => (
              <button
                type="button"
                key={preset}
                onClick={() => {
                  setAmount(preset);
                  setCustom("");
                }}
                className={`pay-preset${!custom && amount === preset ? " is-on" : ""}`}
              >
                ${preset}
              </button>
            ))}
          </div>
          <label className="pay-label">
            Or enter another amount
            <input
              inputMode="decimal"
              value={custom}
              onChange={(event) => setCustom(event.target.value.replace(/[^\d.]/g, ""))}
              placeholder={String(spec.defaultUsd)}
            />
          </label>
        </>
      )}

      {kind === "balance" && (
        <div className="space-y-4">
          <label className="pay-label">
            Quote number / move reference
            <input
              value={quote.quote_number}
              readOnly={quoteSigned}
              onChange={(event) =>
                setQuote((current) => ({ ...current, quote_number: event.target.value }))
              }
              onBlur={(event) => refreshDeposit(event.target.value)}
              placeholder="Q-1042"
            />
          </label>
          <label className="pay-label">
            Approved quote total
            <input
              inputMode="decimal"
              value={quoteTotal}
              readOnly={quoteTotalLocked}
              onChange={(event) => setQuoteTotal(event.target.value.replace(/[^\d.]/g, ""))}
              placeholder="1560.00"
            />
          </label>
          <p className="text-sm text-zinc-600">
            {lookupState === "loading"
              ? "Checking for a deposit…"
              : lookupState === "error"
                ? `Could not verify the deposit. Call ${PHONE_DISPLAY} before paying the remaining balance.`
                : depositPaidCents > 0
                  ? `Deposit received: ${formatUsd(depositPaidCents)} (processing fee not credited).`
                  : "No deposit has been applied."}
          </p>
          {Number.isFinite(quoteTotalUsd) && !balanceBreakdown.payable && lookupState === "done" && (
            <p className="pay-banner pay-banner--warn">This move has no remaining balance.</p>
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
                    className={`pay-tip-option${tipType === option.type ? " is-on" : ""}`}
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
              <label className="pay-label">
                Custom tip amount
                <input
                  inputMode="decimal"
                  value={customTip}
                  onChange={(event) => setCustomTip(event.target.value.replace(/[^\d.]/g, ""))}
                  placeholder="0.00"
                />
              </label>
            )}
          </fieldset>
        </div>
      )}

      <details className="pay-details" open={detailsFilled || undefined}>
        <summary>Move details (optional)</summary>
        <div className="pay-fields">
          <label className="pay-label">
            Customer name
            <input
              value={quote.customer_name}
              onChange={(event) =>
                setQuote((current) => ({ ...current, customer_name: event.target.value }))
              }
            />
          </label>
          <label className="pay-label">
            Customer email
            <input
              type="email"
              value={quote.customer_email}
              onChange={(event) =>
                setQuote((current) => ({ ...current, customer_email: event.target.value }))
              }
            />
          </label>
          <label className="pay-label">
            Move date
            <input
              value={quote.move_date}
              onChange={(event) =>
                setQuote((current) => ({ ...current, move_date: event.target.value }))
              }
              placeholder="August 22, 2026"
            />
          </label>
          <label className="pay-label">
            Pickup address
            <input
              value={quote.pickup_address}
              onChange={(event) =>
                setQuote((current) => ({ ...current, pickup_address: event.target.value }))
              }
            />
          </label>
          <label className="pay-label pay-span-2">
            Delivery address
            <input
              value={quote.delivery_address}
              onChange={(event) =>
                setQuote((current) => ({ ...current, delivery_address: event.target.value }))
              }
            />
          </label>
          {kind === "deposit" && (
            <label className="pay-label pay-span-2">
              Quote number / move reference
              <input
                value={quote.quote_number}
                readOnly={quoteSigned}
                onChange={(event) =>
                  setQuote((current) => ({ ...current, quote_number: event.target.value }))
                }
                placeholder="Q-1042"
              />
            </label>
          )}
        </div>
      </details>
      <label className="pay-label">
        Note (optional)
        <input
          value={note}
          onChange={(event) => setNote(event.target.value)}
          maxLength={200}
          placeholder={spec.notePlaceholder}
        />
      </label>

      {kind === "deposit" && depositValid && (
        <ChargeSummary rows={summaryRows} totalCents={depositBreakdown.totalChargedCents} />
      )}
      {kind === "balance" && Number.isFinite(quoteTotalUsd) && quoteTotalUsd > 0 && (
        <>
          {balanceBreakdown.noDepositApplied && lookupState === "done" && (
            <p className="text-xs font-medium text-zinc-500">No deposit has been applied.</p>
          )}
          <ChargeSummary rows={summaryRows} totalCents={balanceBreakdown.totalChargedCents} />
        </>
      )}
      {kind === "tip" && tipValid && (
        <ChargeSummary rows={summaryRows} totalCents={depositBreakdown.totalChargedCents} />
      )}

      {error && (
        <p role="alert" className="pay-banner pay-banner--error">
          {error}
        </p>
      )}
      <button type="submit" disabled={starting || !valid || !ready} className="pay-submit">
        {starting
          ? "Opening checkout…"
          : `${spec.cta} · ${valid ? formatUsd(todayCents) : ""}`}
      </button>
      {kind === "deposit" && (
        <p className="pay-help">The move date is held after this deposit payment succeeds.</p>
      )}
      {kind !== "tip" && (
        <p className="pay-help">
          Want to tip after the move?{" "}
          <button type="button" className="pay-ghost" onClick={() => chooseKind("tip")}>
            Tip the crew
          </button>
        </p>
      )}
      <p className="pay-help">
        Card details stay on this page. Stripe processes the payment. Call {PHONE_DISPLAY} if
        anything looks off.
      </p>
    </form>
  );
}
