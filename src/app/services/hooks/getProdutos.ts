import { Produto } from '@/app/types/Produto';
import { api } from '../apiClient';
import { parseCookies } from 'nookies';

export async function getProdutos(): Promise<Produto[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/admin/produto`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const produtos = data;

  return produtos;
}