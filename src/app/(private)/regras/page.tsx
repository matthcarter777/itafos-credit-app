"use client";

import CreateRegraModal from "@/app/components/CreateRegraModal/CreateRegraModal";
import RoleTable from "@/app/components/RolesTable/RoleTable";
import { getRoles } from "@/app/services/hooks/getRegras";
import { useEffect, useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
      getData()
  }, [])

  async function getData() {
    const roles = await getRoles();

    setRoles(roles as any)
  }

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
        <RoleTable data={roles} onEdit={handleEdit} onDelete={handleToggleAtivo} />
      </div>
    </div>
  );
}
