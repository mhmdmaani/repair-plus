import StripePaymentProvider from '@/providers/StripePaymentProvider';
import {
  Box,
  Card,
  ClickAwayListener,
  DialogContent,
  Modal,
  styled,
  Button,
} from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import PaymentForm from './PaymentForm';
import BasePaymentForm from '@/shared/forms/BasePaymentForm';
import { useCreatePayment } from '@/hooks/usePayment';
import { useStateValue } from '@/providers/StateContext';

const MainContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Container = styled(Card)`
  width: 50vw;
  max-width: 700px;
  padding: 20px;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const CardContainer = styled('div')`
  padding: 0 10px;
`;
const CustomButton = styled(Button)`
  margin-top: 20px;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: 500;
`;

export default function PaymentModel({
  open,
  setOpen,
  amount,
  currency = 'gbp',
  onSuccess,
  paymentMethod,
  orderId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  amount: number;
  currency?: string;
  onSuccess: (a?: any) => void;
  paymentMethod?: string;
  orderId: string;
}) {
  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState(''); // [1]
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postal, setPostal] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [company, setCompany] = React.useState(''); // [2]
  const saveMutation = useCreatePayment();
  const { state, dispatch } = useStateValue();
  const { email } = state;
  const handleSave = async (paymentStripeId?: string) => {
    await saveMutation.mutate(
      {
        name: `${name} ${lastName}`,
        email,
        address,
        city,
        postal,
        phone,
        orderId,
        paymentMethod,
        amount,
        currency,
        isPaid: paymentStripeId && paymentStripeId !== '' ? true : false,
        paymentStripeId: paymentStripeId ? paymentStripeId : '',
        company,
      },
      {
        onSuccess: () => {
          onSuccess();
        },
      }
    );
  };
  return (
    <React.Fragment>
      <StripePaymentProvider>
        <Modal
          open={open}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <MainContainer>
            <Container>
              <DialogTitle id='alert-dialog-title'>
                {'Payment Details'}
              </DialogTitle>
              <DialogContent>
                <BasePaymentForm
                  city={city}
                  postal={postal}
                  setCity={setCity}
                  setPostal={setPostal}
                  name={name}
                  lastName={lastName}
                  setName={setName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={(txt) =>
                    dispatch({ type: 'SET_EMAIL', payload: txt })
                  }
                  address={address}
                  setAddress={setAddress}
                  phone={phone}
                  setPhone={setPhone}
                  company={company}
                  setCompany={setCompany}
                />
                {paymentMethod === 'creditCard' ? (
                  <PaymentForm
                    amount={amount}
                    currency={currency}
                    onSuccess={handleSave}
                    name={name}
                    email={email}
                    address={address}
                    phone={phone}
                    city={city}
                    postal={postal}
                  />
                ) : null}
                {paymentMethod === 'bill' ? (
                  <CardContainer>
                    <CustomButton
                      variant='contained'
                      fullWidth
                      onClick={() => handleSave()}
                    >
                      Confirm
                    </CustomButton>
                  </CardContainer>
                ) : null}
              </DialogContent>
            </Container>
          </MainContainer>
        </Modal>
      </StripePaymentProvider>
    </React.Fragment>
  );
}
