import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Blog Studio sends article text and (as a fallback) an inline cover image to server actions
      bodySizeLimit: "4mb",
    },
  },
};

export default nextConfig;
