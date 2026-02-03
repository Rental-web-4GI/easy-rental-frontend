'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Store, Plus, Search, Loader2, CarFront, Users } from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';
import { StatCard } from '../components/StatCard';
import { AgencyCard } from './agencies/AgencyCard';
import { AgencyForm } from './agencies/AgencyForm';

export const AgenciesView = ({ orgData }: { orgData: any }) => {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const initialForm = useMemo(() => ({
    name: '', description: '', address: '', city: '', country: 'Cameroun',
    postalCode: '', region: '', phone: '', email: '', 
    managerId: orgData?.ownerId || '', latitude: 0, longitude: 0,
    geofenceRadius: 5.0, is24Hours: true, timezone: 'Africa/Douala',
    workingHours: '08:00-18:00', allowOnlineBooking: true, 
    depositPercentage: 10, logoUrl: '', primaryColor: '#0528d6', secondaryColor: '#F76513'
  }), [orgData]);

  const loadAgencies = useCallback(async () => {
    if (!orgData?.id) return;
    setLoading(true);
    try {
      const res = await orgService.getAgencies(orgData.id);
      if (res.ok) setAgencies(res.data || []);
    } finally { setLoading(false); }
  }, [orgData?.id]);

  useEffect(() => { loadAgencies(); }, [loadAgencies]);

  const handleSubmit = async (finalData: any) => {
    setModalLoading(true);
    setBackendError(null);

    try {
      const res = editingAgency 
        ? await orgService.updateAgency(editingAgency.id, finalData) 
        : await orgService.createAgency(orgData.id, finalData);
      
      if (res.ok) { 
        setIsModalOpen(false); 
        loadAgencies(); 
      } else {
        // CAPTURE DE L'ERREUR BACKEND (Quota atteint, etc.)
        const errorMsg = res.data?.message || "Une erreur est survenue lors de l'enregistrement.";
        setBackendError(errorMsg);
      }
    } catch (err) {
      setBackendError("Impossible de contacter le serveur.");
    } finally {
      setModalLoading(false);
    }
  };

  const filteredAgencies = useMemo(() => agencies.filter(a => 
    a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.city.toLowerCase().includes(searchTerm.toLowerCase())
  ), [agencies, searchTerm]);

  if (loading) return <div className="h-96 flex items-center justify-center"><Loader2 className="animate-spin text-[#0528d6] size-10" /></div>;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Points de vente" value={orgData?.currentAgencies || agencies.length} icon={<Store />} />
        <StatCard label="Véhicules Fleet" value={orgData?.currentVehicles || 0} icon={<CarFront />} />
        <StatCard label="Chauffeurs" value={orgData?.currentDrivers || 0} icon={<Users />} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1a1d2d] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0528d6]" size={18} />
          <input 
            placeholder="Rechercher une agence..."
            className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0528d6]/20 font-medium dark:text-white"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { setEditingAgency(null); setIsModalOpen(true); }}
          className="w-full md:w-auto px-6 py-3 bg-[#0528d6] text-white rounded-xl font-bold text-sm shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Ajouter une agence
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredAgencies.map(agency => (
          <AgencyCard 
            key={agency.id} 
            agency={agency} 
            onEdit={(a: any) => { setEditingAgency(a); setIsModalOpen(true); }} 
            onDelete={async (id: string) => { if(confirm('Supprimer cette agence ?')) { await orgService.deleteAgency(id); loadAgencies(); } }} 
          />
        ))}
      </div>

      {isModalOpen && (
        <AgencyForm 
          editingAgency={editingAgency}
          initialData={editingAgency || initialForm}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          modalLoading={modalLoading}
        />
      )}
    </div>
  );
}