/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Loader2, KeyRound, Car, LogOut, ClipboardCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { rentalService } from '@pwa-easy-rental/shared-services';
import { RentalDetailsModal } from './rentals/RentalDetailsModal';

/**
 * Vue dédiée au cycle inspection : regroupe les locations de l'agence selon
 * l'étape (check-in à faire / en cours / retour à inspecter / clôturé).
 */
export const InspectionsView = ({ userData, t }: { userData: any; t: any }) => {
  const [rentals, setRentals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    if (!userData?.agencyId) return;
    setLoading(true);
    try {
      const res = await rentalService.getAgencyRentals(userData.agencyId);
      if (res.ok) setRentals(res.data || []);
    } finally { setLoading(false); }
  }, [userData?.agencyId]);

  useEffect(() => { loadData(); }, [loadData]);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#0528d6] size-10" /></div>;

  const byStatus = (s: string) => rentals.filter((r) => r.status === s);

  const columns = [
    {
      key: 'PAID', title: 'Check-in à faire', icon: <KeyRound size={16} />, tone: 'blue',
      hint: 'Payé — remettez les clés après l\'inspection de départ.',
    },
    {
      key: 'ONGOING', title: 'En location', icon: <Car size={16} />, tone: 'green',
      hint: 'Véhicule sorti. En attente du retour (signalé par le client).',
    },
    {
      key: 'UNDER_REVIEW', title: 'Retour à inspecter / régler', icon: <LogOut size={16} />, tone: 'amber',
      hint: 'Retour signalé. Faites le check-out puis réglez la caution.',
    },
    {
      key: 'COMPLETED', title: 'Clôturées', icon: <CheckCircle2 size={16} />, tone: 'slate',
      hint: 'Cycle terminé.',
    },
  ];

  const toneCls: Record<string, string> = {
    blue: 'text-[#0528d6] bg-blue-50 dark:bg-blue-900/20 border-blue-100',
    green: 'text-green-600 bg-green-50 dark:bg-green-900/20 border-green-100',
    amber: 'text-amber-600 bg-amber-50 dark:bg-amber-900/20 border-amber-100',
    slate: 'text-slate-500 bg-slate-50 dark:bg-slate-800 border-slate-100',
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex items-center gap-3">
        <ClipboardCheck className="text-[#0528d6]" size={22} />
        <h2 className="text-xl font-black italic uppercase tracking-tighter text-slate-900 dark:text-white">Inspections & cycle location</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {columns.map((col) => {
          const list = byStatus(col.key);
          return (
            <div key={col.key} className="bg-white dark:bg-[#1a1d2d] rounded-[2rem] border border-slate-200 dark:border-slate-800 p-4 flex flex-col">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${toneCls[col.tone]} mb-3`}>
                {col.icon}
                <span className="text-[10px] font-black uppercase italic tracking-widest flex-1">{col.title}</span>
                <span className="text-xs font-black">{list.length}</span>
              </div>
              <p className="text-[10px] text-slate-400 italic mb-3 px-1">{col.hint}</p>
              <div className="space-y-2 flex-1">
                {list.length === 0 && <p className="text-[11px] text-slate-300 italic text-center py-6">—</p>}
                {list.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedId(r.id)}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-[#0528d6]/40 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black italic text-slate-800 dark:text-white truncate">
                        {r.clientName || 'Walk-in'}
                      </span>
                      <ChevronRight size={14} className="text-slate-300 group-hover:text-[#0528d6]" />
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 mt-1">#{String(r.id).slice(0, 8).toUpperCase()}</div>
                    <div className="text-[10px] text-slate-400 italic mt-1">
                      {r.startDate ? new Date(r.startDate).toLocaleDateString() : ''}
                      {r.endDate ? ` → ${new Date(r.endDate).toLocaleDateString()}` : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedId && (
        <RentalDetailsModal
          t={t}
          rentalId={selectedId}
          initialTab="INSPECTION"
          onClose={() => setSelectedId(null)}
          onValidated={loadData}
        />
      )}
    </div>
  );
};
