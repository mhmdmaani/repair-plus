import { STRIPE_PUBLISHABLE_KEY } from '@/api/settings';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const StripePaymentProvider = ({ children }: { children: ReactNode }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};
export default StripePaymentProvider;
