'use client';
import React, { useEffect, useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { adminService } from '@pwa-easy-rental/shared-services';
import type { SupportMessage, SupportThread } from '@pwa-easy-rental/shared-services';

export const SupportInboxView = ({ onActivityChange }: { onActivityChange?: () => void }) => {
  const [threads, setThreads] = useState<SupportThread[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const loadThreads = async () => {
    setLoading(true);
    const res = await adminService.getSupportThreads();
    if (res.ok && Array.isArray(res.data)) {
      setThreads(res.data);
      if (!selectedId && res.data.length > 0) {
        setSelectedId(res.data[0].id);
      }
    }
    setLoading(false);
  };

  const loadMessages = async (threadId: string) => {
    const res = await adminService.getSupportMessages(threadId);
    if (res.ok && Array.isArray(res.data)) {
      setMessages(res.data);
    }
  };

  useEffect(() => {
    loadThreads();
  }, []);

  useEffect(() => {
    if (selectedId) {
      loadMessages(selectedId);
    }
  }, [selectedId]);

  const handleReply = async () => {
    if (!selectedId || !reply.trim() || sending) return;
    setSending(true);
    const res = await adminService.replyToSupportThread(selectedId, reply.trim());
    if (res.ok) {
      setReply('');
      await loadMessages(selectedId);
      await loadThreads();
      onActivityChange?.();
    }
    setSending(false);
  };

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center">
        <Loader2 className="animate-spin text-[#0528d6] size-8" />
      </div>
    );
  }

  const selected = threads.find((thread) => thread.id === selectedId);

  return (
    <section className="space-y-4">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">
        Conversations visiteurs et clients — répondez depuis la plateforme
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-[520px]">
        <div className="lg:col-span-1 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-[#1a1d2d] shadow-sm">
          {threads.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setSelectedId(thread.id)}
              className={`w-full text-left p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/40 ${
                selectedId === thread.id ? 'bg-blue-50 dark:bg-blue-950/20' : ''
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-sm text-slate-800 dark:text-white truncate">
                  {thread.visitorEmail}
                </p>
                {thread.adminUnreadCount > 0 && (
                  <span className="shrink-0 size-5 rounded-full bg-[#F76513] text-white text-[10px] font-black flex items-center justify-center">
                    {thread.adminUnreadCount}
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                {thread.lastMessageAt
                  ? new Date(thread.lastMessageAt).toLocaleString('fr-FR')
                  : '—'}
              </p>
            </button>
          ))}
          {threads.length === 0 && (
            <p className="p-6 text-sm text-slate-400 italic text-center">Aucun message pour le moment.</p>
          )}
        </div>

        <div className="lg:col-span-2 border border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-[#1a1d2d] flex flex-col shadow-sm min-h-[520px]">
          {selected ? (
            <>
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <p className="font-black text-slate-900 dark:text-white italic">{selected.visitorEmail}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                  {selected.subject ?? 'Support Easy Rental'}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={msg.senderRole === 'ADMIN' ? 'flex justify-end' : 'flex justify-start'}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.senderRole === 'ADMIN'
                          ? 'bg-[#0528d6] text-white rounded-br-md shadow-md shadow-blue-600/20'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-md'
                      }`}
                    >
                      {msg.body}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex gap-2 bg-white dark:bg-[#1a1d2d]">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleReply(); } }}
                  placeholder="Répondre au client…"
                  className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm outline-none focus:border-[#0528d6]"
                />
                <button
                  type="button"
                  onClick={handleReply}
                  disabled={sending || !reply.trim()}
                  className="px-5 py-3 rounded-xl bg-[#0528d6] text-white disabled:opacity-40 shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all"
                >
                  {sending ? <Loader2 className="animate-spin size-4" /> : <Send size={16} />}
                </button>
              </div>
            </>
          ) : (
            <p className="p-8 text-sm text-slate-400 italic text-center">Sélectionnez une conversation.</p>
          )}
        </div>
      </div>
    </section>
  );
};
