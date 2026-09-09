export const PAYMENT_KINDS = ["deposit", "balance", "tip"] as const;
export type PaymentKind = (typeof PAYMENT_KINDS)[number];

/** Card processing surcharge added to every checkout. */
export const CARD_FEE_RATE = 0.035;

export function cardFeeCents(baseCents: number): number {
  return Math.round(baseCents * CARD_FEE_RATE);
}

export function withCardFee(baseCents: number): {
  baseCents: number;
  feeCents: number;
  totalCents: number;
} {
  const feeCents = cardFeeCents(baseCents);
  return { baseCents, feeCents, totalCents: baseCents + feeCents };
}

export function formatUsd(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
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
    label: "Deposit",
    shortLabel: "Deposit",
    productName: "Move deposit — Toro Movers",
    telegramTitle: "DEPOSIT received — Toro Movers",
    minUsd: 25,
    maxUsd: 5_000,
    presetsUsd: [50, 100, 150, 250],
    defaultUsd: 100,
    notePlaceholder: "Job date or address (optional)",
    cta: "Pay deposit",
  },
  balance: {
    label: "Pay in full",
    shortLabel: "Balance",
    productName: "Move payment — Toro Movers",
    telegramTitle: "PAYMENT received — Toro Movers",
    minUsd: 50,
    maxUsd: 20_000,
    presetsUsd: [150, 250, 400, 600],
    defaultUsd: 250,
    notePlaceholder: "Invoice # or move date (optional)",
    cta: "Pay now",
  },
  tip: {
    label: "Tip the crew",
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

export function isPaymentKind(value: unknown): value is PaymentKind {
  return typeof value === "string" && PAYMENT_KINDS.includes(value as PaymentKind);
}

export function parsePaymentKind(value: string | string[] | undefined): PaymentKind {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "full" || raw === "payment") return "balance";
  if (isPaymentKind(raw)) return raw;
  return "deposit";
}
