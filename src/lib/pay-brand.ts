import { BUSINESS_NAME, PHONE_DISPLAY } from "./site.ts";
import type { PaymentKind } from "./payments.ts";

/** Isolated pay-page tokens. Do not import funnel-offer copy here. */
export const PAY_INK = "#0A0A0A";
export const PAY_ACCENT = "#E20613";
export const PAY_ACCENT_HOVER = "#B80510";
export const PAY_ACCENT_SOFT = "#FCE6E8";
export const PAY_BG = "#F6F6F6";
export const PAY_DISPLAY_NAME = BUSINESS_NAME;

export function stripeCheckoutBranding(): {
  background_color: string;
  button_color: string;
  border_style: "rounded";
  display_name: string;
  font_family: "inter";
} {
  return {
    background_color: "#FFFFFF",
    button_color: PAY_ACCENT,
    border_style: "rounded",
    display_name: PAY_DISPLAY_NAME,
    font_family: "inter",
  };
}

export function stripeCheckoutCustomText(kind: PaymentKind): {
  submit: { message: string };
  after_submit: { message: string };
} {
  const submit =
    kind === "deposit"
      ? "Pay deposit"
      : kind === "balance"
        ? "Pay remaining balance"
        : "Send tip";
  return {
    submit: { message: submit },
    after_submit: {
      message: `Questions? Call Toro Movers at ${PHONE_DISPLAY}.`,
    },
  };
}

export function stripeStatementSuffix(): string {
  return "TORO";
}
