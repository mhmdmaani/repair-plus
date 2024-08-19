import ContactPage from '@/modules/contact/ContactPage';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Repair Plus | Contact Us',
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

function Contact() {
  return <ContactPage />;
}

export default Contact;
