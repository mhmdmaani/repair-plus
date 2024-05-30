'use client';
import { LinearProgress } from '@mui/material';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import React, { FC } from 'react';

const QueryProvider: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <>{children}</>
    </QueryClientProvider>
  );
};

export default QueryProvider;
