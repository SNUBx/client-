import React, { useState } from 'react';
import { INDIVIDUAL_BOOKING_FIELDS, EMPLOYER_BOOKING_FIELDS } from '../data/scopeData';
import { DelegateCandidate } from '../types';
import { 
  FormInput, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  User, 
  Building2, 
  Code, 
  Plus, 
  Trash2, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const FormsSchemaPlayground: React.FC = () => {
  const [activeFormType, setActiveFormType] = useState<'individual' | 'employer'>('individual');
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Individual Form Live State
  const [indivState, setIndivState] = useState({
    courseId: 'smsts-5day',
    deliveryMode: 'classroom',
    trainingDate: '2026-09-14',
    candidateFirstName: 'David',
    candidateLastName: 'Jenkins',
    candidateDob: '1988-04-19',
    candidateNiNumber: 'QQ123456A',
    candidateEmail: 'david.jenkins@example.co.uk',
    candidatePhone: '07123456789',
    citbRegNumber: 'CITB-8839210',
    addressLine1: '42 Highfield Road',
    city: 'London',
    postcode: 'EC2A 4NE',
    emergencyContactName: 'Sarah Jenkins',
    emergencyContactPhone: '07987654321',
    photoIdType: 'passport',
    gdprConsent: true
  });

  // Employer Form Live State
  const [employerState, setEmployerState] = useState({
    companyName: 'Balfour Construction Group Ltd',
    companyNumber: '08931245',
    vatNumber: 'GB 992 8410 12',
    accountsContactEmail: 'invoices@balfourgroup.co.uk',
    safetyManagerName: 'Marcus Vance',
    safetyManagerEmail: 'm.vance@balfourgroup.co.uk',
    safetyManagerPhone: '020 7946 0912',
    courseId: 'corporate-smsts-cohort',
    preferredLocationType: 'client_premises',
    siteAddress: 'Battersea Power Station Development, London SW11 8BZ',
    poNumber: 'PO-2026-88491',
    paymentTerms: '30_day_credit',
    siteAccessPpeNotes: 'Standard 5-Point PPE (High Vis, Hardhat with chin strap, Steel Toe Boots, Eye protection, Gloves).'
  });

  const [delegates, setDelegates] = useState<DelegateCandidate[]>([
    { id: '1', firstName: 'Mark', lastName: 'Taylor', dob: '1985-06-12', nationalInsurance: 'NR829104B', email: 'm.taylor@balfourgroup.co.uk', phone: '07700900123', citbNumber: 'CITB-1092841' },
    { id: '2', firstName: 'Sean', lastName: 'O\'Connor', dob: '1990-11-23', nationalInsurance: 'PL449210C', email: 's.oconnor@balfourgroup.co.uk', phone: '07700900456', citbNumber: 'CITB-3910245' }
  ]);

  // Validation Checkers
  const validateNi = (ni: string) => {
    const niRegex = /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/;
    return niRegex.test(ni.trim());
  };

  const validateUkPhone = (phone: string) => {
    const phoneRegex = /^(?:0|\+?44)(?:\d\s?){9,10}$/;
    return phoneRegex.test(phone.trim().replace(/\s+/g, ''));
  };

  const isNiValid = validateNi(indivState.candidateNiNumber);
  const isPhoneValid = validateUkPhone(indivState.candidatePhone);

  const currentPayload = activeFormType === 'individual' 
    ? {
        form_schema_version: "2.1.0",
        submission_timestamp: new Date().toISOString(),
        booking_type: "individual_candidate",
        candidate: {
          first_name: indivState.candidateFirstName,
          last_name: indivState.candidateLastName,
          date_of_birth: indivState.candidateDob,
          national_insurance: indivState.candidateNiNumber,
          email: indivState.candidateEmail,
          phone: indivState.candidatePhone,
          citb_registration_id: indivState.citbRegNumber || null,
          photo_id_document: indivState.photoIdType
        },
        course_booking: {
          course_sku: indivState.courseId,
          delivery_mode: indivState.deliveryMode,
          start_date: indivState.trainingDate,
          centre_location: "London East Canary Wharf",
          amount_gbp: 495.00,
          vat_gbp: 99.00
        },
        crm_sync_parameters: {
          hubspot_pipeline_stage: "booked_awaiting_citb_upload",
          salesforce_campaign_id: "7014W0000019xyz",
          sms_reminder_trigger: true
        }
      }
    : {
        form_schema_version: "2.1.0",
        submission_timestamp: new Date().toISOString(),
        booking_type: "corporate_employer_cohort",
        employer: {
          company_legal_name: employerState.companyName,
          companies_house_reg: employerState.companyNumber,
          vat_number: employerState.vatNumber,
          invoicing_email: employerState.accountsContactEmail,
          po_number: employerState.poNumber,
          payment_terms: employerState.paymentTerms
        },
        hse_coordinator: {
          name: employerState.safetyManagerName,
          email: employerState.safetyManagerEmail,
          phone: employerState.safetyManagerPhone
        },
        delivery_parameters: {
          location_mode: employerState.preferredLocationType,
          site_address: employerState.siteAddress,
          ppe_instructions: employerState.siteAccessPpeNotes
        },
        delegate_roster_count: delegates.length,
        delegate_candidates: delegates.map(d => ({
          first_name: d.firstName,
          last_name: d.lastName,
          dob: d.dob,
          national_insurance: d.nationalInsurance,
          email: d.email,
          phone: d.phone,
          citb_id: d.citbNumber
        })),
        crm_sync_parameters: {
          hubspot_deal_amount: delegates.length * 495.00,
          account_tier: "Tier-1 Corporate",
          instant_credit_check_passed: true
        }
      };

  const copyPayload = () => {
    navigator.clipboard.writeText(JSON.stringify(currentPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const addDelegate = () => {
    const newId = (delegates.length + 1).toString();
    setDelegates([...delegates, {
      id: newId,
      firstName: '',
      lastName: '',
      dob: '',
      nationalInsurance: '',
      email: '',
      phone: '',
      citbNumber: ''
    }]);
  };

  const removeDelegate = (id: string) => {
    if (delegates.length <= 1) return;
    setDelegates(delegates.filter(d => d.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="forms-schema-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono mb-2">
            <FormInput className="w-3.5 h-3.5" /> FORM FIELD REQUIREMENTS & LIVE VALIDATOR
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Booking Form Schemas & Field Mappings
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Validate individual candidate NI/CITB fields and employer corporate multi-delegate rosters against live CRM schemas.
          </p>
        </div>

        {/* Form Type Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
          <button
            onClick={() => setActiveFormType('individual')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeFormType === 'individual'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4 text-amber-600" />
            <span>Individual Form</span>
          </button>
          <button
            onClick={() => setActiveFormType('employer')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeFormType === 'employer'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4 text-sky-600" />
            <span>Employer / Corporate</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Interactive Form Tester */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                {activeFormType === 'individual' ? (
                  <>
                    <User className="w-4 h-4 text-amber-600" />
                    Individual Candidate Form Validator
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 text-sky-600" />
                    Employer Multi-Delegate Form Validator
                  </>
                )}
              </h2>
              <span className="text-[11px] font-mono text-slate-500">
                Live State Tracking
              </span>
            </div>

            {/* INDIVIDUAL FORM FIELDS */}
            {activeFormType === 'individual' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">First Name (Legal ID) *</label>
                    <input
                      type="text"
                      value={indivState.candidateFirstName}
                      onChange={(e) => setIndivState({ ...indivState, candidateFirstName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Last Name (Legal ID) *</label>
                    <input
                      type="text"
                      value={indivState.candidateLastName}
                      onChange={(e) => setIndivState({ ...indivState, candidateLastName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-semibold">National Insurance (NI) Number *</label>
                      <span className={`text-[10px] font-mono flex items-center gap-1 ${isNiValid ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}`}>
                        {isNiValid ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {isNiValid ? 'Valid UK NI' : 'Invalid Regex'}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={indivState.candidateNiNumber}
                      onChange={(e) => setIndivState({ ...indivState, candidateNiNumber: e.target.value.toUpperCase() })}
                      className={`w-full px-3 py-2 bg-slate-50 border rounded-lg text-slate-800 font-mono focus:bg-white focus:outline-none transition-colors ${
                        isNiValid ? 'border-emerald-400 focus:border-emerald-500' : 'border-rose-300 focus:border-rose-500'
                      }`}
                      placeholder="e.g. QQ123456A"
                    />
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">Regex: ^[A-CEGHJ-PR-TW-Z]&#123;1&#125;...</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-slate-700 font-semibold">UK Mobile Telephone *</label>
                      <span className={`text-[10px] font-mono flex items-center gap-1 ${isPhoneValid ? 'text-emerald-600 font-semibold' : 'text-amber-600 font-semibold'}`}>
                        {isPhoneValid ? 'Valid UK Tel' : 'Format Check'}
                      </span>
                    </div>
                    <input
                      type="tel"
                      value={indivState.candidatePhone}
                      onChange={(e) => setIndivState({ ...indivState, candidatePhone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="07123 456789"
                    />
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">Used for DNI Inbound CTI sync</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">CITB Registration ID (Optional)</label>
                    <input
                      type="text"
                      value={indivState.citbRegNumber}
                      onChange={(e) => setIndivState({ ...indivState, citbRegNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-amber-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Photo ID Document Type *</label>
                    <select
                      value={indivState.photoIdType}
                      onChange={(e) => setIndivState({ ...indivState, photoIdType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-amber-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="passport">Valid UK / International Passport</option>
                      <option value="driving_licence">UK Photocard Driving Licence</option>
                      <option value="citb_cscs">Existing CSCS Smart Card</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* EMPLOYER FORM FIELDS */}
            {activeFormType === 'employer' && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Company Legal Name *</label>
                    <input
                      type="text"
                      value={employerState.companyName}
                      onChange={(e) => setEmployerState({ ...employerState, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Companies House Reg No. *</label>
                    <input
                      type="text"
                      value={employerState.companyNumber}
                      onChange={(e) => setEmployerState({ ...employerState, companyNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Purchase Order (PO) Number *</label>
                    <input
                      type="text"
                      value={employerState.poNumber}
                      onChange={(e) => setEmployerState({ ...employerState, poNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-mono focus:bg-white focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 mb-1 font-semibold">Delivery Location Mode *</label>
                    <select
                      value={employerState.preferredLocationType}
                      onChange={(e) => setEmployerState({ ...employerState, preferredLocationType: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:border-sky-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="client_premises">Client Construction Site (On-Site Instructor)</option>
                      <option value="ssa_centre">Site Safe Alliance Regional Hub</option>
                      <option value="remote_virtual">Live Virtual Zoom Invigilated</option>
                    </select>
                  </div>
                </div>

                {/* Delegate Roster Builder */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 flex items-center gap-1.5">
                      Multi-Delegate Roster ({delegates.length} Registered)
                    </span>
                    <button
                      type="button"
                      onClick={addDelegate}
                      className="px-2.5 py-1 rounded bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 flex items-center gap-1 font-mono text-[11px] font-semibold cursor-pointer transition-all"
                    >
                      <Plus className="w-3 h-3" />
                      Add Candidate Row
                    </button>
                  </div>

                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {delegates.map((del, idx) => (
                      <div key={del.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs">
                        <span className="font-mono text-slate-400 text-[10px]">#{idx + 1}</span>
                        <input
                          type="text"
                          placeholder="Name"
                          value={`${del.firstName} ${del.lastName}`}
                          onChange={(e) => {
                            const [f, ...l] = e.target.value.split(' ');
                            const updated = [...delegates];
                            updated[idx].firstName = f || '';
                            updated[idx].lastName = l.join(' ') || '';
                            setDelegates(updated);
                          }}
                          className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-xs w-32 focus:border-sky-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="NI Number"
                          value={del.nationalInsurance}
                          onChange={(e) => {
                            const updated = [...delegates];
                            updated[idx].nationalInsurance = e.target.value.toUpperCase();
                            setDelegates(updated);
                          }}
                          className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 font-mono text-xs w-28 focus:border-sky-500 focus:outline-none"
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={del.email}
                          onChange={(e) => {
                            const updated = [...delegates];
                            updated[idx].email = e.target.value;
                            setDelegates(updated);
                          }}
                          className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-800 text-xs flex-1 focus:border-sky-500 focus:outline-none"
                        />
                        {delegates.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDelegate(del.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 5 Cols: Live JSON Payload & CRM Mapping Stream */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-4 flex flex-col justify-between h-full">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-700 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5" /> LIVE CRM / WEBHOOK PAYLOAD
                </span>
                <button
                  onClick={copyPayload}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono flex items-center gap-1 transition-all cursor-pointer border border-slate-200"
                >
                  {copiedPayload ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedPayload ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>

              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 font-mono text-[11px] overflow-x-auto max-h-[420px] leading-relaxed">
                {JSON.stringify(currentPayload, null, 2)}
              </pre>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] space-y-1.5">
              <span className="text-slate-500 font-mono uppercase text-[10px] font-semibold block">CRM Routing Destination:</span>
              <div className="flex items-center justify-between text-slate-700">
                <span>HubSpot / Salesforce Pipeline:</span>
                <span className="text-emerald-700 font-mono font-bold">Deal: Booked & Paid</span>
              </div>
              <div className="flex items-center justify-between text-slate-700">
                <span>CITB ATO Auto-Grant Queue:</span>
                <span className="text-amber-700 font-mono font-bold">Grant £240/candidate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
