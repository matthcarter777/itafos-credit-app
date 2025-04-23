import { api } from "./apiClient";

export const createProduto = async (data: { nome: string }) => {
  try {
    const response = await api.post('admin/produto', data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
