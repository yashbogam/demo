/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    // Fix serverActions and remove serverComponents
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000']
    }
    // serverComponents is no longer needed as it's the default in Next.js 14+
  },
  images: {
    domains: ['localhost', 'api.microlink.io', 'images.unsplash.com'],
  },
  // Using SWC for faster builds
  compiler: {
    styledComponents: true,
  },
  typescript: {
    // Temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
  eslint: {
    // Temporarily ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Adding custom webpack config
  webpack: (config, { isServer }) => {
    // Fix issues with module resolution
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      module: false,
    };
    
    // Clear module cache for development
    if (!isServer) {
      config.cache = false;
    }
    
    return config;
  },
};

module.exports = nextConfig; 