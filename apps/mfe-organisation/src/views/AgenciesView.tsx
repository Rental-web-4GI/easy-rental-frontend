'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Store, Plus, Search, MapPin, Phone, Mail, 
  Trash2, Edit3, Loader2, ArrowRight, X, CarFront
} from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';

export const AgenciesView = ({ orgData, t }: { orgData: any, t: any }) => {
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgency, setEditingAgency] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Form State aligné sur AgencyRequestDTO
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    city: '',
    country: 'Cameroun',
    phone: '',
    email: '',
    managerId: '',
    latitude: 0,
    longitude: 0,
    is24Hours: true,
    timezone: 'Africa/Douala',
    workingHours: '08:00-18:00',
    allowOnlineBooking: true,
    depositPercentage: 10
  });

  // Chargement des agences
  const loadAgencies = async () => {
    if (!orgData?.id) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await orgService.getAgencies(orgData.id);
      if (res.ok) {
        setAgencies(res.data || []);
      }
    } catch (error) {
      console.error("Erreur chargement agences:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orgData) {
      setFormData(prev => ({ ...prev, managerId: orgData.ownerId || '' }));
      loadAgencies();
    }
  }, [orgData?.id, orgData?.ownerId]);

  const filteredAgencies = useMemo(() => {
    return (agencies || []).filter(a => 
      a?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      a?.city?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [agencies, searchTerm]);

  const stats = useMemo(() => ({
    total: agencies.length,
    totalVehicles: agencies.reduce((acc, curr) => acc + (curr.totalVehicles || 0), 0),
    activeVehicles: agencies.reduce((acc, curr) => acc + (curr.activeVehicles || 0), 0)
  }), [agencies]);

  // --- SOUMISSION DU FORMULAIRE ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgData?.id) return;

    setModalLoading(true);
    
    // NETTOYAGE DES DONNÉES : Conversion des types pour le Backend
    const payload = {
      ...formData,
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),
      depositPercentage: Number(formData.depositPercentage),
      managerId: formData.managerId || orgData.ownerId
    };

    try {
      const res = editingAgency 
        ? await orgService.updateAgency(editingAgency.id, payload)
        : await orgService.createAgency(orgData.id, payload);
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingAgency(null);
        setFormData({
            name: '', description: '', address: '', city: '', country: 'Cameroun',
            phone: '', email: '', managerId: orgData.ownerId || '',
            latitude: 0, longitude: 0, is24Hours: true, timezone: 'Africa/Douala',
            workingHours: '08:00-18:00', allowOnlineBooking: true, depositPercentage: 10
        });
        await loadAgencies();
      } else {
        alert(t.agencies.alerts.errorSubmit);
      }
    } catch (error) {
      alert(t.agencies.alerts.errorConn);
    } finally {
      setModalLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t.agencies.card.deleteConfirm)) {
      const res = await orgService.deleteAgency(id);
      if (res.ok) loadAgencies();
    }
  };

  const openEdit = (agency: any) => {
    setEditingAgency(agency);
    setFormData({
      ...agency,
      managerId: agency.managerId || orgData.ownerId
    });
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center animate-pulse">
      <Loader2 className="animate-spin text-[#0528d6] size-12" />
      <p className="text-[10px] font-black uppercase mt-4 text-slate-400 tracking-widest italic">Hub Rental...</p>
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={t.agencies.stats.total} value={stats.total} icon={<Store />} />
        <StatCard label={t.agencies.stats.vehicles} value={stats.totalVehicles} icon={<CarFront />} />
        <StatCard label={t.agencies.stats.active} value={stats.activeVehicles} icon={<ArrowRight className="text-green-500" />} />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder={t.agencies.searchPlaceholder}
            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#F76513] font-bold text-sm dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => { setEditingAgency(null); setIsModalOpen(true); }}
          className="w-full md:w-auto px-8 py-4 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-xs shadow-xl shadow-orange-200 dark:shadow-none flex items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={18} /> {t.agencies.addBtn}
        </button>
      </div>

      {agencies.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1d2d] rounded-[3.5rem] p-16 border-2 border-dashed border-slate-100 dark:border-slate-800 text-center space-y-6">
          <div className="size-20 bg-slate-50 dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto text-slate-300"><Store size={40} /></div>
          <h3 className="text-2xl font-black uppercase italic dark:text-white">{t.agencies.empty.title}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t.agencies.empty.subtitle}</p>
          <button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase italic text-xs">{t.agencies.empty.action}</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAgencies.map((agency) => (
            <div key={agency.id} className="bg-white dark:bg-[#1a1d2d] rounded-[3rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="size-14 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary font-black italic text-xl">
                    {agency.name?.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none">{agency.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1">
                      <MapPin size={10} /> {agency.city}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(agency)} className="p-2 hover:bg-blue-50 rounded-lg text-slate-300 hover:text-primary transition-colors"><Edit3 size={18}/></button>
                  <button onClick={() => handleDelete(agency.id)} className="p-2 hover:bg-red-50 rounded-lg text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                </div>
              </div>
              <div className="flex flex-col gap-2 text-[11px] font-bold text-slate-500 border-t border-slate-50 dark:border-slate-800 pt-6">
                 <div className="flex items-center gap-2 italic"><Mail size={14} className="text-primary"/> {agency.email || t.agencies.card.noEmail}</div>
                 <div className="flex items-center gap-2 italic"><Phone size={14} className="text-primary"/> {agency.phone || t.agencies.card.noPhone}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <form onSubmit={handleSubmit} className="relative w-full max-w-2xl bg-white dark:bg-[#1a1d2d] rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none">
                    {editingAgency ? t.agencies.modal.titleEdit : t.agencies.modal.titleAdd}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full dark:text-white"><X size={24}/></button>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto px-2 custom-scrollbar">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.name}</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#F76513] dark:text-white" placeholder={t.agencies.modal.namePlaceholder} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.city}</label>
                    <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none dark:text-white" placeholder={t.agencies.modal.cityPlaceholder} />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.phone}</label>
                    <input required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none dark:text-white" placeholder={t.agencies.modal.phonePlaceholder} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.address}</label>
                <input required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none dark:text-white" placeholder={t.agencies.modal.addressPlaceholder} />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.email}</label>
                <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none dark:text-white" placeholder={t.agencies.modal.emailPlaceholder} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.agencies.modal.deposit}</label>
                    <input type="number" value={formData.depositPercentage} onChange={e => setFormData({...formData, depositPercentage: Number(e.target.value)})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none dark:text-white" />
                  </div>
                  <div className="flex items-center gap-2 pt-6">
                    <input type="checkbox" checked={formData.is24Hours} onChange={e => setFormData({...formData, is24Hours: e.target.checked})} className="size-5 accent-[#F76513]" />
                    <label className="text-[10px] font-black uppercase text-slate-500 italic">{t.agencies.modal.hours24}</label>
                  </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl font-black uppercase italic text-xs">{t.agencies.modal.cancel}</button>
              <button 
                  disabled={modalLoading}
                  className="flex-[2] py-5 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-sm shadow-xl shadow-orange-200 dark:shadow-none flex items-center justify-center gap-3 transition-transform hover:scale-[1.02]"
              >
                  {modalLoading ? <Loader2 className="animate-spin" /> : t.agencies.modal.submit}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon }: any) => (
  <div className="bg-white dark:bg-[#1a1d2d] p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 flex items-center gap-6 shadow-sm">
    <div className="size-14 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center text-primary italic shadow-inner">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1 italic">{label}</p>
      <p className="text-3xl font-[900] text-slate-900 dark:text-white uppercase italic leading-none">{value}</p>
    </div>
  </div>
);