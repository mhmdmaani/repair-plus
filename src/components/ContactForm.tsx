'use client';
import React, { useCallback, useState } from 'react';
import { Label } from './ui/Label';
import { Input } from './ui/Input';
import { cn } from '@/lib/utils';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from '@tabler/icons-react';
import { TextArea } from './ui/TextArea';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import FadeInUp from './ui/FadeInUp';

export function ContactForm() {
  const [token, setToken] = useState();
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
  const onVerify = useCallback((token: any) => {
    setToken(token);
  }, []);

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [error, setError] = React.useState(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const resp = await fetch('/api/send-email', {
      method: 'POST',
      body: JSON.stringify({
        name: firstname + ' ' + lastname,
        email,
        subject,
        message,
        token,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await resp.json();
    setIsLoading(false);
    if (result.error) {
      setError(result.error);
      return;
    }
    setIsSuccess(result.success);
  };
  return (
    <div className='w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Get in Touch with Me
      </h2>
      <div className=''>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          mohammedmaani@hotmail.com
        </p>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          +46 76 557 69 81
        </p>
      </div>

      <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

      {!isSubmitted ? (
        <form className='my-8' onSubmit={handleSubmit}>
          <GoogleReCaptcha
            onVerify={onVerify}
            refreshReCaptcha={refreshReCaptcha}
          />
          <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
            <LabelInputContainer>
              <Label htmlFor='firstname'>First name</Label>
              <Input
                id='firstname'
                placeholder='Tyler'
                type='text'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor='lastname'>Last name</Label>
              <Input
                id='lastname'
                placeholder='Durden'
                type='text'
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='email'>Email Address</Label>
            <Input
              id='email'
              placeholder='projectmayhem@fc.com'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer className='mb-4'>
            <Label htmlFor='subject'>Subject</Label>
            <Input
              id='subject'
              placeholder='Subject'
              type='text'
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </LabelInputContainer>

          <LabelInputContainer className='mb-4'>
            <Label htmlFor='message'>Message</Label>
            <TextArea
              id='message'
              placeholder='message'
              type='text'
              multiple
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </LabelInputContainer>

          <button
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Send Message
            <BottomGradient />
          </button>

          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />
        </form>
      ) : (
        <FadeInUp>Success</FadeInUp>
      )}
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
