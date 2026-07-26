import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Match real breakpoints; skip oversized variants
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    imageSizes: [96, 128, 256, 384, 640],
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
