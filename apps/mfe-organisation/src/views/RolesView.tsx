'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShieldCheck, Plus, Search, Edit3, Loader2, X, 
  Check, Lock, CheckSquare, Square, AlertCircle
} from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';

export const RolesView = ({ orgData, t }: { orgData: any, t: any }) => {
  const [postes, setPostes] = useState<any[]>([]);
  const [allPermissions, setAllPermissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPoste, setEditingPoste] = useState<any>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [backendError, setBackendError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissionIds: [] as string[]
  });

  useEffect(() => { loadInitialData(); }, [orgData?.id]);

  const loadInitialData = async () => {
    if (!orgData?.id) return;
    setLoading(true);
    try {
      const [postesRes, permsRes] = await Promise.all([
        orgService.getPostes(orgData.id),
        orgService.getPermissions()
      ]);
      if (postesRes.ok) setPostes(postesRes.data || []);
      if (permsRes.ok) setAllPermissions(permsRes.data || []);
    } finally { setLoading(false); }
  };

  const permissionsByModule = useMemo(() => {
    return allPermissions.reduce((acc: any, perm) => {
      const module = perm.module || 'AUTRE';
      if (!acc[module]) acc[module] = [];
      acc[module].push(perm);
      return acc;
    }, {});
  }, [allPermissions]);

  const isSystemRole = (poste: any) => {
    return poste.isSystem || poste.name.toUpperCase().includes('OWNER');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalLoading(true);
    setBackendError(null);
    try {
      const res = editingPoste 
        ? await orgService.updatePoste(editingPoste.id, formData)
        : await orgService.createPoste(orgData.id, formData);
      
      if (res.ok) {
        setIsModalOpen(false);
        setEditingPoste(null);
        loadInitialData();
      } else {
        setBackendError(res.data?.message || "Error");
      }
    } catch (error) {
      setBackendError("Network Error");
    } finally {
      setModalLoading(false);
    }
  };

  const openEdit = (poste: any) => {
    if (isSystemRole(poste)) return;
    setEditingPoste(poste);
    setBackendError(null);
    setFormData({
      name: poste.name,
      description: poste.description,
      permissionIds: poste.permissions.map((p: any) => p.id)
    });
    setIsModalOpen(true);
  };

  const togglePermission = (id: string) => {
    setFormData(prev => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(id) ? prev.permissionIds.filter(pid => pid !== id) : [...prev.permissionIds, id]
    }));
  };

  const toggleModuleGroup = (moduleName: string) => {
    const modulePermIds = permissionsByModule[moduleName].map((p: any) => p.id);
    const areAllSelected = modulePermIds.every((id: string) => formData.permissionIds.includes(id));
    if (areAllSelected) {
      setFormData(prev => ({ ...prev, permissionIds: prev.permissionIds.filter(id => !modulePermIds.includes(id)) }));
    } else {
      setFormData(prev => ({ ...prev, permissionIds: Array.from(new Set([...prev.permissionIds, ...modulePermIds])) }));
    }
  };

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary size-12" />
    </div>
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none tracking-tighter">{t.roles.title}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{t.roles.subtitle}</p>
        </div>
        <button 
          onClick={() => { setEditingPoste(null); setFormData({name:'', description:'', permissionIds:[]}); setIsModalOpen(true); setBackendError(null); }}
          className="w-full md:w-auto px-8 py-4 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-xs shadow-xl flex items-center justify-center gap-2"
        >
          <Plus size={18} /> {t.roles.createBtn}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {postes.map((poste) => {
          const system = isSystemRole(poste);
          return (
            <div key={poste.id} className={`bg-white dark:bg-[#1a1d2d] rounded-[3rem] p-8 border ${system ? 'border-blue-100 dark:border-blue-900/30' : 'border-slate-100 dark:border-slate-800'} shadow-sm hover:shadow-xl transition-all relative overflow-hidden`}>
              {system && (
                <div className="absolute top-0 right-0 bg-blue-600 text-white px-4 py-1 rounded-bl-2xl text-[8px] font-black uppercase tracking-widest italic">
                  {t.roles.systemBadge}
                </div>
              )}
              
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className={`size-14 rounded-2xl flex items-center justify-center ${system ? 'bg-blue-600 text-white' : 'bg-blue-50 dark:bg-slate-800 text-primary'}`}>
                    {system ? <Lock size={24} /> : <ShieldCheck size={28} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none">{poste.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{poste.permissions?.length || 0} {t.roles.privileges}</p>
                  </div>
                </div>
                
                {!system ? (
                  <button onClick={() => openEdit(poste)} className="p-3 hover:bg-blue-50 rounded-xl text-slate-300 hover:text-primary transition-colors">
                    <Edit3 size={20} />
                  </button>
                ) : (
                  <div className="p-3 text-slate-200">
                    <Lock size={20} />
                  </div>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed italic">{poste.description}</p>
              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-50 dark:border-slate-800">
                 {poste.permissions?.slice(0, 5).map((p: any) => (
                   <span key={p.id} className="px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-lg text-[8px] font-black uppercase text-slate-400 border border-slate-100 dark:border-slate-800 italic">
                      {p.name}
                   </span>
                 ))}
                 {poste.permissions?.length > 5 && (
                   <span className="text-[10px] font-black text-primary italic">+{poste.permissions.length - 5} {t.roles.others}</span>
                 )}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <form onSubmit={handleSubmit} className="relative w-full max-w-4xl bg-white dark:bg-[#1a1d2d] rounded-[3.5rem] p-10 shadow-2xl flex flex-col max-h-[90vh]">
            
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none tracking-tighter">
                    {editingPoste ? t.roles.modal.titleEdit : t.roles.modal.titleAdd}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full dark:text-white"><X size={24}/></button>
            </div>

            {backendError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in slide-in-from-top-2">
                    <AlertCircle size={20} />
                    <p className="text-xs font-black uppercase italic tracking-widest">{backendError}</p>
                </div>
            )}

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.roles.modal.name}</label>
                        <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#F76513] dark:text-white" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-slate-400 italic">{t.roles.modal.description}</label>
                        <input required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-bold outline-none focus:ring-2 focus:ring-[#F76513] dark:text-white" />
                    </div>
                </div>

                <div className="space-y-6">
                    <h4 className="text-sm font-black uppercase italic text-primary border-b pb-2 flex items-center gap-2">
                        <Lock size={16}/> {t.roles.modal.privilegesTitle}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.keys(permissionsByModule).map((module) => {
                            const modulePermIds = permissionsByModule[module].map((p: any) => p.id);
                            const isAllSelected = modulePermIds.every((id: string) => formData.permissionIds.includes(id));

                            return (
                                <div key={module} className="space-y-3">
                                    <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800">
                                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{module}</span>
                                        <button 
                                            type="button"
                                            onClick={() => toggleModuleGroup(module)}
                                            className={`flex items-center gap-2 text-[9px] font-black uppercase italic transition-colors ${isAllSelected ? 'text-[#F76513]' : 'text-primary'}`}
                                        >
                                            {isAllSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                                            {isAllSelected ? t.roles.modal.deselect : t.roles.modal.selectAll}
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {permissionsByModule[module].map((perm: any) => (
                                            <label key={perm.id} className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${formData.permissionIds.includes(perm.id) ? 'border-primary bg-blue-50/50 dark:bg-primary/10' : 'border-slate-50 dark:border-slate-800'}`}>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold text-slate-700 dark:text-white group-hover:text-primary">{perm.name}</p>
                                                    <p className="text-[9px] text-slate-400 italic">{perm.description}</p>
                                                </div>
                                                <input type="checkbox" className="hidden" checked={formData.permissionIds.includes(perm.id)} onChange={() => togglePermission(perm.id)} />
                                                <div className={`size-5 rounded-lg border-2 flex items-center justify-center ${formData.permissionIds.includes(perm.id) ? 'bg-primary border-primary text-white' : 'border-slate-200'}`}>
                                                    {formData.permissionIds.includes(perm.id) && <Check size={12} strokeWidth={4} />}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="pt-8 shrink-0">
                <button 
                    disabled={modalLoading}
                    className="w-full py-6 bg-[#F76513] text-white rounded-[2rem] font-[900] uppercase italic text-sm shadow-xl shadow-orange-200 dark:shadow-none flex items-center justify-center gap-3 transition-transform hover:scale-[1.01]"
                >
                    {modalLoading ? <Loader2 className="animate-spin" /> : (editingPoste ? t.roles.modal.submitEdit : t.roles.modal.submitAdd)}
                </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};