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
  "10_percent",
  "15_percent",
  "20_percent",
  "custom",
] as const;
export type TipType = (typeof TIP_TYPES)[number];

export const TIP_PERCENT_BY_TYPE: Record<
  Exclude<TipType, "none" | "custom">,
  number
> = {
  "10_percent": 10,
  "15_percent": 15,
  "20_percent": 20,
};

export const PAY_MODES = ["deposit", "balance", "fixed"] as const;
export type PayMode = (typeof PAY_MODES)[number];

export type QuoteFields = {
  quote_number: string;
  move_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
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
  customer_phone: "",
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
  if (tipType === "10_percent" || tipType === "15_percent" || tipType === "20_percent") {
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

/** Tip is % of the selected amount (not of the fee); 3.5% processing fee is then applied to amount + tip, matching remaining-balance checkout. */
export function withTipAndProcessingFee(
  baseCents: number,
  tipType: TipType = "none",
  customTipCents = 0,
): {
  baseCents: number;
  tipType: TipType;
  tipPercentage: number;
  tipCents: number;
  subtotalCents: number;
  processingFeeCents: number;
  totalChargedCents: number;
} {
  const amount = Math.max(0, Math.round(baseCents));
  const type = parseTipType(tipType);
  const tipCents = tipAmountCents(amount, type, customTipCents);
  const subtotalCents = amount + tipCents;
  const fee = processingFeeCents(subtotalCents);
  return {
    baseCents: amount,
    tipType: type,
    tipPercentage: tipPercentage(type),
    tipCents,
    subtotalCents,
    processingFeeCents: fee,
    totalChargedCents: subtotalCents + fee,
  };
}

export function depositSummary(
  depositCents: number,
  tipType: TipType = "none",
  customTipCents = 0,
): {
  depositCents: number;
  tipType: TipType;
  tipPercentage: number;
  tipCents: number;
  subtotalCents: number;
  processingFeeCents: number;
  totalChargedCents: number;
} {
  const charged = withTipAndProcessingFee(depositCents, tipType, customTipCents);
  return {
    depositCents: charged.baseCents,
    tipType: charged.tipType,
    tipPercentage: charged.tipPercentage,
    tipCents: charged.tipCents,
    subtotalCents: charged.subtotalCents,
    processingFeeCents: charged.processingFeeCents,
    totalChargedCents: charged.totalChargedCents,
  };
}

export function balanceSummary(opts: {
  quoteTotalCents: number;
  depositPaidCents: number;
  tipType: TipType;
  customTipCents?: number;
  remainingOverrideCents?: number | null;
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
  let remainingCents = remainingMoveBalanceCents(quoteTotalCents, depositPaidCents);
  if (typeof opts.remainingOverrideCents === "number" && opts.remainingOverrideCents > 0) {
    remainingCents =
      remainingCents > 0
        ? Math.max(remainingCents, Math.round(opts.remainingOverrideCents))
        : Math.round(opts.remainingOverrideCents);
  }
  const charged = withTipAndProcessingFee(
    remainingCents,
    opts.tipType,
    opts.customTipCents ?? 0,
  );
  return {
    quoteTotalCents,
    depositPaidCents,
    remainingCents,
    tipType: charged.tipType,
    tipPercentage: charged.tipPercentage,
    tipCents: charged.tipCents,
    subtotalCents: charged.subtotalCents,
    processingFeeCents: charged.processingFeeCents,
    totalChargedCents: charged.totalChargedCents,
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
    presetsUsd: [75, 100, 150],
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
  if (raw === "fixed") return "deposit";
  if (isPaymentKind(raw)) return raw;
  return "deposit";
}

export function isPayMode(value: unknown): value is PayMode {
  return typeof value === "string" && PAY_MODES.includes(value as PayMode);
}

export function parsePayMode(value: unknown): PayMode | null {
  const raw = Array.isArray(value) ? value[0] : value;
  return isPayMode(raw) ? raw : null;
}

/** Staff pay links pass integer cents (`/pay?amount=49500`). */
export function parseAmountCents(value: unknown): number | null {
  const raw = Array.isArray(value) ? value[0] : value;
  if (typeof raw === "number") {
    if (!Number.isInteger(raw) || raw <= 0) return null;
    return raw;
  }
  if (typeof raw !== "string") return null;
  const text = raw.trim();
  if (!/^\d+$/.test(text)) return null;
  const cents = Number.parseInt(text, 10);
  if (!Number.isFinite(cents) || cents <= 0) return null;
  return cents;
}

export function firstQueryValue(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] || "";
  return value || "";
}

export function parsePayLink(
  params: Record<string, string | string[] | undefined>,
): {
  kind: PaymentKind;
  mode: PayMode;
  amountCents: number | null;
  amountLocked: boolean;
} {
  const modeParam = parsePayMode(params.mode);
  const typeKind = parsePaymentKind(params.type || params.kind);
  const kind: PaymentKind =
    modeParam === "balance"
      ? "balance"
      : modeParam === "deposit" || modeParam === "fixed"
        ? "deposit"
        : typeKind;
  const mode: PayMode = modeParam ?? (kind === "balance" ? "balance" : "deposit");
  const amountCents = parseAmountCents(params.amount);
  const amountLocked = Boolean(amountCents && mode !== "fixed" && kind !== "tip");
  return { kind, mode, amountCents, amountLocked };
}

export function amountMeetsLinkFloor(
  selectedCents: number,
  lockedAmountCents: number | null | undefined,
  amountLocked: boolean,
): boolean {
  if (!amountLocked || !lockedAmountCents) return true;
  return Math.round(selectedCents) >= lockedAmountCents;
}

export function clipField(value: unknown, max = 200): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/** Optional receipt email for Embedded Checkout when provided. */
export function isCheckoutEmail(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const email = value.trim();
  if (email.length < 5 || email.length > 180) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** CTA copy: never leave a trailing middot when the amount is unknown. */
export function checkoutCtaLabel(cta: string, amountCents?: number | null): string {
  if (typeof amountCents === "number" && Number.isFinite(amountCents) && amountCents > 0) {
    return `${cta} · ${formatUsd(amountCents)}`;
  }
  return cta;
}

export function balanceTipLabel(type: TipType): string {
  switch (type) {
    case "10_percent":
      return "10%";
    case "15_percent":
      return "15%";
    case "20_percent":
      return "20%";
    case "custom":
      return "Custom";
    default:
      return "No tip";
  }
}

export function dollarsInputString(cents: number): string {
  if (!Number.isFinite(cents) || cents <= 0) return "";
  return cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
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
