import { Cliente } from "./Cliente";
import { RTV } from "./RTV";

export type Proposta = {
  id: string;
  nome: string;
  data: string;
  validade: string;
  status: boolean;
  cliente: Cliente;
  rtv: RTV;
}