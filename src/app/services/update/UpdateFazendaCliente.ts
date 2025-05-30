import { api } from "../apiClient";

export const updateFazendaCliente = async (data: {
    id: string, 
    clienteId?: string,
    nome?: string,
    cidade?: string,
    uf?: string,
    quantHectares?: number,
    tipoArea?: string,
    ie?: string,
    matricula?: string,
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
    const response = await api.put(`cliente/fazenda/${data.id}`, data);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar Fazenda');
  }
};
