import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Disable font optimization to prevent build-time network requests for Google Fonts
  // that were causing Turbopack build failures.
  experimental: {
    optimizeFonts: false,
  } as any,
};

export default nextConfig;
