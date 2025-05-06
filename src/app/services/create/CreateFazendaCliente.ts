import { api } from "../apiClient";

export const createFazendaCliente = async (data: { 
    clienteId: string,
    nome: string,
    cidade: string,
    uf: string,
    quantHectares: number,
    tipoArea: string,
    ie?: string,
    matricula: string,
    nomeProprietario?: string,
    tipoProprietario?: string,
    cpfcnpj?: string,
    vencimentoContrato?: string,
    tipoPagamento?: string,
    produto?: string,
    taxaContrato?: number,
    tipoSolo?: string,
 }) => {
  try {
    const response = await api.post(`cliente/fazenda/${data.clienteId}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
