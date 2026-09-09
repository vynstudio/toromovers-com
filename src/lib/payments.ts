export const PAYMENT_KINDS = ["deposit", "balance", "tip"] as const;
export type PaymentKind = (typeof PAYMENT_KINDS)[number];

/** The two customer-facing quote-payment options. Standalone tips are separate. */
export const PRIMARY_PAYMENT_KINDS = ["deposit", "balance"] as const;
export type PrimaryPaymentKind = (typeof PRIMARY_PAYMENT_KINDS)[number];

/** Card processing surcharge added to every checkout. Label is customer-facing and must stay exact. */
export const CARD_FEE_RATE = 0.035;
export const PROCESSING_FEE_RATE = CARD_FEE_RATE;
export const PROCESSING_FEE_LABEL = "Processing Fee (3.5%)";

export const TIP_TYPES = [
  "none",
  "15_percent",
  "20_percent",
  "25_percent",
  "custom",
] as const;
export type TipType = (typeof TIP_TYPES)[number];

export const TIP_PERCENT_BY_TYPE: Record<
  Exclude<TipType, "none" | "custom">,
  number
> = {
  "15_percent": 15,
  "20_percent": 20,
  "25_percent": 25,
};

export type QuoteFields = {
  quote_number: string;
  move_reference: string;
  customer_name: string;
  customer_email: string;
  move_date: string;
  pickup_address: string;
  delivery_address: string;
  customer_note: string;
};

export const EMPTY_QUOTE_FIELDS: QuoteFields = {
  quote_number: "",
  move_reference: "",
  customer_name: "",
  customer_email: "",
  move_date: "",
  pickup_address: "",
  delivery_address: "",
  customer_note: "",
};

export function dollarsToCents(value: number): number {
  return Math.round(value * 100);
}

export function parseUsd(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : NaN;
  if (typeof value !== "string") return NaN;
  const cleaned = value.replace(/[$,\s]/g, "").trim();
  if (!cleaned) return NaN;
  return Number.parseFloat(cleaned);
}

export function centsToDollarString(cents: number): string {
  return (cents / 100).toFixed(2);
}

export function cardFeeCents(baseCents: number): number {
  return Math.round(baseCents * CARD_FEE_RATE);
}

export function processingFeeCents(baseCents: number): number {
  return cardFeeCents(baseCents);
}

export function withCardFee(baseCents: number): {
  baseCents: number;
  feeCents: number;
  totalCents: number;
} {
  const feeCents = cardFeeCents(baseCents);
  return { baseCents, feeCents, totalCents: baseCents + feeCents };
}

export function withProcessingFee(baseCents: number): {
  baseCents: number;
  feeCents: number;
  totalCents: number;
} {
  return withCardFee(baseCents);
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

export function isTipType(value: unknown): value is TipType {
  return typeof value === "string" && TIP_TYPES.includes(value as TipType);
}

export function parseTipType(value: unknown): TipType {
  return isTipType(value) ? value : "none";
}

export function tipPercentage(tipType: TipType): number {
  if (tipType === "15_percent" || tipType === "20_percent" || tipType === "25_percent") {
    return TIP_PERCENT_BY_TYPE[tipType];
  }
  return 0;
}

export function tipAmountCents(
  remainingCents: number,
  tipType: TipType,
  customTipCents = 0,
): number {
  if (tipType === "none") return 0;
  if (tipType === "custom") return Math.max(0, Math.round(customTipCents));
  return Math.round(remainingCents * (tipPercentage(tipType) / 100));
}

/** Credit only the deposit itself — never the Processing Fee (3.5%) paid with it. */
export function remainingMoveBalanceCents(
  quoteTotalCents: number,
  depositPaidCents: number,
): number {
  const quote = Math.max(0, Math.round(quoteTotalCents));
  const deposit = Math.max(0, Math.round(depositPaidCents));
  return quote - deposit;
}

export function depositSummary(depositCents: number): {
  depositCents: number;
  processingFeeCents: number;
  totalChargedCents: number;
} {
  const amount = Math.max(0, Math.round(depositCents));
  const fee = processingFeeCents(amount);
  return {
    depositCents: amount,
    processingFeeCents: fee,
    totalChargedCents: amount + fee,
  };
}

export function balanceSummary(opts: {
  quoteTotalCents: number;
  depositPaidCents: number;
  tipType: TipType;
  customTipCents?: number;
}): {
  quoteTotalCents: number;
  depositPaidCents: number;
  remainingCents: number;
  tipType: TipType;
  tipPercentage: number;
  tipCents: number;
  subtotalCents: number;
  processingFeeCents: number;
  totalChargedCents: number;
  noDepositApplied: boolean;
  payable: boolean;
} {
  const quoteTotalCents = Math.max(0, Math.round(opts.quoteTotalCents));
  const depositPaidCents = Math.max(0, Math.round(opts.depositPaidCents));
  const remainingCents = remainingMoveBalanceCents(quoteTotalCents, depositPaidCents);
  const tipType = opts.tipType;
  const tipCents = tipAmountCents(remainingCents, tipType, opts.customTipCents ?? 0);
  const subtotalCents = remainingCents + tipCents;
  const fee = processingFeeCents(subtotalCents);
  return {
    quoteTotalCents,
    depositPaidCents,
    remainingCents,
    tipType,
    tipPercentage: tipPercentage(tipType),
    tipCents,
    subtotalCents,
    processingFeeCents: fee,
    totalChargedCents: subtotalCents + fee,
    noDepositApplied: depositPaidCents <= 0,
    payable: remainingCents > 0,
  };
}

export const PAYMENT_KIND: Record<
  PaymentKind,
  {
    label: string;
    shortLabel: string;
    productName: string;
    telegramTitle: string;
    minUsd: number;
    maxUsd: number;
    presetsUsd: number[];
    defaultUsd: number;
    notePlaceholder: string;
    cta: string;
  }
> = {
  deposit: {
    label: "Pay Deposit",
    shortLabel: "Deposit",
    productName: "Move deposit — Toro Movers",
    telegramTitle: "DEPOSIT received — Toro Movers",
    minUsd: 25,
    maxUsd: 5_000,
    presetsUsd: [50, 100, 150, 250],
    defaultUsd: 100,
    notePlaceholder: "Job date, name, address, or quote number",
    cta: "Pay deposit",
  },
  balance: {
    label: "Pay Remaining Balance",
    shortLabel: "Remaining balance",
    productName: "Remaining move balance — Toro Movers",
    telegramTitle: "BALANCE received — Toro Movers",
    minUsd: 1,
    maxUsd: 20_000,
    presetsUsd: [],
    defaultUsd: 0,
    notePlaceholder: "Quote number, move date, or address (optional)",
    cta: "Pay remaining balance",
  },
  tip: {
    label: "Tip the Crew",
    shortLabel: "Tip",
    productName: "Tip for the Toro Movers crew",
    telegramTitle: "TIP received — Toro Movers",
    minUsd: 5,
    maxUsd: 500,
    presetsUsd: [10, 20, 40, 60],
    defaultUsd: 20,
    notePlaceholder: "Thanks for taking care of the piano.",
    cta: "Send tip",
  },
};

export const CUSTOM_TIP_MAX_USD = 5_000;

export function isPaymentKind(value: unknown): value is PaymentKind {
  return typeof value === "string" && PAYMENT_KINDS.includes(value as PaymentKind);
}

export function parsePaymentKind(value: string | string[] | undefined): PaymentKind {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "full" || raw === "payment") return "balance";
  if (isPaymentKind(raw)) return raw;
  return "deposit";
}

export function clipField(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function mergeQuoteFields(
  ...parts: Array<Partial<QuoteFields> | null | undefined>
): QuoteFields {
  const out = { ...EMPTY_QUOTE_FIELDS };
  for (const part of parts) {
    if (!part) continue;
    for (const key of Object.keys(EMPTY_QUOTE_FIELDS) as (keyof QuoteFields)[]) {
      const next = clipField(part[key], key === "customer_note" ? 200 : 180);
      if (next) out[key] = next;
    }
  }
  return out;
}
