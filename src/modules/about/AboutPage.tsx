'use client';
import Appbar from '@/shared/layout/Appbar';
import React from 'react';
import TopHeader from '../home/TopHeader';
import Footer from '@/shared/layout/Footer';
import AboutHero from '@/modules/about/AboutHero';
import Services from '../home/Services';

export default function AboutPage() {
  return (
    <>
      <TopHeader />
      <Appbar />
      <AboutHero />
      <Services />
      <Footer />
    </>
  );
}
