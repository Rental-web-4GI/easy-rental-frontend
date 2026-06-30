/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { Bell, Check, Clock, Info, AlertTriangle, Loader2, Search } from 'lucide-react';
import {
  notifService,
  formatNotificationDate,
  formatNotificationReason,
  isNotificationRead,
  dispatchNotificationsRefresh,
} from '@pwa-easy-rental/shared-services';

export const NotificationsView = ({ agencyId, t }: { agencyId: string; t: any }) => {
  const [notifs, setNotifs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'UNREAD' | 'ALERTS'>('ALL');

  const loadNotifs = async (silent = false) => {
    if (!agencyId) return;
    if (!silent) setLoading(true);
    try {
      const res = await notifService.getAgencyNotifications(agencyId);
      if (res.ok) setNotifs(res.data || []);
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifs();
    const interval = setInterval(() => loadNotifs(true), 15000);
    return () => clearInterval(interval);
  }, [agencyId]);

  const handleMarkRead = async (id: string) => {
    const res = await notifService.markAsReadAgency(id);
    if (res.ok) {
      await loadNotifs(true);
      dispatchNotificationsRefresh('AGENCY');
    }
  };

  const unreadCount = notifs.filter((n) => !isNotificationRead(n, 'AGENCY')).length;

  const filteredNotifs = useMemo(() => {
    return notifs.filter((n) => {
      const matchesSearch =
        n.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.reason?.toLowerCase().includes(searchTerm.toLowerCase());
      const read = isNotificationRead(n, 'AGENCY');
      const matchesFilter =
        filterType === 'ALL' ? true : filterType === 'UNREAD' ? !read : n.reason?.includes('ALERT');
      return matchesSearch && matchesFilter;
    });
  }, [notifs, searchTerm, filterType]);

  if (loading && notifs.length === 0)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0528d6]" size={40} />
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500 text-left pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-2">
        <div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
            {t.header.notifications}
          </h2>
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[10px] font-black uppercase px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full border dark:border-slate-700 italic">
              Total: {notifs.length}
            </span>
            <span className="text-[10px] font-black uppercase px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-[#0528d6] rounded-full border border-blue-100 dark:border-blue-800 italic">
              Non lues: {unreadCount}
            </span>
          </div>
          <p className="text-[9px] text-slate-400 font-bold italic mt-2">
            Historique conservé en base — vos lectures ici sont indépendantes de la console organisation.
          </p>
        </div>
        <button
          onClick={() => loadNotifs(false)}
          className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:text-[#0528d6] transition-all border dark:border-slate-800"
        >
          <Clock size={20} />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-4 bg-white dark:bg-[#1a1d2d] p-4 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-full lg:w-auto shrink-0">
          {['ALL', 'UNREAD', 'ALERTS'].map((id) => (
            <button
              key={id}
              onClick={() => setFilterType(id as any)}
              className={`flex-1 lg:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase italic transition-all ${filterType === id ? 'bg-white dark:bg-slate-800 text-[#0528d6] shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {id === 'ALL' ? t.common.all : id === 'UNREAD' ? 'Non lues' : 'Alertes'}
            </button>
          ))}
        </div>
        <div className="relative w-full group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0528d6]"
            size={18}
          />
          <input
            placeholder={t.header.search}
            className="w-full pl-12 pr-6 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl text-sm font-bold italic outline-none focus:ring-2 focus:ring-[#0528d6]/20 dark:text-white transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotifs.length === 0 ? (
          <div className="p-20 text-center bg-white dark:bg-[#1a1d2d] rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-800 shadow-inner">
            <Bell className="mx-auto text-slate-200 dark:text-slate-800 mb-4" size={48} />
            <p className="text-slate-400 font-black uppercase italic tracking-widest">{t.common.noData}</p>
          </div>
        ) : (
          filteredNotifs.map((n) => {
            const read = isNotificationRead(n, 'AGENCY');
            return (
              <div
                key={n.id}
                className={`p-6 rounded-[2.5rem] border transition-all flex items-start gap-5 ${
                  read
                    ? 'bg-white/50 dark:bg-[#1a1d2d]/50 border-slate-100 dark:border-slate-800 opacity-80'
                    : 'bg-white dark:bg-[#1a1d2d] border-blue-100 dark:border-blue-900 shadow-md border-l-4 border-l-[#0528d6]'
                }`}
              >
                <div
                  className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${
                    n.reason?.includes('ALERT') ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-[#0528d6]'
                  }`}
                >
                  {n.reason?.includes('ALERT') ? <AlertTriangle size={20} /> : <Info size={20} />}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2 gap-3">
                    <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs italic tracking-tighter">
                      {formatNotificationReason(n.reason)}
                    </h4>
                    <span className="text-[9px] font-black text-slate-400 uppercase italic shrink-0">
                      {formatNotificationDate(n.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-4">
                    {n.details}
                  </p>
                  <div className="flex items-center gap-4 flex-wrap">
                    {read ? (
                      <span className="text-[9px] font-black uppercase px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 italic flex items-center gap-1">
                        <Check size={10} /> Lu (agence)
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkRead(n.id)}
                        className="text-[9px] font-black uppercase text-[#0528d6] flex items-center gap-1.5 hover:underline italic px-3 py-1 bg-blue-50 rounded-full"
                      >
                        <Check size={12} /> Marquer comme lu
                      </button>
                    )}
                    {n.locationId && (
                      <div className="px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg text-[8px] font-black text-slate-500 uppercase italic tracking-widest">
                        Dossier: #{n.locationId.substring(0, 8)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
