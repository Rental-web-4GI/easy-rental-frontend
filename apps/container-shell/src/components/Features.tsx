import React from 'react';
import { WifiOff, MapPin, Receipt, Zap, CheckCircle2 } from 'lucide-react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Features = ({ t }: any) => {
  const items = [
    { icon: WifiOff, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', title: t.f1, desc: t.f1d },
    { icon: MapPin, color: 'text-orange-500', bg: 'bg-orange-50 dark:bg-orange-900/20', title: t.f2, desc: t.f2d },
    { icon: Receipt, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', title: t.f3, desc: t.f3d },
    { icon: Zap, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20', title: t.f4, desc: t.f4d },
  ];

  return (
    <section id="features" className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900/50 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-2 lg:sticky lg:top-28">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600 mb-3">Pourquoi Easy Rental</p>
            <h2 className="text-3xl md:text-5xl font-[900] italic leading-[0.95] tracking-tighter text-slate-900 dark:text-white mb-5">
              {t.title.split(' ').slice(0, -2).join(' ')} <br />
              <span className="text-blue-600">{t.title.split(' ').slice(-2).join(' ')}</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{t.desc}</p>
            <ul className="space-y-2 text-sm font-bold text-slate-600 dark:text-slate-300">
              {['Sans installation lourde', 'Paiement Mobile Money en agence', 'Multi-profils B2B2C'].map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" /> {line}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {items.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="bg-white dark:bg-slate-800 p-5 rounded-[1.75rem] border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-4`}>
                    <Icon className={f.color} size={22} />
                  </div>
                  <h4 className="text-base font-black italic uppercase text-slate-900 dark:text-white mb-2">{f.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
