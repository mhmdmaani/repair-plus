import { useStateValue } from '@/providers/StateContext';
import { Box } from '@mui/material';
import AOS from 'aos';
import React, { useEffect } from 'react';

export default function Wrapper({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useStateValue();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!AOS) return;
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: state.mode === 'dark' ? '#121212' : '#fff',
        color: state.mode === 'dark' ? '#fff' : '#121212',
        minHeight: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
