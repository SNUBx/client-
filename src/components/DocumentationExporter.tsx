import React, { useState } from 'react';
import { 
  PROJECT_OVERVIEW, 
  RESPONSIVE_SPECS, 
  LOGO_SPECIFICATIONS, 
  NAVIGATION_STRUCTURE, 
  INDIVIDUAL_BOOKING_FIELDS, 
  EMPLOYER_BOOKING_FIELDS, 
  INTEGRATION_ENDPOINTS 
} from '../data/scopeData';
import { 
  Download, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Shield, 
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { SiteSafeLogo } from './shared/SiteSafeLogo';

export const DocumentationExporter: React.FC = () => {
  const [copiedDoc, setCopiedDoc] = useState(false);

  const fullMarkdownDocumentation = `# Project Scope & Technical Specification: sitesafealliance.co.uk Redesign

## 1. Executive Summary & Project Scope
- **Project Title:** Site Safe Alliance Website Redesign & Digital Booking Engine
- **Target URL:** \`https://sitesafealliance.co.uk\`
- **Client Organization:** Site Safe Alliance Ltd (UK CITB Approved Training Organisation #9841)
- **Version:** 3.4.0 Production Blueprint
- **Target Go-Live:** Q3 2026

### Core Mandate & Strategic Objectives
1. Transform \`sitesafealliance.co.uk\` into an authoritative, ultra-modern, high-converting digital platform for UK construction health & safety qualifications, CITB courses (SMSTS, SSSTS, HSA), NVQs, and SEQOHS occupational health medicals.
2. Deliver a frictionless booking engine with distinct tailored pathways for individual candidates (fast checkout, NI/CITB validation, ID upload) and corporate employers (multi-delegate roster, PO invoicing, on-site vs centre delivery).
3. Establish a minimalist, highly professional visual identity featuring a refined vector logo mark, high-contrast accessible color palette, and clean typography.
4. Seamlessly integrate real-time CRM pipelines (HubSpot / Salesforce) and Telephony CTI/VoIP systems (3CX / Twilio) for automated booking dispatch, caller lookup, and SMS confirmation.
5. Achieve top-tier performance standards: Sub-1.2s Largest Contentful Paint (LCP), 100% Mobile Usability, and strict WCAG 2.1 AA Accessibility compliance.

---

## 2. Responsive Design Specifications

| Breakpoint | Query | Target Devices | Grid | Touch Target | Navigation & UI Behavior |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Mobile (sm)** | \`375px - 639px\` | iPhone SE / 13 / 14 / 15, Galaxy S | 4 Cols | Min 48px × 48px | Sticky brand bar + off-canvas drawer + bottom fixed CTA bar ('Book Course' / '+44 20 3608 4780') |
| **Tablet (md)** | \`640px - 1023px\` | iPad Mini / 10th Gen, Galaxy Tab | 8 Cols | Min 44px × 44px | Compact header + inline search + collapsed drawer |
| **Desktop (lg)** | \`1024px - 1279px\` | MacBook Air 13", Laptops | 12 Cols | Standard pointer | Full mega-nav dropdowns for Services, About, and Contact |
| **Ultra-wide (xl/2xl)**| \`1280px - 1920px+\`| 24"/27" Monitors, 4K Displays | 12 Cols | Standard pointer | Max 1440px centered container with expanded course catalog showcase |

### Key Responsive Rules:
- **Mobile Fixed CTA Dock:** Viewports under 768px expose a dual-button sticky bar: \`[Quick Book Course]\` and \`[Call +44 20 3608 4780]\` with direct one-tap telephone initiation.
- **Dynamic Table Adaptation:** Multi-delegate corporate candidate rosters transform from wide desktop tables into individual expandable candidate cards on mobile.
- **iOS Safari Font Sizing:** Form input fields maintain a minimum 16px font-size to prevent automatic browser zoom and preserve visual alignment.

---

## 3. Minimalist Logo & Brand Design System Specifications

### Construction Geometry & Visual Rules
- **Hexagonal Shield Geometry:** Built on an equilateral hexagonal safety shield representing structural safety, containment, and steel architectural precision.
- **Interlocking Monogram:** Internal structural rafters intersect at 45° chamfered angles forming an abstract 'S' & 'A' monogram.
- **Keystone Apex:** A central keystone diamond anchors the apex signifying the union of the Site Safe Alliance network.
- **Exclusion Safe Zone:** A mandatory clearance boundary of 1.5x the apex width surrounds the lockup across all digital and print media.
- **Monochrome & High-Vis Integrity:** Retains 100% legibility in solid 1-bit black (#000000) or solid white (#FFFFFF) for laser engraving on safety hard hats, high-vis orange/yellow vests, and vehicle livery.

### Color Palette (RAL / Hex Approved)
- **Safety Amber:** \`#F59E0B\` (High-visibility warning and action color)
- **Slate Navy:** \`#0F172A\` (Deep structural stability and authority)
- **Signal Emerald:** \`#10B981\` (Accredited compliance status)
- **Crisp Light:** \`#F8FAFC\` (WCAG AA compliant light canvas)
- **Precision Dark:** \`#090D16\` (High-contrast dark canvas)

### Typography Hierarchy
- **Display & Logo Wordmark:** Outfit (Extrabold 800)
- **Body Text & Form Controls:** Plus Jakarta Sans (Regular 400, Semibold 600, Bold 700)
- **Technical IDs & Code Blocks:** JetBrains Mono (500)

---

## 4. Structured Navigation Menu & Sitemap Architecture

1. **Home (\`/\`):** Rapid course finder, CITB ATO accreditation ribbon (#9841), 12 nationwide training centres summary, candidate reviews, instant booking entry.
2. **Services (\`/services\`):**
   - CITB Site Safety Plus: SMSTS (5 Days), SSSTS (2 Days), HSA Green Card (1 Day)
   - Occupational Health Medicals: Safety Critical Worker (Fit2Work), CBH, Asbestos Medicals
   - Construction NVQs: Levels 2 to 7 (CSCS Blue, Gold, and Black Cards)
   - Plant & Machinery: CPCS / NPORS Operator Competence
   - Emergency Response: First Aid at Work (3 Days), Fire Marshal
3. **About (\`/about\`):**
   - The Alliance Mission & Zero-Harm Commitment
   - CITB ATO Standing & Direct Grant Rebate Processing (£240/candidate)
   - Accreditations (IOSH, Highfield, SEQOHS, ISO 9001)
   - Expert Instructors & Occupational Physicians
4. **Contact (\`/contact\`):**
   - 24/7 National Booking Hotlines (+44 20 3608 4780 / Aircall Smartflow Hotline)
   - 12 Regional Training Centres with interactive maps & transport directions
   - Priority 15-Minute Callback Request Form

---

## 5. Specific Services Section Layout & Card Architecture

### Grid Layout Mechanics
- **Desktop (1024px+):** 3-column responsive bento grid with 24px gutter, sticky category sidebar/pill filters, and dual action CTAs.
- **Tablet (640px - 1023px):** 2-column adaptive card grid with horizontal scrolling category chips.
- **Mobile (375px - 639px):** Single-column high-density stack with expandable syllabus accordions and sticky booking drawer.

### Service Card Anatomy
1. **Accreditation Pill:** Top-left chip indicating scheme status (CITB ATO, SEQOHS, CSCS, Qualsafe).
2. **Course Title & SKU:** Bold header paired with monospace SKU identifier (e.g. \`CITB-SMSTS-5D\`).
3. **Duration & Format Badges:** Clock icon with duration (e.g. \`5 Days (Block or 1-Day/Wk)\`) and delivery icons.
4. **Financial Matrix:** Clear GBP price (+ VAT) alongside the direct CITB ATO Levy Grant Rebate (e.g. \`£495 + VAT | £240 CITB Levy Rebate\`).
5. **Syllabus Highlights:** Expandable bullet list of regulatory modules (CDM 2015, RAMS, Scaffolding, Excavation).
6. **Dual Action CTAs:** Primary \`[Book Candidate Now]\` + Secondary \`[Book Corporate Cohort]\`.

---

## 6. Field Requirements for Booking Forms

### A. Individual Candidate Booking Form
- **Course Selection (\`courseId\`):** Dropdown select of accredited courses with GBP (+VAT) pricing.
- **Delivery Format (\`deliveryMode\`):** Classroom Centre vs. Live Virtual Zoom Classroom.
- **Training Start Date (\`trainingDate\`):** Date picker with available schedule slots.
- **Candidate Legal First Name (\`candidateFirstName\`):** Text (Min 2 chars, letters/hyphens only).
- **Candidate Legal Last Name (\`candidateLastName\`):** Text.
- **Date of Birth (\`candidateDob\`):** DD/MM/YYYY (Mandatory for CITB ATO database upload).
- **National Insurance Number (\`candidateNiNumber\`):** Regex: \`^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$\`.
- **Candidate Email (\`candidateEmail\`):** Email format for digital joining instructions.
- **Mobile Telephone (\`candidatePhone\`):** UK Phone Regex (For pre-course SMS GPS pin dispatch).
- **CITB Registration ID (\`citbRegNumber\`):** Optional existing candidate ID.
- **Billing Address & Postcode (\`postcode\`):** UK Postcode validation.
- **Emergency Contact Name & Phone:** Health & safety audit compliance requirement.
- **Declared Photo ID Document (\`photoIdType\`):** Passport / Driving Licence / CSCS Smart Card.
- **GDPR & CITB Fair Processing Consent (\`gdprConsent\`):** Mandatory boolean opt-in.

### B. Employer & Corporate Group Booking Form
- **Company Legal Name (\`companyName\`):** Text (Companies House registered name).
- **Companies House Reg No. (\`companyNumber\`):** 8-digit UK company number.
- **VAT Registration Number (\`vatNumber\`):** Optional UK VAT format.
- **Accounts Payable Invoicing Email (\`accountsContactEmail\`):** Automated invoice dispatch.
- **Lead HSE / HR Coordinator Name & Contact:** Direct phone & email.
- **Delivery Mode:** Regional SSA Hub vs. Client On-Site Premises vs. Remote.
- **On-Site Address & PPE Requirements:** Free text specifying 5-point PPE & site access passes.
- **Client Purchase Order (\`poNumber\`):** Mandatory PO for 30-day credit invoicing.
- **Multi-Delegate Roster Table (\`delegates\`):** Dynamic candidate entries (First Name, Last Name, DOB, NI Number, Email, CITB Number).

---

## 6. CRM & Telephony System Integration Architecture

### CRM Integration (HubSpot / Salesforce / Custom Webhooks)
- **Endpoint:** \`POST https://api.sitesafealliance.co.uk/v1/integrations/crm/booking-sync\`
- **Workflow:** Instantly creates/upserts contact records, registers deals in the \`Booked & Awaiting Attendance\` stage, triggers pre-course automated email workflows, and queues CITB grant claim submissions.

### Telephony & VoIP CTI Integration (3CX / Twilio / RingCentral)
- **Dynamic Number Insertion (DNI):** Dynamically replaces tracking telephone numbers based on campaign UTM tags.
- **Inbound CTI Screen-Pop Gateway:** Matches caller CLI against CRM database in <180ms to pop open candidate history, active bookings, and cart contents on the agent console.
- **Instant 30-Second Callback:** Bridges outbound agent calls to prospects requesting urgent consultation.
- **Automated SMS Notification Gateway:** Dispatches T-48h pre-course reminders with Google Maps directions, room numbers, and What3Words pins.

---
*Documentation compiled by Site Safe Alliance Architecture Team.*
`;

  const copyMarkdown = () => {
    navigator.clipboard.writeText(fullMarkdownDocumentation);
    setCopiedDoc(true);
    setTimeout(() => setCopiedDoc(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const downloadMarkdownFile = () => {
    const element = document.createElement("a");
    const file = new Blob([fullMarkdownDocumentation], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = "SiteSafeAlliance_Redesign_Project_Scope_v3.4.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8" id="documentation-exporter-root">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-mono mb-2">
            <FileText className="w-3.5 h-3.5" /> STAKEHOLDER HAND-OFF & EXPORT
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
            Complete Project Scope Documentation Export
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Export the official technical specifications, minimalist logo design system, structured navigation menu, services layout, booking form schemas, and CRM/telephony architecture.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
            id="copy-markdown-btn"
          >
            {copiedDoc ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copiedDoc ? 'Markdown Copied' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={downloadMarkdownFile}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1.5 border border-slate-200 transition-all cursor-pointer"
            id="download-md-file-btn"
          >
            <Download className="w-4 h-4 text-sky-600" />
            <span>Download .MD</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            id="print-documentation-btn"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* Formatted Document Paper Viewport */}
      <div className="rounded-2xl bg-white border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8 print:bg-white print:text-black print:border-none print:shadow-none">
        {/* Document Title Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <span className="text-xs font-mono text-amber-700 font-bold uppercase tracking-wider block mb-1">
              OFFICIAL SCOPE SPECIFICATION &bull; Q3 2026
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900">
              Site Safe Alliance (sitesafealliance.co.uk)
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-mono">
              Prepared for: Executive Board &bull; Technical Delivery Team &bull; CITB Compliance Auditors
            </p>
          </div>
          <SiteSafeLogo variant="stacked" size="md" theme="light" />
        </div>

        {/* Formatted Content Preview */}
        <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <h3 className="font-bold text-slate-900 text-base">Key Technical Summary (Core Focus Areas)</h3>
            <ul className="list-disc list-inside space-y-2 text-xs text-slate-700">
              <li><strong>1. Minimalist Logo Design System:</strong> Geometric hexagonal shield with interlocking structural rafters ('S' & 'A' monogram), keystone apex, 1.5x exclusion zone, Safety Amber #F59E0B / Slate Navy #0F172A / Pure Light #F8FAFC palette, and Outfit/Plus Jakarta Sans typography pairing.</li>
              <li><strong>2. Structured Navigation Menu:</strong> Hierarchical architecture covering Home (quick course finder, CITB badge #9841), Services (CITB SMSTS/SSSTS/HSA, Medicals, NVQs), About (Alliance mission, grant rebate processing, accreditations), and Contact (12 regional UK centres + 24/7 hotline).</li>
              <li><strong>3. Specific Services Section Layout:</strong> 3-column responsive bento grid (1024px+) / 2-column tablet / 1-column mobile stack with category filter chips, card anatomy (scheme pill, SKU badge, clock duration, CITB levy rebate matrix), and dual candidate vs cohort CTAs.</li>
              <li><strong>4. Booking Form Field Requirements:</strong> Comprehensive specifications for Individual forms (NI number regex, DOB for CITB upload, Photo ID type, GDPR opt-in) and Employer corporate forms (8-digit Companies House reg, PO number for 30-day billing, dynamic multi-delegate candidate roster builder).</li>
              <li><strong>5. CRM & Telephony Integration:</strong> HubSpot/Salesforce REST webhook endpoints with automated contact & deal pipeline upsert, 3CX/Twilio CTI screen-pop gateway (&lt;180ms), instant 30-second callback bridging, and automated pre-course SMS GPS dispatch.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900">Implementation Phasing Roadmap</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono text-amber-800 block font-bold">Phase 1: Brand & Frontend UI</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Deploy new responsive layout, minimalist logo, typography scale, and Home/Services/About/Contact pages with services bento grid.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono text-sky-700 block font-bold">Phase 2: Booking Engine & Forms</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Implement individual checkout with NI validation and corporate multi-delegate roster builder with PO credit billing.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] font-mono text-emerald-700 block font-bold">Phase 3: CTI & CRM Integrations</span>
                <p className="text-slate-600 text-[11px] leading-relaxed">Connect HubSpot/Salesforce pipelines, 3CX CTI screen-pop gateway, and automated pre-course SMS dispatch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
