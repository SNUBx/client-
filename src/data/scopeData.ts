import { CoreServiceItem } from '../types';

export const FOUR_CORE_SERVICES: CoreServiceItem[] = [
  {
    code: "CITB-HSE-TEST",
    title: "CITB Health, Safety & Environment Test",
    duration: "45 Minutes",
    priceGbp: 50,
    priceLabel: "£50",
    targetAudience: "All Operatives, Labourers, Specialists & Managers",
    accreditations: ["CITB Touchscreen Test", "Pearson VUE Testing Network", "CSCS Prerequisite"],
    deliveryOptions: ["150+ UK Pearson VUE Test Centres", "Walk-in & Weekend Priority Slots"],
    citbGrantRebate: "Qualifies for CITB Testing Levy Grant",
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
    priceGbp: 55,
    priceLabel: "£55 + VAT",
    targetAudience: "Qualified Site Workers, Labourers, Trades & Supervisors",
    accreditations: ["Official CSCS Card Processing", "NFC & QR SmartCard Enabled"],
    deliveryOptions: ["Digital Virtual Card (Instant App Access)", "Physical NFC SmartCard (1st Class Tracked)"],
    citbGrantRebate: "Official Card Issuance via CSCS Scheme",
    description: "Official CSCS Card application and verification processing service. Includes automated CITB test matching, qualification certificate auditing, photo compliance review, and express smart card dispatch.",
    keyModules: [
      "Automated CITB Test Result Verification & National Database Link",
      "Proof of Qualification & NVQ / Level 1 Certificate Verification",
      "Direct CSCS Database Registration and NFC SmartCard Production"
    ]
  },
  {
    code: "L1-HS-COURSE",
    title: "Training Courses",
    duration: "1 Day (6-8 Hours)",
    priceGbp: 200,
    priceLabel: "£200 + VAT",
    targetAudience: "New Entrants, Apprentices, Labourers & Trade Assistants",
    accreditations: ["1-Day Level 1 Course", "CSCS Lifetime Qualification", "Ofqual Regulated"],
    deliveryOptions: ["12 National Classroom Centres", "Live Virtual Online Classroom (Zoom)"],
    citbGrantRebate: "£60/candidate direct CITB Levy Rebate",
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
    priceGbp: 295,
    priceLabel: "£295 + VAT",
    targetAudience: "New Site Operatives, General Labourers & Trade Starters",
    accreditations: ["Complete CSCS Green Card Package", "Accredited Training & Test", "All Fees Included"],
    deliveryOptions: ["All-in-One Fast-Track", "Virtual Classroom Course + Local CITB Touchscreen Exam"],
    citbGrantRebate: "Eligible for CITB Levy Rebate on completion",
    description: "Comprehensive all-in-one package containing everything required to get on site: Level 1 H&S Course + Official CITB HS&E Touchscreen Test + Official 5-Year Green CSCS Card with guaranteed pass support.",
    keyModules: [
      "Level 1 Health & Safety Course & Certificate Processing (£200 + VAT value)",
      "Official CITB HS&E Touchscreen Exam at Local Pearson Centre (£50 value)",
      "Official CSCS 5-Year Green Card Application & Priority Post (£55 + VAT value)",
      "Dedicated Personal Booking Coordinator & Unlimited Online Revision Material"
    ]
  }
];
