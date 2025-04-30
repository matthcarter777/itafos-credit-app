import { api } from "../apiClient";

export const createEmailCliente = async (data: { email: string, descricao: string, clienteId: string }) => {
  try {
    const response = await api.post(`cliente/email/${data.clienteId}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar email');
  }
};
