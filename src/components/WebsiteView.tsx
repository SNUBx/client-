import React, { useState } from 'react';
import { FOUR_CORE_SERVICES } from '../data/scopeData';
import { SiteSafeLogo } from './shared/SiteSafeLogo';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, 
  Award, 
  Clock, 
  Calendar, 
  MapPin, 
  CreditCard, 
  Building2, 
  User, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  Mail, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Plus, 
  Trash2, 
  Send,
  HelpCircle,
  Star,
  Search,
  Check,
  Smartphone,
  Menu,
  X,
  ExternalLink,
  Lock
} from 'lucide-react';

export type WebsitePage = 'home' | 'services' | 'individual-booking' | 'employer-booking' | 'about' | 'contact' | 'privacy' | 'terms';

interface WebsiteViewProps {
  initialPage?: WebsitePage;
  onOpenInternalDoc?: () => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({ initialPage = 'home', onOpenInternalDoc }) => {
  const [currentPage, setCurrentPage] = useState<WebsitePage>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'package' | 'test' | 'course'>('all');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Individual Booking Form State
  const [indivForm, setIndivForm] = useState({
    course: 'green-labourer-pkg',
    delivery: 'pearson-vue',
    date: '2026-09-18',
    location: 'London East (Canary Wharf Hub)',
    firstName: 'David',
    lastName: 'O\'Connor',
    dob: '1989-05-14',
    nationalInsurance: 'QQ 12 34 56 A',
    citbRegistration: 'CITB-892145',
    email: 'david.oconnor@gmail.com',
    phone: '+44 7911 123456',
    address: '14 Rotherhithe Street, London SE16 5DJ',
    specialRequirements: 'Require Welsh language audio if available',
    gdpr: true,
  });

  // Employer Corporate Form State
  const [employerForm, setEmployerForm] = useState({
    companyName: 'Balfour Beatty Construction Ltd',
    companyReg: '00984124',
    vatNumber: 'GB 123 4567 89',
    citbLevyNumber: 'LEV-782145',
    contactName: 'Sarah Jenkins',
    contactRole: 'Group Health & Safety Director',
    contactEmail: 's.jenkins@balfourbeatty-example.co.uk',
    contactPhone: '+44 20 7946 0912',
    billingAddress: '5 Churchill Place, Canary Wharf, London E14 5HU',
    poNumber: 'PO-BB-2026-0941',
    paymentMethod: 'invoice',
    courseId: 'green-labourer-pkg',
    deliveryMode: 'on-site',
    cohortSize: 6,
    preferredDates: 'October 2026 Cohort A',
    notes: 'Please dispatch instructor to our Battersea Power Station Phase 3 Site Welfare Office.'
  });

  // Delegate Roster for Corporate Bookings
  const [delegates, setDelegates] = useState([
    { id: '1', firstName: 'Mark', lastName: 'Thompson', dob: '1985-04-12', nationalInsurance: 'NR 44 55 66 B', email: 'm.thompson@example.co.uk', phone: '+44 7123 000001', citbNumber: 'CITB-01928' },
    { id: '2', firstName: 'Liam', lastName: 'Davies', dob: '1992-08-23', nationalInsurance: 'NR 77 88 99 C', email: 'l.davies@example.co.uk', phone: '+44 7123 000002', citbNumber: 'CITB-04821' },
    { id: '3', firstName: 'Jack', lastName: 'Wilson', dob: '1990-11-04', nationalInsurance: 'NR 11 22 33 D', email: 'j.wilson@example.co.uk', phone: '+44 7123 000003', citbNumber: 'CITB-08392' },
  ]);

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

  const getCoursePrice = (courseKey: string) => {
    switch (courseKey) {
      case 'citb-hse-test': return { label: '£50 incl. VAT', amount: 50, vatIncluded: true };
      case 'cscs-card-app': return { label: '£65 incl. VAT', amount: 65, vatIncluded: true };
      case 'l1-hs-course': return { label: '£200 incl. VAT', amount: 200, vatIncluded: true };
      case 'green-labourer-pkg': return { label: '£320 incl. VAT', amount: 320, vatIncluded: true };
      default: return { label: '£320 incl. VAT', amount: 320, vatIncluded: true };
    }
  };

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
    const ref = `SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingSuccess(`Booking Confirmed! Candidate ${indivForm.firstName} ${indivForm.lastName} enrolled. Confirmation email and SMS instructions dispatched. Booking Reference: ${ref}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEmployerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
    const ref = `CORP-SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingSuccess(`Corporate Cohort Order Registered! ${delegates.length} delegates enrolled for ${employerForm.companyName}. PO ${employerForm.poNumber} verified with 30-day billing terms. Booking Reference: ${ref}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (page: WebsitePage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allCourses = [
    {
      id: 'green-labourer-pkg',
      title: 'Green Labourer Card Package',
      category: 'core',
      price: '£320 incl. VAT',
      amount: 320,
      duration: 'Complete Route',
      cert: 'All-In-One Solution',
      highlight: true,
      description: 'The complete statutory package: Level 1 Health & Safety Course + CITB HS&E Touchscreen Test + Official 5-Year Green CSCS Card with free retake protection.',
      features: ['Regulated Level 1 H&S Course', 'CITB Touchscreen Test Booking', 'Official CSCS Card Application', '100% Free Retake Guarantee']
    },
    {
      id: 'citb-hse-test',
      title: 'CITB Health, Safety & Environment Test',
      category: 'core',
      price: '£50 incl. VAT',
      amount: 50,
      duration: '45 Mins',
      cert: 'Pearson VUE / CITB',
      highlight: false,
      description: 'Official 45-minute touchscreen test required for all CSCS cards. Conducted across 150+ UK Pearson VUE testing centres with immediate score printout.',
      features: ['Operatives & Specialists test options', '150+ Pearson VUE UK centres', 'Same-day & next-day slots', 'Direct CITB database sync']
    },
    {
      id: 'cscs-card-app',
      title: 'CSCS Card Application',
      category: 'core',
      price: '£65 incl. VAT',
      amount: 65,
      duration: '24-48h Express',
      cert: 'Official CSCS Partner',
      highlight: false,
      description: 'Fast-track official CSCS card application and verification processing. Includes instant digital wallet smart pass and physical NFC card dispatch.',
      features: ['Qualification & test verification', 'Digital pass in 24 hours', 'Physical card postal dispatch', 'Direct employer check API']
    },
    {
      id: 'l1-hs-course',
      title: 'Level 1 Health & Safety in a Construction Environment',
      category: 'core',
      price: '£200 incl. VAT',
      amount: 200,
      duration: '1 Day',
      cert: 'CITB ATO / Ofqual Lifetime',
      highlight: false,
      description: 'Accredited 1-day course providing the mandatory lifetime qualification for the 5-Year Green CSCS Labourer Card. Classroom or remote invigilated options.',
      features: ['Lifetime qualification (never expires)', 'Classroom or live online format', 'Ofqual regulated syllabus', 'Free comprehensive study pack']
    }
  ];

  const filteredCourses = allCourses.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col selection:bg-[#263B52] selection:text-white" id="sitesafe-live-portal">
      {/* 1. TOP UTILITY BANNER */}
      <div className="bg-[#263B52] text-white text-xs py-2 px-4 sm:px-8 border-b border-[#1B2A3B]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] font-medium text-slate-300">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-500/30">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              CITB ATO APPROVED #9841
            </span>
            <span className="hidden sm:inline text-slate-400">&bull;</span>
            <span className="hidden sm:inline">Pearson VUE Authorised Network &bull; 150+ UK Testing Centres</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href="tel:+442036084780" 
              className="inline-flex items-center gap-1.5 text-white font-mono font-bold bg-[#78A6B8]/25 hover:bg-[#78A6B8]/40 px-3 py-0.5 rounded-full transition-all border border-[#78A6B8]/40"
              title="Call Central Aircall Booking Desk"
            >
              <PhoneCall className="w-3 h-3 text-[#78A6B8]" />
              <span>Hotline: +44 20 3608 4780</span>
            </a>
            <span className="hidden md:inline text-slate-400 font-mono">07:30 – 18:30 GMT</span>
          </div>
        </div>
      </div>

      {/* 2. PRIMARY LIVE WEBSITE NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer transition-transform active:scale-98"
            id="brand-logo-link"
          >
            <SiteSafeLogo variant="horizontal" size="md" theme="light" showTagline={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-slate-700">
            <button 
              onClick={() => navigateTo('home')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'home' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => navigateTo('services')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'services' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Core Services &amp; Pricing
            </button>
            <button 
              onClick={() => navigateTo('employer-booking')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'employer-booking' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Corporate &amp; Groups
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'about' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              About Us
            </button>
            <button 
              onClick={() => navigateTo('contact')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'contact' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Centres &amp; Contact
            </button>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateTo('individual-booking')}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
              id="header-book-individual-btn"
            >
              <User className="w-3.5 h-3.5 text-[#78A6B8]" />
              <span>Book Candidate</span>
            </button>

            <button
              onClick={() => navigateTo('employer-booking')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
              id="header-book-employer-btn"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Employer Portal</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 text-xs shadow-lg">
            <div className="flex flex-col space-y-2 font-medium text-slate-700">
              <button onClick={() => navigateTo('home')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Home</button>
              <button onClick={() => navigateTo('services')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Core Services &amp; Pricing</button>
              <button onClick={() => navigateTo('individual-booking')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Book Individual Candidate</button>
              <button onClick={() => navigateTo('employer-booking')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Corporate Cohort Booking</button>
              <button onClick={() => navigateTo('about')} className="text-left py-2 px-3 rounded hover:bg-slate-50">About Site Safe Alliance</button>
              <button onClick={() => navigateTo('contact')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Contact &amp; 12 Nationwide Hubs</button>
              <button onClick={() => navigateTo('privacy')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Privacy Policy</button>
              <button onClick={() => navigateTo('terms')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Terms &amp; Conditions</button>
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button onClick={() => navigateTo('individual-booking')} className="w-full py-2.5 rounded-lg bg-[#263B52] text-white font-bold text-center">
                Book Individual Place
              </button>
              <a href="tel:+442036084780" className="w-full py-2.5 rounded-lg bg-emerald-50 text-emerald-800 font-mono text-center border border-emerald-200 flex items-center justify-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Hotline: +44 20 3608 4780</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* SUCCESS NOTIFICATION TOAST */}
      {bookingSuccess && (
        <div className="bg-emerald-600 text-white px-4 py-3 text-xs shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span className="font-medium">{bookingSuccess}</span>
            </div>
            <button 
              onClick={() => setBookingSuccess(null)}
              className="text-emerald-100 hover:text-white font-mono text-xs px-2 py-0.5 rounded bg-emerald-700/50"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* 3. MAIN PAGE ROUTER & VIEW RENDERER */}
      <main className="flex-1">
        {/* ========================================================================= */}
        {/* PAGE 1: HOME (CLEAN, COMPREHENSIVE LANDING PAGE)                          */}
        {/* ========================================================================= */}
        {currentPage === 'home' && (
          <div className="space-y-16 pb-20">
            {/* HERO SECTION */}
            <section className="relative bg-gradient-to-b from-white via-slate-50 to-[#F1F5F9] border-b border-slate-200/80 pt-12 pb-16 px-4 sm:px-8 overflow-hidden">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 border border-[#263B52]/20 text-[#263B52] font-mono text-xs font-semibold">
                    <Award className="w-3.5 h-3.5 text-[#78A6B8]" />
                    <span>CITB APPROVED TRAINING ORGANISATION (ATO #9841)</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight">
                    UK Construction Safety Training, CITB Tests &amp; Official CSCS Cards.
                  </h1>

                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl">
                    Fast-track accredited certifications for individual tradespeople and multi-delegate Tier-1 contractor workforces across 150+ nationwide Pearson VUE test centres and daily live virtual classrooms.
                  </p>

                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <button
                      onClick={() => navigateTo('individual-booking')}
                      className="px-6 py-3.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-sm flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                      id="hero-book-candidate-btn"
                    >
                      <User className="w-4 h-4 text-[#78A6B8]" />
                      <span>Book Candidate Place</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigateTo('employer-booking')}
                      className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                      id="hero-employer-cohort-btn"
                    >
                      <Building2 className="w-4 h-4 text-slate-600" />
                      <span>Corporate Group / PO</span>
                    </button>

                    <a
                      href="tel:+442036084780"
                      className="px-4 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-mono font-semibold text-xs sm:text-sm border border-emerald-200 flex items-center gap-2 transition-all"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-600" />
                      <span>+44 20 3608 4780</span>
                    </a>
                  </div>

                  {/* Trust Indicators */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-200/80">
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#263B52] font-mono">98.6%</div>
                      <div className="text-xs text-slate-500 font-medium">Exam Pass Rate</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#263B52] font-mono">150+</div>
                      <div className="text-xs text-slate-500 font-medium">Pearson VUE Centres</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#263B52] font-mono">24–48h</div>
                      <div className="text-xs text-slate-500 font-medium">CSCS Card Dispatch</div>
                    </div>
                    <div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[#263B52] font-mono">45,000+</div>
                      <div className="text-xs text-slate-500 font-medium">Workers Certified</div>
                    </div>
                  </div>
                </div>

                {/* Hero Quick Booking Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 sm:p-7 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#78A6B8]" />
                        <h3 className="text-sm font-bold text-slate-900">Fast Candidate Fast-Track</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Live System
                      </span>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Select Required Qualification</label>
                        <select 
                          value={indivForm.course}
                          onChange={(e) => setIndivForm({ ...indivForm, course: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                        >
                          <option value="green-labourer-pkg">Green Labourer Card Package — £320 incl. VAT</option>
                          <option value="citb-hse-test">CITB Health, Safety & Environment Test — £50 incl. VAT</option>
                          <option value="cscs-card-app">CSCS Card Application — £65 incl. VAT</option>
                          <option value="l1-hs-course">Level 1 Health & Safety in Construction — £200 incl. VAT</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Preferred Testing Location</label>
                        <select 
                          value={indivForm.location}
                          onChange={(e) => setIndivForm({ ...indivForm, location: e.target.value })}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                        >
                          <option>London East (Canary Wharf Hub)</option>
                          <option>London Central (Kings Cross Centre)</option>
                          <option>London South (Croydon Testing Hub)</option>
                          <option>Midlands (Birmingham Bullring)</option>
                          <option>North West (Manchester Piccadilly Hub)</option>
                          <option>Yorkshire (Leeds City Centre)</option>
                          <option>South West (Bristol Temple Meads)</option>
                          <option>Scotland (Glasgow Central)</option>
                          <option>Nationwide Live Remote Virtual Classroom</option>
                        </select>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 block">Total Payable</span>
                          <span className="text-base font-extrabold text-[#263B52] font-mono">
                            {getCoursePrice(indivForm.course).label}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Guaranteed Slot
                        </span>
                      </div>

                      <button
                        onClick={() => navigateTo('individual-booking')}
                        className="w-full py-3 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                      >
                        <span>Continue to Candidate Enrollment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-slate-400" /> SSL 256-Bit Encrypted</span>
                      <span>CITB ATO #9841 Verified</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* FOUR CORE SERVICES SECTION (PRIMARY SPECIFICATION REQUIREMENT) */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#78A6B8] uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" /> Core Qualifications &amp; Statutory Services
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Accredited CITB Tests &amp; CSCS Certification
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1">
                    All prices are fully inclusive with instant booking, official CITB ATO registration, and express card delivery.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('services')}
                  className="text-xs font-mono font-bold text-[#263B52] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View Course Directory &rarr;
                </button>
              </div>

              {/* The 4 Core Service Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {FOUR_CORE_SERVICES.map((service) => {
                  const isPackage = service.code === 'GREEN_LABOURER_PKG';
                  return (
                    <div 
                      key={service.code}
                      className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                        isPackage 
                          ? 'bg-[#263B52] text-white shadow-lg border-2 border-[#78A6B8]' 
                          : 'bg-white text-slate-900 shadow-sm hover:shadow-md border border-slate-200/90'
                      }`}
                    >
                      {isPackage && (
                        <div className="absolute -top-3 right-4 bg-[#78A6B8] text-slate-950 text-[10px] font-mono font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-xs">
                          Most Popular Package
                        </div>
                      )}

                      <div className="space-y-4">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                            isPackage 
                              ? 'bg-white/10 text-white border border-white/20' 
                              : 'bg-[#263B52]/10 text-[#263B52] border border-[#263B52]/20'
                          }`}>
                            {service.code.replace(/_/g, ' ')}
                          </span>
                          <span className={`font-mono text-[11px] flex items-center gap-1 ${isPackage ? 'text-slate-300' : 'text-slate-500'}`}>
                            <Clock className={`w-3 h-3 ${isPackage ? 'text-[#78A6B8]' : 'text-slate-400'}`} />
                            {service.duration}
                          </span>
                        </div>

                        <div>
                          <h3 className={`text-base font-bold leading-snug ${isPackage ? 'text-white' : 'text-slate-900'}`}>
                            {service.title}
                          </h3>
                          <p className={`text-xs mt-2 leading-relaxed ${isPackage ? 'text-slate-200' : 'text-slate-600'}`}>
                            {service.description}
                          </p>
                        </div>

                        <div className={`pt-3 border-t space-y-1.5 text-xs ${isPackage ? 'border-white/15 text-slate-200' : 'border-slate-100 text-slate-600'}`}>
                          {service.code === 'GREEN_LABOURER_PKG' && (
                            <>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#78A6B8]" /> Level 1 H&amp;S 1-Day Course</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#78A6B8]" /> CITB HS&amp;E Touchscreen Test</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#78A6B8]" /> Official 5-Year CSCS Card</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-[#78A6B8]" /> Free Retake Guarantee</div>
                            </>
                          )}
                          {service.code === 'CITB_HSE_TEST' && (
                            <>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Operatives &amp; Specialists tests</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> 150+ Pearson VUE UK centres</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Immediate score printout</div>
                            </>
                          )}
                          {service.code === 'CSCS_CARD_APP' && (
                            <>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Express 24–48h processing</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Digital smart card access</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Physical NFC card dispatched</div>
                            </>
                          )}
                          {service.code === 'L1_HS_COURSE' && (
                            <>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Lifetime valid qualification</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Classroom or online webinar</div>
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> CITB ATO accredited Ofqual</div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className={`pt-5 mt-4 border-t flex items-center justify-between ${isPackage ? 'border-white/20' : 'border-slate-100'}`}>
                        <div>
                          <span className={`text-xl font-extrabold font-mono block ${isPackage ? 'text-[#9BC1CF]' : 'text-[#263B52]'}`}>
                            {service.priceLabel}
                          </span>
                          <span className={`text-[10px] ${isPackage ? 'text-slate-300' : 'text-slate-500'}`}>No Hidden Fees</span>
                        </div>

                        <button
                          onClick={() => {
                            setIndivForm({ ...indivForm, course: service.code.toLowerCase().replace(/_/g, '-') });
                            navigateTo('individual-booking');
                          }}
                          className={`px-4 py-2 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                            isPackage 
                              ? 'bg-white hover:bg-slate-100 text-[#263B52] shadow-sm' 
                              : 'bg-[#263B52] hover:bg-[#1B2A3B] text-white shadow-xs'
                          }`}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* AIRCALL TELEPHONY HOTLINE BANNER */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="bg-gradient-to-r from-[#263B52] to-[#1B2A3B] rounded-2xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-[#78A6B8]/30">
                <div className="space-y-2 text-center md:text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#78A6B8]/20 text-[#9BC1CF] text-[11px] font-mono">
                    <PhoneCall className="w-3.5 h-3.5 text-[#78A6B8]" /> Aircall Smartflow Call Centre
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold">Need Immediate Booking Help or Same-Day Slot?</h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                    Speak directly to our UK health &amp; safety booking coordinators. Dedicated lines for tradespeople and Tier-1 contractors.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                  <a
                    href="tel:+442036084780"
                    className="px-6 py-3.5 rounded-xl bg-white text-[#263B52] hover:bg-slate-100 font-mono font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all"
                  >
                    <PhoneCall className="w-4 h-4 text-[#78A6B8]" />
                    <span>+44 20 3608 4780</span>
                  </a>
                  <button
                    onClick={() => navigateTo('contact')}
                    className="px-5 py-3.5 rounded-xl bg-[#78A6B8]/20 hover:bg-[#78A6B8]/30 text-white font-semibold text-xs sm:text-sm border border-[#78A6B8]/40 transition-all cursor-pointer"
                  >
                    Request Callback
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 2: SERVICES & COURSE DIRECTORY                                      */}
        {/* ========================================================================= */}
        {currentPage === 'services' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="space-y-2 border-b border-slate-200 pb-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#78A6B8]">
                <Award className="w-4 h-4" /> CITB ATO COURSE DIRECTORY
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950">Accredited Health &amp; Safety Courses</h1>
              <p className="text-slate-600 text-xs sm:text-sm">Find and book Ofqual-regulated certifications across 150+ UK Pearson testing hubs.</p>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedCategory === 'all' ? 'bg-[#263B52] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  All Core Qualifications ({allCourses.length})
                </button>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search course title or code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52]"
                />
              </div>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                        {course.cert}
                      </span>
                      <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#78A6B8]" /> {course.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="space-y-1 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      {course.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-extrabold text-[#263B52] font-mono block">
                        {course.price}
                      </span>
                      <span className="text-[10px] text-slate-500">Official Fixed Price</span>
                    </div>

                    <button
                      onClick={() => {
                        setIndivForm({ ...indivForm, course: course.id });
                        navigateTo('individual-booking');
                      }}
                      className="px-4 py-2 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
                    >
                      Book Place
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 3: INDIVIDUAL CANDIDATE ENROLLMENT FORM                              */}
        {/* ========================================================================= */}
        {currentPage === 'individual-booking' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 flex items-center gap-2">
                  <User className="w-6 h-6 text-[#78A6B8]" />
                  Individual Candidate Enrollment
                </h1>
                <p className="text-xs text-slate-600 mt-1">Direct synchronization into official CITB ATO registration database</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#263B52]/10 text-[#263B52] border border-[#263B52]/20">
                Step 1 of 1: Instant Confirmation
              </span>
            </div>

            <form onSubmit={handleIndividualSubmit} className="space-y-6 text-xs" id="live-candidate-booking-form">
              {/* 1. Qualification & Location */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#78A6B8]" /> 1. Course Selection &amp; Testing Centre
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Selected Qualification *</label>
                    <select
                      value={indivForm.course}
                      onChange={(e) => setIndivForm({ ...indivForm, course: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    >
                      <option value="green-labourer-pkg">Green Labourer Card Package — £320 incl. VAT</option>
                      <option value="citb-hse-test">CITB Health, Safety &amp; Environment Test — £50 incl. VAT</option>
                      <option value="cscs-card-app">CSCS Card Application — £65 incl. VAT</option>
                      <option value="l1-hs-course">Level 1 Health &amp; Safety in Construction — £200 incl. VAT</option>
                      <option value="smsts-5day">CITB SMSTS (5-Day Site Management) — £495 + VAT</option>
                      <option value="sssts-2day">CITB SSSTS (2-Day Site Supervisor) — £260 + VAT</option>
                      <option value="medical-safety-critical">Safety Critical Medical (Fit2Work) — £140 + VAT</option>
                      <option value="firstaid-faw">First Aid at Work (FAW 3-Day) — £220 + VAT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Delivery Format *</label>
                    <select
                      value={indivForm.delivery}
                      onChange={(e) => setIndivForm({ ...indivForm, delivery: e.target.value })}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    >
                      <option value="pearson-vue">Pearson VUE Authorised Testing Centre</option>
                      <option value="classroom">Regional Physical Training Hub</option>
                      <option value="remote-webinar">Live Virtual Classroom (Online Invigilated)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Target Test Date *</label>
                    <input
                      type="date"
                      value={indivForm.date}
                      onChange={(e) => setIndivForm({ ...indivForm, date: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Testing Centre Hub *</label>
                    <select
                      value={indivForm.location}
                      onChange={(e) => setIndivForm({ ...indivForm, location: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    >
                      <option>London East (Canary Wharf Hub)</option>
                      <option>London Central (Kings Cross Centre)</option>
                      <option>London South (Croydon Centre)</option>
                      <option>Midlands (Birmingham Bullring)</option>
                      <option>North West (Manchester Piccadilly Hub)</option>
                      <option>Yorkshire (Leeds City Centre)</option>
                      <option>South West (Bristol Temple Meads)</option>
                      <option>Scotland (Glasgow Central)</option>
                      <option>Remote Online Live Invigilation</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 2. Candidate Personal Details */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#78A6B8]" /> 2. Candidate Identification &amp; CITB Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={indivForm.firstName}
                      onChange={(e) => setIndivForm({ ...indivForm, firstName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={indivForm.lastName}
                      onChange={(e) => setIndivForm({ ...indivForm, lastName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Date of Birth *</label>
                    <input
                      type="date"
                      required
                      value={indivForm.dob}
                      onChange={(e) => setIndivForm({ ...indivForm, dob: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">UK National Insurance Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. QQ 12 34 56 A"
                      value={indivForm.nationalInsurance}
                      onChange={(e) => setIndivForm({ ...indivForm, nationalInsurance: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={indivForm.email}
                      onChange={(e) => setIndivForm({ ...indivForm, email: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Mobile Telephone *</label>
                    <input
                      type="tel"
                      required
                      value={indivForm.phone}
                      onChange={(e) => setIndivForm({ ...indivForm, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Postal Address for CSCS Card Dispatch *</label>
                    <input
                      type="text"
                      required
                      value={indivForm.address}
                      onChange={(e) => setIndivForm({ ...indivForm, address: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Summary & Payment */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#78A6B8]" /> 3. Pricing Summary &amp; Confirmation
                </h3>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-600 block">Total Due:</span>
                    <span className="text-2xl font-extrabold text-[#263B52] font-mono">
                      {getCoursePrice(indivForm.course).label}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-slate-500">
                    <div>Includes Pearson VUE exam fee</div>
                    <div className="text-emerald-700 font-semibold">Immediate confirmation</div>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="gdpr-consent"
                    checked={indivForm.gdpr}
                    onChange={(e) => setIndivForm({ ...indivForm, gdpr: e.target.checked })}
                    className="mt-0.5 rounded text-[#263B52] focus:ring-[#263B52]"
                    required
                  />
                  <label htmlFor="gdpr-consent" className="text-[11px] text-slate-600 leading-snug">
                    I confirm the candidate details are accurate and authorise Site Safe Alliance to register candidate details with CITB and Pearson VUE for test issuance.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  id="submit-candidate-booking-btn"
                >
                  <Lock className="w-4 h-4 text-[#78A6B8]" />
                  <span>Confirm Enrollment &amp; Reserve Slot ({getCoursePrice(indivForm.course).label})</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: EMPLOYER CORPORATE BOOKING & PO ROSTER                            */}
        {/* ========================================================================= */}
        {currentPage === 'employer-booking' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[#78A6B8]" />
                  Employer Cohort &amp; Corporate PO Booking
                </h1>
                <p className="text-xs text-slate-600 mt-1">Tier-1 contractor accounts, multi-delegate rosters, 30-day PO invoicing, and automated CITB levy grants.</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                30-Day Credit Approved
              </span>
            </div>

            <form onSubmit={handleEmployerSubmit} className="space-y-6 text-xs" id="corporate-cohort-booking-form">
              {/* Company & Billing Information */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#78A6B8]" /> 1. Organization &amp; PO Billing Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Company Registered Legal Name *</label>
                    <input
                      type="text"
                      required
                      value={employerForm.companyName}
                      onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Purchase Order (PO) Number *</label>
                    <input
                      type="text"
                      required
                      value={employerForm.poNumber}
                      onChange={(e) => setEmployerForm({ ...employerForm, poNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono font-bold focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">CITB Levy Number (if applicable)</label>
                    <input
                      type="text"
                      placeholder="e.g. LEV-782145"
                      value={employerForm.citbLevyNumber}
                      onChange={(e) => setEmployerForm({ ...employerForm, citbLevyNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-mono focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Primary Booking Contact *</label>
                    <input
                      type="text"
                      required
                      value={employerForm.contactName}
                      onChange={(e) => setEmployerForm({ ...employerForm, contactName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Accounts Payable Email *</label>
                    <input
                      type="email"
                      required
                      value={employerForm.contactEmail}
                      onChange={(e) => setEmployerForm({ ...employerForm, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Candidate Roster Table */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#78A6B8]" /> 2. Multi-Delegate Candidate Roster ({delegates.length} Candidates)
                    </h3>
                    <p className="text-slate-500 text-[11px]">Enter details for each worker to be enrolled on the cohort.</p>
                  </div>
                  <button
                    type="button"
                    onClick={addDelegateRow}
                    className="px-3 py-1.5 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Delegate
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="p-2.5">#</th>
                        <th className="p-2.5">First Name</th>
                        <th className="p-2.5">Last Name</th>
                        <th className="p-2.5">Date of Birth</th>
                        <th className="p-2.5">NI Number</th>
                        <th className="p-2.5">CITB Reg (Opt.)</th>
                        <th className="p-2.5 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {delegates.map((del, idx) => (
                        <tr key={del.id}>
                          <td className="p-2.5 font-mono text-slate-400">{idx + 1}</td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              required
                              value={del.firstName}
                              onChange={(e) => {
                                const copy = [...delegates];
                                copy[idx].firstName = e.target.value;
                                setDelegates(copy);
                              }}
                              placeholder="First"
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-900"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              required
                              value={del.lastName}
                              onChange={(e) => {
                                const copy = [...delegates];
                                copy[idx].lastName = e.target.value;
                                setDelegates(copy);
                              }}
                              placeholder="Last"
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-900"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="date"
                              required
                              value={del.dob}
                              onChange={(e) => {
                                const copy = [...delegates];
                                copy[idx].dob = e.target.value;
                                setDelegates(copy);
                              }}
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-900 font-mono text-[11px]"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              required
                              value={del.nationalInsurance}
                              onChange={(e) => {
                                const copy = [...delegates];
                                copy[idx].nationalInsurance = e.target.value;
                                setDelegates(copy);
                              }}
                              placeholder="QQ 12 34 56 A"
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-900 font-mono text-[11px] uppercase"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              type="text"
                              value={del.citbNumber}
                              onChange={(e) => {
                                const copy = [...delegates];
                                copy[idx].citbNumber = e.target.value;
                                setDelegates(copy);
                              }}
                              placeholder="CITB-XXXX"
                              className="w-full px-2 py-1 bg-slate-50 border border-slate-300 rounded text-slate-900 font-mono text-[11px]"
                            />
                          </td>
                          <td className="p-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => removeDelegateRow(del.id)}
                              disabled={delegates.length <= 1}
                              className={`p-1 rounded ${delegates.length <= 1 ? 'text-slate-300' : 'text-rose-600 hover:bg-rose-50'}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quotation & Submit */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500">Cohort Quotation ({delegates.length} Delegates)</span>
                    <div className="text-2xl font-extrabold text-[#263B52] font-mono">
                      £{(delegates.length * 320).toLocaleString()} <span className="text-xs font-normal text-slate-500">incl. VAT</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-600">
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold mb-1">
                      CITB Levy Grant Eligible (£140/candidate)
                    </span>
                    <div>Payment by 30-day PO invoice</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  id="submit-corporate-cohort-btn"
                >
                  <Send className="w-4 h-4 text-[#78A6B8]" />
                  <span>Submit Corporate Cohort Order (PO: {employerForm.poNumber || 'PENDING'})</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 5: ABOUT US                                                          */}
        {/* ========================================================================= */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 text-[#263B52] font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#78A6B8]" />
                ABOUT US
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263B52]">
                About Site Safe Alliance
              </h1>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm sm:text-base text-slate-700 leading-relaxed shadow-xs">
              <p>
                Site Safe Alliance Ltd is an independent administrative support company helping individuals and employers across the UK arrange CITB tests, CSCS card applications and accredited construction training.
              </p>

              <div className="pt-6 border-t border-slate-200 space-y-2">
                <h2 className="text-base font-bold text-slate-900">
                  Important information
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Site Safe Alliance Ltd is an independent administrative support provider and is not affiliated with or endorsed by CITB, CSCS or any official regulatory body. We assist with bookings and applications only—we do not conduct tests, issue cards or guarantee outcomes.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
              >
                &larr; Return to Home
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 6: CONTACT & CENTRES                                                */}
        {/* ========================================================================= */}
        {currentPage === 'contact' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="border-b border-slate-200 pb-4">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">Contact &amp; Regional Training Centres</h1>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Centralised national booking desk and regional examination hubs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PhoneCall className="w-5 h-5 text-[#78A6B8]" />
                    Central Inbound Telephony Desk
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600">Aircall Central Hotline:</span>
                      <a href="tel:+442036084780" className="font-mono text-base font-extrabold text-[#263B52] hover:underline">
                        +44 20 3608 4780
                      </a>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600">Booking Enquiries:</span>
                      <span className="font-mono text-slate-800 font-semibold">bookings@sitesafealliance.co.uk</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                      <span className="text-slate-600">Operating Hours:</span>
                      <span className="font-mono text-slate-800">Mon–Fri 07:30–18:30 GMT</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#78A6B8]" />
                    Flagship Regional Examination Hubs
                  </h3>
                  <div className="space-y-2 text-xs text-slate-600">
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">London Headquarters &amp; Test Suite:</strong>
                      25 Canada Square, Canary Wharf, London E14 5LB
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">Midlands Training Centre:</strong>
                      Fort Dunlop, Fort Parkway, Birmingham B24 9FD
                    </div>
                    <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                      <strong className="text-slate-900 block">North West Examination Hub:</strong>
                      MediaCityUK, Salford Quays, Manchester M50 2EQ
                    </div>
                  </div>
                </div>
              </div>

              {/* 15-Minute Priority Callback Request Form */}
              <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Request 15-Minute Priority Callback</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Need immediate advice or a bespoke group quote? Leave your number.</p>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); setBookingSuccess("Thank you! A senior booking coordinator will call you back within 15 minutes."); }} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                    <input type="text" required placeholder="e.g. John Henderson" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52]" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input type="tel" required placeholder="e.g. +44 7123 456789" className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52] font-mono" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Enquiry Type *</label>
                    <select className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52]">
                      <option>CSCS Green Labourer Card &amp; Test Enquiry</option>
                      <option>CITB SMSTS / SSSTS Management Course</option>
                      <option>Corporate On-Site Group Training (PO Invoicing)</option>
                      <option>Safety Critical Medicals (Day Rate Booking)</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full py-3 rounded-lg bg-[#263B52] text-white font-bold hover:bg-[#1B2A3B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm">
                    <Send className="w-3.5 h-3.5 text-[#78A6B8]" />
                    <span>Request Priority Callback</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 7: PRIVACY POLICY                                                    */}
        {/* ========================================================================= */}
        {currentPage === 'privacy' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 text-[#263B52] font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#78A6B8]" />
                LEGAL &amp; COMPLIANCE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263B52]">
                Privacy Policy
              </h1>
              <p className="text-sm text-slate-500">
                Site Safe Alliance Ltd • UK Data Protection &amp; Privacy Notice
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
              <p>
                Site Safe Alliance Ltd is committed to respecting your privacy and protecting personal data collected in connection with CITB test bookings, CSCS card verifications, and qualification delivery.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">
                  Privacy Policy context placeholder:
                </p>
                <p>
                  The full privacy policy and data governance terms will be placed here based on your forthcoming requirements.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Learn more about our training accreditations and provider standards:
                </p>
                <button
                  onClick={() => navigateTo('about')}
                  className="px-4 py-2 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Go to About Us</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#78A6B8]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
              >
                &larr; Return to Home
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 8: TERMS & CONDITIONS                                                */}
        {/* ========================================================================= */}
        {currentPage === 'terms' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 text-[#263B52] font-mono text-xs font-bold">
                <FileText className="w-4 h-4 text-[#78A6B8]" />
                TERMS OF SERVICE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#263B52]">
                Terms &amp; Conditions
              </h1>
              <p className="text-sm text-slate-500">
                Site Safe Alliance Ltd • Candidate &amp; Employer Service Terms
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
              <p>
                These terms govern candidates and corporate organizations booking CITB Health, Safety &amp; Environment tests, CSCS card processing, and accredited construction safety training.
              </p>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-600 space-y-2">
                <p className="font-semibold text-slate-800">
                  Terms &amp; Conditions context placeholder:
                </p>
                <p>
                  The full booking terms, retake policies, and delegate requirements will be placed here based on your forthcoming requirements.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Learn more about our training accreditations and provider standards:
                </p>
                <button
                  onClick={() => navigateTo('about')}
                  className="px-4 py-2 rounded-lg bg-[#263B52] hover:bg-[#1B2A3B] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>Go to About Us</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#78A6B8]" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigateTo('home')}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors"
              >
                &larr; Return to Home
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. CLEAN PRODUCTION FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
            {/* Simple Navigation Links: About Us, Privacy Policy, Terms & Conditions */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-8 text-xs">
              <button
                onClick={() => navigateTo('about')}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                About Us
              </button>
              <button
                onClick={() => navigateTo('privacy')}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigateTo('terms')}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer font-medium"
              >
                Terms &amp; Conditions
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Contact
              </button>
            </div>

            {/* Direct Telephone Support */}
            <div className="flex items-center gap-2 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-[#78A6B8]" />
              <span className="text-slate-400">National Booking Desk:</span>
              <a href="tel:+442036084780" className="font-mono text-white font-bold hover:underline">
                +44 20 3608 4780
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; 2026 Site Safe Alliance Ltd. All rights reserved.
            </div>
            {onOpenInternalDoc && (
              <button 
                onClick={onOpenInternalDoc} 
                className="text-[10px] font-mono text-slate-600 hover:text-slate-400 transition-colors"
                title="Open Technical Blueprint Documentation"
              >
                [Internal Architecture Spec]
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* 5. MOBILE FIXED CTA DOCK */}
      <div className="lg:hidden sticky bottom-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 flex items-center gap-2 shadow-lg">
        <button
          onClick={() => navigateTo('individual-booking')}
          className="flex-1 py-2.5 rounded-lg bg-[#263B52] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
        >
          <User className="w-3.5 h-3.5 text-[#78A6B8]" /> Book Course
        </button>
        <a
          href="tel:+442036084780"
          className="px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm font-mono"
        >
          <PhoneCall className="w-3.5 h-3.5" /> Call +44 20 3608 4780
        </a>
      </div>
    </div>
  );
};
