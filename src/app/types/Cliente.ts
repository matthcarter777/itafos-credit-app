import { Conjuge } from "./Conjuge";
import { Email } from "./Email";
import { Endereco } from "./Endereco";
import { ParecerComercial } from "./ParecerComercial";
import { Referencia } from "./Referencia";

export type Cliente = {
  id: string;
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
  emails?: Email[];
  senha?: string;
  parecerComercial: ParecerComercial[];
  enderecos?: Endereco[];
  conjuge: Conjuge;
  referencias: Referencia[];
}