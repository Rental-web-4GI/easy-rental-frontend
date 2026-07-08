/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import {
  Loader2,
  ArrowRight,
  Info,
  Clock,
  Bell,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { rentalService, resolveMediaDisplayUrl } from '@pwa-easy-rental/shared-services';
import ReservationDetail from './reservation/ReservationDetail';

const VEHICLE_FALLBACK = '/client/vehicle-placeholder.svg';

export const MyReservationsView = ({ userData, onNavigateToCatalog }: any) => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [detailsCache, setDetailsCache] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [selectedRes, setSelectedRes] = useState<any>(null);
  const [cancelling, setCancelling] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const prefetchDetails = async (items: any[]) => {
    const entries = await Promise.all(
      items.map(async (res) => {
        try {
          const response = await rentalService.getRentalDetails(res.id);
          if (response.ok && response.data) return [res.id, response.data] as const;
        } catch {
          /* ignore */
        }
        return null;
      })
    );
    const next: Record<string, any> = {};
    entries.forEach((entry) => {
      if (entry) next[entry[0]] = entry[1];
    });
    setDetailsCache(next);
  };

  useEffect(() => {
    fetchReservations();
  }, [userData]);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await rentalService.getClientActiveReservations();
      const list = res.data || [];
      setReservations(list);
      if (list.length > 0) await prefetchDetails(list);
    } catch (error) {
      console.error('Erreur chargement :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectReservation = async (res: any) => {
    if (detailsCache[res.id]) {
      setSelectedRes(detailsCache[res.id]);
      return;
    }
    setLoadingDetail(true);
    try {
      const response = await rentalService.getRentalDetails(res.id);
      if (response.ok && response.data) {
        setDetailsCache((prev) => ({ ...prev, [res.id]: response.data }));
        setSelectedRes(response.data);
      }
    } catch (error) {
      console.error('Erreur détail:', error);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Voulez-vous vraiment annuler cette demande ?')) return;
    setCancelling(true);
    try {
      await rentalService.cancelRental(id);
      setSelectedRes(null);
      await fetchReservations();
    } catch (error) {
      console.error('Erreur annulation:', error);
      alert('Erreur lors de l\'annulation');
    } finally {
      setCancelling(false);
    }
  };

  const formatDate = (dateStr: any) => {
    try {
      return format(new Date(dateStr), 'dd MMM yyyy', { locale: fr });
    } catch {
      return 'Date non définie';
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#0528d6] size-10" />
        <p className="text-[10px] font-black tracking-widest text-slate-400">Synchronisation...</p>
      </div>
    );
  }

  const selectedId = selectedRes?.rental?.id;

  return (
    <div className="w-full mx-auto space-y-8 animate-in fade-in duration-700 pb-20 px-4">
      <div className="flex justify-between items-center border-b pb-6 mt-4">
        <div>
          <h2 className="text-3xl font-[900] tracking-tighter text-slate-900">
            Réservations <span className="text-[#0528d6]">{selectedRes ? 'Détails' : 'Actives'}</span>
          </h2>
          <p className="text-slate-400 text-xs font-medium mt-1">Gestion de vos demandes en cours.</p>
        </div>
        <div className="size-12 bg-blue-50 text-[#0528d6] rounded-2xl flex items-center justify-center shadow-sm">
          <Bell size={20} />
        </div>
      </div>

      <div className={`grid gap-6 transition-all duration-500 ${selectedRes ? 'grid-cols-1 lg:grid-cols-12' : 'grid-cols-1'}`}>
        <div className={`${selectedRes ? 'lg:col-span-4 space-y-3' : 'grid gap-4 md:grid-cols-2 lg:grid-cols-2'}`}>
          {reservations.length > 0 ? (
            reservations.map((res: any) => {
              const cached = detailsCache[res.id];
              const vehicle = cached?.vehicle;
              const agency = cached?.agency;
              const thumb = vehicle?.images?.[0]
                ? resolveMediaDisplayUrl(vehicle.images[0])
                : VEHICLE_FALLBACK;

              return (
                <div
                  key={res?.id}
                  onClick={() => handleSelectReservation(res)}
                  className={`cursor-pointer group relative overflow-hidden transition-all duration-300 rounded-[2rem] border ${
                    selectedId === res.id
                      ? 'border-[#0528d6] bg-blue-50/50 ring-2 ring-[#0528d6]/10'
                      : 'bg-white border-slate-100 hover:border-blue-200 shadow-sm'
                  } ${selectedRes ? 'p-4' : 'p-6'}`}
                >
                  <div className="flex gap-3 mb-3">
                    <div className={`rounded-xl overflow-hidden bg-slate-100 shrink-0 ${selectedRes ? 'size-12' : 'size-14'}`}>
                      <img
                        src={thumb}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = VEHICLE_FALLBACK; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[8px] font-black text-slate-400 tracking-widest">#{res?.id?.slice(0, 8)}</p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {vehicle ? `${vehicle.brand} ${vehicle.model}` : 'Véhicule'}
                      </p>
                      {agency && (
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 truncate mt-0.5">
                          <MapPin size={10} /> {agency.name}
                        </p>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[8px] font-black h-fit ${
                      res?.status === 'PENDING' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                    }`}>
                      {res?.status}
                    </span>
                  </div>

                  {!selectedRes && (
                    <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-xl mb-3 text-[11px] font-bold">
                      <span>{formatDate(res?.startDate)}</span>
                      <ArrowRight className="text-slate-300" size={14} />
                      <span className="ml-auto">{formatDate(res?.endDate)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <p className={`${selectedRes ? 'text-sm' : 'text-lg'} font-black text-slate-900`}>
                      {res?.totalAmount?.toLocaleString('fr-FR')} <span className="text-[10px] opacity-40">XAF</span>
                    </p>
                    <ChevronRight size={16} className={`text-slate-300 ${selectedId === res.id ? 'rotate-90 text-[#0528d6]' : ''}`} />
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState onNavigateToCatalog={onNavigateToCatalog} />
          )}
        </div>

        {selectedRes && (
          <div className="lg:col-span-8 animate-in slide-in-from-right-4 duration-500">
            {loadingDetail ? (
              <div className="bg-white rounded-[2.5rem] h-[500px] flex flex-col items-center justify-center border border-slate-100 shadow-xl">
                <Loader2 className="animate-spin text-[#0528d6] mb-4" size={30} />
                <p className="text-[10px] font-black tracking-widest text-slate-400">Chargement...</p>
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
          <p className="text-[11px] leading-relaxed">
            Les réservations <span className="text-blue-400 font-bold">PENDING</span> sont en attente de confirmation par l&apos;agence.
            Contactez-la par téléphone ou email pour valider votre créneau et régler l&apos;acompte.
          </p>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ onNavigateToCatalog }: { onNavigateToCatalog?: () => void }) => (
  <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm text-center col-span-full">
    <div className="size-24 bg-orange-50 text-orange-500 rounded-[2.8rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
      <Clock size={48} />
    </div>
    <h4 className="text-3xl font-black text-slate-900 tracking-tighter">Aucune réservation</h4>
    <p className="text-slate-400 text-sm font-medium max-w-xs mx-auto mt-3 leading-relaxed">
      Vos réservations actives s&apos;afficheront ici.
    </p>
    <button
      type="button"
      onClick={onNavigateToCatalog}
      className="mt-10 bg-[#0528d6] text-white px-12 py-5 rounded-full font-black text-xs tracking-[0.2em] shadow-2xl hover:scale-105 transition-all"
    >
      Louer un véhicule
    </button>
  </div>
);
