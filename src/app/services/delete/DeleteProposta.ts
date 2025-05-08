import { api } from "../apiClient";


export const deleteProposta = async (data: { id: string }) => {
  try {
    const response = await api.delete(`rtv/proposta/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};