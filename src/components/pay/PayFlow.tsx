"use client";

import {
  Component,
  FormEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  balanceSummary,
  balanceTipLabel,
  checkoutCtaLabel,
  depositSummary,
  dollarsToCents,
  formatUsd,
  isCheckoutEmail,
  parseTipType,
  parseUsd,
  tipAmountCents,
  type PaymentKind,
  type QuoteFields,
  type TipType,
} from "@/lib/payments";
import { PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";
import { STRIPE_PUBLISHABLE_KEY } from "@/lib/stripe-public";

const TIP_OPTIONS: TipType[] = ["none", "15_percent", "20_percent", "25_percent", "custom"];

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

class PayEmbedBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) return this.props.fallback;
    return this.props.children;
  }
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
  const clientSecretRef = useRef("");

  useEffect(() => {
    clientSecretRef.current = clientSecret;
  }, [clientSecret]);

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
  const emailOk = isCheckoutEmail(quote.customer_email);

  const depositValid =
    Number.isFinite(selected) && selected >= spec.minUsd && selected <= spec.maxUsd;
  const customTipValid =
    tipType !== "custom" ||
    (Number.isFinite(customTipUsd) && customTipUsd >= 0 && customTipUsd <= CUSTOM_TIP_MAX_USD);
  const balanceAmountOk =
    lookupState !== "loading" &&
    lookupState !== "error" &&
    Number.isFinite(quoteTotalUsd) &&
    quoteTotalUsd > 0 &&
    balanceBreakdown.payable &&
    customTipValid &&
    balanceBreakdown.remainingCents / 100 <= PAYMENT_KIND.balance.maxUsd;
  const amountValid = kind === "balance" ? balanceAmountOk : kind === "tip" ? depositValid : depositValid;
  const valid = Boolean(ready && emailOk && amountValid);
  const todayCents =
    kind === "balance" ? balanceBreakdown.totalChargedCents : depositBreakdown.totalChargedCents;
  const amountKnown =
    kind === "balance"
      ? lookupState === "done" &&
        Number.isFinite(quoteTotalUsd) &&
        quoteTotalUsd > 0 &&
        balanceBreakdown.payable
      : kind === "tip"
        ? depositValid
        : depositValid;

  function checkoutDisabledReason(): string {
    if (!ready) return `Checkout is not connected yet. Call ${PHONE_DISPLAY}.`;
    if (kind === "balance" && lookupState === "loading") return "Checking for a deposit…";
    if (kind === "balance" && lookupState === "error") {
      return `Could not verify the deposit. Call ${PHONE_DISPLAY} before paying the remaining balance.`;
    }
    if (kind === "balance" && !Number.isFinite(quoteTotalUsd)) {
      return "Enter the approved quote total.";
    }
    if (kind === "balance" && !balanceBreakdown.payable) {
      return "This move has no remaining balance.";
    }
    if (kind === "balance" && !customTipValid) {
      return `Enter a custom tip of $0 to $${CUSTOM_TIP_MAX_USD.toLocaleString("en-US")}.`;
    }
    if (kind !== "balance" && !depositValid) {
      return `Enter an amount between $${spec.minUsd} and $${spec.maxUsd.toLocaleString("en-US")}.`;
    }
    if (!emailOk) return "Enter your email for the receipt.";
    return "";
  }

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
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("type", next);
      window.history.replaceState(window.history.state, "", url);
    }
  }

  function clearCheckout() {
    clientSecretRef.current = "";
    setClientSecret("");
    setChargedCents(0);
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
    const reason = checkoutDisabledReason();
    if (reason) {
      setError(reason);
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
          customerEmail: quote.customer_email.trim(),
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
      clientSecretRef.current = data.clientSecret;
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
    } finally {
      setStarting(false);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    const secret = clientSecretRef.current;
    if (!secret) {
      throw new Error("Checkout is not ready.");
    }
    return secret;
  }, []);
  const options = useMemo(
    () => ({
      fetchClientSecret,
    }),
    [fetchClientSecret],
  );

  const detailsFilled = Boolean(
    quote.customer_name ||
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

  const disabledReason = checkoutDisabledReason();

  const checkoutWell =
    clientSecret && stripePromise ? (
    <div className="pay-checkout">
      <div className="pay-checkout-bar">
        <button type="button" className="pay-ghost" onClick={clearCheckout}>
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
        <p className="pay-embed-status">Loading secure checkout…</p>
        <PayEmbedBoundary
          fallback={
            <p className="pay-banner pay-banner--error" role="alert">
              Card checkout could not load.{" "}
              <button type="button" className="pay-ghost" onClick={clearCheckout}>
                Change amount
              </button>{" "}
              or call {PHONE_DISPLAY}.
            </p>
          }
        >
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout className="pay-embed-frame" />
          </EmbeddedCheckoutProvider>
        </PayEmbedBoundary>
      </div>
      <p className="pay-help">
        Secure card checkout on this page. Need help?{" "}
        <a href={PHONE_TEL} className="pay-ghost">
          Call {PHONE_DISPLAY}
        </a>
        .
      </p>
    </div>
  ) : null;
  const showCheckout = Boolean(checkoutWell);

  return (
    <>
      {checkoutWell}
      <form
        onSubmit={startCheckout}
        className="space-y-5"
        hidden={showCheckout}
        aria-hidden={showCheckout}
      >
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
              placeholder="Other amount"
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
              placeholder="Quote number"
            />
          </label>
          <label className="pay-label">
            Approved quote total
            <input
              inputMode="decimal"
              value={quoteTotal}
              readOnly={quoteTotalLocked}
              onChange={(event) => setQuoteTotal(event.target.value.replace(/[^\d.]/g, ""))}
              placeholder="Approved total"
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
                  option === "custom"
                    ? Number.isFinite(customTipUsd)
                      ? dollarsToCents(Math.max(0, customTipUsd))
                      : 0
                    : tipAmountCents(remaining, option);
                return (
                  <label
                    key={option}
                    className={`pay-tip-option${tipType === option ? " is-on" : ""}`}
                  >
                    <span className="flex items-center gap-3 font-bold">
                      <input
                        type="radio"
                        name="tip"
                        checked={tipType === option}
                        onChange={() => {
                          setTipType(parseTipType(option));
                          if (option !== "custom") setCustomTip("");
                        }}
                      />
                      {balanceTipLabel(option)}
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
                  placeholder="Custom amount"
                />
              </label>
            )}
          </fieldset>
        </div>
      )}

      <label className="pay-label">
        Email for receipt <span className="pay-required">(required)</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          required
          aria-required="true"
          value={quote.customer_email}
          onChange={(event) =>
            setQuote((current) => ({ ...current, customer_email: event.target.value }))
          }
          placeholder=""
        />
      </label>

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
            Move date
            <input
              value={quote.move_date}
              onChange={(event) =>
                setQuote((current) => ({ ...current, move_date: event.target.value }))
              }
              placeholder=""
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
                placeholder="Quote number"
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
      {kind === "tip" && depositValid && (
        <ChargeSummary rows={summaryRows} totalCents={depositBreakdown.totalChargedCents} />
      )}

      {error && (
        <p role="alert" className="pay-banner pay-banner--error">
          {error}
        </p>
      )}
      <button type="submit" disabled={starting || !valid} className="pay-submit">
        {starting
          ? "Opening checkout…"
          : checkoutCtaLabel(spec.cta, amountKnown ? todayCents : null)}
      </button>
      {!valid && disabledReason && (
        <p className="pay-help" role="status">
          {disabledReason}
        </p>
      )}
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
    </>
  );
}
