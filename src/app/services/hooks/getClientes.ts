import { ClienteOptions } from '@/app/types/ClienteOptions';
import { api } from '../apiClient';
import { parseCookies } from 'nookies';


export async function getClientes(): Promise<ClienteOptions[]> {
  let cookies = parseCookies();

  const { data } = await api.get(`/rtv/cliente/rtv/all`, {
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