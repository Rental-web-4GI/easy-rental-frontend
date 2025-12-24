'use client';
import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Calendar, Heart, Star, Bell, 
  Download, ChevronRight, Key, ShieldCheck, Headphones,
  Facebook, Twitter, Instagram, Moon, Sun, Languages
} from 'lucide-react';

import { fr } from '../locales/fr';
import { en } from '../locales/en';

export default function ClientPortal() {
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [darkMode, setDarkMode] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const t = lang === 'FR' ? fr : en;

  // Initialisation Theme & PWA
  useEffect(() => {
    // Theme
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

    // PWA Prompt
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert(t.installNotice);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#0f1323] text-slate-900 dark:text-white font-sans transition-colors duration-300 overflow-x-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="w-full h-20 bg-white dark:bg-[#0f1323] border-b border-slate-100 dark:border-slate-800 sticky top-0 z-[100] px-6 md:px-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg"><Key size={18} fill="currentColor" /></div>
          <span className="text-xl font-[900] italic tracking-tighter uppercase text-blue-900 dark:text-white">Easy<span className="text-blue-600">Rental</span></span>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-1">{t.nav.search}</a>
          <a href="#" className="hover:text-blue-600">{t.nav.bookings}</a>
          <a href="#" className="hover:text-blue-600">{t.nav.help}</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-transparent dark:border-slate-700 transition-all active:scale-95"><Languages size={14}/> {lang}</button>
          <button onClick={toggleTheme} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 border border-transparent dark:border-slate-700 transition-all hover:scale-110">{darkMode ? <Sun size={16}/> : <Moon size={16}/>}</button>
          <button onClick={handleInstall} className="hidden sm:flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 transition-all"><Download size={14}/> {t.nav.install}</button>
          <Bell size={20} className="text-slate-300 cursor-pointer hover:text-blue-600 transition-colors" />
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm overflow-hidden">
            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="profile" />
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="w-full px-6 py-6 md:px-10">
        <div className="w-full max-w-[1440px] mx-auto relative rounded-[3rem] overflow-hidden h-[550px] flex items-center justify-center text-center px-4">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover" alt="road" />
          <div className="absolute inset-0 bg-black/50" />
          
          <div className="relative z-10 w-full max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-[900] italic text-white uppercase leading-[0.85] tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {t.hero.title} <br/><span className="text-blue-400">{t.hero.accent}</span>
            </h1>
            <p className="text-white/80 font-bold uppercase text-[11px] tracking-[0.4em] mb-12">{t.hero.sub}</p>

            {/* Barre de recherche massive */}
            <div className="bg-white rounded-[2.5rem] p-2 shadow-2xl flex flex-col md:flex-row items-center gap-1 max-w-4xl mx-auto border-4 border-white/20">
              <div className="flex-1 flex items-center gap-4 px-6 py-5">
                <MapPin size={24} className="text-slate-300" />
                <div className="text-left w-full">
                  <label className="block text-[9px] font-[900] uppercase text-slate-400 tracking-widest leading-none mb-1">{t.hero.loc}</label>
                  <input className="bg-transparent outline-none font-bold text-slate-900 w-full placeholder:text-slate-300 text-lg" placeholder={t.hero.locPlace} />
                </div>
              </div>
              <div className="h-12 w-px bg-slate-100 hidden md:block" />
              <div className="flex-1 flex items-center gap-4 px-6 py-5">
                <Calendar size={24} className="text-slate-300" />
                <div className="text-left flex-1">
                  <label className="block text-[9px] font-[900] uppercase text-slate-400 tracking-widest leading-none mb-1">{t.hero.dates}</label>
                  <input className="bg-transparent outline-none font-bold text-slate-900 w-full placeholder:text-slate-300 text-lg" placeholder={t.hero.datesPlace} />
                </div>
                <button className="bg-blue-600 text-white px-10 py-5 rounded-[2rem] font-black uppercase text-sm flex items-center gap-2 hover:bg-blue-700 transition-all hover:scale-105 shadow-xl shadow-blue-200">
                  <Search size={20} strokeWidth={3} /> {t.hero.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CATEGORIES --- */}
      <div className="w-full flex gap-4 overflow-x-auto px-6 md:px-10 py-10 no-scrollbar max-w-7xl mx-auto justify-start md:justify-center">
        {[
          { label: t.cats.all, active: true },
          { label: t.cats.vehicles, icon: '🚗' },
          { label: t.cats.tools, icon: '⚒️' },
          { label: t.cats.electronics, icon: '📷' },
          { label: t.cats.camping, icon: '🏕️' }
        ].map((cat, i) => (
          <button key={i} className={`px-8 py-4 rounded-[2rem] whitespace-nowrap font-black text-[10px] uppercase tracking-widest border transition-all flex items-center gap-3 ${cat.active ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100 dark:shadow-none' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400 hover:border-blue-600'}`}>
            {cat.icon && <span>{cat.icon}</span>} {cat.label}
          </button>
        ))}
      </div>

      {/* --- FEATURED RENTALS --- */}
      <section className="w-full px-6 md:px-10 py-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-5xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">{t.rentals.title}</h2>
          <a href="#" className="text-blue-600 font-black uppercase text-[11px] tracking-widest flex items-center gap-2 group">{t.rentals.viewAll} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform"/></a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { tag: "VEHICLE", title: "Tesla Model 3", price: 85, img: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500", rating: 4.9 },
            { tag: "POPULAR", title: "Canon R5 Kit", price: 120, img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500", rating: 5.0 },
            { tag: "TOOLS", title: "Heavy Duty Drill", price: 25, img: "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=500", rating: 4.7 },
            { tag: "VEHICLE", title: "15' Moving Truck", price: 45, img: "https://images.unsplash.com/photo-1586191582056-a607e4d8120b?w=500", rating: 4.5 }
          ].map((item, i) => (
            <div key={i} className="group bg-white dark:bg-slate-800 rounded-[2.8rem] p-5 border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all">
              <div className="aspect-square rounded-[2.2rem] overflow-hidden mb-6 relative">
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-[#0f1323]/90 px-3 py-1 rounded-full text-[8px] font-black uppercase italic text-blue-600 z-10">{item.tag}</div>
                <div className="absolute top-4 right-4 z-10 p-2.5 bg-white/50 backdrop-blur rounded-full text-white cursor-pointer hover:bg-red-500 transition-colors"><Heart size={18}/></div>
                <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="product" />
              </div>
              <div className="flex justify-between items-start mb-2 px-1">
                <h3 className="font-black uppercase italic text-sm tracking-tight text-slate-900 dark:text-white">{item.title}</h3>
                <div className="flex items-center gap-1 text-[11px] font-black text-orange-500"><Star size={12} fill="currentColor"/> {item.rating}</div>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-8 px-1">Assurance incluse • Bastos Hub</p>
              <div className="flex items-center justify-between px-1">
                 <div>
                    <span className="text-2xl font-black text-blue-600 leading-none">${item.price}</span>
                    <span className="text-[9px] font-black uppercase text-slate-300 ml-1">/ {t.rentals.day}</span>
                 </div>
                 <button className="bg-slate-100 dark:bg-[#0f1323] text-blue-600 dark:text-blue-400 px-6 py-2.5 rounded-2xl font-black uppercase text-[10px] hover:bg-blue-600 hover:text-white transition-all">{t.rentals.book}</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- BENEFITS --- */}
      <section className="w-full py-32 border-y border-slate-50 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-16 text-center">
          {[
            { icon: <Key className="text-blue-600"/>, t: t.benefits.b1t, d: t.benefits.b1d },
            { icon: <ShieldCheck className="text-blue-600"/>, t: t.benefits.b2t, d: t.benefits.b2d },
            { icon: <Headphones className="text-blue-600"/>, t: t.benefits.b3t, d: t.benefits.b3d },
          ].map((b, i) => (
            <div key={i} className="flex flex-col items-center gap-8">
              <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center border-4 border-white dark:border-slate-800 shadow-xl">{b.icon}</div>
              <h4 className="text-2xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white">{b.t}</h4>
              <p className="text-sm font-medium text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs">{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="w-full pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-16 mb-24 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          <div className="col-span-2">
             <div className="flex items-center gap-2 mb-10">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg"><Key size={18} fill="currentColor"/></div>
                <span className="text-lg font-black tracking-tighter uppercase italic text-blue-900 dark:text-white">Easy<span className="text-blue-600">Rental</span></span>
             </div>
             <p className="normal-case tracking-normal font-medium leading-relaxed max-w-xs text-slate-500 dark:text-slate-400 mb-10">{t.footer.desc}</p>
             <div className="flex gap-6">
                {[Facebook, Twitter, Instagram].map((Icon, i) => (
                  <div key={i} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all cursor-pointer shadow-sm border border-transparent dark:border-slate-700 group"><Icon size={18} className="group-hover:scale-110 transition-transform"/></div>
                ))}
             </div>
          </div>
          <div><h5 className="text-slate-900 dark:text-white mb-10 italic uppercase tracking-widest">{t.footer.company}</h5><ul className="space-y-5"><li>About Us</li><li>Careers</li><li>Blog</li></ul></div>
          <div><h5 className="text-slate-900 dark:text-white mb-10 italic uppercase tracking-widest">{t.footer.support}</h5><ul className="space-y-5"><li>Help Center</li><li>Privacy Policy</li><li>Terms</li></ul></div>
        </div>
        <div className="w-full text-[10px] font-black text-slate-300 dark:text-slate-700 tracking-[0.5em] uppercase italic text-center border-t border-slate-50 dark:border-slate-800 pt-16">
          {t.footer.copy}
        </div>
      </footer>
    </div>
  );
}