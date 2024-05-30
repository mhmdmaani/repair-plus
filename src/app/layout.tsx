import MainProvider from '@/providers/MainProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import 'react-quill/dist/quill.snow.css';
import './globals.css';

import Head from 'next/head';

const inter = Rajdhani({
  weight: '600',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'National Quick Currier',
  description: 'Your Best solution for all your delivery needs',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
    },
  ],
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang='ar'>
      <Head>
        <link
          href='https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&display=swap'
          rel='stylesheet'
        />
        <link rel='icon' href='./favicon.ico' sizes='any' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta
          name='description'
          content='Your Best solution for all your delivery needs'
        />
        <meta
          name='keywords'
          content='National Quick Currier, delivery, shipping, courier, transport'
        />
      </Head>
      <body className={inter.className}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <MainProvider params={params}>
            <div>{children}</div>
          </MainProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
