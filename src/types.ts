/**
 * Types and interfaces for Site Safe Alliance Redesign Scope & Specification
 */

export type ActiveTab = 'docs' | 'prototype' | 'brand' | 'forms' | 'integrations' | 'export';

export type PrototypePage = 'home' | 'services' | 'about' | 'contact' | 'individual-booking' | 'employer-booking';

export interface BreakpointSpec {
  name: string;
  query: string;
  targetDevice: string;
  gridCols: number;
  gutter: string;
  margin: string;
  navBehavior: string;
  touchTarget: string;
  typographyScale: string;
}

export interface LogoSpec {
  clearanceZone: string;
  minimumSizePrint: string;
  minimumSizeDigital: string;
  colorHex: {
    primaryAmber: string;
    slateNavy: string;
    signalEmerald: string;
    pureLight: string;
    darkCanvas: string;
  };
  typography: {
    primaryFont: string;
    secondaryFont: string;
    weightTitle: string;
    weightSubtitle: string;
    letterSpacing: string;
  };
  constructionRules: string[];
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  badge?: string;
  description?: string;
  children?: {
    id: string;
    label: string;
    path: string;
    description: string;
    duration?: string;
    popular?: boolean;
    accreditation?: string;
  }[];
}

export interface FormFieldDefinition {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'select' | 'number' | 'textarea' | 'file' | 'checkbox' | 'radio';
  required: boolean;
  validationRegex?: string;
  errorMessage: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
  helpText?: string;
  crmMappingField: string;
  telephonyAction?: string;
}

export interface IntegrationEndpoint {
  id: string;
  name: string;
  system: 'CRM' | 'Telephony' | 'CITB_ATO' | 'Payment';
  method: 'POST' | 'GET' | 'PUT' | 'WEBHOOK';
  endpoint: string;
  triggerEvent: string;
  description: string;
  samplePayload: Record<string, unknown>;
  responsePayload: Record<string, unknown>;
}

export interface DelegateCandidate {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  nationalInsurance: string;
  email: string;
  phone: string;
  citbNumber?: string;
  specialNeeds?: string;
}

export interface IndividualBookingFormData {
  courseId: string;
  courseName: string;
  trainingDate: string;
  locationId: string;
  deliveryMode: 'classroom' | 'onsite' | 'remote_zoom';
  candidateFirstName: string;
  candidateLastName: string;
  candidateDob: string;
  candidateNiNumber: string;
  candidateEmail: string;
  candidatePhone: string;
  citbRegNumber?: string;
  addressLine1: string;
  city: string;
  postcode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  hasMedicalCondition: boolean;
  medicalNotes?: string;
  photoIdType: 'passport' | 'driving_licence' | 'national_identity' | 'citb_cscs';
  photoIdUploaded: boolean;
  paymentMethod: 'card' | 'invoice_individual' | 'bacs';
  gdprConsent: boolean;
}

export interface EmployerBookingFormData {
  companyName: string;
  companyNumber: string;
  vatNumber?: string;
  billingAddress: string;
  billingPostcode: string;
  accountsContactEmail: string;
  accountsContactPhone: string;
  safetyManagerName: string;
  safetyManagerEmail: string;
  safetyManagerPhone: string;
  courseId: string;
  courseName: string;
  requestedDates: string[];
  preferredLocationType: 'ssa_centre' | 'client_premises' | 'remote_virtual';
  siteAddress?: string;
  siteAccessPpeNotes?: string;
  poNumber: string;
  paymentTerms: 'card_upfront' | '30_day_credit' | 'pro_forma';
  delegates: DelegateCandidate[];
  cateringRequired: boolean;
  bespokeGroupDiscountApplied: boolean;
  gdprComplianceAgreed: boolean;
}
