import React, { useState } from 'react';
import { INTEGRATION_ENDPOINTS } from '../data/scopeData';
import { 
  PhoneCall, 
  Cpu, 
  Database, 
  Send, 
  CheckCircle2, 
  Clock, 
  Smartphone, 
  UserCheck, 
  Sparkles,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Radio,
  Play,
  RotateCcw
} from 'lucide-react';

export const IntegrationSimulator: React.FC = () => {
  const [activeCallSimulator, setActiveCallSimulator] = useState(false);
  const [simulatedCaller, setSimulatedCaller] = useState<'individual' | 'corporate_vip'>('individual');
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected'>('idle');
  const [screenPopData, setScreenPopData] = useState<any>(null);
  const [smsDispatched, setSmsDispatched] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState(INTEGRATION_ENDPOINTS[0]);
  const [webhookLog, setWebhookLog] = useState<string[]>([
    "[SYSTEM] Webhook listener mounted at https://api.sitesafealliance.co.uk/v1/integrations/...",
    "[CRM] HubSpot & Salesforce contact sync workers active (Polling SLA < 200ms)",
    "[CTI] 3CX & Twilio VoIP SIP trunks connected to 0800 999 7483"
  ]);

  const triggerCallSimulation = (callerType: 'individual' | 'corporate_vip') => {
    setSimulatedCaller(callerType);
    setCallState('ringing');
    setScreenPopData(null);
    
    const timestamp = new Date().toLocaleTimeString();
    setWebhookLog(prev => [
      `[${timestamp}] [CTI] Inbound SIP invite received from ${callerType === 'individual' ? '+44 7123 456789' : '+44 20 7946 0912'}...`,
      `[${timestamp}] [DNI] Virtual Tracking Number: 0800 999 7483 (Campaign: UK CITB SMSTS Search)`,
      ...prev
    ]);

    setTimeout(() => {
      setCallState('connected');
      const data = callerType === 'individual' 
        ? {
            caller_name: "David Jenkins",
            caller_role: "Subcontractor / Site Foreman",
            matched_crm_id: "HUB-CT-9841284",
            active_booking: "CITB SMSTS (5-Day Course) - Starts Mon 14 Sep",
            training_centre: "London East Canary Wharf",
            ni_number: "QQ 12 34 56 A",
            citb_id: "CITB-8839210",
            recent_page_views: [
              "/services/citb-smsts (2m ago)",
              "/checkout/individual-step-1 (45s ago)"
            ],
            recommended_agent_action: "Candidate was reviewing Canary Wharf parking options before calling."
          }
        : {
            caller_name: "Marcus Vance (Head of HSE)",
            company_name: "Balfour Construction Group Ltd",
            matched_crm_id: "SF-ACC-8819401",
            account_tier: "Tier-1 Key Client (VIP Queue)",
            active_rfq: "Dedicated 16-Delegate SMSTS Cohort for Battersea Site",
            po_status: "PO-2026-88491 Approved (£7,920 + VAT)",
            credit_limit: "£50,000 (30-Day Terms)",
            recommended_agent_action: "Connect directly to Senior Account Director (Ext 104)."
          };

      setScreenPopData(data);
      setWebhookLog(prev => [
        `[${new Date().toLocaleTimeString()}] [CTI SCREEN-POP] Screen-pop dispatched to Agent Console in 142ms! Matched CRM Record: ${data.matched_crm_id}`,
        ...prev
      ]);
    }, 1500);
  };

  const resetCall = () => {
    setCallState('idle');
    setScreenPopData(null);
  };

  const dispatchTestSms = () => {
    setSmsDispatched(true);
    const timestamp = new Date().toLocaleTimeString();
    setWebhookLog(prev => [
      `[${timestamp}] [SMS GATEWAY] Pre-course reminder SMS dispatched to +44 7123 456789 via EE Telecom Gateway. Status: DELIVERED (200 OK)`,
      ...prev
    ]);
    setTimeout(() => setSmsDispatched(false), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="integrations-simulator-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-800 border border-sky-200 text-xs font-mono mb-2">
            <Cpu className="w-3.5 h-3.5" /> TELEPHONY & CRM INTEGRATION ARCHITECTURE
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            CTI Screen-Pop & Webhook Gateway Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Simulate incoming telephony calls (DNI tracking), instant CRM screen-pops, automated pre-course SMS dispatches, and CITB ATO grant sync.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-medium">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-600" />
            CTI WebSocket: CONNECTED
          </span>
        </div>
      </div>

      {/* Main Grid: CTI Phone Simulator & Agent Screen-Pop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Inbound Telephony Simulator */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-amber-600" />
                Inbound Call Trigger & DNI Engine
              </h2>
              <span className="text-[10px] font-mono text-slate-500 font-medium">0800 999 7483</span>
            </div>

            <p className="text-xs text-slate-600">
              Click a trigger below to simulate a real customer calling the Site Safe Alliance hotline from their phone:
            </p>

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => triggerCallSimulation('individual')}
                disabled={callState === 'ringing'}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left space-y-1 transition-all cursor-pointer group"
                id="simulate-individual-call-btn"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-amber-800 group-hover:text-amber-900">
                    Simulate Inbound: Individual Candidate
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-medium">+44 7123 456789</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  Candidate calling about an upcoming SMSTS booking in Canary Wharf.
                </p>
              </button>

              <button
                onClick={() => triggerCallSimulation('corporate_vip')}
                disabled={callState === 'ringing'}
                className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 text-left space-y-1 transition-all cursor-pointer group"
                id="simulate-corporate-call-btn"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-sky-800 group-hover:text-sky-900">
                    Simulate Inbound: Corporate VIP Client
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-medium">Balfour Group Ltd</span>
                </div>
                <p className="text-[11px] text-slate-600">
                  HSE Director calling regarding a 16-delegate cohort booking for Battersea site.
                </p>
              </button>
            </div>

            {/* Inbound Call State Card */}
            {callState !== 'idle' && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                    <span className="text-xs font-mono font-bold text-amber-900 uppercase">
                      {callState === 'ringing' ? 'Incoming Call Ringing...' : 'Call Connected (Live CTI Screen-Pop)'}
                    </span>
                  </div>
                  <button
                    onClick={resetCall}
                    className="text-[11px] font-mono text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    <RotateCcw className="w-3 h-3" /> Hang up
                  </button>
                </div>
              </div>
            )}

            {/* Test Automated SMS Dispatch */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">Automated SMS Dispatch Tester:</span>
              <button
                onClick={dispatchTestSms}
                className="w-full py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                id="dispatch-sms-test-btn"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dispatch T-48h GPS & Pre-Course SMS</span>
              </button>
              {smsDispatched && (
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-mono">
                  &check; SMS Sent to Candidate: "Site Safe Alliance: Your SMSTS course begins Mon 08:30 at Canary Wharf. Directions: https://maps.ssa.link/CW-01"
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Agent Live CTI Screen-Pop Viewport */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 min-h-[460px] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h2 className="text-sm font-bold text-slate-900">Agent Console & CTI Screen-Pop Window</h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-semibold">
                  Latency: 142ms (&lt;180ms SLA)
                </span>
              </div>

              {screenPopData ? (
                <div className="space-y-4 text-xs animate-in fade-in duration-300">
                  <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{screenPopData.caller_name || screenPopData.company_name}</h3>
                        <p className="text-xs text-slate-600">{screenPopData.caller_role || screenPopData.account_tier}</p>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-mono text-[11px] border border-amber-200 font-bold">
                        {screenPopData.matched_crm_id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200 font-mono">
                      {screenPopData.active_booking && (
                        <div>
                          <span className="text-slate-500 block">Active Booking:</span>
                          <span className="text-slate-800 font-medium">{screenPopData.active_booking}</span>
                        </div>
                      )}
                      {screenPopData.training_centre && (
                        <div>
                          <span className="text-slate-500 block">Training Hub:</span>
                          <span className="text-slate-800 font-medium">{screenPopData.training_centre}</span>
                        </div>
                      )}
                      {screenPopData.citb_id && (
                        <div>
                          <span className="text-slate-500 block">CITB Number:</span>
                          <span className="text-emerald-700 font-bold">{screenPopData.citb_id}</span>
                        </div>
                      )}
                      {screenPopData.po_status && (
                        <div>
                          <span className="text-slate-500 block">Approved PO:</span>
                          <span className="text-emerald-700 font-bold">{screenPopData.po_status}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 space-y-1">
                    <strong className="text-xs font-bold block flex items-center gap-1.5 text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Suggested Agent Script & Context:
                    </strong>
                    <p className="text-[11px] leading-relaxed text-amber-900/90">
                      {screenPopData.recommended_agent_action}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-16 text-center text-slate-400 space-y-2">
                  <PhoneCall className="w-8 h-8 mx-auto text-slate-300 animate-pulse" />
                  <p className="text-xs font-mono text-slate-600">Awaiting simulated inbound call to trigger live CTI screen-pop...</p>
                  <p className="text-[11px] text-slate-400">Click a caller trigger on the left to test</p>
                </div>
              )}
            </div>

            {/* Live Webhook Log Stream */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">Live Integration Event Stream:</span>
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300 max-h-28 overflow-y-auto space-y-1">
                {webhookLog.map((log, i) => (
                  <div key={i} className="text-slate-200">{log}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
