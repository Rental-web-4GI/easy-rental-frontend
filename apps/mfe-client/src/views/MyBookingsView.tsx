/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { notifService, rentalService } from '@pwa-easy-rental/shared-services';
import { Clock, MapPin, Bell, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

export const MyBookingsView = ({ userData }: { userData: any }) => {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      // Pour l'instant, on récupère via les notifications ou un endpoint dédié
      // Note: Le Swagger n'expose pas de /rentals/client/{id}, on utilise le mock filtré si besoin
      setLoading(false);
    };
    fetchRentals();
  }, [userData]);

  const handleSignalEnd = async (id: string) => {
    if (confirm("Signaler la restitution du véhicule à l'agence ?")) {
      const res = await rentalService.signalEnd(id);
      if (res.ok) alert("Fin de location signalée !");
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-[#0528d6] size-12" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20 text-left">
      <div className="flex justify-between items-center border-b pb-6">
        <h2 className="text-3xl font-[900] italic tracking-tighter uppercase">Mes Trajets</h2>
        <div className="size-12 bg-blue-50 text-[#0528d6] rounded-2xl flex items-center justify-center"><Bell size={20}/></div>
      </div>

      <div className="space-y-6">
        {/* Placeholder - On itérerait sur rentals ici */}
        <div className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
               <div className="size-16 bg-orange-50 text-orange-600 rounded-3xl flex items-center justify-center shadow-inner"><Clock size={32}/></div>
               <div>
                  <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">Aucune location active</p>
                  <h4 className="text-lg font-bold">Prêt pour un nouveau départ ?</h4>
               </div>
            </div>
            <p className="text-slate-400 text-sm font-medium italic leading-relaxed">
                Retrouvez ici vos locations en cours, vos factures et signalez la fin de vos trajets en un clic.
            </p>
        </div>
      </div>
    </div>
  );
};