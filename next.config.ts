import type { NextConfig } from "next";
import path from "path";

/** Publishable key only — never put STRIPE_SECRET_KEY here (it would ship to the browser). */
const stripePublishableKey =
  process.env.STRIPE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
  "";

const nextConfig: NextConfig = {
  env: {
    STRIPE_PK: stripePublishableKey,
  },
  images: {
    // WebP first for faster mobile decode; AVIF when browser supports it
    formats: ["image/webp", "image/avif"],
    // Mobile-first widths (skip 1920 — sources max ~1280 WebP)
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1280],
    imageSizes: [64, 96, 128, 256, 384, 640],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  // Isolate from parent /Users/vynstudio/package-lock.json
  turbopack: {
    root: path.join(__dirname),
  },
  // Slightly smaller JS/CSS in production
  compress: true,
  poweredByHeader: false,
  serverExternalPackages: ["stripe", "@netlify/blobs"],
  async redirects() {
    const toFunnel = [
      "/free-quote",
      "/get-a-quote",
      "/get-quote",
      "/quote",
    ];
    const toChecklist = ["/job-size", "/your-move", "/movingday-checklist"];
    return [
      ...toFunnel.flatMap((source) => [
        { source, destination: "/get-my-price", permanent: true },
        { source: `${source}/:path*`, destination: "/get-my-price", permanent: true },
      ]),
      ...toChecklist.flatMap((source) => [
        { source, destination: "/move-day-checklist", permanent: true },
        { source: `${source}/:path*`, destination: "/move-day-checklist", permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
