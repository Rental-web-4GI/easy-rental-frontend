'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2, Mail } from 'lucide-react';
import { supportService } from '@pwa-easy-rental/shared-services';

const THREAD_KEY = 'easyrental_support_thread_id';
const EMAIL_KEY = 'easyrental_support_email';

type ChatMessage = {
  id: string;
  from: 'user' | 'admin' | 'system';
  text: string;
  time: string;
};

function formatTime(value?: string | null) {
  if (!value) {
    return new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  return new Date(value).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
}

export function SupportChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [adminEmail, setAdminEmail] = useState('support@easyrental.local');
  const [threadId, setThreadId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedThread = localStorage.getItem(THREAD_KEY);
    const storedEmail = localStorage.getItem(EMAIL_KEY);
    if (storedThread) setThreadId(storedThread);
    if (storedEmail) setEmail(storedEmail);

    supportService.getConfig().then((res) => {
      if (res.ok && res.data?.adminEmail) {
        setAdminEmail(res.data.adminEmail);
      }
    });
  }, []);

  const loadMessages = async (id: string) => {
    setLoading(true);
    const res = await supportService.getThreadMessages(id);
    if (res.ok && Array.isArray(res.data)) {
      setMessages(
        res.data.map((msg) => ({
          id: msg.id,
          from: msg.senderRole === 'ADMIN' ? 'admin' : 'user',
          text: msg.body,
          time: formatTime(msg.createdAt),
        })),
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (open && threadId) {
      loadMessages(threadId);
    }
  }, [open, threadId]);

  useEffect(() => {
    const openHandler = () => setOpen(true);
    window.addEventListener('support:open-chat', openHandler);
    return () => window.removeEventListener('support:open-chat', openHandler);
  }, []);

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const text = input.trim();
    const visitorEmail = email.trim();
    if (!text || !visitorEmail || sending) return;

    setSending(true);
    const res = await supportService.sendMessage({
      threadId: threadId ?? undefined,
      email: visitorEmail,
      body: text,
    });

    if (res.ok && res.data) {
      localStorage.setItem(EMAIL_KEY, visitorEmail);
      if (res.data.threadId) {
        localStorage.setItem(THREAD_KEY, res.data.threadId);
        setThreadId(res.data.threadId);
        await loadMessages(res.data.threadId);
      }
      setMessages((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          from: 'system',
          text: res.data?.confirmationMessage ?? 'Consultez votre messagerie pour la réponse.',
          time: formatTime(),
        },
      ]);
      setInput('');
    }
    setSending(false);
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-[500] size-14 rounded-2xl bg-[#0528d6] text-white shadow-2xl shadow-blue-600/30 flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Ouvrir le chat support"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {open && (
        <button
          type="button"
          aria-label="Fermer le chat"
          className="fixed inset-0 z-[550] bg-slate-900/20 backdrop-blur-[1px]"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 right-0 z-[560] h-full w-full max-w-[400px] bg-white dark:bg-[#1a1d2d] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!open}
      >
        <header className="shrink-0 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-[#0528d6] text-white flex items-center justify-between">
          <div>
            <p className="text-sm font-black uppercase italic tracking-tight">Chat support</p>
            <p className="text-[10px] opacity-80 mt-0.5">Messagerie Easy Rental</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="p-2 rounded-xl hover:bg-white/15 transition-colors"
            aria-label="Fermer"
          >
            <X size={20} />
          </button>
        </header>

        {!threadId && (
          <div className="px-4 pt-4">
            <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Votre email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm"
            />
          </div>
        )}

        <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-3">
          {loading && (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin text-[#0528d6] size-6" />
            </div>
          )}
          {!loading && messages.length === 0 && (
            <p className="text-xs text-slate-400 italic text-center py-6">
              Bonjour ! Écrivez votre message — un administrateur vous répondra par messagerie.
            </p>
          )}
          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.from === 'user'
                  ? 'flex flex-col items-end'
                  : m.from === 'system'
                    ? 'flex flex-col items-center'
                    : 'flex flex-col items-start'
              }
            >
              <div
                className={`max-w-[90%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  m.from === 'user'
                    ? 'bg-[#0528d6] text-white rounded-br-md'
                    : m.from === 'system'
                      ? 'bg-blue-50 dark:bg-blue-950/30 text-[#0528d6] text-xs italic text-center'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-md'
                }`}
              >
                {m.text}
              </div>
              {m.from !== 'system' && (
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              )}
            </div>
          ))}
        </div>

        <footer className="shrink-0 border-t border-slate-100 dark:border-slate-800 p-4 space-y-3 bg-slate-50/80 dark:bg-slate-900/50">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Écrivez votre message…"
              className="flex-1 px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 outline-none text-sm focus:ring-2 focus:ring-[#0528d6]/30"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={sending || !input.trim() || !email.trim()}
              className="px-4 py-3 rounded-xl bg-[#0528d6] text-white disabled:opacity-40 hover:bg-blue-700 transition-colors"
              aria-label="Envoyer"
            >
              {sending ? <Loader2 className="animate-spin size-4" /> : <Send size={16} />}
            </button>
          </div>
          <a
            href={`mailto:${adminEmail}?subject=${encodeURIComponent('Support Easy Rental')}`}
            className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 hover:text-[#0528d6] uppercase tracking-wide"
          >
            <Mail size={12} /> {adminEmail}
          </a>
        </footer>
      </aside>
    </>
  );
}
