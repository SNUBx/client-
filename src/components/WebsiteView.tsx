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
  ChevronDown,
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

export type WebsitePage = 'home' | 'services' | 'individual-booking' | 'employer-booking' | 'about' | 'contact';

interface WebsiteViewProps {
  initialPage?: WebsitePage;
  onOpenInternalDoc?: () => void;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({ initialPage = 'home', onOpenInternalDoc }) => {
  const [currentPage, setCurrentPage] = useState<WebsitePage>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'core' | 'management' | 'medical'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
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
      case 'smsts-5day': return { label: '£495 + VAT', amount: 495, vatIncluded: false };
      case 'sssts-2day': return { label: '£260 + VAT', amount: 260, vatIncluded: false };
      case 'medical-safety-critical': return { label: '£140 + VAT', amount: 140, vatIncluded: false };
      case 'firstaid-faw': return { label: '£220 + VAT', amount: 220, vatIncluded: false };
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
    },
    {
      id: 'smsts-5day',
      title: 'CITB SMSTS (Site Management Safety Training Scheme)',
      category: 'management',
      price: '£495 + VAT',
      amount: 495,
      duration: '5 Days',
      cert: 'CITB Site Safety Plus',
      highlight: false,
      description: 'Industry-standard 5-day certification for site managers, project managers, and directors on Tier-1 and Major Contractors Group sites.',
      features: ['CITB Site Safety Plus certificate', 'Qualifies for £240 CITB employer levy grant', 'Classroom or live virtual options', 'Official CITB course manual']
    },
    {
      id: 'sssts-2day',
      title: 'CITB SSSTS (Site Supervisor Safety Training Scheme)',
      category: 'management',
      price: '£260 + VAT',
      amount: 260,
      duration: '2 Days',
      cert: 'CITB Site Safety Plus',
      highlight: false,
      description: 'Essential 2-day qualification for site supervisors, gangers, team leaders, and foremen covering legal duties and risk mitigation.',
      features: ['CITB Site Safety Plus certificate', 'Qualifies for £140 CITB employer levy grant', 'Toolbox talks & legal duties', 'Nationwide center availability']
    },
    {
      id: 'medical-safety-critical',
      title: 'Safety Critical Worker Medical (Fit2Work)',
      category: 'medical',
      price: '£140 + VAT',
      amount: 140,
      duration: '45 Mins',
      cert: 'SEQOHS / CBH Compliant',
      highlight: false,
      description: 'Mandatory occupational health assessment for plant operators, working at height, and confined space personnel by registered clinicians.',
      features: ['Audiometry & spirometry testing', 'Vision, musculoskeletal, & urinalysis', 'Same-day digital Fit-to-Work certificate', 'Constructing Better Health compliant']
    },
    {
      id: 'firstaid-faw',
      title: 'First Aid at Work (FAW 3-Day)',
      category: 'management',
      price: '£220 + VAT',
      amount: 220,
      duration: '3 Days',
      cert: 'HSE / Qualsafe Accredited',
      highlight: false,
      description: 'Comprehensive first aid qualification compliant with Health and Safety (First-Aid) Regulations 1981 for high-hazard construction environments.',
      features: ['HSE recognized qualification', 'Valid for 3 years nationwide', 'Hands-on practical CPR & AED training', 'Full course manual included']
    }
  ];

  const filteredCourses = allCourses.filter(c => {
    const matchesCat = selectedCategory === 'all' || c.category === selectedCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const faqs = [
    {
      q: "How quickly will I receive my CSCS Green Labourer Card?",
      a: "Once you have completed the Level 1 Health & Safety Course and passed the CITB Touchscreen Test, we verify your qualifications directly on the CITB database and submit the application immediately. Your digital smart card is available within 24–48 hours for instant site access via CSCS Smart Check, and your physical plastic NFC card arrives via Royal Mail 1st Class in 3–5 working days."
    },
    {
      q: "What happens if I fail the CITB Touchscreen Test?",
      a: "When you book the Green Labourer Card Package (£320 incl. VAT), our comprehensive package includes free unlimited retake support. If you do not pass on your first attempt, our dedicated booking advisor will reschedule your test slot at no additional charge until you achieve your certification."
    },
    {
      q: "Can corporate employers pay via Purchase Order (PO) and invoice?",
      a: "Yes. Approved corporate clients and Tier-1 contractors can book multi-delegate cohorts immediately using our Employer Portal with a valid company Purchase Order number. We offer standard 30-day net billing terms and automated CITB levy grant submission assistance."
    },
    {
      q: "What forms of ID must I bring to the Pearson VUE Test Centre?",
      a: "You must bring one primary form of government-issued photo identification that contains your photograph and signature (such as a valid UK or International Passport, or UK Photocard Driving Licence). If you do not hold primary photo ID, please contact our helpline on +44 20 3608 4780 for approved citizen card waivers."
    },
    {
      q: "Are the training courses delivered online or in a physical classroom?",
      a: "We offer both! You can attend in-person at any of our 12 regional training hubs across the UK (London, Birmingham, Manchester, Leeds, Bristol, Glasgow, etc.) or choose our daily live virtual classroom sessions led by certified CITB instructors with online invigilated exams."
    }
  ];

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
                          <option value="smsts-5day">CITB SMSTS (5-Day Site Management) — £495 + VAT</option>
                          <option value="sssts-2day">CITB SSSTS (2-Day Site Supervisor) — £260 + VAT</option>
                          <option value="medical-safety-critical">Safety Critical Medical (Fit2Work) — £140 + VAT</option>
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
                  className="text-xs font-mono font-bold text-[#263B52] hover:underline flex items-center gap-1"
                >
                  View All 18 Courses &rarr;
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

            {/* MANAGEMENT & SITE SAFETY PLUS SHOWCASE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">Site Management &amp; Occupational Health</h3>
                    <p className="text-xs text-slate-500 mt-0.5">CITB Site Safety Plus and SEQOHS worker health screening</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                    Levy Grant Eligible
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">CITB SMSTS (5 Days)</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">Site Management Safety Scheme</h4>
                      <p className="text-[11px] text-slate-600 mt-1">Mandatory for site managers. Includes £240 employer levy grant trigger.</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-[#263B52]">£495 <span className="text-[10px] text-slate-500">+VAT</span></span>
                      <button onClick={() => { setIndivForm({...indivForm, course: 'smsts-5day'}); navigateTo('individual-booking'); }} className="text-xs font-bold text-[#263B52] hover:underline">Book &rarr;</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">CITB SSSTS (2 Days)</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">Site Supervisor Safety Scheme</h4>
                      <p className="text-[11px] text-slate-600 mt-1">For supervisors, foremen, and gangers. Includes £140 employer levy grant.</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-[#263B52]">£260 <span className="text-[10px] text-slate-500">+VAT</span></span>
                      <button onClick={() => { setIndivForm({...indivForm, course: 'sssts-2day'}); navigateTo('individual-booking'); }} className="text-xs font-bold text-[#263B52] hover:underline">Book &rarr;</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Safety Critical Medical</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">Fit2Work Health Assessment</h4>
                      <p className="text-[11px] text-slate-600 mt-1">45-minute clinical check: hearing, lung function, vision, musculoskeletal.</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-[#263B52]">£140 <span className="text-[10px] text-slate-500">+VAT</span></span>
                      <button onClick={() => { setIndivForm({...indivForm, course: 'medical-safety-critical'}); navigateTo('individual-booking'); }} className="text-xs font-bold text-[#263B52] hover:underline">Book &rarr;</button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded">First Aid at Work</span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2">FAW 3-Day Qualification</h4>
                      <p className="text-[11px] text-slate-600 mt-1">HSE-recognized high-risk site first aider certification valid for 3 years.</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                      <span className="font-mono font-extrabold text-sm text-[#263B52]">£220 <span className="text-[10px] text-slate-500">+VAT</span></span>
                      <button onClick={() => { setIndivForm({...indivForm, course: 'firstaid-faw'}); navigateTo('individual-booking'); }} className="text-xs font-bold text-[#263B52] hover:underline">Book &rarr;</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* HOW IT WORKS SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
              <div className="text-center max-w-2xl mx-auto space-y-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How to Get Certified in 3 Simple Steps</h2>
                <p className="text-slate-600 text-xs sm:text-sm">We handle all the paperwork, test scheduling, and direct CITB database registration.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#263B52] text-white flex items-center justify-center font-mono font-bold text-base">
                    01
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Choose Qualification &amp; Date</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Select your course, touchscreen test centre location (150+ Pearson VUE hubs), and convenient test slot or webinar date.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#263B52] text-white flex items-center justify-center font-mono font-bold text-base">
                    02
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Sit Test or Complete Course</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Attend your 1-day course or take your 45-minute touchscreen test with our free study guides and mock preparation tests.
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-[#78A6B8] text-slate-950 flex items-center justify-center font-mono font-bold text-base">
                    03
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Receive Official CSCS Card</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Get instant digital smart card access in 24 hours, followed by physical card postal dispatch directly to your address.
                  </p>
                </div>
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
                    className="px-5 py-3.5 rounded-xl bg-[#78A6B8]/20 hover:bg-[#78A6B8]/30 text-white font-semibold text-xs sm:text-sm border border-[#78A6B8]/40 transition-all"
                  >
                    Request Callback
                  </button>
                </div>
              </div>
            </section>

            {/* FAQ ACCORDION */}
            <section className="max-w-4xl mx-auto px-4 sm:px-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
                <p className="text-xs sm:text-sm text-slate-600">Everything you need to know about tests, cards, and corporate invoicing.</p>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
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
                  All Qualifications ({allCourses.length})
                </button>
                <button
                  onClick={() => setSelectedCategory('core')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedCategory === 'core' ? 'bg-[#263B52] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Core CSCS &amp; CITB (4)
                </button>
                <button
                  onClick={() => setSelectedCategory('management')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedCategory === 'management' ? 'bg-[#263B52] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Site Safety Plus (3)
                </button>
                <button
                  onClick={() => setSelectedCategory('medical')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                    selectedCategory === 'medical' ? 'bg-[#263B52] text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Medicals (1)
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
        {/* PAGE 5: ABOUT US & ACCREDITATION STANDARDS                                */}
        {/* ========================================================================= */}
        {currentPage === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-10 space-y-12">
            <div className="space-y-4 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#263B52]/10 text-[#263B52] font-mono text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-[#78A6B8]" />
                ABOUT SITE SAFE ALLIANCE LTD
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                Zero-Harm Workforce Compliance for the UK Construction Sector.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Site Safe Alliance is a premier UK training and occupational health coalition operating 12 regional centres and 150+ Pearson VUE testing suites across England, Scotland, and Wales. We partner with Tier-1 main contractors, specialist sub-contractors, and self-employed trades to ensure every operative steps on site safely certified.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-2">
                <div className="text-3xl font-extrabold text-[#263B52] font-mono">45,000+</div>
                <div className="text-xs font-bold text-slate-900">Delegates Certified Annually</div>
                <p className="text-[11px] text-slate-500">Across CITB, CSCS, and occupational health qualifications.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-2">
                <div className="text-3xl font-extrabold text-emerald-600 font-mono">98.6%</div>
                <div className="text-xs font-bold text-slate-900">First-Time Pass Rate</div>
                <p className="text-[11px] text-slate-500">Supported by comprehensive pre-exam study modules.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center space-y-2">
                <div className="text-3xl font-extrabold text-[#78A6B8] font-mono">150+ Hubs</div>
                <div className="text-xs font-bold text-slate-900">Pearson VUE Suites Nationwide</div>
                <p className="text-[11px] text-slate-500">Convenient testing within 20 miles of 96% of the UK population.</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Official CITB Approved Training Organisation (ATO) Standards</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As an accredited CITB ATO, Site Safe Alliance complies with the Construction Skills Training Standards. We are directly integrated into the CITB Construction Training Register (CTR), meaning delegate qualifications are uploaded automatically upon exam completion, and levy-paying employers receive automatic grant reimbursements directly into their bank accounts without tedious manual claim forms.
              </p>
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
      </main>

      {/* 4. CLEAN PRODUCTION FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Column */}
            <div className="space-y-3 md:col-span-1">
              <SiteSafeLogo variant="horizontal" size="md" theme="dark" showTagline={true} />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Site Safe Alliance Ltd is an official UK CITB Approved Training Organisation (ATO) and authorized Pearson VUE testing network partner.
              </p>
              <div className="text-[10px] font-mono text-slate-500 space-y-0.5 pt-1">
                <div>UK Company Registration: 08931245</div>
                <div>VAT Registration: GB 992 8410 12</div>
                <div>CITB Provider ATO: #9841</div>
              </div>
            </div>

            {/* Core Services Links */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Core Qualifications</h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => { setIndivForm({...indivForm, course: 'green-labourer-pkg'}); navigateTo('individual-booking'); }} className="hover:text-white">Green Labourer Card Package (£320)</button></li>
                <li><button onClick={() => { setIndivForm({...indivForm, course: 'citb-hse-test'}); navigateTo('individual-booking'); }} className="hover:text-white">CITB Touchscreen Test (£50)</button></li>
                <li><button onClick={() => { setIndivForm({...indivForm, course: 'cscs-card-app'}); navigateTo('individual-booking'); }} className="hover:text-white">CSCS Card Application (£65)</button></li>
                <li><button onClick={() => { setIndivForm({...indivForm, course: 'l1-hs-course'}); navigateTo('individual-booking'); }} className="hover:text-white">Level 1 Health &amp; Safety Course (£200)</button></li>
                <li><button onClick={() => { setIndivForm({...indivForm, course: 'smsts-5day'}); navigateTo('individual-booking'); }} className="hover:text-white">CITB SMSTS (5-Day Site Management)</button></li>
              </ul>
            </div>

            {/* Employers & Centres */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">Employers &amp; Portals</h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => navigateTo('employer-booking')} className="hover:text-white">Corporate Cohort PO Booking</button></li>
                <li><button onClick={() => navigateTo('services')} className="hover:text-white">Full Course Directory</button></li>
                <li><button onClick={() => navigateTo('about')} className="hover:text-white">CITB Levy Grant Assistance</button></li>
                <li><button onClick={() => navigateTo('contact')} className="hover:text-white">150+ Nationwide Test Centres</button></li>
              </ul>
            </div>

            {/* Direct Contact */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono">National Booking Desk</h4>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-[#78A6B8]" />
                  <a href="tel:+442036084780" className="font-mono text-white font-bold hover:underline">
                    +44 20 3608 4780
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>bookings@sitesafealliance.co.uk</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>25 Canada Square, Canary Wharf, London E14 5LB</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              &copy; 2026 Site Safe Alliance Ltd. All rights reserved. Registered in England and Wales.
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
