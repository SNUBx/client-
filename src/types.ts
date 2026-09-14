/**
 * Core Types and interfaces for Site Safe Alliance Platform
 */

export interface CoreServiceItem {
  code: string;
  title: string;
  duration: string;
  priceGbp: number;
  priceLabel: string;
  targetAudience: string;
  accreditations: string[];
  deliveryOptions: string[];
  citbGrantRebate: string;
  description: string;
  keyModules: string[];
}

export interface IndividualBookingSubmission {
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  otherService?: string;
  preferredDate?: string;
  additionalNotes?: string;
}

export interface EmployerBookingSubmission {
  contactName: string;
  companyName: string;
  email: string;
  phone: string;
  companyAddress: string;
  numberOfEmployees: string | number;
  serviceRequired: string;
  otherService?: string;
  additionalNotes?: string;
}

export interface ContactEnquirySubmission {
  fullName: string;
  phone: string;
  serviceRequired?: string;
}
