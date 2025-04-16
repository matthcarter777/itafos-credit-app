import { api } from '../apiClient';
import { parseCookies } from 'nookies';

type Produtos = {
  id: string;
  nome: string;
}

export async function getProdutos(): Promise<Produtos[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/admin/produto`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const produtos = data;

  return produtos;
}