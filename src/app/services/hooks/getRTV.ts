import { api } from '../apiClient';
import { parseCookies } from 'nookies';

type RTV = {
  id: string;
  nome: string;
  matricula: number;
}

export async function getRTV(): Promise<RTV[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/admin/rtv`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const rtvs = data;

  return rtvs;
}