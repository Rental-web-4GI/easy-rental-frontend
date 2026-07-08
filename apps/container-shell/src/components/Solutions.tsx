import React from 'react';
import { ArrowRight, Building2, Store, Car, Sparkles } from 'lucide-react';
import { MFE_URLS } from '../config/mfe-urls';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Solutions = ({ t }: any) => {
  const cards = [
    {
      icon: Building2,
      gradient: 'from-blue-600 to-indigo-700',
      image: '/images/solutions/organisation.png',
      label: 'HQ View',
      title: t.org,
      desc: t.orgDesc,
      highlight: t.orgHighlight,
      url: MFE_URLS.organisation,
    },
    {
      icon: Store,
      gradient: 'from-orange-500 to-amber-600',
      label: 'Manager View',
      title: t.agency,
      desc: t.agencyDesc,
      highlight: t.agencyHighlight,
      url: MFE_URLS.agency,
    },
    {
      icon: Car,
      gradient: 'from-emerald-500 to-teal-600',
      image: '/images/solutions/client.png',
      label: 'User App',
      title: t.client,
      desc: t.clientDesc,
      highlight: t.clientHighlight,
      url: MFE_URLS.client,
    },
  ];

  return (
    <section id="solutions" className="py-16 md:py-20 max-w-7xl mx-auto px-6 scroll-mt-24">
      <div className="text-center mb-10 md:mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-4">
          <Sparkles size={12} /> {t.subtitle}
        </div>
        <h2 className="text-3xl md:text-5xl font-[900] italic tracking-tighter text-slate-900 dark:text-white">
          {t.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="group relative flex flex-col rounded-[2rem] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300"
            >
              <div className="h-44 rounded-[1.5rem] relative overflow-hidden">
                {item.image ? (
                  <>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent transition-opacity duration-300 group-hover:from-slate-900/60" />
                    <span className="absolute top-6 left-6 z-10 inline-flex w-fit px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase backdrop-blur-sm">
                      {item.label}
                    </span>
                  </>
                ) : (
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between transition-transform duration-500 ease-out group-hover:scale-110`}>
                    <span className="inline-flex w-fit px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase backdrop-blur-sm">
                      {item.label}
                    </span>
                    <Icon size={48} className="text-white/30 absolute -bottom-2 -right-2" strokeWidth={1.5} />
                    <Icon size={28} className="text-white" />
                  </div>
                )}
              </div>

              <h3 className="mt-5 text-xl font-black italic uppercase text-slate-900 dark:text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-1">{item.desc}</p>
              <p className="mt-3 text-[10px] font-black uppercase tracking-wider text-blue-600">{item.highlight}</p>

              <button
                type="button"
                onClick={() => { window.location.href = item.url; }}
                className="mt-5 w-full py-3.5 rounded-2xl font-black text-xs uppercase italic flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100 dark:bg-slate-800 text-[#0528d6] group-hover:bg-[#0528d6] group-hover:text-white"
              >
                {t.cta} <ArrowRight size={14} />
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
