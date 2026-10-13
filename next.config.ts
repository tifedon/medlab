import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: process.env.NEXT_PUBLIC_SUPABASE_URL
    ? {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
            pathname: '/storage/v1/object/public/website-files/**',
          },
        ],
      }
    : undefined,
};

export default nextConfig;
