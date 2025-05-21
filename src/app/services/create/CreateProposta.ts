import { api } from "../apiClient";

export const createProposta = async (data: { 
  nome: string, 
  validade: string,
  clienteId: string
}) => {
  try {
    const today = new Date();

    const actualDate =  today.toISOString().split('T')[0];

    const response = await api.post('rtv/proposta', {
      nome: data.nome,
      validade: data.validade,
      data: actualDate,
      status: false,
      clienteId: data.clienteId, 
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar proposta');
  }
};
