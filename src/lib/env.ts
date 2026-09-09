import { STRIPE_PUBLISHABLE_KEY as FALLBACK_PUBLISHABLE_KEY } from "@/lib/stripe-public";

/** Request-time env. Bracket access so Next does not bake empty values into the function. */
export function runtimeEnv(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

export function stripePublishableKey(): string {
  return (
    runtimeEnv(
      "STRIPE_PK",
      "STRIPE_PUBLISHABLE_KEY",
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    ) || FALLBACK_PUBLISHABLE_KEY
  );
}
