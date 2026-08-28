import React, { useState } from 'react';
import { LOGO_SPECIFICATIONS } from '../data/scopeData';
import { SiteSafeLogo } from './shared/SiteSafeLogo';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Grid, 
  Sliders, 
  Download, 
  ShieldCheck, 
  Eye, 
  Maximize, 
  Type,
  Layers,
  Code
} from 'lucide-react';

export const LogoBrandStudio: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'monochrome-white' | 'monochrome-black' | 'amber-glow'>('dark');
  const [selectedVariant, setSelectedVariant] = useState<'horizontal' | 'stacked' | 'icon-only'>('horizontal');
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [showClearanceZone, setShowClearanceZone] = useState(true);
  const [customScale, setCustomScale] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  const rawSvgMarkup = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Equilateral Hexagonal Safety Shield -->
  <polygon points="50,4 92,26 92,74 50,96 8,74 8,26" fill="#0F172A" stroke="#F59E0B" stroke-width="6" stroke-linejoin="round"/>
  <!-- Interlocking S & A Structural Rafters -->
  <path d="M 32 30 L 68 30 L 32 50 L 68 50 L 32 70 L 68 70" stroke="#F59E0B" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Keystone Apex Diamond -->
  <path d="M 50 16 L 62 26 L 50 36 L 38 26 Z" fill="#F59E0B" opacity="0.9"/>
  <!-- Precision Compliance Center Dot -->
  <circle cx="50" cy="50" r="4.5" fill="#10B981"/>
</svg>`;

  const copySvg = () => {
    navigator.clipboard.writeText(rawSvgMarkup);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const canvasBackground = {
    dark: 'bg-slate-950 text-slate-100',
    light: 'bg-slate-100 text-slate-900 border border-slate-300',
    'monochrome-white': 'bg-black text-white',
    'monochrome-black': 'bg-white text-slate-950 border border-slate-300',
    'amber-glow': 'bg-amber-950/40 border border-amber-500/30 text-amber-100'
  }[selectedTheme];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="brand-studio-root">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" /> BRAND IDENTITY SPECIFICATION
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Minimalist Logo & Visual Identity Design System
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Engineered for high-vis construction apparel, vehicle livery, digital viewports, and CITB ATO accreditation badges.
          </p>
        </div>

        <button
          onClick={copySvg}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
          id="copy-raw-svg-btn"
        >
          {copiedCode ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
          <span>{copiedCode ? 'SVG Code Copied!' : 'Copy Vector SVG Markup'}</span>
        </button>
      </div>

      {/* Main Interactive Studio Bench */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Canvas Stage */}
        <div className="lg:col-span-2 space-y-4">
          <div className={`relative min-h-[440px] rounded-2xl ${canvasBackground} p-8 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shadow-sm`}>
            {/* Grid Overlay */}
            {showGridOverlay && (
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415515_1px,transparent_1px),linear-gradient(to_bottom,#33415515_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            )}

            {/* Clearance Zone Visualizer */}
            {showClearanceZone && (
              <div className="absolute inset-8 border border-dashed border-amber-500/50 rounded-xl pointer-events-none flex items-start justify-between p-2 text-[10px] font-mono text-amber-600 font-semibold">
                <span>1.5x Clearance Boundary</span>
                <span>Exclusion Safe Zone</span>
              </div>
            )}

            {/* Logo under test */}
            <div 
              style={{ transform: `scale(${customScale})` }} 
              className="transition-transform duration-200 relative z-10"
              id="active-logo-stage"
            >
              <SiteSafeLogo 
                variant={selectedVariant} 
                theme={selectedTheme} 
                size="lg" 
                showTagline={true} 
              />
            </div>
          </div>

          {/* Interactive Canvas Controls */}
          <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Variant Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Lockup:</span>
              {(['horizontal', 'stacked', 'icon-only'] as const).map((variant) => (
                <button
                  key={variant}
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-all cursor-pointer ${
                    selectedVariant === variant 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {variant.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Theme Canvas Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 font-mono text-[11px]">Canvas:</span>
              {(['dark', 'light', 'monochrome-white', 'monochrome-black', 'amber-glow'] as const).map((th) => (
                <button
                  key={th}
                  onClick={() => setSelectedTheme(th)}
                  className={`px-2 py-1 rounded text-[10px] font-mono capitalize transition-all cursor-pointer ${
                    selectedTheme === th 
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' 
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {th.replace('-', ' ')}
                </button>
              ))}
            </div>

            {/* Toggles */}
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-mono text-[11px]">
                <input
                  type="checkbox"
                  checked={showGridOverlay}
                  onChange={(e) => setShowGridOverlay(e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                <span>Grid</span>
              </label>
              <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-mono text-[11px]">
                <input
                  type="checkbox"
                  checked={showClearanceZone}
                  onChange={(e) => setShowClearanceZone(e.target.checked)}
                  className="rounded border-slate-300 text-amber-500 focus:ring-amber-400"
                />
                <span>Clearance</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Specifications & Construction Rules */}
        <div className="space-y-4">
          {/* Construction Specs Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-amber-600" />
              Geometric Construction Matrix
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Primary Shield Aspect</span>
                <span className="text-amber-700 font-semibold">Equilateral Hexagon</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Rafter Stroke Weight</span>
                <span className="text-slate-800 font-semibold">6.5px (Uniform Chamfer)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Exclusion Safe Zone</span>
                <span className="text-emerald-700 font-semibold">1.5x Apex Clearance</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Digital Favicon Spec</span>
                <span className="text-sky-700 font-semibold">32x32px Pure Vector SVG</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Print Minimum Width</span>
                <span className="text-slate-800 font-semibold">28mm (Hard Hat Label)</span>
              </div>
            </div>
          </div>

          {/* Typography Pairings Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-sky-600" />
              Typography Hierarchy
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-amber-700 block uppercase font-bold">Primary Display (Logo Wordmark & Headings):</span>
                <span className="font-display text-base font-extrabold text-slate-900">Outfit Extrabold (800)</span>
                <p className="text-[11px] text-slate-500">Geometric, authoritative, high impact for safety signage.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-sky-700 block uppercase font-bold">Body & Form Inputs:</span>
                <span className="font-sans text-sm font-semibold text-slate-800">Plus Jakarta Sans (400 / 600 / 700)</span>
                <p className="text-[11px] text-slate-500">Exceptional legibility across mobile viewports, WCAG AA compliant.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-emerald-700 block uppercase font-bold">Technical Specs & Course SKUs:</span>
                <span className="font-mono text-xs text-emerald-800 font-semibold">JetBrains Mono (500)</span>
                <p className="text-[11px] text-slate-500">Used for CITB numbers, NI validation codes, and API payloads.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
