/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState } from 'react';
import { Loader2, ShieldCheck } from 'lucide-react';

/**
 * Formulaire de règlement caution au checkout. deduction plafonnée à cautionHeld,
 * motif obligatoire dès qu'une retenue > 0 est saisie.
 */
export const CautionSettlementForm = ({
  cautionHeld,
  submitting,
  onSubmit,
}: {
  cautionHeld: number;
  submitting?: boolean;
  onSubmit: (deduction: number, reason: string) => void;
}) => {
  const [deduction, setDeduction] = useState<string>('0');
  const [reason, setReason] = useState('');
  const [error, setError] = useState<string | null>(null);

  const deductionNum = Number(deduction) || 0;
  const refunded = Math.max(0, cautionHeld - deductionNum);

  const handleSubmit = () => {
    setError(null);
    if (deductionNum < 0) { setError('La retenue ne peut pas être négative.'); return; }
    if (deductionNum > cautionHeld) { setError('La retenue ne peut pas dépasser la caution détenue.'); return; }
    if (deductionNum > 0 && !reason.trim()) { setError('Un motif est obligatoire pour toute retenue.'); return; }
    onSubmit(deductionNum, reason.trim());
  };

  return (
    <div className="space-y-5">
      <div className="p-5 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-500">Caution détenue</span>
          <span className="text-xl font-black italic text-[#0528d6]">{cautionHeld.toLocaleString()} FCFA</span>
        </div>
      </div>

      <label className="block">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-400">Retenue à appliquer</span>
        <input
          type="number"
          value={deduction}
          onChange={(e) => setDeduction(e.target.value)}
          min={0}
          max={cautionHeld}
          className="mt-1 w-full px-4 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-black"
        />
      </label>

      {deductionNum > 0 && (
        <label className="block">
          <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-400">Motif de la retenue *</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={2}
            placeholder="ex. rayure portière conducteur + niveau carburant"
            className="mt-1 w-full px-4 py-3 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
          />
        </label>
      )}

      <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-emerald-700 dark:text-emerald-400">Remboursé au client</span>
        <span className="text-xl font-black italic text-emerald-600">{refunded.toLocaleString()} FCFA</span>
      </div>

      {error && (
        <p className="px-4 py-3 rounded-2xl bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 text-[11px] font-black italic uppercase tracking-widest text-red-600">
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full py-4 rounded-2xl bg-[#0528d6] text-white text-xs font-black uppercase italic disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
        Régler le retour et clôturer
      </button>
    </div>
  );
};
