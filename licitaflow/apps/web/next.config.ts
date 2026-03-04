import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@licitaflow/shared', '@licitaflow/db'],
};

export default nextConfig;
