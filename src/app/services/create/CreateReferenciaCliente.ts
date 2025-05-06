import { api } from "../apiClient";

export const createReferenciaCliente = async (data: { 
    clienteId: string,
    nome: string;
    cpfcnpj: string;
    cidade: string;
    uf: string;
    telefone: string;
 }) => {
  try {
    const response = await api.post(`cliente/referencia/${data.clienteId}`, {
      nome: data.nome,
      cpfcnpj: data.cpfcnpj,
      cidade: data.cidade,
      uf: data.uf,
      telefone: data.telefone,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar email');
  }
};
