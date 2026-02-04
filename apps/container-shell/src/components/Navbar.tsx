'use client';

import { useState } from 'react';
import {
  Zap,
  Languages,
  Sun,
  Moon,
  DownloadCloud,
  Menu,
  X,
} from 'lucide-react';
import { MFE_URLS } from '../config/mfe-urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Navbar = ({ t, lang, onLangToggle, darkMode, onThemeToggle, onInstall }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] bg-white/90 dark:bg-[#0f1323]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter text-blue-900 dark:text-white">
              PWA <span className="text-blue-600">Easy Rental</span>
            </span>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-black text-slate-500">
            <a href="/#features" className="hover:text-blue-600">{t.nav.features}</a>
            <a href="/#solutions" className="hover:text-blue-600">{t.nav.solutions}</a>
            <a href="/feedback" className="hover:text-blue-600">{t.nav.feedback}</a>
            <a href="/help" className="hover:text-blue-600">{t.nav.help}</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.location.href = MFE_URLS.agency}
              className="hidden md:block text-sm font-black text-slate-400 hover:text-blue-600"
            >
              {t.nav.login}
            </button>

            <button
              onClick={onInstall}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-sm font-black hover:bg-blue-600 hover:text-white group"
            >
              <DownloadCloud size={14} className="text-blue-600 group-hover:text-white" />
              {t.nav.install}
            </button>

            <button
              onClick={onLangToggle}
              className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-black border"
            >
              <Languages size={14} /> {lang}
            </button>

            <button
              onClick={onThemeToggle}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href={MFE_URLS.client}
              className="hidden lg:block bg-blue-600 text-white px-6 py-2 rounded-2xl font-black text-sm shadow-xl hover:bg-blue-700"
            >
              {t.nav.reserve}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-[#0f1323] flex flex-col">
          <div className="flex items-center justify-between px-6 h-20 border-b">
            <span className="text-xl font-black">Menu</span>
            <button onClick={() => setOpen(false)}>
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-6 px-6 py-10 text-lg font-black">
            <a onClick={() => setOpen(false)} href="/#features">{t.nav.features}</a>
            <a onClick={() => setOpen(false)} href="/#solutions">{t.nav.solutions}</a>
            <a onClick={() => setOpen(false)} href="/feedback">{t.nav.feedback}</a>
            <a onClick={() => setOpen(false)} href="/help">{t.nav.help}</a>

            <hr className="my-4" />

            <button onClick={onInstall} className="flex items-center gap-2">
              <DownloadCloud size={18} /> {t.nav.install}
            </button>

            <button onClick={() => window.location.href = MFE_URLS.agency}>
              {t.nav.login}
            </button>

            <a
              href={MFE_URLS.client}
              className="bg-blue-600 text-white py-3 rounded-2xl text-center"
            >
              {t.nav.reserve}
            </a>
          </div>
        </div>
      )}
    </>
  );
};
