'use client';
import AboutPage from '@/modules/about/AboutPage';
import React from 'react';
import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>Repair Plus | About Us</title>
        <meta
          name='description'
          content='Book your delivery with Repair Plus today!'
        />
        <meta
          name='keywords'
          content='Repair Plus, About Us, Request Quote, delivery, shipping, courier, transport'
        />
      </Head>
      <AboutPage />
    </>
  );
}
