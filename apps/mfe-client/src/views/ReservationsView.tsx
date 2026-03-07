/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { 
  Car, 
  User as UserIcon, 
  Loader2, 
  ArrowRight, 
  Info,
  Clock,
  Bell,
  X,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MapPin
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { rentalService } from '@shared-services/api/rental.service';
import ReservationDetail from './reservation/ReservationDetail';

export const MyReservationsView = ({ userData }: any) => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [cancelling, setCancelling] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  useEffect(() => {
    fetchReservations();
  }, [userData]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await rentalService.getClientActiveReservations();
      setReservations(res.data || []);
    } catch (error) {
      console.error("Erreur chargement :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReservation = async (res: any) => {
    setLoadingDetail(true);
    try {
      const response = await rentalService.getRentalDetails(res.id);
      setSelectedRes(response.data);
    } catch (error) {
      console.error("Erreur détail:", error);
      setSelectedRes({ rental: res });
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm("Voulez-vous vraiment annuler cette demande ?")) return;
    setCancelling(true);
    try {
      await rentalService.cancelRental(id);
      setSelectedRes(null);
      await fetchReservations(); // Refresh la liste
    } catch (error) {
      alert("Erreur lors de l'annulation");
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateStr: any) => {
    try {
      return format(new Date(dateStr), 'dd MMM yyyy', { locale: fr });
    } catch (e) {
      return "Date non définie";
    }
  };

  if (loading) return (
    <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
      <Loader2 className="animate-spin text-[#0528d6] size-10" />
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Synchronisation...</p>
    </div>
  );

  return (
    <div className="w-full mx-auto space-y-8 animate-in fade-in duration-700 pb-20 px-4">
      
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-6 mt-4">
        <div>
          <h2 className="text-3xl font-[900] tracking-tighter text-slate-900">
            Réservations <span className="text-[#0528d6]">{selectedRes ? 'Détails' : 'Actives'}</span>
          </h2>
          <p className="text-slate-400 text-xs font-medium italic mt-1">Gestion de vos demandes en cours.</p>
        </div>
        <div className="size-12 bg-blue-50 text-[#0528d6] rounded-2xl flex items-center justify-center shadow-sm">
          <Bell size={20}/>
        </div>
      </div>

      {/* Layout Master-Detail */}
      <div className={`grid gap-6 transition-all duration-500 ${selectedRes ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        
        {/* COLONNE GAUCHE: Liste des cartes */}
        <div className={`${selectedRes ? "lg:col-span-4 space-y-3" : "grid gap-4 md:grid-cols-2 lg:grid-cols-2"}`}>
          {reservations.length > 0 ? (
            reservations.map((res: any) => (
              <div 
                key={res?.id} 
                onClick={() => handleSelectReservation(res)}
                className={`cursor-pointer group relative overflow-hidden transition-all duration-300 rounded-[2rem] border ${
                  selectedRes?.id === res.id 
                  ? "border-[#0528d6] bg-blue-50/50 ring-2 ring-[#0528d6]/10" 
                  : "bg-white border-slate-100 hover:border-blue-200 shadow-sm"
                } ${selectedRes ? "p-4" : "p-6"}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-xl flex items-center justify-center transition-colors ${selectedRes?.id === res.id ? 'bg-[#0528d6] text-white' : 'bg-slate-900 text-white'} ${selectedRes ? 'size-10' : 'size-12'}`}>
                      <Car size={selectedRes ? 18 : 24} />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">ID</p>
                      <p className="text-[11px] font-bold text-slate-900 tracking-tight">#{res?.id?.slice(0, 8)}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                    res?.status === 'PENDING' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'
                  }`}>
                    {res?.status}
                  </div>
                </div>

                {!selectedRes && (
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-[1.5rem] mb-4">
                    <div className="flex-1"><p className="text-[11px] font-bold">{formatDate(res?.startDate)}</p></div>
                    <ArrowRight className="text-slate-300" size={14} />
                    <div className="flex-1 text-right"><p className="text-[11px] font-bold">{formatDate(res?.endDate)}</p></div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <p className={`${selectedRes ? 'text-sm' : 'text-lg'} font-black text-slate-900 italic`}>
                    {res?.totalAmount?.toLocaleString()} <span className="text-[10px] opacity-40">XAF</span>
                  </p>
                  <ChevronRight size={16} className={`text-slate-300 transition-transform ${selectedRes?.id === res.id ? 'rotate-90 text-[#0528d6]' : ''}`} />
                </div>
              </div>
            ))
          ) : (
             <EmptyState />
          )}
        </div>

        {/* COLONNE DROITE: Détails détaillés */}
        {selectedRes && (
          <div className="lg:col-span-8 animate-in slide-in-from-right-4 duration-500">
            {loadingDetail ? (
              <div className="bg-white rounded-[2.5rem] h-[500px] flex flex-col items-center justify-center border border-slate-100 shadow-xl">
                <Loader2 className="animate-spin text-[#0528d6] mb-4" size={30} />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Chargement du véhicule...</p>
              </div>
            ) : (
              <ReservationDetail
                data={selectedRes} 
                onClose={() => setSelectedRes(null)} 
                onCancel={handleCancel}
                cancelling={cancelling}
              />
            )}
          </div>
        )}
      </div>

      {!selectedRes && reservations.length > 0 && (
        <div className="p-6 bg-slate-900 rounded-[2.5rem] flex items-start gap-4 text-white/80 shadow-2xl">
          <Info className="text-blue-400 shrink-0" size={24} />
          <p className="text-[11px] leading-relaxed italic">
            Les réservations <span className="text-blue-400 font-bold underline italic">PENDING</span> sont en attente de confirmation par l'agence. Nos agents vérifient la disponibilité du véhicule et du chauffeur.
          </p>
        </div>
      )}
    </div>
  );
};

// --- SOUS-COMPOSANTS INTERNES ---

const InfoBlock = ({ icon, label, value, subValue, highlight }: any) => (
  <div className={`p-5 rounded-[1.8rem] border ${highlight ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-100' : 'bg-white border-slate-100'}`}>
    <div className="flex items-center gap-3 mb-3">
      <div className={`${highlight ? 'text-white/60' : 'text-[#0528d6]'}`}>{icon}</div>
      <p className={`text-[9px] font-black uppercase tracking-widest ${highlight ? 'text-white/60' : 'text-slate-400'}`}>{label}</p>
    </div>
    <p className={`text-xl font-black italic ${highlight ? 'text-white' : 'text-slate-900'}`}>{value}</p>
    <p className={`text-[10px] font-bold ${highlight ? 'text-white/50' : 'text-slate-400'}`}>{subValue}</p>
  </div>
);

const ReservationDetailPanel = ({ data, onClose, onCancel, cancelling }: any) => {
  const { rental, vehicle, driver, agency } = data;

  const FeatureBadge = ({ label, active }: any) => active ? (
    <span className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-[#0528d6] rounded-xl text-[9px] font-black border border-blue-100 uppercase tracking-tighter">
      {label}
    </span>
  ) : null;

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden sticky top-4">
      {/* Banner */}
      <div className="relative h-56 bg-slate-900">
        <img 
          src={vehicle?.images?.[0] || '/car-placeholder.png'} 
          className="w-full h-full object-cover opacity-60" 
          alt="Vehicle"
        />
        <button onClick={onClose} className="absolute top-6 right-6 size-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white"><X size={20}/></button>
        <div className="absolute bottom-6 left-8">
          <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">{vehicle?.brand} {vehicle?.model}</p>
          <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter">
            {vehicle?.licencePlate || "Immatriculation en cours"}
          </h3>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Rapid Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="text-center p-3 bg-slate-50 rounded-2xl">
              <p className="text-[8px] font-black text-slate-400 uppercase">Places</p>
              <p className="text-sm font-black">{vehicle?.places || 5}</p>
           </div>
           <div className="text-center p-3 bg-slate-50 rounded-2xl">
              <p className="text-[8px] font-black text-slate-400 uppercase">Transmission</p>
              <p className="text-sm font-black tracking-tighter">{vehicle?.transmission || 'Auto'}</p>
           </div>
           <div className="text-center p-3 bg-slate-50 rounded-2xl">
              <p className="text-[8px] font-black text-slate-400 uppercase">Conso</p>
              <p className="text-sm font-black">{vehicle?.fuelEfficiency?.highway || '7L'}/100</p>
           </div>
           <div className="text-center p-3 bg-slate-50 rounded-2xl">
              <p className="text-[8px] font-black text-slate-400 uppercase">Année</p>
              <p className="text-sm font-black">{new Date(vehicle?.yearProduction).getFullYear()}</p>
           </div>
        </div>

        {/* Features */}
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Équipements inclus</p>
          <div className="flex flex-wrap gap-2">
            <FeatureBadge label="Clim" active={vehicle?.functionalities?.air_condition} />
            <FeatureBadge label="GPS" active={vehicle?.functionalities?.gps} />
            <FeatureBadge label="Bluetooth" active={vehicle?.functionalities?.bluetooth} />
            <FeatureBadge label="USB" active={vehicle?.functionalities?.usb_input} />
            <FeatureBadge label="Siège Enfant" active={vehicle?.functionalities?.child_seat} />
          </div>
        </div>

        {/* Agency & Driver */}
        <div className="flex flex-col md:flex-row gap-6 py-6 border-y border-slate-50">
          <div className="flex-1 flex items-center gap-3">
             <div className="size-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                {agency?.logoUrl ? <img src={agency.logoUrl} className="w-full h-full object-cover rounded-xl"/> : <MapPin size={20}/>}
             </div>
             <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Agence</p>
                <p className="text-xs font-bold">{agency?.name}</p>
             </div>
          </div>
          {driver && (
            <div className="flex-1 flex items-center gap-3">
              <div className="size-10 bg-blue-50 rounded-xl flex items-center justify-center text-[#0528d6]">
                {driver?.profilUrl ? <img src={driver.profilUrl} className="w-full h-full object-cover rounded-xl"/> : <UserIcon size={20}/>}
              </div>
              <div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Chauffeur</p>
                <p className="text-xs font-bold">{driver?.firstname} {driver?.lastname}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action button */}
        <button 
          disabled={cancelling}
          onClick={() => onCancel(rental.id)}
          className="w-full py-5 bg-red-50 text-red-500 rounded-3xl text-[11px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          {cancelling ? <Loader2 className="animate-spin" size={18} /> : "Annuler ma demande"}
        </button>
      </div>
    </div>
  );
};

const EmptyState = () => (
  <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm text-center col-span-full">
    <div className="size-24 bg-orange-50 text-orange-500 rounded-[2.8rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
      <Clock size={48} />
    </div>
    <h4 className="text-3xl font-black text-slate-900 italic uppercase tracking-tighter">Silence radio...</h4>
    <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto italic mt-3 leading-relaxed">
      Vous n'avez aucune réservation active. Vos futures aventures commencent ici.
    </p>
    <button className="mt-10 bg-[#0528d6] text-white px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
      Louer un véhicule
    </button>
  </div>
);