/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Car, Loader2, LayoutGrid } from 'lucide-react';
import { vehicleService } from '@pwa-easy-rental/shared-services';
import { VehicleCard } from './catalog/VehicleCard';
import { VehicleDetailsView } from './VehicleDetailsView';

export const CatalogView = ({ userData }: { userData: any }) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [itemsToShow, setItemsToShow] = useState(8);

  useEffect(() => {
    const load = async () => {
      try {
        const [v, c] = await Promise.all([
          vehicleService.getAvailableVehicles(), 
          vehicleService.getAllCategories()
        ]);
        if (v.ok) setVehicles(v.data || []);
        if (c.ok) setCategories(c.data || []);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const filtered = useMemo(() => vehicles.filter(v => 
    (selectedCat === 'all' || v.categoryId === selectedCat) &&
    (`${v.brand} ${v.model}`.toLowerCase().includes(searchTerm.toLowerCase()))
  ), [vehicles, selectedCat, searchTerm]);

  if (loading) return (
    <div className="h-96 flex items-center justify-center">
      <Loader2 className="animate-spin text-[#0528d6] size-10" />
    </div>
  );

  // Switch de vue interne pour les détails
  if (selectedVehicleId) {
    return (
      <VehicleDetailsView 
        vehicleId={selectedVehicleId} 
        userData={userData} 
        onBack={() => setSelectedVehicleId(null)} 
      />
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 text-left">
      <div className="flex flex-col xl:flex-row gap-6 bg-white dark:bg-[#1a1d2d] p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0528d6]" size={18} />
          <input 
            placeholder="Rechercher par modèle..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#0528d6]/20 transition-all dark:text-white"
            value={searchTerm} 
            onChange={e => { setSearchTerm(e.target.value); setItemsToShow(8); }}
          />
        </div>
        <select 
          value={selectedCat} 
          onChange={e => { setSelectedCat(e.target.value); setItemsToShow(8); }}
          className="px-8 py-4 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl text-xs font-black uppercase italic outline-none focus:ring-2 focus:ring-[#0528d6]/20 cursor-pointer dark:text-white"
        >
          <option value="all">Tous les segments</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.slice(0, itemsToShow).map(v => (
          <VehicleCard 
            key={v.id} 
            vehicle={v} 
            categoryName={categories.find(c => c.id === v.categoryId)?.name || 'Premium Service'}
            onViewDetails={(id) => setSelectedVehicleId(id)} // Correction du passage de fonction
          />
        ))}
      </div>

      {itemsToShow < filtered.length && (
        <div className="flex justify-center pt-8">
          <button 
            onClick={() => setItemsToShow(prev => prev + 8)} 
            className="px-12 py-4 bg-[#0528d6] text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all italic"
          >
            Charger plus de modèles
          </button>
        </div>
      )}
    </div>
  );
};