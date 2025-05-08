import { api } from "../apiClient";


export const deleteReferencia = async (data: { id: string }) => {
  try {
    const response = await api.delete(`cliente/referencia/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};