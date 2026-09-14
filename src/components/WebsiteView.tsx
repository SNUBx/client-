import React, { useState, useRef } from 'react';
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
  Lock,
  Info,
  UploadCloud,
  FileCheck,
  Paperclip
} from 'lucide-react';

export type WebsitePage = 'home' | 'services' | 'individual-booking' | 'employer-booking' | 'about' | 'contact' | 'privacy' | 'terms';

export const SERVICE_OPTIONS = [
  { id: 'cscs-card-app', name: 'CSCS Card Application', price: '£55 + VAT' },
  { id: 'citb-hse-test', name: 'CITB Health, Safety & Environment Test', price: '£50' },
  { id: 'training-courses', name: 'Training Courses', price: '£200 + VAT' },
  { id: 'green-labourer-pkg', name: 'Green Labourer Card Package', price: '£295 + VAT' },
  { id: 'other', name: 'Other (please specify)', price: '' },
];

export const CONFIRMATION_NOTE = "Please select the service you require. Once we receive your request, our team will review the information and contact you to confirm the correct service and complete the booking process.";

interface WebsiteViewProps {
  initialPage?: WebsitePage;
}

export const WebsiteView: React.FC<WebsiteViewProps> = ({ initialPage = 'home' }) => {
  const [currentPage, setCurrentPage] = useState<WebsitePage>(initialPage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'package' | 'test' | 'course'>('all');
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Book for Yourself Form State
  const [indivForm, setIndivForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    serviceRequired: 'CSCS Card Application',
    otherService: '',
    preferredDate: '',
    additionalNotes: '',
  });

  // Book for Your Employees Form State
  const [employerForm, setEmployerForm] = useState({
    contactName: '',
    companyName: '',
    email: '',
    phone: '',
    companyAddress: '',
    numberOfEmployees: '',
    serviceRequired: 'Green Labourer Card Package',
    otherService: '',
    employeeListFile: null as File | null,
    additionalNotes: '',
  });

  // Priority Callback Form State
  const [contactForm, setContactForm] = useState({
    fullName: '',
    phone: '',
    serviceRequired: 'CSCS Card Application'
  });

  const getCoursePrice = (serviceNameOrKey: string) => {
    switch (serviceNameOrKey) {
      case 'citb-hse-test':
      case 'CITB Health, Safety & Environment Test':
        return { label: '£50', amount: 50, vatIncluded: false };
      case 'cscs-card-app':
      case 'CSCS Card Application':
        return { label: '£55 + VAT', amount: 55, vatIncluded: true };
      case 'training-courses':
      case 'l1-hs-course':
      case 'Training Courses':
        return { label: '£200 + VAT', amount: 200, vatIncluded: true };
      case 'green-labourer-pkg':
      case 'Green Labourer Card Package':
        return { label: '£295 + VAT', amount: 295, vatIncluded: true };
      case 'other':
      case 'Other (please specify)':
        return { label: 'Quote on review', amount: 0, vatIncluded: false };
      default:
        return { label: '£295 + VAT', amount: 295, vatIncluded: true };
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIndividualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const serviceName = indivForm.serviceRequired === 'Other (please specify)' 
      ? (indivForm.otherService || 'Other service') 
      : indivForm.serviceRequired;

    let ref = `SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    let message = `Request received for ${indivForm.fullName}! Our team will review your request for "${serviceName}" and contact you at ${indivForm.phone || indivForm.email} to confirm the correct service and complete the booking process. (Ref: ${ref})`;

    try {
      const res = await fetch('/api/bookings/individual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: indivForm.fullName,
          email: indivForm.email,
          phone: indivForm.phone,
          serviceRequired: indivForm.serviceRequired,
          otherService: indivForm.otherService,
          preferredDate: indivForm.preferredDate,
          additionalNotes: indivForm.additionalNotes
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.referenceNumber) ref = data.referenceNumber;
        if (data.message) message = `${data.message} (Ref: ${ref})`;
      }
    } catch {
      // Graceful fallback for static hostings like GitHub Pages where /api is not running
    } finally {
      setIsSubmitting(false);
      try {
        confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 } });
      } catch {
        // Safe if confetti fails
      }
      setBookingSuccess(message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEmployerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const serviceName = employerForm.serviceRequired === 'Other (please specify)' 
      ? (employerForm.otherService || 'Other service') 
      : employerForm.serviceRequired;

    let ref = `CORP-SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    let message = `Corporate request received for ${employerForm.companyName} (${employerForm.contactName})! Our team will review your enquiry for "${serviceName}" (${employerForm.numberOfEmployees ? `${employerForm.numberOfEmployees} employees` : 'group cohort'}) and contact you at ${employerForm.phone || employerForm.email} to confirm the correct service and complete the booking process. (Ref: ${ref})`;

    try {
      const res = await fetch('/api/bookings/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contactName: employerForm.contactName,
          companyName: employerForm.companyName,
          email: employerForm.email,
          phone: employerForm.phone,
          companyAddress: employerForm.companyAddress,
          numberOfEmployees: employerForm.numberOfEmployees,
          serviceRequired: employerForm.serviceRequired,
          otherService: employerForm.otherService,
          additionalNotes: employerForm.additionalNotes
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.referenceNumber) ref = data.referenceNumber;
        if (data.message) message = `${data.message} (Ref: ${ref})`;
      }
    } catch {
      // Graceful fallback for static hostings like GitHub Pages
    } finally {
      setIsSubmitting(false);
      try {
        confetti({ particleCount: 110, spread: 85, origin: { y: 0.6 } });
      } catch {
        // Safe if confetti fails
      }
      setBookingSuccess(message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    let ref = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    let message = `Thank you ${contactForm.fullName}! A senior booking coordinator will call you back within 15 minutes regarding ${contactForm.serviceRequired}. (Ref: ${ref})`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.referenceNumber) ref = data.referenceNumber;
        if (data.message) message = `${data.message} (Ref: ${ref})`;
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsSubmitting(false);
      setBookingSuccess(message);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateTo = (page: WebsitePage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allCourses = [
    {
      id: 'cscs-card-app',
      title: 'CSCS Card Application',
      category: 'core',
      price: '£55 + VAT',
      amount: 55,
      duration: '24–48h Dispatch',
      cert: 'Official CSCS Card',
      highlight: false,
      description: 'Official CSCS Card application and verification processing service. Automated test verification and express smart card delivery.',
      features: ['Qualification & test verification', 'Digital smart pass access', 'Physical smart card dispatch', 'Dedicated application coordinator']
    },
    {
      id: 'citb-hse-test',
      title: 'CITB Health, Safety & Environment Test',
      category: 'core',
      price: '£50',
      amount: 50,
      duration: '45 Mins',
      cert: 'Pearson VUE Network',
      highlight: false,
      description: 'Official 45-minute touchscreen test required for all CSCS cards. Conducted across 150+ UK Pearson VUE testing centres with immediate score printout.',
      features: ['Operatives & Specialists test options', '150+ Pearson VUE UK centres', 'Same-day & next-day slots', 'Immediate score report printout']
    },
    {
      id: 'training-courses',
      title: 'Training Courses',
      category: 'core',
      price: '£200 + VAT',
      amount: 200,
      duration: '1 Day',
      cert: '1-Day Level 1 Course',
      highlight: false,
      description: 'Accredited 1-day Level 1 Health & Safety in a Construction Environment course providing the lifetime qualification for the 5-Year Green CSCS Labourer Card.',
      features: ['Lifetime qualification (never expires)', 'Classroom or live online format', 'Ofqual regulated syllabus', 'Free comprehensive study pack']
    },
    {
      id: 'green-labourer-pkg',
      title: 'Green Labourer Card Package',
      category: 'core',
      price: '£295 + VAT',
      amount: 295,
      duration: 'Complete Route',
      cert: 'All-In-One Solution',
      highlight: true,
      description: 'Complete all-in-one package: 1-Day Level 1 Health & Safety Course + CITB HS&E Touchscreen Test + Official 5-Year Green CSCS Card with free retake support.',
      features: ['Regulated Level 1 H&S Course', 'CITB Touchscreen Test Booking', 'Official CSCS Card Application', 'Full support & free retake guidance']
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
      {/* 2. PRIMARY LIVE WEBSITE NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer transition-transform active:scale-98"
            id="brand-logo-link"
          >
            <SiteSafeLogo variant="horizontal" size="md" theme="light" showTagline={false} />
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
              Services &amp; Pricing
            </button>
            <button 
              onClick={() => navigateTo('individual-booking')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'individual-booking' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Book for Yourself
            </button>
            <button 
              onClick={() => navigateTo('employer-booking')}
              className={`transition-colors hover:text-[#263B52] pb-1 cursor-pointer ${
                currentPage === 'employer-booking' ? 'text-[#263B52] font-bold border-b-2 border-[#263B52]' : ''
              }`}
            >
              Book for Your Employees
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
              <span>Book for Yourself</span>
            </button>

            <button
              onClick={() => navigateTo('employer-booking')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-200 transition-all cursor-pointer"
              id="header-book-employer-btn"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Book for Your Employees</span>
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
              <button onClick={() => navigateTo('services')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Services &amp; Pricing</button>
              <button onClick={() => navigateTo('individual-booking')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Book for Yourself</button>
              <button onClick={() => navigateTo('employer-booking')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Book for Your Employees</button>
              <button onClick={() => navigateTo('about')} className="text-left py-2 px-3 rounded hover:bg-slate-50">About Site Safe Alliance</button>
              <button onClick={() => navigateTo('contact')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Contact &amp; 12 Nationwide Hubs</button>
              <button onClick={() => navigateTo('privacy')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Privacy Policy</button>
              <button onClick={() => navigateTo('terms')} className="text-left py-2 px-3 rounded hover:bg-slate-50">Terms &amp; Conditions</button>
            </div>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button onClick={() => navigateTo('individual-booking')} className="w-full py-2.5 rounded-lg bg-[#263B52] text-white font-bold text-center">
                Book for Yourself
              </button>
              <button onClick={() => navigateTo('employer-booking')} className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 font-bold text-center border border-slate-200">
                Book for Your Employees
              </button>
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
                    <span>INDEPENDENT CITB &amp; CSCS SUPPORT SERVICES</span>
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
                        <h3 className="text-sm font-bold text-slate-900">Service Selection &amp; Booking</h3>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Live Service
                      </span>
                    </div>

                    {/* Confirmation note */}
                    <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 text-sky-950 flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#263B52] shrink-0 mt-0.5" />
                      <p className="text-[11px] leading-relaxed">
                        {CONFIRMATION_NOTE}
                      </p>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <label className="block text-slate-700 font-semibold mb-1">Service Required</label>
                        <select 
                          value={indivForm.serviceRequired}
                          onChange={(e) => {
                            const val = e.target.value;
                            setIndivForm({ ...indivForm, serviceRequired: val });
                            setEmployerForm({ ...employerForm, serviceRequired: val });
                          }}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                        >
                          <option value="CSCS Card Application">CSCS Card Application — £55 + VAT</option>
                          <option value="CITB Health, Safety & Environment Test">CITB Health, Safety &amp; Environment Test — £50</option>
                          <option value="Training Courses">Training Courses — £200 + VAT</option>
                          <option value="Green Labourer Card Package">Green Labourer Card Package — £295 + VAT</option>
                          <option value="Other (please specify)">Other (please specify)</option>
                        </select>
                      </div>

                      {indivForm.serviceRequired === 'Other (please specify)' && (
                        <div>
                          <label className="block text-slate-700 font-semibold mb-1">Please specify service required *</label>
                          <input
                            type="text"
                            placeholder="Describe the qualification or support you need"
                            value={indivForm.otherService}
                            onChange={(e) => setIndivForm({ ...indivForm, otherService: e.target.value })}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                          />
                        </div>
                      )}

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] text-slate-500 block">Service Fee</span>
                          <span className="text-base font-extrabold text-[#263B52] font-mono">
                            {getCoursePrice(indivForm.serviceRequired).label}
                          </span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" /> Reviewed by Team
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          onClick={() => navigateTo('individual-booking')}
                          className="w-full py-2.5 px-3 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
                        >
                          <User className="w-3.5 h-3.5 text-[#78A6B8]" />
                          <span>Book for Yourself</span>
                        </button>
                        <button
                          onClick={() => navigateTo('employer-booking')}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs border border-slate-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Building2 className="w-3.5 h-3.5 text-slate-600" />
                          <span>For Employees</span>
                        </button>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><Lock className="w-3 h-3 text-slate-400" /> SSL 256-Bit Encrypted</span>
                      <span>Independent Support Service</span>
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
                    All prices are transparent with booking assistance, test scheduling, and application support.
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
                              <div className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-500" /> Ofqual regulated qualification</div>
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
                            let servName = 'Green Labourer Card Package';
                            if (service.code === 'CITB_HSE_TEST') servName = 'CITB Health, Safety & Environment Test';
                            else if (service.code === 'CSCS_CARD_APP') servName = 'CSCS Card Application';
                            else if (service.code === 'L1_HS_COURSE') servName = 'Training Courses';
                            setIndivForm({ ...indivForm, serviceRequired: servName });
                            setEmployerForm({ ...employerForm, serviceRequired: servName });
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
                <Award className="w-4 h-4" /> CONSTRUCTION COURSE DIRECTORY
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
                        setIndivForm({ ...indivForm, serviceRequired: course.title });
                        setEmployerForm({ ...employerForm, serviceRequired: course.title });
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
        {/* PAGE 3: BOOK FOR YOURSELF                                                 */}
        {/* ========================================================================= */}
        {currentPage === 'individual-booking' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 flex items-center gap-2">
                  <User className="w-6 h-6 text-[#78A6B8]" />
                  Book for Yourself
                </h1>
                <p className="text-xs text-slate-600 mt-1">Individual booking request for CSCS cards, CITB tests, and safety qualifications.</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#263B52]/10 text-[#263B52] border border-[#263B52]/20">
                Individual Service
              </span>
            </div>

            {/* Confirmation Note Callout */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3 shadow-xs">
              <Info className="w-5 h-5 text-[#263B52] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs uppercase tracking-wider text-[#263B52] block font-mono">Confirmation Note</span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {CONFIRMATION_NOTE}
                </p>
              </div>
            </div>

            <form onSubmit={handleIndividualSubmit} className="space-y-6 text-xs" id="book-for-yourself-form">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User className="w-4 h-4 text-[#78A6B8]" /> Candidate Details &amp; Service Required
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David O'Connor"
                      value={indivForm.fullName}
                      onChange={(e) => setIndivForm({ ...indivForm, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. david.oconnor@example.com"
                        value={indivForm.email}
                        onChange={(e) => setIndivForm({ ...indivForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +44 7911 123456"
                        value={indivForm.phone}
                        onChange={(e) => setIndivForm({ ...indivForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Service Required *</label>
                    <select
                      value={indivForm.serviceRequired}
                      onChange={(e) => setIndivForm({ ...indivForm, serviceRequired: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      required
                    >
                      <option value="CSCS Card Application">CSCS Card Application — £55 + VAT</option>
                      <option value="CITB Health, Safety & Environment Test">CITB Health, Safety &amp; Environment Test — £50</option>
                      <option value="Training Courses">Training Courses — £200 + VAT</option>
                      <option value="Green Labourer Card Package">Green Labourer Card Package — £295 + VAT</option>
                      <option value="Other (please specify)">Other (please specify)</option>
                    </select>
                  </div>

                  {indivForm.serviceRequired === 'Other (please specify)' && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <label className="block text-slate-900 font-semibold mb-1">Please specify the service you require *</label>
                      <input
                        type="text"
                        required
                        placeholder="Please describe the test, card, or course you need..."
                        value={indivForm.otherService}
                        onChange={(e) => setIndivForm({ ...indivForm, otherService: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Preferred Date (if applicable)
                    </label>
                    <input
                      type="date"
                      value={indivForm.preferredDate}
                      onChange={(e) => setIndivForm({ ...indivForm, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                    />
                    <span className="text-[11px] text-slate-500 mt-1 block">Optional: specify if you have a target testing or training date in mind.</span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Any specific questions, preferred testing hub location, or special requirements..."
                      value={indivForm.additionalNotes}
                      onChange={(e) => setIndivForm({ ...indivForm, additionalNotes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing breakdown & Confirmation */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Service Requested:</span>
                    <span className="text-sm font-bold text-slate-900">
                      {indivForm.serviceRequired === 'Other (please specify)' 
                        ? (indivForm.otherService || 'Custom service (pending review)') 
                        : indivForm.serviceRequired}
                    </span>
                    <div className="text-xl font-extrabold text-[#263B52] font-mono mt-1">
                      {getCoursePrice(indivForm.serviceRequired).label}
                    </div>
                  </div>
                  <div className="text-left sm:text-right text-[11px] text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <div className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1">
                      <Check className="w-3.5 h-3.5" /> No payment taken now
                    </div>
                    <div>Team will call to confirm service and details</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  id="submit-book-for-yourself-btn"
                >
                  <Send className="w-4 h-4 text-[#78A6B8]" />
                  <span>Submit Request — Book for Yourself</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PAGE 4: BOOK FOR YOUR EMPLOYEES                                           */}
        {/* ========================================================================= */}
        {currentPage === 'employer-booking' && (
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-10 space-y-8">
            <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-[#78A6B8]" />
                  Book for Your Employees
                </h1>
                <p className="text-xs text-slate-600 mt-1">Corporate booking support, workforce roster management, and group certification assistance.</p>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-[#263B52]/10 text-[#263B52] border border-[#263B52]/20">
                Employer Service
              </span>
            </div>

            {/* Confirmation Note Callout */}
            <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 flex items-start gap-3 shadow-xs">
              <Info className="w-5 h-5 text-[#263B52] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-bold text-xs uppercase tracking-wider text-[#263B52] block font-mono">Confirmation Note</span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {CONFIRMATION_NOTE}
                </p>
              </div>
            </div>

            <form onSubmit={handleEmployerSubmit} className="space-y-6 text-xs" id="book-for-employees-form">
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Building2 className="w-4 h-4 text-[#78A6B8]" /> Company &amp; Contact Details
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Contact Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={employerForm.contactName}
                        onChange={(e) => setEmployerForm({ ...employerForm, contactName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Construction Ltd"
                        value={employerForm.companyName}
                        onChange={(e) => setEmployerForm({ ...employerForm, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. s.jenkins@apexconstruction.co.uk"
                        value={employerForm.email}
                        onChange={(e) => setEmployerForm({ ...employerForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +44 20 7946 0912"
                        value={employerForm.phone}
                        onChange={(e) => setEmployerForm({ ...employerForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Company Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 Churchill Place, Canary Wharf, London E14 5HU"
                      value={employerForm.companyAddress}
                      onChange={(e) => setEmployerForm({ ...employerForm, companyAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Number of Employees *</label>
                      <input
                        type="number"
                        min="1"
                        required
                        placeholder="e.g. 6"
                        value={employerForm.numberOfEmployees}
                        onChange={(e) => setEmployerForm({ ...employerForm, numberOfEmployees: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Service Required *</label>
                      <select
                        value={employerForm.serviceRequired}
                        onChange={(e) => setEmployerForm({ ...employerForm, serviceRequired: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 font-semibold text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                        required
                      >
                        <option value="CSCS Card Application">CSCS Card Application — £55 + VAT</option>
                        <option value="CITB Health, Safety & Environment Test">CITB Health, Safety &amp; Environment Test — £50</option>
                        <option value="Training Courses">Training Courses — £200 + VAT</option>
                        <option value="Green Labourer Card Package">Green Labourer Card Package — £295 + VAT</option>
                        <option value="Other (please specify)">Other (please specify)</option>
                      </select>
                    </div>
                  </div>

                  {employerForm.serviceRequired === 'Other (please specify)' && (
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                      <label className="block text-slate-900 font-semibold mb-1">Please specify the service you require *</label>
                      <input
                        type="text"
                        required
                        placeholder="Please describe the workforce requirements or custom package needed..."
                        value={employerForm.otherService}
                        onChange={(e) => setEmployerForm({ ...employerForm, otherService: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Upload Employee List (optional) */}
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Upload Employee List (optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 hover:border-[#263B52] rounded-xl p-4 bg-slate-50 hover:bg-slate-100/60 transition-all text-center">
                      {employerForm.employeeListFile ? (
                        <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center gap-2.5 text-left">
                            <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div>
                              <div className="font-semibold text-slate-900 text-xs truncate max-w-xs">
                                {employerForm.employeeListFile.name}
                              </div>
                              <div className="text-[10px] text-slate-500 font-mono">
                                {(employerForm.employeeListFile.size / 1024).toFixed(1)} KB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setEmployerForm({ ...employerForm, employeeListFile: null })}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                            title="Remove file"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <input
                            type="file"
                            accept=".csv,.xlsx,.xls,.pdf,.docx,.doc"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setEmployerForm({ ...employerForm, employeeListFile: e.target.files[0] });
                              }
                            }}
                            className="hidden"
                          />
                          <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                          <div className="font-semibold text-slate-800 text-xs">
                            Click to upload or drag and drop employee roster
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            Accepted formats: CSV, Excel (.xlsx, .xls), PDF, Word (.docx)
                          </div>
                        </label>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Additional Notes</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Site locations, preferred booking timelines, candidate availability, or invoicing instructions..."
                      value={employerForm.additionalNotes}
                      onChange={(e) => setEmployerForm({ ...employerForm, additionalNotes: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs sm:text-sm focus:ring-2 focus:ring-[#263B52] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing Overview & Submission */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Service Rate:</span>
                    <span className="text-sm font-bold text-slate-900">
                      {employerForm.serviceRequired === 'Other (please specify)' 
                        ? (employerForm.otherService || 'Custom group quote (pending review)') 
                        : employerForm.serviceRequired}
                    </span>
                    <div className="text-xl font-extrabold text-[#263B52] font-mono mt-1">
                      {getCoursePrice(employerForm.serviceRequired).label} <span className="text-xs font-normal text-slate-500">{employerForm.numberOfEmployees ? `(x ${employerForm.numberOfEmployees} employees)` : 'per employee'}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right text-[11px] text-slate-500 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200">
                    <div className="text-emerald-700 font-semibold flex items-center sm:justify-end gap-1">
                      <Check className="w-3.5 h-3.5" /> No instant charge
                    </div>
                    <div>Corporate invoice &amp; service confirmation by team</div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#263B52] hover:bg-[#1B2A3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  id="submit-book-for-employees-btn"
                >
                  <Send className="w-4 h-4 text-[#78A6B8]" />
                  <span>Submit Request — Book for Your Employees</span>
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

                <form onSubmit={handleContactSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Your Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      value={contactForm.fullName}
                      onChange={(e) => setContactForm({ ...contactForm, fullName: e.target.value })}
                      placeholder="e.g. John Henderson" 
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52]" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="e.g. +44 7123 456789" 
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52] font-mono" 
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Service Required / Enquiry Type *</label>
                    <select 
                      value={contactForm.serviceRequired}
                      onChange={(e) => setContactForm({ ...contactForm, serviceRequired: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#263B52]"
                    >
                      <option>CSCS Card Application</option>
                      <option>CITB Health, Safety &amp; Environment Test</option>
                      <option>Training Courses</option>
                      <option>Green Labourer Card Package</option>
                      <option>Other (please specify)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-lg bg-[#263B52] text-white font-bold hover:bg-[#1B2A3B] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5 text-[#78A6B8]" />
                    <span>{isSubmitting ? 'Submitting Request...' : 'Request Priority Callback'}</span>
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
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
              <p>
                Site Safe Alliance Ltd (“we”, “us”, “our”) is committed to protecting and respecting your privacy.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store, and protect your personal data when you use our website or services.
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">1. Information We Collect</h2>
                <p>We may collect and process the following personal data:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Full name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Address (if required for applications)</li>
                  <li>Identification details (where required for bookings)</li>
                  <li>Employment or qualification information relevant to CITB/CSCS applications</li>
                  <li>Any other information you provide when contacting us or using our services</li>
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">2. How We Use Your Information</h2>
                <p>We use your personal data to:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Provide administrative support services</li>
                  <li>Process CITB Health, Safety &amp; Environment (HS&amp;E) Test bookings</li>
                  <li>Assist with CSCS card applications</li>
                  <li>Arrange construction training bookings</li>
                  <li>Communicate with you regarding your booking or enquiry</li>
                  <li>Meet legal and regulatory obligations</li>
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">3. Legal Basis for Processing</h2>
                <p>We process your personal data based on:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Contractual necessity (to deliver services you request)</li>
                  <li>Legal obligations</li>
                  <li>Legitimate business interests (to operate and improve our services)</li>
                </ul>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">4. Sharing Your Information</h2>
                <p>We may share your personal information only where necessary to provide the services you have requested. This may include:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>CITB (Construction Industry Training Board)</li>
                  <li>CSCS (Construction Skills Certification Scheme)</li>
                  <li>Pearson VUE (where applicable)</li>
                  <li>Approved construction training providers</li>
                  <li>Secure payment processors (where applicable)</li>
                  <li>Other service providers necessary to complete your booking or application</li>
                </ul>
                <p className="pt-2">
                  We only share the information required to process the requested service.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">5. Data Storage and Security</h2>
                <p>
                  We take appropriate technical and organisational measures to protect your data against loss, misuse, unauthorised access, disclosure, or alteration. Your data is stored securely and is only accessed by authorised personnel.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">6. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to provide services, comply with legal obligations, resolve disputes, and maintain business records. After this period, data is securely deleted or anonymised.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">7. Your Rights</h2>
                <p>Under UK GDPR, you have the right to:</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>Request access to your personal data</li>
                  <li>Request correction of inaccurate data</li>
                  <li>Request deletion of your data (where applicable)</li>
                  <li>Object to processing in certain circumstances</li>
                  <li>Request restriction of processing</li>
                </ul>
                <p className="pt-2">
                  To exercise these rights, please contact us using the details on our website.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">8. Third-Party Services</h2>
                <p>
                  Site Safe Alliance Ltd is an independent administrative support company. We assist customers with bookings and applications using third-party organisations’ systems where required.
                </p>
                <p>
                  We are not affiliated with, endorsed by, or acting on behalf of CITB, CSCS, Pearson VUE, or any training provider.
                </p>
                <p>
                  Services provided by these organisations remain subject to their own terms, conditions, policies, and decisions.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">9. International Users</h2>
                <p>
                  If you are located outside the UK, your information may be transferred to and processed in the United Kingdom for the purpose of providing our services.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any changes will be published on this page.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">11. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or how we process your personal data, please contact us using the details provided on our website.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Read more about our independent administrative role:
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
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
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
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
              <p>
                Please read these Terms &amp; Conditions carefully. By accessing our website or using our services, you agree to be bound by these terms.
              </p>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">1. Introduction</h2>
                <p>
                  These Terms &amp; Conditions govern your use of the Site Safe Alliance Ltd website and the administrative support services we provide.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">2. Services</h2>
                <p>
                  Site Safe Alliance Ltd is an independent administrative support company. We assist customers with:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>CITB Health, Safety &amp; Environment (HS&amp;E) Test bookings</li>
                  <li>CSCS card application assistance</li>
                  <li>Construction training bookings</li>
                </ul>
                <p className="pt-2">
                  We are not affiliated with, endorsed by, or acting on behalf of CITB, CSCS, Pearson VUE, or any training provider. We do not issue CITB tests, CSCS cards, or training certificates.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">3. Booking and Payment</h2>
                <p>
                  All bookings are subject to availability and confirmation by the relevant third-party organisation.
                </p>
                <p>
                  The prices for our administrative support services are displayed on our website and may be updated from time to time without prior notice.
                </p>
                <p>
                  Where applicable, the official CITB Health, Safety &amp; Environment (HS&amp;E) Test fee and any separate Site Safe Alliance Ltd administration or service fee will be clearly identified before payment is made.
                </p>
                <p>
                  Payments made to third-party organisations remain subject to their own terms, conditions, pricing, and policies.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">4. Cancellations and Refunds</h2>
                <p>
                  Cancellation, rescheduling, and refund policies vary depending on the relevant third-party organisation, including CITB, Pearson VUE, CSCS, and approved training providers.
                </p>
                <p>
                  Please contact us regarding your specific booking, and we will advise you of the applicable policy.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">5. Accuracy of Information</h2>
                <p>
                  You are responsible for ensuring that all information provided to us is accurate, complete, and up to date.
                </p>
                <p>
                  Site Safe Alliance Ltd is not responsible for delays, rejected applications, failed bookings, or additional costs arising from inaccurate or incomplete information supplied by the customer.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">6. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and other materials, is the property of Site Safe Alliance Ltd or its licensors and is protected by applicable intellectual property laws.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">7. Limitation of Liability</h2>
                <p>
                  To the fullest extent permitted by law, Site Safe Alliance Ltd shall not be liable for any indirect, incidental, consequential, or special damages arising from the use of our website or services.
                </p>
                <p>
                  Our total liability shall not exceed the amount paid by the customer for the specific administrative support service provided.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">8. Third-Party Services</h2>
                <p>
                  Site Safe Alliance Ltd provides independent administrative support services. We assist customers with bookings and applications using third-party organisations’ systems where required.
                </p>
                <p>
                  We are not affiliated with, endorsed by, or acting on behalf of CITB, CSCS, Pearson VUE, or any training provider.
                </p>
                <p>
                  Any services provided by third-party organisations remain subject to their own terms, conditions, policies, procedures, pricing, and decisions. Site Safe Alliance Ltd is not responsible for the actions, omissions, delays, or decisions of those organisations.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">9. Governing Law</h2>
                <p>
                  These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of England and Wales.
                </p>
                <p>
                  Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">10. Changes to These Terms</h2>
                <p>
                  We may update these Terms &amp; Conditions from time to time. Updated versions will be published on this website. Continued use of our website or services constitutes acceptance of the revised Terms &amp; Conditions.
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-100">
                <h2 className="text-base font-bold text-slate-900">11. Contact Us</h2>
                <p>
                  If you have any questions regarding these Terms &amp; Conditions, please contact us using the details provided on our website.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-500">
                  Read more about our independent administrative role:
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
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition-colors cursor-pointer"
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
              &copy; 2026 Site Safe Alliance Ltd. All rights reserved. Registered in England &amp; Wales.
            </div>
            <div className="text-slate-400 text-[10px]">
              Independent Administrative Support &amp; CITB Booking Service
            </div>
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
