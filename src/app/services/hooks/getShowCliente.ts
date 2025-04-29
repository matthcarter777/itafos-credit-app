import { api } from '../apiClient';
import { parseCookies } from 'nookies';
import { Cliente } from '@/app/types/Cliente';

export async function getShowCliente(id: string): Promise<Cliente> {
  const cookies = parseCookies();

  const { data } = await api.get(`/rtv/cliente/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  return data;
}
