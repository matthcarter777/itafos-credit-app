import { api } from "../apiClient";


export const deleteItemProposta = async (data: { id: string }) => {
  try {
    const response = await api.delete(`rtv/item-proposta/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};