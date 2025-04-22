'use client';

import { QueryClientProvider, hydrate } from '@tanstack/react-query'; 
import { ReactNode, useState } from 'react';
import  { queryClient as baseClient }  from '../services/queryClient';

interface Props {
  children: ReactNode;
  dehydratedState?: unknown;
}

export function QueryProvider({ children, dehydratedState }: Props) {
  const [queryClient] = useState(() => baseClient);

  // Aqui usamos a função hydrate, ao invés do componente Hydrate
  hydrate(queryClient, dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
