/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { DocViewer } from './components/DocViewer';
import { PrototypeViewer } from './components/PrototypeViewer';
import { LogoBrandStudio } from './components/LogoBrandStudio';
import { FormsSchemaPlayground } from './components/FormsSchemaPlayground';
import { IntegrationSimulator } from './components/IntegrationSimulator';
import { DocumentationExporter } from './components/DocumentationExporter';
import { SiteSafeLogo } from './components/shared/SiteSafeLogo';
import { 
  ShieldCheck, 
  FileText, 
  Layers, 
  Sparkles, 
  FormInput, 
  Cpu, 
  Download,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('docs');

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-slate-800 flex flex-col font-sans selection:bg-slate-900 selection:text-white" id="sitesafe-app-root">
      {/* Top Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Tab Content Area */}
      <main className="flex-1">
        {activeTab === 'docs' && (
          <DocViewer onNavigateTab={(tab) => setActiveTab(tab)} />
        )}

        {activeTab === 'prototype' && (
          <PrototypeViewer />
        )}

        {activeTab === 'brand' && (
          <LogoBrandStudio />
        )}

        {activeTab === 'forms' && (
          <FormsSchemaPlayground />
        )}

        {activeTab === 'integrations' && (
          <IntegrationSimulator />
        )}

        {activeTab === 'export' && (
          <DocumentationExporter />
        )}
      </main>

      {/* Global Application Footer */}
      <footer className="bg-white border-t border-slate-200/80 py-8 px-4 sm:px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <SiteSafeLogo variant="horizontal" size="sm" theme="light" showTagline={true} />
            <div className="text-slate-500 text-[11px] font-mono sm:border-l sm:border-slate-200 sm:pl-4">
              Official Redesign Specification &bull; sitesafealliance.co.uk &bull; CITB ATO #9841
            </div>
          </div>

          {/* Quick Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-[11px]">
            <button 
              onClick={() => setActiveTab('docs')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'docs' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              Scope Spec
            </button>
            <span className="text-slate-300">&bull;</span>
            <button 
              onClick={() => setActiveTab('prototype')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'prototype' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              Interactive Prototype
            </button>
            <span className="text-slate-300">&bull;</span>
            <button 
              onClick={() => setActiveTab('brand')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'brand' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              Logo Studio
            </button>
            <span className="text-slate-300">&bull;</span>
            <button 
              onClick={() => setActiveTab('forms')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'forms' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              Form Schemas
            </button>
            <span className="text-slate-300">&bull;</span>
            <button 
              onClick={() => setActiveTab('integrations')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'integrations' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              CRM & Telephony
            </button>
            <span className="text-slate-300">&bull;</span>
            <button 
              onClick={() => setActiveTab('export')} 
              className={`hover:text-slate-900 transition-colors ${activeTab === 'export' ? 'text-slate-900 font-bold underline underline-offset-4' : 'text-slate-500'}`}
            >
              Export Doc
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
