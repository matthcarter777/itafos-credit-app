import { Atividade } from "./Atividade";

export type Fazenda = {
  id: string;
	nome: string;
	cidade: string;
	uf: string;
	quantHectares: number;
	tipoArea: string;
	ie: string;
	matricula: string;
	nomeProprietario: string;
	tipoProprietario: string;
	cpfcnpj: string;
	vencimentoContrato: string;
	tipoPagamento: string;
	produto: string;
	taxaContrato: number;
	tipoSolo: string;
	clienteId: string;
	atividades: Atividade[];
}