'use client';
import Appbar from '@/shared/layout/Appbar';
import React from 'react';
import TopHeader from '../home/TopHeader';
import Footer from '@/shared/layout/Footer';
import AboutHero from '@/modules/about/AboutHero';
import Services from '../home/Services';
import AboutSection from '../home/AboutSection';
import ChooseUs from '../home/ChooseUs';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutSection />
      <ChooseUs />
    </>
  );
}
