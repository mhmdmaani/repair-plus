'use client';
import { useSendEmail } from '@/hooks/useSendEmail';
import { Button, TextField, styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import SuccessModel from './SuccessModel';
const CustomForm = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export default function ContactForm() {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const mutation = useSendEmail();
  const onVerify = useCallback((token: any) => {
    setToken(token);
  }, []);

  const onSend = () => {
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
    <div>
      <CustomForm>
        <GoogleReCaptcha
          onVerify={onVerify}
          refreshReCaptcha={refreshReCaptcha}
        />
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          placeholder='Name'
          fullWidth
        />
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='email'
          placeholder='Email'
          fullWidth
        />
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Message'
          multiline
          rows={4}
          fullWidth
        />
        <CustomButton type='button' onClick={onSend}>
          Send
        </CustomButton>
      </CustomForm>
      <SuccessModel open={mutation.isSuccess} setOpen={mutation.reset} />
    </div>
  );
}
