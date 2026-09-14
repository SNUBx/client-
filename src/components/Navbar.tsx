import React from 'react';
import { ActiveTab } from '../types';
import { SiteSafeLogo } from './shared/SiteSafeLogo';
import { 
  FileText, 
  Layers, 
  Sparkles, 
  FormInput, 
  Cpu, 
  Download, 
  ShieldCheck, 
  Smartphone,
  PhoneCall
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenQuickPreview?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'docs' as ActiveTab, label: 'Scope Blueprint', icon: FileText, badge: 'Full Spec' },
    { id: 'prototype' as ActiveTab, label: 'Live Redesign Prototype', icon: Layers, badge: 'Interactive' },
    { id: 'brand' as ActiveTab, label: 'Minimalist Logo Studio', icon: Sparkles, badge: 'Vector Spec' },
    { id: 'forms' as ActiveTab, label: 'Booking Forms & Schema', icon: FormInput, badge: 'Indiv + Corp' },
    { id: 'integrations' as ActiveTab, label: 'CRM & Telephony CTI', icon: Cpu, badge: 'Webhooks & DNI' },
    { id: 'export' as ActiveTab, label: 'Export & Hand-off', icon: Download, badge: 'PDF / MD' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      {/* Top Status Utility Ribbon */}
      <div className="bg-slate-50 border-b border-slate-200/60 py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
              CITB ATO APPROVED #9841
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Target: <strong className="text-slate-900 font-semibold">sitesafealliance.co.uk</strong>
            </span>
            <span className="hidden lg:inline text-slate-300">|</span>
            <span className="hidden lg:inline text-slate-500">
              Performance Budget: <span className="text-amber-700 font-mono font-medium">LCP &lt; 1.2s</span> &bull; <span className="text-emerald-700 font-mono font-medium">WCAG 2.1 AA</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-[#263B52] font-mono text-[11px] bg-[#263B52]/10 px-2.5 py-0.5 rounded-full border border-[#263B52]/20">
              <PhoneCall className="w-3 h-3 text-[#78A6B8]" />
              <span>Aircall Hotline: +44 20 3608 4780</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-500 font-mono">
              <Smartphone className="w-3 h-3 text-slate-400" />
              <span>Responsive: 375px &rarr; 4K</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center justify-between">
          <div 
            onClick={() => setActiveTab('docs')}
            className="cursor-pointer transition-opacity hover:opacity-90"
            id="navbar-brand-logo"
          >
            <SiteSafeLogo variant="horizontal" size="md" theme="light" showTagline={true} />
          </div>

          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={() => setActiveTab('prototype')}
              className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 text-white font-bold flex items-center gap-1 shadow-sm hover:bg-slate-800"
              id="mobile-quick-prototype-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              Preview Site
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1 scrollbar-none" id="main-scope-navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 border border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden xl:inline-block text-[10px] px-1.5 py-0.2 rounded font-mono uppercase tracking-wider ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-500 border border-slate-200'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
