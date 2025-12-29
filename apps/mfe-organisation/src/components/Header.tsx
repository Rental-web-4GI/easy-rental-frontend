'use client';
import React from 'react';
import { Menu, Sun, Moon, Languages, Download, Bell } from 'lucide-react';

export const Header = ({ 
  title, 
  orgData, 
  lang, 
  setLang, 
  darkMode, 
  toggleTheme, 
  setSidebarOpen, 
  onInstall,
  hasPrompt,
  t 
}: any) => {
  return (
    <header className="h-24 px-6 md:px-10 flex items-center justify-between shrink-0 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-[#0f1323]/50 backdrop-blur-md sticky top-0 z-[50]">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white">
          <Menu size={20} />
        </button>
        <h2 className="text-xl md:text-3xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* PWA INSTALL */}
        {hasPrompt && (
            <button onClick={onInstall} className="hidden sm:flex items-center gap-2 p-3 bg-orange-50 text-[#F76513] rounded-xl font-black uppercase text-[9px] italic border border-orange-100 animate-pulse">
                <Download size={16} /> {t.header.installBtn}
            </button>
        )}

        {/* TRANSLATION */}
        <button 
          onClick={() => setLang(lang === 'FR' ? 'EN' : 'FR')} 
          className="p-3 bg-white dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white flex items-center gap-2 shadow-sm"
        >
          <Languages size={16} className="text-blue-600" /> {lang}
        </button>

        {/* THEME TOGGLE */}
        <button 
          onClick={toggleTheme} 
          className="p-3 bg-white dark:bg-slate-800 rounded-xl text-slate-400 border border-slate-100 dark:border-slate-700 shadow-sm hover:text-orange-500 transition-colors"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* PROFILE */}
        <div className="flex items-center gap-3 ml-2 pl-4 border-l border-slate-100 dark:border-slate-800">
           <div className="text-right hidden sm:block">
              <p className="text-[9px] font-black uppercase text-slate-400 leading-none mb-1">{t.header.adminRole}</p>
              <p className="text-xs font-bold dark:text-white italic">{orgData?.name}</p>
           </div>
           <div className="size-11 rounded-2xl bg-[#0528d6] shadow-lg border-2 border-white dark:border-slate-800 overflow-hidden shrink-0">
              <img src={orgData?.logoUrl || "https://images.unsplash.com/photo-1494790108377-be9c29b29330"} alt={t.header.avatarAlt} className="w-full h-full object-cover" />
           </div>
        </div>
      </div>
    </header>
  );
};