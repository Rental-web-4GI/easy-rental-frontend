/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { 
  Mail, ShieldCheck, 
  Building2, Globe2,
  Briefcase, Calendar,
  Lock, CheckCircle2, AlertCircle
} from 'lucide-react';

export const ProfileView = ({ userData, agencyData, parentOrg }: any) => {
  if (!userData || !agencyData) return null;

  const permissions = userData.poste?.permissions || [];
  const isOwner = userData.role === 'ORGANIZATION_OWNER' || userData.role === 'ADMIN';

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* 1. ENTÊTE UTILISATEUR */}
      <div className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border-b-4 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="size-32 rounded-3xl overflow-hidden border-4 border-slate-50 dark:border-slate-700 shadow-inner shrink-0 bg-slate-100 flex items-center justify-center text-3xl font-bold text-[#0528d6]">
          {userData.firstname?.charAt(0)}{userData.lastname?.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{userData.fullname}</h3>
            <span className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full border ${
                userData.status === 'ACTIVE' 
                ? 'bg-green-50 text-green-600 border-green-100 dark:bg-green-900/20' 
                : 'bg-red-50 text-red-600 border-red-100'
            }`}>
              {userData.status}
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-widest mb-4">
             {userData.role} — <span className="font-black text-[#0528d6]">{agencyData.name}</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
             <span className="flex items-center gap-2 italic"><Mail size={16} className="text-[#0528d6]"/> {userData.email}</span>
             <span className="flex items-center gap-2 italic"><Calendar size={16} className="text-[#0528d6]"/> Assigné le {new Date(userData.hiredAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLONNE GAUCHE : INFOS STRUCTURELLES */}
        <div className="lg:col-span-2 space-y-6">
          
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800 pb-4 mb-6">
              <Building2 className="text-[#0528d6]" size={20} />
              <h4 className="text-sm font-bold uppercase italic tracking-tighter text-slate-800 dark:text-white">Ma Structure d&apos;accueil</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DataField label="Nom de l'agence" value={agencyData.name} />
              <DataField label="Ville opérationnelle" value={agencyData.city} />
              <DataField label="Adresse physique" value={agencyData.address} />
              <DataField label="Téléphone Agence" value={agencyData.phone} />
              <DataField label="Email professionnel" value={agencyData.email} />
              <DataField label="Horaires" value={agencyData.is24Hours ? "Ouvert 24h/24" : agencyData.workingHours} />
            </div>
          </section>

          {/* NOUVELLE SECTION : PRIVILÈGES DU POSTE */}
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
            <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <Lock className="text-[#0528d6]" size={20} />
                <h4 className="text-sm font-bold uppercase italic tracking-tighter text-slate-800 dark:text-white">Habilitations & Privilèges</h4>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg italic">
                {userData.poste?.name || "Rôle standard"}
              </span>
            </div>

            {isOwner ? (
                <div className="p-6 bg-blue-50 dark:bg-blue-900/10 border-2 border-blue-100 dark:border-blue-900/30 rounded-3xl flex items-center gap-5">
                    <div className="size-12 bg-white dark:bg-blue-900 rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                        <ShieldCheck size={28} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-blue-900 dark:text-blue-100 uppercase italic">Super-Administrateur</p>
                        <p className="text-xs text-blue-600/80 font-medium">Accès total et illimité à toutes les fonctions de l&apos;organisation et des agences.</p>
                    </div>
                </div>
            ) : permissions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {permissions.map((perm: any) => (
                        <div key={perm.id} className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-start gap-3 group hover:border-[#0528d6] transition-colors">
                            <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-[11px] font-black text-slate-700 dark:text-slate-200 uppercase tracking-tight mb-0.5">{perm.name}</p>
                                <p className="text-[10px] text-slate-400 font-medium italic leading-tight">{perm.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="p-10 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-3xl">
                    <AlertCircle size={32} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-xs text-slate-400 font-bold uppercase italic tracking-widest">Aucune permission spécifique rattachée</p>
                </div>
            )}
          </section>
        </div>

        {/* COLONNE DROITE */}
        <div className="space-y-6">
          <section className="bg-[#0528d6] rounded-[2.5rem] p-8 text-white shadow-xl text-left relative overflow-hidden">
             <Briefcase className="absolute -bottom-6 -right-6 opacity-10 rotate-12" size={120} />
             <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-6">
               <ShieldCheck className="text-white/50" size={20} />
               <h4 className="text-sm font-bold uppercase italic tracking-tighter text-white">Mon Contrat</h4>
             </div>
             <div className="space-y-4 relative z-10">
                <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                   <p className="text-[9px] font-bold uppercase opacity-60 mb-1">Poste occupé</p>
                   <p className="text-lg font-black">{userData.poste?.name || userData.role}</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/5">
                   <p className="text-[9px] font-bold uppercase opacity-60 mb-1">Identifiant Staff</p>
                   <p className="text-lg font-black truncate">#{userData.id?.substring(0,8).toUpperCase()}</p>
                </div>
             </div>
          </section>

          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm text-left">
             <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800 pb-4 mb-6">
               <Globe2 className="text-[#0528d6]" size={20} />
               <h4 className="text-sm font-bold uppercase italic tracking-tighter text-slate-800 dark:text-white">Support Interne</h4>
             </div>
             <div className="space-y-4">
                <p className="text-xs text-slate-500 italic leading-relaxed">En cas de problème avec vos accès, contactez l&apos;administrateur de l&apos;organisation.</p>
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Email Support</p>
                    <p className="text-sm font-bold text-[#0528d6] truncate">{parentOrg?.email || 'N/A'}</p>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const DataField = ({ label, value }: any) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{label}</p>
    <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{value || '---'}</p>
  </div>
);