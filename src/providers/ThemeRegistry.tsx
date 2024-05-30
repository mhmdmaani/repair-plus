'use client';
import { useTranslate } from '@/hooks/useTranslate';
import { useStateValue } from '@/providers/StateContext';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import 'aos/dist/aos.css';
import React from 'react';
import NextAppDirEmotionCacheProvider from './EmotionCache';

const darkTheme = (lang: string) =>
  createTheme({
    direction: lang === 'ar' ? 'rtl' : 'ltr',
    palette: {
      mode: 'dark',
      primary: {
        main: '#3F51B5',
      },
      //@ts-ignore
      yellow: {
        main: '#FFC107',
      },
    },
    typography: {
      fontFamily: [
        'Uber Move', // Uber Move is the primary font
        'Rajdhani',
        '-apple-system', // Apple System Font for newer macOS and iOS versions
        'BlinkMacSystemFont', // Chrome on macOS
        '"Segoe UI"', // Windows
        'Roboto', // Android and older versions of macOS
        '"Helvetica Neue"', // Older versions of macOS
        'Arial',
        'sans-serif', // Generic fallback
      ].join(','),
    },

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Change as needed (e.g., 'capitalize', 'uppercase', 'lowercase')
          },
        },
      },
    },
  });

const lightTheme = (lang: string) =>
  createTheme({
    direction: lang === 'ar' ? 'rtl' : 'ltr',
    palette: {
      mode: 'light',
      primary: {
        main: '#3F51B5',
      },
      //@ts-ignore
      yellow: {
        main: '#FFC107',
      },
    },
    typography: {
      fontFamily: [
        'Uber Move',
        'Rajdhani',
        '-apple-system', // Apple System Font for newer macOS and iOS versions
        'BlinkMacSystemFont', // Chrome on macOS
        '"Segoe UI"', // Windows
        'Roboto', // Android and older versions of macOS
        '"Helvetica Neue"', // Older versions of macOS
        'Arial',
        'sans-serif', // Generic fallback
      ].join(','),
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Change as needed (e.g., 'capitalize', 'uppercase', 'lowercase')
          },
        },
      },
    },
  });

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const { lang } = useTranslate();
  const { state } = useStateValue();

  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider
        theme={state.mode === 'dark' ? darkTheme(lang) : lightTheme(lang)}
      >
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
