'use client';

import React from 'react';
import Link from 'next/link';
import { Zap, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const comingSoon = (title: string) => `/coming-soon?title=${encodeURIComponent(title)}`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Footer = ({ t, nav }: any) => (
  <footer className="w-full pt-12 pb-8 px-6 max-w-7xl mx-auto border-t border-slate-100 dark:border-slate-800 mt-8">
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10 text-xs font-bold text-slate-400">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#0528d6] rounded-lg flex items-center justify-center text-white">
            <Zap size={16} fill="currentColor" />
          </div>
          <span className="text-base font-black italic text-slate-900 dark:text-white">PWA Easy Rental</span>
        </div>
        <p className="normal-case font-medium leading-relaxed max-w-xs text-slate-500 dark:text-slate-400 mb-6 text-sm">
          {t.desc}
        </p>
        <div className="flex gap-3">
          {[Facebook, Twitter, Instagram, Mail].map((Icon, i) => (
            <Link
              key={i}
              href={comingSoon('Réseaux sociaux')}
              className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-[#0528d6] hover:text-white transition-colors"
            >
              <Icon size={18} />
            </Link>
          ))}
        </div>
      </div>

      <div>
        <h5 className="text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-[10px]">{nav.features}</h5>
        <ul className="space-y-3 text-sm">
          <li><Link href="/#features" className="hover:text-[#0528d6]">PWA First</Link></li>
          <li><Link href={comingSoon('Mode hors-ligne')} className="hover:text-[#0528d6]">Offline Sync</Link></li>
          <li><Link href={comingSoon('GPS temps réel')} className="hover:text-[#0528d6]">Real-time GPS</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-[10px]">Docs</h5>
        <ul className="space-y-3 text-sm">
          <li><Link href={comingSoon('Guides API')} className="hover:text-[#0528d6]">API Guides</Link></li>
          <li><Link href={comingSoon('SDKs')} className="hover:text-[#0528d6]">SDKs</Link></li>
          <li><Link href={comingSoon('Statut des services')} className="hover:text-[#0528d6]">Status</Link></li>
        </ul>
      </div>

      <div>
        <h5 className="text-slate-900 dark:text-white mb-4 uppercase tracking-wider text-[10px]">Connect</h5>
        <ul className="space-y-3 text-sm">
          <li><Link href="/help" className="hover:text-[#0528d6]">Support</Link></li>
          <li><Link href={comingSoon('Carrières')} className="hover:text-[#0528d6]">Careers</Link></li>
          <li><Link href={comingSoon('Presse')} className="hover:text-[#0528d6]">Press</Link></li>
        </ul>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400 gap-4">
      <span className="uppercase tracking-widest">{t.copy}</span>
      <div className="flex gap-6">
        <Link href={comingSoon('Politique de confidentialité')} className="hover:text-[#0528d6]">{t.privacy}</Link>
        <Link href={comingSoon('Conditions d\'utilisation')} className="hover:text-[#0528d6]">{t.terms}</Link>
      </div>
    </div>
  </footer>
);
