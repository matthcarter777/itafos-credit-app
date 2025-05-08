import { api } from "../apiClient";


export const deleteAtividadeCliente = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/atividade/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};