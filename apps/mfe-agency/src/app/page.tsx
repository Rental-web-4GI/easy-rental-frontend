'use client';
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, List, Calendar as CalIcon, Settings, 
  Search, Bell, PlusCircle, Filter, MoreVertical, 
  WifiOff, Car, Key, Boxes, Languages, Sun, Moon, Menu, X, Download
} from 'lucide-react';

import { fr } from '../locales/fr';
import { en } from '../locales/en';

export default function AgencyDashboard() {
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  
  const t = lang === 'FR' ? fr : en;

  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

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

  const NavContent = () => (
    <>
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg italic font-black text-xl">E</div>
        <span className="text-xl font-[900] italic uppercase tracking-tighter dark:text-white">Easy<span className="text-blue-600">Rental</span></span>
      </div>

      <div className="flex items-center gap-4 mb-10 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
        <div className="w-10 h-10 rounded-xl overflow-hidden bg-blue-100 border-2 border-white dark:border-slate-700 shadow-sm shrink-0">
          <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100" alt="Sarah" />
        </div>
        <div className="overflow-hidden">
          <p className="text-[10px] font-black uppercase italic leading-none truncate dark:text-white">Sarah Jenkins</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">Downtown Branch</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 text-[10px] font-black uppercase tracking-[0.2em]">
        {[
          { id: 'dash', icon: <LayoutDashboard size={18}/>, label: t.sidebar.dash, active: true },
          { id: 'list', icon: <List size={18}/>, label: t.sidebar.listings },
          { id: 'book', icon: <CalIcon size={18}/>, label: t.sidebar.bookings, badge: "3" },
          { id: 'cal', icon: <CalIcon size={18}/>, label: t.sidebar.calendar },
        ].map((item) => (
          <button key={item.id} className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 dark:shadow-none italic' : 'text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}>
            {item.icon} {item.label}
            {item.badge && <span className="ml-auto bg-orange-500 text-white size-5 rounded-full flex items-center justify-center text-[8px] italic">{item.badge}</span>}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4 pt-6">
        <button onClick={handleInstall} className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 transition-all italic">
          <Download size={18}/> {t.sidebar.install}
        </button>
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-slate-400 hover:text-blue-600">
          <Settings size={18}/> {t.sidebar.settings}
        </button>
        <div className="p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[8px] font-black uppercase text-green-600 dark:text-green-400 tracking-widest">{t.sidebar.status}</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-[#F8F9FC] dark:bg-[#0f1323] text-slate-900 dark:text-white font-sans transition-colors duration-300 overflow-hidden">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex w-72 bg-white dark:bg-[#1a1d2d] border-r border-slate-100 dark:border-slate-800 flex-col p-8 shrink-0">
        <NavContent />
      </aside>

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[150] lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-[#1a1d2d] p-8 flex flex-col animate-in slide-in-from-left duration-300">
            <NavContent />
          </aside>
        </div>
      )}

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* HEADER */}
        <header className="h-24 px-6 md:px-10 flex items-center justify-between shrink-0 bg-white/50 dark:bg-transparent backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <Menu size={20} />
            </button>
            <div>
              <h2 className="text-xl md:text-3xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
                {t.header.greet} Sarah
              </h2>
              <p className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t.header.sub}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
              <input className="bg-white dark:bg-[#1a1d2d] border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-xs font-bold w-48 lg:w-64 outline-none focus:ring-2 focus:ring-blue-600 transition-all shadow-sm" placeholder={t.header.search} />
            </div>
            <button onClick={() => setLang(l => l === 'FR' ? 'EN' : 'FR')} className="p-3 bg-white dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase border border-slate-100 dark:border-slate-700 active:scale-90 transition-transform">{lang}</button>
            <button onClick={toggleTheme} className="p-3 bg-white dark:bg-slate-800 rounded-xl text-slate-400 border border-slate-100 dark:border-slate-700 hover:scale-110 transition-transform">{darkMode ? <Sun size={18}/> : <Moon size={18}/>}</button>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-400 relative cursor-pointer">
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 size-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"></span>
            </div>
          </div>
        </header>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-10 custom-scrollbar">
          
          {/* KPI GRID (Responsive) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { label: t.kpi.pending, val: "12", grow: "+2 today", icon: <CalIcon className="text-blue-600"/> },
              { label: t.kpi.active, val: "45", icon: <Key className="text-green-500"/> },
              { label: t.kpi.inventory, val: "120", icon: <Boxes className="text-purple-500"/> },
              { label: t.kpi.offline, val: "2", icon: <WifiOff className="text-orange-500"/> },
            ].map((kpi, i) => (
              <div key={i} className="bg-white dark:bg-[#1a1d2d] p-6 rounded-[2.5rem] shadow-sm border border-slate-50 dark:border-slate-800 flex flex-col justify-between h-40 group hover:shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-slate-50 dark:bg-[#0f1323] rounded-xl">{kpi.icon}</div>
                  {kpi.grow && <span className="text-[8px] font-black text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full uppercase tracking-tighter">{kpi.grow}</span>}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{kpi.label}</p>
                  <p className="text-3xl font-[900] text-slate-900 dark:text-white tracking-tighter italic leading-none">{kpi.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            {/* MAIN TABLE (Responsive Wrapper) */}
            <div className="xl:col-span-2 bg-white dark:bg-[#1a1d2d] rounded-[3rem] md:rounded-[3.5rem] shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="p-6 md:p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                 <div>
                    <h3 className="text-2xl font-[900] italic uppercase tracking-tighter">{t.table.title}</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t.table.sub || "Manage requests"}</p>
                 </div>
                 <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-5 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-100 dark:border-slate-700"><Filter size={14}/> {t.table.filter}</button>
                    <button className="flex-1 sm:flex-none px-5 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest italic shadow-lg shadow-blue-200 dark:shadow-none flex items-center justify-center gap-2"><PlusCircle size={14}/> {t.table.add}</button>
                 </div>
              </div>
              
              <div className="flex-1 overflow-x-auto">
                <div className="min-w-[600px] px-10 pb-6">
                  <table className="w-full text-left">
                    <thead className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 border-b border-slate-50 dark:border-slate-800">
                      <tr><th className="py-8">ID</th><th>{en.table.customer}</th><th>{en.table.vehicle}</th><th>{en.table.dates}</th><th>{en.table.status}</th><th className="text-right">Actions</th></tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                      {[
                        { id: "#BK-9021", name: "James Carter", v: "Tesla Model 3", d: "Oct 24 - 28", s: "Pending", sCol: "bg-orange-100 text-orange-600" },
                        { id: "#BK-9020", name: "Maria Garcia", v: "Ford Explorer", d: "Oct 25 - 27", s: "Confirmed", sCol: "bg-green-100 text-green-600" },
                        { id: "#BK-9019", name: "Robert Fox", v: "Toyota Camry", d: "Oct 22 - 29", s: "Active", sCol: "bg-blue-100 text-blue-600" },
                      ].map((row, i) => (
                        <tr key={i} className="group hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-all cursor-pointer">
                          <td className="py-8 font-black uppercase italic text-xs tracking-tighter text-slate-400">{row.id}</td>
                          <td className="text-xs font-black uppercase italic">{row.name}</td>
                          <td className="text-[11px] font-bold text-slate-400">{row.v}</td>
                          <td className="text-[10px] font-black italic">{row.d}</td>
                          <td><span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest italic ${row.sCol}`}>{row.s}</span></td>
                          <td className="text-right"><button className="text-slate-300 hover:text-blue-600 transition-colors"><MoreVertical size={18}/></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <button className="py-6 border-t border-slate-50 dark:border-slate-800 text-[9px] font-black uppercase tracking-[0.4em] text-blue-600 hover:bg-blue-50 transition-all italic">{t.table.viewAll}</button>
            </div>

            {/* SIDE COLUMN */}
            <div className="space-y-10">
              <div className="bg-blue-600 rounded-[3rem] p-8 md:p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-200 dark:shadow-none">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12"><Car size={120}/></div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-[900] italic uppercase tracking-tighter mb-4">{t.side.addTitle}</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-blue-100 mb-10 leading-relaxed">{t.side.addSub}</p>
                  <button className="w-full py-5 bg-white text-blue-600 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl flex items-center justify-center gap-3 hover:scale-105 transition-transform italic italic">
                    <PlusCircle size={18}/> {t.side.addCta}
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1a1d2d] rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
                <div className="flex justify-between items-center mb-8">
                  <h4 className="text-sm font-black uppercase italic tracking-widest">{t.side.availTitle}</h4>
                  <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest">View All</button>
                </div>
                <div className="space-y-6">
                  {[
                    { n: "2023 BMW X5", p: "$120/day", s: "bg-green-500" },
                    { n: "Ferrari 488", p: "$450/day", s: "bg-green-500" },
                  ].map((car, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="size-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-center">
                        <Car size={20} className="text-slate-300" />
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="text-[11px] font-black uppercase italic leading-none truncate dark:text-white">{car.n}</p>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 truncate">{car.p}</p>
                      </div>
                      <div className={`size-1.5 rounded-full ${car.s} shadow-lg shrink-0`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating PWA Install button for Mobile (if not installed) */}
      {!deferredPrompt && (
        <button onClick={handleInstall} className="fixed bottom-6 right-6 lg:hidden bg-blue-600 text-white p-4 rounded-full shadow-2xl z-[200] animate-bounce">
          <Download size={24} />
        </button>
      )}
    </div>
  );
}