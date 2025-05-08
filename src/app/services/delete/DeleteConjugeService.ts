import { api } from "../apiClient";


export const deleteConjuge = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/conjuge/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};