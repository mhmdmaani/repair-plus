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

const MainProvider = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) => {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <ThemeRegistry>
        <CssBaseline />
        <QueryProvider>
          <SessionProvider session={params?.session}>
            <GoogleReCaptchaProvider reCaptchaKey='6Lc6KtYpAAAAAC9ESHD8NzqcTxp8CiULEGg7XGlZ'>
              <Wrapper>
                <div>{children}</div>
              </Wrapper>
            </GoogleReCaptchaProvider>
          </SessionProvider>
        </QueryProvider>
      </ThemeRegistry>
    </StateProvider>
  );
};

export default MainProvider;
