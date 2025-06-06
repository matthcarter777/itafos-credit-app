import { Produto } from "./Produto";

export type ItemProposta = {
  id: string;
  quantidade: number;
  valorTon: number;
  tipoFrete: string;
  freteTon: number;
  valorCredito: number;
  tipoOperacao: string;
  vencimento: string;
  produto: Produto
  propostaId: string;
  produtoId: string;
}