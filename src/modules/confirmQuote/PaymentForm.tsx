import { Payment } from '@/api/Payment';
import { Button, styled } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';

const CardContainer = styled('div')`
  padding: 0 10px;
`;
const PaymentContent = styled('div')`
  padding: 16.5px 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const CustomButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
`;
const PaymentForm = ({
  amount,
  currency = 'usd',
  onSuccess,
  onError,
  name,
  email,
  address,
  phone,
  city,
  postal,
}: {
  amount: number;
  currency?: string;
  onSuccess: (a: any) => void;
  onError?: () => void;
  name: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  postal: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const { clientSecret } = await Payment.createPaymentIntent(
      amount,
      currency
    );
    // @ts-ignore
    const { paymentIntent, error } = await stripe?.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          // @ts-ignore
          card: elements?.getElement(CardElement),
          billing_details: {
            name: name,
            email: email,
            phone: phone,
            address: {
              city: city,
              country: 'UK',
              line1: address,
              postal_code: postal,
              state: city,
            },
          },
        },
      }
    );
    setLoading(false);
    if (paymentIntent) {
      // Payment successful
      onSuccess(paymentIntent.id);
    } else if (error) {
      // Payment failed
      onError;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <CardContainer>
        <PaymentContent>
          <CardElement />
        </PaymentContent>
      </CardContainer>
      <CardContainer>
        <CustomButton
          fullWidth
          variant='contained'
          type='submit'
          disabled={!stripe || loading}
        >
          Pay
        </CustomButton>
      </CardContainer>
    </form>
  );
};
export default PaymentForm;
