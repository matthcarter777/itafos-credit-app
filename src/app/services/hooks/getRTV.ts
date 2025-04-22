import { api } from '../apiClient';
import { parseCookies } from 'nookies';
import { RTV } from '../../types/RTV';

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