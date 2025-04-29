import { Atividade } from "./Atividade";

export type Fazenda = {
  id: string;
	nome: string;
	cidade: string;
	uf: string;
	quantHectares: Number;
	tipoArea: string;
	ie: Number;
	matricula: string;
	nomeProprietario: string;
	tipoProprietario: string;
	cpfcnpj: Number;
	vencimentoContrato: string;
	tipoPagamento: string;
	produto: string;
	taxaContrato: Number;
	tipoSolo: string;
	clienteId: string;
	atividades: Atividade[];
}