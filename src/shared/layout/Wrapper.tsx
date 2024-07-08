import { useStateValue } from '@/providers/StateContext';
import AOS from 'aos';
import React, { useEffect } from 'react';
import { FloatingNav } from '@/components/ui/FloatingNavbar';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!AOS) return;
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      style={{
        backgroundColor: state.mode === 'dark' ? '#121212' : '#fff',
        color: state.mode === 'dark' ? '#fff' : '#121212',
        minHeight: '100vh',
        paddingTop: '100px',
      }}
    >
      <FloatingNav
        navItems={[
          {
            name: 'Home',
            link: '/',
          },
          {
            name: 'Repair',
            link: '/fix/categories',
          },
          {
            name: 'Buy',
            link: '/services',
          },
          {
            name: 'Contact',
            link: '/contact',
          },
          {
            name: 'Blog',
            link: '/blog',
          },
          {
            name: 'FAQ',
            link: '/faq',
          },
        ]}
      />
      {children}
    </div>
  );
}
