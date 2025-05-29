import { Conjuge } from "./Conjuge";
import { Email } from "./Email";
import { Endereco } from "./Endereco";
import { Fazenda } from "./Fazenda";
import { ParecerComercial } from "./ParecerComercial";
import { Referencia } from "./Referencia";
import { RTV } from "./RTV";

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
  rtv: RTV;
  fazendas: Fazenda[];
  email?: string;
}