import React, { useState } from 'react';
import { PrototypePage, DelegateCandidate } from '../types';
import { SiteSafeLogo } from './shared/SiteSafeLogo';
import { FOUR_CORE_SERVICES } from '../data/scopeData';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  PhoneCall, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Users, 
  User, 
  Award, 
  ChevronRight, 
  ArrowRight, 
  Building2, 
  Smartphone, 
  Laptop, 
  Tablet, 
  Search, 
  Sparkles,
  FileCheck,
  CreditCard,
  Plus,
  Trash2,
  Send,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

interface PrototypeViewerProps {
  initialPage?: PrototypePage;
}

export const PrototypeViewer: React.FC<PrototypeViewerProps> = ({ initialPage = 'home' }) => {
  const [currentPage, setCurrentPage] = useState<PrototypePage>(initialPage);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  
  // Individual Booking State
  const [indivForm, setIndivForm] = useState({
    course: 'green-labourer-pkg',
    delivery: 'classroom',
    date: '2026-09-14',
    location: 'London East (Canary Wharf Hub)',
    firstName: 'David',
    lastName: 'Jenkins',
    dob: '1988-04-19',
    niNumber: 'QQ123456A',
    email: 'david.jenkins@example.co.uk',
    phone: '07123456789',
    citbId: 'CITB-8839210',
    address: '42 Highfield Road, London',
    postcode: 'EC2A 4NE',
    emergencyName: 'Sarah Jenkins (Spouse)',
    emergencyPhone: '07987654321',
    photoId: 'passport',
    gdpr: true,
  });

  const getCoursePriceLabel = (courseKey: string) => {
    switch (courseKey) {
      case 'citb-hse-test': return '£50 incl. VAT';
      case 'cscs-card-app': return '£65 incl. VAT';
      case 'l1-hs-course': return '£200 incl. VAT';
      case 'green-labourer-pkg': return '£320 incl. VAT';
      case 'smsts-5day': return '£495 + VAT';
      case 'sssts-2day': return '£260 + VAT';
      case 'hsa-1day': return '£125 + VAT';
      case 'medical-safety-critical': return '£140 + VAT';
      default: return '£320 incl. VAT';
    }
  };

  // Employer Booking State
  const [employerForm, setEmployerForm] = useState({
    companyName: 'Balfour Construction Group Ltd',
    companyNumber: '08931245',
    vatNumber: 'GB 992 8410 12',
    accountsEmail: 'invoices@balfourgroup.co.uk',
    coordinatorName: 'Marcus Vance',
    coordinatorEmail: 'm.vance@balfourgroup.co.uk',
    coordinatorPhone: '020 7946 0912',
    coursePackage: 'corporate-smsts-cohort',
    locationType: 'client_premises',
    siteAddress: 'Battersea Power Station Project Phase 3, London SW11 8BZ',
    poNumber: 'PO-2026-88491',
    paymentTerms: '30_day_credit',
    ppeNotes: '5-point PPE required (High-Vis Orange, Hard Hat with chin strap, Steel Toe Boots, Safety Glasses, Gloves). Gate pass will be issued at main security lodge.',
  });

  const [delegates, setDelegates] = useState<DelegateCandidate[]>([
    { id: '1', firstName: 'Mark', lastName: 'Taylor', dob: '1985-06-12', nationalInsurance: 'NR829104B', email: 'm.taylor@balfourgroup.co.uk', phone: '07700900123', citbNumber: 'CITB-1092841' },
    { id: '2', firstName: 'Sean', lastName: 'O\'Connor', dob: '1990-11-23', nationalInsurance: 'PL449210C', email: 's.oconnor@balfourgroup.co.uk', phone: '07700900456', citbNumber: 'CITB-3910245' },
    { id: '3', firstName: 'Gary', lastName: 'Davies', dob: '1979-02-18', nationalInsurance: 'JK991204A', email: 'g.davies@balfourgroup.co.uk', phone: '07700900789', citbNumber: 'CITB-5829102' }
  ]);

  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const addDelegateRow = () => {
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

  const removeDelegateRow = (id: string) => {
    if (delegates.length <= 1) return;
    setDelegates(delegates.filter(d => d.id !== id));
  };

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    setBookingSuccess(`Individual booking confirmed! Candidate: ${indivForm.firstName} ${indivForm.lastName} enrolled in CITB course. Booking Ref: SSA-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 100, spread: 90, origin: { y: 0.6 } });
    setBookingSuccess(`Corporate cohort booking received for ${employerForm.companyName} (${delegates.length} delegates registered). PO ${employerForm.poNumber} verified. Booking Ref: CORP-SSA-${Math.floor(100000 + Math.random() * 900000)}`);
  };

  // Viewport container width styling
  const viewportWidthClass = {
    desktop: 'w-full max-w-6xl',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]'
  }[viewportMode];

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 py-6 space-y-6" id="prototype-container-root">
      {/* Top Prototype Controls Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-mono text-amber-800 font-bold flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded border border-amber-200 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            LIVE REDESIGN PROTOTYPE
          </span>
          <span className="text-slate-600 hidden sm:inline font-mono">
            Simulating <code className="text-slate-900 font-semibold">https://sitesafealliance.co.uk</code>
          </span>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 font-mono text-xs transition-all cursor-pointer ${
              viewportMode === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Desktop Mode (1280px+)"
            id="viewport-desktop-btn"
          >
            <Laptop className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Desktop (1440px)</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 font-mono text-xs transition-all cursor-pointer ${
              viewportMode === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Tablet Mode (768px)"
            id="viewport-tablet-btn"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Tablet (768px)</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`px-2.5 py-1 rounded flex items-center gap-1 font-mono text-xs transition-all cursor-pointer ${
              viewportMode === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Mobile Mode (375px)"
            id="viewport-mobile-btn"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Quick Page Jumper */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {(['home', 'services', 'about', 'contact', 'individual-booking', 'employer-booking'] as PrototypePage[]).map((page) => (
            <button
              key={page}
              onClick={() => { setCurrentPage(page); setBookingSuccess(null); }}
              className={`px-2.5 py-1 rounded text-[11px] font-medium capitalize transition-all cursor-pointer ${
                currentPage === page 
                  ? 'bg-slate-900 text-white font-semibold shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-50 border border-slate-200'
              }`}
            >
              {page.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Browser Frame */}
      <div className="flex justify-center transition-all duration-300">
        <div className={`${viewportWidthClass} bg-slate-950 rounded-2xl border-2 border-slate-300/80 shadow-xl overflow-hidden flex flex-col min-h-[750px] transition-all`}>
          {/* Simulated Browser URL bar */}
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 max-w-lg bg-white px-3 py-1 rounded-md border border-slate-200 text-[11px] font-mono text-slate-800 flex items-center justify-between shadow-xs">
              <span className="flex items-center gap-1.5">
                <span className="text-emerald-600 font-semibold">https://</span>sitesafealliance.co.uk/{currentPage !== 'home' ? currentPage : ''}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">SSL 256-Bit</span>
            </div>
            <div className="text-[11px] font-mono text-[#263B52] font-semibold hidden sm:block bg-[#78A6B8]/15 px-2 py-0.5 rounded">
              Aircall: +44 20 3608 4780
            </div>
          </div>

          {/* Prototype Site Header */}
          <header className="bg-slate-900/90 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between relative">
            <div 
              className="cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              <SiteSafeLogo variant="horizontal" size={viewportMode === 'mobile' ? 'sm' : 'md'} showTagline={viewportMode !== 'mobile'} />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <button 
                onClick={() => setCurrentPage('home')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'home' ? 'text-amber-400' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => setCurrentPage('services')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'services' ? 'text-amber-400' : ''}`}
              >
                Services & Courses
              </button>
              <button 
                onClick={() => setCurrentPage('about')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'about' ? 'text-amber-400' : ''}`}
              >
                About
              </button>
              <button 
                onClick={() => setCurrentPage('contact')}
                className={`hover:text-amber-400 transition-colors ${currentPage === 'contact' ? 'text-amber-400' : ''}`}
              >
                Contact
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('individual-booking')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                id="header-book-individual-btn"
              >
                <User className="w-3.5 h-3.5" />
                <span>Book Individual</span>
              </button>
              <button
                onClick={() => setCurrentPage('employer-booking')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-all cursor-pointer"
                id="header-book-employer-btn"
              >
                <Building2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Employer / Group</span>
              </button>

              {/* Mobile hamburger button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300"
                id="mobile-nav-toggle-btn"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </header>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-3 text-xs">
              <div className="flex flex-col space-y-2">
                <button onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }} className="text-left py-1 text-slate-200 font-medium">Home</button>
                <button onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }} className="text-left py-1 text-slate-200 font-medium">Services & CITB Courses</button>
                <button onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }} className="text-left py-1 text-slate-200 font-medium">About Site Safe Alliance</button>
                <button onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }} className="text-left py-1 text-slate-200 font-medium">Contact & Centres</button>
              </div>
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button onClick={() => { setCurrentPage('individual-booking'); setMobileMenuOpen(false); }} className="w-full py-2 rounded bg-amber-500 text-slate-950 font-bold text-center">Book Individual Candidate</button>
                <button onClick={() => { setCurrentPage('employer-booking'); setMobileMenuOpen(false); }} className="w-full py-2 rounded bg-slate-800 text-slate-200 font-semibold text-center border border-slate-700">Book Employer Group</button>
                <a href="tel:+442036084780" className="w-full py-2 rounded bg-emerald-500/10 text-emerald-400 font-mono text-center border border-emerald-500/20 flex items-center justify-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5" /> +44 20 3608 4780 (Aircall 24/7)
                </a>
              </div>
            </div>
          )}

          {/* Success Banner */}
          {bookingSuccess && (
            <div className="bg-emerald-500/10 border-b border-emerald-500/30 p-4 text-emerald-300 text-xs flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{bookingSuccess}</span>
              </div>
              <button 
                onClick={() => setBookingSuccess(null)}
                className="text-emerald-400 hover:text-emerald-200 font-mono"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Prototype Pages Content */}
          <main className="flex-1 bg-slate-950 text-slate-100 overflow-y-auto">
            {/* PAGE 1: HOME */}
            {currentPage === 'home' && (
              <div className="space-y-10 pb-12">
                {/* Hero Section */}
                <div className="relative p-6 sm:p-12 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
                  <div className="max-w-3xl space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs">
                      <Award className="w-3.5 h-3.5" />
                      <span>OFFICIAL UK CITB APPROVED TRAINING ORGANISATION (ATO)</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                      UK Health & Safety Qualifications, Medicals & Compliance.
                    </h1>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      Instant accredited booking for CITB SMSTS, SSSTS, CSCS Green Card, and Safety-Critical Worker Medicals across 12 nationwide training centres and live virtual classrooms.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => setCurrentPage('individual-booking')}
                        className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
                      >
                        <User className="w-4 h-4" />
                        <span>Book Candidate Place</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setCurrentPage('employer-booking')}
                        className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 flex items-center gap-2 cursor-pointer"
                      >
                        <Building2 className="w-4 h-4 text-sky-400" />
                        <span>Corporate Cohort / PO</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Accreditations Ribbon */}
                <div className="px-6">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5 text-slate-200 font-bold"><ShieldCheck className="w-4 h-4 text-amber-400" /> CITB ATO #9841</span>
                    <span className="flex items-center gap-1.5 text-slate-200 font-bold"><FileCheck className="w-4 h-4 text-sky-400" /> IOSH Approved</span>
                    <span className="flex items-center gap-1.5 text-slate-200 font-bold"><Award className="w-4 h-4 text-emerald-400" /> SEQOHS Medicals</span>
                    <span className="flex items-center gap-1.5 text-slate-200 font-bold"><ShieldCheck className="w-4 h-4 text-purple-400" /> ISO 9001 Quality</span>
                  </div>
                </div>

                {/* Core Services Grid */}
                <div className="px-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#78A6B8] uppercase font-bold tracking-wide mb-0.5">
                        <Sparkles className="w-3.5 h-3.5" /> Core Services & Statutory Qualifications
                      </div>
                      <h2 className="text-xl font-bold text-white">Accredited CITB & CSCS Certification</h2>
                      <p className="text-xs text-slate-400">All prices include VAT with instant booking and direct CITB ATO registration</p>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('services')}
                      className="text-xs font-mono text-[#78A6B8] hover:underline flex items-center gap-1"
                    >
                      Explore All Courses &rarr;
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FOUR_CORE_SERVICES.map((srv) => (
                      <div 
                        key={srv.code} 
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-[#78A6B8]/60 transition-all flex flex-col justify-between space-y-3 group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#263B52] text-[#9BC1CF] border border-[#78A6B8]/30">
                              {srv.code}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#78A6B8]" /> {srv.duration}
                            </span>
                          </div>
                          <h3 className="text-sm font-bold text-white group-hover:text-[#9BC1CF] transition-colors leading-snug">
                            {srv.title}
                          </h3>
                          <p className="text-[11px] text-slate-400 line-clamp-2">
                            {srv.description}
                          </p>
                        </div>
                        
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-base font-extrabold text-[#78A6B8] font-mono block">
                              {srv.priceLabel}
                            </span>
                            <span className="text-[9px] font-mono text-slate-400">Fixed Fee</span>
                          </div>
                          <button
                            onClick={() => {
                              setIndivForm({ ...indivForm, course: srv.code.toLowerCase().replace(/_/g, '-') });
                              setCurrentPage('individual-booking');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white border border-[#78A6B8]/40 font-bold text-xs cursor-pointer transition-all shadow-xs"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 2: SERVICES */}
            {currentPage === 'services' && (
              <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">Accredited Services & Qualifications</h1>
                    <p className="text-xs text-slate-400 mt-0.5">Filter by course accreditation, duration, or delivery method</p>
                  </div>
                  <div className="w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Search courses (e.g. SMSTS, Medical)..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'citb-hse-test', name: 'CITB Health, Safety & Environment Test', duration: '45 Mins', price: '£50 incl. VAT', cert: 'Pearson VUE / CITB', desc: 'Official CITB touchscreen test required before applying for any new or renewal CSCS card across 150+ UK Pearson centres.' },
                    { id: 'cscs-card-app', name: 'CSCS Card Application', duration: '24-48h Express', price: '£65 incl. VAT', cert: 'Official CSCS Partner', desc: 'Official card application and verification processing. Instant digital smart card access and NFC card postal dispatch.' },
                    { id: 'l1-hs-course', name: 'Level 1 Health & Safety in a Construction Environment Course', duration: '1 Day', price: '£200 incl. VAT', cert: 'CITB ATO / Ofqual Lifetime', desc: 'Accredited 1-day course providing the mandatory lifetime qualification for the 5-Year Green CSCS Labourer Card.' },
                    { id: 'green-labourer-pkg', name: 'Green Labourer Card Package', duration: 'Complete Route', price: '£320 incl. VAT', cert: 'All-In-One Solution', desc: 'Complete package: Level 1 H&S Course + CITB HS&E Touchscreen Test + Official 5-Year Green CSCS Card with guaranteed pass support.' },
                    { id: 'smsts-5day', name: 'CITB SMSTS (Site Management Safety)', duration: '5 Days', price: '£495 + VAT', cert: 'CITB Site Safety Plus', desc: 'Mandatory certification for site managers on Tier-1 and Major Contractors Group (MCG) sites.' },
                    { id: 'sssts-2day', name: 'CITB SSSTS (Site Supervisor Safety)', duration: '2 Days', price: '£260 + VAT', cert: 'CITB Site Safety Plus', desc: 'Covers health & safety law, risk assessments, behavioral safety, and toolbox talks.' },
                    { id: 'medical-safety-critical', name: 'Safety Critical Worker Medicals', duration: '45 Mins', price: '£140 + VAT', cert: 'SEQOHS / CBH Compliant', desc: 'Audiometry, spirometry, eyesight, musculoskeletal check, and Fit to Work certificate.' },
                    { id: 'firstaid', name: 'First Aid at Work (FAW 3-Day)', duration: '3 Days', price: '£220 + VAT', cert: 'HSE / Qualsafe Accredited', desc: 'Comprehensive first responder qualification for high-risk construction workplaces.' }
                  ]
                    .filter(c => c.name.toLowerCase().includes(searchFilter.toLowerCase()) || c.desc.toLowerCase().includes(searchFilter.toLowerCase()))
                    .map(course => (
                      <div key={course.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-[#78A6B8]/50 transition-all">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-mono text-[#9BC1CF] bg-[#263B52] px-2 py-0.5 rounded border border-[#78A6B8]/30">{course.cert}</span>
                            <span className="font-mono text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3 text-[#78A6B8]" /> {course.duration}</span>
                          </div>
                          <h3 className="text-base font-bold text-white">{course.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{course.desc}</p>
                        </div>
                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                          <span className="text-lg font-bold text-[#78A6B8] font-mono">{course.price}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setIndivForm({ ...indivForm, course: course.id });
                                setCurrentPage('individual-booking');
                              }}
                              className="px-3 py-1.5 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white border border-[#78A6B8]/40 font-bold text-xs cursor-pointer transition-all"
                            >
                              Book Place
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* PAGE 3: ABOUT */}
            {currentPage === 'about' && (
              <div className="p-6 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
                    <ShieldCheck className="w-4 h-4" /> ABOUT SITE SAFE ALLIANCE
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Zero-Harm Workforce Compliance for the UK Construction Sector.
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Site Safe Alliance is a premier UK training and occupational health coalition operating 12 regional centres across England, Scotland, and Wales. We partner with Tier-1 main contractors, specialist sub-contractors, and individual tradespeople to ensure every operative arrives on site safely certified.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="text-2xl font-extrabold text-amber-400 font-mono">45,000+</div>
                    <div className="text-xs text-slate-300 font-medium">Delegates Certified Annually</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="text-2xl font-extrabold text-emerald-400 font-mono">98.6%</div>
                    <div className="text-xs text-slate-300 font-medium">First-Time Exam Pass Rate</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1">
                    <div className="text-2xl font-extrabold text-sky-400 font-mono">12 Hubs</div>
                    <div className="text-xs text-slate-300 font-medium">UK Nationwide Training Centres</div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                  <h3 className="text-base font-bold text-white">CITB Approved Training Organisation (ATO) Standards</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    As an official CITB ATO, Site Safe Alliance directly triggers automatic CITB grant payments (e.g. £240 per SMSTS candidate, £140 per SSSTS candidate) straight to eligible levy-paying employers within 48 hours of course completion.
                  </p>
                </div>
              </div>
            )}

            {/* PAGE 4: CONTACT */}
            {currentPage === 'contact' && (
              <div className="p-6 space-y-6">
                <div className="border-b border-slate-800 pb-3">
                  <h1 className="text-2xl font-bold text-white">Contact & Regional Training Centres</h1>
                  <p className="text-xs text-slate-400 mt-0.5">24/7 centralized booking desk and regional venue network</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Contact Info & Hotlines */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-[#78A6B8]" />
                        National Aircall Booking Hotlines
                      </h3>
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-300">Central Aircall Telephony:</span>
                          <a href="tel:+442036084780" className="font-mono text-[#78A6B8] font-bold hover:underline">+44 20 3608 4780</a>
                        </div>
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-300">Corporate Smartflow Routing:</span>
                          <span className="font-mono text-slate-300 font-semibold">+44 20 3608 4780 (Opt. 4)</span>
                        </div>
                        <div className="p-2.5 rounded bg-slate-950 border border-slate-800 flex justify-between items-center">
                          <span className="text-slate-300">Email Enquiries:</span>
                          <span className="font-mono text-slate-200">bookings@sitesafealliance.co.uk</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        Flagship Training Centres
                      </h3>
                      <p className="text-slate-400 text-[11px]">
                        <strong>London Central:</strong> 25 Canada Square, Canary Wharf, London E14 5LB<br/>
                        <strong>Midlands Hub:</strong> Fort Dunlop, Fort Parkway, Birmingham B24 9FD<br/>
                        <strong>North West Hub:</strong> MediaCityUK, Salford Quays, Manchester M50 2EQ
                      </p>
                    </div>
                  </div>

                  {/* Fast Contact / Callback Form */}
                  <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <h3 className="text-sm font-bold text-white">Request Priority Callback</h3>
                    <form onSubmit={(e) => { e.preventDefault(); setBookingSuccess("Thank you! A senior booking coordinator will call you back within 15 minutes."); }} className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-300 mb-1">Your Name</label>
                        <input type="text" required placeholder="e.g. Marcus Vance" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500" />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Phone Number</label>
                        <input type="tel" required placeholder="e.g. 07123 456789" className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500" />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1">Enquiry Type</label>
                        <select className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-amber-500">
                          <option>Candidate Course Booking Enquiry</option>
                          <option>Corporate On-Site Training Cohort</option>
                          <option>Safety Critical Medicals (Day Rate)</option>
                          <option>Verify Delegate Certificate</option>
                        </select>
                      </div>
                      <button type="submit" className="w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-all flex items-center justify-center gap-2 cursor-pointer">
                        <Send className="w-3.5 h-3.5" />
                        <span>Request 15-Min Callback</span>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {/* PAGE 5: INDIVIDUAL CANDIDATE BOOKING FLOW */}
            {currentPage === 'individual-booking' && (
              <div className="p-6 space-y-6">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                      <User className="w-5 h-5 text-amber-400" />
                      Individual Candidate Enrollment Form
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">Direct entry into CITB ATO database & immediate registration</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                    Step 1 of 1: Instant Checkout
                  </span>
                </div>

                <form onSubmit={handleIndividualSubmit} className="space-y-6 text-xs" id="indiv-booking-form-prototype">
                  {/* Step 1: Course & Location */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-amber-400" /> 1. Course Selection & Delivery Mode
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Selected Course *</label>
                        <select
                          value={indivForm.course}
                          onChange={(e) => setIndivForm({ ...indivForm, course: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono text-xs focus:border-[#78A6B8]"
                        >
                          <option value="green-labourer-pkg">Green Labourer Card Package - £320 incl. VAT</option>
                          <option value="citb-hse-test">CITB Health, Safety & Environment Test - £50 incl. VAT</option>
                          <option value="cscs-card-app">CSCS Card Application - £65 incl. VAT</option>
                          <option value="l1-hs-course">Level 1 Health & Safety in a Construction Environment Course - £200 incl. VAT</option>
                          <option value="smsts-5day">CITB SMSTS (5 Days) - £495 + VAT</option>
                          <option value="sssts-2day">CITB SSSTS (2 Days) - £260 + VAT</option>
                          <option value="medical-safety-critical">Safety Critical Medical (Fit2Work) - £140 + VAT</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Delivery Format *</label>
                        <select
                          value={indivForm.delivery}
                          onChange={(e) => setIndivForm({ ...indivForm, delivery: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 text-xs focus:border-amber-500"
                        >
                          <option value="classroom">Classroom Training Centre (Canary Wharf / Midlands / Manchester)</option>
                          <option value="remote_zoom">Virtual Live Online Classroom (CITB Zoom Invigilated)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Candidate ID Details (CITB Mandatory) */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-sky-400" /> 2. Candidate Legal Details (As per Photo ID)
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">First Name *</label>
                        <input
                          type="text"
                          required
                          value={indivForm.firstName}
                          onChange={(e) => setIndivForm({ ...indivForm, firstName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={indivForm.lastName}
                          onChange={(e) => setIndivForm({ ...indivForm, lastName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Date of Birth (CITB Requirement) *</label>
                        <input
                          type="date"
                          required
                          value={indivForm.dob}
                          onChange={(e) => setIndivForm({ ...indivForm, dob: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">National Insurance Number *</label>
                        <input
                          type="text"
                          required
                          value={indivForm.niNumber}
                          onChange={(e) => setIndivForm({ ...indivForm, niNumber: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Candidate Email *</label>
                        <input
                          type="email"
                          required
                          value={indivForm.email}
                          onChange={(e) => setIndivForm({ ...indivForm, email: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Mobile Phone (For SMS Pin) *</label>
                        <input
                          type="tel"
                          required
                          value={indivForm.phone}
                          onChange={(e) => setIndivForm({ ...indivForm, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:border-amber-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Photo ID & Compliance */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> 3. Verification & Mandatory Consent
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Declared Photo ID Document *</label>
                        <select
                          value={indivForm.photoId}
                          onChange={(e) => setIndivForm({ ...indivForm, photoId: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-amber-500"
                        >
                          <option value="passport">Valid UK / International Passport</option>
                          <option value="driving_licence">UK Photocard Driving Licence</option>
                          <option value="citb_cscs">Existing CSCS Smart Card</option>
                        </select>
                      </div>

                      <div className="flex items-center">
                        <label className="flex items-start gap-2 text-slate-300 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={indivForm.gdpr}
                            onChange={(e) => setIndivForm({ ...indivForm, gdpr: e.target.checked })}
                            className="mt-1 rounded border-slate-700 text-amber-500 focus:ring-amber-400"
                          />
                          <span className="text-[11px] leading-relaxed">
                            I consent to Site Safe Alliance transmitting my assessment records to CITB / CSCS for certification issuing under UK GDPR fair processing rules.
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white border border-[#78A6B8]/40 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-slate-950/20 cursor-pointer transition-all"
                    id="submit-indiv-booking-btn"
                  >
                    <CreditCard className="w-4 h-4 text-[#78A6B8]" />
                    <span>Confirm Candidate Place &amp; Proceed ({getCoursePriceLabel(indivForm.course)})</span>
                  </button>
                </form>
              </div>
            )}

            {/* PAGE 6: EMPLOYER / CORPORATE GROUP BOOKING */}
            {currentPage === 'employer-booking' && (
              <div className="p-6 space-y-6">
                <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-sky-400" />
                      Employer & Corporate Group Booking Portal
                    </h1>
                    <p className="text-xs text-slate-400 mt-0.5">Multi-delegate roster upload, 30-day PO invoicing, and on-site delivery</p>
                  </div>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                    Corporate Account Mode
                  </span>
                </div>

                <form onSubmit={handleEmployerSubmit} className="space-y-6 text-xs" id="employer-booking-form-prototype">
                  {/* Employer Corporate Info */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-sky-400" /> 1. Company & Accounts Payable Details
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Company Legal Name *</label>
                        <input
                          type="text"
                          required
                          value={employerForm.companyName}
                          onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Companies House Reg No. *</label>
                        <input
                          type="text"
                          required
                          value={employerForm.companyNumber}
                          onChange={(e) => setEmployerForm({ ...employerForm, companyNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Invoicing / Accounts Email *</label>
                        <input
                          type="email"
                          required
                          value={employerForm.accountsEmail}
                          onChange={(e) => setEmployerForm({ ...employerForm, accountsEmail: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-sky-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Client Purchase Order (PO) *</label>
                        <input
                          type="text"
                          required
                          value={employerForm.poNumber}
                          onChange={(e) => setEmployerForm({ ...employerForm, poNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 font-mono focus:border-sky-400"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Payment Terms *</label>
                        <select
                          value={employerForm.paymentTerms}
                          onChange={(e) => setEmployerForm({ ...employerForm, paymentTerms: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-sky-400"
                        >
                          <option value="30_day_credit">30-Day Approved Corporate Credit Account</option>
                          <option value="card_upfront">Corporate Credit Card (Instant receipt)</option>
                          <option value="pro_forma">Pro-Forma BACS Invoice</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-slate-300 mb-1 font-semibold">Lead HSE Coordinator *</label>
                        <input
                          type="text"
                          required
                          value={employerForm.coordinatorName}
                          onChange={(e) => setEmployerForm({ ...employerForm, coordinatorName: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:border-sky-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-Delegate Candidate Roster */}
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-amber-400" /> 2. Multi-Delegate Candidate Roster ({delegates.length} Delegates)
                        </h3>
                        <p className="text-[11px] text-slate-400">All delegates will be registered simultaneously on the CITB portal</p>
                      </div>
                      <button
                        type="button"
                        onClick={addDelegateRow}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center gap-1 font-mono font-bold cursor-pointer transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Delegate</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {delegates.map((del, idx) => (
                        <div key={del.id} className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex flex-wrap items-center gap-2">
                          <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
                            #{idx + 1}
                          </span>
                          <input
                            type="text"
                            placeholder="First Name *"
                            required
                            value={del.firstName}
                            onChange={(e) => {
                              const updated = [...delegates];
                              updated[idx].firstName = e.target.value;
                              setDelegates(updated);
                            }}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs w-28 focus:border-amber-400"
                          />
                          <input
                            type="text"
                            placeholder="Last Name *"
                            required
                            value={del.lastName}
                            onChange={(e) => {
                              const updated = [...delegates];
                              updated[idx].lastName = e.target.value;
                              setDelegates(updated);
                            }}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs w-28 focus:border-amber-400"
                          />
                          <input
                            type="text"
                            placeholder="NI Number *"
                            required
                            value={del.nationalInsurance}
                            onChange={(e) => {
                              const updated = [...delegates];
                              updated[idx].nationalInsurance = e.target.value.toUpperCase();
                              setDelegates(updated);
                            }}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 font-mono text-xs w-32 focus:border-amber-400"
                          />
                          <input
                            type="email"
                            placeholder="Delegate Email *"
                            required
                            value={del.email}
                            onChange={(e) => {
                              const updated = [...delegates];
                              updated[idx].email = e.target.value;
                              setDelegates(updated);
                            }}
                            className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-slate-200 text-xs flex-1 min-w-[140px] focus:border-amber-400"
                          />
                          {delegates.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDelegateRow(del.id)}
                              className="p-1.5 text-slate-500 hover:text-red-400 rounded cursor-pointer"
                              title="Remove delegate"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Corporate Booking */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 cursor-pointer transition-all"
                    id="submit-employer-booking-btn"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Submit Corporate Booking & Roster for {employerForm.companyName} ({delegates.length} Delegates)</span>
                  </button>
                </form>
              </div>
            )}
          </main>

          {/* Prototype Footer */}
          <footer className="bg-slate-900 border-t border-slate-800 px-6 py-6 text-xs text-slate-400 space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <SiteSafeLogo variant="horizontal" size="sm" />
              <div className="flex flex-wrap items-center gap-4 text-[11px]">
                <span>Privacy & GDPR Policy</span>
                <span>Terms of Service</span>
                <span>CITB ATO Accreditation Certificate</span>
                <span>Verify Delegate ID</span>
              </div>
            </div>
            <div className="text-center text-[10px] text-slate-600 border-t border-slate-800/60 pt-3">
              &copy; 2026 Site Safe Alliance Ltd &bull; UK Company Reg: 08931245 &bull; VAT: GB 992 8410 12 &bull; +44 20 3608 4780
            </div>
          </footer>

          {/* Mobile Bottom Sticky CTA Dock (as per responsive specs!) */}
          {viewportMode === 'mobile' && (
            <div className="sticky bottom-0 z-50 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 flex items-center gap-2">
              <button
                onClick={() => setCurrentPage('individual-booking')}
                className="flex-1 py-2 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white border border-[#78A6B8]/40 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <User className="w-3.5 h-3.5 text-[#78A6B8]" /> Book Course
              </button>
              <a
                href="tel:+442036084780"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call +44 20 3608 4780
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
