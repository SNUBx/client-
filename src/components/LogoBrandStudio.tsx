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
  const [selectedTheme, setSelectedTheme] = useState<'dark' | 'light' | 'monochrome-white' | 'monochrome-black' | 'powder-blue'>('light');
  const [selectedVariant, setSelectedVariant] = useState<'horizontal' | 'stacked' | 'icon-only'>('horizontal');
  const [showGridOverlay, setShowGridOverlay] = useState(true);
  const [showClearanceZone, setShowClearanceZone] = useState(true);
  const [customScale, setCustomScale] = useState(1);
  const [copiedCode, setCopiedCode] = useState(false);

  const rawSvgMarkup = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Outer Hexagonal Foundation Shield -->
  <polygon points="50,6 89,27 89,73 50,94 11,73 11,27" fill="#F4F8FA" stroke="#263B52" stroke-width="4" stroke-linejoin="round"/>
  <!-- Structural Deep Navy Connection Arch -->
  <path d="M 50 24 C 67 24, 76 39, 72 66" stroke="#263B52" stroke-width="6" stroke-linecap="round"/>
  <!-- Fluid Powder Blue Connection Ribbon -->
  <path d="M 28 66 C 24 39, 33 24, 50 24" stroke="#78A6B8" stroke-width="6" stroke-linecap="round"/>
  <!-- Cross-Alliance Foundation Link -->
  <path d="M 28 66 C 36 78, 64 78, 72 66" stroke="#4F7788" stroke-width="5" stroke-linecap="round"/>
  <!-- Central Infinity Interlock / Nexus Hub -->
  <path d="M 38 46 C 44 38, 56 38, 62 46 C 68 54, 56 64, 50 64 C 44 64, 32 54, 38 46 Z" stroke="#78A6B8" stroke-width="3.5" stroke-linejoin="round" fill="none" opacity="0.9"/>
  <!-- Tripartite Network Connection Nodes -->
  <circle cx="50" cy="24" r="5.5" fill="#263B52" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="28" cy="66" r="5.5" fill="#78A6B8" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="72" cy="66" r="5.5" fill="#263B52" stroke="#FFFFFF" stroke-width="2"/>
  <circle cx="50" cy="51" r="3.5" fill="#263B52"/>
</svg>`;

  const copySvg = () => {
    navigator.clipboard.writeText(rawSvgMarkup);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const canvasBackground = {
    dark: 'bg-[#152230] text-slate-100 border border-[#263B52]',
    light: 'bg-[#F4F8FA] text-slate-900 border border-[#D5E2E8]',
    'monochrome-white': 'bg-[#0F172A] text-white',
    'monochrome-black': 'bg-white text-slate-950 border border-slate-300',
    'powder-blue': 'bg-[#263B52] border border-[#78A6B8]/40 text-white'
  }[selectedTheme];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="brand-studio-root">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 text-[#263B52] border border-[#263B52]/20 text-xs font-mono mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#78A6B8]" /> BRAND IDENTITY & ABSTRACT CONNECTION LOGO SPECIFICATION
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Refined Abstract Connection Logo & Color System
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Engineered with Deep Navy (<code className="font-semibold text-[#263B52]">#263B52</code>) and Powder Blue (<code className="font-semibold text-[#78A6B8]">#78A6B8</code>) with refined contrast shades for optimal readability across safety signage, digital viewports, and accreditation headers.
          </p>
        </div>

        <button
          onClick={copySvg}
          className="px-4 py-2.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer shrink-0"
          id="copy-raw-svg-btn"
        >
          {copiedCode ? <Check className="w-4 h-4 text-[#78A6B8]" /> : <Code className="w-4 h-4 text-[#78A6B8]" />}
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
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#78A6B820_1px,transparent_1px),linear-gradient(to_bottom,#78A6B820_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            )}

            {/* Clearance Zone Visualizer */}
            {showClearanceZone && (
              <div className="absolute inset-8 border border-dashed border-[#78A6B8]/70 rounded-xl pointer-events-none flex items-start justify-between p-2 text-[10px] font-mono text-[#263B52] font-semibold bg-[#78A6B8]/5">
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
                      ? 'bg-[#263B52] text-white font-bold shadow-xs' 
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
              {(['light', 'dark', 'powder-blue', 'monochrome-white', 'monochrome-black'] as const).map((th) => (
                <button
                  key={th}
                  onClick={() => setSelectedTheme(th)}
                  className={`px-2 py-1 rounded text-[10px] font-mono capitalize transition-all cursor-pointer ${
                    selectedTheme === th 
                      ? 'bg-[#263B52] text-white font-bold shadow-xs' 
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
                  className="rounded border-slate-300 text-[#263B52] focus:ring-[#78A6B8]"
                />
                <span>Grid</span>
              </label>
              <label className="flex items-center gap-1.5 text-slate-700 cursor-pointer font-mono text-[11px]">
                <input
                  type="checkbox"
                  checked={showClearanceZone}
                  onChange={(e) => setShowClearanceZone(e.target.checked)}
                  className="rounded border-slate-300 text-[#263B52] focus:ring-[#78A6B8]"
                />
                <span>Clearance</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Col: Specifications & Construction Rules */}
        <div className="space-y-4">
          {/* Official Color Swatches Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#263B52]" />
              Refined Palette: Deep Navy & Powder Blue
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-3 rounded-xl bg-[#263B52] text-white space-y-1">
                <span className="text-[10px] text-slate-300 block font-sans">Primary Authority</span>
                <span className="font-bold text-sm">#263B52</span>
                <span className="text-[10px] text-[#9BC1CF] block">Deep Navy (RGB 38,59,82)</span>
              </div>
              <div className="p-3 rounded-xl bg-[#78A6B8] text-slate-950 space-y-1">
                <span className="text-[10px] text-slate-800 block font-sans font-semibold">Connection Arc</span>
                <span className="font-bold text-sm text-[#1B2A3B]">#78A6B8</span>
                <span className="text-[10px] text-slate-800 block">Powder Blue (RGB 120,166,184)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#9BC1CF]/20 border border-[#9BC1CF]/40 text-slate-900">
                <span className="text-[10px] text-slate-500 block font-sans">Light Tint (Contrast)</span>
                <span className="font-bold">#9BC1CF</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#1B2A3B] text-white">
                <span className="text-[10px] text-slate-400 block font-sans">Deep Shade (Shadow)</span>
                <span className="font-bold">#1B2A3B</span>
              </div>
            </div>
          </div>

          {/* Construction Specs Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Grid className="w-4 h-4 text-[#78A6B8]" />
              Abstract Connection Geometry
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Geometry Type</span>
                <span className="text-[#263B52] font-semibold">Abstract Tripartite Connection</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Interlocking Arch Weight</span>
                <span className="text-slate-800 font-semibold">6.0px (Deep Navy) & 6.0px (Powder Blue)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Exclusion Safe Zone</span>
                <span className="text-emerald-700 font-semibold">1.5x Apex Clearance</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Contrast Ratio on Light</span>
                <span className="text-[#263B52] font-bold">9.8:1 (AAA Readability)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500">Print Minimum Width</span>
                <span className="text-slate-800 font-semibold">28mm (Hard Hat / Livery)</span>
              </div>
            </div>
          </div>

          {/* Typography Pairings Card */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Type className="w-4 h-4 text-[#263B52]" />
              Typography Hierarchy
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-[#263B52] block uppercase font-bold">Primary Display (Wordmark & Headings):</span>
                <span className="font-display text-base font-extrabold text-[#263B52]">Outfit Extrabold (800)</span>
                <p className="text-[11px] text-slate-500">Geometric, authoritative, high impact for safety and compliance signage.</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono text-[#78A6B8] block uppercase font-bold">Body & Form Inputs:</span>
                <span className="font-sans text-sm font-semibold text-slate-800">Plus Jakarta Sans (400 / 600 / 700)</span>
                <p className="text-[11px] text-slate-500">Exceptional legibility across mobile viewports, WCAG AA compliant.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
