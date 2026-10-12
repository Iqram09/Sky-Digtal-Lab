import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // All imagery is served from /public, so no remote image hosts are allowed.
  poweredByHeader: false,
};

export default nextConfig;
