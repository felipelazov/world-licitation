import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@licitaflow/shared', '@licitaflow/db', '@licitaflow/ui'],
};

export default nextConfig;
