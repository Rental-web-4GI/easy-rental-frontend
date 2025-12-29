'use client';
import React, { useState } from 'react';
import { 
  Loader2, ArrowRight, CheckCircle2, 
  Building2, MapPin, ShieldCheck, Globe, 
  ChevronLeft, Sparkles 
} from 'lucide-react';
import { orgService } from '@pwa-easy-rental/shared-services';

// --- COMPOSANT INPUT EXTERNE POUR RÉACTIVITÉ ET FOCUS ---
const StepperInput = ({ label, name, placeholder, value, onChange, type = "text", icon: Icon }: any) => (
  <div className="space-y-1.5 group">
    <label className="text-[10px] font-[900] uppercase text-slate-400 dark:text-slate-500 italic tracking-[0.2em] ml-1">
      {label}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#F76513] transition-colors">
          <Icon size={18} />
        </div>
      )}
      <input 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full bg-slate-50 dark:bg-slate-900/50 border-2 border-transparent rounded-2xl py-4 pr-6 
          ${Icon ? 'pl-12' : 'pl-6'} 
          text-sm font-bold text-slate-700 dark:text-white outline-none 
          focus:bg-white dark:focus:bg-slate-900 focus:border-[#F76513]/20 focus:ring-4 focus:ring-[#F76513]/5 
          transition-all duration-300
        `}
      />
    </div>
  </div>
);

export const OnboardingStepper = ({ orgId, initialName, onComplete }: any) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialName || '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    region: '',
    phone: '',
    email: '',
    website: '',
    timezone: 'Africa/Douala',
    logoUrl: 'https://placehold.co/200x200',
    registrationNumber: '',
    taxNumber: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = async () => {
    setLoading(true);
    try {
      const res = await orgService.updateOrg(orgId, formData);
      if (res.ok) onComplete();
      else alert("Erreur de mise à jour");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stepInfo = [
    { title: "Identité", sub: "Branding & Vision", icon: <Building2 size={20}/> },
    { title: "Contact", sub: "Localisation & Siège", icon: <Globe size={20}/> },
    { title: "Légal", sub: "Conformité & Temps", icon: <ShieldCheck size={20}/> }
  ];

  return (
    <div className="max-w-4xl w-full flex flex-col items-center animate-in fade-in zoom-in duration-700">
      
      {/* --- HEADER DU STEPPER --- */}
      <div className="w-full mb-10 text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase italic tracking-widest border border-blue-100 dark:border-blue-900/30">
          <Sparkles size={14} className="animate-pulse" /> Étape {step} sur 3
        </div>
        <h1 className="text-5xl md:text-6xl font-[900] italic uppercase tracking-tighter text-slate-900 dark:text-white leading-none">
          Configuration <span className="text-[#0528d6]">Initiale.</span>
        </h1>
      </div>

      <div className="w-full bg-white dark:bg-[#161b33] rounded-[3.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] dark:shadow-none border border-white dark:border-slate-800 overflow-hidden grid lg:grid-cols-12 min-h-[600px]">
        
        {/* --- SIDEBAR DE PROGRESSION (LG ONLY) --- */}
        <div className="lg:col-span-4 bg-slate-50 dark:bg-[#0b1024]/50 border-r border-slate-100 dark:border-slate-800 p-10 flex flex-col gap-8">
            {stepInfo.map((info, i) => {
                const s = i + 1;
                const active = step === s;
                const done = step > s;
                return (
                    <div key={s} className={`flex items-center gap-4 transition-all duration-500 ${active ? 'translate-x-2' : 'opacity-40 grayscale'}`}>
                        <div className={`
                            size-12 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-lg
                            ${active ? 'bg-[#F76513] text-white scale-110 rotate-3' : done ? 'bg-green-500 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'}
                        `}>
                            {done ? <CheckCircle2 size={24} /> : info.icon}
                        </div>
                        <div className="flex flex-col leading-none">
                            <span className="text-[10px] font-black uppercase text-slate-400 mb-1">Étape 0{s}</span>
                            <span className={`text-sm font-[900] uppercase italic ${active ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>{info.title}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{info.sub}</span>
                        </div>
                    </div>
                )
            })}

            <div className="mt-auto p-6 bg-blue-600 rounded-3xl text-white relative overflow-hidden group">
                <ShieldCheck size={80} className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform duration-500" />
                <p className="text-[10px] font-black uppercase italic leading-tight">Vos données sont sécurisées et cryptées par notre protocole rental-lock.</p>
            </div>
        </div>

        {/* --- ZONE DE FORMULAIRE --- */}
        <div className="lg:col-span-8 p-8 md:p-14 flex flex-col">
            <div className="flex-1">
                {step === 1 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none tracking-tight">Qui êtes-vous ?</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Définissez l'image de marque de votre réseau</p>
                    </div>
                    <StepperInput label="Dénomination Sociale" name="name" value={formData.name} onChange={handleChange} icon={Building2} />
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-[900] uppercase text-slate-400 italic ml-1">Vision de l'entreprise</label>
                        <textarea 
                            name="description" rows={4} value={formData.description} onChange={handleChange} 
                            placeholder="Décrivez vos services et votre zone de couverture..."
                            className="w-full p-6 bg-slate-50 dark:bg-slate-900 border-none rounded-3xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#F76513] transition-all dark:text-white" 
                        />
                    </div>
                    <StepperInput label="Site Internet (Optionnel)" name="website" placeholder="https://www.votre-site.com" value={formData.website} onChange={handleChange} icon={Globe} />
                </div>
                )}

                {step === 2 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none tracking-tight">Où vous trouver ?</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Siège social et coordonnées publiques</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <StepperInput label="Ville" name="city" value={formData.city} onChange={handleChange} placeholder="ex: Douala" />
                        <StepperInput label="Région / État" name="region" value={formData.region} onChange={handleChange} placeholder="ex: Littoral" />
                    </div>
                    <StepperInput label="Adresse Postale" name="address" value={formData.address} onChange={handleChange} placeholder="ex: Rue de la Joie, Akwa" icon={MapPin} />
                    <div className="grid grid-cols-2 gap-4">
                        <StepperInput label="Téléphone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+237..." />
                        <StepperInput label="Email de contact" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="contact@votre-org.com" />
                    </div>
                </div>
                )}

                {step === 3 && (
                <div className="space-y-6 animate-in slide-in-from-right duration-500">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-[900] italic uppercase text-slate-900 dark:text-white leading-none tracking-tight">Légalité</h2>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Dernière étape pour activer le dashboard</p>
                    </div>
                    <StepperInput label="Registre du Commerce (RCCM)" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} placeholder="RC/DLA/2024/..." icon={ShieldCheck} />
                    <StepperInput label="Numéro Contribuable (NIU)" name="taxNumber" value={formData.taxNumber} onChange={handleChange} placeholder="M0123..." icon={ShieldCheck} />
                    <div className="grid grid-cols-2 gap-4">
                        <StepperInput label="Fuseau Horaire" name="timezone" value={formData.timezone} onChange={handleChange} />
                        <StepperInput label="Code Postal" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="00237" />
                    </div>
                </div>
                )}
            </div>

            {/* --- ACTIONS --- */}
            <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-50 dark:border-slate-800 shrink-0">
                {step > 1 ? (
                <button 
                    onClick={() => setStep(step - 1)} 
                    className="flex items-center gap-2 px-6 py-4 text-slate-400 font-black uppercase italic text-[10px] hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ChevronLeft size={16} /> Précédent
                </button>
                ) : <div />}
                
                {step < 3 ? (
                <button 
                    onClick={() => setStep(step + 1)} 
                    className="px-10 py-5 bg-[#F76513] text-white rounded-2xl font-[900] uppercase italic text-sm shadow-xl shadow-orange-200 dark:shadow-none flex items-center gap-3 hover:bg-[#ff7b30] hover:scale-[1.02] transition-all"
                >
                    Étape Suivante <ArrowRight size={18} />
                </button>
                ) : (
                <button 
                    onClick={handleFinalSubmit} 
                    disabled={loading} 
                    className="px-10 py-5 bg-green-600 text-white rounded-2xl font-[900] uppercase italic text-sm shadow-xl flex items-center gap-3 hover:bg-green-700 hover:scale-[1.02] transition-all disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin" size={18} /> : (
                        <>Activer le Dashboard <CheckCircle2 size={18} /></>
                    )}
                </button>
                )}
            </div>
        </div>
      </div>

      <p className="mt-8 text-[9px] font-black uppercase text-slate-300 dark:text-slate-600 tracking-[0.5em] italic">
        © 2025 EasyRental Global • Secure Onboarding Phase
      </p>
    </div>
  );
};