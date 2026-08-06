import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
