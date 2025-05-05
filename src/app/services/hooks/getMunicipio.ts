import { api } from '../apiClient';
import { Municipio } from '@/app/types/Municipio';

export async function getMunicipios(uf: string): Promise<Municipio[]> {
  const { data } = await 
    api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);

  const roles = data.map((data: any) => {
    return {
      id: data.nome,
      nome: data.nome
    }
  } );

  return roles;
}