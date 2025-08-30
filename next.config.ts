import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker
  output: 'standalone',
  
  // Configure server external packages
  serverExternalPackages: ['pg'],
  
  // Disable ESLint during build (for Docker builds)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Enable request logging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // Configure webpack for better compatibility
  webpack: (config) => {
    config.externals.push({
      'pg-native': 'pg-native',
    });
    return config;
  },
};

export default nextConfig;
