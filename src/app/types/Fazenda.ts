import { Atividade } from "./Atividade";

export type Fazenda = {
  id: string;
	nome: string;
	cidade: string;
	uf: string;
	quantHectares: number;
	tipoArea: string;
	ie: number;
	matricula: string;
	nomeProprietario: string;
	tipoProprietario: string;
	cpfcnpj: number;
	vencimentoContrato: string;
	tipoPagamento: string;
	produto: string;
	taxaContrato: number;
	tipoSolo: string;
	clienteId: string;
	atividades: Atividade[];
}