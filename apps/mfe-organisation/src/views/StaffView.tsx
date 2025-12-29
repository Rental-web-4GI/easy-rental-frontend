'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Plus, Search, Filter, Mail, Phone, 
  MapPin, Briefcase, Trash2, Edit3, Loader2, 
  X, ChevronRight, UserCheck, Shield, Calendar, Info,
  Store
} from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';

export const StaffView = ({ orgData, t }: { orgData: any, t: any }) => {
  const [staffList, setStaffList] = useState<any[]>([]);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [postes, setPostes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null); 
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);

  const [formData, setFormData] = useState({
    userEmail: '',
    agencyId: '',
    posteId: '',
    status: 'ACTIVE'
  });

  useEffect(() => { loadData(); }, [orgData?.id]);

  const loadData = async () => {
    if (!orgData?.id) return;
    setLoading(true);
    try {
      const [staffRes, agRes, postRes] = await Promise.all([
        orgService.getStaffByOrg(orgData.id),
        orgService.getAgencies(orgData.id),
        orgService.getPostes(orgData.id)
      ]);
      if (staffRes.ok) setStaffList(staffRes.data || []);
      if (agRes.ok) setAgencies(agRes.data || []);
      if (postRes.ok) setPostes(postRes.data || []);
    } finally { setLoading(false); }
  };

  const filteredStaff = useMemo(() => {
    return staffList.filter(s => {
      const matchSearch = s.user?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchAgency = selectedAgency === 'all' || s.agencyId === selectedAgency;
      return matchSearch && matchAgency;
    });
  }, [staffList, searchTerm, selectedAgency]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    try {
      const res = editingStaff 
        ? await orgService.updateStaff(editingStaff.staffId, {
            agencyId: formData.agencyId,
            posteId: formData.posteId,
            status: formData.status
          })
        : await orgService.addStaff(orgData.id, {
            userEmail: formData.userEmail,
            agencyId: formData.agencyId,
            posteId: formData.posteId
          });
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingStaff(null);
        setFormData({ userEmail: '', agencyId: '', posteId: '', status: 'ACTIVE' });
        loadData();
      } else {
        alert(res.data?.message || "Error");
      }
    } finally { setModalLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm(t.staff.deleteConfirm)) {
      const res = await orgService.deleteStaff(id);
      if (res.ok) loadData();
    }
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary size-12" />
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label={t.staff.stats.total} value={staffList.length} icon={<Users />} />
        <StatCard label={t.staff.stats.agencies} value={new Set(staffList.map(s => s.agencyId)).size} icon={<MapPin />} />
        <StatCard label={t.staff.stats.activeRoles} value={postes.length} icon={<Shield className="text-green-500" />} />
      </div>

      <div className="flex flex-col lg:flex-row justify-between gap-6">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              placeholder={t.staff.searchPlaceholder}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-slate-800 border-none rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-[#F76513] font-bold text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="bg-white dark:bg-slate-800 border-none rounded-2xl px-6 py-4 text-xs font-black uppercase italic shadow-sm outline-none focus:ring-2 focus:ring-primary"
            value={selectedAgency}
            onChange={(e) => setSelectedAgency(e.target.value)}
          >
            <option value="all">{t.staff.allAgencies}</option>
            {agencies.map(ag => <option key={ag.id} value={ag.id}>{ag.name}</option>)}
          </select>
        </div>
        <button 
          onClick={() => { setEditingStaff(null); setIsModalOpen(true); }}
          className="px-8 py-4 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-xs shadow-xl flex items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <Plus size={18} /> {t.staff.addBtn}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredStaff.map((staff) => (
          <div key={staff.staffId} className="bg-white dark:bg-[#1a1d2d] rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[8px] font-black uppercase italic ${staff.status === 'ACTIVE' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
              {staff.status}
            </div>

            <div className="flex flex-col items-center text-center mb-6">
                <div className="size-20 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-primary font-[900] text-2xl mb-4 border-2 border-white dark:border-slate-700 shadow-md">
                    {staff.user?.firstname?.charAt(0)}{staff.user?.lastname?.charAt(0)}
                </div>
                <h4 className="text-xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none">{staff.user?.fullname}</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 flex items-center gap-1">
                    <Shield size={12} className="text-primary"/> {staff.poste?.name || t.staff.noPoste}
                </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-slate-50 dark:border-slate-800">
                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                    <Mail size={14} className="text-primary opacity-50"/> {staff.user?.email}
                </div>
                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500">
                    <Store size={14} className="text-primary opacity-50"/> {agencies.find(a => a.id === staff.agencyId)?.name || 'N/A'}
                </div>
            </div>

            <div className="mt-8 flex gap-2">
                <button 
                  onClick={() => setSelectedStaff(staff)}
                  className="flex-1 py-3 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded-xl font-black uppercase italic text-[9px] hover:bg-primary hover:text-white transition-all"
                >
                    {t.staff.viewProfile}
                </button>
                <div className="flex gap-1">
                    <button onClick={() => { setEditingStaff(staff); setFormData({userEmail: staff.user.email, agencyId: staff.agencyId, posteId: staff.poste?.id, status: staff.status}); setIsModalOpen(true); }} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-300 hover:text-primary rounded-xl transition-colors"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(staff.staffId)} className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-300 hover:text-red-500 rounded-xl transition-colors"><Trash2 size={16}/></button>
                </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-slate-900/60">
          <form onSubmit={handleSubmit} className="relative w-full max-w-xl bg-white dark:bg-[#1a1d2d] rounded-[3.5rem] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h3 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white mb-8">
                {editingStaff ? t.staff.modal.titleEdit : t.staff.modal.titleAdd}
            </h3>

            <div className="space-y-6">
              {!editingStaff && (
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.staff.modal.emailLabel}</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-slate-300" size={18} />
                        <input required type="email" value={formData.userEmail} onChange={e => setFormData({...formData, userEmail: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold border-none dark:text-white pl-12" />
                    </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.staff.modal.agencyLabel}</label>
                    <select required value={formData.agencyId} onChange={e => setFormData({...formData, agencyId: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-primary dark:text-white">
                        <option value="">{t.staff.modal.selectPlaceholder}</option>
                        {agencies.map(ag => <option key={ag.id} value={ag.id}>{ag.name}</option>)}
                    </select>
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.staff.modal.posteLabel}</label>
                    <select required value={formData.posteId} onChange={e => setFormData({...formData, posteId: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-primary dark:text-white">
                        <option value="">{t.staff.modal.selectPlaceholder}</option>
                        {postes.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
              </div>

              {editingStaff && (
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.staff.modal.statusLabel}</label>
                    <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold border-none outline-none focus:ring-2 focus:ring-primary dark:text-white">
                        <option value="ACTIVE">{t.staff.modal.statusActive}</option>
                        <option value="SUSPENDED">{t.staff.modal.statusSuspended}</option>
                    </select>
                </div>
              )}
            </div>

            <div className="mt-10 flex gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-2xl font-black uppercase italic text-xs">{t.staff.modal.cancel}</button>
                <button disabled={modalLoading} className="flex-[2] py-5 bg-[#F76513] text-white rounded-2xl font-black uppercase italic text-sm shadow-xl shadow-orange-200">
                    {modalLoading ? <Loader2 className="animate-spin" /> : t.staff.modal.submit}
                </button>
            </div>
          </form>
        </div>
      )}

      {selectedStaff && (
        <div className="fixed inset-0 z-[110] flex items-center justify-end">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedStaff(null)} />
            <div className="relative w-full max-w-md h-full bg-white dark:bg-[#0f1323] shadow-2xl animate-in slide-in-from-right duration-500 p-10 overflow-y-auto">
                <button onClick={() => setSelectedStaff(null)} className="absolute top-8 right-8 p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400"><X size={20}/></button>
                
                <div className="flex flex-col items-center mt-10">
                    <div className="size-32 rounded-[3rem] bg-blue-600 text-white flex items-center justify-center text-4xl font-black italic shadow-2xl mb-6">
                        {selectedStaff.user?.firstname?.charAt(0)}
                    </div>
                    <h3 className="text-3xl font-[900] uppercase italic text-slate-900 dark:text-white text-center leading-none">
                        {selectedStaff.user?.fullname}
                    </h3>
                    <p className="text-[10px] font-black uppercase text-blue-600 tracking-[0.3em] mt-3">
                        {selectedStaff.poste?.name}
                    </p>
                </div>

                <div className="mt-12 space-y-8">
                    <ProfileItem icon={<Mail className="text-primary"/>} label={t.staff.profile.email} value={selectedStaff.user?.email} />
                    <ProfileItem icon={<Store className="text-primary"/>} label={t.staff.profile.agency} value={agencies.find(a => a.id === selectedStaff.agencyId)?.name} />
                    <ProfileItem icon={<UserCheck className="text-primary"/>} label={t.staff.profile.id} value={`#STF-${selectedStaff.staffId.substring(0, 8)}`} />
                    
                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                        <p className="text-[9px] font-black uppercase text-slate-400 mb-4 flex items-center gap-2"><Shield size={14}/> {t.staff.profile.privileges}</p>
                        <div className="flex flex-wrap gap-2">
                            {selectedStaff.poste?.permissions?.map((p: any) => (
                                <span key={p.id} className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-[8px] font-black uppercase text-slate-500 border border-slate-100 dark:border-slate-700 italic">
                                    {p.tag}
                                </span>
                            )) || <span className="text-[10px] italic text-slate-400 font-bold">{t.staff.profile.noPrivileges}</span>}
                        </div>
                    </div>
                </div>

                <button 
                  onClick={() => { setEditingStaff(selectedStaff); setFormData({userEmail: selectedStaff.user.email, agencyId: selectedStaff.agencyId, posteId: selectedStaff.poste?.id, status: selectedStaff.status}); setIsModalOpen(true); setSelectedStaff(null); }}
                  className="w-full mt-12 py-5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl font-black uppercase italic text-xs text-slate-400 hover:border-primary hover:text-primary transition-all"
                >
                    {t.staff.profile.editContract}
                </button>
            </div>
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

const ProfileItem = ({ icon, label, value }: any) => (
    <div className="flex items-center gap-4">
        <div className="size-10 bg-blue-50 dark:bg-slate-800 rounded-xl flex items-center justify-center">{icon}</div>
        <div>
            <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest">{label}</p>
            <p className="text-sm font-bold dark:text-white">{value || '---'}</p>
        </div>
    </div>
);