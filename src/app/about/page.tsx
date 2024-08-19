import AboutPage from '@/modules/about/AboutPage';
import React from 'react';
import Head from 'next/head';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Repair Plus | About Us',
  description:
    'RepairPlus.se offers professional and fast repair services for mobile phones, tablets, laptops, and other electronic devices. Our expert technicians provide reliable fixes for all major brands, ensuring your gadgets are back in perfect working order. Convenient, affordable, and trusted across Sweden.',
  keywords:
    'repair, mobile, phone, tablet, laptop, electronic, device, fix, service, Sweden, Trollhättan, Vänersborg, Uddevalla, Skövde, Borås, Gothenburg, Alingsås',
  icons: [
    {
      url: '/favicon.ico',
      sizes: 'any',
    },
  ],
};

export default function About() {
  return (
    <>
      <AboutPage />
    </>
  );
}
