export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function normalizeUsPhone(value: string): string | null {
  let digits = digitsOnly(value);
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  if (digits.length !== 10) return null;
  return `+1${digits}`;
}

export function formatUsPhone(value: string): string {
  let digits = digitsOnly(value);
  if (digits.length === 11 && digits.startsWith("1")) digits = digits.slice(1);
  const area = digits.slice(0, 3);
  const prefix = digits.slice(3, 6);
  const line = digits.slice(6, 10);
  if (!digits) return "";
  if (digits.length < 4) return `(${area}`;
  if (digits.length < 7) return `(${area}) ${prefix}`;
  return `(${area}) ${prefix}-${line}`;
}
