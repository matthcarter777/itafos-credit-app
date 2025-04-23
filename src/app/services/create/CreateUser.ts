import { api } from "../apiClient";

export const createUser = async (data: { 
  nome: string, 
  email: string,
  senha: string,
  regraId: string,
  rtvId?: string,
  clienteId?: string
}) => {
  try {
    const response = await api.post('admin/usuario', {
      nome: data.nome,
      email: data.email,
      senha: data.senha,
      ativo: true,
      regraId: data.regraId,
      rtvId: data.rtvId !== "" ? data.rtvId : null, 
      clienteId: data.clienteId !== "" ? data.clienteId : null, 
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
