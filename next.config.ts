import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      }
    ],
  },
  // Ensure we can use top-level await in some cases (usually default now)
  experimental: {
    // serverActions: true, // Default in Next 14+
  }
};

export default nextConfig;
