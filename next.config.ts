import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'localhost',
      },
      {
        hostname: 'dev-cms-streaming.paringininfo.com',
      },
      {
        hostname: 'cms-streaming.paringininfo.com',
      },
    ],
  },
};

export default nextConfig;
