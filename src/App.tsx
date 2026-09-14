/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { WebsiteView } from './components/WebsiteView';
import { ActiveTab } from './types';
import { Navbar } from './components/Navbar';
import { DocViewer } from './components/DocViewer';
import { LogoBrandStudio } from './components/LogoBrandStudio';
import { FormsSchemaPlayground } from './components/FormsSchemaPlayground';
import { IntegrationSimulator } from './components/IntegrationSimulator';
import { DocumentationExporter } from './components/DocumentationExporter';
import { ArrowLeft, ExternalLink, ShieldCheck } from 'lucide-react';

export default function App() {
  // Default directly to live website mode for end-users
  const [viewMode, setViewMode] = useState<'live' | 'internal_specs'>('live');
  const [internalTab, setInternalTab] = useState<ActiveTab>('docs');

  if (viewMode === 'live') {
    return (
      <WebsiteView 
        initialPage="home" 
        onOpenInternalDoc={() => setViewMode('internal_specs')} 
      />
    );
  }

  // Internal Specification View (Accessible only if deliberately opened via footer link)
  return (
    <div className="min-h-screen bg-[#fdfdfd] text-slate-800 flex flex-col font-sans selection:bg-slate-900 selection:text-white" id="sitesafe-internal-spec-root">
      {/* Return to Live Website Banner */}
      <div className="bg-[#263B52] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <span className="font-mono text-emerald-400 font-bold">[ENGINEERING WORKSPACE]</span>
          <span className="hidden sm:inline text-slate-300">Viewing Architecture &amp; Technical Specifications</span>
        </div>
        <button
          onClick={() => setViewMode('live')}
          className="px-3 py-1 rounded bg-[#78A6B8] hover:bg-white text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Live Website</span>
        </button>
      </div>

      {/* Internal Navigation */}
      <Navbar activeTab={internalTab} setActiveTab={setInternalTab} />

      {/* Internal Content */}
      <main className="flex-1">
        {internalTab === 'docs' && (
          <DocViewer onNavigateTab={(tab) => setInternalTab(tab)} />
        )}
        {internalTab === 'prototype' && (
          <div className="p-4 sm:p-8">
            <WebsiteView initialPage="home" />
          </div>
        )}
        {internalTab === 'brand' && (
          <LogoBrandStudio />
        )}
        {internalTab === 'forms' && (
          <FormsSchemaPlayground />
        )}
        {internalTab === 'integrations' && (
          <IntegrationSimulator />
        )}
        {internalTab === 'export' && (
          <DocumentationExporter />
        )}
      </main>
    </div>
  );
}
