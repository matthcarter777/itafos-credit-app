import { api } from '../apiClient';
import { parseCookies } from 'nookies';
import { Cliente } from '@/app/types/Cliente';


export async function getClientesByRTV(): Promise<Cliente[]> {
  const { data } = await api.get(`/rtv/cliente/rtv/all`);

  return data;
}