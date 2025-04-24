import { Cliente } from "./Cliente";
import { ItemProposta } from "./ItemProposta";
import { RTV } from "./RTV";

export type Proposta = {
  id: string;
  nome: string;
  data: string;
  validade: string;
  status: boolean;
  cliente: Cliente;
  rtv: RTV;
  itensProposta: ItemProposta[]
}