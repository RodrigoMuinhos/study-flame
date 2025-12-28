/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Standalone output for Docker deployment
  output: 'standalone',
  
  typescript: {
    // Em produção, não ignorar erros de TypeScript
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  eslint: {
    // Em produção, não ignorar erros de ESLint
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  
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
};

export default nextConfig;
