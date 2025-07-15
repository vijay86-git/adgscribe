import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    remotePatterns: [new URL(`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/storage/uploads/**`)],
  },
};

export default nextConfig;
