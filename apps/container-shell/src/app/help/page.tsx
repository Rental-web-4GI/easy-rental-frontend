'use client';

import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle } from 'lucide-react';
import { supportService } from '@pwa-easy-rental/shared-services';

const faqData = [
  {
    category: 'Réservation & Location',
    items: [
      { q: 'Comment réserver un véhicule ?', a: 'Créez un compte client, parcourez le catalogue, choisissez vos dates et confirmez. L\'acompte se règle en agence.' },
      { q: 'Puis-je modifier ma réservation ?', a: 'Oui, jusqu\'à 24h avant le départ via votre espace client ou en contactant l\'agence.' },
    ],
  },
  {
    category: 'Paiement & Tarifs',
    items: [
      { q: 'Quels moyens de paiement ?', a: 'Mobile Money (Orange/MTN), espèces et carte en agence.' },
      { q: 'La caution est-elle remboursable ?', a: 'Oui, sous 48h après restitution du véhicule sans dommage constaté.' },
    ],
  },
  {
    category: 'Assistance',
    items: [
      { q: 'Comment contacter le support ?', a: 'Utilisez le chat en bas à droite ou écrivez-nous par email. Un administrateur vous répondra dans votre messagerie.' },
      { q: 'Que faire en cas de panne ?', a: 'Contactez l\'agence via la fiche de votre location ou notre support.' },
    ],
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [adminEmail, setAdminEmail] = useState('support@easyrental.local');

  useEffect(() => {
    supportService.getConfig().then((res) => {
      if (res.ok && res.data?.adminEmail) {
        setAdminEmail(res.data.adminEmail);
      }
    });
  }, []);

  const openChat = () => {
    window.dispatchEvent(new CustomEvent('support:open-chat'));
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0f1323] text-slate-800 dark:text-slate-200">
      <section className="bg-gradient-to-br from-[#0528d6] to-indigo-800 py-10 md:py-12 px-4 text-center">
        <h1 className="text-2xl md:text-4xl font-black uppercase italic text-white mb-4">
          Comment pouvons-nous vous aider ?
        </h1>
        <div className="max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Rechercher (annulation, paiement, chauffeur…)"
            className="w-full py-3 pl-11 pr-4 rounded-2xl shadow-lg outline-none text-slate-700 text-sm"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-8 md:py-10">
        <h2 className="text-xl font-black uppercase italic text-center mb-6">Questions fréquentes</h2>
        <div className="space-y-3">
          {faqData.map((cat, catIdx) => (
            <div key={cat.category}>
              <h3 className="text-orange-500 font-black text-xs uppercase tracking-wider mb-2 mt-4">{cat.category}</h3>
              {cat.items.map((item, itemIdx) => {
                const id = `${catIdx}-${itemIdx}`;
                const isOpen = openIndex === id;
                return (
                  <div key={id} className="bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden mb-2">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : id)}
                      className="w-full flex justify-between items-center p-4 text-left font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      {item.q}
                      {isOpen ? <ChevronUp size={18} className="text-[#0528d6]" /> : <ChevronDown size={18} className="text-slate-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white py-8 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-lg font-black uppercase italic mb-5">Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-sm text-slate-300 mb-5 italic">
            Écrivez-nous via le chat — consultez ensuite votre messagerie pour la réponse de l&apos;administrateur.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button
              type="button"
              onClick={openChat}
              className="flex items-center justify-center gap-2 bg-[#0528d6] hover:bg-blue-700 px-5 py-3 rounded-xl text-sm font-black uppercase"
            >
              <MessageCircle size={18} /> Messagerie support
            </button>
            <a
              href={`mailto:${adminEmail}?subject=${encodeURIComponent('Support Easy Rental')}`}
              className="flex items-center justify-center gap-2 bg-white text-slate-900 hover:bg-gray-100 px-5 py-3 rounded-xl text-sm font-black uppercase"
            >
              <Mail size={18} /> {adminEmail}
            </a>
            <a href="tel:+237600000000" className="flex items-center justify-center gap-2 border border-slate-600 hover:border-white px-5 py-3 rounded-xl text-sm font-bold">
              <Phone size={18} /> +237 600 000 000
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
