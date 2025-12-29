import React from 'react';

interface KpiCardProps {
  label: string;
  value: string | number;
  growth?: string; // Ex: "+12%"
  icon: React.ReactNode;
  badge?: string; // Ex: "Action Req."
  highlight?: boolean; // Si vrai, utilise une bordure orange
  className?: string;
}

export const KpiCard = ({ 
  label, 
  value, 
  growth, 
  icon, 
  badge, 
  highlight, 
  className = "" 
}: KpiCardProps) => {
  return (
    <div className={`
      p-8 rounded-[2.5rem] border flex flex-col justify-between h-44 group transition-all duration-500
      bg-white dark:bg-[#1a1d2d] hover:shadow-2xl hover:-translate-y-1
      ${highlight 
        ? 'border-orange-500/20 shadow-orange-500/5' 
        : 'border-slate-100 dark:border-slate-800 shadow-sm'
      }
      ${className}
    `}>
      {/* Top Section: Icon & Badges */}
      <div className="flex justify-between items-start">
        <div className={`
          p-4 rounded-2xl transition-all duration-500
          ${highlight 
            ? 'bg-orange-50 dark:bg-orange-500/10 text-orange-600' 
            : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
          }
        `}>
          {icon}
        </div>
        
        <div className="flex flex-col items-end gap-2">
          {growth && (
            <span className="text-[10px] font-black text-green-600 italic leading-none tracking-tight">
              {growth}
            </span>
          )}
          {badge && (
            <span className="bg-orange-500 text-white text-[8px] font-black px-3 py-1 rounded-full italic uppercase leading-none shadow-lg shadow-orange-500/20">
              {badge}
            </span>
          )}
        </div>
      </div>

      {/* Bottom Section: Label & Value */}
      <div>
        <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1 italic leading-none">
          {label}
        </p>
        <p className="text-3xl font-[900] italic uppercase leading-none text-slate-900 dark:text-white tracking-tighter">
          {value}
        </p>
      </div>
    </div>
  );
};