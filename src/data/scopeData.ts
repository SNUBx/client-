import { BreakpointSpec, LogoSpec, NavigationItem, FormFieldDefinition, IntegrationEndpoint, CoreServiceItem } from '../types';

export const FOUR_CORE_SERVICES: CoreServiceItem[] = [
  {
    code: "CITB-HSE-TEST",
    title: "CITB Health, Safety & Environment Test",
    duration: "45 Minutes",
    priceGbp: 50,
    priceLabel: "£50 incl. VAT",
    targetAudience: "All Operatives, Labourers, Specialists & Managers",
    accreditations: ["CITB Touchscreen Test", "Pearson VUE Approved", "CSCS Prerequisite"],
    deliveryOptions: ["150+ UK Pearson VUE Test Centres", "Walk-in & Weekend Priority Slots"],
    citbGrantRebate: "Qualifies for CITB Testing Levy Grant",
    smartflowIvrBranch: "IVR Option 1 -> Pearson VUE Invigilation Team",
    description: "The official CITB Health, Safety and Environment (HS&E) touchscreen test required before applying for any new or renewal CSCS card. Tests key knowledge of UK site safety laws, hazard controls, and occupational health.",
    keyModules: [
      "Core UK Health & Safety Legislation and CDM Regulations",
      "Hazard Awareness, Dynamic Risk Assessment & Safe Working Practices",
      "Environmental Protection, Waste Minimisation & Hazardous Substances (COSHH)"
    ]
  },
  {
    code: "CSCS-CARD-APP",
    title: "CSCS Card Application",
    duration: "Fast-Track 24-48h Dispatch",
    priceGbp: 65,
    priceLabel: "£65 incl. VAT",
    targetAudience: "Qualified Site Workers, Labourers, Trades & Supervisors",
    accreditations: ["Official CSCS Partner Scheme", "NFC & QR SmartCard Enabled"],
    deliveryOptions: ["Digital Virtual Card (Instant App Access)", "Physical NFC SmartCard (1st Class Tracked)"],
    citbGrantRebate: "Official Card Issuance via CSCS Scheme",
    smartflowIvrBranch: "IVR Option 2 -> Card Verification & Fast-Track Dispatch",
    description: "Official CSCS Card application and verification processing service. Includes automated CITB test matching, qualification certificate auditing, photo compliance review, and express smart card dispatch.",
    keyModules: [
      "Automated CITB Test Result Verification & National Database Link",
      "Proof of Qualification & NVQ / Level 1 Certificate Verification",
      "Direct CSCS Database Registration and NFC SmartCard Production"
    ]
  },
  {
    code: "L1-HS-COURSE",
    title: "Level 1 Health & Safety in a Construction Environment Course",
    duration: "1 Day (6-8 Hours)",
    priceGbp: 200,
    priceLabel: "£200 incl. VAT",
    targetAudience: "New Entrants, Apprentices, Labourers & Trade Assistants",
    accreditations: ["CITB ATO Approved", "CSCS Lifetime Qualification", "Ofqual Regulated"],
    deliveryOptions: ["12 National Classroom Centres", "Live Virtual Online Classroom (Zoom)"],
    citbGrantRebate: "£60/candidate direct CITB Levy Rebate",
    smartflowIvrBranch: "IVR Option 3 -> Training Advisors & Instructors",
    description: "Accredited Level 1 Award in Health and Safety in a Construction Environment. Provides the lifetime qualification required alongside the CITB test to apply for the 5-Year Green CSCS Labourer Card.",
    keyModules: [
      "Principles of Construction Risk Assessment & Safe Working Systems",
      "Safe Manual Handling, Ergonomics & Working at Height Standards",
      "Health Risks: Noise, Vibration, Respirable Crystalline Silica (RCS) & COSHH"
    ]
  },
  {
    code: "GREEN-LABOURER-PKG",
    title: "Green Labourer Card Package",
    duration: "All-in-One Complete Route",
    priceGbp: 320,
    priceLabel: "£320 incl. VAT",
    targetAudience: "New Site Operatives, General Labourers & Trade Starters",
    accreditations: ["Complete CSCS Green Card Package", "CITB ATO Certified", "All Fees Included"],
    deliveryOptions: ["All-in-One Fast-Track", "Virtual Classroom Course + Local CITB Touchscreen Exam"],
    citbGrantRebate: "Eligible for CITB Levy Rebate on completion",
    smartflowIvrBranch: "IVR Option 3 -> Training Advisors & Instructors",
    description: "Comprehensive all-in-one package containing everything required to get on site: Level 1 H&S Course + Official CITB HS&E Touchscreen Test + Official 5-Year Green CSCS Card Application with guaranteed pass support.",
    keyModules: [
      "Level 1 Health & Safety Course & Certificate Processing (£200 incl. VAT value)",
      "Official CITB HS&E Touchscreen Exam at Local Pearson Centre (£50 incl. VAT value)",
      "Official CSCS 5-Year Green Card Application & Priority Post (£65 incl. VAT value)",
      "Dedicated Personal Booking Coordinator & Unlimited Online Revision Material"
    ]
  }
];

export const SERVICES_LAYOUT_SPEC = {
  sectionTitle: "Specific Services Section Layout & Card Architecture",
  gridStructure: {
    desktop: "3-Column Responsive Bento Grid with 24px gutter and sticky category sidebar/pill filters",
    tablet: "2-Column Adaptive Card Grid with horizontal scrolling category chips",
    mobile: "Single-Column High-Density Stack with expandable syllabus accordions and sticky booking drawer"
  },
  categories: [
    {
      id: "core-flagship-services",
      name: "Core Fast-Track Certifications & Cards",
      badge: "Final Approved Pricing (incl. VAT)",
      description: "Direct-entry essential construction certifications and CSCS card pathways with guaranteed transparent pricing including VAT.",
      courses: FOUR_CORE_SERVICES
    },
    {
      id: "citb-site-safety",
      name: "CITB Site Safety Plus",
      badge: "Mandatory Site Leadership",
      description: "Industry-standard CITB accredited training required by tier-1 contractors, major housebuilders, and infrastructure clients across the UK.",
      courses: [
        {
          code: "CITB-SMSTS-5D",
          title: "Site Management Safety Training Scheme (SMSTS)",
          duration: "5 Days (Block or 1-Day/Week)",
          targetAudience: "Site Managers, Project Directors, Quantity Surveyors",
          priceGbp: 495,
          citbGrantRebate: "£240/candidate direct CITB levy rebate",
          accreditations: ["CITB ATO", "Build UK Approved", "HSE Recognised"],
          deliveryOptions: ["12 National Training Hubs", "Virtual Zoom Invigilated", "Dedicated On-Site Cohort"],
          keyModules: [
            "CDM Regulations 2015 & Site Statutory Duties",
            "Site Layout, Logistics & Confined Space Hazard Control",
            "Scaffolding, Working at Heights & Temporary Works Coordination",
            "High-Voltage Electrical, Demolition & Excavation Protocols"
          ]
        },
        {
          code: "CITB-SSSTS-2D",
          title: "Site Supervisor Safety Training Scheme (SSSTS)",
          duration: "2 Days",
          targetAudience: "Site Supervisors, Gangers, First-Line Team Leaders",
          priceGbp: 260,
          citbGrantRebate: "£140/candidate direct CITB levy rebate",
          accreditations: ["CITB ATO", "CSCS Supervisor Tier"],
          deliveryOptions: ["Classroom Hubs", "Live Online Zoom", "Client Premises"],
          keyModules: [
            "Supervisory Legal Liabilities & Tool-box Talks Delivery",
            "Behavioural Safety & Dynamic Risk Assessments (RAMS)",
            "Hazard Identification & Occupational Health Monitoring"
          ]
        },
        {
          code: "CITB-HSA-1D",
          title: "Health & Safety Awareness (HSA) - CSCS Green Route",
          duration: "1 Day (7 Hours)",
          targetAudience: "New Entrants, Site Labourers, Trade Operatives",
          priceGbp: 125,
          citbGrantRebate: "£60/candidate direct CITB levy rebate",
          accreditations: ["CITB ATO", "CSCS Gateway"],
          deliveryOptions: ["Classroom", "Virtual Live Classroom"],
          keyModules: [
            "Site Induction Standards & Safe Working Practices",
            "Manual Handling, Fire Safety & Work Equipment Regulations",
            "Environmental Protection & Hazardous Substances (COSHH)"
          ]
        }
      ]
    },
    {
      id: "occupational-medicals",
      name: "Occupational Health & Safety Critical Medicals",
      badge: "SEQOHS Certified",
      description: "Nationally accredited medical screening ensuring fitness for safety critical duties on high-risk construction, rail, and plant operations.",
      courses: [
        {
          code: "MED-FIT2WORK",
          title: "Safety Critical Worker Medical (Fit to Work)",
          duration: "45 Minutes",
          targetAudience: "Plant Operators, Slinger Signallers, Scaffolders, Confined Space Operatives",
          priceGbp: 140,
          citbGrantRebate: "Qualifies for Occupational Health Grant Subsidies",
          accreditations: ["SEQOHS", "CBH Accredited", "Network Rail Compliant"],
          deliveryOptions: ["12 Regional Medical Hubs", "Mobile Occupational Medical Unit (On-Site)"],
          keyModules: [
            "Audiometry (Hearing Screening in calibrated acoustic booth)",
            "Spirometry (Lung Function Testing & Respiratory Health)",
            "Snellen Visual Acuity, Colour Vision & Depth Perception",
            "Musculoskeletal Assessment & Urinalysis / Drug Screening"
          ]
        },
        {
          code: "MED-ASBESTOS",
          title: "Licensed Asbestos Medical Surveillance",
          duration: "60 Minutes",
          targetAudience: "Licensed Asbestos Removal Operatives & Supervisors",
          priceGbp: 175,
          citbGrantRebate: "HSE Statutory Register",
          accreditations: ["HSE Appointed Doctor", "SEQOHS"],
          deliveryOptions: ["Appointed Medical Clinics"],
          keyModules: [
            "Statutory HSE Respiratory Function Surveillance",
            "Chest X-Ray Review & Occupational Exposure History Assessment",
            "Issue of Certificate of Medical Examination (Form FODMS 102)"
          ]
        }
      ]
    },
    {
      id: "nvq-qualifications",
      name: "Construction NVQs (Level 2 – Level 7)",
      badge: "On-Site Assessment (OSAT)",
      description: "Direct vocational pathways to acquire Blue Skilled, Gold Supervisor, and Black Management CSCS cards without taking time off site.",
      courses: [
        {
          code: "NVQ-L6-MANAGEMENT",
          title: "NVQ Level 6 Diploma in Construction Site Management",
          duration: "4 – 12 Weeks (Evidence Portfolio + Professional Discussion)",
          targetAudience: "Senior Site Managers, Contracts Managers, Construction Directors",
          priceGbp: 1450,
          citbGrantRebate: "£600 direct CITB Achievement Grant",
          accreditations: ["CSCS Black Card Eligible", "ProQual / NOCN", "CIOB Pathway"],
          deliveryOptions: ["100% On-Site Assessment (OSAT) & Remote Video Observation"],
          keyModules: [
            "Strategic Project Planning & Supply Chain Management",
            "Controlling Work Progress Against Schedules & Budgetary Targets",
            "Managing Health, Safety & Welfare in the Built Environment"
          ]
        },
        {
          code: "NVQ-L3-SUPERVISION",
          title: "NVQ Level 3 Diploma in Construction Site Supervision",
          duration: "4 – 8 Weeks",
          targetAudience: "First-Line Site Supervisors, Assistant Site Managers",
          priceGbp: 895,
          citbGrantRebate: "£400 direct CITB Achievement Grant",
          accreditations: ["CSCS Gold Card Eligible", "ProQual Approved"],
          deliveryOptions: ["On-Site Workplace Assessment"],
          keyModules: [
            "Planning Work Activities & Organising Resources on Site",
            "Monitoring Dimensional Accuracy & Quality Control",
            "Implementing Health, Safety & Environmental Policies"
          ]
        }
      ]
    },
    {
      id: "emergency-safety",
      name: "Emergency First Aid & Workplace Safety",
      badge: "HSE Compliant",
      description: "Mandatory emergency workplace first aid, fire marshal, and mental health first aid qualifications for site and office teams.",
      courses: [
        {
          code: "FAW-3D",
          title: "First Aid at Work (FAW) - 3 Days",
          duration: "3 Days (18 Hours)",
          targetAudience: "Designated Site First Aiders, High-Risk Environment Teams",
          priceGbp: 210,
          citbGrantRebate: "£140 direct CITB rebate",
          accreditations: ["Qualsafe Awards", "HSE Guidelines 1981"],
          deliveryOptions: ["Classroom Training Centres", "Corporate On-Site"],
          keyModules: [
            "CPR & Automated External Defibrillator (AED) Operation",
            "Trauma Management, Catastrophic Bleeding & Tourniquet Application",
            "Fracture Management, Burns, Eye Injuries & Shock Protocols"
          ]
        },
        {
          code: "FIRE-MARSHAL-1D",
          title: "Certified Fire Marshal & Extinguisher Practical",
          duration: "1 Day (Half-Day or Full-Day)",
          targetAudience: "Site Fire Wardens, Facilities Managers, Safety Representatives",
          priceGbp: 95,
          citbGrantRebate: "Eligible for Small Business Grant",
          accreditations: ["IFE Recognised", "Regulatory Reform (Fire Safety) Order 2005"],
          deliveryOptions: ["Classroom", "On-Site with Live Fire Simulator"],
          keyModules: [
            "Fire Risk Assessment & Evacuation Route Management",
            "Live Fire Extinguisher Handling (Water, CO2, Foam, Powder)",
            "Emergency Liaison with Fire & Rescue Services"
          ]
        }
      ]
    }
  ],
  cardAnatomySpecifications: [
    {
      component: "Accreditation & Scheme Pill",
      spec: "Top-left chip with scheme color coding (e.g. amber for CITB ATO, emerald for SEQOHS, sky for CSCS NVQ)."
    },
    {
      component: "Course Title & SKU Identifier",
      spec: "Outfit bold heading paired with JetBrains Mono SKU badge for clear identification across procurement systems."
    },
    {
      component: "Duration & Format Badges",
      spec: "Clock icon with exact days/hours and delivery icon (Classroom / Remote Zoom / On-Site) for instant filtering."
    },
    {
      component: "Financial Matrix",
      spec: "Clear GBP price (+ VAT) alongside the direct CITB ATO Levy Grant Rebate (e.g. '£495 + VAT | £240 CITB Levy Rebate')."
    },
    {
      component: "Syllabus Highlights Accordion",
      spec: "Expandable bullet list of primary regulatory and competency outcomes."
    },
    {
      component: "Dual Conversion Action Buttons",
      spec: "Primary action: '[Book Candidate Now]' launching 2-step checkout; Secondary action: '[Book Corporate Cohort]' opening multi-delegate invoice workflow."
    }
  ]
};

export const PROJECT_OVERVIEW = {
  title: "Site Safe Alliance (sitesafealliance.co.uk) Redesign",
  version: "3.5.0 — Production Blueprint",
  targetGoLive: "Q3 2026",
  client: "Site Safe Alliance Ltd (UK Registered Accredited Training & Medical Provider)",
  businessPhone: "+442036084780",
  formattedPhone: "+44 20 3608 4780",
  objectives: [
    "Transform sitesafealliance.co.uk into an authoritative, ultra-modern, high-converting digital platform for UK construction health & safety certifications, CITB courses, and occupational health medicals.",
    "Deliver a frictionless booking engine with distinct tailored pathways for individual candidates (fast checkout, ID upload) and corporate employers (multi-delegate roster, PO invoicing).",
    "Establish a minimalist, highly professional visual identity featuring the refined abstract connection logo, using Deep Navy (#263B52) and Powder Blue (#78A6B8) with refined shades for optimal contrast and readability.",
    "Feature the four core services with final transparent pricing: CITB HS&E Test (£50 incl. VAT), CSCS Card Application (£65 incl. VAT), Level 1 H&S Course (£200 incl. VAT), and Green Labourer Card Package (£320 incl. VAT).",
    "Seamlessly integrate Aircall smartflow call routing and CRM (HubSpot/Salesforce) with business inbound number +442036084780 for automated screen-pop, IVR routing, and instant call logging.",
    "Achieve top-tier performance standards: Sub-1.2s Largest Contentful Paint (LCP), 100% Mobile Usability, and strict WCAG 2.1 AA Accessibility compliance."
  ],
  techStack: {
    frontend: "React 19, TypeScript, Tailwind CSS v4, Motion Animations, Lucide Icons",
    backend: "Express.js RESTful API, Node.js, Webhook Event Ingestion Layer",
    crm: "REST Webhook Integration with HubSpot / Salesforce CRM & CITB ATO National Portal",
    telephony: "Aircall Smartflow Call Routing Engine, CTI WebRTC Softphone, and Inbound VoIP Line +442036084780"
  }
};

export const RESPONSIVE_SPECS: BreakpointSpec[] = [
  {
    name: "Mobile Small/Medium (sm)",
    query: "375px – 639px",
    targetDevice: "iPhone SE, 13/14/15, Samsung Galaxy",
    gridCols: 4,
    gutter: "16px",
    margin: "16px",
    navBehavior: "Sticky top brand bar with quick emergency call button + animated off-canvas hamburger drawer; bottom fixed CTA bar ('Book Course' / '+44 20 3608 4780').",
    touchTarget: "Minimum 48px × 48px for all buttons, form controls, and tap areas.",
    typographyScale: "Base: 15px (1.5 line-height), H1: 28px, H2: 22px, H3: 18px"
  },
  {
    name: "Tablet / Phablet (md)",
    query: "640px – 1023px",
    targetDevice: "iPad Mini, iPad 10th Gen, Galaxy Tab",
    gridCols: 8,
    gutter: "20px",
    margin: "24px",
    navBehavior: "Compact top bar with inline search, direct telephone badge (+44 20 3608 4780), and collapsed secondary menu drawer.",
    touchTarget: "Minimum 44px × 44px with 8px visual buffer.",
    typographyScale: "Base: 16px (1.6 line-height), H1: 36px, H2: 28px, H3: 20px"
  },
  {
    name: "Desktop Standard (lg)",
    query: "1024px – 1279px",
    targetDevice: "MacBook Air 13\", Standard Laptops",
    gridCols: 12,
    gutter: "24px",
    margin: "32px",
    navBehavior: "Full horizontal mega-navigation with animated dropdown flyouts for Services, About, and Contact; persistent Aircall hotline badge (+44 20 3608 4780).",
    touchTarget: "Standard cursor pointer with micro-interaction hover states.",
    typographyScale: "Base: 16px (1.65 line-height), H1: 44px, H2: 32px, H3: 22px"
  },
  {
    name: "Desktop Large / Ultra-wide (xl/2xl)",
    query: "1280px – 1920px+",
    targetDevice: "iMac 24\"/27\", Ultra-wide 4K Monitors",
    gridCols: 12,
    gutter: "32px",
    margin: "Auto-centered (max-width: 1440px container)",
    navBehavior: "Expanded mega-menu with course search bar, multi-column category showcases, and quick delegate certificate validator widget.",
    touchTarget: "Standard cursor pointer with smooth interactive hover transitions.",
    typographyScale: "Base: 17px (1.7 line-height), H1: 54px, H2: 38px, H3: 24px"
  }
];

export const LOGO_SPECIFICATIONS: LogoSpec = {
  clearanceZone: "Minimum 1.5x of the icon mark's apex width on all 4 outer boundaries to guarantee visual authority.",
  minimumSizePrint: "28mm width (horizontal lockup) / 18mm height (stacked icon)",
  minimumSizeDigital: "120px width (horizontal) / 32px × 32px (favicon/app icon)",
  colorHex: {
    deepNavy: "#263B52",          // Deep Navy Core (#263B52) - Structural stability, professionalism & authority
    powderBlue: "#78A6B8",        // Powder Blue Accent (#78A6B8) - Interlocking connection, trust & precision
    powderBlueLight: "#9BC1CF",   // Light Powder Blue Tint (#9BC1CF) - Enhanced contrast & dark-mode readability
    deepNavyDark: "#1B2A3B",      // Deep Navy Shadow (#1B2A3B) - Rich contrast foundation
    deepNavyMid: "#4F7788",       // Mid Powder Blue Tone (#4F7788) - High-contrast line rendering
    pureLight: "#F4F8FA",         // Soft Powder Canvas (#F4F8FA) - Clean minimalist backdrop
    signalEmerald: "#10B981"      // Certified compliance status green
  },
  typography: {
    primaryFont: "Outfit (Geometric Display Sans)",
    secondaryFont: "Plus Jakarta Sans (Humanist Tech Sans)",
    weightTitle: "800 (Extrabold / Black)",
    weightSubtitle: "600 (Semibold uppercase)",
    letterSpacing: "-0.03em tracking on 'SITE SAFE', +0.24em uppercase tracking on 'ALLIANCE'"
  },
  constructionRules: [
    "Geometry: Built on an equilateral hexagonal foundation shield enclosing an abstract interlocking connection network.",
    "Three Primary Connection Nodes: Apex Node (Accreditation Authority / CITB), Left Node (Site Operative / Candidate), and Right Node (Corporate Employer / Tier-1 Site).",
    "Harmonic Nexus Point: A central intersection point at coordinates (50, 51) symbolizing the unifying Site Safe Alliance bridge.",
    "Palette Execution: Strict use of Deep Navy (#263B52) and Powder Blue (#78A6B8) paired with refined shades (#1B2A3B, #9BC1CF, #4F7788) to maximize optical balance and WCAG AA contrast.",
    "Monochrome & High-Vis Integrity: The icon and wordmark retain 100% crisp legibility in solid 1-bit monochrome for hard hat laser engraving, PPE stitching, and safety signage.",
    "Anti-Slop Directive: Vector-pure paths with mathematical curvature, zero artificial glow, and uniform stroke weights (4px shield, 6px connection curves)."
  ]
};

export const NAVIGATION_STRUCTURE: NavigationItem[] = [
  {
    id: "nav-home",
    label: "Home",
    path: "/",
    description: "Central landing portal featuring rapid course finder, CITB accreditations ribbon, safety news bulletin, and direct booking gateway."
  },
  {
    id: "nav-services",
    label: "Services",
    path: "/services",
    badge: "Accredited",
    description: "Complete catalogue of UK accredited construction training, occupational health medicals, and plant competence programs.",
    children: [
      {
        id: "serv-citb-hse-test",
        label: "CITB Health, Safety & Environment Test (£50 incl. VAT)",
        path: "/services/citb-hse-test",
        description: "Official CITB touchscreen exam required for all CSCS cards. 150+ Pearson VUE test centres nationwide.",
        duration: "45 Mins",
        popular: true,
        accreditation: "CITB / Pearson VUE"
      },
      {
        id: "serv-cscs-card-app",
        label: "CSCS Card Application (£65 incl. VAT)",
        path: "/services/cscs-card-application",
        description: "Official CSCS card processing, qualification matching, and fast-track 24-48h dispatch.",
        duration: "24-48h Fast Track",
        popular: true,
        accreditation: "CSCS Scheme"
      },
      {
        id: "serv-l1-hs-course",
        label: "Level 1 Health & Safety Course (£200 incl. VAT)",
        path: "/services/level-1-health-safety",
        description: "Accredited 1-day course providing the lifetime qualification for the 5-Year Green CSCS Card.",
        duration: "1 Day",
        popular: true,
        accreditation: "CITB ATO / Ofqual"
      },
      {
        id: "serv-green-labourer-pkg",
        label: "Green Labourer Card Package (£320 incl. VAT)",
        path: "/services/green-card-package",
        description: "All-in-one package: Level 1 H&S Course + CITB Test + 5-Year Green CSCS Card with priority booking.",
        duration: "All-in-One",
        popular: true,
        accreditation: "CITB + CSCS"
      },
      {
        id: "serv-citb-smsts",
        label: "CITB Site Management (SMSTS)",
        path: "/services/citb-smsts",
        description: "5-Day flagship qualification for construction site managers, project directors, and site supervisors.",
        duration: "5 Days",
        popular: true,
        accreditation: "CITB ATO"
      },
      {
        id: "serv-citb-sssts",
        label: "CITB Site Supervisor (SSSTS)",
        path: "/services/citb-sssts",
        description: "2-Day essential health & safety training for team leaders, gangers, and construction first-line supervisors.",
        duration: "2 Days",
        popular: true,
        accreditation: "CITB ATO"
      },
      {
        id: "serv-safety-medicals",
        label: "Safety Critical Worker Medicals (Fit2Work)",
        path: "/services/safety-critical-medicals",
        description: "SEQOHS accredited occupational medicals for plant operators, scaffolding, working at heights, and confined spaces.",
        duration: "45 Mins",
        popular: true,
        accreditation: "SEQOHS / CBH"
      }
    ]
  },
  {
    id: "nav-about",
    label: "About",
    path: "/about",
    description: "Our mission, CITB Approved Training Organisation (ATO) standing, national training centre network, and instructors.",
    children: [
      {
        id: "about-alliance",
        label: "The Alliance & Mission",
        path: "/about/mission",
        description: "Why the UK's leading tier-1 contractors trust Site Safe Alliance for zero-harm workforce compliance."
      },
      {
        id: "about-accreditations",
        label: "Accreditations & Compliance",
        path: "/about/accreditations",
        description: "Official CITB ATO, IOSH, Highfield, CPCS, and ISO 9001 quality assurance credentials."
      },
      {
        id: "about-instructors",
        label: "Expert Instructors & Doctors",
        path: "/about/instructors",
        description: "Meet our occupational health physicians and Chartered IOSH safety consultants."
      },
      {
        id: "about-social-value",
        label: "Social Value & Sustainability",
        path: "/about/social-value",
        description: "Our community apprenticeship schemes and carbon-neutral training centre initiatives."
      }
    ]
  },
  {
    id: "nav-contact",
    label: "Contact",
    path: "/contact",
    description: "Get in touch with our booking advisors, view our 12 nationwide training centres, or request bespoke corporate training."
  }
];

export const INDIVIDUAL_BOOKING_FIELDS: FormFieldDefinition[] = [
  {
    name: "courseId",
    label: "Selected Course / Certification",
    type: "select",
    required: true,
    errorMessage: "Please select an accredited course or certification",
    placeholder: "Choose certification...",
    options: [
      { value: "citb-hse-test", label: "CITB Health, Safety & Environment Test - £50 incl. VAT" },
      { value: "cscs-card-app", label: "CSCS Card Application - £65 incl. VAT" },
      { value: "l1-hs-course", label: "Level 1 Health & Safety Course - £200 incl. VAT" },
      { value: "green-labourer-package", label: "Green Labourer Card Package - £320 incl. VAT" },
      { value: "smsts-5day", label: "CITB SMSTS (Site Management Safety) - £495 + VAT" },
      { value: "sssts-2day", label: "CITB SSSTS (Site Supervisor Safety) - £260 + VAT" },
      { value: "medical-safety-critical", label: "Safety Critical Worker Medical (Fit to Work) - £140 + VAT" }
    ],
    crmMappingField: "deal.dealname / booking.course_sku",
    telephonyAction: "Tag candidate profile with course SKU and Aircall IVR skill tag"
  },
  {
    name: "deliveryMode",
    label: "Delivery Format",
    type: "radio",
    required: true,
    errorMessage: "Please select delivery format",
    options: [
      { value: "classroom", label: "Classroom Training Centre (London / Midlands / Manchester / Leeds)" },
      { value: "remote_zoom", label: "Virtual Live Online Classroom (CITB Zoom Invigilated)" }
    ],
    crmMappingField: "booking.delivery_format"
  },
  {
    name: "trainingDate",
    label: "Preferred Start Date",
    type: "date",
    required: true,
    errorMessage: "Please select a valid scheduled training date",
    crmMappingField: "booking.start_date"
  },
  {
    name: "candidateFirstName",
    label: "First Name (as on Photo ID)",
    type: "text",
    required: true,
    placeholder: "e.g. David",
    validationRegex: "^[a-zA-Z\\s'-]{2,50}$",
    errorMessage: "First name is required (letters and hyphens only)",
    crmMappingField: "contact.firstname",
    telephonyAction: "Caller contact card lookup"
  },
  {
    name: "candidateLastName",
    label: "Last Name (as on Photo ID)",
    type: "text",
    required: true,
    placeholder: "e.g. Jenkins",
    validationRegex: "^[a-zA-Z\\s'-]{2,50}$",
    errorMessage: "Last name is required",
    crmMappingField: "contact.lastname",
    telephonyAction: "Caller contact card lookup"
  },
  {
    name: "candidateDob",
    label: "Date of Birth (DD/MM/YYYY)",
    type: "date",
    required: true,
    errorMessage: "Date of birth is required for CITB / CSCS portal registration",
    helpText: "Required by CITB ATO to register qualification on the National Construction College database.",
    crmMappingField: "contact.date_of_birth"
  },
  {
    name: "candidateNiNumber",
    label: "National Insurance (NI) Number",
    type: "text",
    required: true,
    placeholder: "e.g. QQ 12 34 56 A",
    validationRegex: "^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$",
    errorMessage: "Please provide a valid 9-character UK National Insurance number (e.g. AB123456C)",
    helpText: "Crucial for automated CSCS card automated validation matching.",
    crmMappingField: "contact.uk_national_insurance"
  },
  {
    name: "candidateEmail",
    label: "Email Address",
    type: "email",
    required: true,
    placeholder: "david.jenkins@example.co.uk",
    validationRegex: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    errorMessage: "A valid email is required for joining instructions and digital certificates",
    crmMappingField: "contact.email",
    telephonyAction: "Email-based IVR lookup fallback"
  },
  {
    name: "candidatePhone",
    label: "UK Mobile Telephone",
    type: "tel",
    required: true,
    placeholder: "07123 456789",
    validationRegex: "^(?:0|\\+?44)(?:\\d\\s?){9,10}$",
    errorMessage: "Valid UK mobile number required for SMS pre-course instructions & GPS pin",
    crmMappingField: "contact.phone",
    telephonyAction: "Primary DNI inbound/outbound sync key"
  },
  {
    name: "citbRegNumber",
    label: "CITB Registration / CSCS Number (Optional)",
    type: "text",
    required: false,
    placeholder: "e.g. CITB-8839210",
    errorMessage: "Enter valid CITB candidate ID if already held",
    helpText: "If you already have a CITB candidate profile, provide it to link existing record.",
    crmMappingField: "contact.citb_registration_id"
  },
  {
    name: "addressLine1",
    label: "Billing Address Line 1",
    type: "text",
    required: true,
    placeholder: "e.g. 42 High Street",
    errorMessage: "Address is required for certificate dispatch & invoicing",
    crmMappingField: "contact.address"
  },
  {
    name: "postcode",
    label: "Postcode",
    type: "text",
    required: true,
    placeholder: "e.g. EC2A 4NE",
    validationRegex: "^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$",
    errorMessage: "Please enter a valid UK postcode",
    crmMappingField: "contact.zip"
  },
  {
    name: "emergencyContactName",
    label: "Emergency Contact Name",
    type: "text",
    required: true,
    placeholder: "e.g. Sarah Jenkins (Spouse)",
    errorMessage: "Emergency contact is mandatory for health & safety audit compliance",
    crmMappingField: "booking.emergency_contact_name"
  },
  {
    name: "emergencyContactPhone",
    label: "Emergency Contact Telephone",
    type: "tel",
    required: true,
    placeholder: "07987 654321",
    errorMessage: "Emergency contact phone number is required",
    crmMappingField: "booking.emergency_contact_phone"
  },
  {
    name: "photoIdType",
    label: "Photo ID Verification Document",
    type: "select",
    required: true,
    errorMessage: "Select the photo ID you will produce upon course entry",
    options: [
      { value: "passport", label: "Valid UK / International Passport" },
      { value: "driving_licence", label: "UK Photocard Driving Licence" },
      { value: "citb_cscs", label: "Existing CSCS / CPCS Smart Card with Photo" }
    ],
    crmMappingField: "booking.photo_id_type_declared"
  },
  {
    name: "gdprConsent",
    label: "Fair Processing & CITB ATO Data Transmission Consent",
    type: "checkbox",
    required: true,
    errorMessage: "You must accept the terms and CITB ATO verification disclosure",
    helpText: "I agree to Site Safe Alliance transmitting my assessment results to CITB/CSCS for card printing and storing my training records under UK GDPR regulations.",
    crmMappingField: "contact.gdpr_opt_in_timestamp"
  }
];

export const EMPLOYER_BOOKING_FIELDS: FormFieldDefinition[] = [
  {
    name: "companyName",
    label: "Company / Contractor Name",
    type: "text",
    required: true,
    placeholder: "e.g. Balfour Construction Group Ltd",
    errorMessage: "Company legal name is required",
    crmMappingField: "company.name",
    telephonyAction: "Corporate account tagger"
  },
  {
    name: "companyNumber",
    label: "Companies House Registration No.",
    type: "text",
    required: true,
    placeholder: "e.g. 08931245",
    errorMessage: "Valid UK Companies House registration number required",
    helpText: "Used for automatic credit limit approval and corporate invoicing.",
    crmMappingField: "company.registration_number"
  },
  {
    name: "vatNumber",
    label: "UK VAT Number",
    type: "text",
    required: false,
    placeholder: "GB 123 4567 89",
    errorMessage: "Enter valid UK VAT format if applicable",
    crmMappingField: "company.vat_number"
  },
  {
    name: "accountsContactEmail",
    label: "Accounts Payable / Invoicing Email",
    type: "email",
    required: true,
    placeholder: "invoices@balfourgroup.co.uk",
    errorMessage: "Accounts payable email is required for automated invoice dispatch",
    crmMappingField: "company.accounts_email"
  },
  {
    name: "safetyManagerName",
    label: "Health & Safety / HR Manager Name",
    type: "text",
    required: true,
    placeholder: "e.g. Marcus Vance (Head of HSE)",
    errorMessage: "Lead HSE coordinator name is required",
    crmMappingField: "contact.lead_coordinator"
  },
  {
    name: "safetyManagerEmail",
    label: "HSE Coordinator Email",
    type: "email",
    required: true,
    placeholder: "m.vance@balfourgroup.co.uk",
    errorMessage: "Valid coordinator email required for delegate progress reports",
    crmMappingField: "contact.email"
  },
  {
    name: "safetyManagerPhone",
    label: "Direct Dial / Mobile",
    type: "tel",
    required: true,
    placeholder: "020 7946 0912",
    errorMessage: "Direct coordinator contact number required",
    crmMappingField: "contact.phone",
    telephonyAction: "Priority Corporate Account VIP routing to Account Directors (+442036084780)"
  },
  {
    name: "courseId",
    label: "Training Course / Certification Package",
    type: "select",
    required: true,
    errorMessage: "Select required corporate training program",
    options: [
      { value: "corporate-citb-hse", label: "CITB Health, Safety & Environment Tests (£50 incl. VAT per delegate)" },
      { value: "corporate-cscs-card", label: "CSCS Card Applications & Fast-Track (£65 incl. VAT per delegate)" },
      { value: "corporate-l1-hs", label: "Level 1 Health & Safety in Construction (£200 incl. VAT per delegate)" },
      { value: "corporate-green-pkg", label: "Green Labourer Card Complete Package (£320 incl. VAT per delegate)" },
      { value: "corporate-smsts-cohort", label: "Dedicated Cohort: CITB SMSTS (Up to 16 Delegates)" },
      { value: "corporate-sssts-cohort", label: "Dedicated Cohort: CITB SSSTS (Up to 16 Delegates)" },
      { value: "corporate-safety-critical-medicals", label: "On-Site Safety Critical Medicals (Day Rate - Up to 12 Medicals/day)" }
    ],
    crmMappingField: "deal.package_type"
  },
  {
    name: "preferredLocationType",
    label: "Training Location Mode",
    type: "radio",
    required: true,
    errorMessage: "Select training delivery location",
    options: [
      { value: "ssa_centre", label: "Site Safe Alliance Regional Training Hub (London, Birmingham, Manchester, Leeds, Bristol)" },
      { value: "client_premises", label: "Client Construction Site / Office (On-Site Instructor Dispatch)" },
      { value: "remote_virtual", label: "Live Virtual Invigilated Classroom (Remote Teams)" }
    ],
    crmMappingField: "booking.delivery_mode"
  },
  {
    name: "siteAddress",
    label: "Site Location & Postcode (If On-Site Delivery)",
    type: "textarea",
    required: false,
    placeholder: "e.g. Project Tower 4, Battersea Power Station Development, London SW11 8BZ",
    errorMessage: "Site address is required for on-site instructor dispatch",
    crmMappingField: "booking.onsite_delivery_address"
  },
  {
    name: "poNumber",
    label: "Client Purchase Order (PO) Number",
    type: "text",
    required: true,
    placeholder: "e.g. PO-2026-88491",
    errorMessage: "PO number is mandatory for corporate credit billing",
    crmMappingField: "deal.purchase_order_number"
  },
  {
    name: "paymentTerms",
    label: "Invoicing Terms",
    type: "select",
    required: true,
    errorMessage: "Select payment terms",
    options: [
      { value: "30_day_credit", label: "30-Day Approved Corporate Credit Account" },
      { value: "card_upfront", label: "Corporate Credit Card (Instant Confirmation)" },
      { value: "pro_forma", label: "Pro-Forma BACS Invoice (Payment prior to course date)" }
    ],
    crmMappingField: "company.payment_terms"
  },
  {
    name: "siteAccessPpeNotes",
    label: "Site Access, Induction & PPE Requirements",
    type: "textarea",
    required: false,
    placeholder: "Specify high-vis grade, 5-point PPE, site gate pass protocols, or parking restrictions for instructor...",
    errorMessage: "",
    crmMappingField: "deal.site_ppe_instructions"
  }
];

export const AIRCALL_SMARTFLOW_SPEC = {
  inboundPhoneNumber: "+442036084780",
  formattedNumber: "+44 20 3608 4780",
  provider: "Aircall Cloud Telephony & WebRTC CTI",
  workingHours: {
    schedule: "07:30 - 18:30 GMT (Monday – Friday), 08:30 - 13:00 GMT (Saturday)",
    timezone: "Europe/London",
    outOfHoursAction: "Aircall AI Voicemail Transcription with instant HubSpot Deal & High-Priority Task creation"
  },
  smartflowEngine: {
    flowName: "SSA_Master_Smartflow_Routing_v3",
    greetingAudio: "Welcome to Site Safe Alliance, official CITB ATO provider. Please choose from our accredited certification pathways:",
    ivrBranches: [
      {
        digit: "1",
        serviceName: "CITB Health, Safety & Environment Test (£50 incl. VAT)",
        targetQueue: "QUEUE_CITB_TEST_INVIGILATION",
        assignedSpecialists: "Pearson VUE Test Invigilation Desk",
        slaSeconds: 15,
        skillTag: "citb_touchscreen_exam"
      },
      {
        digit: "2",
        serviceName: "CSCS Card Application (£65 incl. VAT)",
        targetQueue: "QUEUE_CSCS_CARD_PROCESSING",
        assignedSpecialists: "Card Verification & Express Dispatch Team",
        slaSeconds: 15,
        skillTag: "cscs_card_dispatch"
      },
      {
        digit: "3",
        serviceName: "Level 1 H&S Course (£200 incl. VAT) & Green Labourer Card Package (£320 incl. VAT)",
        targetQueue: "QUEUE_TRAINING_ADVISORS",
        assignedSpecialists: "Senior Training Advisors & Course Coordinators",
        slaSeconds: 12,
        skillTag: "level1_green_card_package"
      },
      {
        digit: "4",
        serviceName: "Employer & Corporate Group Bookings (Multi-Delegate, 30-Day PO Invoicing)",
        targetQueue: "QUEUE_CORPORATE_VIP_ACCOUNTS",
        assignedSpecialists: "Senior Corporate Account Directors",
        slaSeconds: 8,
        skillTag: "corporate_invoicing_po"
      }
    ],
    overflowRule: "If queue hold exceeds 35 seconds, offer automated VIP callback while maintaining position in queue via Aircall API."
  },
  crmIntegration: {
    supportedCrms: ["HubSpot CRM", "Salesforce Service Cloud"],
    screenPopLatencyMs: 140,
    syncFields: [
      "Caller Phone (CLI) -> contact.phone",
      "Full Name -> contact.firstname & lastname",
      "CITB Registration Number -> contact.citb_registration_id",
      "National Insurance Number -> contact.uk_national_insurance",
      "Active Course SKU -> deal.course_sku",
      "Aircall Recording URL -> engagement.call_recording_link",
      "Call Disposition & Sentiment -> deal.call_outcome_tag"
    ],
    automationRules: [
      "Inbound call answered -> Screen-pop candidate or employer 360° record in agent CRM tab",
      "Call tagged [CITB-TEST-BOOKED] -> CRM automatically emails calendar invite and Pearson VUE centre directions",
      "Call tagged [CSCS-DISPATCH-EXPRESS] -> CSCS card fast-track queue flagged and tracking number generated",
      "Call missed or abandoned -> Instant automated SMS sent: 'Sorry we missed you! A Site Safe Alliance advisor will call you right back.'"
    ]
  }
};

export const INTEGRATION_ENDPOINTS: IntegrationEndpoint[] = [
  {
    id: "crm-booking-create",
    name: "CRM Real-Time Booking & Delegate Ingestion",
    system: "CRM",
    method: "POST",
    endpoint: "https://api.sitesafealliance.co.uk/v1/integrations/crm/booking-sync",
    triggerEvent: "Triggered instantly upon individual checkout or corporate roster submission.",
    description: "Upserts the candidate contact record or employer corporate account in HubSpot/Salesforce, creates a linked Deal in the 'Booked & Awaiting Attendance' pipeline stage, and sets up automated pre-course email workflows.",
    samplePayload: {
      event: "booking.confirmed",
      timestamp: "2026-08-27T20:25:00.000Z",
      booking_reference: "SSA-2026-98124",
      booking_type: "individual",
      course: {
        sku: "GREEN-LABOURER-PKG",
        name: "Green Labourer Card Package (L1 Course + CITB Test + CSCS Card)",
        price_gbp: 320.00,
        vat_status: "inclusive"
      },
      candidate: {
        first_name: "David",
        last_name: "Jenkins",
        email: "david.jenkins@example.co.uk",
        phone: "+442036084780",
        dob: "1988-04-19",
        national_insurance: "QQ123456A",
        citb_id: "CITB-8839210",
        id_verified: true
      },
      payment: {
        status: "succeeded",
        transaction_id: "txn_3N829104",
        method: "stripe_card"
      }
    },
    responsePayload: {
      status: "success",
      crm_contact_id: "hub_ct_9841284",
      crm_deal_id: "hub_dl_7129031",
      automation_triggers: [
        "enrollment_confirmation_email_dispatched",
        "citb_portal_sync_queued",
        "aircall_candidate_profile_tagged",
        "sms_calendar_invite_scheduled"
      ]
    }
  },
  {
    id: "aircall-smartflow-webhook",
    name: "Aircall Smartflow Call Routing & CTI Screen-Pop Gateway",
    system: "Telephony",
    method: "POST",
    endpoint: "https://api.sitesafealliance.co.uk/v1/integrations/aircall/smartflow-webhook",
    triggerEvent: "Triggered when an inbound call reaches +442036084780 or traverses Aircall Smartflow IVR branches.",
    description: "Matches incoming caller CLI with CRM database in <140ms. Routes caller via Smartflow logic (CITB Test £50, CSCS Card £65, Level 1 £200, Green Card Pkg £320, or Corporate PO). Dispatches instant WebSocket CTI screen-pop on agent desktop.",
    samplePayload: {
      call_id: "ac_call_9841029410_SSA",
      inbound_number: "+442036084780",
      caller_cli: "+447123456789",
      smartflow_id: "sf_ssa_master_routing_v3",
      ivr_selection: {
        digit_pressed: "3",
        branch_name: "Level 1 Course & Green Labourer Package (£320 incl. VAT)"
      },
      traffic_source: {
        utm_campaign: "google_search_green_cscs_card",
        landing_page: "https://sitesafealliance.co.uk/services/green-card-package",
        device: "mobile_ios"
      }
    },
    responsePayload: {
      screen_pop_action: "SHOW_CONTACT_MODAL",
      contact_match_found: true,
      candidate: {
        name: "David Jenkins",
        status: "Enrolled - Green Card Package (£320 incl. VAT)",
        national_insurance: "QQ123456A",
        citb_id: "CITB-8839210",
        last_interaction: "Reviewed Course Booking Form Step 2"
      },
      ivr_routing_destination: "QUEUE_TRAINING_ADVISORS",
      agent_assigned: "Sarah Connor (Ext 104)"
    }
  },
  {
    id: "telephony-click-to-call",
    name: "Aircall Instant Callback & Cart Recovery",
    system: "Telephony",
    method: "POST",
    endpoint: "https://api.sitesafealliance.co.uk/v1/integrations/aircall/instant-callback",
    triggerEvent: "User requests 'Priority 15-Min Callback' on contact page or abandons corporate booking form.",
    description: "Bridges an outbound call from Aircall inbound number +442036084780 to the available booking advisor, then dials the customer immediately displaying verified Site Safe Alliance caller ID.",
    samplePayload: {
      request_type: "priority_callback",
      prospect_phone: "+447946091234",
      prospect_name: "Marcus Vance",
      company_name: "Balfour Construction Group",
      interested_service: "Green Labourer Card Package (£320 incl. VAT) x 12 Delegates",
      outbound_cli: "+442036084780"
    },
    responsePayload: {
      call_status: "bridging_initiated",
      aircall_call_id: "ac_out_8849102",
      estimated_ring_seconds: 8,
      crm_task_created: "TASK_AIRCALL_CALLBACK_9941"
    }
  },
  {
    id: "telephony-sms-dispatch",
    name: "Automated SMS Pre-Course, Exam Room & Tracking Dispatch",
    system: "Telephony",
    method: "POST",
    endpoint: "https://api.sitesafealliance.co.uk/v1/integrations/telephony/sms-notification",
    triggerEvent: "Executed upon booking confirmation, 48h before CITB test, or when CSCS card is dispatched.",
    description: "Dispatches SMS notifications with exam centre directions, booking reference, What3words location, and CSCS card tracking.",
    samplePayload: {
      recipient_phone: "+447123456789",
      sender_id: "+442036084780",
      template_id: "SMS_SSA_CONFIRMATION",
      parameters: {
        candidate_name: "David",
        service_name: "Green Labourer Card Package (£320 incl. VAT)",
        citb_test_date: "09:00 AM, Fri 18 Sep",
        exam_centre: "London East Canary Wharf Pearson VUE Centre",
        helpline: "+442036084780"
      }
    },
    responsePayload: {
      sms_id: "SM_8820194819",
      delivery_status: "dispatched",
      telecom_network: "EE / Vodafone UK"
    }
  }
];
