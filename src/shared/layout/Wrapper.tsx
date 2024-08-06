import { useStateValue } from '@/providers/StateContext';
import AOS from 'aos';
import React, { useEffect } from 'react';
import { FloatingNav } from '@/components/ui/FloatingNavbar';
import Footer from './Footer';
import { usePathname, useRouter } from 'next/navigation';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStateValue();
  const currentUrl = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!AOS) return;
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div
      style={{
        backgroundColor: state.mode === 'dark' ? '#000319' : '#fff',
        color: state.mode === 'dark' ? '#fff' : '#121212',
        minHeight: '100vh',
      }}
    >
      {!currentUrl.includes('admin') && (
        <FloatingNav
          navItems={[
            {
              name: 'Hem',
              link: '/',
            },
            {
              name: 'Reparation',
              link: '/fix/brands',
            },

            {
              name: 'Om oss',
              link: '/about',
            },
            {
              name: 'Kontakt',
              link: '/contact',
            },
            {
              name: 'Vanliga frågor',
              link: '/faq',
            },
          ]}
        />
      )}

      {children}
      <Footer />
    </div>
  );
}
