import { api } from "../apiClient";

export const createParecerComercial = async (data: { 
  conceitoComercial: string, 
  atividadePrincipal: string,
  dataAtividadePrincipal: string,
  evoluAtivPrin: string,
  observacao: string,
  clienteId: string,
  rtvId: string,
}) => {
  try {
    const response = await api.post('rtv/parecer-comercial', {
      conceitoComercial: data.conceitoComercial,
      atividadePrincipal: data.atividadePrincipal,
      dataAtividadePrincipal: data.dataAtividadePrincipal,
      evoluAtivPrin: data.evoluAtivPrin,
      observacao: data.observacao,
      rtvId: data.rtvId, 
      clienteId: data.clienteId, 
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar parecer comercial');
  }
};
