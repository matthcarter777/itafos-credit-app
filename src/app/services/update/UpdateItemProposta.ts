import { api } from "../apiClient";

export const updateItemProposta = async (data: {
  id: string, 
  quantidade: number, 
  valorTon: number, 
  valorCredito: number, 
  freteTon: number, 
  tipoFrete: string, 
  tipoOperacao: string, 
  vencimento: string,
  produtoId: string,
  propostaId: string,
}) => {
  try {
    const response = await api.post(`rtv/item-proposta/${data.propostaId}`, {
      quantidade: data.quantidade,
      valorTon: data.valorTon,
      valorCredito: data.valorCredito,
      freteTon: data.freteTon,
      tipoFrete: data.tipoFrete,
      tipoOperacao: data.tipoOperacao,
      vencimento: data.vencimento,
      produtoId: data.produtoId, 
      propostaId: data.propostaId, 
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar proposta');
  }
};
