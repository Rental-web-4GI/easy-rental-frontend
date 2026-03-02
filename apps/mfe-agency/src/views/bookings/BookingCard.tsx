/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { User, Car, CheckCircle2, ChevronRight, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export const BookingCard = ({ rental, onStart, onValidate }: any) => {
  const getStatusStyle = (s: string) => {
    switch (s) {
      case 'PAID': return 'bg-green-50 text-green-700 border-green-100';
      case 'ONGOING': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'RESERVED': return 'bg-orange-50 text-orange-700 border-orange-100';
      case 'UNDER_REVIEW': return 'bg-purple-50 text-purple-700 border-purple-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1a1d2d] rounded-[2rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left">
      <div className="flex justify-between items-center mb-8">
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(rental.status)}`}>{rental.status}</div>
        <span className="text-[10px] font-mono font-bold text-slate-300">#REF-{rental.id.substring(0,6).toUpperCase()}</span>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="size-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-[#0528d6] shrink-0 shadow-inner"><User size={24} /></div>
        <div className="overflow-hidden">
          <h4 className="font-bold text-slate-900 dark:text-white leading-tight truncate">{rental.clientName || 'Walk-in Client'}</h4>
          <div className="flex items-center gap-2 mt-1 text-slate-400 font-bold text-[10px] uppercase italic"><Phone size={10} className="text-[#0528d6]"/> {rental.clientPhone}</div>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-4 border border-slate-100 dark:border-slate-800">
        <div className="space-y-0.5"><p className="text-[9px] font-black text-slate-400 uppercase italic">Prise en charge</p><p className="text-xs font-bold">{new Date(rental.startDate).toLocaleDateString()}</p></div>
        <div className="space-y-0.5"><p className="text-[9px] font-black text-slate-400 uppercase italic">Restitution</p><p className="text-xs font-bold">{new Date(rental.endDate).toLocaleDateString()}</p></div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div><p className="text-[9px] font-black text-slate-400 uppercase italic mb-0.5">Dossier Soldé</p><p className="text-lg font-black text-[#0528d6] leading-none">{rental.amountPaid?.toLocaleString()} XAF</p></div>
        <div className="flex gap-2">
          {rental.status === 'PAID' && (
            <button onClick={onStart} className="size-12 bg-[#0528d6] text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"><Car size={20}/></button>
          )}
          {rental.status === 'UNDER_REVIEW' && (
            <button onClick={onValidate} className="size-12 bg-green-600 text-white rounded-xl flex items-center justify-center shadow-lg hover:scale-105 transition-all"><CheckCircle2 size={20}/></button>
          )}
          <button className="size-12 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center hover:bg-[#0528d6] hover:text-white transition-all"><ArrowRight size={20}/></button>
        </div>
      </div>
    </div>
  );
};