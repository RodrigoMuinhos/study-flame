import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Standalone output only for Docker deployment, not for Vercel
  ...(process.env.VERCEL ? {} : { output: 'standalone' }),
  
  async rewrites() {
    // Only use rewrites in development
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api'}/:path*`,
        },
      ];
    }
    return [];
  },

  webpack: (config) => {
    // Ensure @ alias resolves to src during build
    config.resolve.alias['@'] = path.join(process.cwd(), 'src');
    return config;
  },
};

export default nextConfig;
