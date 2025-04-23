import { api } from "../apiClient";

export const createRegra = async (data: { nome: string }) => {
  try {
    const response = await api.post('admin/regra', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
