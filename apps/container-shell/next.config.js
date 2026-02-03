/** @type {import('next').NextConfig} */

const ORG_URL = process.env.NEXT_PUBLIC_ORG_URL || 'http://localhost:3003' || 'https://pwa-easy-rental-org.vercel.app';
const CLIENT_URL = process.env.NEXT_PUBLIC_ORG_URL|| 'http://localhost:3001' || 'https://pwa-easy-rental-mfe-client.vercel.app';
const AGENCY_URL = process.env.NEXT_PUBLIC_ORG_URL || 'http://localhost:3002' || 'https://pwa-easy-rental-agency.vercel.app';
// const APP_URL = process.env.NEXT_PUBLIC_ORG_URL || 'https://pwa-easy-rental-app.vercel.app';

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@pwa-easy-rental/shared-ui', '@pwa-easy-rental/shared-services'],
  async rewrites() {
    return [
      // MFE CLIENT
      {
        source: '/client',
        destination: `${CLIENT_URL}/client`,
      },
      {
        source: '/client/:path*',
        destination: `${CLIENT_URL}/client/:path*`,
      },
      
      // MFE AGENCY
      {
        source: '/agency',
        destination: `${AGENCY_URL}/agency`,
      },
      {
        source: '/agency/:path*',
        destination: `${AGENCY_URL}/agency/:path*`,
      },
      
      // MFE ORGANISATION
      {
        source: '/organisation',
        destination: `${ORG_URL}/organisation`,
      },
      {
        source: '/organisation/:path*',
        destination: `${ORG_URL}/organisation/:path*`,
      },
     
    ];
  },
};

module.exports = nextConfig;