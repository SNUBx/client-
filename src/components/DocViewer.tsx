import React, { useState } from 'react';
import { 
  PROJECT_OVERVIEW, 
  RESPONSIVE_SPECS, 
  LOGO_SPECIFICATIONS, 
  NAVIGATION_STRUCTURE, 
  SERVICES_LAYOUT_SPEC,
  INDIVIDUAL_BOOKING_FIELDS, 
  EMPLOYER_BOOKING_FIELDS, 
  INTEGRATION_ENDPOINTS 
} from '../data/scopeData';
import { 
  CheckCircle2, 
  Smartphone, 
  Sparkles, 
  Compass, 
  FormInput, 
  Cpu, 
  Copy, 
  Check, 
  ArrowRight,
  Shield, 
  Maximize2, 
  HelpCircle,
  Clock,
  PhoneCall,
  Lock,
  Workflow,
  Layers,
  GraduationCap,
  HeartPulse,
  Award,
  Flame,
  PoundSterling,
  Grid
} from 'lucide-react';
import { SiteSafeLogo } from './shared/SiteSafeLogo';

interface DocViewerProps {
  onNavigateTab: (tab: 'prototype' | 'brand' | 'forms' | 'integrations') => void;
}

export const DocViewer: React.FC<DocViewerProps> = ({ onNavigateTab }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const sections = [
    { id: 'all', label: 'All Sections' },
    { id: 'overview', label: '1. Executive Scope & Goals' },
    { id: 'logo', label: '2. Minimalist Logo Design System' },
    { id: 'navigation', label: '3. Structured Navigation Menu' },
    { id: 'services', label: '4. Specific Services Section Layout' },
    { id: 'forms', label: '5. Booking Form Schemas' },
    { id: 'integrations', label: '6. CRM & Telephony CTI' },
    { id: 'responsive', label: '7. Responsive Breakpoints' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12" id="doc-viewer-root">
      {/* Scope Header Hero Banner */}
      <section className="relative rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-8 overflow-hidden shadow-sm">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-6 top-6 hidden xl:block opacity-10">
          <SiteSafeLogo variant="stacked" size="xl" theme="light" />
        </div>

        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              TECHNICAL SPECIFICATION v3.4
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-slate-600 bg-slate-100 border border-slate-200">
              PROJECT BLUEPRINT
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CITB ATO COMPLIANT #9841
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
            Redesign Specification: <span className="text-amber-600">sitesafealliance.co.uk</span>
          </h1>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Official scope and engineering blueprint covering the minimalist logo design system, structured navigation menu, specific services section layout, all field requirements for Individual and Employer booking forms, and the CRM/Telephony integration specification.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('prototype')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              id="hero-launch-prototype-btn"
            >
              <span>Launch Live Redesign Preview</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={() => onNavigateTab('brand')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              id="hero-view-brand-btn"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Logo Studio</span>
            </button>
            <button
              onClick={() => onNavigateTab('forms')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              id="hero-view-forms-btn"
            >
              <FormInput className="w-4 h-4 text-amber-600" />
              <span>Test Booking Engine</span>
            </button>
            <button
              onClick={() => onNavigateTab('integrations')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-sm border border-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              id="hero-view-cti-btn"
            >
              <PhoneCall className="w-4 h-4 text-sky-600" />
              <span>Simulate Telephony & CRM</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Navigation Filter Bar */}
      <div className="sticky top-20 z-40 bg-[#fdfdfd]/95 backdrop-blur-md py-3 border-y border-slate-200/80 -mx-4 px-4 sm:-mx-6 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? 'bg-slate-900 text-white shadow-sm font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-64">
          <input
            type="text"
            placeholder="Search specs, fields, APIs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-400 font-mono shadow-sm"
            id="doc-search-input"
          />
        </div>
      </div>

      {/* SECTION 1: PROJECT OVERVIEW & SCOPE OBJECTIVES */}
      {(activeSection === 'all' || activeSection === 'overview') && (
        <section id="section-overview" className="space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-slate-900">1. Executive Summary & Strategic Objectives</h2>
              <p className="text-xs font-mono text-slate-500">Core mandate, deliverables, and performance benchmarks</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                Strategic Objectives for Redesign
              </h3>
              <div className="space-y-3">
                {PROJECT_OVERVIEW.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-700 leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 flex flex-col justify-between shadow-sm">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  Target SLAs & KPIs
                </h3>
                <div className="space-y-2.5 text-xs font-mono">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Largest Contentful Paint</span>
                    <span className="text-emerald-700 font-bold">&lt; 1.2 seconds</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="text-slate-600">First Input Delay (FID)</span>
                    <span className="text-emerald-700 font-bold">&lt; 50ms</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Accessibility Rating</span>
                    <span className="text-emerald-700 font-bold">WCAG 2.1 Level AA</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="text-slate-600">Mobile Checkout Steps</span>
                    <span className="text-amber-700 font-bold">Max 2 Steps (&lt;90s)</span>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 flex justify-between">
                    <span className="text-slate-600">CTI Screen-Pop Latency</span>
                    <span className="text-sky-700 font-bold">&lt; 180ms</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => onNavigateTab('prototype')}
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Experience Interactive Prototype</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: MINIMALIST LOGO SPECIFICATIONS */}
      {(activeSection === 'all' || activeSection === 'logo') && (
        <section id="section-logo" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">2. Minimalist Logo & Visual Identity Design System</h2>
                <p className="text-xs font-mono text-slate-500">Vector geometry, clearance zones, colour palette, and typography pairings</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('brand')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>Open Logo Studio</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Logo Preview Box */}
            <div className="rounded-xl bg-white border border-slate-200/80 p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
              <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 w-full flex flex-col items-center justify-center gap-4 relative">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Primary Lockup
                </div>
                <SiteSafeLogo variant="horizontal" size="lg" theme="light" showTagline={true} />
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-900 flex flex-col items-center justify-center">
                  <div className="text-[9px] font-mono text-slate-500 mb-2 uppercase">Light Canvas Mode</div>
                  <SiteSafeLogo variant="horizontal" size="sm" theme="light" />
                </div>
                <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center">
                  <div className="text-[9px] font-mono text-slate-400 mb-2 uppercase">Dark Contrast</div>
                  <SiteSafeLogo variant="horizontal" size="sm" theme="dark" />
                </div>
              </div>
            </div>

            {/* Geometric Rules & Clearance */}
            <div className="lg:col-span-2 rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900">Construction Geometry & Brand Rules</h3>
              <div className="space-y-2.5">
                {LOGO_SPECIFICATIONS.constructionRules.map((rule, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700">
                    <span className="w-4 h-4 rounded-full bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              {/* Color Swatches */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-500 block mb-2 font-semibold">Approved Brand Palette:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-[#F59E0B] text-slate-950 font-bold text-center">
                    #F59E0B
                    <span className="block text-[9px] opacity-80">Safety Amber</span>
                  </div>
                  <div className="p-2 rounded bg-[#0F172A] text-white font-bold text-center border border-slate-700">
                    #0F172A
                    <span className="block text-[9px] opacity-80">Slate Navy</span>
                  </div>
                  <div className="p-2 rounded bg-[#10B981] text-white font-bold text-center">
                    #10B981
                    <span className="block text-[9px] opacity-80">Signal Emerald</span>
                  </div>
                  <div className="p-2 rounded bg-[#F8FAFC] text-slate-950 font-bold text-center border border-slate-300">
                    #F8FAFC
                    <span className="block text-[9px] opacity-80">Pure Crisp Light</span>
                  </div>
                  <div className="p-2 rounded bg-[#090D16] text-amber-400 font-bold text-center border border-slate-800">
                    #090D16
                    <span className="block text-[9px] opacity-80">Precision Dark</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: STRUCTURED NAVIGATION MENU */}
      {(activeSection === 'all' || activeSection === 'navigation') && (
        <section id="section-navigation" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">3. Structured Navigation Menu & Information Architecture</h2>
                <p className="text-xs font-mono text-slate-500">Detailed breakdown of Home, Services, About, and Contact trees</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('prototype')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>Explore Live in Prototype</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {NAVIGATION_STRUCTURE.map((item) => (
              <div key={item.id} className="rounded-xl bg-white border border-slate-200/80 p-5 space-y-4 flex flex-col justify-between shadow-sm">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-800 px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {item.path}
                    </span>
                    {item.badge && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.label}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>

                {item.children && (
                  <div className="space-y-2 border-t border-slate-100 pt-3">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-semibold">
                      Sub-Routes & Services ({item.children.length}):
                    </span>
                    <div className="space-y-1.5">
                      {item.children.map((child) => (
                        <div key={child.id} className="p-2 rounded bg-slate-50 border border-slate-200/80 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-slate-800">{child.label}</span>
                            {child.duration && (
                              <span className="text-[10px] font-mono text-slate-600 bg-slate-200/60 px-1 rounded">
                                {child.duration}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">{child.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 4: SPECIFIC SERVICES SECTION LAYOUT & CARD ARCHITECTURE */}
      {(activeSection === 'all' || activeSection === 'services') && (
        <section id="section-services" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <Grid className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">4. Specific Services Section Layout & Card Architecture</h2>
                <p className="text-xs font-mono text-slate-500">Bento grid mechanics, category filters, card anatomy, and CITB levy rebate calculation</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('prototype')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>View Live Services Page</span> &rarr;
            </button>
          </div>

          {/* Grid Layout Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
              <strong className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                <Maximize2 className="w-4 h-4 text-amber-600" /> Desktop (1024px+)
              </strong>
              <p className="text-slate-600 leading-relaxed">
                {SERVICES_LAYOUT_SPEC.gridStructure.desktop}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
              <strong className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                <Smartphone className="w-4 h-4 text-sky-600" /> Tablet (640px – 1023px)
              </strong>
              <p className="text-slate-600 leading-relaxed">
                {SERVICES_LAYOUT_SPEC.gridStructure.tablet}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm space-y-1.5">
              <strong className="text-slate-900 font-bold flex items-center gap-1.5 text-sm">
                <Smartphone className="w-4 h-4 text-emerald-600" /> Mobile (375px – 639px)
              </strong>
              <p className="text-slate-600 leading-relaxed">
                {SERVICES_LAYOUT_SPEC.gridStructure.mobile}
              </p>
            </div>
          </div>

          {/* Card Anatomy Breakdown */}
          <div className="rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              Service Card Anatomy Specifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SERVICES_LAYOUT_SPEC.cardAnatomySpecifications.map((item, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {item.component}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{item.spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specific Categories & Courses Breakdown */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900">Accredited Service Categories & Course Catalogs</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {SERVICES_LAYOUT_SPEC.categories.map((category) => (
                <div key={category.id} className="rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-slate-900">{category.name}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                        {category.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{category.description}</p>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-3">
                    {category.courses.map((course) => (
                      <div key={course.code} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-bold text-slate-900 block text-sm">{course.title}</span>
                            <span className="text-[10px] font-mono text-slate-500">SKU: {course.code} &bull; {course.duration}</span>
                          </div>
                          <div className="text-right">
                            <span className="font-bold text-slate-900 text-sm">£{course.priceGbp}</span>
                            <span className="text-[10px] text-slate-500 block">+ VAT</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          {course.accreditations.map((acc, i) => (
                            <span key={i} className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
                              {acc}
                            </span>
                          ))}
                        </div>

                        <div className="p-2 rounded bg-amber-50/80 border border-amber-200 text-[11px] font-mono text-amber-900 flex items-center justify-between">
                          <span>CITB Levy Rebate:</span>
                          <span className="font-bold">{course.citbGrantRebate}</span>
                        </div>

                        <div className="text-[11px] text-slate-600 space-y-0.5">
                          <strong className="text-slate-700 block text-[10px] uppercase font-bold">Core Syllabus Modules:</strong>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600">
                            {course.keyModules.slice(0, 2).map((mod, mi) => (
                              <li key={mi} className="truncate">{mod}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 5: BOOKING FORM FIELD REQUIREMENTS */}
      {(activeSection === 'all' || activeSection === 'forms') && (
        <section id="section-forms" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                <FormInput className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">5. Field Requirements for Booking Forms</h2>
                <p className="text-xs font-mono text-slate-500">Complete field specifications, validation patterns, and CRM mappings for Individual & Employer forms</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('forms')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>Test Working Form Playground</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Individual Booking Form Specs */}
            <div className="rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Individual Candidate Booking Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Optimized for rapid checkout (&lt;90 seconds) with ID & NI validation</p>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-50 text-amber-800 border border-amber-200">
                  {INDIVIDUAL_BOOKING_FIELDS.length} Mandatory Fields
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {INDIVIDUAL_BOOKING_FIELDS.map((field, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        {field.label} {field.required && <span className="text-amber-600">*</span>}
                      </span>
                      <span className="font-mono text-[10px] text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        type: {field.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-slate-600 font-mono">Field Key: <code className="text-slate-900 font-semibold">{field.name}</code></span>
                      {field.validationRegex && (
                        <span className="text-slate-500 font-mono">Regex: <code className="text-sky-700">{field.validationRegex}</code></span>
                      )}
                    </div>

                    <div className="p-1.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-emerald-800 flex items-center justify-between">
                      <span>CRM Map: {field.crmMappingField}</span>
                      {field.telephonyAction && (
                        <span className="text-amber-700 text-[10px] font-medium">CTI: {field.telephonyAction}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Employer / Corporate Group Booking Form Specs */}
            <div className="rounded-xl bg-white border border-slate-200/80 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    Employer & Corporate Group Booking Form
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Includes multi-delegate candidate builder, PO invoicing, and on-site delivery logic</p>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-sky-50 text-sky-700 border border-sky-200">
                  {EMPLOYER_BOOKING_FIELDS.length} Core Fields + Roster
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {EMPLOYER_BOOKING_FIELDS.map((field, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800">
                        {field.label} {field.required && <span className="text-sky-600">*</span>}
                      </span>
                      <span className="font-mono text-[10px] text-slate-600 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
                        type: {field.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="text-slate-600 font-mono">Field Key: <code className="text-slate-900 font-semibold">{field.name}</code></span>
                    </div>

                    <div className="p-1.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-emerald-800 flex items-center justify-between">
                      <span>CRM Map: {field.crmMappingField}</span>
                      {field.telephonyAction && (
                        <span className="text-sky-700 text-[10px] font-medium">CTI: {field.telephonyAction}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 6: CRM & TELEPHONY SYSTEM INTEGRATION */}
      {(activeSection === 'all' || activeSection === 'integrations') && (
        <section id="section-integrations" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">6. CRM & Telephony System Integration Specification</h2>
                <p className="text-xs font-mono text-slate-500">Webhook schemas, CTI screen-pops, DNI tracking, and automated SMS dispatch</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('integrations')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>Test CTI Webhook Simulator</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {INTEGRATION_ENDPOINTS.map((endpoint) => (
              <div key={endpoint.id} className="rounded-xl bg-white border border-slate-200/80 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                      endpoint.system === 'CRM' 
                        ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                        : 'bg-sky-50 text-sky-700 border border-sky-200'
                    }`}>
                      {endpoint.system}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 bg-slate-100 border border-slate-200">
                      {endpoint.method}
                    </span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(endpoint.samplePayload, null, 2), endpoint.id)}
                    className="p-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs flex items-center gap-1 font-mono transition-all border border-slate-200"
                  >
                    {copiedId === endpoint.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === endpoint.id ? 'Copied' : 'Copy JSON'}</span>
                  </button>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900">{endpoint.name}</h3>
                  <code className="text-xs font-mono text-slate-800 block mt-1 break-all bg-slate-50 p-2 rounded border border-slate-200">
                    {endpoint.endpoint}
                  </code>
                </div>

                <div className="space-y-2 text-xs">
                  <p className="text-slate-600 leading-relaxed">{endpoint.description}</p>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] space-y-1">
                    <span className="text-slate-400 block text-[10px] uppercase">Trigger Event:</span>
                    <span className="text-emerald-700 font-semibold">{endpoint.triggerEvent}</span>
                  </div>
                </div>

                {/* Sample JSON snippet preview */}
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Sample JSON Payload:</span>
                  <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px] text-slate-200 overflow-x-auto max-h-48">
                    {JSON.stringify(endpoint.samplePayload, null, 2)}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 7: RESPONSIVE DESIGN REQUIREMENTS */}
      {(activeSection === 'all' || activeSection === 'responsive') && (
        <section id="section-responsive" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-50 text-sky-700 border border-sky-200">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-slate-900">7. Responsive Design Specifications</h2>
                <p className="text-xs font-mono text-slate-500">Breakpoints, fluid grid mechanics, touch targets, and viewport behaviors</p>
              </div>
            </div>
            <button
              onClick={() => onNavigateTab('prototype')}
              className="text-xs font-mono text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <span>Test in Prototype</span> &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {RESPONSIVE_SPECS.map((spec, i) => (
              <div key={i} className="rounded-xl bg-white border border-slate-200/80 p-5 space-y-3 flex flex-col justify-between shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold font-mono text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {spec.query}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">{spec.gridCols} Col Grid</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{spec.name}</h3>
                  <p className="text-xs text-slate-500">Target: {spec.targetDevice}</p>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                  <div>
                    <span className="text-slate-400 font-mono block text-[10px] uppercase">Navigation Behavior:</span>
                    <p className="text-slate-700 text-[11px] leading-relaxed mt-0.5">{spec.navBehavior}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[10px] uppercase">Touch Target Standard:</span>
                    <p className="text-emerald-700 font-mono font-medium text-[11px] mt-0.5">{spec.touchTarget}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-mono block text-[10px] uppercase">Typography Scale:</span>
                    <p className="text-slate-700 font-mono text-[11px] mt-0.5">{spec.typographyScale}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Responsive Rules Box */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-xs">
              <strong className="text-slate-900 font-semibold flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-600" /> Mobile Sticky CTA Dock
              </strong>
              <p className="text-slate-600 text-[11px]">
                On viewports &lt; 768px, a fixed bottom dock exposes dual buttons: <strong>[Quick Book Course]</strong> and <strong>[Call 0800 999 7483]</strong> with one-tap tel: initiation.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-xs">
              <strong className="text-slate-900 font-semibold flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-sky-600" /> Dynamic Form Viewport Adaptation
              </strong>
              <p className="text-slate-600 text-[11px]">
                Candidate multi-delegate roster seamlessly transforms from a wide data table on desktop to individual expandable candidate cards on mobile screens.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-1 shadow-xs">
              <strong className="text-slate-900 font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Pinch-to-Zoom Requirement
              </strong>
              <p className="text-slate-600 text-[11px]">
                Form input elements use a minimum of 16px font-size to prevent iOS Safari auto-zooming and maintain pristine visual viewport alignment.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
