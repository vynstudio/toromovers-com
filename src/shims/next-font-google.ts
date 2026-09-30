/** layout.tsx is not on the Astro render path. Inter is loaded in globals.css. */
export function Inter(options: { variable?: string; [key: string]: unknown }) {
  return { variable: options.variable || "", className: "" };
}
