/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React from 'react';
import { 
  Mail, Building2, MapPin, 
  ShieldCheck, FileText,
  Zap, BarChart3, Clock, Globe2,
  Download
} from 'lucide-react';

interface ProfileViewProps {
  userData: any; // UserEntity
  orgData: any;  // OrgResponseDTO
}

export const ProfileView = ({ userData, orgData }: ProfileViewProps) => {
  if (!userData || !orgData) return null;

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      
      {/* 1. ENTÊTE PROFIL (Combinaison User + Org) */}
      <div className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border-b-4 border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
        <div className="size-32 rounded-3xl overflow-hidden border-4 border-slate-50 dark:border-slate-700 shadow-inner shrink-0 bg-slate-100">
          <img 
            src={orgData.logoUrl || `https://ui-avatars.com/api/?name=${orgData.name}&background=0528d6&color=fff`} 
            alt="Logo" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{userData.fullname}</h3>
            {orgData.isVerified && <ShieldCheck className="text-blue-500" size={24} />}
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium uppercase text-xs tracking-widest mb-4">
            {userData.role} — <span className="font-black">{orgData.name}</span>
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
             <span className="flex items-center gap-2 italic"><Mail size={16} className="text-primary"/> {userData.email}</span>
             <span className="flex items-center gap-2 italic"><Clock size={16} className="text-primary"/> Inscrit le {new Date(userData.hiredAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLONNE GAUCHE : INFOS DE L'ORGANISATION (DÉTAILLÉES) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* IDENTITÉ & DESCRIPTION */}
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <SectionTitle icon={<Building2 />} title="Identité de l'Organisation" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <DataField label="Nom de l'entité" value={orgData.name} />
              <DataField label="Site Web" value={orgData.website} isLink />
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Description / Vision</label>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                  {orgData.description || "Aucune description fournie."}
                </p>
              </div>
            </div>
          </section>

          {/* LOCALISATION GÉOGRAPHIQUE */}
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <SectionTitle icon={<MapPin />} title="Localisation & Siège" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <DataField label="Adresse" value={orgData.address} />
              <DataField label="Ville" value={orgData.city} />
              <DataField label="Région" value={orgData.region} />
              <DataField label="Pays" value={orgData.country} />
              <DataField label="Code Postal" value={orgData.postalCode} />
              <DataField label="Fuseau Horaire" value={orgData.timezone} />
            </div>
          </section>

          {/* DONNÉES LÉGALES */}
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <SectionTitle icon={<FileText />} title="Conformité Légale" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <DataField label="Numéro Registre (RCCM)" value={orgData.registrationNumber} />
              <DataField label="Numéro Contribuable (NIU)" value={orgData.taxNumber} />
              {orgData.businessLicense && (
                <div className="md:col-span-2">
                    <a href={orgData.businessLicense} target="_blank" className="text-xs font-bold text-primary hover:underline flex items-center gap-2">
                        <Download size={14}/> Consulter la licence d&apos;exploitation
                    </a>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* COLONNE DROITE : STATS & ABONNEMENT (VALEURS RÉELLES) */}
        <div className="space-y-6">
          
          {/* KPI FINANCIERS & VOLUMES */}
          <section className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <SectionTitle icon={<BarChart3 />} title="Performance" />
            <div className="space-y-6 mt-6">
              <StatItem label="Locations totales" value={orgData.totalRentals} icon={<Zap />} />
              <StatItem label="Revenu Mensuel" value={`${orgData.monthlyRevenue?.toLocaleString()} XAF`} icon={<BarChart3 />} />
              <StatItem label="Revenu Annuel" value={`${orgData.yearlyRevenue?.toLocaleString()} XAF`} icon={<BarChart3 />} />
            </div>
          </section>

          {/* QUOTAS DU PLAN */}
          <section className="bg-[#0528d6] rounded-[2.5rem] p-8 text-white shadow-xl">
             <SectionTitle icon={<ShieldCheck className="text-white/50" />} title="Quotas du Plan" light />
             <div className="grid grid-cols-2 gap-4 mt-6">
                <QuotaBox label="Agences" current={orgData.currentAgencies} />
                <QuotaBox label="Véhicules" current={orgData.currentVehicles} />
                <QuotaBox label="Chauffeurs" current={orgData.currentDrivers} />
             </div>
             <div className="mt-6 pt-6 border-t border-white/10 text-[10px] font-medium opacity-70 italic">
                Expire le : {new Date(orgData.subscriptionExpiresAt).toLocaleDateString()}
             </div>
          </section>

          {/* CONTACT RAPIDE */}
          <section className="bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
             <SectionTitle icon={<Globe2 />} title="Contact Public" />
             <div className="mt-4 space-y-3">
                <p className="text-sm font-bold dark:text-white">{orgData.phone}</p>
                <p className="text-sm font-bold text-primary">{orgData.email}</p>
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- SOUS-COMPOSANTS UTILES ---

const SectionTitle = ({ icon, title, light }: any) => (
  <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800 pb-4">
    <span className={light ? "text-white" : "text-primary"}>{icon}</span>
    <h4 className={`text-sm font-bold uppercase italic tracking-tighter ${light ? "text-white" : "text-slate-800 dark:text-white"}`}>
      {title}
    </h4>
  </div>
);

const DataField = ({ label, value, isLink }: any) => (
  <div className="space-y-1">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{label}</p>
    {isLink ? (
      <a href={value} target="_blank" className="text-sm font-bold text-primary hover:underline block truncate">{value || '---'}</a>
    ) : (
      <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{value || '---'}</p>
    )}
  </div>
);

const StatItem = ({ label, value, icon }: any) => (
  <div className="flex items-center justify-between group">
    <div className="flex items-center gap-3">
      <div className="size-8 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
        {React.cloneElement(icon, { size: 14 })}
      </div>
      <span className="text-xs font-bold text-slate-500">{label}</span>
    </div>
    <span className="text-sm font-black dark:text-white">{value}</span>
  </div>
);

const QuotaBox = ({ label, current }: any) => (
  <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
    <p className="text-[9px] font-bold uppercase opacity-60 mb-1">{label}</p>
    <p className="text-xl font-black">{current}</p>
  </div>
);