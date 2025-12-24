import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PWA Easy Rental',
  description: 'Location digitale sans frontières',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EasyRental',
  },
};

export const viewport: Viewport = {
  themeColor: '#0528d6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-white dark:bg-[#0f1323] transition-colors duration-300">
        <main>{children}</main>
      </body>
    </html>
  );
}