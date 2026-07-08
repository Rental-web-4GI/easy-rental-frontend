/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { 
  Zap, ShieldCheck, MapPin, ChevronRight, 
  Clock, Search, Filter, Loader2,
} from 'lucide-react';
import { vehicleService, formatXaf, vehicleStatusLabel } from '@pwa-easy-rental/shared-services';
import { About } from '@shared-ui/components/ui/About';

export const HomeView = ({ onSearch, setViewAll, onSelectVehicle, lang = 'FR' }: any) => {
  const [featuredVehicles, setFeaturedVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    vehicleService.getAvailableVehicles().then(res => {
      if (res.ok) {
        setFeaturedVehicles(res.data.slice(0, 3));
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ query: searchQuery });
  };

  useEffect(() => {
  const handleBeforeInstallPrompt = (e: any) => {
    e.preventDefault(); // ❗ bloque le popup auto
    setDeferredPrompt(e); // on stocke l’événement
  };

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

  return () => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  };
}, []);
const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const handleInstallPWA = async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
  }
};


  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-8">
      
      <section className="relative min-h-[280px] md:min-h-[320px] rounded-2xl bg-[#0528d6] overflow-hidden flex flex-col items-center justify-center px-6 py-10 text-white shadow-lg">
        {/* Background Image/Decor */}
        <div className="absolute inset-0 opacity-20">
            <img 
                src="/client/hero_car.png"
                className="w-full h-full object-cover" 
                alt="car background"
            />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#0528d6]/80 to-[#0528d6]" /> */}

        <div className="relative z-10 max-w-4xl w-full text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black  tracking-widest italic mx-auto">
                <Zap size={14} className="text-orange-400" /> Mobility Without Borders
            </div>
            <h1 className="text-5xl md:text-7xl font-[900] italic leading-[0.85] tracking-tighter ">
                Prêt pour le <br /><span className="text-blue-300">Grand Départ ?</span>
            </h1>
            <p className="text-lg text-blue-100/70 font-medium italic leading-relaxed max-w-xl mx-auto">
            {"Trouvez le véhicule parfait pour votre prochain trajet parmi des centaines d'offres certifiées."}
            </p>
          </div>

          {/* SEARCH BOX UX */}
          <form 
            onSubmit={handleSearchSubmit}
            className="bg-white dark:bg-[#1a1d2d] p-3 rounded-[2.5rem] shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto border border-white/20"
          >
            <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0528d6] transition-colors" size={20} />
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Où voulez-vous aller ? (Modèle, Ville...)"
                    className="w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0528d6]/20 transition-all"
                />
            </div>
            <div className="flex gap-2">
                <button type="button" className="p-5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-3xl hover:bg-slate-200 transition-colors">
                    <Filter size={20} />
                </button>
                <button type="submit" className="px-8 py-3 bg-[#0528d6] text-white rounded-3xl font-black text-xs  tracking-widest shadow-lg shadow-blue-600/40 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all">
                    Rechercher
                </button>
            </div>
          </form>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FeatureItem icon={<ShieldCheck />} title="Sécurité Totale" desc="Véhicules inspectés et assurance tous risques incluse sur chaque contrat." />
        <FeatureItem icon={<MapPin />} title="Liberté Géographique" desc="Agences partenaires pour récupérer vos clés partout au Cameroun." />
        <FeatureItem icon={<Clock />} title="Flexibilité 24/7" desc="Réservez et gérez vos trajets depuis votre smartphone." />
      </section>

      <section className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end px-4 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-[900] italic tracking-tighter  leading-none text-slate-900 dark:text-white">
                Sélection <span className="text-[#0528d6]">Premium</span>
            </h2>
            <p className="text-slate-400 text-[10px] font-black  tracking-[0.2em] mt-3 italic">Découvrez nos véhicules les plus prisés</p>
          </div>
          <button 
            onClick={setViewAll}
            className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black  tracking-widest hover:bg-[#0528d6] hover:text-white transition-all shadow-sm italic"
          >
            Voir tout le catalogue <ChevronRight size={14}/>
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-80 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] animate-pulse flex flex-col items-center justify-center">
                 <Loader2 className="animate-spin text-slate-300" size={32} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {featuredVehicles.map(v => (
              <FeaturedCard key={v.id} vehicle={v} lang={lang} onClick={() => onSelectVehicle(v.id)} />
            ))}
          </div>
        )}
      </section>
      <section>
        <About onInstall={handleInstallPWA} />
      </section>
    </div>
  );
};

// COMPOSANTS INTERNES STYLISÉS
const FeatureItem = ({ icon, title, desc }: any) => (
  <div className="p-6 bg-white dark:bg-[#1a1d2d] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-left group hover:border-[#0528d6]/40 transition-colors">
    <div className="size-12 bg-slate-50 dark:bg-slate-900 rounded-xl flex items-center justify-center text-[#0528d6] mb-4">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h4 className="text-base font-bold mb-2 text-slate-900 dark:text-white">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

const FeaturedCard = ({ vehicle, lang, onClick }: any) => (
  <div
    onClick={onClick}
    className="cursor-pointer group bg-white dark:bg-[#1a1d2d] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
  >
    <div className="aspect-[16/10] bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
      <img
        src={vehicle.images?.[0] || '/client/car.png'}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        alt={`${vehicle.brand} ${vehicle.model}`}
        onError={(e) => { (e.target as HTMLImageElement).src = '/client/car.png'; }}
      />
      <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 rounded-lg text-[10px] font-bold text-[#0528d6]">
        {vehicleStatusLabel(vehicle.statut, lang)}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white text-lg font-bold">
          {formatXaf(vehicle.pricing?.pricePerDay)} <span className="text-xs font-medium">XAF / jour</span>
        </p>
      </div>
    </div>
    <div className="p-4 text-left">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1">
        {vehicle.brand} {vehicle.model}
      </h3>
      <p className="text-xs text-slate-400 mt-1">Ref: {vehicle.licencePlate}</p>
    </div>
  </div>
);

