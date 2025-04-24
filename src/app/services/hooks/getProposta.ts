import { api } from '../apiClient';
import { parseCookies } from 'nookies';
import { Proposta } from '@/app/types/Proposta';

export async function getProposta(): Promise<Proposta[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/rtv/proposta`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const propostas = data;

  return propostas;
}