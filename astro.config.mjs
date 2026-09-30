import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://toromovers.com",
  output: "static",
  adapter: netlify(),
  integrations: [react()],
  trailingSlash: "never",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.join(root, "src"),
        "next/image": path.join(root, "src/shims/next-image.tsx"),
        "next/link": path.join(root, "src/shims/next-link.tsx"),
        "next/navigation": path.join(root, "src/shims/next-navigation.tsx"),
        "next/dynamic": path.join(root, "src/shims/next-dynamic.tsx"),
        "next/server": path.join(root, "src/shims/next-server.ts"),
      },
    },
    ssr: {
      external: ["stripe", "@netlify/blobs"],
    },
  },
});
