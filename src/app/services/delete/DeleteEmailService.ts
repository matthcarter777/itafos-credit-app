import { api } from "../apiClient";


export const deleteEmailCliente = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/email/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};