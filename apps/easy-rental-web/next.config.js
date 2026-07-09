/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL || 'http://localhost:8081';

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: [
    '@pwa-easy-rental/shared-ui',
    '@pwa-easy-rental/shared-services',
  ],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api-rental/:path*',
        destination: `${API_URL}/:path*`,
      },
      {
        source: '/uploads/:path*',
        destination: `${API_URL}/uploads/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
