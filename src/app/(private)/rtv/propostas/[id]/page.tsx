'use client';

import { useParams } from 'next/navigation';

export default function PropostasPage() {
  const params = useParams();
  const id = params.id; 

  return <h1>ID da proposta: {id}</h1>;
}
