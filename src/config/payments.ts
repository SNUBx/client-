/**
 * Payment & Checkout Configuration for Site Safe Alliance
 * 
 * NOTE: Currently, ENABLE_ONLINE_PAYMENTS is set to false as requested.
 * Customer-facing "Pay Now" buttons are hidden from the UI.
 * 
 * When you are ready to enable online payments after completing your CRM & Stripe setup:
 * 1. Set ENABLE_ONLINE_PAYMENTS = true below (or set VITE_ENABLE_ONLINE_PAYMENTS=true in your environment).
 * 2. Add your STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY to your environment secrets.
 * 
 * The full Stripe backend endpoints, checkout session creator, and payment processing
 * infrastructure are fully implemented and pre-wired!
 */

export const ENABLE_ONLINE_PAYMENTS: boolean = 
  typeof import.meta !== 'undefined' && 
  (import.meta as any).env?.VITE_ENABLE_ONLINE_PAYMENTS === 'true' 
    ? true 
    : false;

export interface PaymentConfig {
  enabled: boolean;
  stripeConfigured: boolean;
  publishableKey?: string;
}

/**
 * Fetch server payment configuration (checks if Stripe keys and online payment flag are set)
 */
export async function getPaymentConfig(): Promise<PaymentConfig> {
  try {
    const res = await fetch('/api/payments/config');
    if (!res.ok) throw new Error('Failed to load payment configuration');
    return await res.json();
  } catch {
    return {
      enabled: ENABLE_ONLINE_PAYMENTS,
      stripeConfigured: false,
    };
  }
}

/**
 * Create a Stripe Checkout Session for a booking request
 */
export async function createStripeCheckoutSession(payload: {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceRequired: string;
  amountGbp: number;
  returnUrl: string;
}): Promise<{ url: string } | { error: string }> {
  try {
    const res = await fetch('/api/payments/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || !data.success) {
      return { error: data.error || 'Failed to initiate secure Stripe checkout session' };
    }

    return { url: data.checkoutUrl };
  } catch (err: any) {
    return { error: err.message || 'Network error initiating payment' };
  }
}
