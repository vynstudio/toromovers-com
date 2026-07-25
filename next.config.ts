import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Isolate from parent /Users/vynstudio/package-lock.json
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
