import { api } from "../apiClient";


export const deleteFazenda = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/fazenda/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};