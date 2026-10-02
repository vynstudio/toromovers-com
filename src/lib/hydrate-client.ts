import { hydrateRoot } from "react-dom/client";
import React from "react";
import { pageLoaders, type PageModule } from "./page-modules";

declare global {
  interface Window {
    __TORO_PAGE__?: { pageKey: string; pageProps: Record<string, unknown> };
  }
}

export async function hydratePage(
  key: string,
  props: Record<string, unknown>,
) {
  const load = pageLoaders[key];
  const el = document.getElementById("app");
  if (!load || !el) return;
  const mod = (await load()) as PageModule;
  hydrateRoot(el, React.createElement(mod.default as never, props));
}
