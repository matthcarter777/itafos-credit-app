import { Estado } from '@/app/types/Estado';
import { api } from '../apiClient';
import { parseCookies } from 'nookies';

export async function getEstados(): Promise<Estado[]> {
  const { data } = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`);

  const roles = data.map((data: any) => {
    return {
      id: data.sigla,
      nome: data.nome
    }
  } );

  return roles;
}