import { api } from '../apiClient';
import { parseCookies } from 'nookies';

type Cliente = {
  id: string;
  nome: string;
}

export async function getClientes(): Promise<Cliente[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/rtv/cliente`, {
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });

  const clientes = data.map((cliente: { id: any; nomeCliente: any; cpfcnpj: any; }) => {
    return {
      id: cliente.id,
      nome: `${cliente.nomeCliente} - ${cliente.cpfcnpj}` 
    }
  });
  
  return clientes;
}