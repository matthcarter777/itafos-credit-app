"use client";

import CreateUserModal from "@/app/components/CreateUserModal/CreateUserModal";
import UserTable from "@/app/components/UserTable/UserTable";
import { getUsuarios } from "@/app/services/hooks/getUsuarios";
import { useEffect, useState } from "react";

const users = [
  {
    nome: "João Silva",
    email: "joao@empresa.com",
    ativo: true,
    regra: "Admin",
    rtv: "RTV A",
    cliente: "Cliente X",
  },
  {
    nome: "Maria Souza",
    email: "maria@empresa.com",
    ativo: false,
    regra: "Usuário",
    rtv: "RTV B",
    cliente: "Cliente Y",
  },
];
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
        <h1 className="font-bold text-xl">Usuarios</h1>
        <CreateUserModal title="+ Novo Usuário"/>
      </div>
      <div className="p-6">
        <UserTable data={usuarios} onEdit={handleEdit} onToggleAtivo={handleToggleAtivo} />
      </div>
    </div>
  );
}
