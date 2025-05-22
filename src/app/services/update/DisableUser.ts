import { api } from "../apiClient";

export const disableUser = async (id: string) => {
  console.log(id)

  try {
    const response = await api.put(`admin/usuario/disable/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro');
  }
};
