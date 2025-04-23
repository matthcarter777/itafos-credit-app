"use client";

import CreateRegraModal from "@/app/components/CreateRegraModal";
import RoleTable from "@/app/components/RolesTable";
import { getRoles } from "@/app/services/hooks/getRegras";
import { Role } from "@/app/types/Regra";
import { useQuery } from "@tanstack/react-query";

export default function Roles() {
  const { data, isLoading } = useQuery<Role[]>({ queryKey: ['roles'], queryFn: getRoles });

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
        <h1 className="font-bold text-xl">Regras</h1>
        <CreateRegraModal title="+ Nova Regra"/>
      </div>
      <div className="p-6">
        <RoleTable data={data} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
