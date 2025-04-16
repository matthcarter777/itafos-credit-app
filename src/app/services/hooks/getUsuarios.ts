import { api } from '../apiClient';
import { parseCookies } from 'nookies';

type Usuario = {
  id: string;
  nome: string;
  email: string;
  ativo: boolean;
  regra: string;
  rtv?: string;
  cliente?: string;
}

export async function getUsuarios(): Promise<Usuario[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/admin/usuario`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const usuario = data.map((usuario: any) => {
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      ativo: usuario.ativo,
      regra: usuario.regra.nome,
      cliente: usuario.cliente?.nomeCliente,
      rtv: usuario.rtv?.nome 
    }
  });
  
  return usuario;
}