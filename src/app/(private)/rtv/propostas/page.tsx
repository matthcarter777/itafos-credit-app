"use client";

import CreateClienteModal from "@/app/components/CreateClienteModal";
import ProposalTable from "@/app/components/ProposalTable";
import { getProposta } from "@/app/services/hooks/getProposta";
import { Proposta } from "@/app/types/Proposta";
import { useQuery } from "@tanstack/react-query";

export default function PropostasPage() {
  const { data, isLoading } = useQuery<Proposta[]>({ queryKey: ['propostas'], queryFn: getProposta });

  const handleEdit = (user: any) => {
    alert(`Editar usuário: ${user.nome}`);
  };

  const handleToggleAtivo = (user: any) => {
    alert(
      `${user.ativo ? "Desabilitando" : "Ativando"} usuário: ${user.nome}`
    );
  };

  return (
    <div className="p-10">
      <div className="flex flex-row justify-between">
        <h1 className="font-bold text-xl">Propostas</h1>
        <CreateClienteModal title="+ Nova Proposta"/>
      </div>
      <div className="p-6">
        <ProposalTable data={data} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
