'use client';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { styled, LinearProgress } from '@mui/material';

const Container = styled('div')`
  width: 100%;
  position: fixed;
  top: 65px;
  z-index: 1000;
`;

export default function ProtectedPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: any;
}) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('credentials');
    },
  });
  if (status === 'loading') {
    return (
      <Container>
        <LinearProgress color='warning' />
      </Container>
    );
  }
  if (status !== 'authenticated') {
    return <div>Not authenticated</div>;
  }

  return <div>{children}</div>;
}
