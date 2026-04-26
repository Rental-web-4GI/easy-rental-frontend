/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState } from 'react';
import { X, User, Phone, Banknote, Loader2, Clock, Store } from 'lucide-react';
import { Portal } from '../../components/Portal';
import { rentalService } from '@pwa-easy-rental/shared-services';

export const RentalDetailsModal = ({ rentalId, onClose, t }: any) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    rentalService.getRentalDetails(rentalId).then(res => {
      if (res.ok) setData(res.data);
      setLoading(false);
    });
  }, [rentalId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PAID': return 'bg-green-50 text-green-700 border-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'ONGOING': return 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'COMPLETED': return 'bg-slate-50 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400';
      case 'CANCELLED': return 'bg-red-50 text-red-700 border-red-100 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
    }
  };

  if (loading) return <Portal><div className="fixed inset-0 z-[1100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md"><Loader2 className="animate-spin text-white size-12" /></div></Portal>;

  const { rental, vehicle, driver, agency } = data;

  return (
    <Portal>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-2 md:p-4 text-left">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose} />
        <div className="relative w-full max-w-5xl bg-white dark:bg-[#1a1d2d] rounded-[3rem] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden border border-white/20 animate-in zoom-in">
          
          <div className="px-6 md:px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <div>
<<<<<<< HEAD
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white  italic tracking-tighter">Dossier de Location</h3>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black  tracking-widest border ${getStatusStyle(rental.status)}`}>{rental.status}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold  tracking-widest italic">Reference: {rental.id}</p>
=======
              <div className="flex flex-wrap items-center gap-4 mb-2">
                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white uppercase italic tracking-tighter leading-none">Dossier #RT-{rental.id.substring(0,8).toUpperCase()}</h3>
                <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusColor(rental.status)}`}>{rental.status}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic flex items-center gap-2"><Store size={10} className="text-[#0528d6]"/> {agency.name} — {agency.city}</p>
>>>>>>> f89e8e59f63bc1dfac2a96703e19a8ccc0658d21
            </div>
            <button onClick={onClose} className="size-12 bg-white dark:bg-slate-800 flex items-center justify-center rounded-2xl hover:text-red-500 transition-all shadow-sm"><X size={24}/></button>
          </div>

<<<<<<< HEAD
          <div className="p-10 overflow-y-auto custom-scrollbar space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <section className="space-y-6">
                    <h4 className="text-[10px] font-black  text-[#0528d6] italic border-b pb-2 flex items-center gap-2"><User size={14}/> Client</h4>
                    <div className="space-y-4">
                        <DataRow label="Nom complet" value={rental.clientName} />
                        <DataRow label="Téléphone" value={rental.clientPhone} icon={<Phone size={10}/>} />
                        <DataRow label="ID Client" value={rental.clientId?.substring(0,12)} mono />
                    </div>
                </section>

                <section className="space-y-6">
                    <h4 className="text-[10px] font-black  text-[#0528d6] italic border-b pb-2 flex items-center gap-2"><Calendar size={14}/> Période</h4>
                    <div className="space-y-4">
                        <DataRow label="Date de départ" value={new Date(rental.startDate).toLocaleString()} />
                        <DataRow label="Date de retour" value={new Date(rental.endDate).toLocaleString()} />
                        <DataRow label="Type Facturation" value={rental.rentalType} />
                    </div>
                </section>

                <section className="space-y-6">
                    <h4 className="text-[10px] font-black  text-[#0528d6] italic border-b pb-2 flex items-center gap-2"><Banknote size={14}/> État Financier</h4>
                    <div className="p-5 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 space-y-3">
                        <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 ">Total Dossier</span><span className="text-sm font-black text-slate-900 dark:text-white">{rental.totalAmount?.toLocaleString()} XAF</span></div>
                        <div className="flex justify-between items-center"><span className="text-[9px] font-bold text-slate-400 ">Montant Perçu</span><span className="text-sm font-black text-green-500">{rental.amountPaid?.toLocaleString()} XAF</span></div>
                        <div className="flex justify-between items-center pt-2 border-t border-slate-200"><span className="text-[9px] font-bold text-slate-400 ">Caution</span><span className="text-sm font-black text-orange-500">{rental.depositAmount?.toLocaleString()} XAF</span></div>
=======
          <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <section className="p-7 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-[11px] font-black uppercase text-[#0528d6] italic border-b dark:border-slate-800 pb-2 flex items-center gap-2"><User size={14}/> {t.table.customer}</h4>
                    <DataRow label={t.auth.lastname} value={rental.clientName} />
                    <DataRow label={t.agencies.card.phone} value={rental.clientPhone} icon={<Phone size={10}/>} />
                    <DataRow label={t.onboarding.form.legal} value={rental.cniNumber || 'N/A'} mono />
                </section>

                <section className="p-7 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 space-y-4">
                    <h4 className="text-[11px] font-black uppercase text-[#0528d6] italic border-b dark:border-slate-800 pb-2 flex items-center gap-2"><Clock size={14}/> {t.onboarding.step3Title}</h4>
                    <DataRow label={t.table.start} value={new Date(rental.startDate).toLocaleString()} />
                    <DataRow label={t.table.end} value={new Date(rental.endDate).toLocaleString()} />
                    <DataRow label="Type" value={rental.rentalType} />
                </section>

                <section className="p-7 bg-[#0528d6] rounded-[2.5rem] text-white shadow-xl space-y-4 relative overflow-hidden">
                    <Banknote size={100} className="absolute -bottom-5 -right-5 opacity-10 rotate-12"/>
                    <h4 className="text-[11px] font-black uppercase italic border-b border-white/20 pb-2 flex items-center gap-2"><Banknote size={14}/> {t.table.payment}</h4>
                    <div className="space-y-3 relative z-10">
                        <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">{t.table.total}</span><span className="text-xl font-black">{rental.totalAmount?.toLocaleString()} XAF</span></div>
                        <div className="flex justify-between items-center"><span className="text-[10px] font-bold opacity-60 uppercase">{t.kpi.revenue}</span><span className="text-xl font-black text-green-400">{rental.amountPaid?.toLocaleString()} XAF</span></div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/10"><span className="text-[10px] font-bold opacity-60 uppercase">{t.table.remaining}</span><span className="text-xl font-black text-orange-400">{(rental.totalAmount - rental.amountPaid).toLocaleString()} XAF</span></div>
>>>>>>> f89e8e59f63bc1dfac2a96703e19a8ccc0658d21
                    </div>
                </section>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
<<<<<<< HEAD
                <div className="p-8 bg-[#0528d6] rounded-[2.5rem] text-white relative overflow-hidden shadow-xl">
                    <Car size={150} className="absolute -bottom-10 -right-10 opacity-10 rotate-12" />
                    <h4 className="text-xs font-black  italic mb-6 opacity-70">Ressources Assignées</h4>
                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <Car size={24}/>
                            <div>
                                <p className="text-[8px] font-bold  opacity-60">Véhicule Licence</p>
                                <p className="text-sm font-black italic">{rental.licencePlate || 'NON ASSIGNÉ'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                            <User size={24}/>
                            <div>
                                <p className="text-[8px] font-bold  opacity-60">Chauffeur Name</p>
                                <p className="text-sm font-black italic">{(rental.firstname + ' ' + rental.lastname) || 'NON ASSIGNÉ'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                    <ShieldCheck size={150} className="absolute -bottom-10 -right-10 opacity-5" />
                    <h4 className="text-xs font-black  italic mb-6 opacity-70">Traçabilité Opérationnelle</h4>
                    <div className="space-y-4">
                        <DataRow label="Agence ID" value={rental.agencyId} dark />
                        <DataRow label="Dernière Mise à jour" value={new Date(rental.updatedAt).toLocaleString()} dark />
                        <div className="flex items-center gap-3 pt-4">
                            <div className="size-2 rounded-full bg-green-500 animate-pulse"/>
                            <p className="text-[10px] font-black  italic tracking-widest text-slate-400">Dossier en règle avec la politique fiscalité</p>
                        </div>
=======
                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex items-center gap-8 group">
                    <div className="size-20 md:size-28 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg shrink-0 border-2 border-white dark:border-slate-800 bg-slate-50">
                        <img src={vehicle.images?.[0]} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt=""/>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-[#0528d6] uppercase tracking-widest italic mb-1">{t.table.vehicle}</p>
                        <h4 className="text-xl md:text-2xl font-black italic uppercase text-slate-800 dark:text-white leading-none">{vehicle.brand} {vehicle.model}</h4>
                        <p className="mt-3 text-[10px] md:text-xs font-mono font-bold text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1 rounded-lg inline-block uppercase italic">{vehicle.licencePlate}</p>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 flex items-center gap-8">
                    <div className="size-20 md:size-28 rounded-[2rem] md:rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-800 overflow-hidden shadow-inner uppercase">
                        {driver?.profilUrl ? <img src={driver.profilUrl} className="w-full h-full object-cover" alt=""/> : <User size={40} className="text-slate-300"/>}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-[#0528d6] uppercase tracking-widest italic mb-1">{t.sidebar.staff.split(' ')[0]}</p>
                        {driver ? (
                            <>
                                <h4 className="text-xl md:text-2xl font-black italic uppercase text-slate-800 dark:text-white leading-none">{driver.firstname} {driver.lastname}</h4>
                                <p className="mt-3 text-xs md:text-sm font-bold text-slate-400 italic flex items-center gap-2"><Phone size={12}/> {driver.tel}</p>
                            </>
                        ) : <p className="text-xs md:text-sm font-black text-slate-500 uppercase italic">{t.staff.noPoste}</p>}
>>>>>>> f89e8e59f63bc1dfac2a96703e19a8ccc0658d21
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

<<<<<<< HEAD
const DataRow = ({ label, value, icon, mono, dark }: any) => (
    <div className="flex justify-between items-center group">
        <span className={`text-[9px] font-black  italic tracking-widest ${dark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>
        <div className="flex items-center gap-2">
=======
const DataRow = ({ label, value, icon, mono }: any) => (
    <div className="flex justify-between items-center gap-4">
        <span className="text-[10px] font-black uppercase italic tracking-widest text-slate-400 whitespace-nowrap">{label}</span>
        <div className="flex items-center gap-2 overflow-hidden italic">
>>>>>>> f89e8e59f63bc1dfac2a96703e19a8ccc0658d21
            {icon && <span className="text-[#0528d6]">{icon}</span>}
            <span className={`text-sm font-black text-slate-800 dark:text-slate-100 truncate ${mono ? 'font-mono' : ''}`}>{value || '---'}</span>
        </div>
    </div>
);