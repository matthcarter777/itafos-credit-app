import { Cliente } from '@/app/types/Cliente';
import { api } from '../apiClient';
import { parseCookies } from 'nookies';

export async function getClientes(): Promise<Cliente[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/rtv/cliente`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const clientes = data;
  
  return clientes;
}