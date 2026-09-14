import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface IndividualBookingPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  otherService?: string;
  preferredDate?: string;
  additionalNotes?: string;
}

interface EmployerBookingPayload {
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

interface ContactPayload {
  fullName: string;
  phone: string;
  serviceRequired?: string;
}

// In-memory store for recent submissions (useful for verification & local inspection)
const bookingsStore: Array<{
  id: string;
  type: 'individual' | 'employer' | 'contact';
  data: any;
  createdAt: string;
}> = [];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Request logger
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API ${req.method}] ${req.path}`);
    }
    next();
  });

  // ==========================================
  // API ROUTES (Always placed before SPA/Vite)
  // ==========================================

  // 1. Health Check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'Site Safe Alliance Platform API',
      uptimeSeconds: Math.floor(process.uptime()),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // 2. Service Catalog
  app.get('/api/services', (req, res) => {
    res.json({
      success: true,
      services: [
        {
          id: 'cscs-card-app',
          name: 'CSCS Card Application',
          price: '£55 + VAT',
          amount: 55,
          vatRate: 0.2,
          category: 'Card Processing',
          turnaround: '24–48h Dispatch'
        },
        {
          id: 'citb-hse-test',
          name: 'CITB Health, Safety & Environment Test',
          price: '£50',
          amount: 50,
          vatRate: 0.0,
          category: 'Examination',
          turnaround: 'Immediate Score Report'
        },
        {
          id: 'training-courses',
          name: 'Training Courses',
          price: '£200 + VAT',
          amount: 200,
          vatRate: 0.2,
          category: 'Accredited Training',
          turnaround: '1-Day Award'
        },
        {
          id: 'green-labourer-pkg',
          name: 'Green Labourer Card Package',
          price: '£295 + VAT',
          amount: 295,
          vatRate: 0.2,
          category: 'All-In-One Package',
          turnaround: 'Complete Route'
        },
        {
          id: 'other',
          name: 'Other (please specify)',
          price: 'Bespoke Quote',
          amount: 0,
          vatRate: 0.2,
          category: 'Custom Support',
          turnaround: 'Same-Day Callback'
        }
      ],
      notice: 'Please select the service you require. Once we receive your request, our team will review the information and contact you to confirm the correct service and complete the booking process.'
    });
  });

  // 3. Individual Booking Endpoint
  app.post('/api/bookings/individual', (req, res) => {
    const body: IndividualBookingPayload = req.body;

    if (!body.fullName || !body.email || !body.phone || !body.serviceRequired) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: fullName, email, phone, and serviceRequired are mandatory.'
      });
    }

    const referenceNumber = `SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveService = body.serviceRequired === 'Other (please specify)'
      ? (body.otherService || 'Bespoke Construction Requirement')
      : body.serviceRequired;

    const record = {
      id: referenceNumber,
      type: 'individual' as const,
      data: {
        ...body,
        effectiveService,
        status: 'pending_confirmation',
      },
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(record);
    if (bookingsStore.length > 100) bookingsStore.pop();

    console.log(`[BOOKING CREATED] Individual ${referenceNumber} for ${body.fullName} (${effectiveService})`);

    return res.status(201).json({
      success: true,
      referenceNumber,
      message: `Request received for ${body.fullName}! Our team will review your request for "${effectiveService}" and contact you at ${body.phone || body.email} to confirm the correct service and complete the booking process.`,
      confirmationNote: 'Please note our team will review the details and contact you to confirm the correct service before finalizing your booking.'
    });
  });

  // 4. Employer / Corporate Booking Endpoint
  app.post('/api/bookings/employer', (req, res) => {
    const body: EmployerBookingPayload = req.body;

    if (!body.contactName || !body.companyName || !body.email || !body.phone || !body.companyAddress || !body.serviceRequired) {
      return res.status(400).json({
        success: false,
        error: 'Missing required corporate fields: contactName, companyName, email, phone, companyAddress, and serviceRequired are mandatory.'
      });
    }

    const referenceNumber = `CORP-SSA-${Math.floor(100000 + Math.random() * 900000)}`;
    const effectiveService = body.serviceRequired === 'Other (please specify)'
      ? (body.otherService || 'Bespoke Corporate Requirement')
      : body.serviceRequired;

    const record = {
      id: referenceNumber,
      type: 'employer' as const,
      data: {
        ...body,
        effectiveService,
        status: 'pending_confirmation',
      },
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(record);
    if (bookingsStore.length > 100) bookingsStore.pop();

    console.log(`[BOOKING CREATED] Corporate ${referenceNumber} for ${body.companyName} (${effectiveService})`);

    return res.status(201).json({
      success: true,
      referenceNumber,
      message: `Corporate request received for ${body.companyName} (${body.contactName})! Our team will review your enquiry for "${effectiveService}" (${body.numberOfEmployees ? `${body.numberOfEmployees} employees` : 'group cohort'}) and contact you at ${body.phone || body.email} to confirm the correct service and complete the booking process.`,
      confirmationNote: 'Our corporate booking specialist will review your workforce requirements and contact you within 1 business hour.'
    });
  });

  // 5. Contact / Callback Enquiry Endpoint
  app.post('/api/contact', (req, res) => {
    const body: ContactPayload = req.body;

    if (!body.fullName || !body.phone) {
      return res.status(400).json({
        success: false,
        error: 'Full name and contact phone number are required for a priority callback.'
      });
    }

    const referenceNumber = `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const record = {
      id: referenceNumber,
      type: 'contact' as const,
      data: body,
      createdAt: new Date().toISOString()
    };

    bookingsStore.unshift(record);
    if (bookingsStore.length > 100) bookingsStore.pop();

    console.log(`[CALLBACK REQUEST] ${referenceNumber} for ${body.fullName} (${body.phone})`);

    return res.status(201).json({
      success: true,
      referenceNumber,
      message: 'Thank you! A senior booking coordinator will call you back within 15 minutes.'
    });
  });

  // 6. Inspection Endpoint (Recent Bookings)
  app.get('/api/bookings', (req, res) => {
    res.json({
      success: true,
      totalCount: bookingsStore.length,
      bookings: bookingsStore.slice(0, 20)
    });
  });

  // ==========================================
  // VITE MIDDLEWARE / STATIC ASSETS & SPA
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Site Safe Alliance server running on http://0.0.0.0:${PORT} [${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
