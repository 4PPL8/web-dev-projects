import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Explicitly set the workspace root to this project to silence Turbopack warning
    root: __dirname,
  },
};

export default nextConfig;
