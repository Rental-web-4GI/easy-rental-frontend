'use client';
import { Plus, Key, LogOut, Search, CloudLightning, Activity } from 'lucide-react';

export default function AgencyDashboard() {
  return (
    <div className="min-h-screen bg-light p-6 font-sans">
      <div className="flex items-center justify-between py-8 max-w-md mx-auto">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white font-[900] italic text-2xl shadow-xl shadow-primary/20">SJ</div>
          <div>
            <h2 className="text-lg font-black text-slate-900 uppercase italic leading-none">Sarah Jenkins</h2>
            <p className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-2">Yaoundé Bastos • Agent</p>
          </div>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-slate-300"><Search size={20} /></div>
      </div>

      <div className="max-w-md mx-auto grid grid-cols-2 gap-4 mb-10">
        <button className="p-8 bg-primary rounded-[2.5rem] text-white text-left shadow-2xl shadow-primary/30 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-8"><Plus size={20} /></div>
          <span className="block font-[900] uppercase text-base italic tracking-tighter">Nouveau</span>
          <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest block">Contrat</span>
        </button>
        <button className="p-8 bg-white rounded-[2.5rem] text-dark text-left shadow-sm border border-slate-100 active:scale-95 transition-all">
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mb-8 text-secondary"><LogOut size={20} /></div>
          <span className="block font-[900] uppercase text-base italic tracking-tighter">Retour</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Check-in</span>
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-[900] text-slate-900 text-lg uppercase italic tracking-tighter">Missions / Jour</h3>
          <Activity size={18} className="text-primary" />
        </div>

        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 flex items-center justify-between group hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300"><Key size={18} /></div>
                <div>
                  <p className="font-[900] text-slate-900 uppercase italic text-sm">Toyota Hilux</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Client #8242 • 16:00</p>
                </div>
              </div>
              <div className="w-2 h-2 rounded-full bg-secondary" />
            </div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-green-50 rounded-[2rem] border border-green-100 flex items-center justify-center gap-3 text-green-600 font-[900] text-[9px] uppercase tracking-[0.2em]">
          <CloudLightning size={14} /> Système Synchronisé
        </div>
      </div>
    </div>
  );
}