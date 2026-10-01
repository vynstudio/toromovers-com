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
  // Static AVIF/WebP from the build. The Netlify image CDN would otherwise
  // rewrite homepage photos to /.netlify/images at request time.
  adapter: netlify({ imageCDN: false }),
  integrations: [react()],
  trailingSlash: "never",
  // Netlify pretty-URLs redirect directory/index.html back to a slash.
  // File output (/quotes.html) lets /quotes/ 308 to /quotes without a loop.
  build: { format: "file" },
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
