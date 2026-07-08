'use client';
import React, { useEffect } from 'react';
import { Hero } from '../components/Hero';
import { Solutions } from '../components/Solutions';
import { Features } from '../components/Features';
import Testimonial from '@/components/testimonial';
import { MFE_URLS } from '../config/mfe-urls';
import Link from 'next/link';
import { useLang } from '../components/LangContext';

export default function LandingPage() {
  const { t } = useLang();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f1323] text-slate-900 dark:text-white font-sans transition-colors duration-300">
      <Hero t={t.hero} onInstall={() => alert(t.hero.installNotice)} />
      <Solutions t={t.stakeholders} />
      <Features t={t.features} />
      <Testimonial />

      <section className="py-12 md:py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-blue-600 rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 overflow-hidden shadow-[0_40px_80px_-15px_rgba(5,40,214,0.3)]">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 -skew-x-12 translate-x-1/2" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500 rounded-full blur-[80px] opacity-50" />

            <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-left">
                <h2 className="text-4xl md:text-6xl font-[900] italic leading-[0.9] tracking-tighter text-white mb-6 ">
                  {t.ctaFinal.title} <br /> {t.ctaFinal.titleAccent}
                </h2>
                <p className="text-blue-100 text-lg font-medium max-w-md leading-relaxed">
                  {t.ctaFinal.desc}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <Link
                  href={MFE_URLS.client}
                  className="inline-flex items-center justify-center bg-white text-blue-600 px-10 py-5 rounded-[2rem] font-black text-sm italic hover:scale-105 transition-transform shadow-xl"
                >
                  {t.ctaFinal.catalog}
                </Link>
                <Link
                  href="/help"
                  className="inline-flex items-center justify-center bg-blue-700 text-white border border-blue-500 px-10 py-5 rounded-[2rem] font-black text-sm italic hover:bg-blue-800 transition-colors"
                >
                  {t.ctaFinal.help}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
