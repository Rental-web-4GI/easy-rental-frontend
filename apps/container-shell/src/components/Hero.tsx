'use client';
import React from 'react';
import { DownloadCloud } from 'lucide-react';
import { MFE_URLS } from '../config/mfe-urls';
import Image from 'next/image';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Hero = ({ t, onInstall }: any) => (
  <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
    <div>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 text-[10px] font-black tracking-[0.2em] mb-5 border border-blue-100 dark:border-blue-900 italic">
        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> {t.badge}
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-[900] italic leading-[0.9] tracking-tighter text-slate-900 dark:text-white mb-5">
        {t.title} {t.titleAccent}.
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg mb-8">{t.desc}</p>

      <div className="flex flex-wrap gap-3 items-center">
        <button
          type="button"
          onClick={() => { window.location.href = MFE_URLS.client; }}
          className="bg-[#0528d6] text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl hover:scale-[1.02] transition-transform italic"
        >
          {t.ctaReserve}
        </button>
        <button
          type="button"
          onClick={() => { window.location.href = MFE_URLS.organisation; }}
          className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white px-6 py-3 rounded-2xl font-black text-sm hover:scale-[1.02] transition-transform italic"
        >
          {t.ctaManager}
        </button>
        <button
          type="button"
          onClick={onInstall}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-colors"
        >
          <DownloadCloud size={16} className="text-blue-600" />
          <span className="font-black text-[10px] uppercase text-slate-500">{t.ctaInstall}</span>
        </button>
      </div>
    </div>

    <div className="relative group hidden lg:block">
      <div className="absolute inset-0 bg-blue-600/15 rounded-full blur-[80px]" />
      <div className="relative bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
        <div className="bg-white rounded-[2rem] overflow-hidden aspect-video">
          <Image src="/hero.avif" alt="Dashboard Easy Rental" width={640} height={360} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </section>
);
