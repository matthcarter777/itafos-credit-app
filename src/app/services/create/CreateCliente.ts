import { date } from "zod";
import { api } from "../apiClient";

export const createCliente = async (data: { 
  nomeCliente: string;
  tipoCliente: string;
  cpfcnpj: string;
  ie?: string;
  dataConstituicao?: string;
  regTrib?: string;
  telefone?: string;
  dataNascimento?: string;
  estadoCivil?: string;
  idRtv?: string;
  senha: string;
  email: string;
 }) => {
  try {
    const response = await api.post('rtv/cliente', {
      nomeCliente: data.nomeCliente,
      tipoCliente: data.tipoCliente,
      cpfcnpj: data.cpfcnpj,
      ie: data.ie,
      dataConstituicao: data.dataConstituicao,
      regTrib: data.regTrib,
      telefone: data.telefone, 
      dataNascimento: data.dataNascimento,
      estadoCivil: data.estadoCivil,
      idRtv: data.idRtv,
      senha: data.senha,
      email: data.email
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
