import { api } from '../apiClient';
import { parseCookies } from 'nookies';
import { Proposta } from '@/app/types/Proposta';

export async function getShowProposta(id: string): Promise<Proposta> {
  const cookies = parseCookies();

  const { data } = await api.get(`/rtv/proposta/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  return data;
}
