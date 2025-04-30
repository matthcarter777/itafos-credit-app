import { api } from "../apiClient";

export const createConjuge = async (data: {
  clienteId: string, 
  nome: string, 
  cpf: string, 
  rg: string, 
  orgaoExpedidor: string, 
  dataNascimento: string 
}) => {
  try {
    const response = await api.post(`cliente/conjuge/${data.clienteId}`, {
      nome: data.nome,
      cpf: data.cpf,
      rg: data.rg,
      orgaoExpedidor: data.orgaoExpedidor,
      dataNascimento: data.dataNascimento
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
