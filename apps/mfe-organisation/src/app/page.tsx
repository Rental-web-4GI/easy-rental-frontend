'use client';
import React, { useState, useEffect } from 'react';
import { authService, orgService } from '@pwa-easy-rental/shared-services';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { DashboardView } from '../views/DashboardView';
import { AgenciesView } from '../views/AgenciesView';
import { RolesView } from '../views/RolesView';
import { SubscriptionView } from '../views/SubscriptionView';
import { OnboardingStepper } from '../components/OnboardingStepper';
import { StaffView } from '../views/StaffView';
import { 
  Loader2, Mail, Lock, User, Building, 
  ArrowRight, Sparkles, ShieldCheck, Globe 
} from 'lucide-react';

import { fr } from '../locales/fr';
import { en } from '../locales/en';

export default function OrganisationDashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [currentView, setCurrentView] = useState<any>('DASHBOARD');
  
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const [orgData, setOrgData] = useState<any>(null);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [subscription, setSubscription] = useState<any>(null);

  const [isSignUp, setIsSignUp] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authForm, setAuthForm] = useState({ firstname: '', lastname: '', email: '', password: '', orgName: '' });

  const t = lang === 'FR' ? fr : en;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

    const token = localStorage.getItem('auth_token');
    if (token) fetchProfile();
    else setIsLoading(false);

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  /**
   * RÉCUPÉRATION DU PROFIL
   */
  const fetchProfile = async () => {
    try {
      const meRes = await orgService.getMe();
      if (meRes.ok && meRes.data) {
        const allOrgs = await orgService.getAllOrgs();
        if (allOrgs.ok && Array.isArray(allOrgs.data)) {
          const myOrg = allOrgs.data.find((o: any) => o.ownerId === meRes.data.id);
          if (myOrg) {
            setOrgData(myOrg);
            
            // On ne repasse à FALSE que si on n'était pas déjà onboardé (évite le retour en arrière)
            const hasAddress = !!myOrg.address && 
                              myOrg.address.toLowerCase() !== "string" && 
                              myOrg.address.trim().length > 1;
            
            // SECURITÉ : Si on est déjà isOnboarded (via le handler), on ne change plus cet état
            setIsOnboarded(prev => prev || hasAddress);
            
            const [agRes, subRes] = await Promise.all([
              orgService.getAgencies(myOrg.id),
              orgService.getSubscription(myOrg.id)
            ]);
            if (agRes.ok) setAgencies(agRes.data || []);
            if (subRes.ok) setSubscription(subRes.data);
            
            setIsAuth(true);
          }
        }
      }
    } catch (e) {
      console.error("Erreur Profil:", e);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ACTION FINALE DU STEPPER (Correction du bug de retour en arrière)
   */
  const handleOnboardingComplete = async () => {
    // 1. On force l'état local à TRUE immédiatement
    setIsOnboarded(true);
    
    // 2. On injecte manuellement une adresse dans orgData pour que 
    // le prochain rendu ne déclenche pas le stepper même si l'API est lente
    setOrgData((prev: any) => ({ ...prev, address: 'CONFIRMED' }));

    // 3. On attend un peu plus longtemps pour Render (2 secondes)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // 4. On rafraîchit les vraies données
    await fetchProfile();
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    try {
      let res;
      if (isSignUp) {
        const regRes = await authService.registerOrg(authForm);
        if (regRes.ok) {
          const loginRes = await authService.login({ email: authForm.email, password: authForm.password });
          if (loginRes.ok && loginRes.data.token) {
            localStorage.setItem('auth_token', loginRes.data.token);
            await fetchProfile();
          } else {
            setAuthError("Inscription réussie, connectez-vous.");
            setIsSignUp(false);
          }
        } else {
          setAuthError(regRes.data?.message || "Erreur lors de l'inscription.");
        }
      } else {
        const res = await authService.login({ email: authForm.email, password: authForm.password });
        if (res.ok && res.data.token) {
          localStorage.setItem('auth_token', res.data.token);
          await fetchProfile();
        } else {
          setAuthError("Email ou mot de passe incorrect.");
        }
      }
    } catch (e) {
      setAuthError("Erreur serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else {
      alert(t.installNotice);
    }
  };

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  if (isLoading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0b1024]">
      <div className="relative">
        <div className="size-20 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center font-[900] italic text-blue-600">E</div>
      </div>
    </div>
  );

  // AUTH SCREEN
  if (!isAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FC] dark:bg-[#0b1024] relative overflow-hidden p-6 transition-colors duration-500">
      <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="max-w-[1100px] w-full grid lg:grid-cols-2 bg-white dark:bg-[#161b33] rounded-[3.5rem] shadow-2xl overflow-hidden border border-white dark:border-slate-800 z-10 animate-in zoom-in duration-700">
        <div className="hidden lg:flex flex-col justify-between p-16 bg-[#0528d6] relative overflow-hidden text-white">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-900 opacity-90" />
            <div className="relative z-10">
                <div className="size-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-xl mb-12 italic font-[900] text-3xl">E</div>
                <h2 className="text-6xl font-[900] italic uppercase tracking-tighter leading-[0.85] mb-6">Digital <br /> Mobility <br /> <span className="text-blue-300">Expert.</span></h2>
                <p className="text-blue-100/70 text-sm font-medium uppercase tracking-[0.2em]">{t.auth.subtitle}</p>
            </div>
            <div className="relative z-10 flex items-center gap-4 text-white/80">
                <div className="size-10 bg-white/10 rounded-xl flex items-center justify-center"><ShieldCheck size={20}/></div>
                <p className="text-xs font-bold uppercase tracking-widest italic">Sécurisé par EasyRental</p>
            </div>
        </div>
        <div className="p-10 md:p-16 flex flex-col justify-center">
            <h3 className="text-4xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white mb-10 leading-none">{isSignUp ? "Créer l'Espace" : "Accéder au Hub"}</h3>
            <form onSubmit={handleAuth} className="space-y-4">
                {isSignUp && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <div className="grid grid-cols-2 gap-3">
                            <AuthInput icon={<User size={18}/>} placeholder="Prénom" value={authForm.firstname} onChange={(val: string) => setAuthForm({...authForm, firstname: val})} />
                            <AuthInput icon={<User size={18}/>} placeholder="Nom" value={authForm.lastname} onChange={(val: string) => setAuthForm({...authForm, lastname: val})} />
                        </div>
                        <AuthInput icon={<Building size={18}/>} placeholder="Organisation" value={authForm.orgName} onChange={(val: string) => setAuthForm({...authForm, orgName: val})} />
                    </div>
                )}
                <AuthInput icon={<Mail size={18}/>} type="email" placeholder="Email" value={authForm.email} onChange={(val: string) => setAuthForm({...authForm, email: val})} />
                <AuthInput icon={<Lock size={18}/>} type="password" placeholder="Pass" value={authForm.password} onChange={(val: string) => setAuthForm({...authForm, password: val})} />
                {authError && <div className="p-4 bg-red-50 text-red-500 text-[10px] font-[900] uppercase italic rounded-2xl">{authError}</div>}
                <button className="w-full py-5 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-sm shadow-xl shadow-orange-200">Valider</button>
            </form>
            <button onClick={() => { setIsSignUp(!isSignUp); setAuthError(''); }} className="mt-8 text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 transition-colors tracking-widest italic text-center">{isSignUp ? t.auth.hasAccount : t.auth.noAccount}</button>
        </div>
      </div>
    </div>
  );

  // STEPPER SCREEN
  if (!isOnboarded) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-[#0b1024] p-6 transition-colors duration-500 overflow-y-auto">
      <OnboardingStepper 
        orgId={orgData?.id} 
        initialName={orgData?.name} 
        onComplete={handleOnboardingComplete} 
      />
    </div>
  );

  // DASHBOARD SCREEN
  return (
    <div className="flex h-screen bg-[#F8F9FC] dark:bg-[#0b1024] overflow-hidden transition-colors duration-500">
      <Sidebar 
        currentView={currentView} setCurrentView={setCurrentView} 
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}
        t={t} handleInstall={handleInstall}
        handleLogout={() => { localStorage.clear(); window.location.reload(); }}
      />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Header 
            title={t.views[currentView] || currentView}
            orgData={orgData} lang={lang} setLang={setLang}
            darkMode={darkMode} toggleTheme={toggleTheme}
            setSidebarOpen={setSidebarOpen} onInstall={handleInstall}
            hasPrompt={!!deferredPrompt} t={t}
        />
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          {currentView === 'DASHBOARD' && <DashboardView orgData={orgData} agencies={agencies} t={t} />}
          {currentView === 'AGENCIES' && <AgenciesView orgData={orgData} t={t} />}
          {currentView === 'ROLES' && <RolesView orgData={orgData} t={t} />}
          {currentView === 'STAFF' && <StaffView orgData={orgData} t={t} />}
          {currentView === 'SUBSCRIPTION' && <SubscriptionView orgData={orgData} t={t} />}
        </div>
      </main>
    </div>
  );
}

const AuthInput = ({ icon, type = "text", placeholder, value, onChange }: any) => (
    <div className="relative group">
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F76513] transition-colors">{icon}</div>
        <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent rounded-[1.4rem] pl-14 pr-6 py-5 text-sm font-bold text-slate-700 dark:text-white outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-[#F76513]/20 focus:ring-4 focus:ring-[#F76513]/5 transition-all" />
    </div>
);