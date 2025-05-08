import { api } from "../apiClient";


export const deleteEnderecoCliente = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/endereco/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};