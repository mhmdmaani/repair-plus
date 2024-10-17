import { LinearProgress, styled } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';
import React from 'react';

const Container = styled('div')`
  width: 100%;
  position: fixed;
  top: 65px;
  z-index: 1000;
`;

const CustomLinearProgress = styled(LinearProgress)`
  height: 2px; /* Customize the height */
  border-radius: 2px; /* Optional: round the edges */
  & .MuiLinearProgress-bar {
    background-color: #111928; /* Custom bar color */
  }
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
          <CustomLinearProgress />
        </Container>
      ) : null}
      <>{children}</>
    </>
  );
}
