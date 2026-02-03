'use client';
import React from 'react';
import { MapPin, Phone, Mail, Trash2, Edit3, Globe } from 'lucide-react';

export const AgencyCard = ({ agency, onEdit, onDelete }: any) => (
  <div className="bg-white dark:bg-[#1a1d2d] rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className="flex items-center gap-4">
        <div className="size-12 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-[#0528d6] font-bold text-lg overflow-hidden border border-slate-100">
          {agency.logoUrl ? <img src={agency.logoUrl} alt="logo" className="w-full h-full object-cover"/> : agency.name.charAt(0)}
        </div>
        <div>
          <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{agency.name}</h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1 mt-1 italic">
            <MapPin size={12}/> {agency.city}, {agency.region}
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        <button onClick={() => onEdit(agency)} className="p-2 text-slate-400 hover:text-[#0528d6] hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={16}/></button>
        <button onClick={() => onDelete(agency.id)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16}/></button>
      </div>
    </div>
    
    <div className="space-y-2 pt-4 border-t border-slate-50 dark:border-slate-800">
      <div className="flex items-center gap-3 text-xs font-medium text-slate-500 italic">
        <Mail size={14} className="text-[#0528d6]/60"/> {agency.email}
      </div>
      <div className="flex items-center gap-3 text-xs font-medium text-slate-500 italic">
        <Phone size={14} className="text-[#0528d6]/60"/> {agency.phone}
      </div>
      <div className="flex items-center justify-between mt-3 pt-2">
        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${agency.is24Hours ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
          {agency.is24Hours ? '24h/24' : agency.workingHours}
        </span>
        <span className="text-[9px] font-bold text-slate-300">#{agency.id.substring(0,8).toUpperCase()}</span>
      </div>
    </div>
  </div>
);