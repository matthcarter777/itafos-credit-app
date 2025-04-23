"use client";

import CreateUserModal from "@/app/components/CreateUserModal";
import UserTable from "@/app/components/UserTable";
import { getUsuarios } from "@/app/services/hooks/getUsuarios";
import { User } from "@/app/types/User";
import { useQuery } from "@tanstack/react-query";

export default function UserPage() {

  const { data, isLoading } = useQuery<User[]>({ queryKey: ['users'], queryFn: getUsuarios });

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
        <h1 className="font-bold text-xl">Usuarios</h1>
        <CreateUserModal title="+ Novo Usuário"/>
      </div>
      <div className="p-6">
        <UserTable data={data} onEdit={handleEdit} onToggleAtivo={handleToggleAtivo} />
      </div>
    </div>
  );
}
