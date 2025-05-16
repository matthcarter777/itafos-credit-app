import { parseCookies } from 'nookies';

import { api } from '../apiClient';
import { Proposta } from '@/app/types/Proposta';

export async function getPropostasCliente(): Promise<Proposta[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/rtv/proposta/cliente/proposta`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  return data;
}