import { api } from "./apiClient";

export const createRTV = async (data: { nome: string; matricula: number }) => {
  try {
    const response = await api.post('/admin/rtv', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
