import { api } from "../apiClient";


export const deleteCliente = async (data: { id: string }) => {
  try {
    const response = await api.delete(`rtv/cliente/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};