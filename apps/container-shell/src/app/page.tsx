'use client';
import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import AuthModal from '../components/AuthModal';
import { Hero } from '../components/Hero';
import { Solutions } from '../components/Solutions';
import { Pricing } from '../components/Pricing';
import { Features } from '../components/Features';
import { Footer } from '../components/Footer';
import { fr } from '../locales/fr';
import { en } from '../locales/en';

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState<'FR' | 'EN'>('FR');
  const [authOpen, setAuthOpen] = useState(false);
  const [initialRole, setInitialRole] = useState<any>(null);
  
  // Logique PWA
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const t = lang === 'FR' ? fr : en;

  useEffect(() => {
    // 1. Theme init
    const isDark = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');

    // 2. Capture de l'événement d'installation PWA
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      // Fallback pour iOS ou si déjà installé
      alert(t.hero.installNotice);
    }
  };

  const openAuth = (role: any) => {
    setInitialRole(role);
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f1323] text-slate-900 dark:text-white transition-colors duration-300">
      <Navbar t={t} lang={lang} 
        onLangToggle={() => setLang(l => l === 'FR' ? 'EN' : 'FR')}
        darkMode={darkMode} onThemeToggle={() => {
          const next = !darkMode;
          setDarkMode(next);
          document.documentElement.classList.toggle('dark');
          localStorage.setItem('theme', next ? 'dark' : 'light');
        }}
        onAuthOpen={() => openAuth(null)}
      />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} t={t} initialRole={initialRole} />

      {/* Hero reçoit maintenant la fonction d'installation */}
      <Hero 
        t={t.hero} 
        onReserve={() => openAuth('client')} 
        onInstall={handleInstallApp}
        canInstall={!!deferredPrompt}
      />

      <Solutions t={t.stakeholders} onAuth={openAuth} />
      <Features t={t.features} />
      <Pricing t={t.pricing} />
      <Footer t={t.footer} nav={t.nav} />
    </div>
  );
}