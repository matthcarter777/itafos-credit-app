import { api } from "../apiClient";

export const createAtividadeFazendaCliente = async (data: { 
  fazendaId: string;
  nome: string;
  tipoCultivo: string;
  areaPlantada?: number;
  irrigada?: boolean;
  suplemento?: boolean;
  nivelTecnologico?: string;
  quantAnimais?: number;
  confinamento?: string;
  areaTerra?: number;
  leite?: number;
  corte?: number;
 }) => {
  try {
    const response = await api.post(`cliente/atividade/${data.fazendaId}`, {
      nome: data.nome,
      tipoCultivo: data.tipoCultivo,
      areaPlantada: data.areaPlantada,
      irrigada: data.irrigada,
      suplemento: data.suplemento,
      nivelTecnologico: data.nivelTecnologico,
      quantAnimais: data.quantAnimais,
      confinamento: data.confinamento,
      areaTerra: data.areaPlantada,
      leite: data.leite,
      corte: data.corte,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erro ao criar RTV');
  }
};
