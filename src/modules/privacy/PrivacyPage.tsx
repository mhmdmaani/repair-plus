import App from 'next/app';
import React from 'react';
import TopHeader from '../home/TopHeader';
import Appbar from '@/shared/layout/Appbar';
import Footer from '@/shared/layout/Footer';
import { Container } from '@mui/material';

const termsStyles = {
  body: { fontFamily: 'Arial, sans-serif', lineHeight: 1.6, padding: 20 },
  header: { color: '#333366' },
  subHeader: { color: '#666699' },
  paragraph: { margin: '10px 0' },
  list: { margin: '10px 0', paddingLeft: 20 },
  listItem: { margin: '10px 0' },
};

export default function PrivacyPage() {
  return (
    <>
      <Appbar />
      <Container>
        <div style={termsStyles.body}>
          <h1 style={termsStyles.header}>Terms and Conditions</h1>
          <p style={termsStyles.paragraph}>
            Welcome to Quick National Courier. These terms and conditions
            outline the rules and regulations for the use of Quick National
            Courier's Website, located at www.quicknationalcourier.com.
          </p>

          <h2 style={termsStyles.subHeader}>1. Terms of Use</h2>
          <p style={termsStyles.paragraph}>
            By accessing this website, we assume you accept these terms and
            conditions. Do not continue to use Quick National Courier if you do
            not agree to take all of the terms and conditions stated on this
            page.
          </p>

          <h2 style={termsStyles.subHeader}>2. License</h2>
          <p style={termsStyles.paragraph}>
            Unless otherwise stated, Quick National Courier and/or its licensors
            own the intellectual property rights for all material on Quick
            National Courier. All intellectual property rights are reserved. You
            may access this from Quick National Courier for your own personal
            use subjected to restrictions set in these terms and conditions.
          </p>

          <h2 style={termsStyles.subHeader}>3. User Responsibilities</h2>
          <ul style={termsStyles.list}>
            <li style={termsStyles.listItem}>
              You must not use this website in any way that causes, or may
              cause, damage to the website or impairment of the availability or
              accessibility of Quick National Courier or in any way which is
              unlawful, illegal, fraudulent or harmful, or in connection with
              any unlawful, illegal, fraudulent or harmful purpose or activity.
            </li>
            <li style={termsStyles.listItem}>
              You must not use this website to copy, store, host, transmit,
              send, use, publish or distribute any material which consists of
              (or is linked to) any spyware, computer virus, Trojan horse, worm,
              keystroke logger, rootkit or other malicious computer software.
            </li>
          </ul>

          <h2 style={termsStyles.subHeader}>4. Privacy Policy</h2>
          <p style={termsStyles.paragraph}>
            Our privacy policy, which sets out how we will use your information,
            can be found at <a href='/privacy'>Privacy Policy</a>. By using this
            website, you consent to the processing described therein and warrant
            that all data provided by you is accurate.
          </p>

          <h2 style={termsStyles.subHeader}>5. Governing Law & Jurisdiction</h2>
          <p style={termsStyles.paragraph}>
            These terms and conditions will be governed by and interpreted in
            accordance with the laws of the State of [Your State], and you
            submit to the non-exclusive jurisdiction of the state and federal
            courts located in [Your State] for the resolution of any disputes.
          </p>

          <footer>
            <p>© 2024 Quick National Courier. All rights reserved.</p>
          </footer>
        </div>
      </Container>
      <Footer />
    </>
  );
}
