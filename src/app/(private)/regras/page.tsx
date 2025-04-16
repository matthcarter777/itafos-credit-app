"use client";

import CreateRegraModal from "@/app/components/CreateRegraModal/CreateRegraModal";
import UserTable from "@/app/components/UserTable/UserTable";
import { getUsuarios } from "@/app/services/hooks/getUsuarios";
import { useEffect, useState } from "react";

export default function User() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
      getData()
  }, [])

  async function getData() {
    const usuarios = await getUsuarios();

    setUsuarios(usuarios as any)
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
        <UserTable data={usuarios} onEdit={handleEdit} onToggleAtivo={handleToggleAtivo} />
      </div>
    </div>
  );
}
