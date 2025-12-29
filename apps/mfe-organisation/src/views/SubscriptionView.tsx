'use client';
import React, { useState, useEffect } from 'react';
import { 
  Zap, Check, Star, Clock, 
  Shield, LayoutGrid, Loader2, AlertCircle 
} from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';

export const SubscriptionView = ({ orgData, t }: any) => {
  const [plans, setPlans] = useState<any[]>([]);
  const [currentSub, setCurrentSub] = useState<any>(null);
  const [realAgenciesCount, setRealAgenciesCount] = useState(0); // Source de vérité pour le compteur
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadSubscriptionData();
  }, [orgData?.id]);

  const loadSubscriptionData = async () => {
    if (!orgData?.id) return;
    setLoading(true);
    try {
      // On récupère les plans, la souscription ET la liste réelle des agences pour le compteur
      const [plansRes, subRes, agenciesRes] = await Promise.all([
        orgService.getPlans(),
        orgService.getSubscription(orgData.id),
        orgService.getAgencies(orgData.id) // Pour corriger le bug du 0/1
      ]);
      
      if (plansRes.ok) setPlans(plansRes.data);
      if (subRes.ok) setCurrentSub(subRes.data);
      if (agenciesRes.ok) setRealAgenciesCount(agenciesRes.data?.length || 0);
      
    } catch (error) {
      console.error("Erreur de chargement des données de souscription", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlanChange = async (planName: string) => {
    if (!orgData?.id) return;
    
    const isCancellation = planName === 'FREE';
    if (isCancellation && !window.confirm(t.subscription.confirmCancel)) {
        return;
    }

    setActionLoading(planName);
    try {
      const res = await orgService.upgradePlan(orgData.id, planName as any);
      if (res.ok) {
        await loadSubscriptionData();
        alert(isCancellation 
            ? t.subscription.cancelSuccess 
            : `${t.subscription.upgradeSuccess}${planName}`
        );
      }
    } catch (error) {
      alert(t.subscription.errorChange);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64">
      <Loader2 className="animate-spin text-primary size-10" />
      <p className="text-[10px] font-black uppercase mt-4 text-slate-400 italic">{t.subscription.loadingCatalog}</p>
    </div>
  );

  const isFreePlan = currentSub?.planName === 'FREE';

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      
      {/* SECTION 1 : STATUT ACTUEL */}
      <section className="space-y-8">
        <h4 className="text-2xl font-[900] italic uppercase text-slate-900 dark:text-white flex items-center gap-3 tracking-tighter">
          <Shield className="text-primary" /> {t.subscription.statusTitle}
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Carte Plan Actuel */}
          <div className="lg:col-span-1 bg-primary rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <Zap size={200} className="absolute -bottom-10 -right-10 text-white/10 rotate-12" />
            <div className="relative z-10 space-y-6">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/30">
                {t.subscription.activePlanBadge}
              </span>
              <h3 className="text-5xl font-[900] italic uppercase tracking-tighter leading-none">
                {currentSub?.planName || "---"}
              </h3>
              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2 text-blue-100 text-[10px] font-bold uppercase italic">
                  <Clock size={14} /> {currentSub?.expiresAt ? t.subscription.expiresOn + new Date(currentSub.expiresAt).toLocaleDateString() : t.subscription.unlimited}
                </div>
              </div>
            </div>
          </div>

          {/* Jauge d'évolution des Quotas (Uniquement Agences) */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#1a1d2d] p-10 h-full rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-center">
                <div className="flex justify-between items-center mb-6 text-sm font-black uppercase italic">
                    <div className="flex items-center gap-4 text-primary tracking-[0.2em]">
                        <LayoutGrid size={24}/> {t.subscription.quotas.agencies}
                    </div>
                    {/* On utilise realAgenciesCount pour corriger le bug */}
                    <span className="text-slate-400 text-lg">{realAgenciesCount} / {currentSub?.maxAgencies || 1}</span>
                </div>
                <div className="h-4 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden border border-slate-100 dark:border-slate-700">
                    <div 
                        className={`h-full transition-all duration-1000 rounded-full ${ (realAgenciesCount / (currentSub?.maxAgencies || 1)) >= 0.85 ? 'bg-[#F76513]' : 'bg-primary'}`} 
                        style={{ width: `${Math.min((realAgenciesCount / (currentSub?.maxAgencies || 1)) * 100, 100)}%` }}
                    />
                </div>
                <p className="mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Utilisation réelle de vos points de vente sur le réseau Rental.
                </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : CATALOGUE */}
      <section className="space-y-10">
        <div className="text-center space-y-2">
          <h4 className="text-4xl font-[900] italic uppercase text-slate-900 dark:text-white tracking-tighter">{t.subscription.catalogTitle}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">{t.subscription.catalogSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const isCurrent = currentSub?.planName === plan.name;
            return (
              <div key={plan.id} className={`
                relative bg-white dark:bg-[#1a1d2d] p-10 rounded-[3.5rem] border-2 flex flex-col transition-all duration-500
                ${isCurrent ? 'border-primary shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}
              `}>
                {isCurrent && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full text-[9px] font-black uppercase italic shadow-xl">
                    {t.subscription.activePlanRibbon}
                  </div>
                )}
                <div className="mb-8">
                  <h5 className="text-2xl font-black uppercase italic text-slate-900 dark:text-white leading-none">{plan.name}</h5>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-2 tracking-widest">{plan.description}</p>
                </div>
                <div className="mb-10 flex items-baseline gap-1">
                  <span className="text-5xl font-[900] italic text-slate-900 dark:text-white tracking-tighter">{plan.price} XAF</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">{t.subscription.perMonth}</span>
                </div>
                <ul className="flex-1 space-y-4 mb-10">
                  <FeatureItem label={`${plan.maxAgencies} ${t.subscription.quotas.agencies}`} active={true} />
                  {/* On garde l'info dans la liste mais on a enlevé la carte de gestion */}
                  <FeatureItem label={`${plan.maxVehicles} Véhicules autorisés`} active={true} />
                  <FeatureItem label={t.subscription.quotas.geofencing} active={plan.hasGeofencing} />
                  <FeatureItem label={t.subscription.quotas.chat} active={plan.hasChat} />
                </ul>
                {!isCurrent ? (
                  <button 
                    onClick={() => handlePlanChange(plan.name)}
                    disabled={!!actionLoading}
                    className="w-full py-5 bg-primary text-white rounded-[2rem] font-black uppercase italic text-xs shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                  >
                    {actionLoading === plan.name ? <Loader2 className="animate-spin size-4" /> : t.subscription.subscribeBtn}
                  </button>
                ) : (
                  <div className="w-full py-5 rounded-[2rem] bg-slate-50 dark:bg-slate-800 text-slate-300 font-black uppercase italic text-xs text-center border border-slate-100 dark:border-slate-700">
                    {t.subscription.alreadyInUse}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 : ANNULATION */}
      {!isFreePlan && (
        <section className="bg-white dark:bg-[#1a1d2d] p-10 rounded-[3.5rem] border border-red-100 dark:border-red-900/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-6 text-center md:text-left">
            <div className="size-16 bg-red-50 dark:bg-red-950/30 rounded-3xl flex items-center justify-center text-red-500 shadow-inner shrink-0">
              <AlertCircle size={32} />
            </div>
            <div>
              <h5 className="text-xl font-black uppercase italic text-slate-900 dark:text-white tracking-tighter">{t.subscription.cancelTitle}</h5>
              <p className="text-[11px] font-medium text-slate-400 max-w-sm mt-1 uppercase tracking-widest leading-relaxed">
                {t.subscription.cancelWarning}
              </p>
            </div>
          </div>
          <button 
            onClick={() => handlePlanChange('FREE')}
            disabled={!!actionLoading}
            className="px-10 py-5 bg-white text-red-500 rounded-2xl font-black uppercase italic text-xs shadow-sm border border-red-100 hover:bg-red-500 hover:text-white transition-all shrink-0"
          >
            {actionLoading === 'FREE' ? <Loader2 className="animate-spin size-4" /> : t.subscription.cancelBtn}
          </button>
        </section>
      )}

    </div>
  );
};

const FeatureItem = ({ label, active }: { label: string, active: boolean }) => (
  <li className={`flex items-center gap-3 text-[9px] font-black uppercase tracking-widest ${active ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300 dark:text-slate-700'}`}>
    <div className={`size-5 rounded-full flex items-center justify-center ${active ? 'bg-green-100 text-green-600' : 'bg-slate-50 text-slate-400 opacity-50'}`}>
      {active ? <Check size={10} /> : <div className="size-1 bg-slate-300 rounded-full" />}
    </div>
    <span className={active ? '' : 'line-through opacity-40'}>{label}</span>
  </li>
);