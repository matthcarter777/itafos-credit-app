import { api } from '../apiClient';
import { parseCookies } from 'nookies';

type Role = {
  id: string;
  nome: string;
}

export async function getRoles(): Promise<Role[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/admin/regra`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const roles = data;

  return roles;
}