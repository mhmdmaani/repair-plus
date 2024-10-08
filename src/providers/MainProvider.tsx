'use client';
import Wrapper from '@/shared/layout/Wrapper';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { CssBaseline } from '@mui/material';
import React from 'react';
import QueryProvider from './QueryProvider';
import { StateProvider } from './StateContext';
import ThemeRegistry from './ThemeRegistry';
import { initialState, reducer } from './mainReducer';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

const MainProvider = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem={false}
        disableTransitionOnChange={false}
      >
        <ThemeRegistry>
          <CssBaseline />
          <QueryProvider>
            <SessionProvider session={params?.session}>
              <GoogleReCaptchaProvider reCaptchaKey='6Ldd9SoqAAAAAJ6bCnW9tQOa4zJZqiEUCr4aID-F'>
                <Wrapper>
                  <div>{children}</div>
                </Wrapper>
              </GoogleReCaptchaProvider>
            </SessionProvider>
          </QueryProvider>
        </ThemeRegistry>
      </ThemeProvider>
    </StateProvider>
  );
};

export default MainProvider;
