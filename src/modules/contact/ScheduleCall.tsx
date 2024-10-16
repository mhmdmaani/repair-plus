'use client';
import { useSendEmail } from '@/hooks/useSendEmail';
import { Button, TextField, styled, Typography } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import SuccessModel from './SuccessModel';

const MainContainer = styled('div')`
  padding: 60px 0;
`;
const CustomForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;

const CustomButton = styled(Button)`
  height: 50px;
  width: 100%;
  margin-top: 20px;
  padding: 0 10px;
  position: relative;
  background: transparent;
  border: 2px solid ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-transform: uppercase;
  gap: 10px;
  transition: all 0.5s ease-in-out;
  z-index: 1;
  overflow: hidden;
  :before {
    content: '';
    position: absolute;
    background: ${(props) => props.theme.palette.primary.main};
    width: 100%;
    height: 100%;
    z-index: -1;
    transform: translateX(-100%);
    transform-origin: 0 50%;
    transition: transform 0.3s;
  }
  :hover:before {
    transform: translateX(0);
  }
  :hover {
    color: ${(props) => props.theme.palette.common.white};
  }
`;

const TitleContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Tagline = styled(Typography)`
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1rem;
  }
`;

const Divider = styled('div')`
  width: 120px;
  height: 5px;
  background: ${(props) => props.theme.palette.primary.main};
  margin-top: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;
const Title = styled(Typography)`
  text-align: center;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media (max-width: 400px) {
    font-size: 1.2rem;
  }
`;
export default function ScheduleCall() {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [tel, setTel] = useState('');

  const mutation = useSendEmail();
  const onVerify = useCallback((token: any) => {
    setToken(token);
  }, []);

  const onSend = () => {
    const message = ` Request Schedule Call Name: ${name} \n Phone: ${tel}`;
    mutation.mutate({ name, email, message, token });
    setName('');
    setEmail('');
    setMessage('');
    setRefreshReCaptcha(!refreshReCaptcha);
  };

  // refreshReCaptcha after 1000ms
  useEffect(() => {
    const timer = setTimeout(() => {
      // Toggles the state to force re-render and refresh the reCAPTCHA token
      setRefreshReCaptcha((prev) => !prev);
    }, 5000); // Refresh the captcha every 1000ms

    return () => clearTimeout(timer); // Clear the timeout when the component unmounts
  }, [refreshReCaptcha]);

  return (
    <MainContainer>
      <TitleContainer>
        <Tagline
          data-aos='fade-up'
          variant='h5'
          color={'primary'}
          fontWeight={'bold'}
        ></Tagline>
        <Title data-aos='fade-up' variant='h3' fontWeight={'bold'}>
          Boka ett samtal
        </Title>
        <Divider data-aos='fade-up' />
        <Typography data-aos='fade-up' variant='body1' color={'GrayText'}>
          Fyll i formuläret nedan så ringer vi dig så snart som möjligt
        </Typography>
      </TitleContainer>
      <CustomForm>
        <GoogleReCaptcha
          onVerify={onVerify}
          refreshReCaptcha={refreshReCaptcha}
        />

        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Your Name'
          fullWidth
        />

        <TextField
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          type='tel'
          placeholder='0700000000'
          name='tel'
          fullWidth
          inputProps={{
            maxLength: 50,
            pattern: '[0-9]{3}-[0-9]{2}-[0-9]{3}',
          }}
        />
        <CustomButton type='button' onClick={onSend}>
          Schedule Call
        </CustomButton>
      </CustomForm>
      <SuccessModel open={mutation.isSuccess} setOpen={mutation.reset} />
    </MainContainer>
  );
}
