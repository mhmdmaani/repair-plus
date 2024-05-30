import { LinearProgress, styled } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import React from 'react';

const Container = styled('div')`
  width: 100%;
  position: fixed;
  top: 65px;
  z-index: 1000;
`;
export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoading = useIsFetching();

  return (
    <>
      {isLoading ? (
        <Container>
          <LinearProgress color='warning' />
        </Container>
      ) : null}
      <>{children}</>
    </>
  );
}
