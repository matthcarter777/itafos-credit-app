
export type Atividade = {
  id: string;
  nome: string;
  tipoCultivo: string;
  areaPlantada: number;
  irrigada: boolean;
  suplemento: boolean;
  nivelTecnologico: string;
  quantAnimais: number;
  confinamento: string;
  areaTerra: number;
  leite: number;
  corte: number;
  fazendaId: string;
}