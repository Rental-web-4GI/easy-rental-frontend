import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PWA Easy Rental',
  description: 'Location digitale sans frontières',
  manifest: '/organisation/manifest.json',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      {/* On s'assure que le body n'a aucune marge par défaut */}
      <body className="min-h-screen bg-white dark:bg-[#0f1323] transition-colors duration-300 m-0 p-0">
        {/* On enlève le <main className="container..."> pour laisser la page gérer son espace */}
        <main>{children}</main>
      </body>
    </html>
  );
}