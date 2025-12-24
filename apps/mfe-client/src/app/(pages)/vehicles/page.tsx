'use client';
import { Search, MapPin, Calendar, Heart, Star, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function ClientVehicles() {
  return (
    <div className="min-h-screen bg-white pb-32">
      {/* Header Sombre */}
      <header className="px-6 pt-16 pb-24 bg-dark rounded-b-huge text-white relative overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary rounded-full blur-[100px] opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={16} className="text-secondary" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Easy Rental Elite</span>
          </div>
          <h1 className="text-5xl font-[900] italic leading-[0.9] tracking-tighter mb-12 uppercase">
            Libérez votre <br/><span className="text-primary">Trajet.</span>
          </h1>
          
          {/* Barre de recherche flottante */}
          <div className="bg-white rounded-[2.5rem] p-2 shadow-2xl flex flex-col gap-1">
            <div className="flex items-center gap-4 p-4 text-slate-900">
              <MapPin size={22} className="text-primary" />
              <input className="outline-none font-bold text-lg w-full placeholder:text-slate-300" placeholder="Ville ou Aéroport ?" />
            </div>
            <div className="h-px bg-slate-100 mx-6" />
            <div className="flex items-center gap-4 p-4">
              <Calendar size={22} className="text-primary" />
              <span className="text-slate-400 font-bold flex-1 text-base uppercase italic">Sélectionner dates</span>
              <button className="bg-primary p-4 rounded-[1.8rem] text-white"><Search size={22} strokeWidth={3} /></button>
            </div>
          </div>
        </div>
      </header>

      {/* Véhicules */}
      <section className="px-6 mt-12 space-y-8">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-[900] italic uppercase tracking-tighter text-slate-900">Top Sélections</h2>
          <SlidersHorizontal size={20} className="text-slate-400" />
        </div>

        <div className="grid gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[16/10] bg-slate-100 rounded-[2.5rem] mb-6 relative overflow-hidden">
                <div className="absolute top-5 right-5 z-10 p-3 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl"><Heart size={20} /></div>
                <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-100" />
              </div>
              <div className="flex justify-between items-end px-2">
                <div>
                  <h3 className="text-2xl font-[900] text-slate-900 tracking-tighter uppercase italic">Tesla Model 3</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Star size={14} className="text-secondary fill-secondary" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">4.9 • Électrique • bastos</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-[900] text-primary leading-none">89€</p>
                  <p className="text-[10px] font-black uppercase italic text-slate-300">/ jour</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Nav PWA */}
      <nav className="fixed bottom-8 left-8 right-8 h-20 bg-dark rounded-[2.5rem] flex items-center justify-around shadow-2xl z-50 border border-white/10">
         <button className="text-primary"><Search size={24} strokeWidth={3}/></button>
         <button className="text-white/30"><Heart size={24}/></button>
         <button className="text-white/30"><Calendar size={24}/></button>
         <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary" />
      </nav>
    </div>
  );
}