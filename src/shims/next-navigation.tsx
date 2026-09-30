import { useState } from "react";

export function useSearchParams(): URLSearchParams {
  const [params] = useState(
    () =>
      new URLSearchParams(
        typeof window === "undefined" ? "" : window.location.search,
      ),
  );
  return params;
}

export function usePathname(): string {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
}

export function redirect(path: string): never {
  throw new Error(`REDIRECT:${path}`);
}

export function notFound(): never {
  throw new Error("NOT_FOUND");
}
