'use client';
import React from 'react';
import { 
  CheckCircle2, 
  PlayCircle, 
  ArrowRight, 
  WifiOff, 
  MapPin, 
  FileText, 
  Zap, 
  Users, 
  ShieldCheck, 
  Smartphone,
  Globe,
  BarChart3,
  Check
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* --- NAVBAR --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Zap size={24} fill="currentColor" />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase italic text-blue-900">
              PWA <span className="text-blue-600">Easy Rental</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex text-xs font-black uppercase tracking-widest text-slate-400 gap-4 mr-4">
              <a href="/client" className="hover:text-blue-600 transition-colors">Client</a>
              <a href="/agency" className="hover:text-blue-600 transition-colors">Agency</a>
              <a href="/organisation" className="hover:text-blue-600 transition-colors">Org</a>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black uppercase tracking-tighter text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-0.5 active:translate-y-0">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-orange-100 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              New: Offline Mode V2.0 Available
            </div>
            
            <h1 className="text-6xl md:text-7xl font-[900] italic leading-[0.9] tracking-tighter text-slate-900 mb-8 uppercase">
              Rentals Managed <br />
              <span className="text-blue-600">Anywhere.</span> <br />
              Even <span className="text-orange-500 underline decoration-orange-200 underline-offset-8">Offline.</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-10">
              The all-in-one PWA for managing fleets and goods. Seamless syncing for Organizations, Agencies, and Clients. No internet? No problem.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-tighter shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all hover:scale-105">
                Start Free Trial
              </button>
              <button className="bg-white border-2 border-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-tighter flex items-center gap-2 hover:bg-slate-50 transition-all">
                <PlayCircle size={20} /> View Demo
              </button>
            </div>
            
            <div className="flex items-center gap-6 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-green-500" /> Install on any device</div>
            </div>
          </div>

          {/* Hero Visual Mockup */}
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
            <div className="relative bg-slate-900 rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border-8 border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-700">
               <div className="bg-white rounded-[2.2rem] overflow-hidden aspect-video relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent" />
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Dashboard Preview" 
                    className="w-full h-full object-cover grayscale-[0.2]"
                  />
                  {/* Floating Sync Card */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur shadow-2xl p-4 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                       <span className="text-[10px] font-black text-blue-600 uppercase italic">Offline Syncing...</span>
                       <span className="text-[10px] font-black text-slate-400">75%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className="w-3/4 h-full bg-orange-500 rounded-full" />
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION (Added) --- */}
      <section className="py-12 border-y border-slate-50 bg-slate-50/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Organizations', value: '500+' },
            { label: 'Vehicles Managed', value: '12k+' },
            { label: 'Offline Sessions', value: '1.2M' },
            { label: 'Uptime', value: '99.9%' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-blue-600 italic tracking-tighter mb-1 uppercase">{stat.value}</div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* --- STAKEHOLDERS SECTION --- */}
      <section id="solutions" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 mb-4">Designed for every stakeholder</h2>
          <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Select your role to see how it works for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Organization */}
          <div className="group cursor-pointer">
            <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl transition-all group-hover:-translate-y-2">
              <img src="https://images.unsplash.com/photo-1542362567-b05eef11f94d?w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Organization" />
              <div className="absolute inset-0 bg-blue-900/40 group-hover:bg-blue-900/20 transition-all" />
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase italic">HQ View</div>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Organization</h3>
            <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">Centralize your entire fleet globally with advanced controls and live analytics dashboards.</p>
            <a href="/organisation" className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase italic group-hover:gap-4 transition-all">
              Explore Admin Tools <ArrowRight size={16} />
            </a>
          </div>

          {/* Agency */}
          <div className="group cursor-pointer">
            <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl transition-all group-hover:-translate-y-2">
              <img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Agency" />
              <div className="absolute inset-0 bg-orange-900/40 group-hover:bg-orange-900/20 transition-all" />
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase italic">Manager View</div>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Agency</h3>
            <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">Streamline client bookings, inventory management, and generate invoices in a single tap.</p>
            <a href="/agency" className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase italic group-hover:gap-4 transition-all">
              See Agency Features <ArrowRight size={16} />
            </a>
          </div>

          {/* Client */}
          <div className="group cursor-pointer">
            <div className="relative h-[300px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl transition-all group-hover:-translate-y-2 border-2 border-transparent group-hover:border-blue-100">
              <img src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Client" />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all" />
              <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-white uppercase italic">User App</div>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-slate-900 mb-2">Client</h3>
            <p className="text-slate-500 text-sm font-medium mb-4 leading-relaxed">Book vehicles, check-in status, and manage active rentals from any smartphone, anywhere.</p>
            <a href="/client" className="inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase italic group-hover:gap-4 transition-all">
              View Client Experience <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <div>
             <h2 className="text-5xl font-black italic leading-none tracking-tighter text-slate-900 mb-6 uppercase">Powerful <br /><span className="text-blue-600">PWA</span> Features</h2>
             <p className="text-lg text-slate-500 font-medium mb-10 leading-relaxed">Experience the speed of a native app directly in your browser. Install it on your home screen and work without interruption.</p>
             <button className="flex items-center gap-2 text-blue-600 font-black uppercase italic text-sm group">
               See Full Technical Specs <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: <WifiOff className="text-blue-600" />, title: 'Works Offline', desc: 'Manage data in dead zones. Everything syncs when you reconnect.' },
              { icon: <MapPin className="text-orange-500" />, title: 'Real-time GPS', desc: 'Integrated maps to monitor assets health and locations globally.' },
              { icon: <FileText className="text-blue-600" />, title: 'Auto Invoicing', desc: 'Streamline billing with automated generation based on usage.' },
              { icon: <Zap className="text-orange-500" />, title: 'Instant Sync', desc: 'Cloud background syncing ensures data is always current.' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all">
                <div className="bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h4 className="text-lg font-black uppercase italic tracking-tighter mb-2">{f.title}</h4>
                <p className="text-slate-500 text-xs font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- STEP BY STEP SECTION (Added) --- */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 skew-x-12 translate-x-32" />
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-black italic tracking-tighter uppercase mb-6 leading-none">How to <span className="text-blue-400">Launch</span> your fleet in 3 steps</h2>
                <div className="space-y-12 mt-12">
                   {[
                     { step: '01', title: 'Register Org', desc: 'Create your master account and define your global fleet parameters.' },
                     { step: '02', title: 'Connect Agencies', desc: 'Add local branches and give agents mobile access instantly.' },
                     { step: '03', title: 'Start Renting', desc: 'Go live! Clients can book via URL or install the PWA on their phone.' },
                   ].map((item, i) => (
                     <div key={i} className="flex gap-6">
                        <div className="text-4xl font-black italic text-blue-500 opacity-50">{item.step}</div>
                        <div>
                           <h4 className="text-xl font-black uppercase italic tracking-tighter mb-2">{item.title}</h4>
                           <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="hidden lg:block">
                 <div className="bg-slate-800 rounded-3xl p-8 aspect-square border border-slate-700 flex items-center justify-center">
                    <Smartphone size={300} className="text-slate-700" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- PRICING SECTION (Added Simple) --- */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900 mb-4">Scalable Pricing</h2>
            <p className="text-slate-500 font-medium text-sm">Choose the plan that fits your volume</p>
         </div>
         <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$49', features: ['Up to 10 vehicles', 'Basic Analytics', 'Offline Core'] },
              { name: 'Pro', price: '$199', features: ['Unlimited vehicles', 'Advanced GPS', 'Multi-Agency Support'], highlight: true },
              { name: 'Enterprise', price: 'Custom', features: ['White-label PWA', 'API Access', 'Dedicated Support'] },
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border ${plan.highlight ? 'border-blue-600 bg-blue-50/30' : 'border-slate-100'} flex flex-col`}>
                <h4 className="text-xl font-black uppercase italic tracking-tighter mb-4">{plan.name}</h4>
                <div className="text-4xl font-black text-slate-900 italic tracking-tighter mb-8">{plan.price} <span className="text-sm font-normal text-slate-400">/mo</span></div>
                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm font-medium text-slate-600">
                      <Check size={16} className="text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all ${plan.highlight ? 'bg-blue-600 text-white shadow-xl shadow-blue-200' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}>
                  Select Plan
                </button>
              </div>
            ))}
         </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-blue-600 rounded-[3rem] p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-200">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative z-10">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-6">Ready to modernize your fleet?</h2>
            <p className="text-blue-100 text-lg font-medium mb-10 max-w-xl mx-auto">Join 500+ organizations using PWA Easy Rental to cut costs and improve efficiency.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-black uppercase tracking-tighter text-sm shadow-xl hover:scale-105 transition-all">
                Get Started Now
              </button>
              <button className="bg-blue-700/50 backdrop-blur-sm border border-blue-400 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-tighter text-sm hover:bg-blue-700 transition-all">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="pt-24 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <Zap size={18} fill="currentColor" />
                </div>
                <span className="text-lg font-black tracking-tighter uppercase italic text-blue-900">
                  PWA <span className="text-blue-600">Easy Rental</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mb-6">
                The next generation of rental management. Built for the modern web with offline-first architecture.
              </p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"><Globe size={16} /></div>
                <div className="w-8 h-8 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"><BarChart3 size={16} /></div>
                <div className="w-8 h-8 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"><Users size={16} /></div>
              </div>
            </div>
            
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 italic">Product</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer">Features</li>
                <li className="hover:text-blue-600 cursor-pointer">Pricing</li>
                <li className="hover:text-blue-600 cursor-pointer">API</li>
                <li className="hover:text-blue-600 cursor-pointer">Download App</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 italic">Resources</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer">Documentation</li>
                <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
                <li className="hover:text-blue-600 cursor-pointer">Community</li>
                <li className="hover:text-blue-600 cursor-pointer">Status</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 mb-6 italic">Company</h5>
              <ul className="space-y-4 text-xs font-bold text-slate-400">
                <li className="hover:text-blue-600 cursor-pointer">About</li>
                <li className="hover:text-blue-600 cursor-pointer">Blog</li>
                <li className="hover:text-blue-600 cursor-pointer">Careers</li>
                <li className="hover:text-blue-600 cursor-pointer">Contact</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-slate-50 flex flex-col md:row justify-between items-center gap-6">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2025 PWA EASY RENTAL. ALL RIGHTS RESERVED.</span>
            <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}