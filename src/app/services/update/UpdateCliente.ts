import { api } from "../apiClient";

export const updateCliente = async (data: {
  id: string; 
  nomeCliente?: string;
  tipoCliente?: string;
  cpfcnpj?: string;
  ie?: string;
  dataConstituicao?: string;
  regTrib?: string;
  telefone?: string;
  dataNascimento?: string;
  estadoCivil?: string;
 }) => {
  try {
    const response = await api.put(`rtv/cliente/${data.id}`, {
      nomeCliente: data.nomeCliente,
      tipoCliente: data.tipoCliente,
      cpfcnpj: data.cpfcnpj,
      ie: data.ie,
      dataConstituicao: data.dataConstituicao,
      regTrib: data.regTrib,
      telefone: data.telefone, 
      dataNascimento: data.dataNascimento,
      estadoCivil: data.estadoCivil,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
