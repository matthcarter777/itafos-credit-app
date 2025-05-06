import { api } from "../apiClient";

export const createEnderecoCliente = async (data: {
  clienteId: string 
  logradouro: string,
	numero: string | null,
	bairro: string,
	cep: string,
	cidade: string,
	uf: string,
	complemento: string,
 }) => {
  try {
    const response = await api.post(`cliente/endereco/${data.clienteId}`, {
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      cep: data.cep,
      cidade: data.cidade,
      uf: data.uf,
      complemento: data.complemento,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar endereço');
  }
};
