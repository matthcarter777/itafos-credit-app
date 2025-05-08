import { api } from "../apiClient";


export const deleteParecerComercial = async (data: { id: string }) => {
  try {
    const response = await api.delete(`rtv/parecer-comercial/${data.id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};