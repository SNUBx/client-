import { CoreServiceItem } from '../types';

export const FOUR_CORE_SERVICES: CoreServiceItem[] = [
  {
    code: "CITB-HSE-TEST",
    title: "CITB Health, Safety & Environment Test",
    duration: "45 Minutes",
    priceGbp: 48,
    priceLabel: "£48",
    targetAudience: "All Operatives, Labourers, Specialists & Managers",
    accreditations: ["CITB Touchscreen Test", "Pearson VUE Testing Network", "CSCS Prerequisite"],
    deliveryOptions: ["150+ UK Pearson VUE Test Centres", "Walk-in & Weekend Priority Slots"],
    citbGrantRebate: "Qualifies for CITB Testing Levy Grant",
    description: "We arrange your HS&E test at a CITB-approved test centre and provide revision support to help you prepare.",
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
    priceGbp: 66,
    priceLabel: "£66 INC. VAT",
    targetAudience: "Qualified Site Workers, Labourers, Trades & Supervisors",
    accreditations: ["Official CSCS Card Processing", "NFC & QR SmartCard Enabled"],
    deliveryOptions: ["Digital Virtual Card (Instant App Access)", "Physical NFC SmartCard (1st Class Tracked)"],
    citbGrantRebate: "Official Card Issuance via CSCS Scheme",
    description: "We prepare, submit and track your CSCS card application from start to finish.",
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
    priceGbp: 240,
    priceLabel: "£240 INC. VAT",
    targetAudience: "New Entrants, Apprentices, Labourers & Trade Assistants",
    accreditations: ["1-Day Level 1 Course", "CSCS Lifetime Qualification", "Ofqual Regulated"],
    deliveryOptions: ["12 National Classroom Centres", "Live Virtual Online Classroom (Zoom)"],
    citbGrantRebate: "£60/candidate direct CITB Levy Rebate",
    description: "Book accredited courses including SSSTS, SMSTS, NVQ, the Level 1 Award in Health and Safety in a Construction Environment and other approved training through trusted providers.",
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
    priceGbp: 342,
    priceLabel: "£342 INC. VAT",
    targetAudience: "New Site Operatives, General Labourers & Trade Starters",
    accreditations: ["Complete CSCS Green Card Package", "Accredited Training & Test", "All Fees Included"],
    deliveryOptions: ["All-in-One Fast-Track", "Virtual Classroom Course + Local CITB Touchscreen Exam"],
    citbGrantRebate: "Eligible for CITB Levy Rebate on completion",
    description: "Administrative support for workforce CITB tests, CSCS card applications and training bookings, helping employers keep their teams site-ready.",
    keyModules: [
      "Level 1 Health & Safety Course & Certificate Processing (£240 + VAT value)",
      "Official CITB HS&E Touchscreen Exam at Local Pearson Centre (£48 value)",
      "Official CSCS 5-Year Green Card Application & Priority Post (£66 + VAT value)",
      "Dedicated Personal Booking Coordinator & Unlimited Online Revision Material"
    ]
  }
];
