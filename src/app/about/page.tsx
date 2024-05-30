'use client';
import AboutPage from '@/modules/about/AboutPage';
import React from 'react';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>National Quick Currier | About Us</title>
        <meta
          name='description'
          content='Book your delivery with National Quick Currier today!'
        />
        <meta
          name='keywords'
          content='National Quick Currier, About Us, Request Quote, delivery, shipping, courier, transport'
        />
      </Head>
      <AboutPage />
    </>
  );
}
