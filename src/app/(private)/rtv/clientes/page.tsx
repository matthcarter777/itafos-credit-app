"use client";

import ClienteTable from "@/app/components/ClienteTable";
import CreateClienteModal from "@/app/components/CreateClienteModal";
import { getClientes } from "@/app/services/hooks/getClientesRTV";
import { Cliente } from "@/app/types/Cliente";
import { useQuery } from "@tanstack/react-query";

export default function ClientesPage() {
  const { data, isLoading } = useQuery<Cliente[]>({ queryKey: ['clientes'], queryFn: getClientes });

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
        <h1 className="font-bold text-xl">Clientes</h1>
        <CreateClienteModal title="+ Novo Cliente"/>
      </div>
      <div className="p-6">
        <ClienteTable data={data} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
