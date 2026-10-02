import type { ReactNode } from "react";

/** layout.tsx is not rendered. Analytics scripts live in Base.astro. */
export default function Script(_props: {
  id?: string;
  src?: string;
  strategy?: string;
  children?: ReactNode;
  dangerouslySetInnerHTML?: { __html: string };
}) {
  return null;
}
