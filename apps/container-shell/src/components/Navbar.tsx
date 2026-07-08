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

const actionBtn =
  'h-10 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-black transition-colors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Navbar = ({ t, lang, onLangToggle, darkMode, onThemeToggle, onInstall }: any) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] bg-white/95 dark:bg-[#0f1323]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 h-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-[#0528d6] rounded-xl flex items-center justify-center text-white">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900 dark:text-white hidden sm:block">
              PWA <span className="text-[#0528d6]">Easy Rental</span>
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-6 text-xs font-black text-slate-500 uppercase tracking-wide">
            <a href="/#features" className="hover:text-[#0528d6]">{t.nav.features}</a>
            <a href="/#solutions" className="hover:text-[#0528d6]">{t.nav.solutions}</a>
            <a href="/feedback" className="hover:text-[#0528d6]">{t.nav.feedback}</a>
            <a href="/help" className="hover:text-[#0528d6]">{t.nav.help}</a>
            <a href={MFE_URLS.admin} className="hover:text-[#0528d6] text-slate-400">{t.nav.admin}</a>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => { window.location.href = MFE_URLS.agency; }}
              className={`${actionBtn} hidden md:inline-flex text-slate-500 hover:text-[#0528d6]`}
            >
              {t.nav.login}
            </button>

            <button type="button" onClick={onInstall} className={`${actionBtn} hidden sm:inline-flex bg-slate-100 dark:bg-slate-800 hover:bg-[#0528d6] hover:text-white`}>
              <DownloadCloud size={14} /> {t.nav.install}
            </button>

            <button
              type="button"
              onClick={onLangToggle}
              className={`${actionBtn} min-w-[4.5rem] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900`}
              aria-label="Changer de langue"
            >
              <Languages size={14} className="text-[#0528d6]" />
              <span>{lang}</span>
            </button>

            <button type="button" onClick={onThemeToggle} className={`${actionBtn} w-10 bg-slate-100 dark:bg-slate-800`}>
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <a href={MFE_URLS.client} className={`${actionBtn} hidden lg:inline-flex bg-[#0528d6] text-white px-5 hover:bg-blue-700`}>
              {t.nav.reserve}
            </a>

            <button type="button" onClick={() => setOpen(true)} className={`${actionBtn} lg:hidden w-10 bg-slate-100 dark:bg-slate-800`}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div className="fixed inset-0 z-[200] bg-white dark:bg-[#0f1323] flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-6 h-16 border-b">
            <span className="font-black uppercase italic">Menu</span>
            <button type="button" onClick={() => setOpen(false)}><X size={24} /></button>
          </div>
          <div className="flex flex-col gap-4 px-6 py-8 text-sm font-black uppercase">
            <a href="/#features" onClick={() => setOpen(false)}>{t.nav.features}</a>
            <a href="/#solutions" onClick={() => setOpen(false)}>{t.nav.solutions}</a>
            <a href="/feedback" onClick={() => setOpen(false)}>{t.nav.feedback}</a>
            <a href="/help" onClick={() => setOpen(false)}>{t.nav.help}</a>
            <a href={MFE_URLS.admin} onClick={() => setOpen(false)} className="text-slate-400">{t.nav.admin}</a>
            <hr />
            <button type="button" onClick={onInstall}>{t.nav.install}</button>
            <button type="button" onClick={() => { window.location.href = MFE_URLS.agency; }}>{t.nav.login}</button>
            <a href={MFE_URLS.client} className="bg-[#0528d6] text-white py-3 rounded-2xl text-center">{t.nav.reserve}</a>
          </div>
        </div>
      )}
    </>
  );
};
